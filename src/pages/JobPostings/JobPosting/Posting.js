import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import { setHeaderLabel } from '../../../layouts/LayoutSlice';
import {
    componentKey,
    setAllRequiredFieldsTouched,
    setEmptyJobPostingData,
    setJobPostAllRequiredFieldsTouched,
    setJobPostStates,
    setPaginationState,
    setProfessionalJobRoles,
    setSelectedJobPost,
    setSelectedJobPostAction,
    setShowDeleteJobPostModal,
    setShowJobPostingModal,
    setUpadateJobPostingModal,
    setUpdateROwSelectedData,
    setUpdatedJobPostData,
    setViewJobPostingModal
} from '../JobPostingSlice';
import { VEC_ICON_NAME } from '../../../components/icon/constants';
import { BUTTON_TYPE } from '../../../libs/constant';
import { LABEL_WEIGHT } from '../../../components/label/labelV2/constants';
import { deleteJobPost, getAllJobPostingByAgencyId, postCreateJobPost, putJobPost } from '../JobPostingSaga';
import { Tooltip } from 'reactstrap';

import RichGrid from '../../../components/richgrid/RichGrid';
import BadgeV2 from '../../../components/badge/BadgeV2';
import UncontrolledDropdownV2 from '../../../components/uncontrolledDropdown/UncontrolledDropdown';
import General from '../../../libs/utility/General';
import Loadable from '../../../components/loadable/Loadable';
import Label from '../../../components/label/labelV2/Label';
import Button from '../../../components/button/Button';
import JobPostingModal from '../../../components/models/JobPostingModal';
import { generalValidator } from '../../../libs/utility/validators/GeneralValidator';
import ConfirmationModal from '../../../components/models/ConfirmationModal';
import { JOB_ROLES } from '../constants';
import { ROW_SELECTION_OPTIONS } from '../../../components/pagination/constants';
import ViewJobPostingModal from '../../../components/models/ViewJobPostingModal';
import UpdateJobPostingModal from '../../../components/models/updateJobPostingModal';
import { componentKey as dataLoaderComponentKey } from '../../../components/loaders/dataloader/DataLoaderSlice';
import { getAgencyDetailsById } from '../../../components/loaders/dataloader/DataLoaderSaga';


const Posting = () => {
    const [copySuccess, setCopySuccess] = useState(false);

    const dispatch = useDispatch();
    const {
        loadingState,
        allJobsList,
        selectedJobPost,
        jobPostStates,
        showJobPostingModal,
        jobPostAllRequiredFieldsTouched,
        showDeleteJobPostModal,
        selectedJobPostAction,
        professionalJobRoles,
        PaginationState,
        viewJobPostingModal,
        updateJobPostingModal,
        updatedJobPostData,
        updatedJobPostRequiredData
    } = useSelector((state) => state[componentKey]);


    const [selectedRow, setSelectedRow] = useState(null);
    const agencyId = General.getLocalStorageData('agencyId');
    const token = General.getLocalStorageData('token');
    useEffect(() => {
        if (agencyId) {
            dispatch(setHeaderLabel('Job Posting List'));
            dispatch(
                getAllJobPostingByAgencyId({
                    agencyId,
                    pageNumber: PaginationState.pageNumber,
                    limit: PaginationState.PageSize
                })
            );
            dispatch(setProfessionalJobRoles(JOB_ROLES));
            dispatch(getAgencyDetailsById(agencyId))
        }
    }, [agencyId,showJobPostingModal]);

    const ACTION_BUTTONS = [
        {
            text: 'View',
            onClickCb: (row, idx) => {
                setSelectedRow(row);
                dispatch(setViewJobPostingModal(true));
            }
        },
        {
            text: 'Update',
            onClickCb: (row, idx) => {
                setSelectedRow(row);
                dispatch(setUpadateJobPostingModal(true));
                dispatch(setSelectedJobPostAction(row));
            }
        },
        {
            text: 'Delete',
            onClickCb: (row, idx) => {
                dispatch(setShowDeleteJobPostModal(true));
                dispatch(setSelectedJobPostAction(row));
            }
        }
    ];

    const JOB_APPLICATION_COLUMNS = [
        {
            field: 'userName',
            header: <Label weight={LABEL_WEIGHT[700]}>Title</Label>,
            renderLogic: (row, idx) => <span>{row?.title}</span>
        },
        {
            field: 'userName',
            header: <Label weight={LABEL_WEIGHT[700]}>Agency Name</Label>,
            renderLogic: (row, idx) => <span>{row?.agencyName}</span>
        },
        {
            field: 'userName',
            header: <Label weight={LABEL_WEIGHT[700]}>Role</Label>,
            renderLogic: (row, idx) => <BadgeV2 color={General.renderBadgeColor(row?.role || '')}>{row?.role}</BadgeV2>
        },
        {
            field: 'userName',
            header: <Label weight={LABEL_WEIGHT[700]}>Location</Label>,
            renderLogic: (row, idx) => <span>{row?.jobLocation}</span>
        },
        {
            field: 'userName',
            header: <Label weight={LABEL_WEIGHT[700]}>Job Posted Date</Label>,
            renderLogic: (row, idx) => <span>{moment(row?.created_at).format('LL')}</span>
        },
        {
            field: 'userName',
            header: <Label weight={LABEL_WEIGHT[700]}>Job Type</Label>,
            renderLogic: (row, idx) => <span>{row?.jobType}</span>
        },
        {
            field: 'userName',
            header: <Label weight={LABEL_WEIGHT[700]}>Status</Label>,
            renderLogic: (row, idx) => (
                <BadgeV2 color={General.renderBadgeColor(row?.status || '')}>{row?.status}</BadgeV2>
            )
        },
        {
            field: 'userName',
            header: <Label weight={LABEL_WEIGHT[700]}>Action</Label>,
            renderLogic: (row, idx) => <UncontrolledDropdownV2 data={{ row, idx }} action={ACTION_BUTTONS} />
        }
    ];

    const { agencyDetail } = useSelector((state) => state[dataLoaderComponentKey])

    useEffect(() => {
        if (agencyDetail) {
            dispatch(setJobPostStates({ "agencyName": { value: agencyDetail.name } }));
        }
    }, [agencyDetail])

    function containsSpecialChars(str) {
        var specialChars = /[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/;
        return specialChars.test(str);
    }
    
    const onChangeHandler = (event, rules) => {
        const { name, value, type } = event.target;

        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(setJobPostStates({ [name]: { value, errors, rules } }));
        } else {
            let regex = /\d/;

            if ((regex.test(value) && type == 'text') || (type == 'text' && containsSpecialChars(value))) {
                return;
            }
            if (name === 'description') {
                dispatch(setJobPostStates({ [name]: { value } }));
            } else {
                dispatch(setJobPostStates({ [name]: { value } }));
            }
        }
    };

    const onChangeHandlerOfUpdatedJobPostData = (event, rules) => {
        const { name, value } = event.target;

        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(setUpdateROwSelectedData({ [name]: { value, errors, rules } }));
        } else {
            if (name === 'description') {
                dispatch(setUpdateROwSelectedData({ [name]: { value } }));
            } else {
                dispatch(setUpdateROwSelectedData({ [name]: { value } }));
            }
        }
    };

    const copyToClipBoard = async (copyMe) => {
        try {
            await navigator.clipboard.writeText(copyMe);
            setCopySuccess(true);
        } catch (err) {
            setCopySuccess(false);
        }
    };

    const handleCopyToClipboardClick = () => {
        let url = `https://app.dev.allinoneemr.com/job-postings/${agencyId}`;
        copyToClipBoard(url);
    };

    const checkValidation = (jobPostStates) => {
        if (
            jobPostStates.title.value &&
            jobPostStates.description.value &&
            jobPostStates.role.value &&
            jobPostStates.jobLocation.value &&
            jobPostStates.jobType.value &&
            jobPostStates.agencyName.value &&
            jobPostStates?.salaryType?.value == 'In-Range' &&
            jobPostStates.minimumHourlySalary.value &&
            jobPostStates.maximumHourlySalary.value
        ) {
            return true;
        } else if (
            jobPostStates.title.value &&
            jobPostStates.description.value &&
            jobPostStates.role.value &&
            jobPostStates.jobLocation.value &&
            jobPostStates.jobType.value &&
            jobPostStates.agencyName.value &&
            jobPostStates?.salaryType?.value == 'Fixed' &&
            jobPostStates.salary.value
        ) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <Loadable loadingStates={loadingState.state} loadingMessage={loadingState.message}>
            <div className="d-flex">
                <Button
                    onClickCb={() => dispatch(setShowJobPostingModal(true))}
                    variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}
                    prefixProps={{ icon: VEC_ICON_NAME.PLUS_ICON }}
                    className="mb-4"
                >
                    Create Job Post
                </Button>
                <Button id="tooltipUrl" className="mb-4 ms-3" onClickCb={handleCopyToClipboardClick}>
                    Copy Job Posting Link
                </Button>

                {copySuccess && (
                    <Tooltip
                        placement="bottom"
                        target="tooltipUrl"
                        isOpen={copySuccess}
                        toggle={() => setCopySuccess(!copySuccess)}
                    >
                        Copied to clipboard
                    </Tooltip>
                )}
            </div>
            <RichGrid
                data={allJobsList}
                columns={JOB_APPLICATION_COLUMNS}
                selectable={true}
                extractRowKey={(row) => row.id}
                onSelectionChangeCallBack={(selectedData) => dispatch(setSelectedJobPost(selectedData))}
                onHeaderSelectionChangeCallBack={(selectedData) => dispatch(setSelectedJobPost(selectedData))}
                selectedRows={selectedJobPost}
                paginationProps={{
                    page: PaginationState.PageNumber,
                    take: PaginationState.PageSize,
                    takeOptions: ROW_SELECTION_OPTIONS,
                    total: PaginationState.totalJobPost,
                    onChangeTakeCb: (newTake) => {
                        dispatch(
                            setPaginationState({
                                ...PaginationState,
                                PageNumber: 1,
                                PageSize: newTake
                            })
                        );

                        dispatch(
                            getAllJobPostingByAgencyId({
                                agencyId,
                                pageNumber: PaginationState.pageNumber,
                                limit: newTake
                            })
                        );
                    },
                    onChange: (page) => {
                        dispatch(
                            getAllJobPostingByAgencyId({ agencyId, pageNumber: page, limit: PaginationState.PageSize })
                        );
                        dispatch(setPaginationState({ PageNumber: page }));
                    }
                }}
            />

            <JobPostingModal
                isOpen={showJobPostingModal}
                jobPostStates={jobPostStates}
                onChangeCb={onChangeHandler}
                modalTitle={'CREATE JOB POST'}
                toggle={() => {
                    dispatch(setJobPostAllRequiredFieldsTouched(false));
                    dispatch(setEmptyJobPostingData());
                    dispatch(setShowJobPostingModal(!showJobPostingModal));
                }}
                allRequiredFieldsTouched={jobPostAllRequiredFieldsTouched}
                jobRoles={professionalJobRoles}
                onSuccessCb={() => {
                    dispatch(setJobPostAllRequiredFieldsTouched(true));

                    if (checkValidation(jobPostStates)) {
                        const maxSalary = Number(jobPostStates?.maximumHourlySalary?.value);
                        const minSalary = Number(jobPostStates?.minimumHourlySalary?.value);
                        if ((maxSalary  > minSalary)||jobPostStates?.salary?.value) {
                            let data = {
                                title: jobPostStates.title.value,
                                description: jobPostStates.description.value,
                                status: 'Open',
                                role: JOB_ROLES.find((item) => item.name == jobPostStates.role.value).code,
                                jobLocation: jobPostStates.jobLocation.value,
                                jobType: jobPostStates.jobType.value,
                                agencyName: jobPostStates.agencyName.value
                            };

                            let additionalField = {};
                            if (jobPostStates?.salaryType?.value == 'In-Range')
                                additionalField = {
                                    salaryRange: `${jobPostStates.minimumHourlySalary.value}-${jobPostStates.maximumHourlySalary.value}`
                                };
                            else if (jobPostStates?.salaryType?.value == 'Fixed')
                                additionalField = { fixedSalary: jobPostStates.salary.value };

                            data = { ...data, ...additionalField };
                            dispatch(postCreateJobPost({ data, agencyId, PaginationState, token }));
                            dispatch(setEmptyJobPostingData());
                            dispatch(setJobPostAllRequiredFieldsTouched(false));
                        }
                    }
                }}
            />

            <ConfirmationModal
                isOpen={showDeleteJobPostModal}
                bodyContent="Are you sure you want to delete this job post"
                onSuccessCb={() =>
                    dispatch(deleteJobPost({ agencyId, jobId: selectedJobPostAction.id, token, PaginationState }))
                }
                toggle={() => dispatch(setShowDeleteJobPostModal(!showDeleteJobPostModal))}
                successButtonText="Delete"
            />

            <ViewJobPostingModal
                isOpen={viewJobPostingModal}
                toggle={() => dispatch(setViewJobPostingModal(!viewJobPostingModal))}
                data={selectedRow}
            />

            <UpdateJobPostingModal
                isOpen={updateJobPostingModal}
                updatedJobPostData={selectedJobPostAction}
                // jobPostStates={selectedRow}
                allRequiredFieldsTouched={updatedJobPostRequiredData}

                toggle={() => dispatch(setUpadateJobPostingModal(!updateJobPostingModal))}
                modalTitle={'UPDATE JOB POST'}
                jobRoles={professionalJobRoles}
                onSuccessCb={() => {

                    let data = {
                        title: updatedJobPostData?.title?.value || selectedJobPostAction.title,
                        description: updatedJobPostData?.description?.value || selectedJobPostAction?.description,
                        role: selectedJobPostAction?.role,
                        jobLocation: updatedJobPostData?.jobLocation?.value || selectedJobPostAction?.jobLocation,
                        jobType: updatedJobPostData?.jobType?.value || selectedJobPostAction?.jobType,
                        status: updatedJobPostData?.status?.value || selectedJobPostAction?.status
                    };

                    let additionalField = {};
                    if (selectedJobPostAction?.salaryType == 'In-Range')
                        additionalField = {
                            salaryRange: `${selectedJobPostAction.minimumHourlySalary}-${selectedJobPostAction.maximumHourlySalary}`,
                            fixedSalary: null
                        };
                    else if (selectedJobPostAction?.salaryType == 'Fixed')
                        additionalField = {
                            fixedSalary: `${selectedJobPostAction.fixedSalary }`,
                            salaryRange: null
                        };

                    data = { ...data, ...additionalField };

                    dispatch(putJobPost({ agencyId, jobId: selectedJobPostAction?.id, token, data, PaginationState }));
                }}
                onChangeCb={onChangeHandlerOfUpdatedJobPostData}
            />
        </Loadable>
    );
};

export default Posting;
