import React from 'react'
import ReactFullCalendar from '../reactFullCalendar/ReactFullCalendar'
import { BUTTON_TYPE } from '../../libs/constant'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import Button from '../button/Button'

const ViewAvailabilityModal = ({
    isOpen,
    toggle = () => { },
    events = []
}) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} fullscreen>
            <ModalHeader className="modal-title" toggle={toggle}>View Availability</ModalHeader>
            <ModalBody className="p-4">
                <ReactFullCalendar events={events} />
            </ModalBody>
        </Modal>
    )
}

export default ViewAvailabilityModal
