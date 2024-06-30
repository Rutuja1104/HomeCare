import store from "../../../store/store"
import { CITIZENSHIP_STATUS, JOB_APPLICATION_TYPE } from "../constants"

export const componentKey = 'NURSE_ONBOARDING/JOB_APPLICATION'

const { actions } = store.reducerManager.add({
    key: componentKey,
    addedReducers: {
        setJobApplicationActiveStep: (state, action) => {
            state.jobApplicationActiveStep = action.payload
        },
        setJobApplicationFormType: (state, action) => {
            state.jobApplicationFormType = action.payload
        },
        setBackgroundCheckResidingYears: (state, action) => {
            state.backgroundCheckResidingYears = action.payload
        },
        setStateResidingDropdownChange: (state, action) => {
            const { name, selectedOption } = action.payload
            const copiedObject = { ...state.backgroundCheck }
            copiedObject[name] = selectedOption
            state.backgroundCheck = copiedObject
        },

        //Skill test questions
        setSkillTestQuestions: (state, action) => {
            state.skillTestQuestion = action.payload
        },
        setSkillTestQuestionsChange: (state, action) => {
            const { checked, parentIndex, childIndex } = action.payload
            let copiedQuestions = [...state.skillTestQuestion]
            let copiedChoices = copiedQuestions[parentIndex].choices
            copiedQuestions[parentIndex].choices = copiedChoices.map(item => { return { ...item, checked: false } })
            copiedQuestions[parentIndex].choices[childIndex].checked = checked

            state.skillTestQuestion = copiedQuestions
        },
        setCheckListTestQuestionsChange: (state, action) => {
            const { checked, categoryIndex, questionIndex, choiceIndex } = action.payload;
            const skillCheckListData = JSON.parse(JSON.stringify(state.skillCheckListData));
            const choices = skillCheckListData[categoryIndex].questions[questionIndex].choices;
            choices.forEach(choice => (choice.checked = false));
            choices[choiceIndex].checked = checked;
            skillCheckListData[categoryIndex].questions[questionIndex].isDescription = choices[choiceIndex].label == "No" ? true : false;
            skillCheckListData[categoryIndex].questions[questionIndex].onChangeDescriptionCb = () => { }
            skillCheckListData[categoryIndex].questions[questionIndex].description = ""
            state.skillCheckListData = skillCheckListData;
        },
        setJobDescriptionText: (state, action) => {
            const { value, categoryIndex, questionIndex } = action.payload;
            const skillCheckListData = JSON.parse(JSON.stringify(state.skillCheckListData));
            skillCheckListData[categoryIndex].questions[questionIndex].description = value
            state.skillCheckListData = skillCheckListData;
        },

        //job application status (interview screen)
        setJobApplicationStatus: (state, action) => {
            state.jobApplicationStatus = action.payload
        },

        //declaration page
        setCitizenshipStatus: (state, action) => {
            const { checked, index } = action.payload
            const copiedCitizenshipData = [...state.citizenshipStatus]
            let updatedData = copiedCitizenshipData.map(item => { return { ...item, checked: false } })
            updatedData[index].checked = checked
            state.citizenshipStatus = updatedData
        },
        setEmploymentEligibilityVerification: (state, action) => {
            let EmploymentEligibilityVerification = { ...state.EmploymentEligibilityVerification };

            Object.entries(action.payload).map(([key, value]) => {
                EmploymentEligibilityVerification = {
                    ...state.EmploymentEligibilityVerification,
                    [key]: {
                        ...state.EmploymentEligibilityVerification[key],
                        ...value
                    },
                };

                state.EmploymentEligibilityVerification = EmploymentEligibilityVerification;
            })
        },
        setEmployeesWithholdingCertificate: (state, action) => {
            let EmployeesWithholdingCertificate = { ...state.EmployeesWithholdingCertificate };

            Object.entries(action.payload).map(([key, value]) => {
                EmployeesWithholdingCertificate = {
                    ...state.EmployeesWithholdingCertificate,
                    [key]: {
                        ...state.EmployeesWithholdingCertificate[key],
                        ...value
                    },
                };

                state.EmployeesWithholdingCertificate = EmployeesWithholdingCertificate;
            })
        },
        setEmploymentEligibilityVerificationFieldsTouched: (state, action) => {
            state.EmploymentEligibilityVerification.allRequiredFieldsTouched = action.payload
        },
        setEmployeesWithholdingCertificateFieldsTouched: (state, action) => {
            state.EmployeesWithholdingCertificate.allRequiredFieldsTouched = action.payload
        },
        setEmploymentEligibilityVerificationSign: (state, action) => {
            state.employmentEligibilityVerificationSign = action.payload
        },
        setEmployeesWithholdingCertificateSign: (state, action) => {
            state.EmployeesWithholdingCertificateSign = action.payload
        },
        setUploadedDocumentsList: (state, action) => {
            state.uploadedDocumentsList = [...state.uploadedDocumentsList, action.payload]
        },
        setBackgroundCheckDocumentList: (state, action) => {
            state.backgroundCheckDocumentList = [...state.backgroundCheckDocumentList, action.payload]
        },
        setUploadedDocumentForAll: (state, action) => {
            state.uploadedDocumentsList = action.payload
        },
        setBackgroundCheckDocument: (state, action) => {
            state.backgroundCheckDocumentList = action.payload
        },
        setBackgroundCheck: (state, action) => {
            state.backgroundCheck = action.payload
        },
        setUploadedDocuments: (state, action) => {
            state.uploadedDocuments = { ...state.uploadedDocuments, ...action.payload }
        },
        setUploadedDocumentsWithPreSignedUrl: (state, action) => {
            const { documentType, index, s3Url } = action.payload
            const copiedDocumentType = state.uploadedDocuments[documentType]
            copiedDocumentType[index] = Object.assign(copiedDocumentType[index], { s3Url });
            state.uploadedDocuments[documentType] = copiedDocumentType
        },
        setActiveDeclarationTab: (state, action) => {
            state.activeDeclarationTab = action.payload
        },
        setSkillCheckListData: (state, action) => {
            state.skillCheckListData = action.payload
        },
        setSingleOrMarried: (state, action) => {
            state.SingleOrMarried = action.payload
        },
        setCompetencyCheckListSign: (state, action) => {
            state.competencyCheckListSign = action.payload
        },
        setInterviewScheduledDetailsNurseOnboarding: (state, action) => {
            state.interviewScheduledDetails = action.payload;
        },
        setEligibilityVerificationFormDetails:(state, action) => {
            state.eligibilityVerificationFormDetails = action.payload
        }
    },
    initialReducerState: {
        activeDeclarationTab: 0,
        jobApplicationActiveStep: 0,
        jobApplicationFormType: JOB_APPLICATION_TYPE.Professional_Information,
        backgroundCheckResidingYears: [],
        skillCheckListData: [],
        SingleOrMarried: { value: "", label: "" },

        backgroundCheck: {
            selectedResidingYear: { value: "", label: "" },
            stateResiding: { value: "", label: "" }
        },

        competencyCheckListSign: "",

        citizenshipStatus: CITIZENSHIP_STATUS,

        EmploymentEligibilityVerification: {
            allRequiredFieldsTouched: false,
            FirstName: { value: "", errors: {}, rules: { required: true } },
            MiddleName: { value: "", errors: {}, rules: { required: false } },
            LastName: { value: "", errors: {}, rules: { required: true } },
            OtherLastName: { value: "", errors: {}, rules: { required: false } },
            Address: { value: "", errors: {}, rules: { required: true } },
            ApartmentNumber: { value: "", errors: {}, rules: { required: false } },
            CityOrTown: { value: "", errors: {}, rules: { required: true } },
            State: { value: "", errors: {}, rules: { required: true } },
            ZIPCode: { value: "", errors: {}, rules: { required: true } },
            DateOfBirth: { value: "", errors: {}, rules: { required: true } },
            SocialSecurityNumber: { value: "", errors: {}, rules: { required: true, regex: { pattern: /\b\d{9}\b/, message: 'Please enter 9 digits only' } } },
            EmailAddress: { value: "", errors: {}, rules: { required: true } },
            PhoneNumber: { value: "", errors: {}, rules: { required: true } },
            USCISNumber: { value: "", errors: {}, rules: { required: false } },
            AdmissionNumber: { value: "", errors: {}, rules: { required: false } },
            PassportNumber: { value: "", errors: {}, rules: { required: false } },
            WorkAuthorizationNumber: { value: "", errors: {}, rules: { required: false } }
        },

        EmployeesWithholdingCertificate: {
            allRequiredFieldsTouched: false,
            FirstName: { value: "", errors: {}, rules: { required: true } },
            MiddleName: { value: "", errors: {}, rules: { required: false } },
            LastName: { value: "", errors: {}, rules: { required: true } },
            CityOrTown: { value: "", errors: {}, rules: { required: true } },
            State: { value: "", errors: {}, rules: { required: true } },
            ZIPCode: { value: "", errors: {}, rules: { required: true } },
            SSN: { value: "", errors: {}, rules: { required: true } },
            numberOfQualifyingChildren: { value: "", errors: {}, rules: { required: false } },
            MultiplyTheNumberOfOtherDependents: { value: "", errors: {}, rules: { required: false } },
            TotalOfQualifyingChildrenAndOtherDependents: { value: "", errors: {}, rules: { required: false } },
            OtherIncome: { value: "", errors: {}, rules: { required: false } },
            Deductions: { value: "", errors: {}, rules: { required: false } },
            AnyAdditionalTax: { value: "", errors: {}, rules: { required: false } },
        },

        EmployeesWithholdingCertificateSign: "",
        employmentEligibilityVerificationSign: "",

        skillTestQuestion: [],
        jobApplicationStatus: "Pending",

        uploadedDocumentsList: [],
        backgroundCheckDocumentList: [],
        uploadedDocuments: [],
        interviewScheduledDetails: {},
        eligibilityVerificationFormDetails:{}
    }
})

export const { setJobApplicationActiveStep, setJobApplicationFormType, setBackgroundCheckResidingYears, setStateResidingDropdownChange, setPersonalInformationQuestionsDescription, setPersonalInformationQuestionsData, setSkillTestQuestions, setSkillTestQuestionsChange, setJobApplicationStatus, setCitizenshipStatus, setEmploymentEligibilityVerification, setEmploymentEligibilityVerificationFieldsTouched, setEmploymentEligibilityVerificationSign, setUploadedDocumentsList, setBackgroundCheckDocumentList, setBackgroundCheck, setUploadedDocuments, setBackgroundCheckDocument, setUploadedDocumentForAll, setEmployeesWithholdingCertificate, setEmployeesWithholdingCertificateSign, setEmployeesWithholdingCertificateFieldsTouched, setActiveDeclarationTab, setSkillCheckListData, setCheckListTestQuestionsChange, setSingleOrMarried, setJobDescriptionText, setCompetencyCheckListSign, setInterviewScheduledDetailsNurseOnboarding, setUploadedDocumentsWithPreSignedUrl, setEligibilityVerificationFormDetails } = actions