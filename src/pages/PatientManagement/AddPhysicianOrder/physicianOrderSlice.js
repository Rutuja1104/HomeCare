import { PAGE_STATE } from '../../../libs/constant';
import store from '../../../store/store';
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
    REFERRAL_INTAKE
} from '../constants';

export const componentKey = 'PATIENT_MANAGEMENT_PHYSICIAN_ORDER';

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
            // const
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
            state.personalDetails = { ...state.personalDetails, ...action.payload };
        },
        setFaceToFaceFieldsTouched: (state, action) => {
            state.faceToFaceFieldTouched = action.payload;
        },
        setPatientPhysicianIntakeSign: (state, action) => {
            state.patientPhysicianIntakeSign = action.payload;
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
        setActivePhysicianPatientIntakeStep: (state, action) => {
            state.activePhysicianPatientIntakeStep = action.payload;
        },
        setPersonaliDetailsResp: (state, action) => {
            state.personalDetailsResp = action.payload;
        },
        setPhysicianFieldTouched: (state, action) => {
            state.physicianFieldTouched = action.payload;
        },

        setInsuranceDocuments: (state, action) => {
            const { documents, index } = action.payload;

            const updatedInsuranceDetails = [...state.insuranceDetails];
            const updatedItem = { ...updatedInsuranceDetails[index] };
            updatedItem.documents = documents;

            updatedInsuranceDetails[index] = updatedItem;
            state.insuranceDetails = updatedInsuranceDetails;
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
        setsIsPhysicianName: (state, action) => {
            state.physicianName = action.payload;
        },
        setIsPhysicianId: (state, action) => {
            state.physicianId = action.payload;
        },
        setIsPatientId: (state, action) => {
            state.patientId = action.payload;
        },
        setUploadedDocumentsWithPreSignedUrl: (state, action) => {

            const { documentType, index, s3Url, index2 } = action.payload;
            if (documentType === 'insurance reports') {
                const { documentType, index, s3Url } = action.payload;
                const copiedDocumentType = state.insuranceDetails[index2].documents;
                copiedDocumentType[index] = Object.assign(copiedDocumentType[index], { s3Url });
                state.insuranceDetails[index].documents[documentType] = copiedDocumentType;
            } else {
                const copiedDocumentType = state.uploadedDocuments;
                copiedDocumentType[index] = Object.assign(copiedDocumentType[index], { s3Url });
                state.uploadedDocuments[documentType] = copiedDocumentType;
            }
        },
        setPatientUserId: (state, action) => {
            state.patientUserId = action.payload
        },
        setCardSavedStatePhysician: (state, action)=> {  
            state.cardSavedStatePhysician=action.payload
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
            payerName: { value: '', label: '' },
            race: { value: '', label: '' },
            nurseDisciplines: { value: '', label: '' }
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
        patientPhysicianIntakeSign: '',
        referralDetailsTouched: false,
        emergencyDetailsTouched: false,
        medicalReportRequestModal: false,
        medicalOrderSign: '',
        activePhysicianPatientIntakeStep: 0,
        isCreatePhysicianFieldTouch: false,
        personalDetailsResp: {},
        physicianFieldTouched: false,
        insuranceDocuments: [],
        isMailSent: false,
        physicianName: '',
        physicianId: '',
        patientId: '',
        patientUserId : "",
        cardSavedStatePhysician: false,

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
    setActivePhysicianPatientIntakeStep,
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
    setPatientPhysicianIntakeSign,
    setReferralDetailsFieldTouch,
    setEmergencyDetailsFieldTouch,
    setMedicalReportRequestModal,
    setMedicalOrderSign,
    setIsCreatePhysicianFieldTouch,
    setPersonaliDetailsResp,
    setPhysicianFieldTouched,
    setInsuranceDocuments,
    setAutoCompleteAddressFields,
    setAutoCompleteAddressForReferralInfo,
    setAutoCompleteAddressForEmergencyInfo,
    setIsmailSent,
    setsIsPhysicianName,
    setIsPhysicianId,
    setInsuranceDocumentsListsToShow,
    setIsPatientId,
    setUploadedDocumentsWithPreSignedUrl,
    setPatientUserId,
    setCardSavedStatePhysician
} = actions;
