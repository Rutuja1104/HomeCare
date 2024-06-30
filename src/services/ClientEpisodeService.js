import General from '../libs/utility/General'
import AppDataService from './AppDataService'
import { customHeaders } from './utils/constants'

const COMMON_BASE = 'episode'

const token = General.getLocalStorageData("token")

export default class ClientEpisodeService {

    static async getClientEpisodeList(agencyId, userId, type, status, searchKey, pageNumber, limit, token) {
        return await AppDataService.get(`${COMMON_BASE}/${agencyId}/role?limit=${limit}&pageNumber=${pageNumber}&status=${status}&type=${type}&id=${userId}${searchKey.length !== 0 ? `&searchKey=${searchKey}` : ""}`, customHeaders(token))
    }

}