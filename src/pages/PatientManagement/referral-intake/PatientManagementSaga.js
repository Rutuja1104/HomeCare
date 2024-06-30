import store from '../../../store/store';
import { all, put, takeLatest } from 'redux-saga/effects';
import {
    componentKey,
    setActiveRefferalPatientIntakeStep,
    setAllPatients,
    setCreatePhysician,
    setGetAllPayers,
    setGetPatientById,
    setIsMultiRecord,
    setIsPatientId,
    setIsSingleRecord,
    setIsmailSent,
    setLoadingState,
    setMedicalReportRequestModal,
    setPaginationState,
    setPatienDetailsDropdown,
    setPatientUserId,
    setPhysician,
    setPhysicianDetails,
    setPhysicianOrderSent,
    setUploadedDocumentsList,
    setUploadedDocumentsWithPreSignedUrl,
    setCardSavedState,
    setConfirmationModal,
    setPatientEpisodeList
} from './PatientManagementSlice';
import { PAGE_STATE } from '../../../libs/constant';
import PatientManagementService from '../../../services/PatientManagementService';
import { toast } from 'react-toastify';
import DocumentUploadService from '../../../services/DocumentUploadService';
import { PERSONAL_DETAILS } from '../constants';
import General from '../../../libs/utility/General';

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
    deleteDocumentFromS3AndDatabase,
    getPatientEpisodeList
} = {
    postPersonalDetails: (payload) => {
        return {
            type: 'PATIENT/ADD_PERSONAL_DETAILS',
            payload
        };
    },
    postServiceDetails: (id, patientServiceDetails, token) => {
        return {
            type: 'PATIENT/SERVICE_DETAILS',
            payload: { id, patientServiceDetails ,token}
        };
    },
    postInsuranceDetails: (payload) => {
        return {
            type: 'PATIENT/INSURANCE_DETAILS',
            payload
        };
    },
    postCardDetails: (id, body) => {
        return {
            type: 'PATIENT/CARD_DETAILS',
            payload: { id, body }
        };
    },
    getAllPatients: (payload) => {
        return {
            type: 'PATIENT/ALL_PATIENTS',
            payload
        };
    },
    getPhysicians: (payload) => {
        return {
            type: 'PATIENT/ALL_PHYSICIANS',
            payload
        };
    },
    postSendEmail: (payload) => {
        return {
            type: 'PATIENT/SEND_EMAIL',
            payload
        };
    },
    postMedicalOrder: (payload) => {
        return {
            type: 'PATIENT/MEDICAL_ORDER',
            payload
        };
    },
    getPatientById: (payload) => {
        return {
            type: 'PATIENT/PATIENT_BY_ID',
            payload
        };
    },
    postSendEmailToPhysicianAndAgency: (payload) => {
        return {
            type: 'PATIENT/SEND_EMAIL_TO_PHYSICIAN_AND_AGENCY',
            payload
        };
    },
    getPhysiciansById: (payload) => {
        return {
            type: 'PATIENT/PHYSICIAN_BY_ID',
            payload
        };
    },
    postPhysician: (payload) => {
        return {
            type: 'PATIENT/CREATE_PHYSICIAN',
            payload
        };
    },
    getAllPayers: (payload) => {
        return {
            type: 'PATIENT/GET_ALL_PAYERS',
            payload
        };
    },
    postFaceToFace: (payload) => {
        return {
            type: 'PATIENT/FACE_TO_FACE',
            payload
        };
    },
    getPreSignedUrl: (payload) => {
        return {
            type: 'PATIENT/GET_PRE_SIGNED_URL',
            payload
        };
    },
    postSendDocumentToBE: (payload) => {
        return {
            type: 'PATIENT/SEND_DOCUMENT',
            payload
        };
    },
    deletePatientById: (payload) => {
        return {
            type: 'PATIENT/DELETE_BY_ID',
            payload
        };
    },
    medicalDetails: (payload) => {
        return {
            type: 'PATIENT/MEDICAL_DETAILS',
            payload
        };
    },
    emergencyContact: (payload) => {
        return {
            type: 'PATIENT/EMERGENCY_DETAILS',
            payload
        };
    },
    referralInformation: (payload) => {
        return {
            type: 'PATIENT/REFERRAL_INFO',
            payload
        };
    },
    getPhysicianByNameOrNumber: (payload) => {
        return {
            type: 'PATIENT/GET_PHYSICIAN_BY_NUMBER_OR_NAME',
            payload
        };
    },
    patchUpadatePatientById: (payload) => {
        return {
            type: 'PATIENT/UPDATE_PATIENT',
            payload
        };
    },
    getDocumentFromS3Bucket: (payload) => {
        return{
            type: 'PATIENT/GET_DOCUMENT_FROM_S3_BUCKET',
            payload
        }
    },
    deleteDocumentFromS3AndDatabase: (payload) => {
        return {
            type: 'PATIENT/DELETE_DOCUMENT_FROM_S3',
            payload
        };
    },
    getPatientEpisodeList: (payload) => {
        return {
            type: 'PATIENT/GET_PATIENT_EPISODES_BY_PATIENT_ID',
            payload
        }
    },
};

function* postPersonalDetailsAsync(action) {
    const { personalDetails, patientDropdownDetails, token, patientId } = action.payload;
    

    let data = {
        step: "step-0",
        patientType: 'referral intake',
        ...(patientId && { id: patientId }),
        firstName: personalDetails.firstName.value,
        lastName: personalDetails.lastName.value,
        gender: personalDetails.gender.value,
        email: personalDetails.email.value || undefined,
        phoneNumber:personalDetails.phoneNumber.value.replace(/[-()]/g, ''),
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
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details...' }));

        var response = yield PatientManagementService.postPersonalDetails(data, token);
        if (response.status === 201) {
            yield put(setActiveRefferalPatientIntakeStep(1));
            yield put(setIsPatientId(response?.data?.id))
            yield put(setPatientUserId(response?.data?.userId))
            toast.success('patient created successfully');
            yield put(getAllPayers({ patientId, token }));
        }
    } catch (error) {
  
        toast.error(
            
            (error.response.data.message && Array.isArray(error.response.data.message))
                ? error.response.data.message[0]
                : error.response.data.message
            // (error.response.data.message && typeof error.response.data.message === Object) ? (error.response.data.message[0]) :(error.response.data.message) 
        );
        // toast.error(response?.response?.data?.error);
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
            
            service: item?.service?.value,
            caseSequence: item?.caseSequence?.value,
            serviceType: "nurse"
        }
    })
    const data = { patientServiceDetails:  newData,
        step: "step-3",
        
    };

    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details...' }));

        const response = yield PatientManagementService.postServiceDetails(id, data, token);
    } catch (error) {
        console.log('err', error);
        toast.error(error?.response?.data?.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* postInsuranceDetailsAsync(action) {
    const { patientId, insuranceDetails,  token,documentType } = action.payload;
    const agencyId = General.getLocalStorageData('agencyId');
    const newDocs = insuranceDetails?.flatMap((insuranceItem) => {
        return insuranceItem.documents.map((documentItem) => {
            if (!documentItem.s3Url) {
                toast.error('Please upload all documents before proceeding.');
                //  yield put(setConfirmationModal(false))
            }

            return {
                s3Url: documentItem.s3Url,
                documentType: documentType,
            };
        });
    });
    const newInsuranceDetails = insuranceDetails.map((item, index) => {
        const effectiveFromDate = new Date(item.effectiveFrom.value);
        const effectiveTillDate = new Date(item.effectiveTill.value);
        return {
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
            documents:newDocs

        };
    });

    const data = {
        payerDetails: newInsuranceDetails,
        step:'step-1'
    };
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'updateing insurance details' }));
        const response = yield PatientManagementService.postInsuranceDetails(patientId, data,token);
        if (response.status === 201) {
            toast.success('insurance details updated successfully');
            yield put(setActiveRefferalPatientIntakeStep(2))
            // dispatch(setActiveRefferalPatientIntakeStep(2));
        } 
        
    } catch (error) {
        console.log('err', error);
        toast.error(
            error?.response?.data?.message[0]
                ? error?.response?.data?.message
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
            yield put(setCardSavedState(true))
            toast.success('card details updated successfully');
        }
    } catch (error) {
        console.log('err', error);
        toast.error(error?.response?.data?.message);
    }finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* getAllPatientsAsync(action) {
    try {
        const { agencyId, pageNumber, limit, status, search ,token} = action.payload;
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Patients List' }));

        const response = yield PatientManagementService.getAllPatients({
            
            pageNumber,
            limit,
            status,
            search,
            token
        });

        if (response.status === 200) {
            yield put(setAllPatients(response.data.patients));
            yield put(setPaginationState({ totalPatients: response.data.totalRecords }));
        }
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
        const searchParams = {
            pageNumber,
            limit
        };
        if (isNaN(name)) {
            searchParams.name = name;
        } else {
            searchParams.npi = name;
        }
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details' }));
        const response = yield PatientManagementService.getPhysicians(agencyId, name, token)
        yield put(setPhysicianDetails([response.data]));
        // let physicianId = response?.data?.physician[0]?.id;
        // localStorage.setItem('physicianId', physicianId);
    } catch (error) {
        console.log('err', error);
        toast.error(error?.response?.data?.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* postSendEmailAsync(action) {
    try {
        const { patientDropdownDetails, token } = action.payload;

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
        if (response.status === 201) {
            yield put(setIsmailSent(true));
            yield put(setActiveRefferalPatientIntakeStep(0))
            toast.success('Email has been sent successfully');
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
function* postMedicalOrderAsync(action) {
    const agencyId = General.getLocalStorageData('agencyId');
    try {

        const { patientId, patientById, medicalOrderDetails, patientReferralIntakeSign, agencyId } = action.payload;
        const data = {
            step: "step-6",
            patientDiagnostics:medicalOrderDetails?.patientDiagnostics,
            physicianId: patientById.physician.id,
            nurse: medicalOrderDetails.nurse,
            therapist: medicalOrderDetails.therapist,
            MSW: medicalOrderDetails.MSW,
            HHA: medicalOrderDetails.HHA,
            physiciansDigitalSignature: patientReferralIntakeSign
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
    // const agencyId = General.getLocalStorageData('agencyId');

    const { agencyId, patientId,token } = action.payload;
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details' }));
        const response = yield PatientManagementService.getPatientById(patientId,token);
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
        const { patientId, physicianId, agencyId,token } = action.payload;

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
        const response = yield PatientManagementService.postSendEmailToPhysicianAndAgency(data);
        // toast.success('Email has been sent successfully');
        if (response.status === 201) {
            yield put(setIsmailSent(true));
            yield put(setPhysicianOrderSent(true))
            toast.success('Email has been sent successfully');
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
        const { createPhysician,token } = action.payload;

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
        const response = yield PatientManagementService.postPhysician(agencyId, data,token);
        if (response.status === 201) {
            toast.success('Physician registered successfully!');
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
        const response = yield PatientManagementService.getAllPayers(action.payload, token
        );

        yield put(setGetAllPayers([response.data]));
    } catch (error) {
        console.log('erro', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* postFaceToFaceAsync(action) {
    try {
        const { agencyId, patientId, physicianId, faceToFace, sign, patientById } = action.payload;
        
        let service = [];
        if (faceToFace?.serviceNursing.isChecked) {
            service.push('Nursing');
        }

        if (faceToFace?.serviceTherapy.isChecked) {
            service.push('Therapy');
        }
        let data = {
            step: "step-5",
            patientDOB: patientById?.dateOfBirth,
            // patientName: faceToFace?.firstName?.value,
            patientName: patientById?.firstName + ' ' + patientById?.lastName,
            quallifyingEncounterType: [
                {
                    service:"Hospitalist provider conducted the face-to-face encounter and certificationC",
                    dateConducted: new Date(
                        faceToFace?.quallifyingEncounterType_section1_dateConducted?.value
                    ).toISOString(),
                    providerName: patientById?.physician?.firstName + ' ' + patientById?.physician?.lastName,
                    questionResponse:
                        faceToFace?.quallifyingEncounterType_section1_questionResponse?.value === 'Yes' ? true : false
                },
                {
                    service: "Face-to-face encounter conducted within 90 days of home careSOC",
                    dateConducted: new Date(
                        faceToFace?.quallifyingEncounterType_section2_dateConducted?.value
                    ).toISOString(),
                    providerName: patientById?.physician?.firstName + ' ' + patientById?.physician?.lastName,
                    questionResponse:
                        faceToFace?.quallifyingEncounterType_section2_questionResponse?.value === 'Yes' ? true : false
                },
                {
                    service: "Face-to-face encounter conducted within 30 days of home care SOC.",
                    dateConducted: faceToFace?.quallifyingEncounterType_section3_dateConducted?.value,
                    providerName: patientById?.physician?.firstName + ' ' + patientById?.physician?.lastName,
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
                    physicianName: patientById?.physician?.firstName + ' ' + patientById?.physician?.lastName,
                    practitionerName: faceToFace?.PhysicianAttention_practitionerName?.value,
                    licenseNo: faceToFace.PhysicianAttention_licenseNo.value,
                    encounterDescription: faceToFace?.PhysicianAttention_encounterDescription?.value,
                    clinicalFindings: faceToFace?.PhysicianAttention_clinicalFindings?.value,
                    clinicalFindingsReason: faceToFace?.PhysicianAttention_clinicalFindingsReason?.value,
                    attestationDate: faceToFace?.PhysicianAttention_attestationDate?.value
                }
            ],
            // service: [faceToFace?.service.isChecked],
            service: service,
            physicianSignature: sign,
            dateOfSignature: new Date(faceToFace?.dateOfSignature?.value).toISOString()
        };
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details' }));
        const response = yield PatientManagementService.postFaceToFace(agencyId, physicianId, patientId, data);
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
        const { data, file, agencyId, patientId, documentType, idx, type, patientUserId, index } = action.payload;
        const {  fileName,  userId} = data
        const response = yield DocumentUploadService.getPreSignedUrl({agencyId,userId,type, fileName});
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
                        })
                    );
                }

                toast.success('Document Uploaded successfully');
                yield put(setUploadedDocumentsWithPreSignedUrl({ documentType,index2:index, index: idx, s3Url: `${agencyId}/${patientUserId}/${file.name}`, }));
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
function* deletePatientByIdAsync(action) {
    try {
        const { agencyId, patientId,PaginationState,search, token} = action.payload;
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Deleting Patient...' }));

        const response = yield PatientManagementService.deletePatientById(patientId, token);
        
        if (response.status === 200) {
            toast.success('Patient Deleted SuccessFully!');
            yield put(
                getAllPatients({
                    token,
                    pageNumber: PaginationState.pageNumber,
                    limit: PaginationState.PageSize,
                    search,
                    status: PaginationState.status
                })
            );
        
        }
    } catch (error) {
        console.log('err: ', error);
        toast.error(error?.response?.data?.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* medicalDetailsAsync(action) {
    try {
        const { patientId, medicationDetails, uploadedDocumentsList,token } = action.payload;

        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'updating medical history...' }));
        let data = {
            step: "step-2",
            medicalRecordHistory: uploadedDocumentsList,
            medicationList: medicationDetails.map((item) => {
                return {
                    disease: item.disease.value,
                    dosage: item.dosage.value,
                    medication: item.medication.value
                };
            })
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
        // if()
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
        toast.error(error?.response?.data?.message[0]);
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
                limit: limit,
                
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
        const { agencyId, patientId, physicianId, dataToUpdate,PaginationState, search,token } =
        action.payload;
        let data = {
            physicianId: physicianId || undefined,
            firstName: dataToUpdate?.firstName?.value || undefined,
            lastName: dataToUpdate?.lastName?.value || undefined,
            email: dataToUpdate?.email?.value || undefined,
            phoneNumber: dataToUpdate?.phoneNumber?.value || undefined,
            dateOfBirth: dataToUpdate?.dateOfBirth?.value || undefined,
            HICNumber: dataToUpdate?.HICNumber?.value || undefined,
            // mrn: dataToUpdate.mrn.value || undefined,
            ssn: dataToUpdate?.ssn?.value || undefined,
            ...(dataToUpdate?.homeAddress?.addressLine1?.value || dataToUpdate?.homeAddress?.addressLine2?.value || dataToUpdate?.homeAddress?.city?.value || dataToUpdate?.homeAddress?.state?.value || dataToUpdate?.homeAddress?.country?.value || dataToUpdate?.homeAddress?.pinCode?.value
                ? {
                    address: {
                        addressLine1: dataToUpdate?.homeAddress?.addressLine1?.value || undefined,
                        addressLine2: dataToUpdate?.homeAddress?.addressLine2?.value || undefined,
                        city: dataToUpdate?.homeAddress?.city?.value || undefined,
                        state: dataToUpdate?.homeAddress?.state?.value || undefined,
                        country: dataToUpdate?.homeAddress?.country?.value || undefined,
                        pinCode: dataToUpdate?.homeAddress?.pinCode?.value || undefined
                    }
                }
                : undefined
            )
            
        };
        const response = yield PatientManagementService.patchUpadatePatientById(patientId, data,token);
        if (response.status === 200) {
            // toast.success("Patient Updated Successfully!")
            yield put(
                getAllPatients({
                    pageNumber: PaginationState.pageNumber,
                    limit: PaginationState.PageSize,
                    search,
                    status: PaginationState.status,
                    token
                })
            );
        }
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

function* getPatientEpisodeListAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }))
        const { agencyId, patientId } = action.payload
        const response = yield PatientManagementService.getPatientEpisodeList(agencyId, patientId)

        if (response.status == 200) {
            yield put(setPatientEpisodeList(response.data.episodes))
        }
    } catch (error) {
        toast.error("Failed to download document")
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
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
        takeLatest(deletePatientById().type, deletePatientByIdAsync),
        takeLatest(medicalDetails().type, medicalDetailsAsync),
        takeLatest(referralInformation().type, referralInformationAsync),
        takeLatest(emergencyContact().type, emergencyContactAsync),
        takeLatest(getPhysicianByNameOrNumber().type, getPhysicianByNameOrNumberAsync),
        takeLatest(patchUpadatePatientById().type, patchUpadatePatientByIdAsync),
        takeLatest(getDocumentFromS3Bucket().type,getDocumentFromS3BucketAsync),
        takeLatest(deleteDocumentFromS3AndDatabase().type, deleteDocumentFromS3AndDatabaseAsync),
        takeLatest(getPatientEpisodeList().type, getPatientEpisodeListAsync),
    ]);
}

store.sagaManager.addSaga(componentKey, rootSaga);