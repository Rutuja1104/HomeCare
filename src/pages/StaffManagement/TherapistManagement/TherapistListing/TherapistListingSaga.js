import store from '../../../../store/store'
import { all, put, takeLatest } from 'redux-saga/effects'
import { PAGE_STATE } from '../../../../libs/constant'
import AdminDataService from '../../../../services/AdminDataService'
import { componentKey, setAllTherapistList, setLoadingState, setPaginationState, setProfessionalInformation, setShowDeleteTherapistModal, setTherapistDetails, setUploadedDocument } from './TherapistListingSlice'
import { toast } from 'react-toastify'
import General from '../../../../libs/utility/General'
import { CERTIFICATIONS_INFO_MAPPING_KEYS, PREVIOUS_EMPLOYMENT_ADDRESS_KEY_MAPPING, PREVIOUS_EMPLOYMENT_INFO_MAPPING_KEYS, REFERENCES_INFO_MAPPING_KEYS } from '../../../JobPostings/JobApplicationDetails/constants'

const token = General.getLocalStorageData("token")

export const { getAllTherapistList, putValidateUserByAgencyAdmin, getTherapistById, putTherapiestById } = {
    getAllTherapistList: (payload) => {
        return {
            type: 'THERAPIST_LIST/GET_ALL_THERAPIST',
            payload
        }
    },
    putValidateUserByAgencyAdmin: (payload) => {
        return {
            type: 'THERAPIST_LIST/DEACTIVATE_GET_ALL_THERAPIST',
            payload
        }
    },
    getTherapistById: (payload) => {
        return {
            type: 'THERAPIST_LIST/GET_GET_ALL_THERAPIST_DETAILS_BY_ID',
            payload
        }
    },
    putTherapiestById: (payload) => {
        return {
            type: 'THERAPIST_LIST/UPDATE_THERAPIEST',
            payload
        };
    }
}

function* getAllTherapistListAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Therapist List' }))
        const { token, agencyId, page, limit, status, firstName, lastName, role } = action.payload
        const response = yield AdminDataService.getAllNurseList(token, agencyId, page, limit, status, firstName, lastName, role)

        if (response.status === 200) {
            yield put(setAllTherapistList(response?.data?.data))
            yield put(setPaginationState({ totalNurse: response.data.count }))
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY, message: 'Fetching Therapist List' }))
    }
}

function* putValidateUserByAgencyAdminAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }))
        const { nurseId, data, token, agencyId, PaginationState } = action.payload
        const response = yield AdminDataService.putValidateUserApplication(nurseId, data, token)

        if (response.status == 200) {
            if (data.onboardingStatus !== "Active") {
                toast.success("User De-activated successfully!")
            } else {
                toast.success("User activated successfully!")
            }

            yield put(getAllTherapistList({ token, agencyId, status: PaginationState.Status, page: PaginationState.PageNumber, limit: PaginationState.PageSize, firstName: PaginationState.FilterText, lastName: "", role: PaginationState.Role }))
        }
    } catch (error) {
        console.log(error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY, message: 'Loading...' }))
        yield put(setShowDeleteTherapistModal(false))
    }
}

function* getTherapistByIdAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Therapist Details...' }))
        const response = yield AdminDataService.getUserDetailsByIdForAgencyAdmin(action.payload)

        if (response.status === 200) {
            let certificationsInfo = General.generateDataFromArrayOfObject(CERTIFICATIONS_INFO_MAPPING_KEYS, response.data.certifications)
            let contactsInfo = General.generateDataFromArrayOfObject(REFERENCES_INFO_MAPPING_KEYS, response.data.contacts)
            // let employmentsInfo = General.generateDataFromArrayOfObject(PREVIOUS_EMPLOYMENT_INFO_MAPPING_KEYS, response.data.employments)
            let employmentsInfo = General.generateDataFromArrayOfObjectArray(PREVIOUS_EMPLOYMENT_INFO_MAPPING_KEYS, response.data.employments,{address: PREVIOUS_EMPLOYMENT_ADDRESS_KEY_MAPPING})

            const finalProfessionalInfo = [...certificationsInfo, ...contactsInfo, ...employmentsInfo]
            yield put(setTherapistDetails(response.data))
            yield put(setProfessionalInformation(finalProfessionalInfo))
            yield put(setUploadedDocument(General.groupDataByCategory(response.data.documents)))
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}
function* putTherapiestByIdAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));
        const { id, dataToUpdate, token, agencyId, PaginationState, selectedTherapist } = action.payload;
        const data = {
           
            firstName: dataToUpdate?.firstName?.value,
            // middleName: 'J',
            lastName: dataToUpdate?.lastName?.value,
            Telephone: dataToUpdate?.Telephone?.value.replace(/[-()]/g, ''),
            email: dataToUpdate?.email?.value,
         
            dob: dataToUpdate.dob.value,
            addresses: [

                {
                    
                    addressLine1: dataToUpdate?.addresses[0].addressLine1?.value,
                    addressLine2: dataToUpdate?.addresses[0].addressLine2?.value,
                    // landmark: dataToUpdate?.addressLine1?.value,
                    city: dataToUpdate?.addresses[0].city?.value,
                    state: dataToUpdate?.addresses[0].state?.value,
                    country: dataToUpdate?.addresses[0].country?.value,
                    pinCode: dataToUpdate?.addresses[0].pinCode?.value
                },
            ],
            lastExaminationDate: selectedTherapist?.lastExaminationDate
        };

        const response = yield AdminDataService.putNurseById(id, data, token);

        if (response.status == 200) {
            toast.success('Theapiest Updated successfully');
            yield put(getAllTherapistList({ token, agencyId, status: PaginationState.Status, page: PaginationState.PageNumber, limit: PaginationState.PageSize, firstName: PaginationState.FilterText, lastName: "", role: PaginationState.Role }))
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message[0])

    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY, message: 'Loading...' }));
    }
}

function* rootSaga() {
    yield all([
        takeLatest(getAllTherapistList().type, getAllTherapistListAsync),
        takeLatest(putValidateUserByAgencyAdmin().type, putValidateUserByAgencyAdminAsync),
        takeLatest(getTherapistById().type, getTherapistByIdAsync),
        takeLatest(putTherapiestById().type, putTherapiestByIdAsync)

    ])
}

store.sagaManager.addSaga(componentKey, rootSaga)