import React, { useEffect } from 'react'
import moment from 'moment'

import { useDispatch, useSelector } from 'react-redux'
import { componentKey } from '../ClientEpisodeSlice'
import { getClientEpisodeList } from './ClientEpisodeListingSaga'
import { LABEL_WEIGHT } from '../../../../components/label/labelV2/constants'
import { componentKey as clientEpisodeComponentKey, setPaginationState, setSelectedClientEpisodes } from "./ClientEpisodeListingSlice"
import { setHeaderLabel } from '../../../../layouts/LayoutSlice'
import { useNavigate } from 'react-router-dom'
import { CLIENT_EPISODE_MANAGEMENT } from '../../../../routes/constants'

import General from '../../../../libs/utility/General'
import Label from '../../../../components/label/labelV2/Label'
import Loadable from '../../../../components/loadable/Loadable'
import RichGrid from '../../../../components/richgrid/RichGrid'
import TextInput from '../../../../components/input/textinput/TextInput'
import UncontrolledDropdownV2 from '../../../../components/uncontrolledDropdown/UncontrolledDropdown'

const ClientEpisodeListing = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loadingState } = useSelector(state => state[componentKey])
    const { clientEpisodeList, PaginationState, selectedClientEpisodes } = useSelector(state => state[clientEpisodeComponentKey])

    const agencyId = General.getLocalStorageData("agencyId")
    const token = General.getLocalStorageData("token")
    const userId = General.getLocalStorageData("userId")
    const role = General.getLocalStorageData("role")

    const JOB_APPLICATION_COLUMNS = [
        {
            field: "userName",
            header: <Label weight={LABEL_WEIGHT[700]}>Patient Name</Label>,
            renderLogic: (row, idx) => <span>{row?.episode.Patient.firstName} {row?.Patient?.lastName}</span>
        },
        {
            field: "userName",
            header: <Label weight={LABEL_WEIGHT[700]}>Physician</Label>,
            renderLogic: (row, idx) => <span>{row?.episode.Physician?.firstName} {row?.Physician?.lastName}</span>
        },
        {
            field: "userName",
            header: <Label weight={LABEL_WEIGHT[700]}>Nurse</Label>,
            renderLogic: (row, idx) => <span>{row?.episode?.episodeAssignments?.nurse?.firstName} {row?.episode?.episodeAssignments?.nurse?.lastName}</span>
        },
        {
            field: "userName",
            header: <Label weight={LABEL_WEIGHT[700]}>Episode From</Label>,
            renderLogic: (row, idx) => <span>{moment(row?.episode.startTime).format("LL")}</span>
        },
        {
            field: "userName",
            header: <Label weight={LABEL_WEIGHT[700]}>Episode To</Label>,
            renderLogic: (row, idx) => <span>{moment(row?.episode.endTime).format("LL")}</span>
        },
        {
            field: "userName",
            header: <Label weight={LABEL_WEIGHT[700]}>Emergency Level</Label>,
            renderLogic: (row, idx) => <span>{row?.episode.emergencyLevel}</span>
        },
        {
            field: "userName",
            header: <Label weight={LABEL_WEIGHT[700]}>Duration</Label>,
            renderLogic: (row, idx) => <span>{row?.episode.episodeDuration} Days</span>
        },
        {
            field: "userName",
            header: <Label weight={LABEL_WEIGHT[700]}>More</Label>,
            renderLogic: (row, idx) => <UncontrolledDropdownV2 data={{ row, idx }} action={ACTION_BUTTONS} />
        },
    ]

    const ACTION_BUTTONS = [
        {
            text: "View Details",
            onClickCb: (row) => navigate(`/${CLIENT_EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${CLIENT_EPISODE_MANAGEMENT.CHILD_ROUTS.EPISODE_DETAILS}/${row.episode.id}`)
        }
    ];

    useEffect(() => {
        dispatch(setHeaderLabel("Episode List"))
    }, [])

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            dispatch(getClientEpisodeList({ agencyId, userId, type: "nurse", status: PaginationState.Status, searchKey: PaginationState.FilterText, pageNumber: PaginationState.PageNumber, limit: PaginationState.PageSize, token }))
        }, 300);

        return () => {
            clearTimeout(debounceTimer);
        }
    }, [PaginationState.FilterText]);

    return (
        <Loadable loadingStates={loadingState.state} loadingMessage={loadingState.message}>
            <div className='w-25'>
                <TextInput
                    type='text'
                    placeHolder={'Patient Name, Physician Name'}
                    name='MiddleName'
                    className='me-2'
                    value={PaginationState.FilterText}
                    onChangeCb={(e) => dispatch(setPaginationState({ FilterText: e.target.value }))}
                />
            </div>

            <RichGrid
                data={clientEpisodeList}
                columns={JOB_APPLICATION_COLUMNS}
                selectable={true}
                extractRowKey={(row) => row.id}
                onSelectionChangeCallBack={(selectedData) => dispatch(setSelectedClientEpisodes(selectedData))}
                onHeaderSelectionChangeCallBack={(selectedData) => dispatch(setSelectedClientEpisodes(selectedData))}
                selectedRows={selectedClientEpisodes}
                paginationProps={{
                    page: PaginationState.PageNumber,
                    take: PaginationState.PageSize,
                    total: PaginationState.totalEpisode,
                    onChangeTakeCb: (newTake) => {
                        dispatch(setPaginationState({ ...PaginationState, PageNumber: 1, PageSize: newTake }))
                        dispatch(getClientEpisodeList({ agencyId, userId, type: "nurse", status: PaginationState.Status, searchKey: PaginationState.FilterText, pageNumber: 1, limit: newTake, token }))
                    },
                    onChange: (page) => {
                        dispatch(getClientEpisodeList({ agencyId, userId, type: "nurse", status: PaginationState.Status, searchKey: PaginationState.FilterText, pageNumber: page, limit: PaginationState.PageSize, token }))
                        dispatch(setPaginationState({ PageNumber: page }))
                    },
                }}
            />
        </Loadable>
    )
}

export default ClientEpisodeListing
