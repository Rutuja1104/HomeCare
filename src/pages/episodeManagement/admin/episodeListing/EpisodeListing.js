import React, { useEffect } from 'react';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import { setHeaderLabel } from '../../../../layouts/LayoutSlice';
import { componentKey as episodeManagementComponentKey } from '../EpisodeManagementSlice';
import {
    componentKey,
    setEpisodePaginationState,
    setSelectedEpisode,
    setSelectedEpisodeToDelete,
    setShowDeleteEpisodeModal,
    setShowSelectPatientModal
} from './EpisodeListingSlice';
import { deleteEpisode, getAllPatientList, getEpisodeListByAgencyId } from './EpisodeListingSaga';
import { useNavigate } from 'react-router-dom';
import { EPISODE_MANAGEMENT } from '../../../../routes/constants';
import { LABEL_WEIGHT } from '../../../../components/label/labelV2/constants';

import Loadable from '../../../../components/loadable/Loadable';
import TextInput from '../../../../components/input/textinput/TextInput';
import Button from '../../../../components/button/Button';
import RichGrid from '../../../../components/richgrid/RichGrid';
import Label from '../../../../components/label/labelV2/Label';
import UncontrolledDropdownV2 from '../../../../components/uncontrolledDropdown/UncontrolledDropdown';
import PatientListModal from '../../../../components/models/PatientListModal';
import useFlexCleanup from '../../../../store/FlexCleanup';
import SelectDropdown from '../../../../components/select/Select';
import { EPISODE_LISTING_STATUS } from '../constants';
import ConfirmationModal from '../../../../components/models/ConfirmationModal';
import General from '../../../../libs/utility/General';

const EpisodeListing = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = General.getLocalStorageData('token');
    const agencyId = General.getLocalStorageData('agencyId');

    useFlexCleanup(componentKey);

    const { loadingState } = useSelector((state) => state[episodeManagementComponentKey]);
    const {
        showSelectPatientModal,
        selectedPatient,
        allPatientList,
        episodeList,
        EpisodePaginationState,
        PaginationState,
        selectedEpisode,
        showDeleteEpisodeModal,
        selectedEpisodeToDelete
    } = useSelector((state) => state[componentKey]);

    useEffect(() => {
        dispatch(setHeaderLabel('Episode List'));
        dispatch(
            getAllPatientList({
                agencyId,
                pageNumber: PaginationState.PageNumber,
                limit: PaginationState.PageSize,
                status: PaginationState.Status,
                searchKey: PaginationState.FilterText,
                token
            })
        );
    }, []);

    const ACTION_BUTTONS = [
        {
            text: 'View Details',
            onClickCb: (row) =>
                navigate(
                    `/${EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${EPISODE_MANAGEMENT.CHILD_ROUTS.EPISODE_DETAILS}/${row.id}`
                )
        },
        {
            text: 'Delete Episode',
            onClickCb: (row) => {
                dispatch(setSelectedEpisodeToDelete(row));
                dispatch(setShowDeleteEpisodeModal(true));
            }
        }
    ];

    const JOB_APPLICATION_COLUMNS = [
        {
            field: 'userName',
            header: <Label weight={LABEL_WEIGHT[700]}>Patient Name</Label>,
            renderLogic: (row, idx) => (
                <span>
                    {row?.Patient.firstName} {row?.Patient?.lastName}
                </span>
            )
        },
        {
            field: 'userName',
            header: <Label weight={LABEL_WEIGHT[700]}>Physician</Label>,
            renderLogic: (row, idx) => (
                <span>
                    {row?.Physician?.firstName} {row?.Physician?.lastName}
                </span>
            )
        },
        {
            field: 'userName',
            header: <Label weight={LABEL_WEIGHT[700]}>Assigned To</Label>,
            renderLogic: (row, idx) => (
                <span>
                    {row?.episodeAssignments[0].nurse.firstName} {row?.episodeAssignments[0].nurse.lastName}
                </span>
            )
        },
        {
            field: 'userName',
            header: <Label weight={LABEL_WEIGHT[700]}>Episode From</Label>,
            renderLogic: (row, idx) => <span>{moment(row?.startTime).format('LL')}</span>
        },
        {
            field: 'userName',
            header: <Label weight={LABEL_WEIGHT[700]}>Episode To</Label>,
            renderLogic: (row, idx) => <span>{moment(row?.endTime).format('LL')}</span>
        },
        {
            field: 'userName',
            header: <Label weight={LABEL_WEIGHT[700]}>Emergency Level</Label>,
            renderLogic: (row, idx) => <span>{row?.emergencyLevel}</span>
        },
        {
            field: 'userName',
            header: <Label weight={LABEL_WEIGHT[700]}>Duration</Label>,
            renderLogic: (row, idx) => <span>{row?.episodeDuration} Days</span>
        },
        {
            field: 'userName',
            header: <Label weight={LABEL_WEIGHT[700]}>More</Label>,
            renderLogic: (row, idx) => <UncontrolledDropdownV2 data={{ row, idx }} action={ACTION_BUTTONS} />
        }
    ];

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            dispatch(
                getEpisodeListByAgencyId({
                    agencyId,
                    pageNumber: EpisodePaginationState.PageNumber,
                    limit: EpisodePaginationState.PageSize,
                    token,
                    status: EpisodePaginationState.Status.value,
                    searchKey: EpisodePaginationState.FilterText
                })
            );
        }, 300);

        return () => {
            clearTimeout(debounceTimer);
        };
    }, [EpisodePaginationState.FilterText]);

    return (
        <Loadable loadingStates={loadingState.state} loadingMessage={loadingState.message}>
            <div className="episode-listing-header">
                <div className="episode-filter">
                    <TextInput
                        type="text"
                        placeHolder={'Patient Name, Physician Name'}
                        name="MiddleName"
                        className="me-2"
                        value={EpisodePaginationState.FilterText}
                        onChangeCb={(e) => dispatch(setEpisodePaginationState({ FilterText: e.target.value }))}
                    />
                    <SelectDropdown
                        type="text"
                        placeHolder="Select Nurse Role"
                        name="role"
                        onChangeCb={(event) => {
                            dispatch(setEpisodePaginationState({ Status: event.target.selectedOption }));
                            dispatch(
                                getEpisodeListByAgencyId({
                                    agencyId,
                                    pageNumber: EpisodePaginationState.PageNumber,
                                    limit: EpisodePaginationState.PageSize,
                                    token,
                                    status: event.target.selectedOption.value,
                                    searchKey: EpisodePaginationState.FilterText
                                })
                            );
                        }}
                        defaultValue={EpisodePaginationState.Status}
                        options={EPISODE_LISTING_STATUS}
                    />
                </div>
                <Button onClickCb={() => dispatch(setShowSelectPatientModal(!showSelectPatientModal))}>
                    Add Episode
                </Button>
            </div>
            <RichGrid
                data={episodeList}
                columns={JOB_APPLICATION_COLUMNS}
                selectable={true}
                extractRowKey={(row) => row.id}
                onSelectionChangeCallBack={(selectedData) => dispatch(setSelectedEpisode(selectedData))}
                onHeaderSelectionChangeCallBack={(selectedData) => dispatch(setSelectedEpisode(selectedData))}
                selectedRows={selectedEpisode}
                paginationProps={{
                    page: EpisodePaginationState.PageNumber,
                    take: EpisodePaginationState.PageSize,
                    total: EpisodePaginationState.totalPatients,
                    onChangeTakeCb: (newTake) => {
                        dispatch(
                            setEpisodePaginationState({ ...EpisodePaginationState, PageNumber: 1, PageSize: newTake })
                        );
                        dispatch(
                            getEpisodeListByAgencyId({
                                agencyId,
                                pageNumber: 1,
                                limit: newTake,
                                token,
                                status: EpisodePaginationState.Status.value,
                                searchKey: EpisodePaginationState.FilterText
                            })
                        );
                    },
                    onChange: (page) => {
                        dispatch(
                            getEpisodeListByAgencyId({
                                agencyId,
                                pageNumber: page,
                                limit: EpisodePaginationState.PageSize,
                                token,
                                status: EpisodePaginationState.Status.value,
                                searchKey: EpisodePaginationState.FilterText
                            })
                        );
                        dispatch(setEpisodePaginationState({ PageNumber: page }));
                    }
                }}
            />

            <PatientListModal
                data={allPatientList}
                isOpen={showSelectPatientModal}
                toggle={() => dispatch(setShowSelectPatientModal(!showSelectPatientModal))}
                selectedPatient={selectedPatient}
                onSuccessCb={() => {
                    if (selectedPatient.length !== 0) {
                        navigate(
                            `/${EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${EPISODE_MANAGEMENT.CHILD_ROUTS.PATIENT_DETAILS}?pid=${selectedPatient[0].id}`
                        );
                    }
                }}
            />

            <ConfirmationModal
                isOpen={showDeleteEpisodeModal}
                bodyContent="Are you sure, you want to delete this episode!"
                header="Are you sure?"
                successButtonText="Delete"
                toggle={() => dispatch(setShowDeleteEpisodeModal(!showDeleteEpisodeModal))}
                onSuccessCb={() => {
                    console.log(selectedEpisodeToDelete);
                    dispatch(
                        deleteEpisode({
                            agencyId,
                            episodeId: selectedEpisodeToDelete.id,
                            token,
                            EpisodePaginationState
                        })
                    );
                }}
            />
        </Loadable>
    );
};

export default EpisodeListing;
