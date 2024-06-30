import store from '../../../store/store'
import { all, put, takeLatest } from 'redux-saga/effects'
import { PAGE_STATE } from '../../../libs/constant'
import { componentKey, setActiveJobApplicationStep, setAssessmentResult, setBackgroundCheckDetails, setEligibilityFormVerificationFormData, setEligibilityWithHoldingFormData, setJobApplicationCompleteDetails, setJobApplicationDetails, setJobApplicationDocumentsList, setLoadingState, setNavigateToNewPage, setNurseSignatureOnChecklist, setReadOnlyAssessmentResult, setReadOnlyCompetencyChecklist, setShowScheduleInterviewModel, setShowUpdateInterviewStatusModel, setUserStatus, setInterviewScheduledDetails, setClearScheduleUserInterview, setApproversSign, setSubmittedChecklist } from './JobApplicationDetailsSlice'
import AdminDataService from '../../../services/AdminDataService'
import { BACKGROUND_CHECK_MAPPING_KEYS, CERTIFICATIONS_INFO_MAPPING_KEYS, EDUCATIONAL_INFO_MAPPING_KEYS, ELIGIBILITY_VERIFICATION_INFO_MAPPING_KEYS, ELIGIBILITY_VERIFICATION_PERSONAL_INFO, NURSE_MANAGEMENT_KEY_MAPPING, PERSONAL_ADDRESS_KEY_MAPPING, PREVIOUS_EMPLOYMENT_ADDRESS_KEY_MAPPING, PREVIOUS_EMPLOYMENT_INFO_MAPPING_KEYS, REFERENCES_INFO_MAPPING_KEYS, TAX_INFORMATION_MAPPING_KEYS } from './constants'
import General from '../../../libs/utility/General'
import { toast } from 'react-toastify'
import FormDataService from '../../../services/FormDataService'
import DocumentUploadService from '../../../services/DocumentUploadService'
import { setShowApplicationDetailsModal } from '../../JobPostings/JobPostingSlice'
import { getAllNurseList } from '../../StaffManagement/NurseManagement/NurseListing/NurseListingSaga'

export const { getUserDetailsByIdForAgencyAdmin, putValidateUserByAgencyAdmin, postScheduleUserInterview, getUserAssessmentDetails, getDocumentFromS3Bucket, getUserStatusByUserId, getUserStatusForAdmin, getDeclarationFormDetails, getDeclarationFormDetails2, getSubmittedChecklist, getInterviewScheduledDetails, postApproverSign } = {
    getUserDetailsByIdForAgencyAdmin: (payload) => {
        return {
            type: 'NURSE_MANAGEMENT/GET_APPLICATION_DETAILS_OF_USER',
            payload
        }
    },
    putValidateUserByAgencyAdmin: (payload) => {
        return {
            type: 'NURSE_MANAGEMENT/VALIDATE_USER_APPLICATION',
            payload
        }
    },
    postScheduleUserInterview: (payload) => {
        return {
            type: 'NURSE_MANAGEMENT/SCHEDULE_USER_INTERVIEW',
            payload
        }
    },
    getUserAssessmentDetails: (payload) => {
        return {
            type: 'NURSE_MANAGEMENT/GET_USER_ASSESSMENT_DETAILS',
            payload
        }
    },
    getDocumentFromS3Bucket: (payload) => {
        return {
            type: 'NURSE_MANAGEMENT/GET_DOCUMENT_FROM_S3_BUCKET',
            payload
        }
    },
    getUserStatusByUserId: (payload) => {
        return {
            type: 'NURSE_MANAGEMENT/GET_USER_STATUS_BY_ID',
            payload
        }
    },
    getUserStatusForAdmin: (payload) => {
        return {
            type: 'NURSE_MANAGEMENT/GET_USER_STATUS_BY_ID',
            payload
        }
    },
    getDeclarationFormDetails: (payload) => {
        return {
            type: "NURSE_MANAGEMENT/EMPLOYEE_ELIGIBILITY_FORM_DETAILS",
            payload
        };
    },
    getDeclarationFormDetails2: (payload) => {
        return {
            type: "NURSE_MANAGEMENT/EMPLOYEE_ELIGIBILITY_FORM_DETAILS2",
            payload
        };
    },
    getSubmittedChecklist: (payload) => {
        return {
            type: "NURSE_MANAGEMENT/GET_SUBMITTED_CHECK_LISt",
            payload
        };
    },
    getInterviewScheduledDetails: (payload) => {
        return {
            type: "NURSE_MANAGEMENT/GET_SCHEDULE_INTERVIEW_DETAILS",
            payload
        };
    },
    postApproverSign: (payload) => {
        return {
            type: "NURSE_MANAGEMENT/APPROVER_SIGN",
            payload
        };
    }
}

function* getUserDetailsByIdForAgencyAdminAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }))
        const response = yield AdminDataService.getUserDetailsByIdForAgencyAdmin(action.payload)


        if (response.status == 200) {
            let applicationData = General.generateDataArray(NURSE_MANAGEMENT_KEY_MAPPING, response.data)
            let educationalInfo = General.generateDataFromArrayOfObject(EDUCATIONAL_INFO_MAPPING_KEYS, response.data.educations)
            let certificationsInfo = General.generateDataFromArrayOfObject(CERTIFICATIONS_INFO_MAPPING_KEYS, response.data.certifications)
            let contactsInfo = General.generateDataFromArrayOfObject(REFERENCES_INFO_MAPPING_KEYS, response.data.contacts)
            let employmentsInfo = General.generateDataFromArrayOfObjectArray(PREVIOUS_EMPLOYMENT_INFO_MAPPING_KEYS, response.data.employments, { address: PREVIOUS_EMPLOYMENT_ADDRESS_KEY_MAPPING })
            let personalAddress = General.generateDataFromArrayOfObject(PERSONAL_ADDRESS_KEY_MAPPING, response.data.addresses)

            //all application data details
            let applicationDataArray = applicationData[0];
            let personalAddressArray = personalAddress[0];
            let allApplicationDetails = [
                ...applicationDataArray,
                ...personalAddressArray
            ];
            let allApplicationDetailsArray = [allApplicationDetails];

            let finalApplicationData = [...allApplicationDetailsArray, ...educationalInfo, ...employmentsInfo, ...certificationsInfo, ...contactsInfo,]
            yield put(setJobApplicationDetails(finalApplicationData))
            yield put(setBackgroundCheckDetails(General.generateDataArray(BACKGROUND_CHECK_MAPPING_KEYS, response.data)))
            yield put(setJobApplicationCompleteDetails(response.data))
            yield put(setJobApplicationDocumentsList(response.data.documents))
        }

    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* putValidateUserByAgencyAdminAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }))
        const { nurseId, data, activeIndex, token, agencyId } = action.payload
        const response = yield AdminDataService.putValidateUserApplication(nurseId, data)

        if (response.status == 200) {
            if (data.onboardingStatus == "Active" || data.onboardingStatus == "Fail") {
                toast.success(`${data.onboardingStatus == "Active" ? "Candidate onboarding completed successfully!" : "Candidate mark as failed!"}`)
            } else {
                if (data.onboardingStatus == "Discarded") {
                    toast.success("User discarded !")
                } else {
                    toast.success("User details approved successfully!")
                }
            }

            if (data.onboardingStatus == "Discarded") {
                yield put(getAllNurseList({ token, agencyId }))
            }
            yield put(setActiveJobApplicationStep(activeIndex))

            if (data.onboardingStatus == "Active" || data.onboardingStatus == "Fail") {
                yield put(setNavigateToNewPage(true))
            }
        }
    } catch (error) {
        toast.error("Failed to approve user details!")
    } finally {
        yield put(setShowUpdateInterviewStatusModel(false))
        yield put(setShowApplicationDetailsModal(false))
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* postScheduleUserInterviewAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }))
        const response = yield AdminDataService.postScheduleUserInterview(action.payload.data)

        if (response.status == 201) {
            toast.success("Interview scheduled successfully!")
            //--
            let agencyId = action.payload.agencyId;
            let nurseId = action.payload.nurseId;
            yield put(getInterviewScheduledDetails({ agencyId, nurseId }))
            yield put(setClearScheduleUserInterview())
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
        yield put(setShowScheduleInterviewModel(false))
    }
}

function* getUserAssessmentDetailsAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }))
        const response = yield AdminDataService.getUserAssessmentDetails(action.payload)

        if (response.status == 200) {
            if (response?.data.length !== 0 && response?.data[0]?.questionResults.length !== 0) {
                const filteredArray = General.readOnlyAssessment(response.data[0].questionResults)
                yield put(setReadOnlyAssessmentResult(filteredArray))
                yield put(setAssessmentResult(response?.data[0]?.totalScore))
            }
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
        yield put(setShowScheduleInterviewModel(false))
    }
}

function* getDocumentFromS3BucketAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }))
        const response = yield DocumentUploadService.getDocumentFromS3Bucket(action.payload)

        if (response.status == 200) {
            window.open(response.data, '_blank');
        }
    } catch (error) {
        toast.error("Failed to download document")
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* getUserStatusByUserIdAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }))
        const response = yield AdminDataService.getUserStatusByUserId(action.payload)

        if (response.status == 200) {
            yield put(setUserStatus(response.data.onboardingStatus))
        }
    } catch (error) {
        toast.error("Failed to load user status")
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* getDeclarationFormDetailsAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: "Loading..." }));
        const { agencyId, nurseId, formType } = action.payload
        const response = yield FormDataService.getDeclarationFormDetails(agencyId, nurseId, formType);
        if (response.status === 200) {
            let EligibilityVerificationData1 = General.generateDataArray(ELIGIBILITY_VERIFICATION_PERSONAL_INFO, response.data.data)
            let EligibilityVerificationData2 = General.generateDataArray(ELIGIBILITY_VERIFICATION_INFO_MAPPING_KEYS, response.data.data)
            let FinalArray = [...EligibilityVerificationData1, ...EligibilityVerificationData2]
            yield put(setEligibilityFormVerificationFormData(FinalArray))
        }
    } catch (error) {
        toast.error("Failed to load Form details");
        console.log("err: ", error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* getDeclarationFormDetails2Async(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: "Loading..." }));
        const { agencyId, nurseId, formType } = action.payload
        const response = yield FormDataService.getDeclarationFormDetails(agencyId, nurseId, formType);

        if (response.status === 200) {
            let Data = General.generateDataArray(TAX_INFORMATION_MAPPING_KEYS, response.data.data)
            yield put(setEligibilityWithHoldingFormData(Data))
        }
    } catch (error) {
        toast.error("Failed to load Form details");
        console.log("err: ", error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}


function* getSubmittedChecklistAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }))
        const { agencyId, role, nurseId, token } = action.payload
        const response = yield AdminDataService.getSubmittedChecklist(agencyId, role, nurseId, token)

        const parsedData = JSON.parse(response?.data?.data);

        if (response.status == 200) {
            yield put(setSubmittedChecklist(response?.data));

            if (parsedData.categories.length !== 0) {

                const filteredArray = General.convertCheckListData(parsedData.categories)
                yield put(setReadOnlyCompetencyChecklist(filteredArray))
                yield put(setNurseSignatureOnChecklist(parsedData.nurseSignBase64))
            }
        }
    } catch (error) {
        console.log('err:', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
        yield put(setShowScheduleInterviewModel(false))

    }
}

function* getInterviewScheduledDetailsAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }))
        const { agencyId, nurseId, token } = action.payload
        const response = yield AdminDataService.getInterviewScheduledDetails(agencyId, nurseId, token)

        if (response.status == 200) {
            yield put(setInterviewScheduledDetails(response.data))
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* postApproverSignAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }))

        const { id, AdminSignBase64, agencyId, nurseId, formType, ...getSubmittedChecklist } = action.payload
        const data = {
            id: id,
            AdminSignBase64: General.removeDataPrefix(AdminSignBase64),
            agencyId: agencyId,
            nurseId: nurseId,
            formType: formType,
            ...getSubmittedChecklist?.data ? JSON.parse(getSubmittedChecklist?.data) : {},
        }
        const response = yield FormDataService.postApproverSign(data)

        if (response.status == 201) {
            //
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* rootSaga() {
    yield all([
        takeLatest(getUserDetailsByIdForAgencyAdmin().type, getUserDetailsByIdForAgencyAdminAsync),
        takeLatest(putValidateUserByAgencyAdmin().type, putValidateUserByAgencyAdminAsync),
        takeLatest(postScheduleUserInterview().type, postScheduleUserInterviewAsync),
        takeLatest(getUserAssessmentDetails().type, getUserAssessmentDetailsAsync),
        takeLatest(getDocumentFromS3Bucket().type, getDocumentFromS3BucketAsync),
        takeLatest(getUserStatusByUserId().type, getUserStatusByUserIdAsync),
        takeLatest(getDeclarationFormDetails().type, getDeclarationFormDetailsAsync),
        takeLatest(getDeclarationFormDetails2().type, getDeclarationFormDetails2Async),
        takeLatest(getSubmittedChecklist().type, getSubmittedChecklistAsync),
        takeLatest(getInterviewScheduledDetails().type, getInterviewScheduledDetailsAsync),
        takeLatest(postApproverSign().type, postApproverSignAsync),
    ])
}

store.sagaManager.addSaga(componentKey, rootSaga)