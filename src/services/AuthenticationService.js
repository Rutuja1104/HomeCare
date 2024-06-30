import AppDataService from './AppDataService'
import { headerContentWithOutAuthorization } from './utils/constants'

const COMMON_BASE = 'auth-module'

export default class AuthenticationService {

    static async postLoginUserWithCredentials(body) {
        return await AppDataService.post(`${COMMON_BASE}/login`, body, headerContentWithOutAuthorization)
    }

    static async postSetNewPassword(userId, body) {
        return await AppDataService.post(`${COMMON_BASE}/set-password?userId=${userId}`, body, headerContentWithOutAuthorization)
    }

    static async postForgotPassword(body) {
        return await AppDataService.post(`${COMMON_BASE}/forgot-password`, body, headerContentWithOutAuthorization)
    }

    static async postResetPassword(userId, body) {
        return await AppDataService.post(`${COMMON_BASE}/reset-password/${userId}`, body, headerContentWithOutAuthorization)
    }

}