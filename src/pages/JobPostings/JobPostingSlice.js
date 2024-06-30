import store from '../../store/store';
import { PAGE_STATE } from '../../libs/constant';
import { JOB_POSTING_STATES, UPDATE_JOB_POSTING_STATES } from './constants';

export const componentKey = 'JOB_POSTING';

const { actions } = store.reducerManager.add({
    key: componentKey,
    addedReducers: {
        setLoadingState: (state, action) => {
            state.loadingState = action.payload;
        },
        setAllJobsList: (state, action) => {
            state.allJobsList = action.payload;
        },
        setOpenJobApplicationModal: (state, action) => {
            state.openJobApplicationModal = action.payload;
        },
        setAllRequiredFieldsTouched: (state, action) => {
            state.allRequiredFieldsTouched = action.payload;
        },
        setJobApplication: (state, action) => {
            let jobApplication = { ...state.jobApplication };

            Object.entries(action.payload).map(([key, value]) => {
                jobApplication = {
                    ...state.jobApplication,
                    [key]: {
                        ...state.jobApplication[key],
                        ...value
                    }
                };

                state.jobApplication = jobApplication;
            });
        },
        setJobApplicationDropdown: (state, action) => {
            const { name, selectedOption } = action.payload;
            const copiedObject = { ...state.jobApplicationDropdown };
            copiedObject[name] = selectedOption;
            state.jobApplicationDropdown = copiedObject;
        },
        setSelectedJobApplication: (state, action) => {
            state.selectedJobApplication = action.payload;
        },
        setJobApplicationList: (state, action) => {
            state.jobApplicationList = action.payload;
        },
        setSelectedJobApplicationList: (state, action) => {
            state.selectedJobApplicationList = action.payload;
        },
        setApplicationDetails: (state, action) => {
            state.applicationDetails = action.payload;
        },
        setShowApplicationDetailsModal: (state, action) => {
            state.showApplicationDetailsModal = action.payload;
        },
        setSelectedJobPost: (state, action) => {
            state.selectedJobPost = action.payload;
        },
        setJobPostStates: (state, action) => {
            let jobPostStates = { ...state.jobPostStates };

            Object.entries(action.payload).map(([key, value]) => {
                jobPostStates = {
                    ...state.jobPostStates,
                    [key]: {
                        ...state.jobPostStates[key],
                        ...value
                    }
                };

                state.jobPostStates = jobPostStates;
            });
        },

        setShowJobPostingModal: (state, action) => {
            state.showJobPostingModal = action.payload;
        },
        setJobPostAllRequiredFieldsTouched: (state, action) => {
            state.jobPostAllRequiredFieldsTouched = action.payload;
        },
        setUploadedResume: (state, action) => {
            state.uploadedResume = action.payload;
        },
        setShowDeleteJobPostModal: (state, action) => {
            state.showDeleteJobPostModal = action.payload;
        },
        setSelectedJobPostAction: (state, action) => {
            let obj = {...action.payload}
            const [minSalary, maxSalary] = obj && obj.salaryRange ? obj.salaryRange.split('-') : ['', ''];
            obj['minimumHourlySalary']=minSalary;
            obj['maximumHourlySalary']=maxSalary;
            obj["salaryType"] = obj.fixedSalary !== null ? "Fixed" : "In-Range" 

            state.selectedJobPostAction = obj;
        },
        setProfessionalJobRoles: (state, action) => {
            state.professionalJobRoles = action.payload.map((item) => ({ value: item.name, label: item.name }));
        },
        setEmptyJobPostingData: (state, action) => {
            state.jobPostStates = JOB_POSTING_STATES;
        },
        setJobApplicationFormDataAsReset: (state, action) => {
            state.jobApplication = action.payload;
        },
        setPaginationState: (state, action) => {
            state.PaginationState = { ...state.PaginationState, ...action.payload };
        },
        setViewJobPostingModal: (state, action) => {
            state.viewJobPostingModal = action.payload;
        },
        setUpadateJobPostingModal: (state, action) => {
            state.updateJobPostingModal = action.payload;
        },
        setUpdatedJobPostData: (state, action) => {
            let updatedJobPostData = { ...state.updatedJobPostData };
            
            Object.entries(action.payload).map(([key, value]) => {
                updatedJobPostData = {
                    ...state.updatedJobPostData,
                    [key]: {
                        ...state.updatedJobPostData[key],
                        ...value
                    }
                };
                
                state.updatedJobPostData = updatedJobPostData;
            });
        },
        
        setUpdateROwSelectedData: (state, action) => {
            const updatedItem = { ...state.selectedJobPostAction };
            const updatedItems = { ...updatedItem };
            if (action.payload) {
                for (const [key, value] of Object.entries(action.payload)) {
                    if(key==='description'){
                        updatedItems[key] = value?.value?.target?.value;
                    }else{
                        updatedItems[key] = value.value;
                    }
                }
            }

            state.selectedJobPostAction = updatedItems;
        },
        setCheckedCheckboxes: (state, action) => {
            const updatedChecbox = { ...state.checkedCheckboxes };
            const updatedItem = { ...updatedChecbox };
            if (action.payload === 'clear') {
                state.checkedCheckboxes = {
                    Received: false,
                    Pending: false,
                    Validated: false,
                    Scheduled: false,
                    Incomplete: false,
                    Discarded: false,
                    fail:false
                };
            } else {
                for (const [key, value] of Object.entries(action.payload)) {
                    updatedItem[key] = value;
                }

                state.checkedCheckboxes = updatedItem;
            }
        },
        checkedCheckboxes: {
            Received: false,
            Pending: false,
            Validated: false,
            Scheduled: false,
            Incomplete: false,
            Discarded: false,
            fail:false

        },
        setReceivedDate: (state, action) => {
            state.receivedDate = action.payload
        },
        setNameToSearch: (state, action) => {
            state.nameToSearch = action.payload
        },
        setUpdatedJobPostDataFieldTocuhed: (state, action) => {
            state.updatedJobPostRequiredDataFieldTocuhed = action.state
        },
        setSelectedSingleJobPost: (state, action) => {
            state.selectedSingleJobPost = action.payload
        },
        setShowPreviewOfPDF: (state,action) => {
            state.showPreviewOfPDF = action.payload
        }
    },
    initialReducerState: {
        loadingState: { state: PAGE_STATE.PAGE_READY, message: '' },
        allJobsList: [],
        openJobApplicationModal: false,
        allRequiredFieldsTouched: false,
        jobPostAllRequiredFieldsTouched: false,
        selectedJobApplication: {},
        jobApplicationList: [],
        applicationDetails: {},
        selectedJobPost: [],
        uploadedResume: {},
        selectedJobPostAction: {},

        showDeleteJobPostModal: false,
        showApplicationDetailsModal: false,
        showJobPostingModal: false,

        professionalJobRoles: [],

        jobApplication: {
            FirstName: { value: '', errors: {}, rules: { required: true } },
            MiddleName: { value: '', errors: {}, rules: { required: false } },
            LastName: { value: '', errors: {}, rules: { required: true } },
            TelephoneNumber: { value: '', errors: {}, rules: { required: true } },
            Experience: { value: '', errors: {}, rules: { required: false} },
            PreviousEmployerName: { value: '', errors: {}, rules: { required: true } },
            Email: {
                value: '',
                errors: {},
                rules: {
                    required: true,
                    regex: { pattern: /^\S+@\S+\.\S+$/, message: 'Please enter a valid email address' }
                }
            },
            isLicense: { value: '', errors: {}, rules: { required: true } },
            validAge: { value: '', errors: {}, rules: { required: true } },
            Gender: { value: '', errors: {}, rules: { required: true } },
            isOneYrExp: { value: '', errors: {}, rules: { required: true } },
            isvalidCNA: { value: '', errors: {}, rules: { required: true } },
            homeCareExperience: { value: '', errors: {}, rules: { required: true } },
        },

        jobPostStates: JOB_POSTING_STATES,

        jobApplicationDropdown: {
            gender: { value: '', label: '' }
        },
        PaginationState: {
            pageNumber: 1,
            PageSize: 10,
            totalJobPost: 10,
            IsDesc: true,
            status: ""
        },
        viewJobPostingModal: false,
        updateJobPostingModal: false,
        updatedJobPostData: UPDATE_JOB_POSTING_STATES,
        updatedSelectedData: {},
        checkedCheckboxes: {
            Received: false,
            Pending: false,
            Validated: false,
            Scheduled: false,
            Incomplete: false,
            Discarded: false,
            fail:false

        },
        receivedDate: "",
        updatedJobPostRequiredDataFieldTocuhed: false,
        nameToSearch:"",
        selectedSingleJobPost:{},
        showPreviewOfPDF:""
    }
});

export const {
    setLoadingState,
    setAllJobsList,
    setOpenJobApplicationModal,
    setAllRequiredFieldsTouched,
    setJobApplication,
    setJobApplicationDropdown,
    setSelectedJobApplication,
    setJobApplicationList,
    setSelectedJobApplicationList,
    setApplicationDetails,
    setShowApplicationDetailsModal,
    setSelectedJobPost,
    setJobPostStates,
    setShowJobPostingModal,
    setJobPostAllRequiredFieldsTouched,
    setUploadedResume,
    setShowDeleteJobPostModal,
    setSelectedJobPostAction,
    setProfessionalJobRoles,
    setEmptyJobPostingData,
    setJobApplicationFormDataAsReset,
    setPaginationState,
    setViewJobPostingModal,
    setUpadateJobPostingModal,
    setUpdatedJobPostData,
    setUpdateROwSelectedData,
    setCheckedCheckboxes,
    setReceivedDate,
    setNameToSearch,
    setSelectedSingleJobPost,
    setShowPreviewOfPDF
} = actions;
