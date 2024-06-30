import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { componentKey, setActivePhysicianPatientIntakeStep, setActiveRefferalPatientIntakeStep, setAddNewMedicationDetails, setMedicationDetails, setRemoveNewMedicationDetails, setUploadedDocuments } from '../physicianOrderSlice';
import Heading from '../../../../components/heading/Heading';
import { BUTTON_TYPE } from '../../../../libs/constant';
import TextInput from '../../../../components/input/textinput/TextInput';
import Button from '../../../../components/button/Button';
import { MEDICATION_DETAILS } from '../../constants';
import { VEC_ICON_NAME } from '../../../../components/icon/constants';
import { HEADING } from '../../../../components/heading/constants/constants';
import { deleteDocumentFromS3AndDatabase, getAllPayers, getDocumentFromS3Bucket, getPreSignedUrl, medicalDetails } from '../phsyicianOrderSaga';
import FileUpload from '../../../../components/fileUpload/FileUpload';
import { generalValidator } from '../../../../libs/utility/validators/GeneralValidator';
import General from '../../../../libs/utility/General';
import { toast } from 'react-toastify';


const UploadDocuments = () => {
    const { uploadedDocuments, uploadedDocumentsList, medicationDetails,patientId, patientUserId } = useSelector((state) => state[componentKey]);

    const dispatch = useDispatch();
    // const patientId = General.getLocalStorageData('patientId');
    const agencyId = General.getLocalStorageData('agencyId');
    const token = General.getLocalStorageData("token")

    function containsSpecialChars(str) {
        var specialChars = /[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/
        return specialChars.test(str);
    }
    const onChangeHandler = (event, rules, index) => {
        const { name, value, type } = event.target;
        let regex = /\d/;
        let noWhiteSpaceRegex  = /^\s|\s/
        let medicationRegex = /^[a-zA-Z0-9]+$/;

        if( name == 'medication' || name == "dosage"){
            if ((type === "text" && medicationRegex.test(value)) || (noWhiteSpaceRegex.test(value) && type === "text")) {
                if (rules) {
                    const errors = generalValidator.validate(value, rules);
                    dispatch(setMedicationDetails({ object: { [name]: { value, errors, rules } }, index }));
                } else {
                    dispatch(setMedicationDetails({ object: { [name]: { value } }, index }));
                }
            }
        }
        if ((regex.test(value) && type == "text") || (type == "text" && containsSpecialChars(value)) || (noWhiteSpaceRegex.test(value) && type == "text")) {
            return
        }
        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(setMedicationDetails({ object: { [name]: { value, errors, rules } }, index }));
        } else {
            dispatch(setMedicationDetails({ object: { [name]: { value } }, index }));
        }
    };
    return (
        <>
            <div className="medications">
                <Heading>Medication List</Heading>
                {medicationDetails?.map((item, index) => (
                    <div className="" key={index}>
                        <Heading type={BUTTON_TYPE.h3}>Medication Details: {index + 1}</Heading>
                        <div className="medication-details">
                            <div className="block">
                                <TextInput
                                    type="text"
                                    placeHolder={'Please enter disease'}
                                    name="disease"
                                    onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                    label="Disease"
                                    value={item?.disease.value}
                                    // rules={serviceDetails[index].caseSequence.rules}
                                    // errors={serviceDetails[index].caseSequence.errors}
                                    // formSubmitted={serviceDetailsFieldTouched}
                                />
                            </div>
                            <div className="block">
                                <TextInput
                                    type="text"
                                    placeHolder={'Please enter medication'}
                                    name="medication"
                                    onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                    label="Medication"
                                    value={item?.medication.value}
                                    // rules={serviceDetails[index].caseSequence.rules}
                                    // errors={serviceDetails[index].caseSequence.errors}
                                    // formSubmitted={serviceDetailsFieldTouched}
                                />
                            </div>
                            <div className="block">
                                <TextInput
                                    type="text"
                                    placeHolder={'Please enter dosage'}
                                    name="dosage"
                                    onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                    label="Dosage"
                                    value={item?.dosage.value}
                                    // rules={serviceDetails[index].caseSequence.rules}
                                    // errors={serviceDetails[index].caseSequence.errors}
                                    // formSubmitted={serviceDetailsFieldTouched}
                                />
                            </div>
                        </div>

                        {index > 0 && (
                            <Button
                                onClickCb={() => dispatch(setRemoveNewMedicationDetails(index))}
                                variant={BUTTON_TYPE.LIGHT_WITH_NO_BORDER}
                                className={`mt-2 ${index < medicationDetails.length - 1 && 'mb-4'}`}
                            >
                                Remove
                            </Button>
                        )}
                    </div>
                ))}
            </div>
            <div className="add-new-medication-block">
                <Button
                    className="mt-2 "
                    variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}
                    onClickCb={() =>
                        dispatch(
                            setAddNewMedicationDetails(
                                // name: 'Service Details',
                                MEDICATION_DETAILS
                            )
                        )
                    }
                    prefixProps={{ icon: VEC_ICON_NAME.ADD_NEW_ICON }}
                >
                    Add New Medication Details
                </Button>
            </div>
            <div className="medical-reports-block">
                <Heading type={HEADING.H3}>Medical History Documents</Heading>
                <div className="file-uploading-block">
                    <FileUpload
                        onUploadDocumentCb={(file, idx) => {
                            const data = {
                                // patientId: patientId,
                                userId: patientId,
                                agencyId: agencyId,
                                fileName: file.name,
                                type: 'medical reports'
                            };
                            dispatch(
                                getPreSignedUrl({            
                                    agencyId,
                                    data,
                                    file,
                                    idx,
                                    type: 'patient',
                                    patientUserId,
                                    documentType: 'medical reports'
                                })
                            );
                        }}
                        uploadedFiles={uploadedDocuments}
                        onUploadFiles={(file) => {
                            dispatch(setUploadedDocuments(file));
                        }}
                        // uploadedFiles={uploadedDocuments.BackgroundCheck}
                        onPreviewCb={(url) => {
                            dispatch(getDocumentFromS3Bucket(url))}
                        }
                        onRemoveFilesCb={(idx, s3Url) => {
                            if (s3Url) {
                                dispatch(deleteDocumentFromS3AndDatabase({ s3Url, documentType: "insurance reports" }))
                            }
                            let copiedFiles = [ ...uploadedDocuments ];
                        
                            let arr = copiedFiles.filter((item, index) => index !== idx);
                            dispatch(setUploadedDocuments(arr));
                        }}
                    />
                </div>
            </div>
            <div className="mt-4">
                <Button
                    type={BUTTON_TYPE.LIGHT_WITH_NO_BORDER}
                    className="button-width primary-light-with-border-btn"
                    onClickCb={() => {
                        // dispatch(postServiceDetails(patientId, serviceDetails));
                        // dispatch(getAllPayers({ patientId, activeIndex: 2 }));
                        dispatch(setActivePhysicianPatientIntakeStep(1));
                    }}
                >
                    Back
                </Button>
                <Button
                    type={BUTTON_TYPE.PRIMARY}
                    className="button-width primary-btn medicalButton"
                    onClickCb={() => {
                        if (
                            medicationDetails.length > 0 &&
                            medicationDetails.some(
                                (item) => item.disease.value || item.medication.value || item.dosage.value
                            )
                        ) {
                            const allDocumentsUploaded = uploadedDocuments.every(
                                (doc) => doc.s3Url && doc.s3Url.length !== 0
                            );

                            if (allDocumentsUploaded) {
                                dispatch(
                                    medicalDetails({
                                        patientId,
                                        agencyId,
                                        uploadedDocumentsList,
                                        uploadedDocuments,
                                        medicationDetails,
                                        token,
                                    })
                                );
                                dispatch(setActivePhysicianPatientIntakeStep(3));
                            } else {
                                toast.error('Please upload all medical history documents');
                            }
                        } else {
                            dispatch(setActivePhysicianPatientIntakeStep(3));
                        }
                    }}
                >
                    Next
                </Button>
            </div>
        </>
    );
};
export default UploadDocuments;
