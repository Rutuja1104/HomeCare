import * as React from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";
import Button from "../button/Button";
import { BUTTON_TYPE } from "../../libs/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { componentKey,setShowFilterDrawer,setCheckedCheckboxes } from "../../pages/Biller/components/claims/BillerPaientDetailsSlice";

const FILTERS_TYPE = ["Status", "Date", "Location", "Joining Date", "Specialization"];

const FILTERS_OPTIONS = {
    Status: ["Nurse", "HFI", "Physician", "Caregiver", "DSP", "Practice Nurse", "Home Help"]
};

export default function BillerPatientDetailFilter({ setIsOpen }) {
    const { checkedCheckboxes } = useSelector((state) => state[componentKey]);
    const agencyId = localStorage.getItem("agencyId");
    const dispatch = useDispatch();
    const { showFilterDrawer,showNewClaimModal} = useSelector(state => state[componentKey]);
    
    useEffect(() => {
    }, [showFilterDrawer]);

    const [state, setState] = useState({
        right: false
    });

    const [selectedFilterType, setSelectedFilterType] = useState("Status");

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const handleFilterTypeClick = (filterType) => {
        setSelectedFilterType(filterType);
    };

    const handleApplyFilter = () => {
        const activeSelected = checkedCheckboxes['active'];
        const pendingSelected = checkedCheckboxes['pending'];
        const inActiveSelected = checkedCheckboxes['inActive'];
        const transferredSelected = checkedCheckboxes['transferred'];
        const dischargedSelected = checkedCheckboxes['discharged'];

        const selectedStatuses = [];

        if (activeSelected) {
            selectedStatuses.push('active');
        }
        if (pendingSelected) {
            selectedStatuses.push('pending');
        }
        if (inActiveSelected) {
            selectedStatuses.push('inActive');
        }
        if (transferredSelected) {
            selectedStatuses.push('transferred');
        }
        if (dischargedSelected) {
            selectedStatuses.push('discharged');
        }

        if (selectedStatuses.length > 0) {
            // dispatch(setPaginationState({ status: selectedStatuses }));
            // dispatch(
            //     getAllPatients({
            //         agencyId,
            //         pageNumber: PaginationState.pageNumber,
            //         limit: PaginationState.PageSize,
            //         status: selectedStatuses,
            //         search
            //     })
            // );
        } else {
            // dispatch(setPaginationState({ status: '' }));
            // dispatch(
            //     getAllPatients({
            //         agencyId,
            //         pageNumber: PaginationState.pageNumber,
            //         limit: PaginationState.PageSize,
            //         status: '',
            //         search
            //     })
            // );
        }

        dispatch(setShowFilterDrawer())
        // setIsOpen(false);
    };

    const list = () => (
        <Box
            sx={{ width: state.right ? "auto" : 550 }}
            role="presentation"
            onClick={toggleDrawer("right", false)}
            onKeyDown={toggleDrawer("right", false)}
        >
            <div className="drawer">
                <div className="drawer-container">
                    <div className="drawer-title" style={{ padding: "15px" }}>
                        <label style={{ fontSize: "16px" }}>All Filters</label>
                    </div>
                    <div className="filters" style={{ height: "82vh" }}>
                        <div className="filter-types-section">
                            {FILTERS_TYPE.map((i, index) => (
                                <div
                                    className={`${selectedFilterType === i ? "selected" : ""} filter-type2`}
                                    key={index}
                                    onClick={() => handleFilterTypeClick(i)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <span>{i}</span>
                                </div>
                            ))}
                        </div>
                        <div className="filter-options" style={{ width: "70%" }}>
                            {FILTERS_OPTIONS[selectedFilterType] && FILTERS_OPTIONS[selectedFilterType]?.map((item, index) => (
                                <FormGroup key={index}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checkedCheckboxes[item]}
                                                onChange={() => {
                                                    dispatch(
                                                        setCheckedCheckboxes({ [item]: !checkedCheckboxes[item]})
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
                <div className="biller-display-flex2" style={{marginTop:'5%'}}>
                    <Button
                        type="text"
                        variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}
                        className=""
                        onClickCb={() => {
                            dispatch(setCheckedCheckboxes("clear"));
                            // setSelectedCheckboxes((prevCheckboxes) =>
                            //     Object.keys(prevCheckboxes).reduce((acc, item) => {
                            //         acc[item] = false;
                            //         return acc;
                            //     }, {})
                            // );
                        }}
                        styles={{ minWidth: "40%" }}
                    >
                        Clear All
                    </Button>
                    <Button
                        type="text"
                        variant={BUTTON_TYPE.PRIMARY}
                        className=""
                        onClickCb={handleApplyFilter}
                        styles={{ minWidth: "40%" }}
                    >
                        Apply
                    </Button>
                </div>
            </div>
        </Box>
    );

    return (
        <div>
            <React.Fragment key="right">
                <Drawer
                    anchor="right"
                    open={showFilterDrawer}
                    onClose={() => {
                        dispatch(setShowFilterDrawer())
                    }}
                >
                    {list()}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
