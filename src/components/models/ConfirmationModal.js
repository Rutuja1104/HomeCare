import React from 'react'
import Button from '../button/Button'
import { Modal, ModalBody } from 'reactstrap'
import { BUTTON_TYPE } from '../../libs/constant'

const ConfirmationModal = ({
    isOpen,
    toggle = () => { },
    onSuccessCb = () => { },
    header = "Are you sure?",
    bodyContent = "Are you sure you want to onboard this candidate!",
    closeButtonText = "Close",
    successButtonText = "Submit"
}) => {
    return (
        <Modal
            isOpen={isOpen}
            toggle={toggle}
            centered
        >
            <ModalBody className="text-center p-4 pb-5">
                <div className="mt-4">
                    <h4 className="mb-3">{header}</h4>
                    <p className="text-muted mb-4">{bodyContent}</p>
                    <div className="hstack gap-2 justify-content-center">
                        <Button variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER} onClickCb={toggle}>{closeButtonText}</Button>
                        {successButtonText && <Button className="ms-3" onClickCb={onSuccessCb}>{successButtonText}</Button>}
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default ConfirmationModal
