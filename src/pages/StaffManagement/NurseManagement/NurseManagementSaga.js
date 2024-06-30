import store from '../../../store/store'
import { all, put, takeLatest } from 'redux-saga/effects'
import { PAGE_STATE } from '../../../libs/constant'
import { componentKey, setLoadingState } from './NurseManagementSlice'
import { toast } from 'react-toastify'
import DocumentUploadService from '../../../services/DocumentUploadService'

export const { getDocumentFromS3Bucket } = {
    getDocumentFromS3Bucket: (payload) => {
        return {
            type: 'NURSE_MANAGEMENT/GET_DOCUMENT_FROM_S3_BUCKET_1',
            payload
        }
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

function* rootSaga() {
    yield all([
        takeLatest(getDocumentFromS3Bucket().type, getDocumentFromS3BucketAsync),
    ])
}

store.sagaManager.addSaga(componentKey, rootSaga)