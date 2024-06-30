import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import ResponsiveBox from "../responsivebox/ResponsiveBox";
import TextInput from "../input/textinput/TextInput";
import Button from "../button/Button";
import SelectDropdown from "../select/Select";
import { useDispatch } from "react-redux";
import { generalValidator } from "../../libs/utility/validators/GeneralValidator";
import Icons from "../icon/Icon";
import { VEC_ICON_NAME } from "../icon/constants";
import { PAYER } from "../../pages/JobPostings/constants";
import { setNewClaimStates } from "../../pages/Biller/components/claims/BillerPaientDetailsSlice";

const NewClaimBillerModal = ({
    isOpen,
    toggle = () => {},
    onSuccessCb = () => {},
    onChangeCb = () => {},
    allRequiredFieldsTouched = false,
    modalTitle,
    newClaimStates
}) => {
    const dispatch = useDispatch();
        
    return (
        <Modal isOpen={isOpen} toggle={toggle} centered size="lg">
            <ModalHeader className="modal-title">
                <span onClick={() => toggle()}>
                    <Icons iconName={VEC_ICON_NAME.HEADER_BACK_ARROW} />
                </span>
                {modalTitle}
            </ModalHeader>
            <ModalBody className="p-6">
                <ResponsiveBox>
                    <TextInput
                        type="text"
                        placeHolder=""
                        name="patient"
                        label="Enter Patient"
                        onChangeCb={onChangeCb}
                        value={newClaimStates?.patient?.value}
                        rules={newClaimStates?.patient?.rules}
                        errors={newClaimStates?.patient?.errors}
                        formSubmitted={allRequiredFieldsTouched}
                    />
                    <SelectDropdown
                        type="text"
                        placeHolder=""
                        name="payer"
                        label="Payer"
                        onChangeCb={onChangeCb}
                        defaultValue={newClaimStates?.payer?.value.length ? { label: newClaimStates?.payer?.value } : null}
                        value={newClaimStates?.payer?.value}
                        rules={newClaimStates?.payer?.rules}
                        errors={newClaimStates?.payer?.errors}
                        formSubmitted={allRequiredFieldsTouched}
                        options={PAYER}
                    />
                    <TextInput
                        type="text"
                        placeHolder=""
                        name="service"
                        label="Service"
                        onChangeCb={onChangeCb}
                        value={newClaimStates?.service?.value}
                        rules={newClaimStates?.service?.rules}
                        errors={newClaimStates?.service?.errors}
                        formSubmitted={allRequiredFieldsTouched}
                    />
                    <TextInput
                        type="text"
                        placeHolder=""
                        name="patientResponsibility"
                        label="Patient Responsibility"
                        onChangeCb={onChangeCb}
                        value={newClaimStates?.patientResponsibility?.value}
                        rules={newClaimStates?.patientResponsibility?.rules}
                        errors={newClaimStates?.patientResponsibility?.errors}
                        formSubmitted={allRequiredFieldsTouched}
                    />
                </ResponsiveBox>
                <div className="biller-display-flex" style={{ justifyContent: "space-between", width: "100%" }}>
                    <TextInput
                        type="date"
                        placeHolder=""
                        name="date"
                        label="Date"
                        onChangeCb={onChangeCb}
                        value={newClaimStates?.date?.value}
                        rules={newClaimStates?.date?.rules}
                        errors={newClaimStates?.date?.errors}
                        formSubmitted={allRequiredFieldsTouched}
                    />
                    <TextInput
                        type="number"
                        placeHolder=""
                        name="hours"
                        label="Hours"
                        onChangeCb={onChangeCb}
                        value={newClaimStates?.hours?.value}
                        rules={newClaimStates?.hours?.rules}
                        errors={newClaimStates?.hours?.errors}
                        formSubmitted={allRequiredFieldsTouched}
                    />
                </div>
                <div className="mt-5">
                    <Button className="ms-3" onClickCb={onSuccessCb}>
                        Preview Claim
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default NewClaimBillerModal;
