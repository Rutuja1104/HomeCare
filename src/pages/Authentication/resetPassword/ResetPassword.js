import React, { useEffect, useState } from 'react'
import Heading from '../../../components/heading/Heading';
import { HEADING } from '../../../components/heading/constants/constants';
import TextInput from '../../../components/input/textinput/TextInput';
import { BUTTON_TYPE } from '../../../libs/constant';
import Button from '../../../components/button/Button';
import Icons from '../../../components/icon/Icon';
import { VEC_ICON_NAME } from '../../../components/icon/constants';
import { useDispatch, useSelector } from 'react-redux';
import { componentKey, setAuthenticationDetails, setNewPasswordInfoFieldsTouched } from '../AuthenticationSlice';
import GeneralValidator, { generalValidator } from '../../../libs/utility/validators/GeneralValidator';
import ErrorsList from '../../../components/input/errorslist/ErrorsList';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { postResetPassword } from '../AuthenticationSaga';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const [isPasswordMatched, setIsPasswordMatched] = useState(false)
    const [searchParams] = useSearchParams();

    const { userId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { authenticationDetails, newPasswordInfoFieldsTouched, navigateToHomeFromNewPassword } = useSelector(state => state[componentKey])

    useEffect(() => {
        if (navigateToHomeFromNewPassword) {
            navigate("/home")
        }
    }, [navigateToHomeFromNewPassword])

    const onChangeHandler = (event, rules) => {
        const { name, value } = event.target;

        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(setAuthenticationDetails({ object: { [name]: { value, errors, rules } }, filedName: "newPassword" }));
        }
        else {
            dispatch(setAuthenticationDetails({ object: { [name]: { value } }, filedName: "newPassword" }));
        }
    };

    useEffect(() => {
        if (authenticationDetails?.newPassword?.confirmPassword?.value !== authenticationDetails?.newPassword?.password?.value) {
            setIsPasswordMatched(true)
        } else {
            setIsPasswordMatched(false)
        }
    }, [authenticationDetails?.newPassword])

    const handleResetPasswordClick = () => {
        dispatch(setNewPasswordInfoFieldsTouched(true))

        if (isPasswordMatched) {
            toast.error("Password and confirm password does not matched")
            return
        }

        if (!GeneralValidator.validateRequiredFields(authenticationDetails.newPassword)) {
            dispatch(postResetPassword({ userId, data: { password: authenticationDetails?.newPassword?.password?.value, confirmPassword: authenticationDetails?.newPassword?.confirmPassword?.value }, navigate }))
        }
    }

    return (
        <React.Fragment>
            <div className='login-container'>
                <div className='first-image'>
                    <Icons iconName={VEC_ICON_NAME.VECTOR_ICON} />
                </div>
                <div className='login-details'>
                    <Heading type={HEADING.H1}>Reset Your Password</Heading>
                    <Heading type={HEADING.H5}>Welcome! Please enter your details.</Heading>
                    <TextInput
                        type="password"
                        name="password"
                        label="New Password"
                        placeHolder="Enter New Password"
                        value={authenticationDetails?.newPassword?.password.value}
                        rules={authenticationDetails?.newPassword?.password.rules}
                        errors={authenticationDetails?.newPassword?.password.errors}
                        formSubmitted={newPasswordInfoFieldsTouched}
                        onChangeCb={onChangeHandler}
                    />
                    <TextInput
                        type="password"
                        placeHolder="Enter Confirm Password"
                        name="confirmPassword"
                        label="Confirm Password"
                        value={authenticationDetails?.newPassword?.confirmPassword?.value}
                        rules={authenticationDetails?.newPassword?.confirmPassword?.rules}
                        errors={authenticationDetails?.newPassword?.confirmPassword?.errors}
                        formSubmitted={newPasswordInfoFieldsTouched}
                        onChangeCb={onChangeHandler}
                    />

                    {/* {isPasswordMatched &&
                        <div className='mb-2'>
                            <ErrorsList errors={{ errors: "Password and confirm password does not match" }} />
                        </div>
                    } */}
                    <Button variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER} className="login-button" onClickCb={handleResetPasswordClick} >Change</Button>
                </div>
                <div className='second-image'>
                    <Icons iconName={VEC_ICON_NAME.VECTOR_ICON} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default ResetPassword