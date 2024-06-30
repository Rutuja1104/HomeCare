import store from '../../../../store/store'

import { all, put, takeLatest } from 'redux-saga/effects'
import { PAGE_STATE } from '../../../../libs/constant'
import { componentKey, setAllNurseList, setLoadingState, setNurseDetails, setPaginationState, setProfessionalInformation, setShowDeleteNurseModal, setUploadedDocument } from './InHouseListingSlice'
import { toast } from 'react-toastify'
import { CERTIFICATIONS_INFO_MAPPING_KEYS, PREVIOUS_EMPLOYMENT_ADDRESS_KEY_MAPPING, PREVIOUS_EMPLOYMENT_INFO_MAPPING_KEYS, REFERENCES_INFO_MAPPING_KEYS } from '../../../JobPostings/JobApplicationDetails/constants'

import AdminDataService from '../../../../services/AdminDataService'
import General from '../../../../libs/utility/General'

const token = General.getLocalStorageData("token")

export const { getAllNurseList, putValidateUserByAgencyAdmin, getNurseById, putOfficeStaffById } = {
    getAllNurseList: (payload) => {
        return {
            type: 'IN_HOUSE_STAFF_LIST/GET_ALL_NURSES',
            payload
        }
    },
    putValidateUserByAgencyAdmin: (payload) => {
        return {
            type: 'IN_HOUSE_STAFF_LIST/DEACTIVATE_NURSE',
            payload
        }
    },
    getNurseById: (payload) => {
        return {
            type: 'IN_HOUSE_STAFF_LIST/GET_NURSE_DETAILS_BY_ID_2',
            payload
        }
    },
    putOfficeStaffById:(payload) => {
        return{
            type: "IN_HOUSE_STAFF_LIST/UPDATE",
            payload
        }
    }
}

function* getAllNurseListAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching In House Staff List' }))
        const { token, agencyId, page, limit, status, firstName, lastName, role } = action.payload
        const response = yield AdminDataService.getAllNurseList(token, agencyId, page, limit, status, firstName, lastName, role)

        if (response.status === 200) {
            yield put(setAllNurseList(response?.data?.data))
            yield put(setPaginationState({ totalNurse: response.data.count }))
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY, message: 'Fetching Nurse List' }))
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

            yield put(getAllNurseList({ token, agencyId, status: PaginationState.Status, page: PaginationState.PageNumber, limit: PaginationState.PageSize, firstName: PaginationState.FilterText, lastName: "", role: PaginationState.Role }))
        }
    } catch (error) {
        console.log(error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY, message: 'Loading...' }))
        yield put(setShowDeleteNurseModal(false))
    }
}

function* getNurseByIdAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Nurse Details...' }))
        const response = yield AdminDataService.getUserDetailsByIdForAgencyAdmin(action.payload)

        if (response.status === 200) {
            let certificationsInfo = General.generateDataFromArrayOfObject(CERTIFICATIONS_INFO_MAPPING_KEYS, response.data.certifications)
            let contactsInfo = General.generateDataFromArrayOfObject(REFERENCES_INFO_MAPPING_KEYS, response.data.contacts)
            // let employmentsInfo = General.generateDataFromArrayOfObject(PREVIOUS_EMPLOYMENT_INFO_MAPPING_KEYS, response.data.employments)
            let employmentsInfo = General.generateDataFromArrayOfObjectArray(PREVIOUS_EMPLOYMENT_INFO_MAPPING_KEYS, response.data.employments,{address: PREVIOUS_EMPLOYMENT_ADDRESS_KEY_MAPPING})

            const finalProfessionalInfo = [...certificationsInfo, ...contactsInfo, ...employmentsInfo]
            yield put(setNurseDetails(response.data))
            yield put(setProfessionalInformation(finalProfessionalInfo))
            yield put(setUploadedDocument(General.groupDataByCategory(response.data.documents)))
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}
function* putOfficeStaffByIdAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));
        const { id, dataToUpdate, token, agencyId, PaginationState, selectedNurse } = action.payload;
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
            
            // isNurseSkilled: false,
            lastExaminationDate: selectedNurse?.lastExaminationDate
        };

        const response = yield AdminDataService.putNurseById(id, data, token);

        if (response.status == 200) {
            toast.success('Nurse Updated successfully');
            yield put(
                getAllNurseList({
                    token,
                    agencyId,
                    status: PaginationState.Status,
                    page: PaginationState.PageNumber,
                    limit: PaginationState.PageSize,
                    firstName: PaginationState.FilterText,
                    lastName: '',
                    role: PaginationState.Role
                })
            );
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
        takeLatest(getAllNurseList().type, getAllNurseListAsync),
        takeLatest(putValidateUserByAgencyAdmin().type, putValidateUserByAgencyAdminAsync),
        takeLatest(getNurseById().type, getNurseByIdAsync),
        takeLatest(putOfficeStaffById().type, putOfficeStaffByIdAsync)
    ])
}

store.sagaManager.addSaga(componentKey, rootSaga)