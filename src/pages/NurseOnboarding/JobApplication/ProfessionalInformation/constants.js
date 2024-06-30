import { ALL_ROLES, ROLES } from "../../../../libs/constant"

export const PERSONAL_INFORMATION_QUESTIONS = [
    {
        name: "question 1",
        question: "Are you of legal age to work?",
        choices: [
            { checked: false, label: "Yes" },
            { checked: false, label: "No" }
        ],
    }, {
        name: "question 2",
        question: "Are you a U.S. citizen?",
        choices: [
            { checked: false, label: "Yes" },
            { checked: false, label: "No" }
        ],
    }, {
        name: "question 3",
        question: "Are you available to work full-time?",
        choices: [
            { checked: false, label: "Full-time" },
            { checked: false, label: "Part-time" }
        ]
    }, {
        name: "question 4",
        question: "Have you ever been convicted of a crime other than a routine traffic citation?",
        choices: [
            { checked: false, label: "Yes" },
            { checked: false, label: "No" }
        ],
    },
]

export const EDUCATIONAL_INFORMATION = {
    id: { value: "", errors: {}, rules: { required: false } },
    InstituteName: { value: "", errors: {}, rules: { required: true } },
    Degree: { value: "", errors: {}, rules: { required: true } },
    Branch: { value: "", errors: {}, rules: { required: true } },
    EducationalCity: { value: "", errors: {}, rules: { required: true } },
    EducationalState: { value: "", errors: {}, rules: { required: true } },
    EducationStartDate: { value: "", errors: {}, rules: { required: true } },
    EducationEndDate: { value: "", errors: {}, rules: { required: true } },
    // IsValidRONLicense: { value: "", errors: {}, rules: { required: false } },
}

export const PREVIOUS_EMPLOYER_INFO = {
    id: { value: "", errors: {}, rules: { required: false } },
    CompanyName: { value: "", errors: {}, rules: { required: true } },
    JobTitle: { value: "", errors: {}, rules: { required: true } },
    JobType: { value: "", errors: {}, rules: { required: true } }, // responsibilities
    PreviousEmployerContactNumber: { value: "", errors: {}, rules: { required: true, regex: { pattern: /\b\d{10}\b/, message: 'Please enter 10 digits only' } } },
    PreviousEmployerStartingSalary: { value: "", errors: {}, rules: { required: true } },
    PreviousEmployerEndingSalary: { value: "", errors: {}, rules: { required: true } },
    PreviousEmployerStartDate: { value: "", errors: {}, rules: { required: true } },
    PreviousEmployerEndDate: { value: "", errors: {}, rules: { required: true } },
    PreviousEmployerAddressline1: { value: "", errors: {}, rules: { required: true } },
    PreviousEmployerAddressline2: { value: "", errors: {}, rules: { required: false } },
    PreviousEmployerAddresscity: { value: "", errors: {}, rules: { required: true } },
    PreviousEmployerAddressstate: { value: "", errors: {}, rules: { required: true } },
    PreviousEmployerAddresspinCode: { value: "", errors: {}, rules: { required: true } },
    PreviousEmployerAddresscountry: { value: "", errors: {}, rules: { required: true } },
    PreviousEmployerCompanyContactNumber: { value: "", errors: {}, rules: { required: false, regex: { pattern: /\b\d{10}\b/, message: 'Please enter 10 digits only' } } },
    PreviousEmployerReasonForLeavingCompany: { value: "", errors: {}, rules: { required: true } },
    PreviousEmployerContactPersonName: { value: "", errors: {}, rules: { required: true } },
}

export const REFERENCE_INFO = {
    id: { value: "", errors: {}, rules: { required: false } },
    FirstName: { value: "", errors: {}, rules: { required: true } },
    LastName: { value: "", errors: {}, rules: { required: true } },
    ReferenceRelationship: { value: "", errors: {}, rules: { required: true } },
    PhoneNumber: { value: "", errors: {}, rules: { required: true, regex: { pattern: /\b\d{10}\b/, message: 'Please enter 10 digits only' } } },
    email: { value: "", errors: {}, rules: { required: false } },
    ReferenceTitle: { value: "", errors: {}, rules: { required: true } },
    ReferenceCompany: { value: "", errors: {}, rules: { required: true } },
}

export const LICENSE_INFORMATION = {
    id: { value: "", errors: {}, rules: { required: false } },
    LicenseName: { value: "", errors: {}, rules: { required: true } },
    LicenseNumber: { value: "", errors: {}, rules: { required: true } },
    LicenseState: { value: "", errors: {}, rules: { required: true } },
    LicenseExpirationDate: { value: "", errors: {}, rules: { required: true } },
    LicenseDateIssued: { value: "", errors: {}, rules: { required: true } },
}

export const PERSONAL_INFO_INITIAL_STATES = {
    FirstName: { value: "", errors: {}, rules: { required: true } },
    MiddleName: { value: "", errors: {}, rules: { required: false } },
    LastName: { value: "", errors: {}, rules: { required: true } },
    TelephoneNumber: { value: "", errors: {}, rules: { required: true, regex: { pattern: /\b\d{10}\b/, message: 'Please enter 10 digits only' } } },
    EmailID: { value: "", errors: {}, rules: { required: true, regex: { pattern: /^\S+@\S+\.\S+$/, message: 'Please enter a valid email address' } } },
    DateOfBirth: { value: "", errors: {}, rules: { required: true } },
    SSN: { value: "", errors: {}, rules: { required: true, regex: { pattern: /\b\d{9}\b/, message: 'Please enter 9 digits only' } } },

    AddressId: { value: "", errors: {}, rules: { required: false } },
    AddressLine1: { value: "", errors: {}, rules: { required: true } },
    AddressLine2: { value: "", errors: {}, rules: { required: false } },
    Landmark: { value: "", errors: {}, rules: { required: false } },
    City: { value: "", errors: {}, rules: { required: true } },
    State: { value: "", errors: {}, rules: { required: true } },
    Country: { value: "", errors: {}, rules: { required: true } },
    ZipCode: { value: "", errors: {}, rules: { required: true } },
}

export const DOCUMENT_TYPE_ARRAY = [
    {
        title: "CPR/first Aid",
        name: "CPRTest",
        isRequired: [],
        documents: []
    },
    {
        title: "TB Test",
        name: "TBTest",
        isRequired: [],
        documents: []
    },
    {
        title: "Driver’s License",
        name: "DriversLicense",
        isRequired: ALL_ROLES,
        documents: []
    },
    {
        title: "Social Security Card",
        name: "SocialSecurityCard",
        isRequired: ALL_ROLES,
        documents: []
    },
    {
        title: "Professional License only for RN/LPN All Therapy",
        name: "ProfessionalLicenseOnlyForRN",
        isRequired: [ROLES.RN, ROLES.LPN, ROLES.PT, ROLES.ST, ROLES.OT, ROLES.COTA, ROLES.LPTA],
        documents: []
    },
    {
        title: "Auto Insurance only for DSP",
        name: "AutoInsuranceOnlyForDSP",
        isRequired: [ROLES.DSP],
        documents: []
    },
    {
        title: "Resume",
        name: "Resumes",
        isRequired: ALL_ROLES,
        documents: []
    },
]