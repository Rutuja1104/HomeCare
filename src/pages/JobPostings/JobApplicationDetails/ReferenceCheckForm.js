import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    componentKey,
    setReferenceCheckForm,
    setReferenceCheckFormCheckBoxResult,
} from "../../NurseOnboarding/NurseOnboardingSlice";
import { getAgencyDetails } from "../../Home/HomeSaga";
import { getNurseOnboardingFormDetails } from "../../NurseOnboarding/NurseOnboardingSaga";
import ResponsiveBox from "../../../components/responsivebox/ResponsiveBox";
import DatePicker from "../../../components/datePicker/DatePicker";
import TextInput from "../../../components/input/textinput/TextInput";
import GoogleAutoComplete from "../../../components/googleAutoComplete/GoogleAutoComplete";
import Base64Image from "../../../components/base64Image/Base64Image";
import CheckboxWLabel from "../../../components/checkbox/checkboxwlabel/CheckboxWLabel";
import { componentKey as HomeSection } from "../../Home/HomeSlice";
import { componentKey as jobApplication } from "./JobApplicationDetailsSlice";

function ReferenceCheckForm() {
    const dispatch = useDispatch();
    const { ReferenceCheckForm, ReferenceCheckFormCheckBoxResult, signatureInBase64, nurseOnboardingformsDetail } =
        useSelector((state) => state[componentKey]);
    const { agencyDetails } = useSelector((state) => state[HomeSection]);
    const { jobApplicationCompleteDetails } = useSelector((state) => state[jobApplication]);

    useEffect(() => {
        if (!jobApplicationCompleteDetails?.JobApplication?.length) return;

        dispatch(getAgencyDetails(jobApplicationCompleteDetails?.agencyId));
        dispatch(
            getNurseOnboardingFormDetails({
                agencyId: jobApplicationCompleteDetails?.agencyId,
                applicationId: jobApplicationCompleteDetails?.JobApplication[0]?.id,
                formType: "referenceCheck",
            })
        );
    }, []);

    useEffect(() => {
        if (!nurseOnboardingformsDetail?.data) return;
        if (nurseOnboardingformsDetail?.fromType === "referenceCheck") {
            let ReferenceCheckForm = {
                allRequiredFieldsTouched: nurseOnboardingformsDetail?.data?.allRequiredFieldsTouched,
                Date: { value: nurseOnboardingformsDetail?.data?.Date, errors: {}, rules: { required: true } },
                SentTo: { value: nurseOnboardingformsDetail?.data?.SentTo, errors: {}, rules: { required: true } },
                ManagerPhone: {
                    value: nurseOnboardingformsDetail?.data?.ManagerPhone,
                    errors: {},
                    rules: { required: true },
                },
                Address: { value: nurseOnboardingformsDetail?.data?.Address, errors: {}, rules: { required: true } },
                NameofApplicant: {
                    value: nurseOnboardingformsDetail?.data?.NameofApplicant,
                    errors: {},
                    rules: { required: true },
                },
                SS: { value: nurseOnboardingformsDetail?.data?.SS, errors: {}, rules: { required: true } },
                PositionHeld: {
                    value: nurseOnboardingformsDetail?.data?.PositionHeld,
                    errors: {},
                    rules: { required: true },
                },
                StartDate: {
                    value: nurseOnboardingformsDetail?.data?.StartDate,
                    errors: {},
                    rules: { required: true },
                },
                EndDate: { value: nurseOnboardingformsDetail?.data?.EndDate, errors: {}, rules: { required: true } },
                ReferenceCheckCompletedBy: {
                    value: nurseOnboardingformsDetail?.data?.ReferenceCheckCompletedBy,
                    errors: {},
                    rules: { required: true },
                },
                Date2: { value: nurseOnboardingformsDetail?.data?.Date2, errors: {}, rules: { required: true } },
                SpokeWith: {
                    value: nurseOnboardingformsDetail?.data?.SpokeWith,
                    errors: {},
                    rules: { required: true },
                },
                DateMailed: {
                    value: nurseOnboardingformsDetail?.data?.DateMailed,
                    errors: {},
                    rules: { required: true },
                },
                description: {
                    value: nurseOnboardingformsDetail?.data?.description,
                    errors: {},
                    rules: { required: true },
                },
                sign: nurseOnboardingformsDetail?.data?.sign,
            };
            dispatch(setReferenceCheckForm(ReferenceCheckForm));
            dispatch(
                setReferenceCheckFormCheckBoxResult(nurseOnboardingformsDetail?.data?.ReferenceCheckFormCheckBoxResult)
            );
        }
    }, [nurseOnboardingformsDetail]);

    const handlePlaceSelect = (place) => {
        dispatch(setReferenceCheckForm({ Address: place.formatted_address.split(",")[0] }));
    };

    return (
        <div className="referenceCheck">
            <div className="header2">APPLICANT AUTHORIZATION</div>
            <div className="body ">
                <br />
                <br />
                <ResponsiveBox size={300}>
                    <div>
                        <DatePicker
                            label="Date :"
                            name="Date"
                            value={ReferenceCheckForm?.Date?.value}
                            errors={ReferenceCheckForm?.Date?.errors}
                            rules={ReferenceCheckForm?.Date?.rules}
                            formSubmitted={ReferenceCheckForm?.allRequiredFieldsTouched}
                            disabled={true}
                        />
                    </div>
                    <div>
                        {" "}
                        <TextInput
                            type="text"
                            placeHolder=""
                            name="SentTo"
                            label="Sent To"
                            value={ReferenceCheckForm?.SentTo?.value}
                            errors={ReferenceCheckForm?.SentTo?.errors}
                            rules={ReferenceCheckForm?.SentTo?.rules}
                            formSubmitted={ReferenceCheckForm?.allRequiredFieldsTouched}
                        />
                    </div>
                    <div>
                        {" "}
                        <TextInput
                            type="text"
                            placeHolder=""
                            name="ManagerPhone"
                            label="Manager Phone"
                            value={ReferenceCheckForm?.ManagerPhone?.value}
                            errors={ReferenceCheckForm?.ManagerPhone?.errors}
                            rules={ReferenceCheckForm?.ManagerPhone?.rules}
                            formSubmitted={ReferenceCheckForm?.allRequiredFieldsTouched}
                        />
                    </div>
                </ResponsiveBox>
                <ResponsiveBox size={300}>
                    <div>
                        {" "}
                        <GoogleAutoComplete
                            type="text"
                            placeHolder=""
                            name="Address"
                            label="Address"
                            value={ReferenceCheckForm?.Address?.value}
                            errors={ReferenceCheckForm?.Address?.errors}
                            rules={ReferenceCheckForm?.Address?.rules}
                            formSubmitted={ReferenceCheckForm?.allRequiredFieldsTouched}
                        />
                    </div>
                    <div>
                        <TextInput
                            type="text"
                            placeHolder=""
                            name="NameofApplicant"
                            label="Name of Applicant :"
                            value={ReferenceCheckForm?.NameofApplicant?.value}
                            errors={ReferenceCheckForm?.NameofApplicant?.errors}
                            rules={ReferenceCheckForm?.NameofApplicant?.rules}
                            formSubmitted={ReferenceCheckForm?.allRequiredFieldsTouched}
                        />
                    </div>
                    <div>
                        {" "}
                        <TextInput
                            type="text"
                            placeHolder=""
                            label="SS #:"
                            name="SS"
                            value={ReferenceCheckForm?.SS?.value}
                            errors={ReferenceCheckForm?.SS?.errors}
                            rules={ReferenceCheckForm?.SS?.rules}
                            formSubmitted={ReferenceCheckForm?.allRequiredFieldsTouched}
                        />
                    </div>
                </ResponsiveBox>
                <ResponsiveBox size={300}>
                    <div>
                        {" "}
                        <TextInput
                            type="text"
                            placeHolder=""
                            name="PositionHeld"
                            label="PositionHeld :"
                            value={ReferenceCheckForm?.PositionHeld?.value}
                            errors={ReferenceCheckForm?.PositionHeld?.errors}
                            rules={ReferenceCheckForm?.PositionHeld?.rules}
                            formSubmitted={ReferenceCheckForm?.allRequiredFieldsTouched}
                        />
                    </div>
                    <div>
                        <DatePicker
                            label="Employment Start Date :"
                            name="StartDate"
                            value={ReferenceCheckForm?.StartDate?.value}
                            errors={ReferenceCheckForm?.StartDate?.errors}
                            rules={ReferenceCheckForm?.StartDate?.rules}
                            formSubmitted={ReferenceCheckForm?.allRequiredFieldsTouched}
                            disabled={true}
                        />
                    </div>
                    <div>
                        {" "}
                        <DatePicker
                            label="Employment End Date:"
                            name="EndDate"
                            value={ReferenceCheckForm?.EndDate?.value}
                            errors={ReferenceCheckForm?.EndDate?.errors}
                            rules={ReferenceCheckForm?.EndDate?.rules}
                            formSubmitted={ReferenceCheckForm?.allRequiredFieldsTouched}
                            disabled={true}
                        />
                    </div>
                </ResponsiveBox>
                <div>
                    <Base64Image base64={signatureInBase64} header="Applicant Signature" />
                </div>
                <br />
                <br />
                <div className="header2">PREVIOUS EMPLOYER’S ASSESSMENT</div>
                <div className="header5">ASSESSMENT OF WORK ETHIC</div>
                <div>
                    <table className="table">
                        <tr>
                            <th></th>
                            <th>Excellent</th>
                            <th>Good</th>
                            <th>Poor</th>
                        </tr>
                        <tr>
                            <td className="labelStyleReference">Quality of Work</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={ReferenceCheckFormCheckBoxResult["QualityOfWork"]?.Excellent}
                                    label=""
                                    name="QualityOfWork_Excellent"
                                    value={ReferenceCheckFormCheckBoxResult["QualityOfWork"]?.Excellent}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={ReferenceCheckFormCheckBoxResult["QualityOfWork"]?.Good}
                                    label=""
                                    name="QualityOfWork_Good"
                                    value={ReferenceCheckFormCheckBoxResult["QualityOfWork"]?.Good}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={ReferenceCheckFormCheckBoxResult["QualityOfWork"]?.Poor}
                                    label=""
                                    name="QualityOfWork_Poor"
                                    value={ReferenceCheckFormCheckBoxResult["QualityOfWork"]?.Poor}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="labelStyleReference">Reliability </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={ReferenceCheckFormCheckBoxResult["Reliability"]?.Excellent}
                                    label=""
                                    name="Reliability_Excellent"
                                    value={ReferenceCheckFormCheckBoxResult["Reliability"]?.Excellent}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={ReferenceCheckFormCheckBoxResult["Reliability"]?.Good}
                                    label=""
                                    name="Reliability_Good"
                                    value={ReferenceCheckFormCheckBoxResult["Reliability"]?.Good}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={ReferenceCheckFormCheckBoxResult["Reliability"]?.Poor}
                                    label=""
                                    name="Reliability_Poor"
                                    value={ReferenceCheckFormCheckBoxResult["Reliability"]?.Poor}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="labelStyleReference">Conduct Performance </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={ReferenceCheckFormCheckBoxResult["ConductPerformance"]?.Excellent}
                                    label=""
                                    name="ConductPerformance_Excellent"
                                    value={ReferenceCheckFormCheckBoxResult["ConductPerformance"]?.Excellent}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={ReferenceCheckFormCheckBoxResult["ConductPerformance"]?.Good}
                                    label=""
                                    name="ConductPerformance_Good"
                                    value={ReferenceCheckFormCheckBoxResult["ConductPerformance"]?.Good}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={ReferenceCheckFormCheckBoxResult["ConductPerformance"]?.Poor}
                                    label=""
                                    name="ConductPerformance_Poor"
                                    value={ReferenceCheckFormCheckBoxResult["ConductPerformance"]?.Poor}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="labelStyleReference">Ability to work with others</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={ReferenceCheckFormCheckBoxResult["AbilityToWorkWithOthers"]?.Excellent}
                                    label=""
                                    name="AbilityToWorkWithOthers_Excellent"
                                    value={ReferenceCheckFormCheckBoxResult["AbilityToWorkWithOthers"]?.Excellent}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={ReferenceCheckFormCheckBoxResult["AbilityToWorkWithOthers"]?.Good}
                                    label=""
                                    name="AbilityToWorkWithOthers_Good"
                                    value={ReferenceCheckFormCheckBoxResult["AbilityToWorkWithOthers"]?.Good}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={ReferenceCheckFormCheckBoxResult["AbilityToWorkWithOthers"]?.Poor}
                                    label=""
                                    name="AbilityToWorkWithOthers_Poor"
                                    value={ReferenceCheckFormCheckBoxResult["AbilityToWorkWithOthers"]?.Poor}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="labelStyleReference">Eligible for Rehire</td>
                            <td className="displayFlex">
                                {" "}
                                <CheckboxWLabel
                                    checked={ReferenceCheckFormCheckBoxResult["EligibleforRehire"]?.Excellent}
                                    label=""
                                    name="EligibleforRehire_Excellent"
                                    value={ReferenceCheckFormCheckBoxResult["EligibleforRehire"]?.Excellent}
                                />{" "}
                                <span style={{ marginLeft: "-25px" }} className="labelStyleReference">
                                    YES
                                </span>
                            </td>
                            <td></td>
                            <td className="displayFlex">
                                {" "}
                                <CheckboxWLabel
                                    checked={ReferenceCheckFormCheckBoxResult["EligibleforRehire"]?.Poor}
                                    label=""
                                    name="EligibleforRehire_Poor"
                                    value={ReferenceCheckFormCheckBoxResult["EligibleforRehire"]?.Poor}
                                />
                                <span style={{ marginLeft: "-25px" }} className="labelStyleReference">
                                    No
                                </span>
                            </td>
                        </tr>
                    </table>
                </div>
                <div className="bodyContent">
                    <div>
                        If you answered “no” to rehire eligibility or you possess any other pertinent information,
                        positive or negative in regards to the named applicant’s ability, character and/or integrity,
                        the signature below gives you the authority to share the information/ Please describe:
                    </div>
                    <br />
                    <TextInput
                        type="text"
                        placeHolder=""
                        name="description"
                        label=""
                        value={ReferenceCheckForm?.description?.value}
                        errors={ReferenceCheckForm?.description?.errors}
                        rules={ReferenceCheckForm?.description?.rules}
                        formSubmitted={ReferenceCheckForm?.allRequiredFieldsTouched}
                    />
                    <br />I hereby authorize any person, company, or organization to furnish{" "}
                    {agencyDetails?.name?.toUpperCase()} with the answers to the questions regarding my employment
                    record.
                    <br />
                    In consideration for {agencyDetails?.name?.toUpperCase()} to consider my application for employment,
                    I hereby release all liability created by this inquiry into my employment record, by the
                    communication of the requested information, or by any action taken by{" "}
                    {agencyDetails?.name?.toUpperCase()} based on that information and from any other claim for relief
                    of any kind and from any and all causes of action which I might otherwise assert based upon said
                    inquiry, communication, or action.
                </div>
                <br />

                <ResponsiveBox size={300}>
                    <div>
                        <TextInput
                            label="Reference Check Completed by :"
                            name="ReferenceCheckCompletedBy"
                            value={ReferenceCheckForm?.ReferenceCheckCompletedBy?.value}
                            errors={ReferenceCheckForm?.ReferenceCheckCompletedBy?.errors}
                            rules={ReferenceCheckForm?.ReferenceCheckCompletedBy?.rules}
                            formSubmitted={ReferenceCheckForm?.allRequiredFieldsTouched}
                        />
                    </div>
                    <div>
                        <DatePicker
                            label="Date"
                            name="Date2"
                            value={ReferenceCheckForm?.Date2?.value}
                            errors={ReferenceCheckForm?.Date2?.errors}
                            rules={ReferenceCheckForm?.Date2?.rules}
                            formSubmitted={ReferenceCheckForm?.allRequiredFieldsTouched}
                            disabled={true}
                        />
                    </div>
                </ResponsiveBox>
                <ResponsiveBox size={300}>
                    <div style={{ display: "flex" }}>
                        <CheckboxWLabel
                            checked={ReferenceCheckFormCheckBoxResult["TelephoneInquire"]?.checked}
                            label="Telephone Inquire"
                            name="TelephoneInquire"
                            value={ReferenceCheckFormCheckBoxResult["TelephoneInquire"]?.checked}
                        />
                        <TextInput
                            label="Spoke With:"
                            name="SpokeWith"
                            value={ReferenceCheckForm?.SpokeWith?.value}
                            errors={ReferenceCheckForm?.SpokeWith?.errors}
                            rules={ReferenceCheckForm?.SpokeWith?.rules}
                            formSubmitted={ReferenceCheckForm?.allRequiredFieldsTouched}
                        />
                    </div>
                    <div style={{ display: "flex", columnGap: "10px" }}>
                        <CheckboxWLabel
                            checked={ReferenceCheckFormCheckBoxResult["Mailing"]?.checked}
                            label="Mailing"
                            name="Mailing"
                            value={ReferenceCheckFormCheckBoxResult["Mailing"]?.checked}
                        />
                        <DatePicker
                            label="Date"
                            name="DateMailed"
                            value={ReferenceCheckForm?.DateMailed?.value}
                            errors={ReferenceCheckForm?.DateMailed?.errors}
                            rules={ReferenceCheckForm?.DateMailed?.rules}
                            formSubmitted={ReferenceCheckForm?.allRequiredFieldsTouched}
                            disabled={true}
                        />
                    </div>
                </ResponsiveBox>
            </div>
        </div>
    );
}

export default ReferenceCheckForm;
