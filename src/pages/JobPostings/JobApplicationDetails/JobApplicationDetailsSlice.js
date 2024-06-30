import store from '../../../store/store'
import { PAGE_STATE } from '../../../libs/constant'
import { SCHEDULE_INTERVIEW_STATE } from './constants'

export const componentKey = 'JOB_POSTING/JOB_APPLICATION_DETAILS'

const { actions } = store.reducerManager.add({
    key: componentKey,
    addedReducers: {
        setLoadingState: (state, action) => {
            state.loadingState = action.payload
        },
        setJobApplicationDetails: (state, action) => {
            state.jobApplicationDetails = action.payload
        },
        setBackgroundCheckDetails: (state, action) => {
            state.backgroundCheckDetails = action.payload
        },
        setShowScheduleInterviewModel: (state, action) => {
            state.showScheduleInterviewModel = action.payload
        },
        setShowUpdateInterviewStatusModel: (state, action) => {
            state.showUpdateInterviewStatusModel = action.payload
        },
        setScheduleInterview: (state, action) => {
            let scheduleInterview = { ...state.scheduleInterview };

            Object.entries(action.payload).map(([key, value]) => {
                scheduleInterview = {
                    ...state.scheduleInterview,
                    [key]: {
                        ...state.scheduleInterview[key],
                        ...value
                    },
                };

                state.scheduleInterview = scheduleInterview;
            })
        },
        setAutoCompleteAddressFields: (state, action) => {
            state.scheduleInterview = { ...state.scheduleInterview, ...action.payload };
        },
        setScheduleInterviewFieldsTouched: (state, action) => {
            state.scheduleInterview.allRequiredFieldsTouched = action.payload
        },
        setInterviewStatus: (state, action) => {
            state.interviewStatus = action.payload
        },
        setReadOnlyAssessmentResult: (state, action) => {
            state.readOnlyAssessmentResult = action.payload
        },
        setAssessmentResult: (state, action) => {
            state.assessmentResult = action.payload
        },
        setActiveJobApplicationStep: (state, action) => {
            state.activeJobApplicationStep = action.payload
        },
        setJobApplicationCompleteDetails: (state, action) => {
            state.jobApplicationCompleteDetails = action.payload
        },
        setJobApplicationDocumentsList: (state, action) => {
            state.jobApplicationDocumentsList = action.payload
        },
        setS3UploadedDocumentList: (state, action) => {
            state.setS3UploadedDocumentList = action.payload
        },
        setUserStatus: (state, action) => {
            state.userStatus = action.payload
        },
        setEligibilityFormVerificationFormData: (state, action) => {
            state.eligibilityFormVerificationFormData = action.payload
        },
        setEligibilityWithHoldingFormData: (state, action) => {
            state.eligibilityWithHoldingFormData = action.payload
        },
        setReadOnlyCompetencyChecklist: (state, action) => {
            state.readOnlyCompetencyChecklist = action.payload
        },
        setNavigateToNewPage: (state, action) => {
            state.navigateToNewPage = action.payload
        },
        setNurseSignatureOnChecklist: (state, action) => {
            state.nurseSignatureOnChecklist = action.payload
        },
        setInterviewScheduledDetails: (state, action) => {
            state.interviewScheduledDetails = action.payload;
        },
        setClearScheduleUserInterview: (state, action) => {
            state.scheduleInterview = SCHEDULE_INTERVIEW_STATE
        },
        setApproversSign: (state, action) => {
            state.approversSign = action.payload;
        },
        setSubmittedChecklist: (state, action) => {
            state.submittedChecklist = action.payload
        }
        
    },
    initialReducerState: {
        loadingState: { state: PAGE_STATE.PAGE_READY, message: '' },
        jobApplicationDetails: [],
        backgroundCheckDetails: [],
        readOnlyAssessmentResult: [],
        assessmentResult: "",
        activeJobApplicationStep: 0,
        jobApplicationCompleteDetails: {},
        jobApplicationDocumentsList: [],
        setS3UploadedDocumentList: [],
        userStatus: "Validated",
        readOnlyCompetencyChecklist: [],
        nurseSignatureOnChecklist: "",

        eligibilityFormVerificationFormData: [],
        eligibilityWithHoldingFormData: [],

        scheduleInterview: SCHEDULE_INTERVIEW_STATE,

        interviewStatus: "",
        navigateToNewPage: false,

        //models
        showScheduleInterviewModel: false,
        showUpdateInterviewStatusModel: false,
        interviewScheduledDetails: {},
        receivedDate: "",
        approversSign: "",
        submittedChecklist: {},

    }
})

export const { setLoadingState, setJobApplicationDetails, setBackgroundCheckDetails, setShowScheduleInterviewModel, setScheduleInterviewFieldsTouched, setScheduleInterview, setShowUpdateInterviewStatusModel, setInterviewStatus, setReadOnlyAssessmentResult, setAssessmentResult, setActiveJobApplicationStep, setJobApplicationCompleteDetails, setJobApplicationDocumentsList, setS3UploadedDocumentList, setUserStatus, setEligibilityWithHoldingFormData, setEligibilityFormVerificationFormData, setReadOnlyCompetencyChecklist, setNavigateToNewPage, setNurseSignatureOnChecklist, setInterviewScheduledDetails, setClearScheduleUserInterview,setReceivedDate,setAutoCompleteAddressFields, setApproversSign, setSubmittedChecklist } = actions
