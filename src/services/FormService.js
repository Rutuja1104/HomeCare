import General from "../libs/utility/General";
import AppDataService from "./AppDataService";

const token = General.getLocalStorageData("token");
const COMMON_BASE = "forms";

export default class FormService {
    static async createForm( data, episodeId) {
        return await AppDataService.post(`${COMMON_BASE}/packetForm`, {
            data: data,
            episodeId: episodeId,
        });
    }

    static async getFormById(episodeId) {
        return await AppDataService.get(`${COMMON_BASE}/${episodeId}`);
    }

    static async getFormComponentById(formId) {
        const response =  await fetch("https://forms.dev.allinoneemr.com/api/get", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: formId }),
        });
        return await response.json()
    }
}
