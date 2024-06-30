import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import Button from '../button/Button'
import { BUTTON_TYPE } from '../../libs/constant'
import SelectDropdown from '../select/Select'

const SelectTaskTypeModal = ({
    isOpen,
    toggle = () => { },
    onSuccessCb = () => { },
    discipline = [],
    onChangeCb = () => { },
    taskTypeStates = {},
    fieldsTouch = false,
}) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} centered>
            <ModalHeader className="modal-title">Select Task Type</ModalHeader>
            <ModalBody className="p-4">
                <SelectDropdown
                    name="Discipline"
                    label="Select Discipline"
                    placeHolder="Please select discipline"
                    options={discipline}
                    onChangeCb={onChangeCb}
                    value={taskTypeStates.Discipline.value}
                    rules={taskTypeStates.Discipline.rules}
                    errors={taskTypeStates.Discipline.errors}
                    formSubmitted={fieldsTouch}
                    defaultValue={taskTypeStates.Discipline.value.length !== 0 ? { label: taskTypeStates.Discipline.value } : null}
                />
                <div className="mt-5">
                    <Button variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER} onClickCb={toggle}>
                        Close
                    </Button>
                    <Button className="ms-3" onClickCb={onSuccessCb}>
                        Proceed
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default SelectTaskTypeModal
