import React, { useState } from 'react';
import Heading from '../../../components/heading/Heading';
import { HEADING } from '../../../components/heading/constants/constants';
import TextInput from '../../../components/input/textinput/TextInput';
import { BUTTON_TYPE } from '../../../libs/constant';
import Button from '../../../components/button/Button';
import Icons from '../../../components/icon/Icon';
import { VEC_ICON_NAME } from '../../../components/icon/constants';
import { Link, useNavigate } from 'react-router-dom';
import { postForgotPassword } from '../AuthenticationSaga';
import { useDispatch } from 'react-redux';
import General from '../../../libs/utility/General';


const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const agencyId = General.getLocalStorageData('agencyId');
    const [email, setEmail] = useState('');
    const handleForgotPasswordClick = () => {
        dispatch(
            postForgotPassword({
                agencyId,
                email,
                navigate
            })
        );
    };

    return (
        <React.Fragment>
            <div className='login-container'>
                <div className='first-image'>
                    <Icons iconName={VEC_ICON_NAME.VECTOR_ICON} />
                </div>
                <div className='login-details'>
                    <Heading type={HEADING.H1}>Forgot Password</Heading>
                    <Heading type={HEADING.H5}>Welcome! Please enter your details.</Heading>
                    <TextInput
                        type="text"
                        placeHolder={'Enter email address'}
                        name="email"
                        label="Email"
                        value={email}
                        onChangeCb={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                    <Button variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER} className="login-button" onClickCb={handleForgotPasswordClick}>Submit </Button>
                    <div className="row-container">
                        <Link to="/login" className="emailLink">
                            <Icons iconName={VEC_ICON_NAME.ICON_LEFT} /> Back to Login
                        </Link>
                    </div>
                </div>
                <div className='second-image'>
                    <Icons iconName={VEC_ICON_NAME.VECTOR_ICON} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default ForgotPassword
