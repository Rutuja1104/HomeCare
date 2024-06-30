export const NURSE_MANAGEMENT_KEY_MAPPING = {
    //Personal Information
    "firstName": "Personal Information",
    "middleName": "Personal Information",
    "lastName": "Personal Information",
    "Telephone": "Personal Information",
    "email": "Personal Information",
    "dob": "Personal Information",
    "ssn": "Personal Information",
    "gender": "Personal Information",
    "role": "Personal Information",
    "validAge": "Personal Information",
    "workType": "Personal Information",
};

export const PERSONAL_ADDRESS_KEY_MAPPING = {
    "addressLine1": "Personal Information",
    "addressLine2": "Personal Information",
    "landmark": "Personal Information",
    "city": "Personal Information",
    "state": "Personal Information",
    "country": "Personal Information",
    "pinCode": "Personal Information",
    "empty1": "Personal Information",
};

export const PREVIOUS_EMPLOYMENT_ADDRESS_KEY_MAPPING = {
    "addressLine1": "Previous Employer Info",
    "addressLine2": "Previous Employer Info",
    "landmark": "Previous Employer Info",
    "city": "Previous Employer Info",
    "state": "Previous Employer Info",
    "country": "Previous Employer Info",
    "pinCode": "Previous Employer Info",
    "empty1": "Previous Employer Info",
    "empty2": "Previous Employer Info",
    "empty3": "Previous Employer Info",
    "empty4": "Previous Employer Info",
    "empty5": "Previous Employer Info",
    "empty6": "Previous Employer Info",
    "empty7": "Previous Employer Info",
};

export const BACKGROUND_CHECK_MAPPING_KEYS = {
    "StateResidence": "Background Check",
    "residenceYears": "Background Check",
}

export const EDUCATIONAL_INFO_MAPPING_KEYS = {
    "instituteName": "Educational Information",
    // "isCompleted": "Educational Information",
    "stream": "Educational Information",
    "type": "Educational Information",
    "yearAttended": "Educational Information",
    "yearofPassout": "Educational Information",
    "addressId": "Educational Information",
    "empty1": "Educational Information",
    "empty7": "Educational Information",
}

export const CERTIFICATIONS_INFO_MAPPING_KEYS = {
    "certificateNumber": "Nursing License",
    "dateIssued": "Nursing License",
    "expiryDate": "Nursing License",
    "stateIssued": "Nursing License",
    "type": "Nursing License",
    "empty1": "Nursing License",
    "empty2": "Nursing License",
    "empty3": "Nursing License",
}

export const REFERENCES_INFO_MAPPING_KEYS = {
    "title": "References",
    "contactFirstName": "References",
    "contactLastName": "References",
    "email": "References",
    "phoneNumber": "References",
    "company": "References",
    "contactType": "References",
    "empty": "References",
}
 
export const PREVIOUS_EMPLOYMENT_INFO_MAPPING_KEYS = {
    "Employername": "Previous Employer Info",
    "startDate": "Previous Employer Info",
    "endDate": "Previous Employer Info",
    "startingSalary": "Previous Employer Info",
    "endingSalary": "Previous Employer Info",
    "jobTitle": "Previous Employer Info",
    "phoneNumber": "Previous Employer Info",
    "responsibilities": "Previous Employer Info",
    "reasonForLeavingCompany": "Previous Employer Info",
    "contactPersonName" : "Previous Employer Info",
    // "empty1": "Previous Employer Info",
    // "empty2": "Previous Employer Info",
    // "empty3": "Previous Employer Info",
    // "empty4": "Previous Employer Info",
    // "empty5": "Previous Employer Info",
    // "empty6": "Previous Employer Info",
    "address": "Previous Employer Info",
    // "empty7": "Previous Employer Info",
}

export const ELIGIBILITY_VERIFICATION_INFO_MAPPING_KEYS = {
    // "label": "Eligibility verification",
    // "checked": "Eligibility verification",
    "USCISNumber": "Eligibility verification",
    // "PassportNumber": "Eligibility verification",
    "AdmissionNumber": "Eligibility verification",
    "ApartmentNumber": "Eligibility verification",
    "SocialSecurityNumber": "Eligibility verification",
    "WorkAuthorizationNumber":"Eligibility verification"
}

export const ELIGIBILITY_VERIFICATION_PERSONAL_INFO = {
    "FirstName": "Eligibility verification",
    "LastName": "Eligibility verification",
    "MiddleName": "Eligibility verification",
    "OtherLastName": "Eligibility verification",
    "EmailAddress": "Eligibility verification",
    "DateOfBirth": "Eligibility verification",
    "PhoneNumber": "Eligibility verification",
    "Address": "Eligibility verification",
    "CityOrTown": "Eligibility verification",
    "State": "Eligibility verification",
    "ZIPCode": "Eligibility verification",
    "label":"Eligibility verification",
}


export const TAX_INFORMATION_MAPPING_KEYS = {
    "FirstName": "Employees Withholding Certificate",
    "LastName": "Employees Withholding Certificate",
    "MiddleName": "Employees Withholding Certificate",
    "State": "Employees Withholding Certificate",
    "SSN": "Employees Withholding Certificate",
    "ZIPCode": "Employees Withholding Certificate",
    "CityOrTown": "Employees Withholding Certificate",
    "Deductions": "Employees Withholding Certificate",
    "OtherIncome": "Employees Withholding Certificate",
    "AnyAdditionalTax": "Employees Withholding Certificate",
    "numberOfQualifyingChildren": "Employees Withholding Certificate",
    "MultiplyTheNumberOfOtherDependents": "Employees Withholding Certificate",
    "TotalOfQualifyingChildrenAndOtherDependents": "Employees Withholding Certificate",
    "label":"Employees Withholding Certificate",
    // "AnyAdditionalTax":"Employees Withholding Certificate",
};

export const SCHEDULE_INTERVIEW_STATE = {
    allRequiredFieldsTouched: false,
    ScheduleDate: { value: "", errors: {}, rules: { required: true } },
    // StartTime: { value: "", errors: {}, rules: { required: true } },
    // EndTime: { value: "", errors: {}, rules: { required: true } },
    WayOfInterview: { value: "", errors: {}, rules: { required: true } },
    MeetingLink: { value: "", errors: {}, rules: { required: false } },
    addressLine1: { value: "", errors: {}, rules: { required: true } },
    addressLine2: { value: "", errors: {}, rules: { required: false } },
    state: { value: "", errors: {}, rules: { required: true } },
    city: { value: "", errors: {}, rules: { required: true } },
    country: { value: "", errors: {}, rules: { required: true } },
    pinCode: { value: "", errors: {}, rules: { required: true } },
    InterviewerName: { value: "", errors: {}, rules: { required: true } },
    PhoneNumber: { value: "", errors: {}, rules: { required: true } },
    Duration: { value: "", errors: {}, rules: { required: true } }
}
