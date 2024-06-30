import store from '../../../../store/store'
import { all, put, takeLatest } from 'redux-saga/effects'
import { PAGE_STATE } from '../../../../libs/constant'
import AdminDataService from '../../../../services/AdminDataService'
import { componentKey, setLoadingState, setPaginationState, setProfessionalInformation, setShowDeleteOtherRoleModal, setUploadedDocument, setAllOtherRoleList, setOtherRoleDetails } from './OtherRoleListingSlice'
import { toast } from 'react-toastify'
import General from '../../../../libs/utility/General'
import { CERTIFICATIONS_INFO_MAPPING_KEYS, PREVIOUS_EMPLOYMENT_ADDRESS_KEY_MAPPING, PREVIOUS_EMPLOYMENT_INFO_MAPPING_KEYS, REFERENCES_INFO_MAPPING_KEYS } from '../../../JobPostings/JobApplicationDetails/constants'

const token = General.getLocalStorageData("token")

export const { getAllOtherRoleList, putValidateUserByAgencyAdmin, getOtherRoleById, putOtherRoleById } = {
    getAllOtherRoleList: (payload) => {
        return {
            type: 'OTHER_ROLE_LISTING/GET_ALL_OTHER_ROLES',
            payload
        }
    },
    putValidateUserByAgencyAdmin: (payload) => {
        return {
            type: 'OTHER_ROLE_LISTING/DEACTIVATE_NURSE',
            payload
        }
    },
    getOtherRoleById: (payload) => {
        return {
            type: 'OTHER_ROLE_LISTING/GET_NURSE_DETAILS_BY_ID',
            payload
        }
    },
    putOtherRoleById: (payload) => {
        return {
            type: 'OTHER_ROLE_LISTING/UPDATE_OTHER_ROLE',
            payload
        };
    }

}

function* getAllOtherRoleListAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching HHA and MSW List...' }))
        const { token, agencyId, page, limit, status, firstName, lastName, role } = action.payload
        const response = yield AdminDataService.getAllNurseList(token, agencyId, page, limit, status, firstName, lastName, role)

        if (response.status === 200) {
            yield put(setAllOtherRoleList(response?.data?.data))
            yield put(setPaginationState({ totalNurse: response.data.count }))
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
        const { nurseId, data, token, agencyId, PaginationState } = action.payload
        const response = yield AdminDataService.putValidateUserApplication(nurseId, data, token)

        if (response.status == 200) {
            if (data.onboardingStatus !== "Active") {
                toast.success("User De-activated successfully!")
            } else {
                toast.success("User activated successfully!")
            }

            yield put(getAllOtherRoleList({ token, agencyId, status: PaginationState.Status, page: PaginationState.PageNumber, limit: PaginationState.PageSize, firstName: PaginationState.FilterText, lastName: "", role: PaginationState.Role }))
        }
    } catch (error) {
        console.log(error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY, message: 'Loading...' }))
        yield put(setShowDeleteOtherRoleModal(false))
    }
}

function* getOtherRoleByIdAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Nurse Details...' }))
        const response = yield AdminDataService.getUserDetailsByIdForAgencyAdmin(action.payload)

        if (response.status === 200) {
            let certificationsInfo = General.generateDataFromArrayOfObject(CERTIFICATIONS_INFO_MAPPING_KEYS, response.data.certifications)
            let contactsInfo = General.generateDataFromArrayOfObject(REFERENCES_INFO_MAPPING_KEYS, response.data.contacts)
            // let employmentsInfo = General.generateDataFromArrayOfObject(PREVIOUS_EMPLOYMENT_INFO_MAPPING_KEYS, response.data.employments)
            let employmentsInfo = General.generateDataFromArrayOfObjectArray(PREVIOUS_EMPLOYMENT_INFO_MAPPING_KEYS, response.data.employments,{address: PREVIOUS_EMPLOYMENT_ADDRESS_KEY_MAPPING})

            const finalProfessionalInfo = [...certificationsInfo, ...contactsInfo, ...employmentsInfo]
            yield put(setOtherRoleDetails(response.data))
            yield put(setProfessionalInformation(finalProfessionalInfo))
            yield put(setUploadedDocument(General.groupDataByCategory(response.data.documents)))
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}
function* putOtherRoleByIdAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));
        const { id, dataToUpdate, token, agencyId, PaginationState, selectedOtherRole } = action.payload;
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
            lastExaminationDate: selectedOtherRole?.lastExaminationDate
        };

        const response = yield AdminDataService.putNurseById(id, data, token);

        if (response.status == 200) {
            toast.success('Updated successfully');
            yield put(getAllOtherRoleList({ token, agencyId, status: PaginationState.Status, page: PaginationState.PageNumber, limit: PaginationState.PageSize, firstName: PaginationState.FilterText, lastName: "", role: PaginationState.Role }))
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
        takeLatest(getAllOtherRoleList().type, getAllOtherRoleListAsync),
        takeLatest(putValidateUserByAgencyAdmin().type, putValidateUserByAgencyAdminAsync),
        takeLatest(getOtherRoleById().type, getOtherRoleByIdAsync),
        takeLatest(putOtherRoleById().type, putOtherRoleByIdAsync)
    ])
}

store.sagaManager.addSaga(componentKey, rootSaga)