import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import TextInput from "../input/textinput/TextInput";
import Button from "../button/Button";
import { BUTTON_TYPE } from "../../libs/constant";
import DatePicker from "../datePicker/DatePicker";
import SelectDropdown from "../select/Select";
import GoogleAutoComplete from "../googleAutoComplete/GoogleAutoComplete";
import { useDispatch } from "react-redux";
import General from "../../libs/utility/General";
import { setAutoCompleteAddressFields, setScheduleInterview } from "../../pages/JobPostings/JobApplicationDetails/JobApplicationDetailsSlice";


const ScheduleInterviewModel = ({
    isOpen,
    toggle = () => { },
    onSuccessCb = () => { },
    interviewDetails,
    onChangeCb = () => { },
    showStartEndError = "",
}) => {

    let isInPersonMode = interviewDetails?.WayOfInterview?.value == 'In-person' ? 'xl' : '';
    const dispatch = useDispatch();


    const handlePlaceSelect = (place) => {
        const mappingKey = {
            addressLine2: { type: 'locality', required: false },
            // Landmark: { type: "administrative_area_level_3", required: true },
            city: { type: 'administrative_area_level_2', required: true },
            state: { type: 'administrative_area_level_1', required: true },
            country: { type: 'country', required: true },
            pinCode: { type: 'postal_code', required: true }
        };
        const result = General.mapAddressToStates(place.address_components, mappingKey);
        dispatch(setScheduleInterview({ addressLine1: { value: place.formatted_address.split(',')[0] } }));
        dispatch(setAutoCompleteAddressFields(result));
    };
    
    return (
        <Modal isOpen={isOpen} toggle={toggle} centered size={isInPersonMode}>
            <ModalHeader className="modal-title">Schedule Interview</ModalHeader>

            <ModalBody className="p-4">
                <DatePicker
                    label="Schedule Date"
                    name="ScheduleDate"
                    onChangeCb={onChangeCb}
                    value={interviewDetails.ScheduleDate.value}
                    rules={interviewDetails.ScheduleDate.rules}
                    errors={interviewDetails.ScheduleDate.errors}
                    formSubmitted={interviewDetails.allRequiredFieldsTouched}
                    minDate={new Date()}
                />
                <div className="d-flex" style={{ marginBottom: '-10px' }}>
                    <SelectDropdown
                        name="Duration"
                        label="Interview Duration"
                        onChangeCb={onChangeCb}
                        placeHolder="Please select Interview Duration"
                        value={interviewDetails?.Duration.value}
                        rules={interviewDetails?.Duration.rules}
                        errors={interviewDetails?.Duration.errors}
                        formSubmitted={interviewDetails.allRequiredFieldsTouched}
                        defaultValue={interviewDetails?.Duration.value.length !== 0 ? { label: interviewDetails?.Duration.value } : null}
                        options={[
                            { value: "15 Min", label: "15 Min" },
                            { value: "30 Min", label: "30 Min" },
                            { value: "45 Min", label: "45 Min" },
                            { value: "1 Hr", label: "1 Hr" }
                        ]}
                    />
                </div>
                <div>{showStartEndError ? <span style={{ fontSize: "14px", color: "rgb(224, 82, 67)", position: "relative", paddingTop: "-30px", marginBottom: "20px" }}>Start date should less than end date</span> : ""}</div>
                <div style={{ marginTop: '20px' }}>
                    <TextInput
                        type="text"
                        placeHolder="Please enter interviewer name"
                        name="InterviewerName"
                        label="Interviewer Name"
                        onChangeCb={onChangeCb}
                        value={interviewDetails?.InterviewerName?.value}
                        rules={interviewDetails?.InterviewerName?.rules}
                        errors={interviewDetails?.InterviewerName?.errors}
                        formSubmitted={interviewDetails.allRequiredFieldsTouched}
                    />
                </div>
                <TextInput
                    type="text"
                    placeHolder="Please enter phone number name"
                    name="PhoneNumber"
                    label="Phone Number"
                    onChangeCb={(event, rule = { required: true, regex: { pattern: /\b\d{10}\b/, message: 'Please enter 10 digits only' } }) => onChangeCb(event, rule)}
                    value={interviewDetails?.PhoneNumber?.value}
                    rules={interviewDetails?.PhoneNumber?.rules}
                    errors={interviewDetails?.PhoneNumber?.errors}
                    formSubmitted={interviewDetails.allRequiredFieldsTouched}
                />
                <SelectDropdown //User this dropdown
                    name="WayOfInterview"
                    label="Mode Of Interview"
                    onChangeCb={onChangeCb}
                    placeHolder="Please select mode of interview"
                    value={interviewDetails?.WayOfInterview?.value}
                    defaultValue={interviewDetails?.WayOfInterview?.value.length ? { label: interviewDetails?.WayOfInterview?.value } : ""}
                    rules={interviewDetails?.WayOfInterview?.rules}
                    errors={interviewDetails?.WayOfInterview?.errors}
                    formSubmitted={interviewDetails.allRequiredFieldsTouched}
                    options={[
                        { value: "In-person", label: "In-person" },
                        { value: "Online", label: "Online" }
                    ]}
                />
                {interviewDetails?.WayOfInterview?.value ? (
                    <div>
                        {interviewDetails?.WayOfInterview?.value == "Online" ? (
                            <TextInput
                                type="text"
                                placeHolder="Please paste meeting link here"
                                name="MeetingLink"
                                label="Meeting Link"
                                onChangeCb={onChangeCb}
                                value={interviewDetails.MeetingLink.value}
                                rules={interviewDetails.MeetingLink.rules}
                                errors={interviewDetails.MeetingLink.errors}
                                formSubmitted={interviewDetails.allRequiredFieldsTouched}
                            />
                        ) : (
                            <div>
                                <div className="d-flex" style={{columnGap:'8px'}}>
                                    <GoogleAutoComplete
                                        placeHolder="Please enter address line 1"

                                        name="addressLine1"
                                        onChangeCb={onChangeCb}
                                        label="Address line 1"
                                        className="me-2"
                                        value={interviewDetails?.addressLine1?.value}
                                        rules={interviewDetails?.addressLine1?.rules}
                                        errors={interviewDetails?.addressLine1?.errors}
                                        formSubmitted={interviewDetails.allRequiredFieldsTouched}
                                        onPlaceSelectedCb={handlePlaceSelect}
                                    />
                                    <TextInput
                                        type="text"
                                        placeHolder={"Please enter address line 2"}
                                        name="addressLine2"
                                        onChangeCb={onChangeCb}
                                        label="Address Line 2"
                                        className="me-2"
                                        value={interviewDetails?.addressLine2?.value}
                                        rules={interviewDetails?.addressLine2?.rules}
                                        errors={interviewDetails?.addressLine2?.errors}
                                        formSubmitted={interviewDetails.allRequiredFieldsTouched}
                                    />
                                </div>
                                <div className="d-flex">
                                    <TextInput
                                        type="text"
                                        placeHolder={"Please enter city"}
                                        name="city"
                                        onChangeCb={onChangeCb}
                                        label="City"
                                        className="me-2"
                                        value={interviewDetails?.city?.value}
                                        rules={interviewDetails?.city?.rules}
                                        errors={interviewDetails?.city?.errors}
                                        formSubmitted={interviewDetails.allRequiredFieldsTouched}
                                    />
                                    <TextInput
                                        type="text"
                                        placeHolder={"Please enter state"}
                                        onChangeCb={onChangeCb}
                                        name="state"
                                        label="State"
                                        className="me-2"
                                        value={interviewDetails?.state?.value}
                                        rules={interviewDetails?.state?.rules}
                                        errors={interviewDetails?.state?.errors}
                                        formSubmitted={interviewDetails.allRequiredFieldsTouched}
                                    />
                                </div>
                                <div className="d-flex">
                                    <TextInput
                                        type="text"
                                        placeHolder={"Please enter zip"}
                                        name="pinCode"
                                        onChangeCb={onChangeCb}
                                        label="Zip"
                                        className="me-2"
                                        value={interviewDetails?.pinCode?.value}
                                        rules={interviewDetails?.pinCode?.rules}
                                        errors={interviewDetails?.pinCode?.errors}
                                        formSubmitted={interviewDetails.allRequiredFieldsTouched}
                                    />
                                    <TextInput
                                        type="text"
                                        placeHolder={"Please enter country"}
                                        name="country"
                                        onChangeCb={onChangeCb}
                                        label="Country"
                                        className="me-2"
                                        value={interviewDetails?.country?.value}
                                        rules={interviewDetails?.country?.rules}
                                        errors={interviewDetails?.country?.errors}
                                        formSubmitted={interviewDetails.allRequiredFieldsTouched}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    ""
                )}
                <div className="mt-5">
                    <Button variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER} onClickCb={toggle}>
                        Close
                    </Button>
                    <Button className="ms-3" onClickCb={onSuccessCb}>
                        Schedule
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default ScheduleInterviewModel;
