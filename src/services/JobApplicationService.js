import AppDataService from './AppDataService'
import { customHeaders } from './utils/constants'

const COMMON_BASE = 'job-applications'

export default class JobApplicationService {

    static async getAllJobApplications({agencyId, token,limit,pageNumber, receivedDate, status, name}) {
        return await AppDataService.get(`${COMMON_BASE}/${agencyId}?limit=${limit}&page=${pageNumber}&receivedDate=${receivedDate || ""}&status=${status || ""}&name=${name || ""}`, customHeaders(token))
    }
}