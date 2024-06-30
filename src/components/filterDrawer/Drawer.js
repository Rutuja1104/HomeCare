import * as React from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useState } from 'react';
import Button from '../button/Button';
import { BUTTON_TYPE } from '../../libs/constant';
import { getAllPatients } from '../../pages/PatientManagement/referral-intake/PatientManagementSaga';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    componentKey,
    setCheckedCheckboxes,
    setPaginationState,
    setStatus
} from '../../pages/PatientManagement/referral-intake/PatientManagementSlice';
import General from '../../libs/utility/General';

const FILTERS_TYPE = ['Status'];

const FILTERS_OPTIONS = {
    Status: ['Active', 'Pending', 'InActive', 'Transferred', 'Discharged']
};

export default function FilterDrawer({ isOpen, onClose, onStatus, setIsOpen }) {
    const { PaginationState, search, status, checkedCheckboxes } = useSelector((state) => state[componentKey]);
    const agencyId = General.getLocalStorageData('agencyId');
    const token = General.getLocalStorageData("token")

    const dispatch = useDispatch();

    const [state, setState] = useState({
        right: false
    });
    const [selectedFilterType, setSelectedFilterType] = useState('Status');

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const handleFilterTypeClick = (filterType) => {
        setSelectedFilterType(filterType);
    };

    const handleApplyFilter = () => {
        const activeSelected = checkedCheckboxes['Active'];
        const pendingSelected = checkedCheckboxes['Pending'];
        const inActiveSelected = checkedCheckboxes['InActive'];
        const transferredSelected = checkedCheckboxes['Transferred'];
        const dischargedSelected = checkedCheckboxes['Discharged'];

        const selectedStatuses = [];

        if (activeSelected) {
            selectedStatuses.push('Active');
        }
        if (pendingSelected) {
            selectedStatuses.push('Pending');
        }
        if (inActiveSelected) {
            selectedStatuses.push('InActive');
        }
        if (transferredSelected) {
            selectedStatuses.push('Transferred');
        }
        if (dischargedSelected) {
            selectedStatuses.push('Discharged');
        }

        if (selectedStatuses.length > 0) {
            dispatch(setPaginationState({ status: selectedStatuses }));
            dispatch(
                getAllPatients({
                    agencyId,
                    pageNumber: PaginationState.pageNumber,
                    limit: PaginationState.PageSize,
                    status: selectedStatuses,
                    search,
                    token
                })
            );
        } else {
            dispatch(setPaginationState({ status: '' }));
            dispatch(
                getAllPatients({
                    token,
                    agencyId,
                    pageNumber: PaginationState.pageNumber,
                    limit: PaginationState.PageSize,
                    status: '',
                    search
                })
            );
        }
        setIsOpen(false);
    };

    const list = () => (
        <Box
            sx={{ width: state.right ? 'auto' : 550 }}
            role="presentation"
            onClick={toggleDrawer('right', false)}
            onKeyDown={toggleDrawer('right', false)}
        >
            <div className="drawer">
                <div className="drawer-container">
                    <div className="drawer-title">
                        <h4>All Filters</h4>
                    </div>
                    <div className="filters">
                        <div className="filter-types-section">
                            {FILTERS_TYPE.map((i, index) => (
                                <div
                                    className={`${selectedFilterType === i ? 'selected' : ''} filter-type`}
                                    key={index}
                                    onClick={() => handleFilterTypeClick(i)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <span>{i}</span>
                                </div>
                            ))}
                        </div>
                        <div className="filter-options">
                            {FILTERS_OPTIONS[selectedFilterType].map((item, index) => (
                                <FormGroup key={index}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checkedCheckboxes[item]}
                                                onChange={() => {
                                                    dispatch(
                                                        setCheckedCheckboxes({ [item]: !checkedCheckboxes[item] })
                                                    );
                                                }}
                                            />
                                        }
                                        label={item}
                                    />
                                </FormGroup>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="button-section">
                    <Button
                        type="text"
                        variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}
                        className=""
                        onClickCb={() => {
                            dispatch(setCheckedCheckboxes('clear'));
                            setIsOpen(false);
                            dispatch(
                                getAllPatients({
                                    agencyId,
                                    pageNumber: PaginationState.pageNumber,
                                    limit: PaginationState.PageSize,
                                    status: 'Active',
                                    search,
                                    token
                                })
                            );
                            // setSelectedCheckboxes((prevCheckboxes) =>
                            //     Object.keys(prevCheckboxes).reduce((acc, item) => {
                            //         acc[item] = false;
                            //         return acc;
                            //     }, {})
                            // );
                        }}
                    >
                        Clear All
                    </Button>
                    <Button type="text" variant={BUTTON_TYPE.PRIMARY} className="" onClickCb={handleApplyFilter}>
                        Apply
                    </Button>
                </div>
            </div>
        </Box>
    );

    return (
        <div>
            <React.Fragment key="right">
                <Drawer anchor="right" open={isOpen} onClose={onClose}>
                    {list()}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
