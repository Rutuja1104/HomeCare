export const EPISODE_BASIC_DETAILS_MAPPING_KEYS = {
    "agencyLocation": "Episode Basic Management",
    "emergencyLevel": "Episode Basic Management",
    "SOCDate": "Episode Basic Management",
    "episodeDuration": "Episode Basic Management",
    "startTime": "Episode Basic Management",
    "endTime": "Episode Basic Management",
    "status": "Episode Basic Management",
    "faceToFaceDate": "Episode Basic Management",
}

export const PHYSICIAN_DETAILS_MAPPING_KEYS = {
    "NPI": "Physician Information",
    "contactNumber": "Physician Information",
    "fax": "Physician Information",
    "firstName": "Physician Information",
    "lastName": "Physician Information",
    "primaryEmail": "Physician Information",
    "secondaryEmail": "Physician Information",
    "status": "Physician Information",
}

export const PHYSICIAN_BILLING_ADDRESS_MAPPING_KEYS = {
    "addressLine1": "Physician Information",
    "addressLine2": "Physician Information",
    "city": "Physician Information",
    "country": "Physician Information",
    "pinCode": "Physician Information",
    "state": "Physician Information",
}

export const EPISODE_VITAL_SIGN_RANGES = {
    "highBloodPressure": "Episode Vital Sign Ranges",
    "highBloodSugar": "Episode Vital Sign Ranges",
    "highDiastolic": "Episode Vital Sign Ranges",
    "highPulse": "Episode Vital Sign Ranges",
    "highRespiratory": "Episode Vital Sign Ranges",
    "highSystolic": "Episode Vital Sign Ranges",
    "highTemperature": "Episode Vital Sign Ranges",
    "empty": "Episode Vital Sign Ranges",

    "lowBloodPressure": "Episode Vital Sign Ranges",
    "lowBloodSugar": "Episode Vital Sign Ranges",
    "lowDiastolic": "Episode Vital Sign Ranges",
    "lowPulse": "Episode Vital Sign Ranges",
    "lowRespiratory": "Episode Vital Sign Ranges",
    "lowSystolic": "Episode Vital Sign Ranges",
    "lowTemperature": "Episode Vital Sign Ranges",
}

export const INSURANCE_DETAILS_MAPPING_KEY = {
    "payerName": "Insurance Details",
    "planName": "Insurance Details",
    "relationWithPatient": "Insurance Details",
    "orderOfBenifits": "Insurance Details",
    "insuranceType": "Insurance Details",
    "copay": "Insurance Details",
    "copayAmount": "Insurance Details",
    "copayPercentage": "Insurance Details",
    "deductible": "Insurance Details",
    "effectiveFrom": "Insurance Details",
    "effectiveTill": "Insurance Details",
    "empty": "Insurance Details",
    "empty1": "Insurance Details",
    "empty2": "Insurance Details",
    "empty3": "Insurance Details",
}

export const MEDICATION_DETAILS = {
    drug: { value: "", errors: {}, rules: { required: true } },
    status: { value: "", errors: {}, rules: { required: true } },
    dosageUnit: { value: "", errors: {}, rules: { required: true } },
    startDate: { value: "", errors: {}, rules: { required: true } },
    discontinued: { value: "", errors: {}, rules: { required: true } },
    class: { value: "", errors: {}, rules: { required: true } },
    indication: { value: "", errors: {}, rules: { required: true } },
}

export const WEEKS_INFORMATION = {
    SelectFrequency: { value: "", errors: {}, rules: { required: true } },
    dateAndTime: [],
}

export const CUSTOM_TASK_DATE = {
    scheduledDate: { value: "", errors: {}, rules: { required: true } },
    StartTime: { value: "", errors: {}, rules: { required: true } },
    EndTime: { value: "", errors: {}, rules: { required: true } },
}

export const TASK_FREQUENCY_OPTIONS = [
    { label: "Daily", value: "7" },
    { label: "Once_a_Week", value: "1" },
    { label: "Twice_a_Week", value: "2" },
    { label: "Thrice_a_Week", value: "3" },
    { label: "Every_Weekday", value: "5" },
    { label: "Weekends", value: "2" },
]

export const CREATE_TASK_STATES = {
    employeeName: { value: "", errors: {}, rules: { required: true } },
    TaskName: { value: "", errors: {}, rules: { required: true } },
    TaskStatus: { value: "Open", errors: {}, rules: { required: true } },
    ScheduleDate: { value: "", errors: {}, rules: { required: true } },
    Comments: { value: "", errors: {}, rules: { required: false } },
    frequency: { value: "", errors: {}, rules: { required: true } },
    frequencyChanged: { value: "No", errors: {}, rules: { required: false } },
    Discipline: { value: "", errors: {}, rules: { required: true } },
}