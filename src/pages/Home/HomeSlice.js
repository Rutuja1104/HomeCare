import store from '../../store/store';
import { PAGE_STATE } from '../../libs/constant';

export const componentKey = 'HOME_SECTION';

const { actions } = store.reducerManager.add({
    key: componentKey,
    addedReducers: {
        setLoadingState: (state, action) => {
            state.loadingState = action.payload;
        },
        setEpisodeByStatus: (state, action) => {
            state.episodeByStatus = action.payload;
        },
        setPatientsBirthdayList: (state, action) => {
            state.patientsBirthdayList = action.payload;
        },
        setJobApplicationCount: (state, action) => {
            state.jobApplicationCount = action.payload;
        },
        setPatientOnBoardedCount: (state, action) => {
            state.patientOnBoardedCount = action.payload;
        },
        setPendingClaimsCount: (state, action) => {
            state.pendingClaimsCount = action.payload;
        },
        setAlertsOptions: (state, action) => {
            const { name, selectedOption } = action.payload;
            const copiedObject = { ...state.alertOptions };
            copiedObject[name] = selectedOption;
            state.alertOptions = copiedObject;
        },
        setAgencyDetails: (state, action) => {
            state.agencyDetails = action.payload;
        },
        setScheduledTaskList: (state, action) => {
            state.scheduledTaskList = action.payload;
        },
        setLoggedInUserDetails:(state,action) => {
            state.loggedInUserDetails = action.payload;
        }
    },
    initialReducerState: {
        loadingState: { state: PAGE_STATE.PAGE_READY, message: '' },
        episodeByStatus: [],
        patientsBirthdayList: [],
        jobApplicationCount: [],
        patientOnBoardedCount: [],
        pendingClaimsCount: [],
        alertOptions: {
            roles: { value: '', label: '', errors: {}, rules: { required: true } }
        },
        agencyDetails: {},
        scheduledTaskList: [],
        loggedInUserDetails:{}
    }
});

export const {
    setLoadingState,
    setEpisodeByStatus,
    setPatientsBirthdayList,
    setJobApplicationCount,
    setPatientOnBoardedCount,
    setPendingClaimsCount,
    setAlertsOptions,
    setAgencyDetails,
    setScheduledTaskList,
    setLoggedInUserDetails
} = actions;
