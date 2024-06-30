import { PAGE_STATE } from '../../libs/constant';
import store from '../../store/store';
import { CREATE_PHYSICIAN, UPDATE_PHYSICIAN } from './constants';

export const componentKey = 'PHYSICIAN_MANAGEMENT';

const { actions } = store.reducerManager.add({
    key: componentKey,
    addedReducers: {
        setLoadingState: (state, action) => {
            state.loadingState = action.payload;
        },
        setAllPhysicians: (state, action) => {
            state.allPhysicians = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setPaginationState: (state, action) => {
            state.PaginationState = { ...state.PaginationState, ...action.payload };
        },
        setGetPhysicianById: (state, action) => {
            state.physicianById = action.payload;
        },
        setIsSingleRecord: (state, action) => {
            state.isSingleRecord = action.payload;
        },
        setIsMultiRecord: (state, action) => {
            state.isMultiRecord = action.payload;
        },
        setPhysician: (state, action) => {
            state.physician = action.payload;
        },
        setCreatePhysician: (state, action) => {
            let apiData = { ...action.payload };
            let physicianData = { ...state.createPhysician };
            function mergeObjects(target, source) {
                for (const key in source) {
                    if (typeof source[key] === 'object' && source[key] !== null) {
                        if (!target[key]) {
                            target[key] = {};
                        }
                        mergeObjects(target[key], source[key]);
                    } else {
                        if (key in target) {
                            target[key].value = source[key];
                        }
                    }
                }
            }

            mergeObjects(physicianData, apiData);
            state.createPhysician = physicianData;
            // state.createPhysician = { ...state.createPhysician, ...action.payload };
        },
        setCreatePhysicianOnChange: (state, action) => {
            const { object } = action.payload;
            const updatedCreatePhysicianDetails = { ...state.createPhysician };
            const updatedItem = { ...updatedCreatePhysicianDetails };

            if (object) {
                for (const [key, value] of Object.entries(object)) {
                    if (updatedItem[key]) {
                        updatedItem[key] = { ...updatedItem[key], ...value };
                    }
                }
            }

            state.createPhysician = updatedItem;
        },
        
        setIsCreatePhysicianFieldTouch: (state, action) => {
            state.isCreatePhysicianFieldTouch = action.payload;
        },
       
        setUpdatePhysicianFieldTouched: (state, action) => {
            state.updatePhysicianFieldTouched = action.payload;
        },
        setSelectedData: (state, action) =>{
            state.selectedData = action.payload
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
        setUpdatePhysician: (state, action) => {
            const payload = action.payload;
        
            if (payload && typeof payload === 'object') {
                for (const [key, value] of Object.entries(payload)) {
                    if (Object.prototype.hasOwnProperty.call(state.dataToUpdate, key)) {
                        
                        state.dataToUpdate[key].value = value.value;
                        state.dataToUpdate[key].errors = value.errors || {};
                        state.dataToUpdate[key].rules = value.rules || {};
                    }else if(Object.prototype.hasOwnProperty.call(state.dataToUpdate.addresses[0], key)){
                        state.dataToUpdate.addresses[0][key].value = value.value;
                        state.dataToUpdate.addresses[0][key].errors = value.errors || {};
                        state.dataToUpdate.addresses[0][key].rules = value.rules || {};
                    }
                }
            }
        },
    },
    initialReducerState: {
        loadingState: { state: PAGE_STATE.PAGE_READY, message: '' },
        allPhysicians: [],
        search: '',
        physicianById: {},
        isSingleRecord: false,
        isMultiRecord: false,
        physician: {},
        createPhysician: CREATE_PHYSICIAN,
        isCreatePhysicianFieldTouch: false,
        PaginationState: {
            pageNumber: 1,
            PageSize: 10,
            FilterText: '',
            IsDesc: true,
            totalPhysicians: 10
        },
        updatePhysician: UPDATE_PHYSICIAN,
        updatePhysicianFieldTouched: false,
        dataToUpdate: {
            NPI: { value: '', errors: {}, rules: { required: true } },
            firstName: { value: '', errors: {}, rules: { required: true } },
            lastName: { value: '', errors: {}, rules: { required: true } },
            primaryEmail: {
                value: '',
                errors: {},
                rules: {
                    required: true,
                    regex: { pattern: /\d+.+?/g, message: 'One lowercase, uppercase, number, special, character, at least 8.' }
                }
            },
            secondaryEmail: { value: '', errors: {}, rules: { required: false } },
            fax: { value: '', errors: {}, rules: { required: true } },
            status: { value: '', errors: {}, rules: { required: true } },
            mailingAddress: {
                addressLine1: { value: '', errors: {}, rules: { required: true } },
                addressLine2: { value: '', errors: {}, rules: { required: false } },
                landmark: { value: '', errors: {}, rules: { required: false } },
                city: { value: '', errors: {}, rules: { required: true } },
                state: { value: '', errors: {}, rules: { required: true } },
                country: { value: '', errors: {}, rules: { required: true } },
                pinCode: { value: '', errors: {}, rules: { required: true } }
            },
            primaryAddress: {
                addressLine1: { value: '', errors: {}, rules: { required: true } },
                addressLine2: { value: '', errors: {}, rules: { required: false } },
                landmark: { value: '', errors: {}, rules: { required: false } },
                city: { value: '', errors: {}, rules: { required: true } },
                state: { value: '', errors: {}, rules: { required: true } },
                country: { value: '', errors: {}, rules: { required: true } },
                pinCode: { value: '', errors: {}, rules: { required: true } }
            },
            contactNumber: {
                value: '',
                errors: {},
                rules: { required: true, regex: { pattern: /\b\d{10}\b/, message: 'Please enter 10 digits only' } }
            },
            billingAddressId: { value: '', errors: {}, rules: { required: true } },
            practiceAddressId: { value: '', errors: {}, rules: { required: true } },
            id: { value: '', errors: {}, rules: { required: true } }
        }
    }
});

export const {
    setAllPhysicians,
    setLoadingState,
    setSearch,
    setPaginationState,
    setGetPhysicianById,
    setIsMultiRecord,
    setIsSingleRecord,
    setPhysician,
    setCreatePhysician,
    setIsCreatePhysicianFieldTouch,
    setCreatePhysicianOnChange,
    setUpdatePhysician,
    setUpdatePhysicianFieldTouched,
    setSelectedData,
    setDataToUpdate
    
} = actions;
