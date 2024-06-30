import store from '../../store/store';
import { PAGE_STATE } from '../../libs/constant';

export const componentKey = 'AUTHENTICATION';

const { actions } = store.reducerManager.add({
    key: componentKey,
    addedReducers: {
        setLoadingState: (state, action) => {
            state.loadingState = action.payload;
        },
        setLoginInfoFieldsTouched: (state, action) => {
            state.loginInfoFieldsTouched = action.payload;
        },
        setAuthenticationDetails: (state, action) => {
            const { filedName, object } = action.payload;
            let authenticationDetails = { ...state.authenticationDetails[filedName] };

            Object.entries(object).map(([key, value]) => {
                authenticationDetails = {
                    ...authenticationDetails,
                    [key]: {
                        ...authenticationDetails[key],
                        ...value
                    }
                };

                state.authenticationDetails[filedName] = authenticationDetails;
            });
        },
        setNavigateToHomed: (state, action) => {
            state.navigateToHome = action.payload;
        },
        setNewPasswordInfoFieldsTouched: (state, action) => {
            state.newPasswordInfoFieldsTouched = action.payload;
        },
        setNavigateToHomeFromNewPassword: (state, action) => {
            state.navigateToHomeFromNewPassword = action.payload;
        },
        setIsRememberMe: (state, action) => {
            state.isRememberMe = action.payload;
        },
        setIsLogout: (state, action) => {
            state.isLogout = action.payload;
        },
        setClearLoginStates: (state, action) => {
            state.authenticationDetails.loginTextFields = {
                email: { value: '', errors: {}, rules: { required: true } },
                password: { value: '', errors: {}, rules: { required: true } }
            }
        }
    },
    initialReducerState: {
        loadingState: { state: PAGE_STATE.PAGE_READY, message: '' },
        loginInfoFieldsTouched: false,
        newPasswordInfoFieldsTouched: false,
        navigateToHome: false,
        navigateToHomeFromNewPassword: false,
        isRememberMe: false,
        isLogout: false,
        authenticationDetails: {
            loginTextFields: {
                email: { value: '', errors: {}, rules: { required: true } },
                password: { value: '', errors: {}, rules: { required: true } }
            },
            newPassword: {
                password: {
                    value: '',
                    errors: {},
                    rules: {
                        required: true,
                        regex: {
                            pattern: /\d+.+?/g,
                            message: 'One lowercase, uppercase, number, special, character, at least 8.'
                        }
                    }
                }, // eslint-disable-line no-useless-escape
                confirmPassword: { value: '', errors: {}, rules: { required: true } }
            }
        }
    }
});

export const {
    setLoadingState,
    setLoginInfoFieldsTouched,
    setAuthenticationDetails,
    setNavigateToHomed,
    setNewPasswordInfoFieldsTouched,
    setNavigateToHomeFromNewPassword,
    setIsRememberMe,
    setIsLogout,
    setClearLoginStates
} = actions;
