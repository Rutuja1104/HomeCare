import General from '../libs/utility/General';
import AppDataService from './AppDataService';
import { customHeaders } from './utils/constants';

const COMMON_BASE = 'physician';
const token = General.getLocalStorageData("token")
export default class PhysicianManagementService {
    // https://api.dev.allinoneemr.com/api/physician
    static async getAllPhysicians({ agencyId, limit, pageNumber, status, search }) {
        // return await AppDataService.get(`${COMMON_BASE}/${agencyId}/search?limit=${limit}&pageNumber=${pageNumber}&searchKey=${search}`)
        let url = `${COMMON_BASE}/${agencyId}/search?limit=${limit}&pageNumber=${pageNumber}`;

        if (search) {
            url += `&searchKey=${search}`;
        }
        return await AppDataService.get(url, customHeaders(token));
    }
    static async getPhysicianById({ agencyId, physicianId, }) {
        return await AppDataService.get(`${COMMON_BASE}/${agencyId}/${physicianId}`, customHeaders(token));
    }
    static async getPhysicianByNameOrNumber(parmas) {
        return await AppDataService.get(`physician/details`, parmas);
    }
    static async postPhysician(id, body, token) {
        return await AppDataService.post(`${COMMON_BASE}/${id}/register`, body, customHeaders(token));
    }

    static async deletePhysicianById(agencyId, physicianId, token) {
        return await AppDataService.delete(`${COMMON_BASE}/${agencyId}/${physicianId}`, customHeaders(token));
    }
   
    static async patchUpadatePhysicianById(agencyId, physicianId, body,token) {
        return await AppDataService.patch(`admin/${agencyId}/${COMMON_BASE}/${physicianId}`, body, customHeaders(token));
    }
}
