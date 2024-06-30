import AppDataService from './AppDataService'
import { customHeaders } from './utils/constants'

const COMMON_BASE = 'schedules'

export default class ScheduleDataService {

    static async getScheduleList(userId, token) {
        return await AppDataService.get(`${COMMON_BASE}?userId=${userId}`, customHeaders(token))
    }
}