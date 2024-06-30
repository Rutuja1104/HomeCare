import store from "../../../../store/store"
import { DOCUMENT_TYPE_ARRAY, EDUCATIONAL_INFORMATION, LICENSE_INFORMATION, PERSONAL_INFORMATION_QUESTIONS, PREVIOUS_EMPLOYER_INFO, REFERENCE_INFO } from "./constants"

export const componentKey = 'NURSE_ONBOARDING/PROFESSIONAL_INFORMATION'

const { actions } = store.reducerManager.add({
    key: componentKey,
    addedReducers: {
        //Personal Info questions
        setPersonalInformationQuestions: (state, action) => {
            const { checked, parentIndex, childIndex } = action.payload
            let copiedQuestions = [...state.questionnaires]
            let copiedChoices = copiedQuestions[parentIndex].choices
            copiedQuestions[parentIndex].choices = copiedChoices.map(item => { return { ...item, checked: false } })
            copiedQuestions[parentIndex].choices[childIndex].checked = checked

            state.questionnaires = copiedQuestions
        },

        setPersonalInformation: (state, action) => {
            const { filedName, object } = action.payload
            let professionalInformation = { ...state.professionalInformation[filedName] };

            Object.entries(object).map(([key, value]) => {
                professionalInformation = {
                    ...professionalInformation,
                    [key]: {
                        ...professionalInformation[key],
                        ...value,
                    },
                };

                state.professionalInformation[filedName] = professionalInformation;
            })
        },

        setMultiplePersonalInformation: (state, action) => {
            const { object, name, index } = action.payload;
            const copiedInformation = [...state.professionalInformation[name]];
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
                state.professionalInformation[name] = copiedInformation;
            })
            // for (const [key, value] of Object.entries(object)) {
            //     informationObject[key] = { ...informationObject[key], ...value };
            // }

            // copiedInformation[index] = informationObject;
            // state.professionalInformation[name] = copiedInformation;
        },

        setAllRequiredFieldsTouched: (state, action) => {
            const { name, value } = action.payload
            state.professionalInformation[name] = value
        },

        //health info questions
        setHealthInfoQuestions: (state, action) => {
            state.healthInfoQuestions = action.payload
        },
        setHealthInfoQuestionsDescription: (state, action) => {
            const { text, parentIndex } = action.payload
            let copiedQuestions = [...state.healthInfoQuestions]
            copiedQuestions[parentIndex].description = text
            state.healthInfoQuestions = copiedQuestions
        },
        setHealthInfoQuestionsChange: (state, action) => {
            const { checked, parentIndex, childIndex } = action.payload
            let copiedQuestions = [...state.healthInfoQuestions]
            let copiedChoices = copiedQuestions[parentIndex].choices
            copiedQuestions[parentIndex].choices = copiedChoices.map(item => { return { ...item, checked: false } })
            copiedQuestions[parentIndex].choices[childIndex].checked = checked

            state.healthInfoQuestions = copiedQuestions
        },
        setHealthInformationSignature: (state, action) => {
            state.healthInformationSignature = action.payload
        },

        //add new education info
        setAddNewInformation: (state, action) => {
            const { name, object } = action.payload
            state.professionalInformation[name] = [...state.professionalInformation[name], { ...object }]
        },
        setRemoveNewInformation: (state, action) => {
            const { name, index } = action.payload
            state.professionalInformation[name] = state.professionalInformation[name].filter((item, idx) => idx !== index)
        },

        setUserDetailsById: (state, action) => {
            state.userDetailsById = action.payload
        },

        setProfessionalDetails: (state, action) => {
            state.professionalInformation = action.payload
        },

        setAutoCompleteAddressFields: (state, action) => {
            state.professionalInformation.personalInfo = { ...state.professionalInformation.personalInfo, ...action.payload }
        },
        setAutoCompletePreviousEmployerAddress: (state, action) => {
            const { data, index } = action.payload
            const copiedPreviousEmployerInfo = [...state.professionalInformation.PreviousEmployerInfo]
            let copiedEmployer = copiedPreviousEmployerInfo[index]
            copiedEmployer = { ...copiedEmployer, ...data }
            copiedPreviousEmployerInfo[index] = copiedEmployer
            state.professionalInformation.PreviousEmployerInfo = copiedPreviousEmployerInfo
        },
        setPersonalInformationInitialStates: (state, action) => {
            state.professionalInformation.personalInfo = action.payload
        },

        setRequireDocuments: (state, action) => {
            state.requireDocuments = action.payload
        },
        setDocumentsInRequireDocuments: (state, action) => {
            const { file, index } = action.payload
            const copiedData = [...state.requireDocuments]
            copiedData[index].documents = [...copiedData[index].documents, file]
            state.requireDocuments = copiedData
        },
        setRemoveDocumentsFromRequireDocuments: (state, action) => {
            const { parentIndex, childIndex } = action.payload
            const copiedData = [...state.requireDocuments]
            copiedData[parentIndex].documents = copiedData[parentIndex].documents.filter((item, index) => index !== childIndex)
            state.requireDocuments = copiedData
        },
        setUpdatedQuestionnaires: (state, action) => {
            state.questionnaires = action.payload
        }
    },
    initialReducerState: {
        professionalInformation: {
            allRequiredFieldsTouched: false,
            personalInfoFieldsTouched: false,
            educationalInformationFieldsTouched: false,
            previousEmployerInfoFieldsTouched: false,
            ReferencesInfoFieldsTouched: false,
            LicenseInformationFieldsTouched: false,

            //personal info
            personalInfo: {},

            //educational information
            EducationalInformation: [],

            //Previous employer information
            PreviousEmployerInfo: [],

            // References 1 & 2
            ReferencesInfo: [],

            // Nursing License information
            LicenseInformation: [],

            //health Information
            healthInformation: {
                LastExaminationByPhysician: { value: "", errors: {}, rules: { required: true } },
                ReferredBy: { value: "", errors: {} },
            }
        },

        requireDocuments: DOCUMENT_TYPE_ARRAY,
        healthInfoQuestions: [],
        questionnaires: PERSONAL_INFORMATION_QUESTIONS,
        healthInformationSignature: "",
        userDetailsById: {}
    }
})

export const { setPersonalInformationQuestions, setPersonalInformation, setAllRequiredFieldsTouched, setHealthInfoQuestions, setHealthInfoQuestionsDescription, setHealthInfoQuestionsChange, setHealthInformationSignature, setAddNewInformation, setRemoveNewInformation, setMultiplePersonalInformation, setUserDetailsById, setProfessionalDetails, setAutoCompleteAddressFields, setAutoCompletePreviousEmployerAddress, setPersonalInformationInitialStates, setRequireDocuments, setDocumentsInRequireDocuments, setRemoveDocumentsFromRequireDocuments, setUpdatedQuestionnaires } = actions