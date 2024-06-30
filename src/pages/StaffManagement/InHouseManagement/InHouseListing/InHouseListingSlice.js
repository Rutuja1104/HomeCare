import store from "../../../../store/store"
import { PAGE_STATE } from "../../../../libs/constant"

export const componentKey = 'IN_HOUSE_STAFF_MANAGEMENT/IN_HOUSE_STAFF_LISTING'

const { actions } = store.reducerManager.add({
    key: componentKey,
    addedReducers: {
        setLoadingState: (state, action) => {
            state.loadingState = action.payload
        },
        setAllNurseList: (state, action) => {
            state.allNurseList = action.payload
        },
        setSelectedNurseList: (state, action) => {
            state.selectedNurseList = action.payload
        },
        setSelectedUserStatus: (state, action) => {
            state.selectedUserStatus = action.payload
        },
        setPaginationState: (state, action) => {
            state.PaginationState = { ...state.PaginationState, ...action.payload }
        },
        setShowDeleteNurseModal: (state, action) => {
            state.showDeleteNurseModal = action.payload
        },
        setSelectedNurse: (state, action) => {
            state.selectedNurse = action.payload
        },
        setNurseDetails: (state, action) => {
            state.nurseDetails = action.payload
        },
        setProfessionalInformation: (state, action) => {
            state.professionalInformation = action.payload
        },
        setUploadedDocument: (state, action) => {
            state.uploadedDocuments = action.payload
        }, 
        setDataToUpdate: (state, action) => {
            const row = action.payload;
            const updatedDataToUpdate = { ...state.dataToUpdate };
        
            const updateNestedProperties = (target, source) => {
                for (const key in target) {
                    if (source[key] !== undefined) {
                        if (typeof source[key] === 'object' && source[key] !== null) {
                            updateNestedProperties(target[key], source[key]);
                        } else {
                            target[key].value = source[key];
                        }
                    }
                }
            };
        
            updateNestedProperties(updatedDataToUpdate, row);
        
            state.dataToUpdate = updatedDataToUpdate;
        },
        setUpdateHouseStaff: (state, action) => {
            const payload = action.payload;
            if (payload && typeof payload === 'object') {
                for (const [key, value] of Object.entries(payload)) {
                    if (Object.prototype.hasOwnProperty.call(state.dataToUpdate, key)) {
                        state.dataToUpdate[key].value = value.value;
                        state.dataToUpdate[key].errors = value.errors || {};
                        state.dataToUpdate[key].rules = value.rules || {};
                    }
                    else if(Object.prototype.hasOwnProperty.call(state.dataToUpdate.addresses[0], key)){
                        state.dataToUpdate.addresses[0][key].value = value.value;
                        state.dataToUpdate.addresses[0][key].errors = value.errors || {};
                        state.dataToUpdate.addresses[0][key].rules = value.rules || {};
                    }
                }
            }
        },
        setAutoCompleteAddressFields: (state, action) => {
            state.dataToUpdate.addresses[0] = { ...state.dataToUpdate.addresses[0], ...action.payload };
        },
    },
    initialReducerState: {
        loadingState: { state: PAGE_STATE.PAGE_READY, message: '' },
        allNurseList: [],
        selectedNurseList: [],
        selectedUserStatus: { label: "", value: "" },

        showDeleteNurseModal: false,
        professionalInformation: [],
        uploadedDocuments: [],
        nurseDetails: {},

        PaginationState: {
            PageNumber: 1,
            PageSize: 20,
            FilterText: "",
            IsDesc: true,
            totalNurse: 10,
            Role: "DON",
            Status: "Active",
            NursesRole: { value: "DON", label: "Director of Clinical Services" },
        },
        dataToUpdate: {
            firstName: { value: '', errors: {}, rules: { required: true } },
            middleName: { value: '', errors: {}, rules: { required: false } },
            lastName: { value: '', errors: {}, rules: { required: true } },
            username:{ value: '', errors: {}, rules: { required: false } },
            email: { value: '', errors: {}, rules: { required: true,
                regex: { pattern: /^\S+@\S+\.\S+$/, message: 'Please enter a valid email address' } } },
            Telephone: { value: '', errors: {}, rules: {required: true,
                regex: { pattern: /\b\d{10}\b/,message: 'Please enter a 10 digit phone number'} } },
            // yearofExperience: { value: '', errors: {}, rules: { required: true } },
            dob: { value: '', errors: {}, rules: { required: true } },
            addresses: [{
                addressLine1: {value: '', errors: {}, rules: { required: false}},
                addressLine2: {value: '', errors: {}, rules: { required: false}},
                city:{value: '', errors: {}, rules: { required: false}},
                country:{value: '', errors: {}, rules: { required: false}},
                state:{value: '', errors: {}, rules: { required: false}},
                pinCode:{value: '', errors: {}, rules: { required: false}},

            }]
        }
    }
})

export const { setLoadingState, setAllNurseList, setSelectedNurseList, setSelectedUserStatus, setPaginationState, setShowDeleteNurseModal, setSelectedNurse, setNurseDetails, setProfessionalInformation, setUploadedDocument,setDataToUpdate,setUpdateHouseStaff,setAutoCompleteAddressFields } = actions