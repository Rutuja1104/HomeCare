import React, { useEffect, useState } from 'react';
import Heading from '../../../../../components/heading/Heading';
import FileUpload from '../../../../../components/fileUpload/FileUpload';
import Container from '../../../../../components/container/Container';
import Icons from '../../../../../components/icon/Icon';
import Button from '../../../../../components/button/Button';

import { HEADING } from '../../../../../components/heading/constants/constants';
import { componentKey as NurseOnboardingComponentKey } from '../../../NurseOnboardingSlice';
import {
    componentKey as jobApplicationComponentKey,
    setJobApplicationActiveStep,
    setUploadedDocumentForAll,
    setUploadedDocuments
} from '../../JobApplicationSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteDocumentFromS3AndDatabase,
    getPreSignedUrl,
    postNurseOnboardingApplication
} from '../../JobApplicationSaga';
import { useParams } from 'react-router-dom';
import { getDocumentFromS3Bucket } from '../../../../StaffManagement/NurseManagement/NurseManagementSaga';
import { BUTTON_TYPE } from '../../../../../libs/constant';
import { Collapse } from 'reactstrap';
import { VEC_ICON_NAME } from '../../../../../components/icon/constants';
import {
    setDocumentsInRequireDocuments,
    setRemoveDocumentsFromRequireDocuments,
    setRequireDocuments
} from '../ProfessionalInformationSlice';
import { componentKey as professionalInfoComponentKey } from '../ProfessionalInformationSlice';
import { toast } from 'react-toastify';

const RequiredDocument = ({ activeIndex, applicationSteps }) => {
    const { agencyId, role } = useParams();
    const [showOptionalDocument, setShowOptionalDocument] = useState(false);
    const { applicationId, userRole, signatureInBase64 } = useSelector((state) => state[NurseOnboardingComponentKey]);
    const { uploadedDocuments, uploadedDocumentsList } = useSelector((state) => state[jobApplicationComponentKey]);
    const {
        requireDocuments,
        professionalInformation,
        healthInfoQuestions,
        healthInformationSignature,
        questionnaires,
        userDetailsById
    } = useSelector((state) => state[professionalInfoComponentKey]);

    const [collapse, setCollapse] = useState(0);

    const toggle = (idx) => {
        if (collapse == idx) {
            setCollapse(-1);
        } else {
            setCollapse(idx);
        }
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setJobApplicationActiveStep(activeIndex));
    }, []);

    useEffect(() => {
        if (userDetailsById.documents.length !== 0) {
            const copiedData = JSON.parse(JSON.stringify(requireDocuments));
            userDetailsById?.documents?.forEach((item) => {
                const { documentType } = item;
                const index = requireDocuments?.findIndex((item) => item.name == documentType);
                copiedData[index]?.documents?.push(item);
            });
            dispatch(setRequireDocuments(copiedData));
        }
    }, [userDetailsById]);

    const isRequiredDocumentsValid = requireDocuments
        .filter((item) => item.isRequired.includes(role.toLowerCase()))
        .every((item) => {
            if (item.documents.length !== 0) {
                return item.documents.every((doc) => doc.s3Url && doc.s3Url.length !== 0);
            }
            return false;
        });

    const handleSubmitClick = () => {
        if (
            isRequiredDocumentsValid &&
            uploadedDocumentsList.length >=
                requireDocuments.filter((item) => item.isRequired.includes(role.toLowerCase())).length &&
            requireDocuments.every((item) => item.documents.every((doc) => doc.s3Url && doc.s3Url.length !== 0))
        ) {
            dispatch(
                postNurseOnboardingApplication({
                    agencyId,
                    applicationId: applicationId,
                    professionalInformation,
                    questionnaires,
                    healthInfoQuestions,
                    healthInformationSignature,
                    signatureInBase64,
                    step: 'Step-5',
                    uploadedDocumentsList,
                    activeIndex,
                    applicationSteps
                })
            );
            window.scrollTo(0, 0);
            dispatch(setJobApplicationActiveStep(activeIndex+1));

        } else {
            toast.error('Please upload all require documents');
        }
    };

    return (
        <div>
            <Heading type={HEADING.H3}>Required Document :</Heading>

            {requireDocuments.map((item, idx) => {
                return (
                    <div key={idx} className="mb-3">
                        <div
                            onClick={() => toggle(idx)}
                            className={`custom-collapse ${collapse == idx && 'collapse-border'}`}
                        >
                            <div>
                                <span className="document-name">
                                    {item.title}{' '}
                                    {item.isRequired.includes(role.toLowerCase()) && (
                                        <span style={{ color: 'red' }}>*</span>
                                    )}
                                </span>
                            </div>
                            <Icons iconName={VEC_ICON_NAME.ARROW_DOWN_ICON} rotateDeg={collapse == idx ? 180 : 0} />
                        </div>
                        <Collapse isOpen={collapse == idx}>
                            <Container containerMainClassName="collapse-container">
                                <FileUpload
                                    className="m-0"
                                    onUploadDocumentCb={(file, idxx) => {
                                        const data = {
                                            userId: applicationId,
                                            agencyId: agencyId,
                                            fileName: file.name,
                                            type: userRole
                                        };

                                        dispatch(
                                            getPreSignedUrl({
                                                data,
                                                file,
                                                applicationId,
                                                agencyId: agencyId,
                                                documentType: item.name,
                                                uploadedDocuments,
                                                idx: idxx
                                            })
                                        );
                                    }}
                                    onUploadFiles={(file) => {
                                        const copiedFiles = { ...uploadedDocuments };
                                        if (Object.hasOwnProperty.call(copiedFiles, item.name)) {
                                            copiedFiles[item.name] = [...copiedFiles[item.name], file.slice(-1)[0]];
                                        } else {
                                            copiedFiles[item.name] = [file.slice(-1)[0]];
                                        }
                                        dispatch(setUploadedDocuments(copiedFiles));

                                        dispatch(
                                            setDocumentsInRequireDocuments({ file: file.slice(-1)[0], index: idx })
                                        );
                                    }}
                                    onRemoveFilesCb={(idxx, s3Url) => {
                                        if (s3Url) {
                                            dispatch(
                                                deleteDocumentFromS3AndDatabase({ s3Url, documentType: item.name })
                                            );
                                        }

                                        const copiedFiles = { ...uploadedDocuments };

                                        let selectedItem = copiedFiles[item.name].find((item, index) => index == idxx);
                                        const copiedUploadedFiles = JSON.parse(JSON.stringify(uploadedDocumentsList));
                                        const filterData = copiedUploadedFiles.filter(
                                            (item) => item.s3Url !== selectedItem.s3Url
                                        );
                                        dispatch(setUploadedDocumentForAll(filterData));

                                        copiedFiles[item.name] = copiedFiles[item.name].filter(
                                            (item, index) => index !== idxx
                                        );
                                        dispatch(setUploadedDocuments(copiedFiles));
                                        dispatch(
                                            setRemoveDocumentsFromRequireDocuments({
                                                childIndex: idxx,
                                                parentIndex: idx
                                            })
                                        );
                                    }}
                                    onPreviewCb={(url) => dispatch(getDocumentFromS3Bucket(url))}
                                    uploadedFiles={uploadedDocuments[item.name] || []}
                                />
                            </Container>
                        </Collapse>
                    </div>
                );
            })}

            <div className={'button-group mt-5 mb-0'}>
                <Button
                    className="button-width"
                    variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}
                    onClickCb={() => {
                        window.scrollTo(0, 0);
                        dispatch(setJobApplicationActiveStep(activeIndex - 1));
                    }}
                >
                    Back
                </Button>
                <Button className="button-width" onClickCb={handleSubmitClick}>
                    Next
                </Button>
            </div>

            {showOptionalDocument && (
                <Container>
                    <FileUpload className="" />
                </Container>
            )}
            {/* <Button className='mt-2' variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER} onClickCb={() => setShowOptionalDocument(!showOptionalDocument)} prefixProps={{ icon: VEC_ICON_NAME.ADD_NEW_ICON }}>Add New Document</Button> */}
        </div>
    );
};

export default RequiredDocument;
