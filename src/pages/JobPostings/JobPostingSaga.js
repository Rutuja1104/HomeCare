import store from '../../store/store';
import { all, put, takeLatest } from 'redux-saga/effects';
import { PAGE_STATE } from '../../libs/constant';
import {
    componentKey,
    setAllJobsList,
    setAllRequiredFieldsTouched,
    setJobApplicationFormDataAsReset,
    setJobApplicationList,
    setLoadingState,
    setOpenJobApplicationModal,
    setPaginationState,
    setSelectedSingleJobPost,
    setShowApplicationDetailsModal,
    setShowDeleteJobPostModal,
    setShowJobPostingModal,
    setUpadateJobPostingModal,
    setUploadedResume
} from './JobPostingSlice';
import JobPostingService from '../../services/JobPostingService';
import { toast } from 'react-toastify';
import JobApplicationService from '../../services/JobApplicationService';
import AdminDataService from '../../services/AdminDataService';
import DocumentUploadService from '../../services/DocumentUploadService';
import General from '../../libs/utility/General';
import { JOB_APPLICATION_INITIAL_STATE } from './constants';

export const {
    getAllJobPostingByAgencyId,
    postApplyForJobApplication,
    getAllJobApplications,
    postSendEmailInvitation,
    putValidateUser,
    postCreateJobPost,
    postResumeForJobApplication,
    deleteJobPost,
    putJobPost,
    getSelectedJobPost
} = {
    getAllJobPostingByAgencyId: (payload) => {
        return {
            type: 'JOB_POSTING/GET_ALL_JOBS_LIST',
            payload
        };
    },
    postApplyForJobApplication: (payload) => {
        return {
            type: 'JOB_POSTING/APPLY_FOR_JOB_APPLICATION',
            payload
        };
    },
    getAllJobApplications: (payload) => {
        return {
            type: 'JOB_POSTING/GET_ALL_JOB_APPLICATIONS',
            payload
        };
    },
    postSendEmailInvitation: (payload) => {
        return {
            type: 'JOB_POSTING/SEND_EMAIL_INVITATION',
            payload
        };
    },
    putValidateUser: (payload) => {
        return {
            type: 'JOB_POSTING/VALIDATE_USER',
            payload
        };
    },
    postCreateJobPost: (payload) => {
        return {
            type: 'JOB_POSTING/CREATE_JOB_POST',
            payload
        };
    },
    postResumeForJobApplication: (payload) => {
        return {
            type: 'JOB_POSTING/RESUME_FOR_JOB_APPLICATION',
            payload
        };
    },
    deleteJobPost: (payload) => {
        return {
            type: 'JOB_POSTING/DELETE_JOB_POST',
            payload
        };
    },
    putJobPost: (payload) => {
        return {
            type: 'JOB_POSTING/UPDATE_JOB_POST',
            payload
        };
    },
    getSelectedJobPost: (payload) => {
        return {
            type: 'JOB_POSTING/GET_JOB_POST',
            payload
        };
    }
};

function* getAllJobPostingByAgencyIdAsync(action) {
    try {
        const { agencyId, pageNumber, limit } = action.payload;
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));

        const response = yield JobPostingService.getAllJobPostingByAgencyId({
            agencyId,
            pageNumber,
            limit
        });

        yield put(setPaginationState({ totalJobPost: response.data.count }));
        if (response.status === 200) {
            const sortedData = General.sortDataByField(response.data.data, 'created_at', false);
            yield put(setAllJobsList(sortedData));
        }
    } catch (error) {
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* postApplyForJobApplicationAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));

        const { data, file, formData } = action.payload;
        const response = yield JobPostingService.postApplyForJobApplication(data);

        if (response.status === 201) {
            toast.success('Job applied successfully!');
            yield put(setUploadedResume({}));
            yield put(setJobApplicationFormDataAsReset(JOB_APPLICATION_INITIAL_STATE));
            file.length !== 0
                ? yield put(
                    postResumeForJobApplication({
                        agencyId: response.data.agencyId,
                        applicationId: response.data.id,
                        fileName: file[0].name,
                        fileType: 'Resumes',
                        formData
                    })
                )
                : null;
        }
    } catch (error) {

        if (error.response?.status === 400) {
            // toast.error('The application with this email has already been submitted');
            toast.error(error?.response?.data?.message)
            yield put(setJobApplicationFormDataAsReset(JOB_APPLICATION_INITIAL_STATE));
        }
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
        yield put(setOpenJobApplicationModal(false));
        yield put(setAllRequiredFieldsTouched(false))
    }
}

function* getAllJobApplicationsAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));
        const { agencyId, token, limit, pageNumber, receivedDate, status, name } = action.payload;
        const response = yield JobApplicationService.getAllJobApplications({ agencyId, token, limit, pageNumber, receivedDate, status, name });

        if (response.status === 200) {
            yield put(setJobApplicationList(response.data.data));
            yield put(setPaginationState({ totalJobPost: response.data.count }));
        }
    } catch (error) {
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* postSendEmailInvitationAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Sending Invitation...' }));
        const { data, token } = action.payload;
        const response = yield AdminDataService.postSendEmailInvitation(data, token);

        if (response.status === 201) {
            toast.success('Invitation send successfully');
        }
    } catch (error) {
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY, message: 'Fetching Nurse List' }));
        yield put(setShowApplicationDetailsModal(false));
    }
}

function* putValidateUserAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));
        const { nurseId, data, token, agencyId,pageNumber,limit,status} = action.payload;
        const response = yield AdminDataService.putValidateUserApplication(nurseId, data);

        if (response.status == 200) {
            if (data.onboardingStatus == 'Active' || data.onboardingStatus == 'Fail') {
                toast.success(
                    `${data.onboardingStatus == 'Active'
                        ? 'Candidate onboarding completed successfully!'
                        : 'Candidate mark as failed!'
                    }`
                );
            } else if (data.onboardingStatus == 'Discarded') {
                toast.success('User details discarded!');
                yield put(getAllJobApplications({ agencyId, token,pageNumber,limit,status}));
            } else {
                toast.success('User details approved successfully!');
            }
        }
    } catch (error) {
        toast.error('Failed to approve user details!');
    } finally {
        yield put(setShowApplicationDetailsModal(false));
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* postCreateJobPostAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));
        const { agencyId, data, PaginationState, token } = action.payload;
        const response = yield JobPostingService.postCreateJobPost(agencyId, data, token);

        if (response.status === 201) {
            toast.success('Job post created successfully!');
            yield put(
                getAllJobPostingByAgencyId({
                    agencyId,
                    pageNumber: PaginationState.pageNumber,
                    limit: PaginationState.PageSize
                })
            );
        }
    } catch (error) {
        toast.error(error?.response?.data?.message?.toString());
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
        yield put(setShowJobPostingModal(false));
    }
}

function* postResumeForJobApplicationAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Uploading...' }));
        const { agencyId, applicationId, fileName, fileType, formData } = action.payload;
        const response = yield DocumentUploadService.postResumeForJobApplication(
            agencyId,
            applicationId,
            fileName,
            fileType,
            formData
        );
        if (response.status === 201) {
            toast.success('Resume Uploaded Successfully!');
        }
    } catch (error) {
        toast.error(error?.response?.data?.message?.toString());
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* deleteJobPostAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));
        const { agencyId, jobId, token, PaginationState } = action.payload;
        const response = yield JobPostingService.deleteJobPost(agencyId, jobId, token);
        if (response.status === 200) {
            toast.success('Job post deleted successfully!');
            yield put(
                getAllJobPostingByAgencyId({
                    agencyId,
                    pageNumber: PaginationState.pageNumber,
                    limit: PaginationState.PageSize
                })
            );
        }
    } catch (error) {
        toast.error(error?.response?.data?.message?.toString());
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
        yield put(setShowDeleteJobPostModal(false));
    }
}

function* putJobPostAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Uploading...' }));
        const { agencyId, jobId, data, PaginationState, token } = action.payload;
        const response = yield JobPostingService.putJobPost(agencyId, jobId, data, token);
        if (response.status === 200) {
            toast.success('Job post updated successfully!');
            yield put(setUpadateJobPostingModal(false))
            yield put(
                getAllJobPostingByAgencyId({
                    agencyId,
                    pageNumber: PaginationState.pageNumber,
                    limit: PaginationState.PageSize
                })
            );
        }
    } catch (error) {
        toast.error(error?.response?.data?.message?.toString());
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* getSelectedJobPostAsync (action) {
    try {
        const { agencyId, postId } = action.payload;
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));

        const response = yield JobPostingService.getSelectedJobPost({
            agencyId,
            postId,
        });

        yield put(setPaginationState({ totalJobPost: response.data.count }));
        if (response.status === 200) {
            yield put(setSelectedSingleJobPost(response?.data));
        }
    } catch (error) {
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* rootSaga() {
    yield all([
        takeLatest(getAllJobPostingByAgencyId().type, getAllJobPostingByAgencyIdAsync),
        takeLatest(postApplyForJobApplication().type, postApplyForJobApplicationAsync),
        takeLatest(getAllJobApplications().type, getAllJobApplicationsAsync),
        takeLatest(postSendEmailInvitation().type, postSendEmailInvitationAsync),
        takeLatest(putValidateUser().type, putValidateUserAsync),
        takeLatest(postCreateJobPost().type, postCreateJobPostAsync),
        takeLatest(postResumeForJobApplication().type, postResumeForJobApplicationAsync),
        takeLatest(deleteJobPost().type, deleteJobPostAsync),
        takeLatest(putJobPost().type, putJobPostAsync),
        takeLatest(getSelectedJobPost().type,getSelectedJobPostAsync)
    ]);
}

store.sagaManager.addSaga(componentKey, rootSaga);
