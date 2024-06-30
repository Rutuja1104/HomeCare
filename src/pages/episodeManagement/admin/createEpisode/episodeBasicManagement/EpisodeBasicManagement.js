import React from "react";

import { HEADING } from "../../../../../components/heading/constants/constants";
import { componentKey, setBasicEpisodeDetails, setSelectedCaseManager, setSelectedPayerInformation } from "../CreateEpisodeSlice";
import { useSelector, useDispatch } from "react-redux";
import { generalValidator } from "../../../../../libs/utility/validators/GeneralValidator";
import { emergencyLevel, episodeDuration } from "../constants";
import { toast } from "react-toastify";

import Heading from "../../../../../components/heading/Heading";
import ResponsiveBox from "../../../../../components/responsivebox/ResponsiveBox";
import TextInput from "../../../../../components/input/textinput/TextInput";
import SelectDropdown from "../../../../../components/select/Select";
import DatePicker from "../../../../../components/datePicker/DatePicker";
import TextArea from "../../../../../components/input/textarea/TextArea";
import General from "../../../../../libs/utility/General";

const EpisodeBasicManagement = () => {

    const dispatch = useDispatch();

    const { assignEpisodeForPatient, basicEpisodeDetailsFieldsTouch, patientDetails, StaffList, payerList } = useSelector((state) => state[componentKey]);

    const onChangeHandler = (event, rules) => {
        const { name, value } = event.target;

        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(setBasicEpisodeDetails({ object: { [name]: { value, errors, rules } }, filedName: "basicEpisodeDetails" }));
        } else {
            dispatch(setBasicEpisodeDetails({ object: { [name]: { value } }, filedName: "basicEpisodeDetails" }));
        }

        if (name === "EpisodePayer") {
            dispatch(setSelectedPayerInformation(event.target.selectedOption));
        }

        if (name == "EpisodeDuration") {
            if (assignEpisodeForPatient.basicEpisodeDetails.SOCDate.value.length == 0) {
                toast.error("Please select SOC date first!")
            } else {
                const convertedDate = General.calculateNextDate(assignEpisodeForPatient.basicEpisodeDetails.SOCDate.value, value)
                if (convertedDate.length) {
                    dispatch(setBasicEpisodeDetails({ object: { "EpisodeEndDate": { value: convertedDate } }, filedName: "basicEpisodeDetails" }))
                }
            }
        }

        if (name == "SOCDate") {
            if (value.length !== 0) {
                dispatch(setBasicEpisodeDetails({ object: { "EpisodeStartDate": { value } }, filedName: "basicEpisodeDetails" }));
            }

            if (assignEpisodeForPatient.basicEpisodeDetails.EpisodeDuration.value.length !== 0) {
                const convertedDate = General.calculateNextDate(value, assignEpisodeForPatient.basicEpisodeDetails.EpisodeDuration.value)
                if (convertedDate.length) {
                    dispatch(setBasicEpisodeDetails({ object: { "EpisodeEndDate": { value: convertedDate } }, filedName: "basicEpisodeDetails" }))
                }
            }
        }
    };

    return (
        <React.Fragment>
            <Heading type={HEADING.H3} customStyle={{ marginBottom: "20px" }}>
                Episode Details :
            </Heading>
            <ResponsiveBox size={700}>
                <TextInput
                    type="text"
                    placeHolder={"Please select agency location"}
                    name="AgencyLocation"
                    label="Agency Location"
                    onChangeCb={onChangeHandler}
                    value={assignEpisodeForPatient.basicEpisodeDetails.AgencyLocation.value}
                    rules={assignEpisodeForPatient.basicEpisodeDetails.AgencyLocation.rules}
                    errors={assignEpisodeForPatient.basicEpisodeDetails.AgencyLocation.errors}
                    formSubmitted={basicEpisodeDetailsFieldsTouch}
                />
                <DatePicker
                    placeHolder={"Please select Face To Face date"}
                    name="FaceToFaceDate"
                    label="Face To Face Date"
                    onChangeCb={onChangeHandler}
                    value={assignEpisodeForPatient.basicEpisodeDetails.FaceToFaceDate.value}
                    rules={assignEpisodeForPatient.basicEpisodeDetails.FaceToFaceDate.rules}
                    errors={assignEpisodeForPatient.basicEpisodeDetails.FaceToFaceDate.errors}
                    formSubmitted={basicEpisodeDetailsFieldsTouch}
                />
                <DatePicker
                    placeHolder={"Please select SOC Date"}
                    name="SOCDate"
                    label="SOC Date"
                    onChangeCb={onChangeHandler}
                    styles={{ marginRight: "10px" }}
                    value={assignEpisodeForPatient.basicEpisodeDetails.SOCDate.value}
                    rules={assignEpisodeForPatient.basicEpisodeDetails.SOCDate.rules}
                    errors={assignEpisodeForPatient.basicEpisodeDetails.SOCDate.errors}
                    formSubmitted={basicEpisodeDetailsFieldsTouch}
                    minDate={new Date()}
                />
                <SelectDropdown
                    placeHolder={"Please select episode duration"}
                    name="EpisodeDuration"
                    label="Episode Duration"
                    onChangeCb={onChangeHandler}
                    options={episodeDuration}
                    value={assignEpisodeForPatient.basicEpisodeDetails.EpisodeDuration.value}
                    rules={assignEpisodeForPatient.basicEpisodeDetails.EpisodeDuration.rules}
                    errors={assignEpisodeForPatient.basicEpisodeDetails.EpisodeDuration.errors}
                    defaultValue={assignEpisodeForPatient.basicEpisodeDetails.EpisodeDuration.value.length !== 0 ? { label: assignEpisodeForPatient.basicEpisodeDetails.EpisodeDuration.value } : null}
                    formSubmitted={basicEpisodeDetailsFieldsTouch}
                    onBlurOnChangeAllowed={false}
                />
                <div className="d-flex">
                    <DatePicker
                        placeHolder={"Please select SOC Date"}
                        name="EpisodeStartDate"
                        label="Episode Start Date"
                        onChangeCb={onChangeHandler}
                        styles={{ marginRight: "10px" }}
                        value={assignEpisodeForPatient.basicEpisodeDetails.EpisodeStartDate.value}
                        rules={assignEpisodeForPatient.basicEpisodeDetails.EpisodeStartDate.rules}
                        errors={assignEpisodeForPatient.basicEpisodeDetails.EpisodeStartDate.errors}
                        formSubmitted={basicEpisodeDetailsFieldsTouch}
                        disabled={true}
                    />
                    <DatePicker
                        placeHolder={"Please select Cert to date"}
                        name="EpisodeEndDate"
                        label="Episode End Date"
                        onChangeCb={onChangeHandler}
                        value={assignEpisodeForPatient.basicEpisodeDetails.EpisodeEndDate.value}
                        rules={assignEpisodeForPatient.basicEpisodeDetails.EpisodeEndDate.rules}
                        errors={assignEpisodeForPatient.basicEpisodeDetails.EpisodeEndDate.errors}
                        formSubmitted={basicEpisodeDetailsFieldsTouch}
                        disabled={true}
                    />
                </div>
                <SelectDropdown
                    placeHolder={"Please select emergency level"}
                    name="EmergencyLevel"
                    label="Emergency Level"
                    onChangeCb={onChangeHandler}
                    value={assignEpisodeForPatient.basicEpisodeDetails.EmergencyLevel.value}
                    rules={assignEpisodeForPatient.basicEpisodeDetails.EmergencyLevel.rules}
                    errors={assignEpisodeForPatient.basicEpisodeDetails.EmergencyLevel.errors}
                    formSubmitted={basicEpisodeDetailsFieldsTouch}
                    defaultValue={assignEpisodeForPatient.basicEpisodeDetails.EmergencyLevel.value.length !== 0 ? { label: assignEpisodeForPatient.basicEpisodeDetails.EmergencyLevel.value } : null}
                    options={emergencyLevel}
                />
                <SelectDropdown
                    placeHolder={"Please select case manager"}
                    name="CaseManager"
                    label="Case manager"
                    onChangeCb={(event, rules) => {
                        dispatch(setSelectedCaseManager(event.target.selectedOption))
                        onChangeHandler(event, rules)
                    }}
                    value={assignEpisodeForPatient.basicEpisodeDetails.CaseManager.value}
                    defaultValue={assignEpisodeForPatient.basicEpisodeDetails.CaseManager.value.length !== 0 && { label: assignEpisodeForPatient.basicEpisodeDetails.CaseManager.value }}
                    rules={assignEpisodeForPatient.basicEpisodeDetails.CaseManager.rules}
                    errors={assignEpisodeForPatient.basicEpisodeDetails.CaseManager.errors}
                    formSubmitted={basicEpisodeDetailsFieldsTouch}
                    options={StaffList}
                />
                <SelectDropdown
                    placeHolder={"Please select episode payer"}
                    name="EpisodePayer"
                    label="Select Payer"
                    onChangeCb={(event, rules)=>onChangeHandler(event, rules)}
                    options={payerList}
                    value={assignEpisodeForPatient.basicEpisodeDetails.EpisodePayer.value}
                    rules={assignEpisodeForPatient.basicEpisodeDetails.EpisodePayer.rules}
                    errors={assignEpisodeForPatient.basicEpisodeDetails.EpisodePayer.errors}
                    defaultValue={assignEpisodeForPatient.basicEpisodeDetails.EpisodePayer.value.length !== 0 ? { label: assignEpisodeForPatient.basicEpisodeDetails.EpisodePayer.value } : null}
                    formSubmitted={basicEpisodeDetailsFieldsTouch}
                    onBlurOnChangeAllowed={false}
                />
                {/* <div className="d-flex">
                    <DatePicker
                        placeHolder={"Please select SOC Date"}
                        name="CertFrom"
                        label="Cert From"
                        onChangeCb={onChangeHandler}
                        styles={{ marginRight: "10px" }}
                        value={assignEpisodeForPatient.basicEpisodeDetails.CertFrom.value}
                        rules={assignEpisodeForPatient.basicEpisodeDetails.CertFrom.rules}
                        errors={assignEpisodeForPatient.basicEpisodeDetails.CertFrom.errors}
                        formSubmitted={basicEpisodeDetailsFieldsTouch}
                    />
                    <DatePicker
                        placeHolder={"Please select Cert to date"}
                        name="CertTo"
                        label="Cert to"
                        onChangeCb={onChangeHandler}
                        value={assignEpisodeForPatient.basicEpisodeDetails.CertTo.value}
                        rules={assignEpisodeForPatient.basicEpisodeDetails.CertTo.rules}
                        errors={assignEpisodeForPatient.basicEpisodeDetails.CertTo.errors}
                        formSubmitted={basicEpisodeDetailsFieldsTouch}
                    />
                </div> */}
                {/* <TextInput
                    placeHolder={"Please select case conference review 1"}
                    name="CaseConferenceReview1"
                    label="Case conference review 1"
                    onChangeCb={onChangeHandler}
                    value={assignEpisodeForPatient.basicEpisodeDetails.CaseConferenceReview1.value}
                    rules={assignEpisodeForPatient.basicEpisodeDetails.CaseConferenceReview1.rules}
                    errors={assignEpisodeForPatient.basicEpisodeDetails.CaseConferenceReview1.errors}
                    formSubmitted={basicEpisodeDetailsFieldsTouch}
                />
                <TextInput
                    placeHolder={"Please select case conference review 2"}
                    name="CaseConferenceReview2"
                    label="Case conference review 2"
                    onChangeCb={onChangeHandler}
                    value={assignEpisodeForPatient.basicEpisodeDetails.CaseConferenceReview2.value}
                    rules={assignEpisodeForPatient.basicEpisodeDetails.CaseConferenceReview2.rules}
                    errors={assignEpisodeForPatient.basicEpisodeDetails.CaseConferenceReview2.errors}
                    formSubmitted={basicEpisodeDetailsFieldsTouch}
                />
                <TextInput
                    placeHolder={"Please select case conference review 2"}
                    name="CaseConferencePreparer"
                    label="Case conference preparer"
                    onChangeCb={onChangeHandler}
                    value={assignEpisodeForPatient.basicEpisodeDetails.CaseConferencePreparer.value}
                    rules={assignEpisodeForPatient.basicEpisodeDetails.CaseConferencePreparer.rules}
                    errors={assignEpisodeForPatient.basicEpisodeDetails.CaseConferencePreparer.errors}
                    formSubmitted={basicEpisodeDetailsFieldsTouch}
                />
                <TextInput
                    type="number"
                    placeHolder={"Please enter blood pressure"}
                    name="ControlNumber"
                    label="Control number"
                    onChangeCb={onChangeHandler}
                    value={assignEpisodeForPatient.basicEpisodeDetails.ControlNumber.value}
                    rules={assignEpisodeForPatient.basicEpisodeDetails.ControlNumber.rules}
                    errors={assignEpisodeForPatient.basicEpisodeDetails.ControlNumber.errors}
                    formSubmitted={basicEpisodeDetailsFieldsTouch}
                /> */}
                {/* <TextInput
                    type="number"
                    placeHolder={"Please select HIC number"}
                    name="HICNumber"
                    label="HIC Number"
                    onChangeCb={onChangeHandler}
                    value={assignEpisodeForPatient.basicEpisodeDetails.HICNumber.value}
                    rules={assignEpisodeForPatient.basicEpisodeDetails.HICNumber.rules}
                    errors={assignEpisodeForPatient.basicEpisodeDetails.HICNumber.errors}
                    formSubmitted={basicEpisodeDetailsFieldsTouch}
                /> */}
            </ResponsiveBox>

            <TextArea
                label="Comments"
                name="EpisodeComments"
                value={assignEpisodeForPatient.basicEpisodeDetails.EpisodeComments.value}
                onChangeCb={onChangeHandler}
                placeholder="Please add a comments if have any"
            />

            <Heading type={HEADING.H3} customStyle={{ margin: "20px 0" }}>
                Episode Vital Sign Ranges :
            </Heading>
            <ResponsiveBox size={700}>
                <TextInput
                    type="number"
                    placeHolder={"Please enter blood pressure"}
                    name="LowBloodPressure"
                    label="Low Blood Pressure"
                    onChangeCb={onChangeHandler}
                    value={assignEpisodeForPatient.basicEpisodeDetails.LowBloodPressure.value}
                    rules={assignEpisodeForPatient.basicEpisodeDetails.LowBloodPressure.rules}
                    errors={assignEpisodeForPatient.basicEpisodeDetails.LowBloodPressure.errors}
                    formSubmitted={basicEpisodeDetailsFieldsTouch}
                    disabled={true}
                />
                <TextInput
                    type="number"
                    placeHolder={"Please enter blood pressure"}
                    name="HighBloodPressure"
                    label="High Blood Pressure"
                    onChangeCb={onChangeHandler}
                    value={assignEpisodeForPatient.basicEpisodeDetails.HighBloodPressure.value}
                    rules={assignEpisodeForPatient.basicEpisodeDetails.HighBloodPressure.rules}
                    errors={assignEpisodeForPatient.basicEpisodeDetails.HighBloodPressure.errors}
                    formSubmitted={basicEpisodeDetailsFieldsTouch}
                    disabled={true}
                />
                <TextInput
                    type="number"
                    placeHolder={"Please enter low diastolic"}
                    name="LowDiastolic"
                    label="Low Diastolic"
                    onChangeCb={onChangeHandler}
                    value={assignEpisodeForPatient.basicEpisodeDetails.LowDiastolic.value}
                    rules={assignEpisodeForPatient.basicEpisodeDetails.LowDiastolic.rules}
                    errors={assignEpisodeForPatient.basicEpisodeDetails.LowDiastolic.errors}
                    formSubmitted={basicEpisodeDetailsFieldsTouch}
                    disabled={true}
                />
                <TextInput
                    type="number"
                    placeHolder={"Please enter high diastolic"}
                    name="HighDiastolic"
                    label="High Diastolic"
                    onChangeCb={onChangeHandler}
                    value={assignEpisodeForPatient.basicEpisodeDetails.HighDiastolic.value}
                    rules={assignEpisodeForPatient.basicEpisodeDetails.HighDiastolic.rules}
                    errors={assignEpisodeForPatient.basicEpisodeDetails.HighDiastolic.errors}
                    formSubmitted={basicEpisodeDetailsFieldsTouch}
                    disabled={true}
                />
                <TextInput
                    type="number"
                    placeHolder={"Please enter low systolic"}
                    name="LowSystolic"
                    label="Low Systolic"
                    onChangeCb={onChangeHandler}
                    value={assignEpisodeForPatient.basicEpisodeDetails.LowSystolic.value}
                    rules={assignEpisodeForPatient.basicEpisodeDetails.LowSystolic.rules}
                    errors={assignEpisodeForPatient.basicEpisodeDetails.LowSystolic.errors}
                    formSubmitted={basicEpisodeDetailsFieldsTouch}
                    disabled={true}
                />
                <TextInput
                    type="number"
                    placeHolder={"Please enter low systolic"}
                    name="HighSystolic"
                    label="High Systolic"
                    onChangeCb={onChangeHandler}
                    value={assignEpisodeForPatient.basicEpisodeDetails.HighSystolic.value}
                    rules={assignEpisodeForPatient.basicEpisodeDetails.HighSystolic.rules}
                    errors={assignEpisodeForPatient.basicEpisodeDetails.HighSystolic.errors}
                    formSubmitted={basicEpisodeDetailsFieldsTouch}
                    disabled={true}
                />
            </ResponsiveBox>
            <ResponsiveBox size={700}>
                <TextInput
                    type="number"
                    placeHolder={"Please enter low pulse"}
                    name="LowPulse"
                    label="Low Pulse"
                    onChangeCb={onChangeHandler}
                    value={assignEpisodeForPatient.basicEpisodeDetails.LowPulse.value}
                    rules={assignEpisodeForPatient.basicEpisodeDetails.LowPulse.rules}
                    errors={assignEpisodeForPatient.basicEpisodeDetails.LowPulse.errors}
                    formSubmitted={basicEpisodeDetailsFieldsTouch}
                    disabled={true}
                />
                <TextInput
                    type="number"
                    placeHolder={"Please enter high pulse"}
                    name="HighPulse"
                    label="High Pulse"
                    onChangeCb={onChangeHandler}
                    value={assignEpisodeForPatient.basicEpisodeDetails.HighPulse.value}
                    rules={assignEpisodeForPatient.basicEpisodeDetails.HighPulse.rules}
                    errors={assignEpisodeForPatient.basicEpisodeDetails.HighPulse.errors}
                    formSubmitted={basicEpisodeDetailsFieldsTouch}
                    disabled={true}
                />
                <TextInput
                    type="number"
                    placeHolder={"Please enter low temperature"}
                    name="LowTemperature"
                    label="Low Temperature"
                    onChangeCb={onChangeHandler}
                    value={assignEpisodeForPatient.basicEpisodeDetails.LowTemperature.value}
                    rules={assignEpisodeForPatient.basicEpisodeDetails.LowTemperature.rules}
                    errors={assignEpisodeForPatient.basicEpisodeDetails.LowTemperature.errors}
                    formSubmitted={basicEpisodeDetailsFieldsTouch}
                    disabled={true}
                />
                <TextInput
                    type="number"
                    placeHolder={"Please enter high temperature"}
                    name="HighTemperature"
                    label="High Temperature"
                    onChangeCb={onChangeHandler}
                    value={assignEpisodeForPatient.basicEpisodeDetails.HighTemperature.value}
                    rules={assignEpisodeForPatient.basicEpisodeDetails.HighTemperature.rules}
                    errors={assignEpisodeForPatient.basicEpisodeDetails.HighTemperature.errors}
                    formSubmitted={basicEpisodeDetailsFieldsTouch}
                    disabled={true}
                />
                <TextInput
                    type="number"
                    placeHolder={"Please enter low respiratory"}
                    name="LowRespiratory"
                    label="Low Respiratory"
                    onChangeCb={onChangeHandler}
                    value={assignEpisodeForPatient.basicEpisodeDetails.LowRespiratory.value}
                    rules={assignEpisodeForPatient.basicEpisodeDetails.LowRespiratory.rules}
                    errors={assignEpisodeForPatient.basicEpisodeDetails.LowRespiratory.errors}
                    formSubmitted={basicEpisodeDetailsFieldsTouch}
                    disabled={true}
                />
                <TextInput
                    type="number"
                    placeHolder={"Please enter high respiratory"}
                    name="HighRespiratory"
                    label="High Respiratory"
                    onChangeCb={onChangeHandler}
                    value={assignEpisodeForPatient.basicEpisodeDetails.HighRespiratory.value}
                    rules={assignEpisodeForPatient.basicEpisodeDetails.HighRespiratory.rules}
                    errors={assignEpisodeForPatient.basicEpisodeDetails.HighRespiratory.errors}
                    formSubmitted={basicEpisodeDetailsFieldsTouch}
                    disabled={true}
                />
                <TextInput
                    type="number"
                    placeHolder={"Please enter low blood sugar"}
                    name="LowBloodSugar"
                    label="Low Blood Sugar"
                    onChangeCb={onChangeHandler}
                    value={assignEpisodeForPatient.basicEpisodeDetails.LowBloodSugar.value}
                    rules={assignEpisodeForPatient.basicEpisodeDetails.LowBloodSugar.rules}
                    errors={assignEpisodeForPatient.basicEpisodeDetails.LowBloodSugar.errors}
                    formSubmitted={basicEpisodeDetailsFieldsTouch}
                    disabled={true}
                />
                <TextInput
                    type="number"
                    placeHolder={"Please enter high blood sugar"}
                    name="HighBloodSugar"
                    label="High Blood Sugar"
                    onChangeCb={onChangeHandler}
                    value={assignEpisodeForPatient.basicEpisodeDetails.HighBloodSugar.value}
                    rules={assignEpisodeForPatient.basicEpisodeDetails.HighBloodSugar.rules}
                    errors={assignEpisodeForPatient.basicEpisodeDetails.HighBloodSugar.errors}
                    formSubmitted={basicEpisodeDetailsFieldsTouch}
                    disabled={true}
                />
            </ResponsiveBox>

            <Heading type={HEADING.H3} customStyle={{ margin: "20px 0" }}>
                Physician Information :
            </Heading>
            <ResponsiveBox size={400}>
                <TextInput
                    type="text"
                    placeHolder={"Please select first name"}
                    name="FirstName"
                    label="First Name"
                    value={patientDetails?.physician?.firstName || "N/A"}
                    disabled={true}
                />
                <TextInput
                    type="text"
                    placeHolder={"Please select last name"}
                    name="LastName"
                    label="Last Name"
                    value={patientDetails?.physician?.lastName || "N/A"}
                    disabled={true}
                />
                <TextInput
                    placeHolder={"Please select physician qualifier"}
                    name="AgencyLocation"
                    label="Physician NPI"
                    value={patientDetails?.physician?.NPI || "N/A"}
                    disabled={true}
                />
            </ResponsiveBox>
            <ResponsiveBox size={700}>
                <TextInput
                    type="text"
                    placeHolder="Please enter Physician ID"
                    name="PhysicianID"
                    label="Fax Number"
                    disabled={true}
                    value={patientDetails?.physician?.fax || "N/A"}
                />
                <TextInput
                    type="email"
                    placeHolder="Please enter email"
                    name="Email"
                    label="Primary Email"
                    value={patientDetails?.physician?.primaryEmail || "N/A"}
                    disabled={true}
                />
                <TextInput
                    type="email"
                    placeHolder="Please enter email"
                    name="Email"
                    label="Secondary Email"
                    value={patientDetails?.physician?.secondaryEmail || "N/A"}
                    disabled={true}
                />
                <TextInput
                    type="text"
                    placeHolder={"Please enter phone number"}
                    name="TelephoneNumber"
                    label="Phone Number"
                    value={patientDetails?.physician?.contactNumber || "N/A"}
                    disabled={true}
                />
            </ResponsiveBox>
            <ResponsiveBox size={400}>
                <TextInput
                    type="text"
                    placeHolder={"Please enter phone number"}
                    name="TelephoneNumber"
                    label="Address"
                    value={patientDetails?.physician?.billingAddress?.addressLine1 || "N/A"}
                    disabled={true}
                />
                <TextInput
                    type="text"
                    placeHolder={"Please enter phone number"}
                    name="TelephoneNumber"
                    label="State"
                    value={patientDetails?.physician?.billingAddress?.state || "N/A"}
                    disabled={true}
                />
                <TextInput
                    type="text"
                    placeHolder={"Please enter Zip Code"}
                    name="ZipCode"
                    value={patientDetails?.physician?.billingAddress?.pinCode || "N/A"}
                    label="Zip Code"
                    disabled={true}
                />
            </ResponsiveBox>
        </React.Fragment>
    );
};

export default EpisodeBasicManagement;
