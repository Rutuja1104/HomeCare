import store from '../../../store/store'
import { all, put, takeLatest } from 'redux-saga/effects'
import { componentKey, setLoadingState, setProfessionalRoles, setAgencyDetail } from './DataLoaderSlice'
import { PAGE_STATE } from '../../../libs/constant'
import AdminDataService from '../../../services/AdminDataService'

export const { getProfessionalRoles, getAgencyDetailsById } = {
    getProfessionalRoles: (payload) => {
        return {
            type: 'PROFESSIONAL_ROLE/DATA_LOADER',
            payload
        }
    },
    getAgencyDetailsById: (payload) => {
        return {
            type: 'GET_AGENCY_BY_NAME',
            payload
        }
    }
}

function* getProfessionalRolesAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING }))

        const response = yield AdminDataService.getProfessionalRoles(action.payload)
        if (response.status == 200) {
            const filteredData = response.data.map(item => ({ ...item, label: item.name, value: item.name }))
            yield put(setProfessionalRoles(filteredData))
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}


function* getAgencyDetailsByIdAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING }))

        const response = yield AdminDataService.getAgencyDetailsById(action.payload)
        if (response.status == 200) {
            yield put(setAgencyDetail(response.data))
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* rootSaga() {
    yield all([
        takeLatest(getProfessionalRoles().type, getProfessionalRolesAsync),
        takeLatest(getAgencyDetailsById().type, getAgencyDetailsByIdAsync)
    ])
}

store.sagaManager.addSaga(componentKey, rootSaga)