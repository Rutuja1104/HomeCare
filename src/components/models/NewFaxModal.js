import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import TextInput from "../input/textinput/TextInput";
import Button from "../button/Button";
import FileUpload from "../fileUpload/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { setFaxDetails } from "../../pages/Messages/MessagesSlice";

const NewFaxModal = ({
    isOpen,
    toggle = () => {},
    onSuccessCb = () => {},
    allRequiredFieldsTouched = false,
    title
}) => {

    const dispatch = useDispatch();
    const faxDetails = useSelector(state => state.MESSAGES?.faxDetails);
    const onChangeHandler = (e) => {
        if (Array.isArray(e)) dispatch(setFaxDetails({ name: 'attachments', value: e }));
        else dispatch(setFaxDetails({ name: e.target.name, value: e.target.value }));
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered size="xl">
            <ModalHeader className="modal-title">{ title }</ModalHeader>
            <ModalBody className="p-4">
                <TextInput
                    type="number"
                    placeHolder="Enter a fax number or contact number"
                    name="to"
                    label="To"
                    onChangeCb={onChangeHandler}
                    value={faxDetails?.to?.value}
                    rules={faxDetails?.to?.rules}
                    errors={faxDetails?.to?.errors}
                    formSubmitted={allRequiredFieldsTouched}
                />
                <TextInput
                    type="text"
                    placeHolder="Cover Page Text"
                    name="cover_page_text"
                    label="Cover Page Text"
                    onChangeCb={onChangeHandler}
                    value={faxDetails?.cover_page_text?.value}
                    rules={faxDetails?.cover_page_text?.rules}
                    errors={faxDetails?.cover_page_text?.errors}
                    formSubmitted={allRequiredFieldsTouched}
                />
                <label style={{ fontSize: "16px", color: "rgb(103, 103, 103)", marginBottom: "-5px !important" }}>
                    Attachments
                </label>
                <FileUpload onUploadFiles={onChangeHandler} />
                <div className="mt-5">
                    <Button disabled={!faxDetails.to.value.length} className="ms-3" onClickCb={() => { onSuccessCb({ ...faxDetails }) }}>
                        Send Now
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default NewFaxModal;
