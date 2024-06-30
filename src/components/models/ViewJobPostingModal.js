import React, { useState } from 'react';
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { BUTTON_TYPE } from '../../libs/constant';
import Button from '../button/Button';
import Label from '../label/labelV2/Label';
import { VEC_ICON_NAME } from '../icon/constants';
import Icons from '../icon/Icon';
import PaymentsIcon from '@mui/icons-material/Payments';
import WorkIcon from '@mui/icons-material/Work';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MyCKEditor from '../ckeditorforDiscription/CKEditor';
import parse from 'html-react-parser';
const ViewJobPostingModal = ({
    isOpen,
    data,
    toggle = () => {},
    onSuccessCb = () => {},
    applicationDetails = {},
    successButtonText = 'Submit',
    onDiscardCb = () => {},
    isButton
}) => {
    const salaryFormat = data?.fixedSalary ? `$ ${data?.fixedSalary} an hour` : `$${data?.salaryRange} an hour`;

    return (
        <Modal isOpen={isOpen} centered size="xl" className="view-job-post-modal">
            <ModalHeader toggle={toggle} className="modal-title">
                {data?.title}
            </ModalHeader>
            <ModalBody className="p-4">
                <div>
                    {data?.agencyName && (
                        <div className="">
                            <Icons iconName={VEC_ICON_NAME.BUILDING_ICON} /> {data?.agencyName}
                        </div>
                    )}

                    <div className="flexSpace">
                        <div>
                            {data?.jobLocation && (
                                <div>
                                    <Icons iconName={VEC_ICON_NAME.LOCATION_ICON_2} /> {data?.jobLocation}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="flexSpace">
                        <div>
                            <PaymentsIcon /> Pay
                            <div className="jobPostCardType mt-2" style={{ width: '' }}>
                                <p style={{ marginBottom: '0px' }}>{salaryFormat}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flexSpace">
                        <div>
                            <WorkIcon /> Job Type
                            <div className="jobPostCardType mt-2" style={{ alignItems: 'center', marginBottom: '0px' }}>
                                <p className="" style={{ marginBottom: '0px' }}>
                                    {data?.jobType}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flexSpace">
                        <div>
                            <PersonAddIcon /> Role
                            <div className="jobPostCardType  mt-2" style={{ alignItems: 'center', marginBottom: '0px' }}>
                                <p className="" style={{ marginBottom: '0px' }}>
                                    {data?.role}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flexSpace">
                        <div>
                            <PersonAddIcon /> Position
                            <div className="jobPostCardType  mt-2" style={{ alignItems: 'center', marginBottom: '0px' }}>
                                <p className="" style={{ marginBottom: '0px' }}>
                                    {data?.status}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div></div>
                    <div></div>
                </div>
                <div className="mt-4">
                    <Label>Description</Label>
                    <div style={{ maxHeight: 'calc(100vh - 590px)', overflowY: 'scroll' }} className="discription ">
                        <div>{parse(data?.description || "")}</div>
                    </div>
                </div>
                {isButton && (
                    <div className="mt-5">
                        <Button variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER} onClickCb={toggle}>
                            Close
                        </Button>
                        {successButtonText && (
                            <Button className="ms-3" onClickCb={onSuccessCb}>
                                {successButtonText}
                            </Button>
                        )}
                    </div>
                )}
            </ModalBody>
        </Modal>
    );
};

export default ViewJobPostingModal;
