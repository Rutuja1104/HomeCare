import store from '../../store/store';
import { all, put, takeLatest } from 'redux-saga/effects';
import { PAGE_STATE } from '../../libs/constant';
import PhysicianManagementService from '../../services/PhysicianManagementService';
import {
    componentKey,
    setAllPhysicians,
    setCreatePhysician,
    setGetPhysicianById,
    setIsMultiRecord,
    setIsSingleRecord,
    setLoadingState,
    setPaginationState,
    setPhysician
} from './PhysicianManagementSlice';
import { toast } from 'react-toastify';

export const { getAllPhysicians, getPhysicianById, getPhysicianByNameOrNumber, postPhysician, deletePhysicianById, patchUpadatePhysicianById } = {
    getAllPhysicians: (payload) => {
        return {
            type: 'PHYSICIAN_MGT/GET_ALL_PHYSICIANS',
            payload
        };
    },
    getPhysicianById: (payload) => {
        return {
            type: 'PHYSICIAN_MGT/GET_PHYSICIAN_BY_ID',
            payload
        };
    },
    getPhysicianByNameOrNumber: (payload) => {
        return {
            type: 'PHYSICIAN_MGT/GET_PHYSICIAN_BY_NUMBER_OR_NAME',
            payload
        };
    },
    postPhysician: (payload) => {
        return {
            type: 'PHYSICIAN_MGT/CREATE_PHYSICIAN',
            payload
        };
    },
    deletePhysicianById: (payload) => {
        return {
            type: 'PHYSICIAN_MGT/DELETE',
            payload
        };
    },
    patchUpadatePhysicianById: (payload) => {
        return {
            type: 'PHYSICIAN_MGT/UPDATE',
            payload
        };
    }
};
function* getAllPhysiciansAsync(action) {
    try {
        const { agencyId, pageNumber, limit, status, search } = action.payload;
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Physicians List' }));

        const response = yield PhysicianManagementService.getAllPhysicians({
            agencyId,
            limit,
            pageNumber,
            status,
            search
        });

        if (response.status === 200) {
            yield put(setAllPhysicians(response.data.physician));
            yield put(setPaginationState({ totalPhysicians: response.data.totalRecords }));
        }
    } catch (error) {
        console.log('err', error);
        toast.error(error?.response?.data?.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* getPhysicianByIdAsync(action) {
    // const agencyId = General.getLocalStorageData('agencyId');
    const { agencyId, physicianId } = action.payload;
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details' }));
        const response = yield PhysicianManagementService.getPhysicianById({ agencyId, physicianId });
        yield put(setGetPhysicianById(response.data));
    } catch (error) {
        console.log('err', error);
        toast.error(error?.response?.data?.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* getPhysicianByNameOrNumberAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING }));
        const { npi, physicianFirstName, physicianLastName, pageNumber, limit } = action.payload;

        const response = yield PhysicianManagementService.getPhysicianByNameOrNumber({
            params: {
                firstName: physicianFirstName,
                lastName: physicianLastName,
                number: npi,
                pageNumber: pageNumber,
                limit: limit
            }
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
function* postPhysiciansAsync(action) {

    try {
        const { createPhysician, agencyId, pageNumber, limit, search, token } = action.payload;

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
            // billingAddressId: createPhysician.billingAddressId.value,
            // practiceAddressId: createPhysician.practiceAddressId.value
        };

        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details' }));
        const response = yield PhysicianManagementService.postPhysician(agencyId, data,token);
        if (response.status === 201) {
            toast.success('Physician registered successfully!');
            yield put(getAllPhysicians({ agencyId, limit, pageNumber, search }));
        }
     
    } catch (error) {
        console.log('err', error);
        toast.error(error?.response.data.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* deletePhysicianByIdAsync(action) {
    try {
        const { agencyId, physicianId, allPhysicians, pageNumber, limit, search , PaginationState,token} = action.payload;
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Deleting Patient...' }));

        const response = yield PhysicianManagementService.deletePhysicianById(agencyId, physicianId,token);
        if (response.status === 200) {
            toast.success('Physician deleted successfully!');
            yield put(getAllPhysicians({ allPhysicians, agencyId, pageNumber: PaginationState.pageNumber, limit: PaginationState.PageSize,search }));
        }
    } catch (error) {
        console.log('err: ', error);
        toast.error(error?.response?.data?.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* patchUpadatePhysicianByIdAsync(action){
    try {
        const { physicianId, agencyId, PaginationState, limit, dataToUpdate, search,token } = action.payload;

        const data = {
            // NPI: dataToUpdate.NPI.value,
            firstName: dataToUpdate.firstName.value,
            lastName: dataToUpdate.lastName.value,
            primaryEmail: dataToUpdate.primaryEmail.value,
            // secondaryEmail: dataToUpdate.secondaryEmail.value,
            fax: dataToUpdate.fax.value.replace(/[-()]/g, ''),
            contactNumber: dataToUpdate.contactNumber.value.replace(/[-()]/g, '')
            // status: dataToUpdate.status.value,
            // mailingAddress: {
            //     addressLine1: dataToUpdate.mailingAddress.addressLine1.value,
            //     addressLine2: dataToUpdate.mailingAddress.addressLine2.value,
            //     landmark: dataToUpdate.mailingAddress.landmark.value,
            //     city: dataToUpdate.mailingAddress.city.value,
            //     state: dataToUpdate.mailingAddress.state.value,
            //     country: dataToUpdate.mailingAddress.country.value,
            //     pinCode: dataToUpdate.mailingAddress.pinCode.value
            // },
            // primaryAddress: {
            //     addressLine1: dataToUpdate.primaryAddress.addressLine1.value,
            //     addressLine2: dataToUpdate.primaryAddress.addressLine2.value,
            //     landmark: dataToUpdate.primaryAddress.landmark.value,
            //     city: dataToUpdate.primaryAddress.city.value,
            //     state: dataToUpdate.primaryAddress.state.value,
            //     country: dataToUpdate.primaryAddress.country.value,
            //     pinCode: dataToUpdate.primaryAddress.pinCode.value
            // },
            // billingAddressId: dataToUpdate.billingAddressId.value,
            // practiceAddressId: dataToUpdate.practiceAddressId.value
        };

        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Details' }));
        const response = yield PhysicianManagementService.patchUpadatePhysicianById(agencyId, physicianId,data);
        if (response.status === 200) {
            toast.success('Physician updated successfully!');
            yield put(getAllPhysicians({ agencyId,pageNumber: PaginationState.pageNumber, limit: PaginationState.PageSize, search }));
        }
     
    } catch (error) {
        console.log('err', error);
        toast.error(error?.response.data.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* rootSaga() {
    yield all([
        takeLatest(getAllPhysicians().type, getAllPhysiciansAsync),
        takeLatest(getPhysicianById().type, getPhysicianByIdAsync),
        takeLatest(getPhysicianByNameOrNumber().type, getPhysicianByNameOrNumberAsync),
        takeLatest(postPhysician().type, postPhysiciansAsync),
        takeLatest(deletePhysicianById().type, deletePhysicianByIdAsync),
        takeLatest(patchUpadatePhysicianById().type, patchUpadatePhysicianByIdAsync)
    ]);
}

store.sagaManager.addSaga(componentKey, rootSaga);
