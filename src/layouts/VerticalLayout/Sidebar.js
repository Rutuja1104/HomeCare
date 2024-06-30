import React, { useEffect } from 'react';
import SimpleBar from 'simplebar-react';

import { Container } from 'reactstrap';
import { NavigateBefore } from '@mui/icons-material';
import { VEC_ICON_NAME } from '../../components/icon/constants';

import VerticalLayout from '.';
import Icons from '../../components/icon/Icon';
import BasicModal from '../../components/modal/Modal';
import { componentKey, setIsLogout } from '../../pages/Authentication/AuthenticationSlice';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/button/Button';
import { BUTTON_TYPE } from '../../libs/constant';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../components/models/ConfirmationModal';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLogout } = useSelector((state) => state[componentKey]);
    const toggleMenu = () => {
        document.querySelector('.navbar-menu')?.classList?.remove('show-narbar-menu');
        document.querySelector('.page-content')?.classList?.remove('add-opacity');
        document.querySelector('#page-topbar')?.classList?.remove('add-opacity');
    };

    const handleLogout = () => {
        dispatch(setIsLogout(false));
        localStorage.clear();
        navigate('/login');
    };


    return (
        <React.Fragment>
            <div className="app-menu navbar-menu">
                <SimpleBar className="h-100">
                    <Container fluid className="p-0">
                        <div className="navbar-brand-box">
                            <div className="logo">
                                <Icons iconName={VEC_ICON_NAME.DUMMY_LOGO} />
                                <p className="logo">CareGivers</p>
                            </div>
                            <div onClick={toggleMenu} className="close-sidebar-icon">
                                <NavigateBefore />
                            </div>
                        </div>
                        <ul className="navbar-nav" id="navbar-nav">
                            <VerticalLayout />
                        </ul>
                    </Container>
                </SimpleBar>
                <ConfirmationModal
                    isOpen={isLogout}
                    bodyContent='Do you want to logout!'
                    header="Are you sure ?"
                    successButtonText="Logout"
                    toggle={() => dispatch(setIsLogout(!isLogout))}
                    onSuccessCb={() => {
                        localStorage.clear()
                        navigate("/login")
                    }}
                />
            </div>
        </React.Fragment>
    );
};

export default Sidebar;
