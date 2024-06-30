import store from "../../store/store";
import { all, put, takeLatest } from "redux-saga/effects";
import { PAGE_STATE } from "../../libs/constant";
import { componentKey, setActiveTabIndex, setIsOnboardingUrlValid, setLoadingState, setNurseOnboardingFormDetails } from "./NurseOnboardingSlice";
import DocumentUploadService from "../../services/DocumentUploadService";
import { toast } from "react-toastify";
import General from "../../libs/utility/General";
import NurseOnboardingService from "../../services/NurseOnboardingService";

export const {
    postAppendDocument,
    postCheckOnboardingExpiration,
    postAbuserRegistryAnnualNotice,
    getNurseOnboardingFormDetails,
} = {
    postAppendDocument: (payload) => {
        return {
            type: "POST_APPEND_DOCUMENT_HH",
            payload,
        };
    },
    postCheckOnboardingExpiration: (payload) => {
        return {
            type: "POST_CHECK_ONBOARDING_EXPIRY",
            payload,
        };
    },
    postAbuserRegistryAnnualNotice: (payload) => {
        return {
            type: "POST_ABUSER_REGISTRY_ANNUAL_NOTICE",
            payload,
        };
    },
    getNurseOnboardingFormDetails: (payload) => {
        return {
            type: "GET_NURSE_ONBOARDING_FORM_DETAILS",
            payload,
        };
    },
};

function* postAppendDocumentAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: "Loading..." }));

        const { applicationId, imageBase64, agencyId, fileName, fileType, activeTabIndex } = action.payload;

        const data = {
            applicationId: applicationId || "",
            imageBase64: General.removeDataPrefix(imageBase64),
            agencyId: agencyId || "",
            fileName: fileName || "",
            fileType: fileType || "consentForm",
        };

        const response = yield DocumentUploadService.appendDocument(data);

        if (response.status == 201) {
            yield put(setActiveTabIndex(activeTabIndex));
        }
    } catch (error) {
        console.log("err: ", error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* postCheckOnboardingExpirationAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: "Please wait..." }));

        const response = yield NurseOnboardingService.postCheckOnboardingExpiration(action.payload);
        yield put(setIsOnboardingUrlValid(response.data.status));
    } catch (error) {
        console.log("err: ", error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* postAbuserRegistryAnnualNoticeAsync() {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: "Please wait..." }));

        // const response = yield NurseOnboardingService.postCheckOnboardingExpiration(action.payload)
        // yield put(setIsOnboardingUrlValid(response.data.status))
    } catch (error) {
        console.log("err: ", error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* getNurseOnboardingFormDetailsAsync(action) {
    const { agencyId, applicationId, formType } = action.payload;
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: "Please wait..." }));
        const response = yield NurseOnboardingService.getNurseOnboardingFormDetails(agencyId, applicationId, formType);
        yield put(setNurseOnboardingFormDetails(response.data))
    } catch (error) {
        console.log("err: ", error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* rootSaga() {
    yield all([
        takeLatest(postAppendDocument().type, postAppendDocumentAsync),
        takeLatest(postCheckOnboardingExpiration().type, postCheckOnboardingExpirationAsync),
        takeLatest(postAbuserRegistryAnnualNotice().type, postAbuserRegistryAnnualNoticeAsync),
        takeLatest(getNurseOnboardingFormDetails().type, getNurseOnboardingFormDetailsAsync),
    ]);
}

store.sagaManager.addSaga(componentKey, rootSaga);
