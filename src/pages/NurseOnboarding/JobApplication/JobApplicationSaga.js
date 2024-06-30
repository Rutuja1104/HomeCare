import store from '../../../store/store';
import { all, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { setLoadingState } from '../NurseOnboardingSlice';
import { PAGE_STATE } from '../../../libs/constant';
import { JOB_APPLICATION_TYPE } from '../constants';
import {
    componentKey,
    setActiveDeclarationTab,
    setBackgroundCheckDocumentList,
    setJobApplicationActiveStep,
    setJobApplicationFormType,
    setJobApplicationStatus,
    setSkillCheckListData,
    setSkillTestQuestions,
    setUploadedDocumentsList,
    setInterviewScheduledDetailsNurseOnboarding,
    setUploadedDocumentsWithPreSignedUrl,
    setEligibilityVerificationFormDetails
} from './JobApplicationSlice';
import { setUserDetailsById } from './ProfessionalInformation/ProfessionalInformationSlice';

import General from '../../../libs/utility/General';
import NurseOnboardingService from '../../../services/NurseOnboardingService';
import DocumentUploadService from '../../../services/DocumentUploadService';
import FormDataService from '../../../services/FormDataService';

export const {
    postNurseOnboardingApplication,
    putNurseStateResiding,
    getAssessmentsByRole,
    postSubmitAssessmentsByRole,
    getPreSignedUrl,
    getJobApplicationStatus,
    getUserDetailsById,
    postCreateDynamicForm,
    postStoreDocumentsToDatabase,
    getCompetencyChecklist,
    postStoreCompetencyChecklist,
    postUpdateNurseOnboardingStatus,
    getInterviewScheduledDetailsNurseOnboarding,
    deleteDocumentFromS3AndDatabase,
    getUploadedChecklistForNurse,
    getUploadedAssessmentForNurse,
    getEmploymentEligibilityVerificationByForm
} = {
    postNurseOnboardingApplication: (payload) => {
        return {
            type: 'NURSE_ONBOARDING/POST_JOB_APPLICATION',
            payload
        };
    },
    putNurseStateResiding: (payload) => {
        return {
            type: 'NURSE_ONBOARDING/NURSE_STATE_RESIDING',
            payload
        };
    },
    getAssessmentsByRole: (payload) => {
        return {
            type: 'NURSE_ONBOARDING/ASSESSMENT_BY_ROLE',
            payload
        };
    },
    postSubmitAssessmentsByRole: (payload) => {
        return {
            type: 'NURSE_ONBOARDING/SUBMIT_ASSESSMENT_BY_ROLE',
            payload
        };
    },
    getPreSignedUrl: (payload) => {
        return {
            type: 'NURSE_ONBOARDING/GET_PRE_SIGNED_URL',
            payload
        };
    },
    getJobApplicationStatus: (payload) => {
        return {
            type: 'NURSE_ONBOARDING/GET_JOB_APPLICATION_STATUS',
            payload
        };
    },
    getUserDetailsById: (payload) => {
        return {
            type: 'NURSE_ONBOARDING/GET_USER_DETAILS_BY_ID',
            payload
        };
    },
    postCreateDynamicForm: (payload) => {
        return {
            type: 'NURSE_ONBOARDING/Employment_Eligibility_Verification',
            payload
        };
    },
    postStoreDocumentsToDatabase: (payload) => {
        return {
            type: 'NURSE_ONBOARDING/STORE_DOCUMENTS_TO_BD',
            payload
        };
    },
    getCompetencyChecklist: (payload) => {
        return {
            type: 'NURSE_ONBOARDING/GET_COMPETENCY_CHECKLIST',
            payload
        };
    },
    postStoreCompetencyChecklist: (payload) => {
        return {
            type: 'NURSE_ONBOARDING/POST_STORE_COMPETENCY_CHECKLIST',
            payload
        };
    },
    postUpdateNurseOnboardingStatus: (payload) => {
        return {
            type: 'NURSE_ONBOARDING/UPDATE_ONBOARDING_STATUS',
            payload
        };
    },
    getInterviewScheduledDetailsNurseOnboarding: (payload) => {
        return {
            type: 'NURSE_ONBOARDING/GET_SCHEDULE_INTERVIEW_DETAILS_NURSEONBOARDING',
            payload
        };
    },
    deleteDocumentFromS3AndDatabase: (payload) => {
        return {
            type: 'NURSE_ONBOARDING/DELETE_DOCUMENT_FROM_S3',
            payload
        };
    },
    getUploadedChecklistForNurse: (payload) => {
        return {
            type: 'NURSE_ONBOARDING/GET_UPLOADED_CHECKLIST_FOR_NURSE',
            payload
        };
    },
    getUploadedAssessmentForNurse: (payload) => {
        return {
            type: 'NURSE_ONBOARDING/GET_UPLOADED_ASSESSMENT_FOR_NURSE',
            payload
        };
    },
    getEmploymentEligibilityVerificationByForm: (payload) => {
        return {
            type: 'NURSE_ONBOARDING/GET_ELIGIBILITY_VERIFICATION_BY_FORM',
            payload
        }
    }
};

function* postNurseOnboardingApplicationAsync(action) {
    try {
        const {
            agencyId,
            applicationId,
            professionalInformation,
            questionnaires,
            healthInfoQuestions,
            healthInformationSignature,
            signatureInBase64,
            step,
            uploadedDocumentsList,
            activeIndex,
            applicationSteps
        } = action.payload;
        console.log('postNurseOnboardingApplication-=--==-==-=-=-=-=-=-=-=-',action);

        const data = {
            //Personal Information
            firstName: professionalInformation.personalInfo.FirstName.value,
            middleName: professionalInformation.personalInfo.MiddleName.value || undefined,
            lastName: professionalInformation.personalInfo.LastName.value,
            username: `${professionalInformation.personalInfo.FirstName.value} ${professionalInformation.personalInfo.LastName.value}`,
            email: professionalInformation.personalInfo.EmailID.value,
            password: '',
            Telephone: professionalInformation.personalInfo.TelephoneNumber.value.replace(/[-()]/g, ''),
            ssn: professionalInformation.personalInfo.SSN.value,
            dob: professionalInformation.personalInfo.DateOfBirth.value,
            isLegalToWork: `${(questionnaires[0].choices.find((item) => item.checked)?.label || "") === "Yes"}`,
            usCitizen: `${(questionnaires[1].choices.find((item) => item.checked)?.label || "") === "Yes"}`,
            workType: questionnaires[2].choices.find((item) => item.checked)?.label || "" || "Full-time",
            convictedCrime: `${(questionnaires[3].choices.find((item) => item.checked)?.label || "") === "Yes"}`,
            addresses: [
                {
                    id: professionalInformation.personalInfo.AddressId.value,
                    addressLine1: professionalInformation.personalInfo.AddressLine1.value,
                    addressLine2: professionalInformation.personalInfo.AddressLine2.value,
                    landmark: professionalInformation.personalInfo.Landmark.value,
                    city: professionalInformation.personalInfo.City.value,
                    state: professionalInformation.personalInfo.State.value,
                    country: professionalInformation.personalInfo.Country.value,
                    pinCode: professionalInformation.personalInfo.ZipCode.value
                }
            ],

            //Educational Info
            educations: !General.hasEmptyValuesInArray(professionalInformation.EducationalInformation) ? professionalInformation.EducationalInformation.map((data) => ({
                id: data.id.value || '',
                instituteName: data.InstituteName.value || '',
                type: data.Degree.value || '',
                stream: data.Branch.value || '',
                city: data.EducationalCity.value || '',
                state: data.EducationalState.value || '',
                addressId: `${data.EducationalCity.value || ''}, ${data.EducationalState.value || ''}`,
                isCompleted: true,
                yearAttended: Number(data.EducationStartDate.value.split('/')[2]),
                yearofPassout: Number(data.EducationEndDate.value.split('/')[2]),
                // IsValidRONLicense: data.IsRONLicense.value.value === 'Yes' ? true : (data.IsRONLicense.value.value === 'No' ? false : null)
            })) : [],

            //Previous Employer Info
            employments: !General.hasEmptyValuesInArray(professionalInformation.PreviousEmployerInfo) ? professionalInformation.PreviousEmployerInfo.map((data) => ({
                id: data.id.value || '',
                Employername: data.CompanyName.value,
                startDate: data.PreviousEmployerStartDate.value,
                endDate: data.PreviousEmployerEndDate.value,
                jobTitle: data.JobTitle.value,
                phoneNumber: data.PreviousEmployerContactNumber.value,
                startingSalary: Number(data.PreviousEmployerStartingSalary.value),
                endingSalary: Number(data.PreviousEmployerEndingSalary.value),
                responsibilities: data.JobType.value,
                canContactEmployeer: false,
                referenceverifiedBy: '',
                reasonForLeavingCompany: data?.PreviousEmployerReasonForLeavingCompany?.value,
                companyContactNumber: data?.PreviousEmployerCompanyContactNumber?.value,
                contactPersonName: data?.PreviousEmployerContactPersonName?.value,
                address: {
                    addressLine1: data.PreviousEmployerAddressline1.value,
                    addressLine2: data.PreviousEmployerAddressline2.value,
                    city: data.PreviousEmployerAddresscity.value,
                    state: data.PreviousEmployerAddressstate.value,
                    country: data.PreviousEmployerAddresscountry.value,
                    pinCode: data.PreviousEmployerAddresspinCode.value
                }
            })) : [],
            //References
            contacts: !General.hasEmptyValuesInArray(professionalInformation.ReferencesInfo) ? professionalInformation.ReferencesInfo.map((data) => ({
                id: data.id.value || '',
                phoneNumber: data.PhoneNumber.value,
                contactType: data.ReferenceRelationship.value,
                email: data.email.value,
                contactFirstName: data?.FirstName?.value,
                contactLastName: data?.LastName?.value,
                title: data?.ReferenceTitle?.value,
                company: data?.ReferenceCompany?.value
            })) : [],

            //Nursing License
            ...(professionalInformation.LicenseInformation.length !== 0 && {
                certifications: !General.hasEmptyValuesInArray(professionalInformation.LicenseInformation) ? professionalInformation.LicenseInformation.map((data) => ({
                    id: data.id.value || '',
                    type: data.LicenseName.value,
                    expiryDate: data.LicenseExpirationDate.value,
                    stateIssued: data.LicenseState.value,
                    dateIssued: data.LicenseDateIssued.value,
                    certificateNumber: data.LicenseNumber.value,
                })) : [],
            }),

            //documents - need to remove this part
            documents: uploadedDocumentsList,

            //Health Info
            referredByName: professionalInformation.healthInformation.ReferredBy.value || '',

            // "lastExaminationDate": professionalInformation.healthInformation.LastExaminationByPhysician.value,
            // "healthLimitation": healthInfoQuestions[0].choices.some(item => item.checked) || false,
            // "healthLimitationReason": healthInfoQuestions[0].description || null,
            healthLimitation: false,
            healthLimitationReason: null,
            lastExaminationDate: new Date(),

            authorizedToWorkInUSA: "true",
            alienNumber: 0,
            isNurseSkilled: true,

            howHearAboutCompany:
                healthInfoQuestions[2]?.choices?.filter((item) => item.checked)[0]?.label || 'Direct mailer',
            digitalSignature: signatureInBase64 || '',

            onboardingStatus: step,
            applicationFormStep: step
        };

        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));
        const response = yield NurseOnboardingService.postNurseOnboardingApplication(agencyId, applicationId, data);

        if (response.status == 200) {

            General.setDataInLocalStorageWithExpiry('nurseId', response.data.data.id, 20)

            if (applicationSteps == activeIndex + 1) {
                yield put(setJobApplicationFormType(JOB_APPLICATION_TYPE.Final_Steps));
                yield put(setJobApplicationActiveStep(1));
            } else {
                yield put(setJobApplicationActiveStep(activeIndex + 1));
            }
            yield put(getUserDetailsById({ applicationId, agencyId }));
        }
    } catch (error) {
        console.log('err: ', error);

        if (error?.response?.data?.error == "The Provided Application Is Discared!") {
            toast.error('The Provided Application Is Discarded!');
            yield put(setJobApplicationStatus("Discarded"))
        }
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY, message: 'Fetching Payers List' }));
    }
}

function* putNurseStateResidingAsync(action) {
    try {
        const { applicationId, agencyId, data, activeIndex } = action.payload;
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));

        const response = yield NurseOnboardingService.putNurseStateResiding(agencyId, applicationId, data);

        if (response.status == 200) {
            toast.success('Nurse residence details updated successfully' || response.data.data.message);
            yield put(postUpdateNurseOnboardingStatus({ agencyId, applicationId, data: { onboardingStatus: 'Step-7' }, activeIndex }));
            yield put(setJobApplicationActiveStep(2));
        }
    } catch (error) {
        toast.error('Something went wrong please try again!');
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* getAssessmentsByRoleAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));
        const { role, agencyId, nurseId } = action.payload;

        const response = yield NurseOnboardingService.getAssessmentsByRole(role, agencyId);
        const { data } = response;
        const filteredArray = General.convertArrayToDesiredFormat(data[0].questions_v2);
        yield put(setSkillTestQuestions(filteredArray));
        // yield put(getUploadedAssessmentForNurse({ nurseId }))
    } catch (error) {
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* postSubmitAssessmentsByRoleAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));

        const { applicationId, data, agencyId, activeIndex } = action.payload;
        const response = yield NurseOnboardingService.postSubmitAssessmentsByRole(agencyId, applicationId, data);

        if (response.status == 201) {
            toast.success('Skill test submitted successfully');
            yield put(postUpdateNurseOnboardingStatus({ agencyId, applicationId, data: { onboardingStatus: 'Step-8' }, activeIndex }));
        } else {
            toast.error('Something went wrong please try again!');
        }
    } catch (error) {
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* getPreSignedUrlAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Uploading Document...' }));
        const { data, file, applicationId, agencyId, documentType, userId, uploadedDocuments, idx } = action.payload;
        const response = yield DocumentUploadService.getPreSignedUrl(data);

        if (response.status == 201) {
            const uploadedDocument = yield DocumentUploadService.storeDocumentToS3(response.data, file);

            if (uploadedDocument.status == 200) {
                if (documentType !== 'BackgroundCheck') {
                    yield put(setUploadedDocumentsList({ s3Url: `${agencyId}/${applicationId}/${file.name}`, documentType }));
                    toast.success('Document Uploaded successfully');
                } else {
                    toast.success('Document Uploaded successfully');
                    yield put(
                        setBackgroundCheckDocumentList({
                            s3Url: `${agencyId}/${applicationId}/${file.name}`,
                            documentType,
                            nurseId: userId
                        })
                    );
                }
                yield put(setUploadedDocumentsWithPreSignedUrl({ documentType, index: idx, s3Url: `${agencyId}/${applicationId}/${file.name}`, }))
            }
        }
    } catch (error) {
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* getJobApplicationStatusAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Job Application Status...' }));
        const { applicationId, agencyId } = action.payload;
        const response = yield NurseOnboardingService.getJobApplicationStatus(applicationId, agencyId);

        if (response.status == 200) {
            yield put(setJobApplicationStatus(response.data.onboardingStatus));
        } else {
            toast.error('Something went wrong please try again!');
        }
    } catch (error) {
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* getUserDetailsByIdAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching User Details...' }));
        const { applicationId, agencyId } = action.payload;
        const response = yield NurseOnboardingService.getUserDetailsById(applicationId, agencyId);

        if (response.status == 200) {
            yield put(setUserDetailsById(response.data.data));
        }
    } catch (error) {
        if (error?.response?.data?.message == "Nurse is not registered ! : The Provided Application Is Discared!") {
            yield put(setJobApplicationStatus("Discarded"))
        }
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* postCreateDynamicFormAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));
        const { data, applicationId, agencyId, role, activeIndex } = action.payload;
        const response = yield FormDataService.postCreateDynamicForm(data);

        if (response.status == 201) {
            if (data.fromType == 'EmployeesWithholdingCertificate') {
                yield put(postUpdateNurseOnboardingStatus({ agencyId, applicationId, data: { onboardingStatus: 'Pending' }, role, activeIndex }));
            } else {
                yield put(setActiveDeclarationTab(1));
            }
        }
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Something went wrong please try again!');
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* postStoreDocumentsToDatabaseAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));
        yield DocumentUploadService.postStoreDocumentsToDatabase(action.payload);
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Something went wrong please try again!');
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* getCompetencyChecklistAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));
        const { role, agencyId, applicationId, nurseId } = action.payload;

        const response = yield NurseOnboardingService.getCompetencyChecklist(agencyId, role);

        if (response.status === 200) {
            const filteredArray = General.transformInputArray(response.data.data.categories);
            yield put(setSkillCheckListData(filteredArray));

            yield put(getUploadedChecklistForNurse({ agencyId, applicationId, nurseId }))
        }
    } catch (error) {
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* postStoreCompetencyChecklistAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));

        const { agencyId, applicationId, data, role, activeIndex } = action.payload;
        const response = yield NurseOnboardingService.postStoreCompetencyChecklistTest(data);

        if (response.status == 201) {
            toast.success('Competency test submitted successfully');

            yield put(setJobApplicationActiveStep(activeIndex + 1));

            yield put(postUpdateNurseOnboardingStatus({ agencyId, applicationId, data: { onboardingStatus: 'Step-9' }, activeIndex }));
        } else {
            toast.error('Something went wrong please try again!');
        }
    } catch (error) {
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* postUpdateNurseOnboardingStatusAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));

        const { agencyId, applicationId, data, role, activeIndex } = action.payload;
        yield NurseOnboardingService.postUpdateNurseOnboardingStatus(agencyId, applicationId, data);

        if (data.onboardingStatus !== 'Step-4') {
            yield put(setJobApplicationActiveStep(activeIndex + 1));
        }
        if(data.onboardingStatus === 'Step-NO-10'){
            yield put(setJobApplicationActiveStep(0));
        }

    } catch (error) {
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* getInterviewScheduledDetailsNurseOnboardingAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));
        const { agencyId, nurseId } = action.payload;
        const response = yield NurseOnboardingService.getInterviewScheduledDetailsNurseOnboarding(agencyId, nurseId);
        if (response.status === 200) {
            yield put(setInterviewScheduledDetailsNurseOnboarding(response.data));
        }
    } catch (error) {
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* deleteDocumentFromS3AndDatabaseAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Deleting Document...' }));

        const { s3Url, documentType } = action.payload;
        const response = yield DocumentUploadService.deleteDocumentFromS3AndDatabase(s3Url, documentType);

        if (response.status == 200) {
            toast.success('Document deleted successfully!');
        }
    } catch (error) {
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* getUploadedChecklistForNurseAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));
        const { agencyId, applicationId, nurseId } = action.payload;
        const response = yield NurseOnboardingService.getUploadedChecklistForNurse(agencyId, applicationId, nurseId);
        if (response.status === 200) {
            if (response?.data?.data) {
                const parsedData = JSON.parse(response?.data?.data);
                const filteredArray = General.convertCheckListData(parsedData.categories);
                yield put(setSkillCheckListData(filteredArray));
            }
        }
    } catch (error) {
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* getUploadedAssessmentForNurseAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));
        const { nurseId } = action.payload;
        const response = yield NurseOnboardingService.getUploadedAssessmentForNurse(nurseId);
        if (response.status === 200) {
            const { data } = response;
            const filteredArray = General.readOnlyAssessment(data[0].questionResults, false);
            yield put(setSkillTestQuestions(filteredArray));
        }
    } catch (error) {
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* getEmploymentEligibilityVerificationByFormAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));
        const { nurseId, agencyId } = action.payload;
        const response = yield NurseOnboardingService.getEmploymentEligibilityVerificationByForm(agencyId, nurseId);
        if (response.status === 200) {
            yield put(setEligibilityVerificationFormDetails(response.data));
        }
    } catch (error) {
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* rootSaga() {
    yield all([
        takeLatest(postNurseOnboardingApplication().type, postNurseOnboardingApplicationAsync),
        takeLatest(putNurseStateResiding().type, putNurseStateResidingAsync),
        takeLatest(getAssessmentsByRole().type, getAssessmentsByRoleAsync),
        takeLatest(postSubmitAssessmentsByRole().type, postSubmitAssessmentsByRoleAsync),
        takeLatest(getPreSignedUrl().type, getPreSignedUrlAsync),
        takeLatest(getJobApplicationStatus().type, getJobApplicationStatusAsync),
        takeLatest(getUserDetailsById().type, getUserDetailsByIdAsync),
        takeLatest(postCreateDynamicForm().type, postCreateDynamicFormAsync),
        takeLatest(postStoreDocumentsToDatabase().type, postStoreDocumentsToDatabaseAsync),
        takeLatest(getCompetencyChecklist().type, getCompetencyChecklistAsync),
        takeLatest(postStoreCompetencyChecklist().type, postStoreCompetencyChecklistAsync),
        takeLatest(postUpdateNurseOnboardingStatus().type, postUpdateNurseOnboardingStatusAsync),
        takeLatest(getInterviewScheduledDetailsNurseOnboarding().type, getInterviewScheduledDetailsNurseOnboardingAsync),
        takeLatest(deleteDocumentFromS3AndDatabase().type, deleteDocumentFromS3AndDatabaseAsync),
        takeLatest(getUploadedChecklistForNurse().type, getUploadedChecklistForNurseAsync),
        takeLatest(getUploadedAssessmentForNurse().type, getUploadedAssessmentForNurseAsync),
        takeLatest(getEmploymentEligibilityVerificationByForm().type, getEmploymentEligibilityVerificationByFormAsync)
    ]);
}

store.sagaManager.addSaga(componentKey, rootSaga);
