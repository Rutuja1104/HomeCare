import store from "../../../../store/store"
import { MEDICALLY_NECESSARY_DISCIPLINES } from "../constants"
import { STAFF_SELECTION } from "./constants"

export const componentKey = 'EPISODE_MANAGEMENT_ADMIN/CREATE_EPISODE'

const { actions } = store.reducerManager.add({
    key: componentKey,
    addedReducers: {
        setActiveStep: (state, action) => {
            state.activeStep = action.payload
        },
        setMedicallyNecessaryDiscipliner: (state, action) => {
            const { parentIndex, childIndex, checked, value, type } = action.payload

            const copiedMedicallyNecessaryDisciplines = state.medicallyNecessaryDisciplines

            let copiedDiscipline = copiedMedicallyNecessaryDisciplines[parentIndex]

            if (type !== "Checked") {
                copiedDiscipline.disciplines[childIndex].selectedVisitFrequency = value
            } else {
                copiedDiscipline.disciplines[childIndex].checked = checked
            }

            copiedMedicallyNecessaryDisciplines[parentIndex] = copiedDiscipline

            state.medicallyNecessaryDisciplines = copiedMedicallyNecessaryDisciplines
        },
        setBasicEpisodeDetails: (state, action) => {
            const { filedName, object } = action.payload
            let assignEpisodeForPatient = { ...state.assignEpisodeForPatient[filedName] };

            Object.entries(object).map(([key, value]) => {
                assignEpisodeForPatient = {
                    ...assignEpisodeForPatient,
                    [key]: {
                        ...assignEpisodeForPatient[key],
                        ...value,
                    },
                };

                state.assignEpisodeForPatient[filedName] = assignEpisodeForPatient;
            })
        },
        setAllRequiredFieldsTouched: (state, action) => {
            const { name, value } = action.payload
            state[name] = value
        },
        setAssignEpisodeForPatientBasicEpisodeDetails: (state, action) => {
            state.assignEpisodeForPatient = action.payload
        },
        setPatientDetails: (state, action) => {
            state.patientDetails = action.payload
        },
        setMedicalOrder: (state, action) => {
            state.medicallyNecessaryDisciplines = action.payload
        },
        setSelectedProfessionalRole: (state, action) => {
            state.selectedProfessionalRole = action.payload
        },
        setStaffSelectionData: (state, action) => {
            const { object, index } = action.payload;

            const copiedInformation = [...state.StaffSelection]
            let informationObject = { ...copiedInformation[index] };

            Object.entries(object).map(([key, value]) => {
                informationObject = {
                    ...informationObject,
                    [key]: {
                        ...informationObject[key],
                        ...value,
                    },
                };

                copiedInformation[index] = informationObject
                state.StaffSelection = copiedInformation;
            })
        },
        setRemoveAddedStaff: (state, action) => {
            state.StaffSelection = state.StaffSelection.filter((item, index) => index !== action.payload)
        },
        setAddNewStaff: (state, action) => {
            state.StaffSelection = [...state.StaffSelection, { ...action.payload }]
        },
        setUserListByProfessionalRole: (state, action) => {
            state.userListByProfessionalRole = action.payload
        },
        setClearSelectedUser: (state, action) => {
            const { index, name } = action.payload
            const copiedStaff = [...state.StaffSelection]
            const copiedInformation = { ...copiedStaff[index] }
            copiedInformation[name] = { value: "", errors: {}, rules: { required: true } }
            copiedStaff[index] = copiedInformation
            state.StaffSelection = copiedStaff
        },
        setStaffList: (state, action) => {
            state.StaffList = action.payload
        },
        setStaffSelectionFieldsTouch: (state, action) => {
            state.StaffSelectionFieldsTouch = action.payload
        },
        setSelectedNurseDetails: (state, action) => {
            state.selectedNurseDetails = action.payload
        },
        setSelectedCaseManager: (state, action) => {
            state.SelectedCaseManager = action.payload
        },
        setNavigateToEpisodePage: (state, action) => {
            state.navigateToEpisodePage = action.payload
        },
        setEmergencyVitals: (state, action) => {
            state.emergencyVitals = action.payload
        },
        setUpdatedEmergencyVitals: (state, action) => {
            state.assignEpisodeForPatient.basicEpisodeDetails = action.payload
        },
        setPayerList: (state, action) => {
            state.payerList = action.payload
        },
        setEpisodePurposeList: (state, action) => {
            state.episodePurposeList = action.payload
        },
        setSelectedDiscipline: (state,action) => {
            state.selectedDiscipline = action.payload
        },
        setSelectedPayerInformation: (state, action) => {
            state.selectedPayerDetails = action.payload
        }
    },
    initialReducerState: {
        activeStep: 0,
        patientDetails: {},
        medicallyNecessaryDisciplines: MEDICALLY_NECESSARY_DISCIPLINES,
        basicEpisodeDetailsFieldsTouch: false,
        selectedProfessionalRole: null,
        StaffSelectionFieldsTouch: false,
        selectedNurseDetails: {},
        SelectedCaseManager: {},
        navigateToEpisodePage: false,

        assignEpisodeForPatient: {
            basicEpisodeDetails: {
                AgencyLocation: { value: "", errors: {}, rules: { required: true } },
                HICNumber: { value: "", errors: {}, rules: { required: false } },
                FaceToFaceDate: { value: "", errors: {}, rules: { required: true } },
                SOCDate: { value: "", errors: {}, rules: { required: true } },
                CertFrom: { value: "", errors: {}, rules: { required: false } },
                CertTo: { value: "", errors: {}, rules: { required: false } },
                EmergencyLevel: { value: "", errors: {}, rules: { required: true } },
                EpisodeDuration: { value: "60", errors: {}, rules: { required: true } },
                CaseConferenceReview1: { value: "", errors: {}, rules: { required: false } },
                CaseConferenceReview2: { value: "", errors: {}, rules: { required: false } },
                CaseConferencePreparer: { value: "", errors: {}, rules: { required: false } },
                ControlNumber: { value: "", errors: {}, rules: { required: false } },
                CaseManager: { value: "", errors: {}, rules: { required: true } },
                EpisodePayer: { value: "", errors: {}, rules: { required: true } },
                EpisodeStartDate: { value: "", errors: {}, rules: { required: false } },
                EpisodeEndDate: { value: "", errors: {}, rules: { required: false } },
                EpisodeComments: { value: "", errors: {}, rules: { required: false } },

                LowBloodPressure: { value: "", errors: {}, rules: { required: true } },
                HighBloodPressure: { value: "", errors: {}, rules: { required: true } },
                LowDiastolic: { value: "", errors: {}, rules: { required: true } },
                HighDiastolic: { value: "", errors: {}, rules: { required: true } },
                LowSystolic: { value: "", errors: {}, rules: { required: true } },
                HighSystolic: { value: "", errors: {}, rules: { required: true } },
                LowPulse: { value: "", errors: {}, rules: { required: true } },
                HighPulse: { value: "", errors: {}, rules: { required: true } },
                LowTemperature: { value: "", errors: {}, rules: { required: true } },
                HighTemperature: { value: "", errors: {}, rules: { required: true } },
                LowRespiratory: { value: "", errors: {}, rules: { required: true } },
                HighRespiratory: { value: "", errors: {}, rules: { required: true } },
                LowBloodSugar: { value: "", errors: {}, rules: { required: true } },
                HighBloodSugar: { value: "", errors: {}, rules: { required: true } },
            },
            PhysicianOrder: {},
        },
        StaffSelection: [STAFF_SELECTION],
        userListByProfessionalRole: [],
        StaffList: [],
        emergencyVitals: {},
        payerList: [],
        episodePurposeList: [],
        selectedDiscipline:null,
        selectedPayerDetails:null,
    }
})

export const { setActiveStep, setMedicallyNecessaryDiscipliner, setBasicEpisodeDetails, setAllRequiredFieldsTouched, setAssignEpisodeForPatientBasicEpisodeDetails, setPatientDetails, setMedicalOrder, setSelectedProfessionalRole, setStaffSelectionData, setRemoveAddedStaff, setAddNewStaff, setUserListByProfessionalRole, setClearSelectedUser, setStaffList, setStaffSelectionFieldsTouch, setSelectedNurseDetails, setSelectedCaseManager, setNavigateToEpisodePage, setEmergencyVitals, setUpdatedEmergencyVitals, setPayerList, setEpisodePurposeList, setSelectedDiscipline, setSelectedPayerInformation } = actions