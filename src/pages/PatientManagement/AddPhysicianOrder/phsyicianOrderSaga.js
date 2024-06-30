import store from '../../../store/store';
import { all, put, takeLatest } from 'redux-saga/effects';
import { PAGE_STATE } from '../../../libs/constant';
import PatientManagementService from '../../../services/PatientManagementService';
import {
    componentKey,
    setActivePhysicianPatientIntakeStep,
    setAllPatients,
    setCardSavedStatePhysician,
    setCreatePhysician,
    setGetAllPayers,
    setGetPatientById,
    setIsMultiRecord,
    setIsPatientId,
    setIsPhysicianId,
    setIsSingleRecord,
    setIsmailSent,
    setLoadingState,
    setMedicalReportRequestModal,
    setPatienDetailsDropdown,
    setPatientUserId,
    setPersonaliDetailsResp,
    setPhysician,
    setPhysicianDetails,
    setUploadedDocumentsList,
    setUploadedDocumentsWithPreSignedUrl,
    setsIsPhysicianName
} from './physicianOrderSlice';
import { toast } from 'react-toastify';
import DocumentUploadService from '../../../services/DocumentUploadService';
import moment from 'moment';
import General from '../../../libs/utility/General';

const token = General.getLocalStorageData('token');

export const {
    postPersonalDetails,
    postServiceDetails,
    postInsuranceDetails,
    postCardDetails,
    getAllPatients,
    getPhysicians,
    postSendEmail,
    postMedicalOrder,
    getPatientById,
    postSendEmailToPhysicianAndAgency,
    getPhysiciansById,
    postPhysician,
    getAllPayers,
    postFaceToFace,
    getPreSignedUrl,
    postSendDocumentToBE,
    deletePatientById,
    medicalDetails,
    emergencyContact,
    referralInformation,
    getPhysicianByNameOrNumber,
    patchUpadatePatientById,
    getDocumentFromS3Bucket,
    deleteDocumentFromS3AndDatabase
} = {
    postPersonalDetails: (payload) => {
        return {
            type: 'PHYSICIAN/ACTIOM_EXAMPLE',
            payload
        };
    },
    postServiceDetails: (id, patientServiceDetails, token) => {
        return {
            type: 'PHYSICIAN/SERVICE_DETAILS',
            payload: { id, patientServiceDetails,token }
        };
    },
    postInsuranceDetails: (payload) => {
        return {
            type: 'PHYSICIAN/INSURANCE_DETAILS',
            payload
        };
    },
    postCardDetails: (id, body) => {
        return {
            type: 'PHYSICIAN/CARD_DETAILS',
            payload: { id, body }
        };
    },
    getAllPatients: (payload) => {
        return {
            type: 'PHYSICIAN/ALL_PATIENTS',
            payload
        };
    },
    getPhysicians: (payload) => {
        return {
            type: 'PHYSICIAN/ALL_PHYSICIANS',
            payload
        };
    },
    postSendEmail: (payload) => {
        return {
            type: 'PHYSICIAN/SEND_EMAIL',
            payload
        };
    },
    postMedicalOrder: (payload) => {
        return {
            type: 'PHYSICIAN/MEDICAL_ORDER',
            payload
        };
    },
    getPatientById: (payload) => {
        return {
            type: 'PHYSICIAN/PATIENT_BY_ID',
            payload
        };
    },
    postSendEmailToPhysicianAndAgency: (payload) => {
        return {
            type: 'PHYSICIAN/SEND_EMAIL_TO_PHYSICIAN_AND_AGENCY',
            payload
        };
    },
    getPhysiciansById: (payload) => {
        return {
            type: 'PHYSICIAN/PHYSICIAN_BY_ID',
            payload
        };
    },
    postPhysician: (payload) => {
        return {
            type: 'PHYSICIAN/CREATE_PHYSICIAN',
            payload
        };
    },
    getAllPayers: (payload) => {
        return {
            type: 'PHYSICIAN/GET_ALL_PAYERS',
            payload
        };
    },
    postFaceToFace: (payload) => {
        return {
            type: 'PHYSICIAN/FACE_TO_FACE',
            payload
        };
    },
    getPreSignedUrl: (payload) => {
        return {
            type: 'PHYSICIAN/GET_PRE_SIGNED_URL',
            payload
        };
    },
    postSendDocumentToBE: (payload) => {
        return {
            type: 'PHYSICIAN/SEND_DOCUMENT',
            payload
        };
    },
    // deletePatientById: (payload) => {
    //     return {
    //         type: 'PHYSICIAN/DELETE',
    //         payload
    //     };
    // },
    medicalDetails: (payload) => {
        return {
            type: 'PHYSICIAN/MEDICAL_DETAILS',
            payload
        };
    },
    emergencyContact: (payload) => {
        return {
            type: 'PHYSICIAN/EMERGENCY_DETAILS',
            payload
        };
    },
    referralInformation: (payload) => {
        return {
            type: 'PHYSICIAN/REFERRAL_INFO',
            payload
        };
    },
    getPhysicianByNameOrNumber: (payload) => {
        return {
            type: 'PHYSICIAN/GET_PHYSICIAN_BY_NUMBER_OR_NAME',
            payload
        };
    },
    patchUpadatePatientById: (payload) => {
        return {
            type: 'PHYSICIAN/UPDATE_PATIENT',
            payload
        };
    },
    getDocumentFromS3Bucket: (payload) => {
        return{
            type: 'PHYSICIAN/GET_DOCUMENT_FROM_S3_BUCKET',
            payload
        }
    },
    deleteDocumentFromS3AndDatabase: (payload) => {
        return {
            type: 'PHYSICIAN/DELETE_DOCUMENT_FROM_S3',
            payload
        };
    },
};

function* postPersonalDetailsAsync(action) {
    const { personalDetails, patientDropdownDetails, physicianDetails, agencyId, token, patientId } = action.payload;
    let data = {
        step: "step-0",

        patientType: 'physician order',
        ...(patientId && { id: patientId }),

        firstName: personalDetails.firstName.value,
        lastName: personalDetails.lastName.value,
        gender: personalDetails.gender.value,
        email: personalDetails.email.value || undefined,
        phoneNumber: personalDetails.phoneNumber.value.replace(/[-()]/g, ''),
        race: personalDetails.race.value || undefined,
        dateOfBirth: personalDetails.dateOfBirth.value,
        HICNumber: personalDetails.HICNumber.value || undefined,
        mrn: personalDetails.mrn.value || undefined,
        ssn: personalDetails.ssn.value || undefined,
        isSameBillingAddress: personalDetails.isSameBillingAddress.value,

        patientServiceStatus: 'pending',
        address: {
            addressLine1: personalDetails.addressLine1.value,
            addressLine2: personalDetails.addressLine2.value,
            city: personalDetails.city.value,
            state: personalDetails.state.value,
            country: personalDetails.country.value,
            pinCode: personalDetails.pinCode.value
        },
        diseases:
            personalDetails.diseases.value.split(' ').length > 0
                ? personalDetails.diseases.value.split(' ')
                : undefined,
        physicianId: patientDropdownDetails.patientPhysician.id,
        // medicationDetails:
        //     personalDetails.medicationDetails.value.split(' ').length > 0
        //         ? personalDetails.medicationDetails.value.split(' ')
        //         : undefined
    };

    if (!personalDetails.isSameBillingAddress.value) {
        data.billingAddress = {
            addressLine1: personalDetails.billingAddress_line1.value,
            addressLine2: personalDetails.billingAddress_line2.value,
            city: personalDetails.billingAddress_city.value,
            state: personalDetails.billingAddress_state.value,
            country: personalDetails.billingAddress_country.value,
            pinCode: personalDetails.billingAddress_pinCode.value
        };
    }
    // Conditionally add the billingAddress if isSameBillingAddress is false
    if (!personalDetails.isSameBillingAddress.value) {
        data.billingAddress = {
            addressLine1: personalDetails.billingAddress_line1.value,
            addressLine2: personalDetails.billingAddress_line2.value,
            city: personalDetails.billingAddress_city.value,
            state: personalDetails.billingAddress_state.value,
            country: personalDetails.billingAddress_country.value,
            pinCode: personalDetails.billingAddress_pinCode.value
        };
    }
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details...' }));

        var response = yield PatientManagementService.postPersonalDetails(data, token);

        const patientId = response.data.id;

        if (response.status === 201) {
            yield put(setActivePhysicianPatientIntakeStep(1));
            yield put(setIsPatientId(response.data.id))
            yield put(setPatientUserId(response.data.userId))

            toast.success('patient created successfully');
            yield put(setPersonaliDetailsResp(response.data));
            yield put(getAllPayers({ patientId,token }));
        }
    } catch (error) {
        toast.error(
            error?.response?.data?.message
                ? error?.response?.data?.message
                : error?.response?.data?.message
                    ? error?.response?.data?.message
                    : error?.response?.name
        );
        console.log('err: ', error.response);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* postServiceDetailsAsync(action, payload) {
    const agencyId = General.getLocalStorageData('agencyId');

    const { id, patientServiceDetails, token } = action.payload;
    const newData = patientServiceDetails?.map((item) => {
        return{
            step: "step-3",

            service: item?.service?.value,
            caseSequence: item?.caseSequence?.value,
            serviceType: "nurse"
        }
    })
    const data = { patientServiceDetails:  newData
        
    };

    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details...' }));

        const response = yield PatientManagementService.postServiceDetails(id, data,token);
    } catch (error) {
        console.log('err', error);
        toast.error(error?.response?.data?.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* postInsuranceDetailsAsync(action) {
    const { patientId, insuranceDetails, token, documentType } = action.payload;
 
    const newDocs = insuranceDetails?.flatMap((insuranceItem) => {
        return insuranceItem.documents.map((documentItem) => {
    
            return {
                s3Url: documentItem?.s3Url,
                documentType: documentType,
            };
        });
    });
    const agencyId = General.getLocalStorageData('agencyId');

    const newInsuranceDetails = insuranceDetails.map((item, index) => {
        const effectiveFromDate = new Date(item.effectiveFrom.value);
        const effectiveTillDate = new Date(item.effectiveTill.value);
        return {
            // agencyId: agencyId,
            
            payerName: item.payerName.value,
            planName: item.planName.value,
            orderOfBenifits: item.orderOfBenifits.value,
            insuranceId: item.insuranceId.value,
            insuranceType: item.insuranceType.value,
            deductible: item.deductible.value,
            copay: item.copay.value,
            copayAmount: Number(item.copayAmount.value),
            groupId: item.groupId.value,
            relationWithPatient: item.relationWithPatient.value,
            effectiveFrom: effectiveFromDate,
            effectiveTill: effectiveTillDate,
            documents: newDocs
        };
    });

    const data = {
        payerDetails: newInsuranceDetails,
        step: "step-1",
    };
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details' }));
        const response = yield PatientManagementService.postInsuranceDetails(patientId, data,token);
        if (response.status === 201) {
            toast.success('insurance details updated successfully');
        }
    } catch (error) {
        console.log('err', error);
        toast.error(
            error?.response?.data?.message[0]
                ? error?.response?.data?.message[0]
                : error?.response?.data?.message
                    ? error?.response?.data?.message
                    : error?.response?.name
        );
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* postCardDetailsAsync(action) {
    const { id, body } = action.payload;

    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details' }));
        const response = yield PatientManagementService.postCardDetails(id, body);
        if (response.status === 201) {
            yield put(setCardSavedStatePhysician(true))
            toast.success('card details updated successfully');
        }
    } catch (error) {
        console.log('err', error);
        toast.error(error?.response?.data?.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* getAllPatientsAsync(action) {

    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details' }));
        const { agencyId, patientId, allPatients, pageNumber, limit, startDate, status, search,token } = action.payload;
        const response = yield PatientManagementService.getAllPatients(
            patientId,
            allPatients,
            pageNumber,
            limit,
            startDate,
            status,
            search,
            token
        );
        yield put(setAllPatients(response.data.patients));
    } catch (error) {
        console.log('err', error);
        toast.error(error?.response?.data?.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* getPhysiciansByIdAsync(action) {
    const token = General.getLocalStorageData("token")

    try {
        const data = {
            npi: action.payload.npi || undefined,
            name: action.payload.name || undefined
        };
        const response = yield PatientManagementService.getPhysicianById(data,token);
        // yield put(setCreatePhysician(response.data));
    } catch (error) {
        console.log('err', error);
        toast.error(error?.response?.data?.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* getPhysicianAsync(action) {
    try {
        const agencyId = General.getLocalStorageData('agencyId');
        const token = General.getLocalStorageData("token")

        const { name, pageNumber, limit } = action.payload;

        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details' }));
        const response = yield PatientManagementService.getPhysicians(agencyId, name,token)
        yield put(setPhysicianDetails([response.data]));
        let physicianId = response?.data?.physician[0]?.id;
        let physicianName = response?.data?.physician[0]?.firstName + ' ' + response?.data?.physician[0]?.lastName;
        // localStorage.setItem('physicianId', physicianId);
        // localStorage.setItem('physicianName', physicianName);
        yield put(setIsPhysicianId(physicianId))
        yield put(setsIsPhysicianName(physicianName))
    } catch (error) {
        console.log('err', error);
        toast.error(error?.response?.data?.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* postSendEmailAsync(action) {
    try {
        const { patientDropdownDetails } = action.payload;
        const { patientId } = action.payload;
        const agencyId = General.getLocalStorageData('agencyId');

        const data = {
            emailData: [
                {
                    patientId: patientId,
                    physicianId: patientDropdownDetails?.patientPhysician?.value,

                    adminEmail: process.env.REACT_APP_ADMIN_EMAIL ? process.env.REACT_APP_ADMIN_EMAIL : undefined,
                    type: 'PHYSICIAN_ORDER'
                }
            ]
        };
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details' }));
        const response = yield PatientManagementService.postSendEmail(data);

        yield put(setPhysicianDetails([response.data]));
        yield put(setActivePhysicianPatientIntakeStep(4));
    } catch (error) {
        console.log('err', error);
        toast.error(error?.response?.data?.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* postMedicalOrderAsync(action) {
    try {
        const agencyId = General.getLocalStorageData('agencyId');

        const { patientId, patientById, medicalOrderDetails, patientPhysicianIntakeSign } = action.payload;

        const data = {
            step: "step-5",

            physicianId: patientById.physician.id,
            nurse: medicalOrderDetails.nurse,
            therapist: medicalOrderDetails.therapist,
            MSW: medicalOrderDetails.MSW,
            HHA: medicalOrderDetails.HHA,
            physiciansDigitalSignature: patientPhysicianIntakeSign
        };
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details' }));

        const response = yield PatientManagementService.postCreateMedicalOrder(patientId, data);
    } catch (error) {
        console.log('err', error);
        toast.error(error?.response?.data?.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* getPatientByIdAsync(action) {
    const { agencyId, patientId, token } = action.payload;

    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details' }));
        const response = yield PatientManagementService.getPatientById(patientId, token);
        yield put(setGetPatientById(response.data));
    } catch (error) {
        console.log('err', error);
        toast.error(error?.response?.data?.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* postSendEmailToPhysicianAndAgencyAsync(action) {
    const agencyId = General.getLocalStorageData('agencyId');

    try {
        const { patientId, physicianId, token } = action.payload;

        const data = {
            emailData: [
                {
                    patientId: patientId,
                    physicianId: physicianId,
                    adminEmail: process.env.REACT_APP_ADMIN_EMAIL ? process.env.REACT_APP_ADMIN_EMAIL : undefined,

                    type: 'CONSENT_EMAIL_FOR_PHYSICIAN_ORDER'
                },
                {
                    physicianId: physicianId,
                    patientId: patientId,
                    type: 'CONFIRMATION_EMAIL_TO_AGENCY',
                    adminEmail: process.env.REACT_APP_ADMIN_EMAIL ? process.env.REACT_APP_ADMIN_EMAIL : undefined
                },
                {
                    physicianId: physicianId,
                    patientId: patientId,
                    type: 'PATIENT_ONBOARDING_EMAIL',
                    adminEmail: process.env.REACT_APP_ADMIN_EMAIL ? process.env.REACT_APP_ADMIN_EMAIL : undefined
                },

            ]
        };

        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details' }));
        const response = yield PatientManagementService.postSendEmailToPhysicianAndAgency(data, token);

        if (response.status === 201) {
            yield put(setIsmailSent(true));
            localStorage.removeItem("physicianId");
        } else {
            yield put(setIsmailSent(false));
        }
        yield put(setPhysicianDetails([response.data]));
    } catch (error) {
        console.log('err', error);
        toast.error(error?.response?.data?.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* postPhysiciansAsync(action) {
    const agencyId = General.getLocalStorageData('agencyId');

    try {
        const { createPhysician, token } = action.payload;

        const data = {
            NPI: createPhysician.NPI.value,
            firstName: createPhysician.firstName.value,
            lastName: createPhysician.lastName.value,
            primaryEmail: createPhysician.primaryEmail.value,
            secondaryEmail: createPhysician.secondaryEmail.value,
            fax: createPhysician.fax.value,
            status: createPhysician.status.value,
            mailingAddress: {
                addressLine1: createPhysician.mailingAddress.addressLine1.value,
                addressLine2: createPhysician.mailingAddress.addressLine2.value,
                landmark: createPhysician.mailingAddress.landmark.value,
                city: createPhysician.mailingAddress.city.value,
                state: createPhysician.mailingAddress.state.value,
                country: createPhysician.mailingAddress.country.value,
                pinCode: createPhysician.mailingAddress.pinCode.value
            },
            primaryAddress: {
                addressLine1: createPhysician.primaryAddress.addressLine1.value,
                addressLine2: createPhysician.primaryAddress.addressLine2.value,
                landmark: createPhysician.primaryAddress.landmark.value,
                city: createPhysician.primaryAddress.city.value,
                state: createPhysician.primaryAddress.state.value,
                country: createPhysician.primaryAddress.country.value,
                pinCode: createPhysician.primaryAddress.pinCode.value
            },
            contactNumber: createPhysician.contactNumber.value

        };

        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details' }));
        const response = yield PatientManagementService.postPhysician(agencyId, data, token);

        if (response.status === 201) {
            toast.success('Physician registered successfully!');
            let physicianName = response?.data?.firstName + ' ' + response?.data?.lastName
            yield put(setsIsPhysicianName(physicianName))
            yield put(setIsPhysicianId(response?.data?.id))
        }
        yield put(
            setPatienDetailsDropdown({
                name: 'patientPhysician',
                selectedOption: {
                    value: response?.data?.id,
                    label: response?.data?.firstName + ' ' + response?.data?.lastName
                }
            })
        );
    } catch (error) {
        console.log('err', error);
        toast.error(error?.response.data.message.toString());
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* getAllPayersAsync(action) {
    const agencyId = General.getLocalStorageData('agencyId');
    const token = General.getLocalStorageData("token")
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details' }));
        const response = yield PatientManagementService.getAllPayers(action.payload, token);
        yield put(setGetAllPayers([response.data]));
    } catch (error) {
        console.log('error', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* postFaceToFaceAsync(action) {
    try {
        const { agencyId, patientId, physicianId, faceToFace, sign, patientById, personalDetailsResp,patientDropdownDetails,  } = action.payload;
      
        let service = [];

        if (faceToFace?.serviceNursing.isChecked) {
            service.push('Nursing');
        }

        if (faceToFace?.serviceTherapy.isChecked) {
            service.push('Therapy');
        }
        let data = {
            step: "step-4",
            patientDOB: personalDetailsResp?.dateOfBirth,
            patientName: personalDetailsResp?.firstName + ' ' + personalDetailsResp?.lastName,
            quallifyingEncounterType: [
                {
                    service: 'Hospitalist provider conducted the face-to-face encounter and certificationC',
                    dateConducted: new Date(
                        faceToFace?.quallifyingEncounterType_section1_dateConducted?.value
                    ).toISOString(),
                    providerName: patientDropdownDetails.patientPhysician.label,
                    questionResponse:
                        faceToFace?.quallifyingEncounterType_section1_questionResponse?.value === 'Yes' ? true : false
                },
                {
                    service: 'Face-to-face encounter conducted within 90 days of home careSOC',
                    dateConducted: new Date(
                        faceToFace?.quallifyingEncounterType_section2_dateConducted?.value
                    ).toISOString(),
                    providerName: patientDropdownDetails.patientPhysician.label,
                    questionResponse:
                        faceToFace?.quallifyingEncounterType_section2_questionResponse?.value === 'Yes' ? true : false
                },
                {
                    service: 'Face-to-face encounter conducted within 30 days of home care SOC.',
                    dateConducted: faceToFace?.quallifyingEncounterType_section3_dateConducted?.value,
                    providerName: patientDropdownDetails.patientPhysician.label,
                    questionResponse:
                        faceToFace?.quallifyingEncounterType_section3_questionResponse?.value === 'Yes' ? true : false,
                    SOCDate: new Date(faceToFace?.quallifyingEncounterType_section3_SOCDate?.value).toISOString(),
                    thirtyDay: new Date(faceToFace?.quallifyingEncounterType_section3_thirtyDay?.value),
                    dateOfVisit: new Date(
                        faceToFace?.quallifyingEncounterType_section3_dateOfVisit?.value
                    ).toISOString(),
                    contactedDate: new Date(faceToFace?.quallifyingEncounterType_section3_dateConducted_2?.value),
                    // contactBy: faceToFace?.quallifyingEncounterType_section3_contactBy?.value,
                    explanation: faceToFace?.explain?.value
                }
            ],
            additionalInformation: faceToFace?.additionalInformation?.value,
            physicianAttestation: [
                {
                    physicianName: patientDropdownDetails.patientPhysician.label,
                    practitionerName: faceToFace?.PhysicianAttention_practitionerName?.value,
                    licenseNo: faceToFace.PhysicianAttention_licenseNo.value,
                    encounterDescription: faceToFace?.PhysicianAttention_encounterDescription?.value,
                    clinicalFindings: faceToFace?.PhysicianAttention_clinicalFindings?.value,
                    clinicalFindingsReason: faceToFace?.PhysicianAttention_clinicalFindingsReason?.value,
                    attestationDate: faceToFace?.PhysicianAttention_attestationDate?.value
                }
            ],
            service: service,
            physicianSignature: sign,
            dateOfSignature: new Date(faceToFace?.dateOfSignature?.value).toISOString()
        };
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details' }));
        const response = yield PatientManagementService.postFaceToFace(agencyId, physicianId, patientId, data);
        if(response.status === 201) {
            yield put(setActivePhysicianPatientIntakeStep(5));

        }
    } catch (error) {
        console.log('err', error);
        toast.error(error?.response?.data?.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* getPreSignedUrlAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Uploading Document...' }));
        const { data, file, agencyId, patientId, documentType, idx, type, patientUserId,index } = action.payload;
        const {  fileName,  userId} = data
        const response = yield DocumentUploadService.getPreSignedUrl({agencyId,patientId,userId,type, fileName});
        if (response.status == 201) {
            const uploadedDocument = yield DocumentUploadService.storeDocumentToS3(response.data, file);

            if (uploadedDocument.status == 200) {
                if(documentType == "medical reports"){
                    yield put(
                        setUploadedDocumentsList({
                            s3Url: `${agencyId}/${patientId}/${file.name}`,
                            documentType,
                            agencyId,
                            patientId,
                            // userId
                        })
                    );
                }

                toast.success('Document Uploaded successfully');
                yield put(setUploadedDocumentsWithPreSignedUrl({ documentType, index2:index,index: idx, s3Url: `${agencyId}/${patientUserId}/${file.name}`, }));
                // yield put (setUploadDocumentsForInsuranceDocuments({ documentType, index: idx, s3Url: `${agencyId}/${file.name}`, }))
            }
        }
    } catch (error) {
        console.log('err: ', error);
        toast.error(error?.response?.data?.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* postSendDocumentToBEAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Uploading Document...' }));
        const response = yield PatientManagementService.postSendDocumentToBE(action.payload);
    } catch (error) {
        console.log('err: ', error);
        toast.error(error?.response?.data?.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* medicalDetailsAsync(action) {
    try {
        const { agencyId, patientId, medicationDetails, uploadedDocumentsList,token } = action.payload;

        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'updating medical history...' }));
        let data = {
            step: "step-2",
            medicalRecordHistory: uploadedDocumentsList,
            medicationList: medicationDetails
        };
        const response = yield PatientManagementService.medicalDetails(patientId, data,token);
    } catch (error) {
        console.log('err: ', error);
        toast.error(error?.response?.data?.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* referralInformationAsync(action) {
    try {
        const { agencyId, patientId, referralDetails,token } = action.payload;
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Uploading Document...' }));
        let data = {
            step: "step-4",

            // name: referralDetails.referral_name || undefined + ' ' + referralDetails.referral_lastName || undefined,
            contactFirstName: referralDetails.referral_firstName.value || undefined,
            contactLastName: referralDetails.referral_lastName.value || undefined,
            email: referralDetails.referral_email.value.length > 0 ? referralDetails.referral_email.value : undefined,
            phoneNumber: referralDetails.referral_phoneNumber.value.replace(/[-()]/g, ''),
            contactType: 'reference',
            refernceAddress: {
                addressLine1: referralDetails.referral_addressLine1.value,
                addressLine2: referralDetails.referral_addressLine2.value,
                city: referralDetails.referral_city.value,
                state: referralDetails.referral_state.value,
                country: referralDetails.referral_country.value,
                pinCode: referralDetails.referral_pinCode.value
            }
        };
        data.refernceAddress =
            data.refernceAddress.addressLine1 || data.refernceAddress.city ? data.refernceAddress : undefined;
        const response = yield PatientManagementService.referralInformation(patientId, data,token);
        if (response.status === 201) {
            yield put(setMedicalReportRequestModal(true));
        }
    } catch (error) {
        console.log('err: ', error);
        toast.error(error?.response?.data?.message[0]);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* emergencyContactAsync(action) {
    try {
        const {patientId, emergencyDetails, referralDetails,token } = action.payload;

        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Uploading Document...' }));
        let data = {
            step: "step-4",

            contactFirstName: emergencyDetails.guarentorFirstName.value || undefined,
            contactLastName: emergencyDetails.guarentorLastName.value || undefined,
            email: emergencyDetails.guarentorEmail.value.length > 0 ? emergencyDetails.guarentorEmail.value : undefined,
            phoneNumber: emergencyDetails.guarentorPhoneNumber.value.replace(/[-()]/g, ''),
            contactType: 'reference',
            refernceAddress: {
                addressLine1: emergencyDetails.guarentor_addressLine1.value
                    ? emergencyDetails.guarentor_addressLine1.value
                    : undefined,
                addressLine2: emergencyDetails.guarentor_addressLine2.value
                    ? emergencyDetails.guarentor_addressLine2.value
                    : undefined,
                city: emergencyDetails.guarentor_city.value ? emergencyDetails.guarentor_city.value : undefined,
                state: emergencyDetails.guarentor_state.value ? emergencyDetails.guarentor_state.value : undefined,
                country: emergencyDetails.guarentor_country.value
                    ? emergencyDetails.guarentor_country.value
                    : undefined,
                pinCode: emergencyDetails.guarentor_pinCode.value ? emergencyDetails.guarentor_pinCode.value : undefined
            }
        };
        data.refernceAddress =
            data.refernceAddress.addressLine1 || data.refernceAddress.city ? data.refernceAddress : undefined;
        const response = yield PatientManagementService.emergencyContact(patientId, data,token);
        if (response.status === 201) {
            yield put(referralInformation({patientId, referralDetails,token }));
        }
    } catch (error) {
        console.log('err: ', error);
        toast.error(error?.response?.data?.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* getPhysicianByNameOrNumberAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING }));
        const { npi, physicianFirstName, physicianLastName, pageNumber, limit,token } = action.payload;

        const response = yield PatientManagementService.getPhysicianByNameOrNumber({
            params: {
                firstName: physicianFirstName,
                lastName: physicianLastName,
                number: npi,
                pageNumber: pageNumber,
                limit: limit
            },token

        });

        if (response.data && response.data.length > 1) {
            yield put(setIsMultiRecord({ state: true }));
            yield put(setPhysician(response.data));
        } else {
            yield put(setCreatePhysician(response.data));

            yield put(setIsSingleRecord({ state: true }));
        }
    } catch (error) {
        console.log('err:', error);
        toast.error(error?.response?.data?.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* patchUpadatePatientByIdAsync(action) {
    try {
        const { agencyId, patientId, physicianId,token } = action.payload;
        let data = {
            physicianId: physicianId
        };
        const response = yield PatientManagementService.patchUpadatePatientById(patientId, data,token);
    } catch (error) {
        console.log('err:', error);
        toast.error(error?.response?.data?.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
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
function* rootSaga() {
    yield all([
        takeLatest(postPersonalDetails().type, postPersonalDetailsAsync),
        takeLatest(postServiceDetails().type, postServiceDetailsAsync),
        takeLatest(postInsuranceDetails().type, postInsuranceDetailsAsync),
        takeLatest(postCardDetails().type, postCardDetailsAsync),
        takeLatest(getAllPatients().type, getAllPatientsAsync),
        takeLatest(getPhysicians().type, getPhysicianAsync),
        takeLatest(postSendEmail().type, postSendEmailAsync),
        takeLatest(postMedicalOrder().type, postMedicalOrderAsync),
        takeLatest(getPatientById().type, getPatientByIdAsync),
        takeLatest(postSendEmailToPhysicianAndAgency().type, postSendEmailToPhysicianAndAgencyAsync),
        takeLatest(getPhysiciansById().type, getPhysiciansByIdAsync),
        takeLatest(postPhysician().type, postPhysiciansAsync),
        takeLatest(getAllPayers().type, getAllPayersAsync),
        takeLatest(postFaceToFace().type, postFaceToFaceAsync),
        takeLatest(getPreSignedUrl().type, getPreSignedUrlAsync),
        takeLatest(postSendDocumentToBE().type, postSendDocumentToBEAsync),
        takeLatest(medicalDetails().type, medicalDetailsAsync),
        takeLatest(referralInformation().type, referralInformationAsync),
        takeLatest(emergencyContact().type, emergencyContactAsync),
        takeLatest(getPhysicianByNameOrNumber().type, getPhysicianByNameOrNumberAsync),
        takeLatest(patchUpadatePatientById().type, patchUpadatePatientByIdAsync),
        takeLatest(getDocumentFromS3Bucket().type, getDocumentFromS3BucketAsync),
        takeLatest(deleteDocumentFromS3AndDatabase().type, deleteDocumentFromS3AndDatabaseAsync),

    ]);
}

store.sagaManager.addSaga(componentKey, rootSaga);
