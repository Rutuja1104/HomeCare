import store from '../../../store/store'
import { PAGE_STATE } from '../../../libs/constant'

export const componentKey = 'NURSE_MANAGEMENT/AGENCY_ADMIN'

const { actions } = store.reducerManager.add({
    key: componentKey,
    addedReducers: {
        setLoadingState: (state, action) => {
            state.loadingState = action.payload
        },

        setS3UploadedDocumentList: (state, action) => {
            state.setS3UploadedDocumentList = action.payload
        },

    },
    initialReducerState: {
        loadingState: { state: PAGE_STATE.PAGE_READY, message: '' },
        setS3UploadedDocumentList: [],

    }
})

export const { setLoadingState, setS3UploadedDocumentList } = actions