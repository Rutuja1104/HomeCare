import React, { useEffect } from 'react';
import Heading from '../../../components/heading/Heading';
import { HEADING } from '../../../components/heading/constants/constants';
import TextInput from '../../../components/input/textinput/TextInput';
import CheckboxWLabel from '../../../components/checkbox/checkboxwlabel/CheckboxWLabel';
import { BUTTON_TYPE } from '../../../libs/constant';
import Button from '../../../components/button/Button';
import Icons from '../../../components/icon/Icon';
import { VEC_ICON_NAME } from '../../../components/icon/constants';
import { useDispatch, useSelector } from 'react-redux';
import { componentKey, setAuthenticationDetails, setIsLogout, setIsRememberMe, setLoginInfoFieldsTouched, setNavigateToHomed } from '../AuthenticationSlice';
import Loadable from '../../../components/loadable/Loadable';
import GeneralValidator, { generalValidator } from '../../../libs/utility/validators/GeneralValidator';
import { postLoginUserWithCredentials } from '../AuthenticationSaga';
import { useNavigate,Link } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loadingState, authenticationDetails, loginInfoFieldsTouched, navigateToHome, isRememberMe } = useSelector((state) => state[componentKey]);

    useEffect(() => {
        if (navigateToHome) {
            navigate('/home');
        }
    }, [navigateToHome]);

    const handleLoginClick = () => {
        dispatch(setLoginInfoFieldsTouched(true));
        dispatch(setIsLogout(false))
        if (!GeneralValidator.validateRequiredFields(authenticationDetails.loginTextFields)) {
            dispatch(
                postLoginUserWithCredentials({
                    email: authenticationDetails?.loginTextFields?.email.value,
                    password: authenticationDetails?.loginTextFields?.password.value,
                    isRememberMe
                })
            );
        }
    };

    const handleKeyPress = (event) => {
        if (event.key == "Enter") {
            handleLoginClick()
        }
    }

    const onChangeHandler = (event, rules) => {
        const { name, value } = event.target;

        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(
                setAuthenticationDetails({ object: { [name]: { value, errors, rules } }, filedName: 'loginTextFields' })
            );
        } else {
            dispatch(setAuthenticationDetails({ object: { [name]: { value } }, filedName: 'loginTextFields' }));
        }
    };

    return (
        <Loadable loadingStates={loadingState.state} loadingMessage={loadingState.message}>
            <div className="login-container">
                <div className="first-image">
                    <Icons iconName={VEC_ICON_NAME.VECTOR_ICON} />
                </div>
                <div className="login-details">
                    <Heading type={HEADING.H1}>Log in to your account</Heading>
                    <Heading type={HEADING.H5} customStyle={{ marginBottom: '10px' }}>
                        Welcome! Please enter your details.
                    </Heading>
                    <TextInput
                        type="email"
                        placeHolder={'Enter email address'}
                        name="email"
                        label="Email"
                        value={authenticationDetails?.loginTextFields?.email.value}
                        rules={authenticationDetails?.loginTextFields?.email.rules}
                        errors={authenticationDetails?.loginTextFields?.email.errors}
                        formSubmitted={loginInfoFieldsTouched}
                        onChangeCb={onChangeHandler}
                        onKeyPress={handleKeyPress}
                    />
                    <TextInput
                        type="password"
                        placeHolder={'Please enter password'}
                        name="password"
                        label="Password"
                        value={authenticationDetails?.loginTextFields?.password.value}
                        rules={authenticationDetails?.loginTextFields?.password.rules}
                        errors={authenticationDetails?.loginTextFields?.password.errors}
                        formSubmitted={loginInfoFieldsTouched}
                        onChangeCb={onChangeHandler}
                        onKeyPress={handleKeyPress}
                    />
                    <div className="row-container mb-5">
                        <CheckboxWLabel
                            checked={isRememberMe}
                            label="Remember Me"
                            name="isRememberMe"
                            onChangeCb={() => dispatch(setIsRememberMe(!isRememberMe))}
                            value={isRememberMe}
                        />
                        <Link to="/forgot-password" className="emailLink">
                            Forgot Password?
                        </Link>
                    </div>
                    <Button
                        variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}
                        onClickCb={handleLoginClick}
                        className="login-button"
                    >
                        Login{' '}
                    </Button>
                </div>
                <div className="second-image">
                    <Icons iconName={VEC_ICON_NAME.VECTOR_ICON} style={{ rotate: '180deg' }} />
                </div>
            </div>
        </Loadable>
    );
};

export default Login;
