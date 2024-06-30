import General from '../libs/utility/General'
import AppDataService from './AppDataService'
import { customHeaders } from './utils/constants'

const COMMON_BASE = 'home'
const token = General.getLocalStorageData("token")

export default class HomeDataService {

    // static async getApiDetails(token) {
    //     return await AppDataService.get(`${COMMON_BASE}/GetApiDetails`, { params: { sdfsdfsd: '654654', asdfasdf: '454' }, ...customHeaders(token) })
    // }
    static async getEpisodeByStatus(agencyId, token){
        return await AppDataService.get(`episode/${agencyId}/status`, customHeaders(token))
    }
    static async getPatientsBirthdayList(agencyId){
        return await AppDataService.get(`patients/birthdays/${agencyId}`)
    }
   
    static async getJobApplicationCount(){
        return await AppDataService.get(`admin/job-application/count`,customHeaders(token))
    }
    static async getPatientOnBoardingCount(){
        return await AppDataService.get(`admin/patients/count`,customHeaders(token))
    }

    static async getPendingClaimsCount(agencyId){
        return await AppDataService.get(`claims/${agencyId}/PENDING`)
    }
    static async getAgencyDetails(agencyId){
        return await AppDataService.get(`agencies/${agencyId}`)
    }
    static async getScheduledTasksList(agencyId){
        return await AppDataService.get(`task/${agencyId}/status/Open`,customHeaders(token))
    }
    static async getLoggedInUserDetails(agencyId,userId){
        return await AppDataService.get(`user/${agencyId}/profile/${userId}`)
    }
    static async postProfileImg(profilePhoto,userId){
        return await AppDataService.post(`nurse/profile/image/${userId}`, {profilePhoto})
    }
}