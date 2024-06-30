import General from '../libs/utility/General';
import AppDataService from './AppDataService';
import { customHeaders } from './utils/constants';

const COMMON_BASE = 'admin';
const token = General.getLocalStorageData('token');
const agencyId = General.getLocalStorageData('agencyId');
export default class PatientManagementService {
    static async postPersonalDetails(body, token) {
        return await AppDataService.post(
            `${COMMON_BASE}/patient/personal/details`,
            body,
            customHeaders(token)
        );
    }
    static async postServiceDetails(patientId, body, token) {
        return await AppDataService.post(
            `${COMMON_BASE}/patient/service/details/${patientId}`,
            body,
            customHeaders(token)
        );
    }
    static async postInsuranceDetails(id, body, token) {
        return await AppDataService.post(
            `${COMMON_BASE}/insurance/details/${id}`,
            body,
            customHeaders(token)
        );
    }
    static async postCardDetails(id, body, token) {
        return await AppDataService.post(`${COMMON_BASE}/card/details/${id}`, body, customHeaders(token));
    }
    static async getAllPatients({pageNumber, limit, status, search, token }) {
        return await AppDataService.get(
            `${COMMON_BASE}/patients?limit=${limit}&pageNumber=${pageNumber}&patientServiceStatus=${status || ''
            }&searchKey=${search || ''}`,
            customHeaders(token)

        );
    }
   
    static async getPhysicians(agencyId, name, token) {
        return await AppDataService.get(
            `physician/${agencyId}/search?searchKey=${name || undefined}`,
            customHeaders(token)
        );
    }
    static async getPhysicianById(body, token) {
        return await AppDataService.post(`physician/register`, body, customHeaders(token));
    }

    static async postPhysicianDetails(id, body, token) {
        return await AppDataService.post(`${COMMON_BASE}/add/card/details/${id}`, body, customHeaders(token));
    }
    static async postSendEmail(body) {
        return await AppDataService.post(`${COMMON_BASE}/send-email`, body, customHeaders(token));
    }
    static async getPatientById(id) {
        // return await AppDataService.post(`sendemail`, body);
        return await AppDataService.get(`${COMMON_BASE}/patient/${id}`, customHeaders(token));
    }
    static async postCreateMedicalOrder(id, body) {
        return await AppDataService.post(`${COMMON_BASE}/medical/order/${id}`, body, customHeaders(token));
    }
    static async postSendEmailToPhysicianAndAgency(body) {
        return await AppDataService.post(`${COMMON_BASE}/send-email`, body, customHeaders(token));
    }
    static async postPhysician(id, body, token) {
        return await AppDataService.post(`physician/${id}/register`, body, customHeaders(token));
    }
    static async getAllPayers(body, token) {
        return await AppDataService.get(`${COMMON_BASE}/payers`, customHeaders(token));
    }
    static async postFaceToFace(agencyId, physicianId, patientId, body, token) {
        return await AppDataService.post(
            `face-to-face/${agencyId}/${physicianId}/${patientId}`,
            body,
            customHeaders(token)
        );
    }
    static async postSendDocumentToBE(body, token) {
        return await AppDataService.post(`document-manager/document`, body, customHeaders(token));
    }
    static async deletePatientById(patientId) {
        return await AppDataService.delete(`${COMMON_BASE}/patient/${patientId}`,"", customHeaders(token));
    }
    static async medicalDetails(patientId, body, token) {
        return await AppDataService.post(`${COMMON_BASE}/${patientId}/medical-details`, body,customHeaders(token));
    }
    static async emergencyContact(patientId, body, token) {
        return await AppDataService.post(`${COMMON_BASE}/${patientId}/emergency-contact`, body,customHeaders(token));
    }
    static async referralInformation(patientId, body, token) {
        return await AppDataService.post(`${COMMON_BASE}/${patientId}/referral-details`, body,customHeaders(token));
    }
    static async getPhysicianByNameOrNumber(parmas) {
        return await AppDataService.get(`physician/details`, parmas, customHeaders(token));
    }
    static async patchUpadatePatientById(patientId, body) {
        return await AppDataService.patch(`${COMMON_BASE}/update/patient/${patientId}`, body, customHeaders(token));
    }
    static async getPatientEpisodeList(agencyId, patientId) {
        return await AppDataService.get(`episode/${agencyId}/patient/${patientId}`, customHeaders(token));
    }
}
