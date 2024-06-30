import { PAGE_STATE } from "../../../libs/constant"
import store from "../../../store/store"

export const componentKey = 'EPISODE_MANAGEMENT_ADMIN'

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