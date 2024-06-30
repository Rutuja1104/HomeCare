import General from '../libs/utility/General';
import { getAgencyDetails } from '../pages/Home/HomeSaga';
import AppDataService from './AppDataService';
import { customHeaders } from './utils/constants';

const COMMON_BASE = 'admin';
const token = General.getLocalStorageData('token');
const agencyId = General.getLocalStorageData('agencyId');

export default class AdminDataService {
    static async getUserDetailsByIdForAgencyAdmin(applicationID) {
        return await AppDataService.get(`${COMMON_BASE}/nurse/${applicationID}`, customHeaders(token));
    }

    static async putValidateUserApplication(nurseId, data) {
        return await AppDataService.patch(
            `${COMMON_BASE}/${nurseId}/validate-nurse`,
            data,
            customHeaders(token)
        );
    }

    static async postScheduleUserInterview(data, token) {
        return await AppDataService.post(`interview/schedule`, data, customHeaders(token));
    }

    static async getUserAssessmentDetails(nurseId, token) {
        return await AppDataService.get(`${COMMON_BASE}/assessment/v2/nurse/${nurseId}`, customHeaders(token));
    }

    static async getUserStatusByUserId(nurseId) {
        return await AppDataService.get(`${COMMON_BASE}/nurse/${nurseId}/onboarding`, customHeaders(token));
    }

    static async getAllNurseList(token, agencyId, page, limit, status, firstName, lastName, role) {
        return await AppDataService.get(
            `nurse/${agencyId}/all?page=${page}&limit=${limit}&status=${status}&firstName=${firstName}&lastName=${lastName}&role=${role}`,
            customHeaders(token)
        );
    }

    static async postSendEmailInvitation(data, token) {
        return await AppDataService.post(`${COMMON_BASE}/onboarding/send-email`, data, customHeaders(token));
    }

    static async getUserStatusForAdmin(token, nurseId) {
        return await AppDataService.get(`nurse/${nurseId}/onboarding`, customHeaders(token));
    }

    static async getSubmittedChecklist(agencyId, role, nurseId, token) {
        return await AppDataService.get(`checklist/${agencyId}/formType/${role}/${nurseId}`, customHeaders(token));
    }

    static async getInterviewScheduledDetails(agencyId, nurseId, token) {
        return await AppDataService.get(`interview/${agencyId}/${nurseId}`, customHeaders(token));
    }

    static async getProfessionalRoles(token) {
        return await AppDataService.get(`professional-roles`, customHeaders(token));
    }

    static async getAgencyDetailsById(agencyId, token) {
        return await AppDataService.get(`agencies/${agencyId}`, customHeaders(token));
    }
    static async putNurseById(id, body, token) {
        return await AppDataService.put(`admin/nurse/details/${id}`, body, customHeaders(token));
    }

    static async postFaxDetails(data, token) {
        return await AppDataService.post(`${COMMON_BASE}/send-data`, data, {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Credentials': 'true'
        });
    }

    static async getFaxDetails(agencyId, phoneNumber, direction, token) {
        let url = `${COMMON_BASE}/get-fax?agencyId=${agencyId}`;
        if (phoneNumber) url += `&phoneNumber=${phoneNumber}`;
        if (direction) url += `&direction=${direction}`;
        return await AppDataService.get(url, customHeaders(token));
    }
    static async postPrintApplicationForNurse(nurseId, token) {
        return (
            await AppDataService.post(`${COMMON_BASE}/print/${nurseId}`)
        );
    }
}
