import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import Button from "../button/Button";
import { BUTTON_TYPE } from "../../libs/constant";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import TextInput from "../input/textinput/TextInput";
import DatePicker from "../datePicker/DatePicker";
import PayerContractsCard from "../../pages/Biller/components/PayerContractsCard";
import { componentKey } from "../../pages/Biller/components/claims/BillerPaientDetailsSlice";

export default function NewContract({ isOpen, onClose, onChangeCb = () => {}, allRequiredFieldsTouched = false }) {
    const [newContractData, setNewContractData] = useState([]);
    const [state, setState] = useState({
        right: false
    });

    const { newContract } = useSelector((state) => state[componentKey]);

    useEffect(() => {
        const newContractData = [
            { title: "G0151 - Physical Therapy", showMore: false, name: { base: "G0151Base", unit: "G0151Unit" } },
            { title: "G0152 - Occupational Therapy", showMore: false, name: { base: "G0152Base", unit: "G0152Unit" } },
            { title: "G0153 - Speech Therapy", showMore: false, name: { base: "G0153Base", unit: "G0153Unit" } },
            { title: "G0154 - (LPN)", showMore: false, name: { base: "G0154LpnBase", unit: "G0154LpnUnit" } },
            { title: "G0154 - (RN)", showMore: false, name: { base: "G0154RnBase", unit: "G0154RnUnit" } },
            {
                title: "G0156 - Aide, Medicare Certified Agency",
                showMore: false,
                name: { base: "G0156Base", unit: "G0156Unit" }
            },
            {
                title: "G0299 - RN Direct skilled nursing services",
                showMore: false,
                name: { base: "G0299Base", unit: "G0299Unit" }
            },
            {
                title: "G0300 - LPN Direct skilled nursing services",
                showMore: false,
                name: { base: "G0300Base", unit: "G0300Unit" }
            },
            {
                title: "S0215 - Supplemental Transportation",
                showMore: false,
                name: { base: "S0215Base", unit: "S0215Unit" }
            },
            {
                title: "S5101 - Day Care Services per ½ day",
                showMore: false,
                name: { base: "S5101Unit", unit: "S5101Base" }
            },
            {
                title: "S5102 - Day Care Services per full day",
                showMore: false,
                name: { base: "S5102Base", unit: "S5102Unit" }
            },
            {
                title: "S5170 - Delivered meal services - therapeutic or kosher meal",
                showMore: false,
                name: { base: "S5170Base", unit: "S5170Unit" }
            }
        ];
        setNewContractData(newContractData);
    }, []);

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setState({ ...state, [anchor]: isOpen });
    };

    const handleSave = () => {
        onClose();
    };

    const onClickCb = (index) => {
        setNewContractData(
            newContractData.map((value, i) => (index == i ? { ...value, showMore: !value.showMore } : value))
        );
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
                        <label style={{ fontSize: "16px" }}>New Contract</label>
                    </div>
                    <div className="biller-new-contract">
                        <TextInput
                            type="number"
                            placeHolder=""
                            name="provideNpi"
                            label="Provider NPI"
                            onChangeCb={onChangeCb}
                            value={newContract?.provideNpi?.value}
                            rules={newContract?.provideNpi?.rules}
                            errors={newContract?.provideNpi?.errors}
                            formSubmitted={allRequiredFieldsTouched}
                        />
                        <div className="biller-display-flex">
                            <DatePicker
                                label="Begin Date"
                                name="beginDate"
                                onChangeCb={onChangeCb}
                                value={newContract?.beginDate?.value}
                                rules={newContract?.beginDate?.rules}
                                errors={newContract?.beginDate?.errors}
                                formSubmitted={allRequiredFieldsTouched}
                            />
                            <DatePicker
                                label="End Date"
                                name="endDate"
                                onChangeCb={onChangeCb}
                                value={newContract?.endDate?.value}
                                rules={newContract?.endDate?.rules}
                                errors={newContract?.endDate?.errors}
                                formSubmitted={allRequiredFieldsTouched}
                            />
                        </div>
                        {newContractData.map((innerValue, index) => {
                            return (
                                <>
                                    <PayerContractsCard
                                        style={{ borderRadios: "10px" }}
                                        header={innerValue.title}
                                        showCustom={true}
                                        key={index}
                                        onClickCb={() => {
                                            onClickCb(index);
                                        }}
                                    >
                                        {innerValue.showMore && (
                                            <div className="biller-card-item biller-outer-border2">
                                                <div className="biller-display-flex">
                                                    <TextInput
                                                        type="number"
                                                        placeHolder=""
                                                        label="Base"
                                                        name={innerValue.name.base}
                                                        onChangeCb={onChangeCb}
                                                        value={newContract?.[innerValue.name.base].value}
                                                        rules={newContract?.[innerValue.name.base].rules}
                                                        errors={newContract?.[innerValue.name.base].errors}
                                                        formSubmitted={allRequiredFieldsTouched}
                                                    />
                                                    <TextInput
                                                        type="number"
                                                        placeHolder=""
                                                        name={innerValue.name.unit}
                                                        onChangeCb={onChangeCb}
                                                        label="Unit"
                                                        value={newContract?.[innerValue.name.unit]?.value}
                                                        rules={newContract?.[innerValue.name.unit]?.rules}
                                                        errors={newContract?.[innerValue.name.unit]?.errors}
                                                        formSubmitted={allRequiredFieldsTouched}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </PayerContractsCard>
                                    <br />
                                </>
                            );
                        })}
                    </div>
                </div>
                <div
                    style={{
                        marginTop: "5%",
                        padding: "15px",
                        position: "fixed",
                        bottom: "0px",
                        backgroundColor: "#ffffff",
                        width: "100%"
                    }}
                >
                    <Button type="text" variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER} className="">
                        Cancel
                    </Button>
                    <span style={{ padding: "10px" }}></span>
                    <Button type="text" variant={BUTTON_TYPE.PRIMARY} className="" onClickCb={handleSave}>
                        Save
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
                    open={isOpen}
                    onClose={() => {
                        onClose();
                    }}
                >
                    {list()}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
