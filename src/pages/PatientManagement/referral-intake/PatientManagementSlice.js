import store from '../../../store/store';
import { PAGE_STATE } from '../../../libs/constant';
import {
    ADD_PHYSICIAN,
    CREATE_PHYSICIAN,
    FACE_TO_FACE,
    GUARENTOR_INFO,
    INSURANCE_DETAILS,
    MEDICAL_ORDER_DETAILS,
    MEDICATION_DETAILS,
    PATIENT_SERVICE_DETAILS,
    PERSONAL_DETAILS,
    REFERRAL_INTAKE,
    UPDATE_PATIENT
} from '../constants';
import moment from 'moment';

export const componentKey = 'PATIENT_MANAGEMENT';

const { actions } = store.reducerManager.add({
    key: componentKey,
    addedReducers: {
        setLoadingState: (state, action) => {
            state.loadingState = action.payload;
        },
        setPhysicianDetails: (state, action) => {
            state.physicianDetails = action.payload;
        },

        setCardDetails: (state, action) => {
            const { name, value } = action.payload;
            const copiedCardDetails = { ...state.cardDetails };
            copiedCardDetails[name] = value;
            state.cardDetails = copiedCardDetails;
        },
        setAllPatients: (state, action) => {
            state.allPatients = action.payload;
        },
        setMultiplePersonalDetails: (state, action) => {
            const { object, index } = action.payload;
            const updatedPersonalDetails = { ...state.personalDetails };
            const updatedItem = { ...updatedPersonalDetails };

            if (object) {
                for (const [key, value] of Object.entries(object)) {
                    if (updatedItem[key]) {
                        updatedItem[key] = { ...updatedItem[key], ...value };
                    }
                }
            }

            state.personalDetails = updatedItem;
        },
        setMultipleServiceDetails: (state, action) => {
            const { object, index } = action.payload;
            const updatedServiceDetails = [...state.serviceDetails];
            const updatedItem = [...updatedServiceDetails];

            if (object) {
                for (const [key, value] of Object.entries(object)) {
                    if (updatedItem[index][key]) {
                        updatedItem[index][key] = { ...updatedItem[index][key], ...value };
                    }
                }
            }

            state.serviceDetails = updatedItem;
        },
        setMultipleInsuranceDetails: (state, action) => {
            const { object, index } = action.payload;
            const updatedInsuranceDetails = [...state.insuranceDetails];
            const updatedItem = { ...updatedInsuranceDetails[index] };

            if (object && object.documents !== undefined) {
                updatedItem.documents = object.documents;
            } else {
                for (const [key, value] of Object.entries(object)) {
                    if (updatedItem[key]) {
                        updatedItem[key] = { ...updatedItem[key], ...value };
                    }
                }
            }
            updatedInsuranceDetails[index] = updatedItem;
            state.insuranceDetails = updatedInsuranceDetails;
        },

        setPatienDetailsDropdown: (state, action) => {
            const { name, selectedOption } = action.payload;
            const copiedObject = { ...state.patientDropdownDetails };
            copiedObject[name] = selectedOption;
            state.patientDropdownDetails = copiedObject;
        },
        setGetPatientById: (state, action) => {
            state.patientById = action.payload;
        },
        setMedicalOrderDetails: (state, action) => {
            const { name, value } = action.payload;
            console.log("🚀 ~ value:", value)
            console.log("🚀 ~ name:", name)

            state.medicalOrderDetails[name] = value;
        },
        setGetPhysicianById: (state, action) => {
            state.getPhysicianById = action.payload;
        },

        setAddNewInformation: (state, action) => {
            state.serviceDetails = [...state.serviceDetails, action.payload];
        },
        setRemoveNewInformation: (state, action) => {
            const index = action.payload;
            state.serviceDetails = state.serviceDetails.filter((item, idx) => idx !== index);
        },
        setGetAllPayers: (state, action) => {
            state.getAllPayers = action.payload;
        },
        setAddNewInsuranceDetails: (state, action) => {
            state.insuranceDetails = [...state.insuranceDetails, action.payload];
        },
        setRemoveNewInsuranceDetails: (state, action) => {
            const index = action.payload;
            state.insuranceDetails = state.insuranceDetails.filter((item, idx) => idx !== index);
        },
        setActiveRefferalPatientIntakeStep: (state, action) => {
            state.activeRefferalPatientIntakeStep = action.payload;
        },
        setFaceToFace: (state, action) => {
            const { object } = action.payload;
            const updatedFacetoFace = { ...state.faceToFace };
            const updatedItem = { ...updatedFacetoFace };

            if (object) {
                for (const [key, value] of Object.entries(object)) {
                    if (updatedItem[key]) {
                        updatedItem[key] = { ...updatedItem[key], ...value };
                    }
                }
            }

            state.faceToFace = updatedItem;
        },
        setServiceDetailsFieldsTouched: (state, action) => {
            state.serviceDetailsFieldTouched = action.payload;
        },
        setInsuranceFieldsTouched: (state, action) => {
            state.insuranceDetailsFieldTouched = action.payload;
        },
        setUploadedDocuments: (state, action) => {
            state.uploadedDocuments = action.payload;
        },
        setInsuranceDocumentsListsToShow: (state, action) => {
            state.insuranceDocumentsListToShow = action.payload;
        },
        setUploadedDocumentsWithPreSignedUrl: (state, action) => {

            const { documentType, index, s3Url,index2 } = action.payload;
            
            if (documentType === 'insurance reports') {
                const copiedDocumentType = state.insuranceDetails[index2].documents;
                copiedDocumentType[index] = Object.assign(copiedDocumentType[index], { s3Url });
                state.insuranceDetails[index].documents[documentType] = copiedDocumentType;
            } else {
                const copiedDocumentType = state.uploadedDocuments;
                copiedDocumentType[index] = Object.assign(copiedDocumentType[index], { s3Url });
                state.uploadedDocuments[documentType] = copiedDocumentType;
            }
        },

        setInsuranceDocuments: (state, action) => {
            const { documents, index } = action.payload;

            const updatedInsuranceDetails = [...state.insuranceDetails];
            const updatedItem = { ...updatedInsuranceDetails[index] };
            updatedItem.documents = documents;

            updatedInsuranceDetails[index] = updatedItem;
            state.insuranceDetails = updatedInsuranceDetails;
        },
        setUploadedDocumentsList: (state, action) => {
            state.uploadedDocumentsList = [...state.uploadedDocumentsList, action.payload];
        },
        setAddNewMedicationDetails: (state, action) => {
            state.medicationDetails = [...state.medicationDetails, action.payload];
        },
        setMedicationDetails: (state, action) => {
            const { object, index } = action.payload;
            const updatedMedicationDetails = [...state.medicationDetails];
            const updatedItem = [...updatedMedicationDetails];

            if (object) {
                for (const [key, value] of Object.entries(object)) {
                    if (updatedItem[index][key]) {
                        updatedItem[index][key] = { ...updatedItem[index][key], ...value };
                    }
                }
            }

            state.medicationDetails = updatedItem;
        },
        setRemoveNewMedicationDetails: (state, action) => {
            const index = action.payload;
            state.medicationDetails = state.medicationDetails.filter((item, idx) => idx !== index);
        },
        setReferralDetails: (state, action) => {
            const { object, index } = action.payload;
            const updatedreferralDetails = { ...state.referralDetails };
            const updatedItem = { ...updatedreferralDetails };

            if (object) {
                for (const [key, value] of Object.entries(object)) {
                    if (updatedItem[key]) {
                        updatedItem[key] = { ...updatedItem[key], ...value };
                    }
                }
            }

            state.referralDetails = updatedItem;
        },
        setEmergencyDetails: (state, action) => {
            const { object, index } = action.payload;
            const updatedEmeegrencyDetails = { ...state.emergencyDetails };
            const updatedItem = { ...updatedEmeegrencyDetails };

            if (object) {
                for (const [key, value] of Object.entries(object)) {
                    if (updatedItem[key]) {
                        updatedItem[key] = { ...updatedItem[key], ...value };
                    }
                }
            }

            state.emergencyDetails = updatedItem;
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
        setAutoCompleteAddressFields: (state, action) => {
            state.dataToUpdate.homeAddress = { ...state.dataToUpdate.homeAddress, ...action.payload };
        },
        setAutoCompleteAddressFieldsInPatientManagement: (state, action) => {
            state.personalDetails = { ...state.personalDetails, ...action.payload };
        },
        setFaceToFaceFieldsTouched: (state, action) => {
            state.faceToFaceFieldTouched = action.payload;
        },
        setPatientReferralIntakeSign: (state, action) => {
            state.patientReferralIntakeSign = action.payload;
        },
        setPersonalDetailsFieldsTouched: (state, action) => {
            state.personalDetailsFieldTouched = action.payload;
        },
        setEmergencyDetailsFieldTouch: (state, action) => {
            state.emergencyDetailsTouched = action.payload;
        },
        setReferralDetailsFieldTouch: (state, action) => {
            state.referralDetailsTouched = action.payload;
        },
        setMedicalReportRequestModal: (state, action) => {
            state.medicalReportRequestModal = action.payload;
        },
        setMedicalOrderSign: (state, action) => {
            state.medicalOrderSign = action.payload;
        },
        setIsCreatePhysicianFieldTouch: (state, action) => {
            state.isCreatePhysicianFieldTouch = action.payload;
        },
        setPhysicianFieldTouched: (state, action) => {
            state.physicianFieldTouched = action.payload;
        },
        setAutoCompleteAddressForReferralInfo: (state, action) => {
            state.referralDetails = { ...state.referralDetails, ...action.payload };
        },
        setAutoCompleteAddressForEmergencyInfo: (state, action) => {
            state.emergencyDetails = { ...state.emergencyDetails, ...action.payload };
        },
        setIsmailSent: (state, action) => {
            state.isMailSent = action.payload;
        },
        setPaginationState: (state, action) => {
            state.PaginationState = { ...state.PaginationState, ...action.payload };
        },

        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setSearchPatientByMRN: (state, action) => {
            state.mrn = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setLastName: (state, action) => {
            state.lastName = action.payload;
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

        setUpdatePatient: (state, action) => {
            
            const payload = action.payload;
        
            if (payload && typeof payload === 'object') {
                for (const [key, value] of Object.entries(payload)) {
                    if (Object.prototype.hasOwnProperty.call(state.dataToUpdate, key)) {
                        
                        state.dataToUpdate[key].value = value.value;
                        state.dataToUpdate[key].errors = value.errors || {};
                        state.dataToUpdate[key].rules = value.rules || {};
                    }else if(Object.prototype.hasOwnProperty.call(state.dataToUpdate.homeAddress, key)){
                        state.dataToUpdate.homeAddress[key].value = value.value;
                        state.dataToUpdate.homeAddress[key].errors = value.errors || {};
                        state.dataToUpdate.homeAddress[key].rules = value.rules || {};
                    }
                }
            }
        },        
        
        setPhysicianOrderSent: (state, action) => {
            state.physicianOrderSent = action.payload;
        },
        setIsPatientDeleted: (state, action) => {
            state.isPatientDeleted = action.payload;
        },
        setCheckedCheckboxes: (state, action) => {
            const updatedChecbox = { ...state.checkedCheckboxes };
            const updatedItem = { ...updatedChecbox };
            if (action.payload === 'clear') {
                state.checkedCheckboxes = {
                    active: false,
                    pending: false,
                    inActive: false,
                    transferred: false,
                    discharged: false
                };
            } else {
                for (const [key, value] of Object.entries(action.payload)) {
                    updatedItem[key] = value;
                }

                state.checkedCheckboxes = updatedItem;
            }
        },
        setIsPatientId: (state, action) => {
            state.patientId = action.payload;
        },
        setIsDocumentOfInsurance: (state, action) => {
            state.isDocumentOfInsurance = action.payload;
        },
        setPatientUserId: (state, action) => {            
            state.patientUserId = action.payload
        },
        setCardSavedState: (state, action) => { 
            state.cardSavedState = action.payload
        },   
        setConfirmationModal:(state, action) => {
            state.openConfirmationModal = action.payload
        },
        setPatientEpisodeList: (state, action) => {
            state.patientEpisodeList = action.payload
        },
        setShowPatientEpisodeDetails: (state, action) => {
            state.showPatientEpisodeDetails = action.payload
        },
        setSelectedPatientEpisode: (state, action) => {
            state.selectedPatientEpisode = action.payload
        }
    },
    initialReducerState: { 
        loadingState: { state: PAGE_STATE.PAGE_READY, message: '' },
        personalDetails: PERSONAL_DETAILS,
        serviceDetails: [PATIENT_SERVICE_DETAILS],
        insuranceDetails: [INSURANCE_DETAILS],
        cardDetails: {},
        allPatients: [],
        physicianDetails: [],
        patientDropdownDetails: {
            patientGender: { value: '', label: '', errors: {}, rules: { required: true } },
            patientPhysician: { value: '', label: '', errors: {}, rules: { required: true } },
            // payerName: { value: '', label: '', errors: {}, rules: { required: true } },
            race: { value: '', label: '', errors: {}, rules: { required: false } },
            nurseDisciplines: { value: '', label: '', errors: {}, rules: { required: false } }
        },
        openModal: false,
        medicalOrderDetails: MEDICAL_ORDER_DETAILS,
        patientById: {},
        getPhysicianById: ADD_PHYSICIAN,
        createPhysician: CREATE_PHYSICIAN,
        getAllPayers: {},
        activeRefferalPatientIntakeStep: 0,
        isBillingAddressSame: true,
        faceToFace: FACE_TO_FACE,
        personalDetailsFieldTouched: false,
        serviceDetailsFieldTouched: false,
        insuranceDetailsFieldTouched: false,
        uploadedDocuments: [],
        uploadedDocumentsList: [],
        insuranceDocumentsListToShow: [],
        medicationDetails: [MEDICATION_DETAILS],
        referralDetails: REFERRAL_INTAKE,
        emergencyDetails: GUARENTOR_INFO,
        isSingleRecord: false,
        isMultiRecord: false,
        physician: {},
        faceToFaceFieldTouched: false,
        patientReferralIntakeSign: '',
        referralDetailsTouched: false,
        emergencyDetailsTouched: false,
        medicalReportRequestModal: false,
        medicalOrderSign: '',
        isCreatePhysicianFieldTouch: false,
        physicianFieldTouched: false,
        insuranceDocuments: [],
        isMailSent: false,
        PaginationState: {
            pageNumber: 1,
            PageSize: 10,
            FilterText: '',
            IsDesc: true,
            totalPatients: 10,
            status: 'Active'
        },
        startDate: moment(new Date().toISOString()).format('MM-DD-YYYY'),
        status: [],
        search: '',
        updatePatient: UPDATE_PATIENT,
        physicianOrderSent: false,
        isPatientDeleted: false,
        checkedCheckboxes: { Active: false, Pending: false, InActive: false, Transferred: false, Discharged: false },
        dataToUpdate: {
            firstName: { value: '', errors: {}, rules: { required: true } },
            lastName: { value: '', errors: {}, rules: { required: true } },
            gender: { value: '', label: '', errors: {}, rules: { required: true } },
            email: {
                value: '',
                errors: {},
                rules: {
                    required: false,
                    regex: { pattern: /^\S+@\S+\.\S+$/, message: 'Please enter a valid email address' }
                }
            },
            phoneNumber: {
                value: '',
                errors: {},
                rules: {
                    required: false,
                    regex: { pattern: /\b\d{10}\b/,message: 'Please enter a 10 digit phone number'}
                }
            },
        
            race: { value: '', label: '', errors: {}, rules: { required: false } },
            dateOfBirth: { value: '', errors: {}, rules: { required: true } },
            HICNumber: {
                value: '',
                errors: {},
                rules: {
                    required: false,
                    regex: { pattern: /\b\d{11}\b/, message: 'Please enter 11 digits only' }
                },
            },
            ssn: {
                value: '',
                errors: {},
                rules: {
                    required: false,
                    regex: { pattern: /\b\d{9}\b/, message: 'Please enter 9 digits only' }
                }
            },

            homeAddress: {
                addressLine1: { value: '', errors: {}, rules: { required: true } },
                addressLine2: { value: '', errors: {}, rules: { required: false } },
                city: { value: '', errors: {}, rules: { required: true } },
                state: { value: '', errors: {}, rules: { required: true } },
                country: { value: '', errors: {}, rules: { required: true } },
                pinCode: { value: '', errors: {}, rules: { required: true } },
            }
        },
        patientId: '',
        patientUserId: "",
        cardSavedState: false,
        openConfirmationModal: false,
        patientEpisodeList: [],
        selectedPatientEpisode: {},
        showPatientEpisodeDetails: false
    }
});

export const {
    setLoadingState,
    setPersonalDetails,
    setServiceDetails,
    setMultiplePersonalDetails,
    setMultipleInsuranceDetails,
    setInsuranceDetails,
    setCardDetails,
    setAllPatients,
    setPhysicianDetails,
    setMultipleServiceDetails,
    setMedicalOrderDetails,
    setPatienDetailsDropdown,
    setGetPatientById,
    setGetPhysicianById,
    setCreatePhysician,
    setAddNewInformation,
    setRemoveNewInformation,
    setGetAllPayers,
    setAddNewInsuranceDetails,
    setRemoveNewInsuranceDetails,
    setActiveRefferalPatientIntakeStep,
    setPersonalDetailsFieldsTouched,
    setUploadedDocuments,
    setFaceToFace,
    setServiceDetailsFieldsTouched,
    setInsuranceFieldsTouched,
    setUploadedDocumentsList,
    setAddNewMedicationDetails,
    setMedicationDetails,
    setRemoveNewMedicationDetails,
    setReferralDetails,
    setEmergencyDetails,
    setIsSingleRecord,
    setIsMultiRecord,
    setPhysician,
    setCreatePhysicianOnChange,
    setFaceToFaceFieldsTouched,
    setPatientReferralIntakeSign,
    setReferralDetailsFieldTouch,
    setEmergencyDetailsFieldTouch,
    setMedicalReportRequestModal,
    setMedicalOrderSign,
    setIsCreatePhysicianFieldTouch,
    setPhysicianFieldTouched,
    setAutoCompleteAddressFields,
    setAutoCompleteAddressForReferralInfo,
    setAutoCompleteAddressForEmergencyInfo,
    setInsuranceDocuments,
    setIsmailSent,
    setPaginationState,
    setSearch,
    setStatus,
    setUpdatePatient,
    setPhysicianOrderSent,
    setIsPatientDeleted,
    setCheckedCheckboxes,
    setInsuranceDocumentsListsToShow,
    setDataToUpdate,
    setIsPatientId,
    setUploadedDocumentsWithPreSignedUrl,
    setUploadDocumentsForInsuranceDocuments,
    setIsDocumentOfInsurance,
    setPatientUserId,
    setCardSavedState,
    setAutoCompleteAddressFieldsInPatientManagement,
    setConfirmationModal,
    setPatientEpisodeList,
    setShowPatientEpisodeDetails,
    setSelectedPatientEpisode
} = actions;
