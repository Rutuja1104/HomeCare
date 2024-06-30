import { PAGE_STATE } from '../../../libs/constant'
import store from '../../../store/store'

export const componentKey = 'LOADER/DATA_LOADER'

const { actions } = store.reducerManager.add({
    key: componentKey,
    addedReducers: {
        setLoadingState: (state, action) => {
            state.loadingState = action.payload
        },
        setStatesList: (state, action) => {
            state.statesList = action.payload;
        },
        setProfessionalRoles: (state, action) => {
            state.professionalRoles = action.payload
        },
        setAgencyDetail: (state, action) => {
            state.agencyDetail = action.payload
        }
    },
    initialReducerState: {
        loadingState: { state: PAGE_STATE.PAGE_READY, message: '' },
        statesList: [],
        professionalRoles: [],
        agencyDetail: {},
    }
})

export const { setLoadingState, setStatesList, setProfessionalRoles, setAgencyDetail } = actions

