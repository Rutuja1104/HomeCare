import React, { useState } from 'react'

import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { BUTTON_TYPE } from '../../libs/constant'
import { LABEL_WEIGHT } from '../label/labelV2/constants'
import { useDispatch, useSelector } from 'react-redux'
import { setPaginationState, setSelectedPatient } from '../../pages/episodeManagement/admin/episodeListing/EpisodeListingSlice'

import TextInput from '../input/textinput/TextInput'
import Button from '../button/Button'
import RichGrid from '../richgrid/RichGrid'
import Label from '../label/labelV2/Label'
import BadgeV2 from '../badge/BadgeV2'
import General from '../../libs/utility/General'
import { ROW_SELECTION_OPTIONS } from '../pagination/constants'
import { componentKey } from '../../pages/episodeManagement/admin/episodeListing/EpisodeListingSlice'
import { getAllPatientList } from '../../pages/episodeManagement/admin/episodeListing/EpisodeListingSaga'

const PatientListModal = ({
    isOpen,
    data = [],
    toggle = () => { },
    onSuccessCb = () => { },
    selectedPatient = [],
}) => {
    const dispatch = useDispatch()

    const agencyId = General.getLocalStorageData("agencyId")
    const token = General.getLocalStorageData("token")

    const { PaginationState } = useSelector(state => state[componentKey])

    const PATIENT_DETAILS_COLUMN = [
        {
            field: "userName",
            header: <Label weight={LABEL_WEIGHT[700]}>Patient Name</Label>,
            renderLogic: (row, idx) => <span>{row?.firstName} {row?.lastName}</span>
        },
        {
            field: "userName",
            header: <Label weight={LABEL_WEIGHT[700]}>Email</Label>,
            renderLogic: (row, idx) => <span>{row?.email || "-"}</span>
        },
        {
            field: "userName",
            header: <Label weight={LABEL_WEIGHT[700]}>Gender</Label>,
            renderLogic: (row, idx) => <span>{row?.gender}</span>
        },
        {
            field: "userName",
            header: <Label weight={LABEL_WEIGHT[700]}>Patient Type</Label>,
            renderLogic: (row, idx) => <span className='text-capitalize'>{row?.patientType}</span>
        },
        {
            field: "userName",
            header: <Label weight={LABEL_WEIGHT[700]}>Phone Number</Label>,
            renderLogic: (row, idx) => <span>{row?.phoneNumber}</span>
        },
        {
            field: "userName",
            header: <Label weight={LABEL_WEIGHT[700]}>Status</Label>,
            renderLogic: (row, idx) => <BadgeV2 color={General.renderBadgeColor(row?.patientServiceStatus || "")}>{row?.patientServiceStatus}</BadgeV2>
        }
    ]

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered size="xl">
            <ModalHeader className="modal-title" toggle={toggle}>Select Client</ModalHeader>
            <ModalBody className="p-4">
                <div className='d-flex'>
                    <TextInput
                        type='text'
                        placeHolder="Search By Patient Name"
                        name='MiddleName'
                        onChangeCb={(e) => dispatch(setPaginationState({ ...PaginationState, FilterText: e.target.value }))}
                    />
                    <Button className="ms-3" onClickCb={() => {
                        dispatch(getAllPatientList({ agencyId, pageNumber: 1, limit: PaginationState.PageSize, status: PaginationState.Status, searchKey: PaginationState.FilterText, token }))
                    }}>
                        Search
                    </Button>
                </div>
                <RichGrid
                    data={data}
                    columns={PATIENT_DETAILS_COLUMN}
                    selectable={true}
                    extractRowKey={(row) => row.phoneNumber}
                    isAllSelectable={false}
                    onSelectionChangeCallBack={(selectedData) => dispatch(setSelectedPatient(selectedData))}
                    selectedRows={selectedPatient}
                    paginationProps={{
                        page: PaginationState.PageNumber,
                        take: PaginationState.PageSize,
                        takeOptions: ROW_SELECTION_OPTIONS,
                        total: PaginationState.totalPatients,
                        onChangeTakeCb: (newTake) => {
                            dispatch(setPaginationState({ ...PaginationState, PageNumber: 1, PageSize: newTake }))
                            dispatch(getAllPatientList({ agencyId, pageNumber: 1, limit: newTake, status: PaginationState.Status, searchKey: PaginationState.FilterText, token }))
                        },
                        onChange: (page) => {
                            dispatch(getAllPatientList({ agencyId, pageNumber: page, limit: PaginationState.PageSize, status: PaginationState.Status, searchKey: PaginationState.FilterText, token }))
                            dispatch(setPaginationState({ PageNumber: page }))
                        },
                    }}
                />
                <div className="mt-4">
                    <Button variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER} onClickCb={toggle}>
                        Close
                    </Button>
                    <Button className="ms-3" onClickCb={onSuccessCb}>
                        Submit
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default PatientListModal
