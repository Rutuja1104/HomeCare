import React, { useEffect, useState } from 'react';
import ProfileImage from '../../../../components/profileImg/ProfileImage';
import Heading from '../../../../components/heading/Heading';
import IconLabel from '../../../../components/iconlabel/IconLabel';
import { VEC_ICON_NAME } from '../../../../components/icon/constants';
import ButtonDropdown from '../../../../components/buttonDropdown/ButtonDropdown';
import { HEADING } from '../../../../components/heading/constants/constants';
import Loadable from '../../../../components/loadable/Loadable';
import { useDispatch, useSelector } from 'react-redux';
import { componentKey, setPrintBufferData, setShowPreviewOfPDF } from '../NurseListing/NurseListingSlice';
import TabbedNavigation from '../../../../components/tabbedNavigation/TabbedNavigation';
import { setHeaderLabel } from '../../../../layouts/LayoutSlice';
import { getNurseById, postPrintApplicationForNurse } from '../NurseListing/NurseListingSaga';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';
import ProfessionalInformation from './ProfessionalInformation';
import DocumentList from './DocumentList';
import BadgeV2 from '../../../../components/badge/BadgeV2';
import General from '../../../../libs/utility/General';
import Button from '../../../../components/button/Button';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import download from 'downloadjs';
import AdminDataService from '../../../../services/AdminDataService';
import BasicModal from '../../../../components/modal/Modal';
import { BUTTON_TYPE } from '../../../../libs/constant';
import Icons from '../../../../components/icon/Icon';

const NurseDetails = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const nurseId = searchParams.get('nid');
    const type = searchParams.get('type');
    const [downloadPdfData, setDownloadPdfData] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [pdfTitle, setPdfTitle] = useState('');
    const { loadingState, nurseDetails, showPreviewOfPDF } = useSelector((state) => state[componentKey]);

    useEffect(() => {
        dispatch(setHeaderLabel(`${type} Details`));
        dispatch(getNurseById(nurseId));
    }, [nurseId]);

    const handlePrintAndPreview = async () => {
        dispatch(setShowPreviewOfPDF(true));
        try {
            const response = await AdminDataService.postPrintApplicationForNurse(nurseId);
            const bData = new Uint8Array(response?.data?.file.data);

            const blob = new Blob([bData], { type: 'application/pdf' });

            const url = URL.createObjectURL(blob);

            setPdfUrl(url);
            setDownloadPdfData(bData);
            setPdfTitle(response?.data?.fileName);
        } catch (error) {
            console.error('Error in handlePrintAndPreview:', error);
        }
    };

    const handleDownloadPdf = () => {
        download(downloadPdfData, pdfTitle, 'application/pdf');
    };

    const array = [
        {
            label: 'State Residence',
            value: nurseDetails?.StateResidence,
            category: 'Personal Information'
        },
        {
            label: 'Date Of Birth',
            value: moment(nurseDetails?.dob).format('LL'),
            category: 'Personal Information'
        },
        {
            label: 'Gender',
            value: nurseDetails?.gender,
            category: 'Personal Information'
        },
        {
            label: 'SSN',
            value: nurseDetails?.ssn,
            category: 'Personal Information'
        },
        {
            label: 'Work Type',
            value: nurseDetails?.workType,
            category: 'Personal Information'
        },
        {
            label: 'Experience',
            value: `${nurseDetails?.yearofExperience} Years`,
            category: 'Personal Information'
        },
        {
            label: 'US Citizen',
            value: `${nurseDetails?.usCitizen ? 'Yes' : 'No'}`,
            category: 'Personal Information'
        }
    ];

    const tabList = [
        {
            title: 'Professional Information',
            tabBodyComponent: <ProfessionalInformation />,
            linkTo: '/tab1'
        },
        {
            title: 'Documents',
            tabBodyComponent: <DocumentList />,
            linkTo: '/tab2'
        }
    ];

    return (
        <Loadable loadingStates={loadingState.state} loadingMessage={loadingState.message}>
            <div className="episode-patient-details">
                <Heading type={HEADING.H2}>{type} Details</Heading>
                <div
                    onClick={handlePrintAndPreview}
                    className=""
                    style={{ cursor: 'pointer', width: '50px', height: '50px' }}
                >
                    <Icons
                        iconName={VEC_ICON_NAME.PrinterIconFilled}
                        style={{ width: '100% !important', height: '100% !important' }}
                    />
                </div>

                {/* <Button onClickCb={handlePrintAndPreview}>Print</Button> */}
            </div>
            <div className="patient-details mb-3 mt-1">
                <div className="patient-basic-details-card patient-basic-info">
                    <ProfileImage />
                    <div>
                        <Heading>
                            {nurseDetails?.firstName} {nurseDetails?.lastName}
                        </Heading>
                        <div className="d-flex">
                            <IconLabel
                                text={nurseDetails?.Telephone || '-'}
                                icon={VEC_ICON_NAME.CALL_ICON}
                                labelStyles={{ marginRight: '15px' }}
                            />
                            <IconLabel text={nurseDetails?.email || '-'} icon={VEC_ICON_NAME.MAIL_OUTLINE} />
                        </div>
                        <div className="mt-3">
                            <IconLabel
                                text={`${
                                    (nurseDetails?.addresses?.length && nurseDetails?.addresses[0]?.addressLine1) || '-'
                                } ${
                                    (nurseDetails?.addresses?.length && nurseDetails?.addresses[0]?.addressLine2) || '-'
                                } ${(nurseDetails?.addresses?.length && nurseDetails?.addresses[0]?.city) || '-'} ${
                                    (nurseDetails?.addresses?.length && nurseDetails?.addresses[0]?.country) || '-'
                                }`}
                                icon={VEC_ICON_NAME.LOCATION_ICON_3}
                            />
                        </div>
                    </div>
                </div>
                <div className="patient-basic-details-card patient-value-label-pair">
                    <div className="patient-professional-info">
                        {array?.map((item, index) => (
                            <div key={index} className="patient-label-value-pair">
                                <span style={{ whiteSpace: 'nowrap' }} className="patient-info-label text-capitalize">
                                    {item.label}
                                </span>
                                <span style={{ whiteSpace: 'nowrap' }} className="patient-info-value text-capitalize">
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div>
                        <BadgeV2 color={General.renderBadgeColor(nurseDetails?.onboardingStatus || '')}>
                            {nurseDetails?.onboardingStatus}
                        </BadgeV2>
                    </div>
                </div>
            </div>
            <div>
                <TabbedNavigation tabList={tabList} />
            </div>

            <BasicModal
                title={pdfTitle}
                open={showPreviewOfPDF}
                handleClose={() => dispatch(setShowPreviewOfPDF(false))}
                closeButtonHandler={() => dispatch(setShowPreviewOfPDF(false))}
                customStyle={{
                    width: '80%',
                    height: '80%',
                    position: 'absolute',
                    top: '45%',
                    left: '50%',
                    padding: '20px'
                }}
            >
                <iframe
                    title="PDF Preview"
                    width="100%"
                    height="590px"
                    src={pdfUrl}
                    onLoad={() => console.log('PDF loaded successfully')}
                    onError={(e) => console.error('Error loading PDF', e)}
                ></iframe>
                <div className="mt-4">
                    <Button type={BUTTON_TYPE.PRIMARY} onClickCb={handleDownloadPdf} className="me-3">
                        Download PDF
                    </Button>
                    <Button
                        type={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}
                        onClickCb={() => {
                            dispatch(setShowPreviewOfPDF(false));
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </BasicModal>
        </Loadable>
    );
};

export default NurseDetails;
