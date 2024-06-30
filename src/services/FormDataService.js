import General from '../libs/utility/General'
import AppDataService from './AppDataService'
import { customHeaders } from './utils/constants'

const COMMON_BASE = 'forms'
const token = General.getLocalStorageData("token")

export default class FormDataService {

    static async postCreateDynamicForm(data) {
        return await AppDataService.post(`${COMMON_BASE}`, data, customHeaders(token))
    }

    static async getDeclarationFormDetails(agencyId, nurseId, formType) {
        return await AppDataService.get(`${COMMON_BASE}/${agencyId}/${nurseId}/${formType}`, customHeaders(token))
    }

    static async postApproverSign(data) {
        return await AppDataService.post(`checklist/store-response`, data, customHeaders(token))
    }

}