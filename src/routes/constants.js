export const HOME_SECTION_ROUTES = {
    HOME: 'home',
    CHILD_ROUTS: {
        PROFILE_DETAILS: 'profile-details'
    }
};
export const NURSE_DASHBOARD = {
    NURSE_DASHBOARD: 'nursedashboard',
    CHILD_ROUTS: {
        PROFILE_DETAILS: 'profile-details'
    }
}
export const NURSE_ONBOARDING_ROUTES = {
    JOB_APPLICATION: 'job-application',
    CHILD_ROUTS: {
        PROFILE_DETAILS: 'profile-details'
    }
};

export const PHYSICIANS = {
    PHYISICIAN_ORDER: 'physician-order',
    CHILD_ROUTS: {
        PROFILE_DETAILS: 'physician-order'
    }
};

export const PATIENT_MANAGEMENT_ROUTES = {
    PATIENT: 'patientmanagement',
    CHILD_ROUTS: {
        REFERRAL_INTAKE: 'add-new-patient',
        PHYSICIAN_ORDER: 'physician-order ',
        VIEW_PATIENT: 'view-patient'
    }
};

export const NURSE_MANAGEMENT_ROUTES = {
    NURSE_MANAGEMENT: 'nurse-management',
    CHILD_ROUTS: {
        PROFILE_DETAILS: 'profile-details'
    }
};

export const STAFF_MANAGEMENT_ROUTES = {
    STAFF_MANAGEMENT: "staff-management",
    CHILD_ROUTS: {
        NURSE_LIST: 'nurse-list',
        THERAPIST_LIST: 'therapist-list',
        NURSE_DETAILS: 'details',
        OTHER_LIST: 'hha-msw',
        IN_HOUSE_STAFF: 'in-house-staff'
    }
};

export const BILLERS_ROUTES = {
    BILLERS: "billers",
    CHILD_ROUTS: {
        CLAIMS: 'claims',
        PAYCHECKS: 'paychecks',
        PAYERCONTRACTS: 'payerContracts',
        MESSAGES: 'messages',
    }
};

export const JOB_POSTING_ROUTES = {
    JOB_POSTING: 'job-postings',
    JOB_POST: 'job-post',
    CHILD_ROUTS: {
        PROFILE_DETAILS: 'profile-details'
    }
};

export const JOB_POSTING = {
    JOBS: "jobs",
    CHILD_ROUTS: {
        JOB_POSTING_LIST: 'job-posting-list',
        JOB_APPLICATIONS: "job-applications",
        JOB_APPLICATION_DETAILS: "job-application-details"
    }
}

export const EPISODE_MANAGEMENT = {
    EPISODE_MANAGEMENT: "episode-management",
    CHILD_ROUTS: {
        EPISODE_LISTING: 'episode-list',
        PATIENT_DETAILS: 'patient-details',
        CREATE_EPISODE: 'create-episode',
        EPISODE_DETAILS: 'episode-details',
        CREATE_TASK: 'create-task',
        ADD_PROGRESS_NOTES: 'create-progress-notes',
        ADD_NEW_MEDICATION: 'add-new-medication',
        VIEW_MEDICATION_DETAILS: 'medication-details',
        FORM: 'form',
        SUBMITTED_FORM:'submitted-form'
    }
}

export const CLIENT_EPISODE_MANAGEMENT = {
    EPISODE_MANAGEMENT: "episode",
    CHILD_ROUTS: {
        EPISODE_LISTING: 'list',
        EPISODE_DETAILS: 'details',
        CREATE_TASK: 'create-task',
        ADD_PROGRESS_NOTES: 'create-progress-notes',
        ADD_NEW_MEDICATION: 'add-new-medication',
        FORM: 'form',
        SUBMITTED_FORM:'submitted-form'
    }
}

export const CLIENT_SCHEDULE = {
    SCHEDULE: "schedule"
}

export const PHYSICIAN_MANAGEMENT_ROUTES = {
    PHYSICIAN_MANAEMENT: "physicianmanagement"
}

export const FORMS = {
    FORM: "form",
    FORM_SUBMITTED: "formSubmitted",
    FORM_COMPONENT: "formComponent",
};