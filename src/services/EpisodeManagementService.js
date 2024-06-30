import General from '../libs/utility/General';
import AppDataService from './AppDataService';
import { customHeaders } from './utils/constants';

const COMMON_BASE = 'patients';

const token = General.getLocalStorageData("token")
export default class EpisodeManagementService {
    static async getAllPatientList(agencyId, pageNumber, limit, status, searchKey, token) {
        return await AppDataService.get(
            `${COMMON_BASE}/${agencyId}?pageNumber=${pageNumber}&limit=${limit}&patientServiceStatus=${status}&searchKey=${searchKey}`,
            customHeaders(token)
        );
    }

    static async getPatientDetailsById(agencyId, patientId, token) {
        return await AppDataService.get(`admin/${agencyId}/patient/${patientId}`, customHeaders(token));
    }

    static async getEpisodeListByAgencyId(agencyId, pageNumber, limit, token, status, searchKey) {
        return await AppDataService.get(`episode/${agencyId}?pageNumber=${pageNumber}&limit=${limit}&status=${status}&searchKey=${searchKey}`, customHeaders(token));
    }

    static async getUserListByRole(agencyId, role, token) {
        return await AppDataService.get(`admin/role-type?role=${role}`, customHeaders(token));
    }

    static async getStaffListByAgencyId(agencyId, token) {
        return await AppDataService.get(`staff/${agencyId}`, customHeaders(token));
    }

    static async postCreateEpisode(agencyId, patientId, body, token) {
        return await AppDataService.post(`episode/${agencyId}/${patientId}`, body, customHeaders(token));
    }

    static async getEmergencyVitals(agencyId, token) {
        return await AppDataService.get(`emergency-vitals/${agencyId}`, customHeaders(token));
    }

    static async getEpisodeDetailsById(agencyId, episodeId, token) {
        return await AppDataService.get(`episode/${agencyId}/episode/${episodeId}`, customHeaders(token));
    }

    static async getTaskListByEpisodeId(agencyId, episodeId, status, limit, pageNumber, token) {
        return await AppDataService.get(`task?status=${status}&limit=${limit}&pageNumber=${pageNumber}&episodeId=${episodeId}&agencyId=${agencyId}`, customHeaders(token));
    }

    static async getProgressNotesByEpisodeId(agencyId, episodeId, status, limit, pageNumber, token) {
        return await AppDataService.get(`notes/${agencyId}/${episodeId}?status=${status}&limit=${limit}&pageNumber=${pageNumber}`, customHeaders(token));
    }

    static async getAssigneeByEpisodeId(agencyId, episodeId, token) {
        return await AppDataService.get(`episode/${agencyId}/assignee/${episodeId}`, customHeaders(token));
    }

    static async postCreateProgressNote(agencyId, episodeId, body, token) {
        return await AppDataService.post(`notes/${agencyId}/${episodeId}`, body, customHeaders(token));
    }

    static async getTaskTypeByDiscipline(type, token) {
        return await AppDataService.get(`task/code?type=${type}`, customHeaders(token));
    }
    static async getVitalSigns(agencyId, episodeId) {
        return await AppDataService.get(`vitalRange/${agencyId}/episode/${episodeId}`, customHeaders(token));
    }
    static async getAllMedications(agencyId, episodeId, token, PageNumber, limit) {
        return await AppDataService.get(`medications/${agencyId}/episode/${episodeId}?pageNumber=${PageNumber}&limit=${limit}`, customHeaders(token));
    }
    static async postMedications(agencyId, episodeId, body) {
        return await AppDataService.post(`medications/${agencyId}/${episodeId}`, body, customHeaders(token));
    }
    static async getMedicationDetailsByEpisodeId(agencyId, episodeId) {
        return await AppDataService.get(`medications/${agencyId}/${episodeId}`, customHeaders(token));
    }

    static async getAssigneeByDisciplineAndRole(role, token) {
        return await AppDataService.get(`admin/role-type?role=${role}`, customHeaders(token));
    }

    static async postCreateTask(agencyId, episodeId, body, token) {
        return await AppDataService.post(`task/${agencyId}/${episodeId}`, body, customHeaders(token));
    }

    static async getAllPayerList(patientId, token) {
        return await AppDataService.get(`payer/${patientId}`, customHeaders(token));
    }

    static async getSchedulesByEpisode(agencyId, nurseId, staffId, token, episodeId) {
        return await AppDataService.get(`schedules?agencyId=${agencyId}${nurseId ? `&nurseId=${nurseId}` : ""}${staffId ? `&staffId=${staffId}` : ""}${episodeId ? `&episodeId=${episodeId}` : ""}`, customHeaders(token));
    }

    static async deleteEpisode(agencyId, episodeId, token,) {
        return await AppDataService.delete(`episode/${agencyId}/${episodeId}`, null, customHeaders(token));
    }

    static async deleteTaskAndSchedule(agencyId, episodeId, taskId, token) {
        return await AppDataService.delete(`task/${agencyId}/${episodeId}/${taskId}`, null, customHeaders(token));
    }

    static async getTaskByTaskId(taskId, token) {
        return await AppDataService.get(`task/${taskId}`, customHeaders(token));
    }

    static async patchUpdateExistingTasks(agencyId, episodeId, taskId, body, token) {
        return await AppDataService.patch(`task/${agencyId}/${episodeId}/${taskId}`, body, customHeaders(token));
    }

    static async deleteProgressNote(agencyId, episodeId, noteId, token) {
        return await AppDataService.delete(`notes/${agencyId}/${episodeId}/${noteId}`, null, customHeaders(token));
    }

    static async getProgressNoteById(agencyId, episodeId, noteId, token) {
        return await AppDataService.get(`notes/${agencyId}/${episodeId}/${noteId}`, customHeaders(token));
    }

    static async patchUpdateExistingProgressNotes(agencyId, episodeId, noteId, body, token) {
        return await AppDataService.patch(`notes/${agencyId}/${episodeId}/${noteId}`, body, customHeaders(token));
    }

    static async deleteMedication(agencyId, medicationId, token) {
        return await AppDataService.delete(`medications/${agencyId}/${medicationId}`, null, customHeaders(token));
    }

    static async deleteSchedule(scheduleId, token) {
        return await AppDataService.delete(`schedules/${scheduleId}`, null, customHeaders(token));
    }

    static async createForm(body) {
        return await AppDataService.post('forms/packetForm', body);
    }

    static async getFilledFormDataById(episodeId, formId) {
        return await AppDataService.get(`forms/${formId}/episode/${episodeId}`);
    }

    static async getFormComponentById(formId) {
        const response = await fetch("https://forms.dev.allinoneemr.com/api/get", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: formId }),
        });
        return await response.json()
    }

    static async getEpisodePurposeByEpisodeId(agencyId, episodeId, token) {
        return await AppDataService.get(`episode/${agencyId}/episode/${episodeId}`, customHeaders(token));
    }

    static async getEpisodePurposeUsingRole(discipline) {
        return await AppDataService.get(`episode/episodePurpose/${discipline}`);
    }

    static async updateEpisodeFormStatus(episodeId, formId, body) {
        return await AppDataService.patch(`episode/${episodeId}/${formId}/status`, body);
    }

    static async updateEpisodeForm(episodeId, formId, body) {
        return await AppDataService.patch(`forms/updatePacketForm/${episodeId}/${formId}`, body);
    }

    static async updateScheduleById(taskId, body, token) {
        return await AppDataService.patch(`schedules/${taskId}`, body, customHeaders(token));
    }

    static async getMedicationDetailsById(agencyId, medicationId, token) {
        return await AppDataService.get(`medications/${agencyId}/${medicationId}`, customHeaders(token));
    }

    static async updateMedicationDetails(agencyId, medicationId, body, token) {
        return await AppDataService.patch(`medications/${agencyId}/${medicationId}`, body, customHeaders(token));
    }
}