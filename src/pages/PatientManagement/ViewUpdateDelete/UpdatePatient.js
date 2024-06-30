import React from 'react';
import BasicModal from '../../../components/modal/Modal';
import Button from '../../../components/button/Button';
import { BUTTON_TYPE } from '../../../libs/constant';

const UpdatePatient = () => {
    return (
        <BasicModal
            title={"Update Patient's Details"}
            closeButtonHandler={() => setOpenDeleteModal(false)}
            handleClose={() => setOpenDeleteModal(false)}
            customStyle={{
                width: '40%'
            }}
        >
            <div className="nextbuttons">
                <Button
                    type={BUTTON_TYPE.LIGHT_WITH_NO_BORDER}
                    className="button-width primary-light-with-border-btn me-4"
                    onClickCb={() => {
                        setOpenDeleteModal(false);
                    }}
                >
                    No
                </Button>
                <Button
                    type={BUTTON_TYPE.PRIMARY}
                    className="button-width primary-btn"
                    onClickCb={() => {
                        const patientId = allPatients[clickedRowIndex]?.id;
                        if (patientId) {
                            handleDeletePatient(patientId);
                        }
                    }}
                >
                    Yes
                </Button>
            </div>
        </BasicModal>
    );
};
export default UpdatePatient;
