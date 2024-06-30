import React from 'react';
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { BUTTON_TYPE } from '../../libs/constant';

import { HEADING } from '../heading/constants/constants';
import { useDispatch } from 'react-redux';
import { getDocumentFromS3Bucket } from '../../pages/StaffManagement/NurseManagement/NurseManagementSaga';
import Button from '../button/Button';
import Heading from '../heading/Heading';
import FileUpload from '../fileUpload/FileUpload';

const ApplicationModal = ({
    isOpen,
    toggle = () => {},
    onSuccessCb = () => {},
    applicationDetails = {},
    onDiscardCb = () => {}
}) => {
    const dispatch = useDispatch();

    return (
        <Modal isOpen={isOpen} centered size="lg">
            <ModalHeader toggle={toggle} className="modal-title">
                Application Details
            </ModalHeader>
            <ModalBody className="p-4">
                <Row className="mb-2">
                    <Col xs={6}>Name :</Col>
                    <Col xs={6}>
                        <span>
                            {applicationDetails.firstName} {applicationDetails.lastName}
                        </span>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs={6}>Email :</Col>
                    <Col xs={6}>
                        <span>{applicationDetails.email || ''}</span>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs={6}>Phone Number :</Col>
                    <Col xs={6}>
                        <span>{applicationDetails.Telephone || ''}</span>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs={6}>Gender :</Col>
                    <Col xs={6}>
                        <span>{applicationDetails.gender || ''}</span>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs={6}>Employer Name :</Col>
                    <Col xs={6}>
                        <span>{applicationDetails.previousEmployerName || ''}</span>
                    </Col>
                </Row>
                <Row className={applicationDetails?.role === "HHA"||applicationDetails?.role === "DSP" ? 'd-none mb-2':'mb-2'}>
                    <Col xs={6}>Year Of Experience :</Col> 
                    <Col xs={6}>
                        <span>{applicationDetails.yearofExperience ? `${applicationDetails.yearofExperience} Years` || '' : '-'}</span>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs={6}>Do you have a valid driver's license :</Col>
                    <Col xs={6}>
                        <span>{`${applicationDetails?.isLicense ? 'Yes' : 'No'}` || ''}</span>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs={6}>Are you over 18 years of age :</Col>
                    <Col xs={6}>
                        <span>{`${applicationDetails?.validAge ? 'Yes' : 'No'}` || ''}</span>
                    </Col>
                </Row>
                {applicationDetails?.role === "HHA" && <Row className="mb-2">
                    <Col xs={6}>Do you possess a valid CNA/STNA certification? :</Col>
                    <Col xs={6}>
                        <span>{`${applicationDetails?.isvalidCNA ? 'Yes' : 'No'}` || ''}</span>
                    </Col>
                </Row>}
                {applicationDetails?.role === "HHA" &&  <Row className="mb-2">
                    <Col xs={6}>How many years of home care experience do you have ?</Col>
                    <Col xs={6}>
                        <span>{`${applicationDetails?.homeCareExperience} Years` || ''}</span>
                    </Col>
                </Row>}
                {applicationDetails?.role === "DSP" &&  <Row className="mb-2">
                    <Col xs={6}>How many years of home care experience do you have ?</Col>
                    <Col xs={6}>
                        <span>{`${applicationDetails.homeCareExperience} Years` || ''}</span>

                    </Col>
                </Row>}
                {applicationDetails?.role === "DSP" &&  <Row className="mb-2">
                    <Col xs={6}>do you have a valid STNA/CNA ?</Col>
                    <Col xs={6}>
                        <span>{`${applicationDetails?.isvalidCNA ? 'Yes' : 'No'}` || ''}</span>
                    </Col>
                </Row>}  
                {applicationDetails?.documents?.length !== 0 ? (
                    <>
                        <Heading type={HEADING.H3} customStyle={{ marginTop: '20px' }}>
                            Candidates Resume :
                        </Heading>
                        <FileUpload
                            isRemoveAbel={false}
                            isUploadable={false}
                            className="m-0"
                            uploadedFiles={applicationDetails.documents || []}
                            onPreviewCb={(url) => dispatch(getDocumentFromS3Bucket(url))}
                        />
                    </>
                ) : (
                    ''
                )}

                <div className="mt-5">
                    <Button variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER} onClickCb={onDiscardCb}>
                        Discard
                    </Button>
                    <Button className="ms-3" onClickCb={onSuccessCb}>
                        Initiate Onboarding
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default ApplicationModal;
