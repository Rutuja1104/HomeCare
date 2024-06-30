import AppDataService from './AppDataService'
import { customHeaders, headerContentWithOutAuthorization } from './utils/constants'

const COMMON_BASE = 'jobs'

export default class JobPostingService {

    static async getAllJobPostingByAgencyId({agencyId,pageNumber,limit}) {
        return await AppDataService.get(`${COMMON_BASE}/${agencyId}?page=${pageNumber}&limit=${limit}`, headerContentWithOutAuthorization)
    }

    static async postApplyForJobApplication(body) {
        return await AppDataService.post(`job-applications`, body, headerContentWithOutAuthorization)
    }

    static async postCreateJobPost(agencyId, body, token) {
        return await AppDataService.post(`${COMMON_BASE}/${agencyId}`, body, customHeaders(token))
    }

    static async deleteJobPost(agencyId, jobId, token) {
        return await AppDataService.delete(`${COMMON_BASE}/${agencyId}/${jobId}`, customHeaders(token))
    }
    static async putJobPost(agencyId, jobId, body, token){
        return await AppDataService.put(`${COMMON_BASE}/${agencyId}/${jobId}`, body, customHeaders(token))
    }
    static async getSelectedJobPost({agencyId,postId}) {
        return await AppDataService.get(`${COMMON_BASE}/${agencyId}/${postId}`, headerContentWithOutAuthorization)
    }
}