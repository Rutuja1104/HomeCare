import AppDataService from './AppDataService'
import { customHeaders } from './utils/constants'

const COMMON_BASE = 'schedules'

export default class AdminScheduleDataService {
    static async getAdminSchedules(agencyId, token, filterType, selectedBranchOption, selectedStatusOption, selectedTypeOption, selectedFilterOption, limit, pageNumber) {
        return await AppDataService.get(`${COMMON_BASE}?agencyId=${agencyId}${filterType != null ? `&filterType=${filterType}` : ''}&status=${selectedStatusOption}${!selectedTypeOption ? '' : `&type=${selectedTypeOption}`}&limit=${limit}&pageNumber=${pageNumber}`, customHeaders(token))
    }
    static async getClientSchedules(agencyId, token, id, filterType, limit, pageNumber) {

        return await AppDataService.get(`${COMMON_BASE}?agencyId=${agencyId}&id=${id}&filterType=${filterType}&limit=${limit}&pageNumber=${pageNumber}`, customHeaders(token))
    }
}