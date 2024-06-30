import axios from 'axios'
import AppDataService from './AppDataService'
import General from '../libs/utility/General';
import { headerContentWithOutAuthorization } from './utils/constants';

const COMMON_BASE = 'document-manager'

export default class DocumentUploadService {

    static async getPreSignedUrl(data) {
        return await AppDataService.post(`${COMMON_BASE}/presigned-url`, data, headerContentWithOutAuthorization)
    }

    static async storeDocumentToS3(url, data) {
        return await axios.put(url, data, {
            headers: {
                credentials: 'include',
                "Access-Control-Allow-Credentials": "true",
                'Content-Type': data.type,
            }
        })
    }

    static async appendDocument(data) {
        return await AppDataService.post(`${COMMON_BASE}/append-document`, data, headerContentWithOutAuthorization)
    }

    static async postStoreDocumentsToDatabase(data) {
        return await AppDataService.post(`${COMMON_BASE}/document`, data, headerContentWithOutAuthorization)
    }

    static async getDocumentFromS3Bucket(data) {
        return await AppDataService.get(`${COMMON_BASE}/s3Url?s3Url=${data}`, headerContentWithOutAuthorization)
    }

    static async postResumeForJobApplication(agencyId, applicationId, fileName, fileType, body) {
        return await AppDataService.post(`${COMMON_BASE}/upload?agencyId=${agencyId}&applicationId=${applicationId}&fileName=${fileName}&fileType=${fileType}`, body)
    }

    static async deleteDocumentFromS3AndDatabase(s3Url, documentType) {
        return await AppDataService.delete(`${COMMON_BASE}/document?s3Url=${s3Url}&documentType=${documentType}`)
    }
}