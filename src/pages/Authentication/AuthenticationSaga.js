import store from '../../store/store'
import { all, put, takeLatest } from 'redux-saga/effects'
import { PAGE_STATE } from '../../libs/constant'
import AuthenticationService from '../../services/AuthenticationService'
import { componentKey, setClearLoginStates, setLoadingState, setLoginInfoFieldsTouched, setNavigateToHomeFromNewPassword, setNavigateToHomed } from './AuthenticationSlice'
import { toast } from 'react-toastify'
import General from '../../libs/utility/General'

export const { postLoginUserWithCredentials, postSetNewPassword, postForgotPassword, postResetPassword } = {
    postLoginUserWithCredentials: (payload) => {
        return {
            type: 'AUTHENTICATION/LOGIN_API',
            payload
        }
    },
    postSetNewPassword: (payload) => {
        return {
            type: 'AUTHENTICATION/NEW_PASSWORD',
            payload
        }
    },
    postForgotPassword: (payload) => {
        return {
            type: 'AUTHENTICATION/FORGOT_PASSWORD',
            payload
        };
    },
    postResetPassword: (payload) => {
        return {
            type: 'AUTHENTICATION/RESET_PASSWORD',
            payload
        };
    },
}

function* postLoginUserWithCredentialsAsync(action) {
    try {
        const { email, password, isRememberMe } = action.payload
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }))

        var response = yield AuthenticationService.postLoginUserWithCredentials({ email, password })
        const { data: { accessToken, refreshToken } } = response

        General.setDataInLocalStorageWithExpiry("token", accessToken, isRememberMe ? 15 : 1)
        General.setDataInLocalStorageWithExpiry("ref-token", refreshToken, isRememberMe ? 15 : 1)
        General.setDataInLocalStorageWithExpiry("agencyId", General.tokenDecode(accessToken).agencyId, isRememberMe ? 15 : 1)
        General.setDataInLocalStorageWithExpiry("role", General.tokenDecode(accessToken).role.toLowerCase(), isRememberMe ? 15 : 1)
        General.setDataInLocalStorageWithExpiry("userId", General.tokenDecode(accessToken).id, isRememberMe ? 15 : 1)

        yield put(setClearLoginStates())
        yield put(setLoginInfoFieldsTouched(false))
        yield put(setNavigateToHomed(true))
        toast.success("Welcome aboard! You've successfully logged in.")

    } catch (error) {
        toast.error(error?.response?.data?.message?.toString())
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* postSetNewPasswordAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }))

        const { userId, data } = action.payload
        const response = yield AuthenticationService.postSetNewPassword(userId, data)

        if (response.status === 201) {
            toast.success("Password set successfully")
            yield put(setNavigateToHomeFromNewPassword(true))
        }
    } catch (error) {
        toast.error(error?.response?.data?.message?.toString())
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* postForgotPasswordAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'test...' }));
        const { email, navigate } = action.payload;
        const data = {
            email: email
        }

        const response = yield AuthenticationService.postForgotPassword(data);
        if (response.status === 201) {
            toast.success(response?.data?.message);
            navigate?.('/login')
        }
    } catch (error) {
        console.log('err: ', error);
        toast.error(error?.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* postResetPasswordAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }))

        const { userId, data, navigate } = action.payload

        const response = yield AuthenticationService.postResetPassword(userId, data)

        if (response.status === 201) {
            toast.success("Password set successfully");
            navigate?.('/login')
        }
    } catch (error) {
        toast.error(error?.response?.data?.message?.toString())
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* rootSaga() {
    yield all([
        takeLatest(postLoginUserWithCredentials().type, postLoginUserWithCredentialsAsync),
        takeLatest(postSetNewPassword().type, postSetNewPasswordAsync),
        takeLatest(postForgotPassword().type, postForgotPasswordAsync),
        takeLatest(postResetPassword().type, postResetPasswordAsync)
    ])
}

store.sagaManager.addSaga(componentKey, rootSaga)