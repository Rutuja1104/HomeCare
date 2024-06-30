export const PATIENT_SERVICE_DETAILS = {
    service: { value: '', errors: {}, rules: { required: false } },

    caseSequence: { value: '', errors: {}, rules: { required: false } }
};
export const INSURANCE_DETAILS = {
    // payerId: { value: '', errors: {}, rules: { required: true } },
    payerName: { value: '', label: '', errors: {}, rules: { required: true } },

    // payerName: { value: { label: '', value: '' }, label: '', errors: {}, rules: { required: true } },
    planName: { value: '', errors: {}, rules: { required: true } },
    orderOfBenifits: { value: '', errors: {}, rules: { required: false } },
    insuranceId: { value: '', errors: {}, rules: { required: true } },
    // insuranceType: { value: { label: '', value: '' }, label: '', errors: {}, rules: { required: true } },
    insuranceType: { value: "",label: "", errors: {}, rules: { required: true } },
    deductible: { value: '', errors: {}, rules: { required: false } },
    copay: { value: '', errors: {}, rules: { required: false } },
    copayAmount: { value: '', errors: {}, rules: { required: false } },
    groupId: { value: '', errors: {}, rules: { required: false } },
    relationWithPatient: { value: '', errors: {}, rules: { required: false } },
    effectiveFrom: { value: '', errors: {}, rules: { required: true } },
    effectiveTill: { value: '', errors: {}, rules: { required: true } },

    documents: []
};
export const PERSONAL_DETAILS = {
    firstName: { value: '', errors: {}, rules: { required: true } },
    lastName: { value: '', errors: {}, rules: { required: true } },
    gender: { value: '', label: '', errors: {}, rules: { required: true } },
    email: {
        value: '',
        errors: {},
        rules: {
            required: false,
            rules: { required: false } // regex: { pattern: /^\S+@\S+\.\S+$/, message: 'Please enter a valid email address' }
        }
    },
    phoneNumber: {
        value: '',
        errors: {},
        rules: {
            required: true,
            regex: { pattern: /\b\d{10}\b/, message: 'Please enter a 10 digit phone number' }
        }
    },

    race: { value: '', label: '', errors: {}, rules: { required: false } },
    dateOfBirth: { value: '', errors: {}, rules: { required: true } },
    HICNumber: {
        value: '',
        errors: {},
        rules: { required: false } //regex: { pattern: /\b\d{11}\b/, message: 'Please enter 11 digits only' }
    },
    ssn: {
        value: '',
        errors: {},
        rules: {
            required: false
            // regex: { pattern: /\b\d{9}\b/, message: 'Please enter 9 digits only' }
        }
    },
    patientServiceStatus: 'Active',
    isSameBillingAddress: { value: true, errors: {} },

    documents: [],
    country: { value: '', errors: {}, rules: { required: true } },
    pinCode: { value: '', errors: {}, rules: { required: true } },
    city: { value: '', errors: {}, rules: { required: true } },
    state: { value: '', errors: {}, rules: { required: true } },
    addressLine1: { value: '', errors: {}, rules: { required: true } },
    addressLine2: { value: '', errors: {}, rules: { required: false } },
    billingAddress_line1: { value: '', errors: {} },
    billingAddress_line2: { value: '', errors: {} },
    billingAddress_country: { value: '', errors: {} },
    billingAddress_city: { value: '', errors: {} },
    billingAddress_state: { value: '', errors: {} },
    billingAddress_pinCode: { value: '', errors: {} },

    diseases: { value: '', errors: {} },
    medicationDetails: { value: '', errors: {} },
    mrn: {
        value: '',
        errors: {},
        rules: {
            required: false
            //regex: { pattern: /\b\d{7}\b/, message: 'Please enter 7 digits only' }
        }
    }
};

const SEND_EMAIL_DETAILS = {
    physician: {
        id: { value: '', errors: {}, rules: { required: true } },
        NPI: { value: '', errors: {}, rules: { required: true } },
        firstName: { value: '', errors: {}, rules: { required: true } },
        lastName: { value: '', errors: {}, rules: { required: true } },
        email: { value: '', errors: {}, rules: { required: true } },
        fax: { value: '', errors: {}, rules: { required: true } },
        status: null,
        practiceAddressId: { value: '', errors: {}, rules: { required: true } },
        billingAddressId: { value: '', errors: {}, rules: { required: true } },
        contactNumber: { value: '', errors: {}, rules: { required: true } },
        userId: { value: '', errors: {}, rules: { required: true } },
        created_at: { value: '', errors: {}, rules: { required: true } },
        updated_at: { value: '', errors: {}, rules: { required: true } },
        created_by: null
    },
    patient: {
        id: { value: '', errors: {}, rules: { required: true } },
        firstName: { value: '', errors: {}, rules: { required: true } },
        lastName: { value: '', errors: {}, rules: { required: true } },
        gender: { value: '', label: '', errors: {}, rules: { required: true } },
        email: { value: '', errors: {}, rules: { required: true } },
        phoneNumber: { value: '', errors: {}, rules: { required: true } },
        race: { value: '', errors: {}, rules: { required: true } },
        dateOfBirth: { value: '', errors: {}, rules: { required: true } },
        HICNumber: { value: '', errors: {}, rules: { required: true } },
        ssn: 1234567890,
        isSameBillingAddress: true,
        diseases: ['cough', 'fever'],
        patientServiceStatus: 'Active',
        medicationDetails: []
    },
    adminEmail: '' || undefined,
    emailType: 'MEDICAL_ORDER'
};

export const MEDICAL_ORDER_DETAILS = {
    patientDiagnostics:'',
    physicianId: '',
    nurse: [],
    therapist: [],
    MSW: [],
    HHA: []
};

export const ADD_PHYSICIAN = {
    npi: '',
    name: ''
};

export const CREATE_PHYSICIAN = {
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
};
export const FACE_TO_FACE = {
    dateOfBirth: { value: '', errors: {}, rules: { required: false } },
    firstName: { value: '', errors: {}, rules: { required: false } },
    lastName: { value: '', errors: {}, rules: { required: false } },
    middleName: { value: '', errors: {}, rules: { required: false } },
    id: { value: '', errors: {}, rules: { required: false } },
    quallifyingEncounterType_section1: { value: false, errors: {}, rules: { required: false } },
    quallifyingEncounterType_section1_service: { value: '', errors: {}, rules: { required: false } },
    quallifyingEncounterType_section1_dateConducted: { value: '', errors: {}, rules: { required: true } },
    quallifyingEncounterType_section1_providerName: { value: '', errors: {}, rules: { required: false } },
    quallifyingEncounterType_section1_questionResponse: { value: false, errors: {}, rules: { required: false } },
    quallifyingEncounterType_section2: { value: false, errors: {}, rules: { required: false } },
    quallifyingEncounterType_section2_service: { value: '', errors: {}, rules: { required: false } },
    quallifyingEncounterType_section2_dateConducted: { value: '', errors: {}, rules: { required: true } },
    quallifyingEncounterType_section2_providerName: { value: '', errors: {}, rules: { required: false } },
    quallifyingEncounterType_section2_questionResponse: { value: false, errors: {}, rules: { required: false } },
    quallifyingEncounterType_section3: { value: false, errors: {}, rules: { required: false } },
    quallifyingEncounterType_section3_service: { value: '', errors: {}, rules: { required: false } },
    // quallifyingEncounterType_section3_dateConducted: { value: '', errors: {}, rules: { required: false } },
    // quallifyingEncounterType_section3_providerName: { value: '', errors: {}, rules: { required: true } },
    quallifyingEncounterType_section3_providerName_2: { value: '', errors: {}, rules: { required: false } },
    quallifyingEncounterType_section3_questionResponse: { value: false, errors: {}, rules: { required: false } },
    quallifyingEncounterType_section3_SOCDate: { value: '', errors: {}, rules: { required: true } },
    quallifyingEncounterType_section3_thirtyDay: { value: '', errors: {}, rules: { required: true } },
    quallifyingEncounterType_section3_dateOfVisit: { value: '', errors: {}, rules: { required: true } },
    quallifyingEncounterType_section3_dateConducted_2: { value: '', errors: {}, rules: { required: false } },
    // quallifyingEncounterType_section3_contactBy: { value: '', errors: {}, rules: { required: false } },
    quallifyingEncounterType_section3_explanation: { value: '', errors: {}, rules: { required: false } },
    additionalInformation: { value: '', errors: {}, rules: { required: false } },
    explain: { value: '', errors: {}, rules: { required: false } },

    PhysicianAttention_physicianName: { value: '', errors: {}, rules: { required: false } },
    PhysicianAttention_practitionerName: { value: '', errors: {}, rules: { required: true } },
    PhysicianAttention_licenseNo: { value: '', errors: {}, rules: { required: true } },
    PhysicianAttention_encounterDescription: { value: '', errors: {}, rules: { required: false } },
    PhysicianAttention_clinicalFindings: { value: '', errors: {}, rules: { required: true } },
    PhysicianAttention_clinicalFindingsReason: { value: '', errors: {}, rules: { required: false } },
    PhysicianAttention_attestationDate: { value: '', errors: {}, rules: { required: true } },
    dateOfSignature: { value: '', errors: {}, rules: { required: true } },
    physiciansName: { value: '', errors: {}, rules: { required: false } },
    // service: { value: '', errors: {}, rules: { required: true }, isChecked: '' }
    serviceNursing: { value: '', errors: {}, rules: { required: false }, isChecked: '' },
    serviceTherapy: { value: '', errors: {}, rules: { required: false }, isChecked: '' }
    // physicianSignature: { value: '', errors: {}, rules: { required: true } }
    // dateOfSignature: { value: '', errors: {}, rules: { required: true } }
};

export const MEDICATION_DETAILS = {
    disease: { value: '', errors: {}, rules: { required: true } },
    medication: { value: '', errors: {}, rules: { required: true } },
    dosage: { value: '', errors: {}, rules: { required: true } }
};

export const REFERRAL_INTAKE = {
    referral_firstName: { value: '', errors: {}, rules: { required: true } },
    referral_lastName: { value: '', errors: {}, rules: { required: true } },
    // referral_lastName: { value: '', errors: {}, rules: { required: true } },
    referral_email: {
        value: '',
        errors: {}
        // rules: { required: false, regex: { pattern: /^\S+@\S+\.\S+$/, message: 'Please enter a valid email address' } }
    },
    referral_phoneNumber: {
        value: '',
        errors: {},
        rules: { required: true, regex: { pattern: /\b\d{10}\b/, message: 'Please enter 10 digits only' } }
    },
    referral_addressLine1: { value: '', errors: {}, rules: { required: false } },
    referral_addressLine2: { value: '', errors: {}, rules: { required: false } },
    referral_country: { value: '', errors: {}, rules: { required: false } },
    referral_city: { value: '', errors: {}, rules: { required: false } },
    referral_state: { value: '', errors: {}, rules: { required: false } },
    referral_pinCode: { value: '', errors: {}, rules: { required: false } },
    referral_SSN: {
        value: '',
        errors: {},
        rules: { required: false, regex: { pattern: /\b\d{9}\b/, message: 'Please enter 9 digits only' } }
    }
};

export const GUARENTOR_INFO = {
    guarentorFirstName: { value: '', errors: {}, rules: { required: true } },
    guarentorLastName: { value: '', errors: {}, rules: { required: true } },
    guarentorPhoneNumber: {
        value: '',
        errors: {},
        rules: { required: true, regex: { pattern: /\b\d{10}\b/, message: 'Please enter 10 digits only' } }
    },
    guarentorEmail: {
        value: '',
        errors: {}
        // rules: { required: false, regex: { pattern: /^\S+@\S+\.\S+$/, message: 'Please enter a valid email address' } }
    },
    guarentor_addressLine1: { value: '', errors: {}, rules: { required: false } },
    guarentor_addressLine2: { value: '', errors: {}, rules: { required: false } },
    guarentor_country: { value: '', errors: {}, rules: { required: false } },
    guarentor_city: { value: '', errors: {}, rules: { required: false } },
    guarentor_state: { value: '', errors: {}, rules: { required: false } },
    guarentor_pinCode: { value: '', errors: {}, rules: { required: false } },
    // guarentor_lastName: { value: '', errors: {}, rules: { required: true } },
    guarentor_ssn: {
        value: '',
        errors: {},
        rules: { required: false, regex: { pattern: /\b\d{9}\b/, message: 'Please enter 9 digits only' } }
    }
};

export const UPDATE_PATIENT = {
    firstName: { value: '', errors: {}, rules: { required: false } },
    lastName: { value: '', errors: {}, rules: { required: false } },
    email: {
        value: '',
        errors: {},
        rules: { required: false, regex: { pattern: /^\S+@\S+\.\S+$/, message: 'Please enter a valid email address' } }
    },
    phoneNumber: {
        value: '',
        errors: {},
        rules: { required: false, regex: { pattern: /\b\d{10}\b/, message: 'Please enter 10 digits only' } }
    },
    race: { value: '', label: '', errors: {} },
    dateOfBirth: { value: '', errors: {}, rules: { required: false } },
    HICNumber: {
        value: '',
        errors: {},
        rules: { required: false, regex: { pattern: /\b\d{11}\b/, message: 'Please enter 11 digits only' } }
    },
    ssn: {
        value: '',
        errors: {},
        rules: {
            required: false,
            regex: { pattern: /\b\d{9}\b/, message: 'Please enter 9 digits only' }
        }
    },
    patientServiceStatus: 'Active',
    isSameBillingAddress: { value: false, errors: {} },

    documents: [],
    country: { value: '', errors: {}, rules: { required: false } },
    pinCode: { value: '', errors: {}, rules: { required: false } },
    city: { value: '', errors: {}, rules: { required: false } },
    state: { value: '', errors: {}, rules: { required: false } },
    addressLine1: { value: '', errors: {}, rules: { required: false } },
    addressLine2: { value: '', errors: {}, rules: { required: false } }
};
