import store from '../../store/store'
import { all, put, takeLatest } from 'redux-saga/effects'
import { componentKey, setAgencyDetails, setEpisodeByStatus, setEpisodeByStatusClosed, setEpisodeByStatusCount, setJobApplicationCount, setLoadingState, setLoggedInUserDetails, setPatientOnBoardedCount, setPatientsBirthdayList, setPendingClaimsCount, setScheduledTaskList } from './HomeSlice'
import { PAGE_STATE } from '../../libs/constant'
import HomeDataService from '../../services/HomeDataService'
import General from '../../libs/utility/General'

export const { getHomeDetails, getEpisodeByStatus, getPatientsBirthdayList, getEpisodeByStatusCLOSED, getEpisodeByStatusCOUNT, getJobApplicationCount, getPatientOnBoardingCount, getPendingClaimsCount, getAgencyDetails, getScheduledTasksList,getLoggedInUserDetails,postProfileImg } = {
    getHomeDetails: (payload) => {
        return {
            type: 'HOME/ACTION_EXAMPLE',
            payload
        }
    },
    getEpisodeByStatus: (payload) => {
        return {
            type: 'HOME/GET_EPISODE_BY_STATUS_OPEN',
            payload
        }
    },
    getPatientsBirthdayList: (payload) => {
        return {
            type: 'HOME/GET_PATIENTS_BIRTHDAY_LIST',
            payload
        }
    },
    getEpisodeByStatusCLOSED: (payload) => {
        return {
            type: 'HOME/GET_EPISODE_BY_STATUS_CLOSED',
            payload
        }
    },
    getEpisodeByStatusCOUNT: (payload) => {
        return {
            type: 'HOME/GET_EPISODE_BY_STATUS_COUNT',
            payload
        }
    },
    getJobApplicationCount: (payload) => {
        return {
            type: 'HOME/GET_APPLICATION_COUNT',
            payload
        }
    },
    getPatientOnBoardingCount: (payload) => {
        return {
            type: 'HOME/GET_PATIENT_ONBOARDED_COUNT',
            payload
        }
    },
    getPendingClaimsCount: (payload) => {
        return {
            type: 'HOME/GET_PENDING_CLAIMS_COUNT',
            payload
        }
    },
    getAgencyDetails: (payload) => {
        return {
            type: 'HOME/GET_AGENCY_DETAILS',
            payload
        }
    },
    getScheduledTasksList: (payload) => {
        return {
            type: 'HOME/GET_SCEDULED_TASK_LIST',
            payload
        }
    },
    getLoggedInUserDetails: (payload) => {
        return {
            type: 'HOME/GET_LOGGEDIN_USER_DETAILS',
            payload
        }
    },
    postProfileImg:(payload)=>{
        return {
            type: 'HOME/POST_PROFILE_IMG',
            payload
        }
    }
}

function* getHomeDetailsAsync(action) {

    try {

        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Payers List' }))


        const response = yield HomeDataService.getApiDetails()

    } catch (error) {
        console.log('err: ', error)
    }

}
function* getEpisodeByStatusAsync() {
    try {
        const agencyId = General.getLocalStorageData('agencyId');
        const token = General.getLocalStorageData("token")

        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details' }));
        const response = yield HomeDataService.getEpisodeByStatus(agencyId,token)
        yield put(setEpisodeByStatus(response.data))
    } catch (error) {
        console.log('err', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}


function* getJobApplicationCountAsync() {
    try {
        const agencyId = General.getLocalStorageData('agencyId');
        const token = General.getLocalStorageData("token")

        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details' }));
        const response = yield HomeDataService.getJobApplicationCount(token)
        yield put(setJobApplicationCount(response.data))
    } catch (error) {
        console.log('err', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* getPatientsBirthdayListAsync() {
    try {
        const agencyId = General.getLocalStorageData('agencyId');

        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details' }));
        const response = yield HomeDataService.getPatientsBirthdayList(agencyId)
        yield put(setPatientsBirthdayList(response.data))
    } catch (error) {
        console.log('err', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* getPatientOnBoardingCountAsync() {
    try {
        const agencyId = General.getLocalStorageData('agencyId');

        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details' }));
        const response = yield HomeDataService.getPatientOnBoardingCount()
        yield put(setPatientOnBoardedCount(response.data))
    } catch (error) {
        console.log('err', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* getPendingClaimsCountAsync() {
    try {
        const agencyId = General.getLocalStorageData('agencyId');

        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details' }));
        const response = yield HomeDataService.getPendingClaimsCount(agencyId)
        yield put(setPendingClaimsCount(response.data))
    } catch (error) {
        console.log('err', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* getAgencyDetailsAsync() {
    try {
        const agencyId = General.getLocalStorageData('agencyId');

        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details' }));
        const response = yield HomeDataService.getAgencyDetails(agencyId)
        yield put(setAgencyDetails(response.data))
    } catch (error) {
        console.log('err', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* getScheduledTasksListAsync() {
    try {
        const agencyId = General.getLocalStorageData('agencyId');

        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details' }));
        const response = yield HomeDataService.getScheduledTasksList(agencyId)
        yield put(setScheduledTaskList(response.data))
    } catch (error) {
        console.log('err', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* getLoggedInUserDetailsAsync(action) {
    const { agencyId,userId } = action.payload;

    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details' }));
        const response = yield HomeDataService.getLoggedInUserDetails(agencyId,userId)
        yield put(setLoggedInUserDetails(response.data))
    } catch (error) {
        console.log('err', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* postProfileImgAsync(action) {
    const { profilePhoto,userId} = action.payload;

    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details' }));
        const response = yield HomeDataService.postProfileImg(profilePhoto,userId)
        yield put(getLoggedInUserDetails({agencyId:response?.data?.agencyId,userId:response?.data?.userId}))
    } catch (error) {
        console.log('err', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* rootSaga() {
    yield all([
        takeLatest(getHomeDetails().type, getHomeDetailsAsync),
        takeLatest(getEpisodeByStatus().type, getEpisodeByStatusAsync),
        takeLatest(getPatientsBirthdayList().type, getPatientsBirthdayListAsync),
        takeLatest(getJobApplicationCount().type, getJobApplicationCountAsync),
        takeLatest(getPatientOnBoardingCount().type, getPatientOnBoardingCountAsync),
        takeLatest(getPendingClaimsCount().type, getPendingClaimsCountAsync),
        takeLatest(getAgencyDetails().type, getAgencyDetailsAsync),
        takeLatest(getScheduledTasksList().type, getScheduledTasksListAsync),
        takeLatest(getLoggedInUserDetails().type,getLoggedInUserDetailsAsync),
        takeLatest(postProfileImg().type,postProfileImgAsync)
    ])
}

store.sagaManager.addSaga(componentKey, rootSaga)