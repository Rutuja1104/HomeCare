import AppDataService from './AppDataService'
import { headerContentWithOutAuthorization } from './utils/constants'

const COMMON_BASE = 'nurse'

export default class NurseOnboardingService {

    static async postNurseOnboardingApplication(agencyId, applicationId, body) {
        return await AppDataService.put(`${COMMON_BASE}/${agencyId}/onboard/${applicationId}`, body, headerContentWithOutAuthorization)
    }

    static async putNurseStateResiding(agencyId, applicationId, body) {
        return await AppDataService.put(`${COMMON_BASE}/${agencyId}/update-residence/${applicationId}`, body, headerContentWithOutAuthorization)
    }

    static async getAssessmentsByRole(role, agencyId) {
        return await AppDataService.get(`assessments/v2?role=${role}`)
    }

    static async postSubmitAssessmentsByRole(agencyId, applicationId, body) {
        return await AppDataService.post(`${COMMON_BASE}/${agencyId}/${applicationId}/assessments/v2/submit`, body, headerContentWithOutAuthorization)
    }

    static async getJobApplicationStatus(applicationId, agencyId) {
        return await AppDataService.get(`${COMMON_BASE}/${agencyId}/${applicationId}/onboarding`, headerContentWithOutAuthorization)
    }

    static async getUserDetailsById(applicationId, agencyId) {
        return await AppDataService.get(`${COMMON_BASE}/${agencyId}/job-applications/${applicationId}`, headerContentWithOutAuthorization)
    }

    static async getCompetencyChecklist(agencyId, role = "NR") {
        // return await AppDataService.get(`checklist/${agencyId}/formType/${role}`, headerContentWithOutAuthorization)
        return await AppDataService.get(`checklist/form/${role}`, headerContentWithOutAuthorization)
    }

    static async postStoreCompetencyChecklistTest(body) {
        // return await AppDataService.post(`checklist/store`, body, headerContentWithOutAuthorization)
        return await AppDataService.post(`checklist/store-response`, body, headerContentWithOutAuthorization)
    }

    static async postUpdateNurseOnboardingStatus(agencyId, applicationId, body) {
        return await AppDataService.patch(`${COMMON_BASE}/${agencyId}/${applicationId}`, body, headerContentWithOutAuthorization)
    }

    static async getInterviewScheduledDetailsNurseOnboarding(agencyId, nurseId) {
        return await AppDataService.get(`interview/${agencyId}/${nurseId}`, headerContentWithOutAuthorization)
    }

    static async postCheckOnboardingExpiration(body) {
        return await AppDataService.post(`admin/check/expiry`, body);
    }

    static async getUploadedChecklistForNurse(agencyId, applicationId, nurseId) {
        return await AppDataService.get(`nurse/checklist/${agencyId}/${applicationId}/${nurseId}`, headerContentWithOutAuthorization)
    }

    static async getUploadedAssessmentForNurse(nurseId) {
        return await AppDataService.get(`assessments/nurse/${nurseId}`, headerContentWithOutAuthorization)
    }
    static async getEmploymentEligibilityVerificationByForm(agencyId, nurseId) {
        return await AppDataService.get(`forms/${agencyId}/${nurseId}/EmploymentEligibilityVerification`)
    }
    static async getNurseOnboardingFormDetails(agencyId,applicationId,formType) {
        return await AppDataService.get(`forms/v2/${agencyId}/${applicationId}/${formType}`)
    }
}