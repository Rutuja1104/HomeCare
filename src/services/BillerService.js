import AppDataService from "./AppDataService";
import { customHeaders } from "./utils/constants";

const COMMON_BASE = "";

export default class BillerService {
    static async getBillerRecentPatientList(agencyId, pageNumber, limit, status, searchKey, token) {
        return await AppDataService.get(
            `${COMMON_BASE}/${agencyId}?pageNumber=${pageNumber}&limit=${limit}&patientServiceStatus=${status}&searchKey=${searchKey}`,
            customHeaders(token)
        );
    }
    static async getBillerDenialPatientList(agencyId, pageNumber, limit, status, searchKey, token) {
        return await AppDataService.get(
            `${COMMON_BASE}/${agencyId}?pageNumber=${pageNumber}&limit=${limit}&patientServiceStatus=${status}&searchKey=${searchKey}`,
            customHeaders(token)
        );
    }
    static async postNewClaimsData(agencyId, pageNumber, limit, status, searchKey, token) {
        return await AppDataService.post(
            `${COMMON_BASE}/${agencyId}?pageNumber=${pageNumber}&limit=${limit}&patientServiceStatus=${status}&searchKey=${searchKey}`,
            customHeaders(token)
        );
    }
}