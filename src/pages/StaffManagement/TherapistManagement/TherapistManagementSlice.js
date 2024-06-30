import store from '../../../store/store'
import { PAGE_STATE } from '../../../libs/constant'

export const componentKey = 'THERAPIST_MANAGEMENT/AGENCY_ADMIN'

const { actions } = store.reducerManager.add({
    key: componentKey,
    addedReducers: {
        setLoadingState: (state, action) => {
            state.loadingState = action.payload
        },
    },
    initialReducerState: {
        loadingState: { state: PAGE_STATE.PAGE_READY, message: '' },

    }
})

export const { setLoadingState } = actions