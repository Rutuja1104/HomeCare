import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    componentKey,
    setOrientationChecklist,
    setOrientationChecklistCheckBoxResult,
} from "../../NurseOnboarding/NurseOnboardingSlice";
import { getNurseOnboardingFormDetails } from "../../NurseOnboarding/NurseOnboardingSaga";
import ResponsiveBox from "../../../components/responsivebox/ResponsiveBox";
import TextInput from "../../../components/input/textinput/TextInput";
import DatePicker from "../../../components/datePicker/DatePicker";
import Base64Image from "../../../components/base64Image/Base64Image";
import CheckboxWLabel from "../../../components/checkbox/checkboxwlabel/CheckboxWLabel";
import { componentKey as jobApplication } from "./JobApplicationDetailsSlice";

function OrientationCheckFirst() {
    const dispatch = useDispatch();
    const {
        OrientationChecklistForm,
        OrientationChecklistCheckBoxResult,
        signatureInBase64,
        nurseOnboardingformsDetail,
    } = useSelector((state) => state[componentKey]);
    const { jobApplicationCompleteDetails } = useSelector((state) => state[jobApplication]);

    useEffect(() => {
        if (!jobApplicationCompleteDetails?.JobApplication?.length) return;
        dispatch(
            getNurseOnboardingFormDetails({
                agencyId: jobApplicationCompleteDetails?.agencyId,
                applicationId: jobApplicationCompleteDetails?.JobApplication[0]?.id,
                formType: "OrientationChecklist",
            })
        );
    }, []);
    useEffect(() => {
        if (!nurseOnboardingformsDetail?.data) return;
        if (nurseOnboardingformsDetail?.fromType === "OrientationChecklist") {
            const {
                EmployerRepresentative,
                EmployeeName,
                allRequiredFieldsTouched,
                Title,
                DateOfHire,
                DateOfOrientation,
                sign,
                OrientationChecklistCheckBoxResult,
            } = nurseOnboardingformsDetail.data;
            let data = {
                allRequiredFieldsTouched: allRequiredFieldsTouched,
                EmployerRepresentative: { value: EmployerRepresentative, errors: {}, rules: { required: true } },
                EmployeeName: { value: EmployeeName, errors: {}, rules: { required: true } },
                Title: { value: Title, errors: {}, rules: { required: true } },
                DateOfHire: { value: DateOfHire, errors: {}, rules: { required: true } },
                DateOfOrientation: { value: DateOfOrientation, errors: {}, rules: { required: true } },
                sign: sign,
            };
            dispatch(setOrientationChecklist(data));
            dispatch(setOrientationChecklistCheckBoxResult(OrientationChecklistCheckBoxResult));
        }
    }, [nurseOnboardingformsDetail]);

    return (
        <div className="nurse-onboarding-new-forms orientation-form">
            <div className="WeCareHomeCare"></div>
            <div className="body">
                <ResponsiveBox size={300}>
                    <div>
                        <TextInput
                            type="text"
                            placeHolder=""
                            name="EmployerRepresentative"
                            label="Employer Representative"
                            value={OrientationChecklistForm?.EmployerRepresentative?.value}
                            errors={OrientationChecklistForm?.EmployerRepresentative?.errors}
                            rules={OrientationChecklistForm?.EmployerRepresentative?.rules}
                            formSubmitted={OrientationChecklistForm?.allRequiredFieldsTouched}
                            isClearable={true}
                        />
                    </div>
                    <div>
                        {" "}
                        <TextInput
                            type="text"
                            placeHolder=""
                            name="EmployeeName"
                            label="Employee Name"
                            value={OrientationChecklistForm?.EmployeeName?.value}
                            errors={OrientationChecklistForm?.EmployeeName?.errors}
                            rules={OrientationChecklistForm?.EmployeeName?.rules}
                            formSubmitted={OrientationChecklistForm?.allRequiredFieldsTouched}
                        />
                    </div>
                </ResponsiveBox>
                <ResponsiveBox size={300}>
                    <div>
                        {" "}
                        <TextInput
                            type="text"
                            placeHolder=""
                            name="Title"
                            label="Title"
                            value={OrientationChecklistForm?.Title?.value}
                            errors={OrientationChecklistForm?.Title?.errors}
                            rules={OrientationChecklistForm?.Title?.rules}
                            formSubmitted={OrientationChecklistForm?.allRequiredFieldsTouched}
                        />
                    </div>
                </ResponsiveBox>
                <ResponsiveBox size={300}>
                    <div>
                        {" "}
                        <DatePicker
                            label="Date :"
                            name="DateOfHire"
                            value={OrientationChecklistForm?.DateOfHire?.value}
                            errors={OrientationChecklistForm?.DateOfHire?.errors}
                            rules={OrientationChecklistForm?.DateOfHire?.rules}
                            formSubmitted={OrientationChecklistForm?.allRequiredFieldsTouched}
                            disabled={true}
                        />
                    </div>
                    <div>
                        {" "}
                        <DatePicker
                            label="Date Of Orientation :"
                            name="DateOfOrientation"
                            value={OrientationChecklistForm?.DateOfOrientation?.value}
                            errors={OrientationChecklistForm?.DateOfOrientation?.errors}
                            rules={OrientationChecklistForm?.DateOfOrientation?.rules}
                            formSubmitted={OrientationChecklistForm?.allRequiredFieldsTouched}
                            disabled={true}
                        />
                    </div>
                </ResponsiveBox>
                <div>
                    <Base64Image base64={signatureInBase64} header="Employee Signature" />
                </div>
                <br />
                <br />
                <div>
                    <table className="table" style={{ marginLeft: "-8px" }}>
                        <tr style={{ border: "0px" }}>
                            <td></td>
                            <td>Y</td>
                            <td>N</td>
                            <td>N/A</td>
                            <td></td>
                            <td></td>
                            <td>Y</td>
                            <td>N</td>
                            <td>N/A</td>
                        </tr>
                        <tr>
                            <td>
                                Oriented to the agency’s organizational structure, goals, mission, policies and
                                procedures including lines of communication
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["OrientedToTheAgencys"]?.Y}
                                    label=""
                                    name="OrientedToTheAgencys_Y"
                                    value={OrientationChecklistCheckBoxResult["OrientedToTheAgencys"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["OrientedToTheAgencys"]?.N}
                                    label=""
                                    name="OrientedToTheAgencys_N"
                                    value={OrientationChecklistCheckBoxResult["OrientedToTheAgencys"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["OrientedToTheAgencys"]?.NA}
                                    label=""
                                    name="OrientedToTheAgencys_NA"
                                    value={OrientationChecklistCheckBoxResult["OrientedToTheAgencys"]?.NA}
                                />
                            </td>
                            <td rowSpan={24}></td>
                            <td>Supervision of self-Administered Medications for HHA/CAN </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["Supervision"]?.Y}
                                    label=""
                                    name="Supervision_Y"
                                    value={OrientationChecklistCheckBoxResult["Supervision"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["Supervision"]?.N}
                                    label=""
                                    name="Supervision_N"
                                    value={OrientationChecklistCheckBoxResult["Supervision"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["Supervision"]?.NA}
                                    label=""
                                    name="Supervision_Y"
                                    value={OrientationChecklistCheckBoxResult["Supervision"]?.NA}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Introduced to office staff and oriented to office layout, emergency exit(s), fire
                                extinguisher, employees’ areas for use and off limits.
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["Introduced"]?.Y}
                                    label=""
                                    name="Introduced_Y"
                                    value={OrientationChecklistCheckBoxResult["Introduced"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["Introduced"]?.N}
                                    label=""
                                    name="Introduced_N"
                                    value={OrientationChecklistCheckBoxResult["Introduced"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["Introduced"]?.NA}
                                    label=""
                                    name="Introduced_NA"
                                    value={OrientationChecklistCheckBoxResult["Introduced"]?.NA}
                                />
                            </td>
                            <td>
                                <tr>Home Health Aide Assignments</tr>
                                HHA Written competency exam
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["HomeHealthHHA"]?.Y}
                                    label=""
                                    name="HomeHealthHHA_Y"
                                    value={OrientationChecklistCheckBoxResult["HomeHealthHHA"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["HomeHealthHHA"]?.N}
                                    label=""
                                    name="HomeHealthHHA_N"
                                    value={OrientationChecklistCheckBoxResult["HomeHealthHHA"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["HomeHealthHHA"]?.NA}
                                    label=""
                                    name="HomeHealthHHA_NA"
                                    value={OrientationChecklistCheckBoxResult["HomeHealthHHA"]?.NA}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Employee Status Direct versus Contracted Employees</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["EmployeeStatus"]?.Y}
                                    label=""
                                    name="EmployeeStatus_Y"
                                    value={OrientationChecklistCheckBoxResult["EmployeeStatus"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["EmployeeStatus"]?.N}
                                    label=""
                                    name="EmployeeStatus_N"
                                    value={OrientationChecklistCheckBoxResult["EmployeeStatus"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["EmployeeStatus"]?.NA}
                                    label=""
                                    name="EmployeeStatus_NA"
                                    value={OrientationChecklistCheckBoxResult["EmployeeStatus"]?.NA}
                                />
                            </td>
                            <td>
                                <tr>Skilled Nursing Medication Test</tr>
                                Clinical Visit Notes & Missed Visit Notes Policy
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["SkilledNursing"]?.Y}
                                    label=""
                                    name="SkilledNursing_Y"
                                    value={OrientationChecklistCheckBoxResult["SkilledNursing"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["SkilledNursing"]?.N}
                                    label=""
                                    name="SkilledNursing_N"
                                    value={OrientationChecklistCheckBoxResult["SkilledNursing"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["SkilledNursing"]?.NA}
                                    label=""
                                    name="SkilledNursing_NA"
                                    value={OrientationChecklistCheckBoxResult["SkilledNursing"]?.NA}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>CAN and Home Health Aide Requirements</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["CANHomeHealth"]?.Y}
                                    label=""
                                    name="CANHomeHealth_Y"
                                    value={OrientationChecklistCheckBoxResult["CANHomeHealth"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["CANHomeHealth"]?.N}
                                    label=""
                                    name="CANHomeHealth_N"
                                    value={OrientationChecklistCheckBoxResult["CANHomeHealth"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["CANHomeHealth"]?.NA}
                                    label=""
                                    name="CANHomeHealth_NA"
                                    value={OrientationChecklistCheckBoxResult["CANHomeHealth"]?.NA}
                                />
                            </td>
                            <td>Patient Rights</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["PatientRights"]?.Y}
                                    label=""
                                    name="PatientRights_Y"
                                    value={OrientationChecklistCheckBoxResult["PatientRights"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["PatientRights"]?.N}
                                    label=""
                                    name="PatientRights_N"
                                    value={OrientationChecklistCheckBoxResult["PatientRights"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["PatientRights"]?.NA}
                                    label=""
                                    name="PatientRights_NA"
                                    value={OrientationChecklistCheckBoxResult["PatientRights"]?.NA}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Probationary Period</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["ProbationaryPeriod"]?.Y}
                                    label=""
                                    name="ProbationaryPeriod_Y"
                                    value={OrientationChecklistCheckBoxResult["ProbationaryPeriod"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["ProbationaryPeriod"]?.N}
                                    label=""
                                    name="ProbationaryPeriod_N"
                                    value={OrientationChecklistCheckBoxResult["ProbationaryPeriod"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["ProbationaryPeriod"]?.NA}
                                    label=""
                                    name="ProbationaryPeriod_NA"
                                    value={OrientationChecklistCheckBoxResult["ProbationaryPeriod"]?.NA}
                                />
                            </td>
                            <td>HIPAA/Confidentiality</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["HIPAA/Confidentiality"]?.Y}
                                    label=""
                                    name="HIPAA/Confidentiality_Y"
                                    value={OrientationChecklistCheckBoxResult["HIPAA/Confidentiality"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["HIPAA/Confidentiality"]?.N}
                                    label=""
                                    name="HIPAA/Confidentiality_N"
                                    value={OrientationChecklistCheckBoxResult["HIPAA/Confidentiality"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["HIPAA/Confidentiality"]?.NA}
                                    label=""
                                    name="HIPAA/Confidentiality_NA"
                                    value={OrientationChecklistCheckBoxResult["HIPAA/Confidentiality"]?.NA}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>End of probationary period</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["EndProbationaryPeriod"]?.Y}
                                    label=""
                                    name="EndProbationaryPeriod_Y"
                                    value={OrientationChecklistCheckBoxResult["EndProbationaryPeriod"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["EndProbationaryPeriod"]?.N}
                                    label=""
                                    name="EndProbationaryPeriod_N"
                                    value={OrientationChecklistCheckBoxResult["EndProbationaryPeriod"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["EndProbationaryPeriod"]?.NA}
                                    label=""
                                    name="EndProbationaryPeriod_NA"
                                    value={OrientationChecklistCheckBoxResult["EndProbationaryPeriod"]?.NA}
                                />
                            </td>
                            <td>Over view of personnel policies </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["OverviewOfPersonnelPolicies"]?.Y}
                                    label=""
                                    name="OverviewOfPersonnelPolicies_Y"
                                    value={OrientationChecklistCheckBoxResult["OverviewOfPersonnelPolicies"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["OverviewOfPersonnelPolicies"]?.N}
                                    label=""
                                    name="OverviewOfPersonnelPolicies_N"
                                    value={OrientationChecklistCheckBoxResult["OverviewOfPersonnelPolicies"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["OverviewOfPersonnelPolicies"]?.NA}
                                    label=""
                                    name="OverviewOfPersonnelPolicies_NA"
                                    value={OrientationChecklistCheckBoxResult["OverviewOfPersonnelPolicies"]?.NA}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Personal File &Background Screening policies</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["PersonalFile"]?.Y}
                                    label=""
                                    name="PersonalFile_Y"
                                    value={OrientationChecklistCheckBoxResult["PersonalFile"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["PersonalFile"]?.N}
                                    label=""
                                    name="PersonalFile_N"
                                    value={OrientationChecklistCheckBoxResult["PersonalFile"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["PersonalFile"]?.NA}
                                    label=""
                                    name="PersonalFile_NA"
                                    value={OrientationChecklistCheckBoxResult["PersonalFile_NA"]?.NA}
                                />
                            </td>
                            <td>Over view of personnel policies </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["IncidentReportingProcedures"]?.Y}
                                    label=""
                                    name="IncidentReportingProcedures_Y"
                                    value={OrientationChecklistCheckBoxResult["IncidentReportingProcedures"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["IncidentReportingProcedures"]?.N}
                                    label=""
                                    name="IncidentReportingProcedures_N"
                                    value={OrientationChecklistCheckBoxResult["IncidentReportingProcedures"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["IncidentReportingProcedures"]?.NA}
                                    label=""
                                    name="IncidentReportingProcedures_NA"
                                    value={OrientationChecklistCheckBoxResult["IncidentReportingProcedures"]?.NA}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Compensation (payroll)</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["CompensationPayroll"]?.Y}
                                    label=""
                                    name="CompensationPayroll_Y"
                                    value={OrientationChecklistCheckBoxResult["CompensationPayroll"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["CompensationPayroll"]?.N}
                                    label=""
                                    name="CompensationPayroll_N"
                                    value={OrientationChecklistCheckBoxResult["CompensationPayroll"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["CompensationPayroll"]?.NA}
                                    label=""
                                    name="CompensationPayroll_NA"
                                    value={OrientationChecklistCheckBoxResult["CompensationPayroll"]?.NA}
                                />
                            </td>
                            <td>Emergency Procedure/Disaster Policy </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["EmergencyProcedurePolicy"]?.Y}
                                    label=""
                                    name="EmergencyProcedurePolicy_Y"
                                    value={OrientationChecklistCheckBoxResult["EmergencyProcedurePolicy"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["EmergencyProcedurePolicy"]?.N}
                                    label=""
                                    name="EmergencyProcedurePolicy_N"
                                    value={OrientationChecklistCheckBoxResult["EmergencyProcedurePolicy"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["EmergencyProcedurePolicy"]?.NA}
                                    label=""
                                    name="EmergencyProcedurePolicy_NA"
                                    value={OrientationChecklistCheckBoxResult["EmergencyProcedurePolicy"]?.NA}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Payment of Overtime</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["PaymentOvertime"]?.Y}
                                    label=""
                                    name="PaymentOvertime_Y"
                                    value={OrientationChecklistCheckBoxResult["PaymentOvertime"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["PaymentOvertime"]?.N}
                                    label=""
                                    name="PaymentOvertime_N"
                                    value={OrientationChecklistCheckBoxResult["PaymentOvertime"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["PaymentOvertime"]?.NA}
                                    label=""
                                    name="PaymentOvertime_NA"
                                    value={OrientationChecklistCheckBoxResult["PaymentOvertime"]?.NA}
                                />
                            </td>
                            <td>Advanced Directives including DNRO</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["AdvancedDirectivesincludingDNRO"]?.Y}
                                    label=""
                                    name="AdvancedDirectivesincludingDNRO_Y"
                                    value={OrientationChecklistCheckBoxResult["AdvancedDirectivesincludingDNRO"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["AdvancedDirectivesincludingDNRO"]?.N}
                                    label=""
                                    name="AdvancedDirectivesincludingDNRO_N"
                                    value={OrientationChecklistCheckBoxResult["AdvancedDirectivesincludingDNRO"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["AdvancedDirectivesincludingDNRO"]?.NA}
                                    label=""
                                    name="AdvancedDirectivesincludingDNRO_NA"
                                    value={OrientationChecklistCheckBoxResult["AdvancedDirectivesincludingDNRO"]?.NA}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <tr>Promotion / Salary Increase</tr>
                                <tr>Work/Office Hours</tr>
                                <tr>On-call and on-in Policy</tr>
                                Paid Holidays
                            </td>
                            <td>
                                {" "}
                                <br />
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["PromotionSalaryIncrease"]?.Y}
                                    label=""
                                    name="PromotionSalaryIncrease_Y"
                                    value={OrientationChecklistCheckBoxResult["PromotionSalaryIncrease"]?.Y}
                                />
                                <br />
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["WorkOfficehours"]?.Y}
                                    label=""
                                    name="WorkOfficehours_Y"
                                    value={OrientationChecklistCheckBoxResult["WorkOfficehours"]?.Y}
                                />
                                <br />
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["OnCallOnInPolicy"]?.Y}
                                    label=""
                                    name="OnCallOnInPolicy_Y"
                                    value={OrientationChecklistCheckBoxResult["OnCallOnInPolicy"]?.Y}
                                />
                                <br />
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["PaidHolidays"]?.Y}
                                    label=""
                                    name="PaidHolidays_Y"
                                    value={OrientationChecklistCheckBoxResult["PaidHolidays"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <br />
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["PromotionSalaryIncrease"]?.N}
                                    label=""
                                    name="PromotionSalaryIncrease_N"
                                    value={OrientationChecklistCheckBoxResult["PromotionSalaryIncrease"]?.N}
                                />
                                <br />
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["WorkOfficehours"]?.N}
                                    label=""
                                    name="WorkOfficehours_N"
                                    value={OrientationChecklistCheckBoxResult["WorkOfficehours"]?.N}
                                />
                                <br />
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["OnCallOnInPolicy"]?.N}
                                    label=""
                                    name="OnCallOnInPolicy_N"
                                    value={OrientationChecklistCheckBoxResult["OnCallOnInPolicy"]?.N}
                                />
                                <br />
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["PaidHolidays"]?.N}
                                    label=""
                                    name="PaidHolidays_N"
                                    value={OrientationChecklistCheckBoxResult["PaidHolidays"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <br />
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["PromotionSalaryIncrease"]?.NA}
                                    label=""
                                    name="PromotionSalaryIncrease_NA"
                                    value={OrientationChecklistCheckBoxResult["PromotionSalaryIncrease"]?.NA}
                                />
                                <br />
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["WorkOfficehours"]?.NA}
                                    label=""
                                    name="WorkOfficehours_NA"
                                    value={OrientationChecklistCheckBoxResult["WorkOfficehours"]?.NA}
                                />
                                <br />
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["OnCallOnInPolicy"]?.NA}
                                    label=""
                                    name="OnCallOnInPolicy_NA"
                                    value={OrientationChecklistCheckBoxResult["OnCallOnInPolicy"]?.NA}
                                />
                                <br />
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["PaidHolidays"]?.NA}
                                    label=""
                                    name="PaidHolidays_NA"
                                    value={OrientationChecklistCheckBoxResult["PaidHolidays"]?.NA}
                                />
                            </td>
                            <td>
                                Safety for all activities ( in the home, in the office, visiting different neighborhoods
                                and using equipment) and to report safety concerns or adverse events to immediate
                                supervisor ASAP
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["SafetyForActivities"]?.Y}
                                    label=""
                                    name="SafetyForActivities_Y"
                                    value={OrientationChecklistCheckBoxResult["SafetyForActivities"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["SafetyForActivities"]?.N}
                                    label=""
                                    name="SafetyForActivities_N"
                                    value={OrientationChecklistCheckBoxResult["SafetyForActivities"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["SafetyForActivities"]?.NA}
                                    label=""
                                    name="SafetyForActivities_NA"
                                    value={OrientationChecklistCheckBoxResult["SafetyForActivities"]?.NA}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Sick Leave</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["SickLeave"]?.Y}
                                    label=""
                                    name="SickLeave_Y"
                                    value={OrientationChecklistCheckBoxResult["SickLeave"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["SickLeave"]?.N}
                                    label=""
                                    name="SickLeave_N"
                                    value={OrientationChecklistCheckBoxResult["SickLeave"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["SickLeave"]?.NA}
                                    label=""
                                    name="SickLeave_NA"
                                    value={OrientationChecklistCheckBoxResult["SickLeave"]?.NA}
                                />
                            </td>
                            <td>Universal Precautions, Biomedical Waste disposal</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={
                                        OrientationChecklistCheckBoxResult["UniversalPrecautionsBiomedicalWaste"]?.Y
                                    }
                                    label=""
                                    name="UniversalPrecautionsBiomedicalWaste_Y"
                                    value={OrientationChecklistCheckBoxResult["UniversalPrecautionsBiomedicalWaste"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={
                                        OrientationChecklistCheckBoxResult["UniversalPrecautionsBiomedicalWaste"]?.N
                                    }
                                    label=""
                                    name="UniversalPrecautionsBiomedicalWaste_N"
                                    value={OrientationChecklistCheckBoxResult["UniversalPrecautionsBiomedicalWaste"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={
                                        OrientationChecklistCheckBoxResult["UniversalPrecautionsBiomedicalWaste"]?.NA
                                    }
                                    label=""
                                    name="UniversalPrecautionsBiomedicalWaste_NA"
                                    value={
                                        OrientationChecklistCheckBoxResult["UniversalPrecautionsBiomedicalWaste"]?.NA
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>AbsenceWithoutNotice</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["AbsenceWithoutNotice"]?.Y}
                                    label=""
                                    name="AbsenceWithoutNotice_Y"
                                    value={OrientationChecklistCheckBoxResult["AbsenceWithoutNotice"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["AbsenceWithoutNotice"]?.N}
                                    label=""
                                    name="AbsenceWithoutNotice_N"
                                    value={OrientationChecklistCheckBoxResult["AbsenceWithoutNotice"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["AbsenceWithoutNotice"]?.NA}
                                    label=""
                                    name="AbsenceWithoutNotice_NA"
                                    value={OrientationChecklistCheckBoxResult["AbsenceWithoutNotice"]?.NA}
                                />
                            </td>
                            <td>Infection Control</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["InfectionControl"]?.Y}
                                    label=""
                                    name="InfectionControl_Y"
                                    value={OrientationChecklistCheckBoxResult["InfectionControl"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["InfectionControl"]?.N}
                                    label=""
                                    name="InfectionControl_N"
                                    value={OrientationChecklistCheckBoxResult["InfectionControl"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["InfectionControl"]?.NA}
                                    label=""
                                    name="InfectionControl_NA"
                                    value={OrientationChecklistCheckBoxResult["InfectionControl"]?.NA}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Vacation</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["Vacation"]?.Y}
                                    label=""
                                    name="Vacation_Y"
                                    value={OrientationChecklistCheckBoxResult["Vacation"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["Vacation_N"]?.N}
                                    label=""
                                    name="Vacation_N"
                                    value={OrientationChecklistCheckBoxResult["Vacation_N"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["Vacation"]?.NA}
                                    label=""
                                    name="Vacation_NA"
                                    value={OrientationChecklistCheckBoxResult["Vacation_NA"]?.NA}
                                />
                            </td>
                            <td>OSHAHIVServices</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["OSHAHIVServices"]?.Y}
                                    label=""
                                    name="OSHAHIVServices_Y"
                                    value={OrientationChecklistCheckBoxResult["OSHAHIVServices"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["OSHAHIVServices"]?.N}
                                    label=""
                                    name="OSHAHIVServices_N"
                                    value={OrientationChecklistCheckBoxResult["OSHAHIVServices"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["OSHAHIVServices"]?.NA}
                                    label=""
                                    name="OSHAHIVServices_NA"
                                    value={OrientationChecklistCheckBoxResult["OSHAHIVServices"]?.NA}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Termination/Resignation</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["TerminationResignation"]?.Y}
                                    label=""
                                    name="TerminationResignation_Y"
                                    value={OrientationChecklistCheckBoxResult["TerminationResignation"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["TerminationResignation"]?.N}
                                    label=""
                                    name="TerminationResignation_N"
                                    value={OrientationChecklistCheckBoxResult["TerminationResignation"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["TerminationResignation"]?.NA}
                                    label=""
                                    name="TerminationResignation_NA"
                                    value={OrientationChecklistCheckBoxResult["TerminationResignation"]?.NA}
                                />
                            </td>
                            <td>Documentation</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["Documentation"]?.Y}
                                    label=""
                                    name="Documentation_Y"
                                    value={OrientationChecklistCheckBoxResult["Documentation"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["Documentation"]?.N}
                                    label=""
                                    name="Documentation_N"
                                    value={OrientationChecklistCheckBoxResult["Documentation"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["Documentation"]?.NA}
                                    label=""
                                    name="Documentation_NA"
                                    value={OrientationChecklistCheckBoxResult["Documentation"]?.NA}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Employee Expectations</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["EmployeeExpectations"]?.Y}
                                    label=""
                                    name="EmployeeExpectations_Y"
                                    value={OrientationChecklistCheckBoxResult["EmployeeExpectations"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["EmployeeExpectations"]?.N}
                                    label=""
                                    name="EmployeeExpectations_N"
                                    value={OrientationChecklistCheckBoxResult["EmployeeExpectations"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["EmployeeExpectations"]?.NA}
                                    label=""
                                    name="EmployeeExpectations_NA"
                                    value={OrientationChecklistCheckBoxResult["EmployeeExpectations"]?.NA}
                                />
                            </td>
                            <td>Consent for Treatment</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["ConsentforTreatment"]?.Y}
                                    label=""
                                    name="ConsentforTreatment_Y"
                                    value={OrientationChecklistCheckBoxResult["ConsentforTreatment"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["ConsentforTreatment"]?.N}
                                    label=""
                                    name="ConsentforTreatment_N"
                                    value={OrientationChecklistCheckBoxResult["ConsentforTreatment"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["ConsentforTreatment"]?.NA}
                                    label=""
                                    name="ConsentforTreatment_NA"
                                    value={OrientationChecklistCheckBoxResult["ConsentforTreatment"]?.NA}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Disciplinary process and Action</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["DisciplinaryProcessAction"]?.Y}
                                    label=""
                                    name="DisciplinaryProcessAction_Y"
                                    value={OrientationChecklistCheckBoxResult["DisciplinaryProcessAction"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["DisciplinaryProcessAction"]?.N}
                                    label=""
                                    name="DisciplinaryProcessAction_N"
                                    value={OrientationChecklistCheckBoxResult["DisciplinaryProcessAction"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["DisciplinaryProcessAction"]?.NA}
                                    label=""
                                    name="DisciplinaryProcessAction_NA"
                                    value={OrientationChecklistCheckBoxResult["DisciplinaryProcessAction"]?.NA}
                                />
                            </td>
                            <td>Contents of Sign-up Packet</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["ContentsSignUpPacket"]?.Y}
                                    label=""
                                    name="ContentsSignUpPacket_Y"
                                    value={OrientationChecklistCheckBoxResult["ContentsSignUpPacket"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["ContentsSignUpPacket"]?.N}
                                    label=""
                                    name="ContentsSignUpPacket_N"
                                    value={OrientationChecklistCheckBoxResult["ContentsSignUpPacket"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["ContentsSignUpPacket"]?.NA}
                                    label=""
                                    name="ContentsSignUpPacket_NA"
                                    value={OrientationChecklistCheckBoxResult["ContentsSignUpPacket"]?.NA}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Grievance</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["Grievance"]?.Y}
                                    label=""
                                    name="Grievance_Y"
                                    value={OrientationChecklistCheckBoxResult["Grievance"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["Grievance"]?.N}
                                    label=""
                                    name="Grievance_N"
                                    value={OrientationChecklistCheckBoxResult["Grievance"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["Grievance"]?.NA}
                                    label=""
                                    name="Grievance_NA"
                                    value={OrientationChecklistCheckBoxResult["Grievance_NA"]?.NA}
                                />
                            </td>
                            <td>Communication Log maintained in the home</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["CommunicationLogmaintained"]?.Y}
                                    label=""
                                    name="CommunicationLogmaintained_Y"
                                    value={OrientationChecklistCheckBoxResult["CommunicationLogmaintained"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["CommunicationLogmaintained"]?.N}
                                    label=""
                                    name="CommunicationLogmaintained_N"
                                    value={OrientationChecklistCheckBoxResult["CommunicationLogmaintained"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["CommunicationLogmaintained"]?.NA}
                                    label=""
                                    name="CommunicationLogmaintained_NA"
                                    value={OrientationChecklistCheckBoxResult["CommunicationLogmaintained"]?.NA}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Harassment</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["Harassment"]?.Y}
                                    label=""
                                    name="Harassment_Y"
                                    value={OrientationChecklistCheckBoxResult["Harassment"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["Harassment"]?.N}
                                    label=""
                                    name="Harassment_N"
                                    value={OrientationChecklistCheckBoxResult["Harassment"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["Harassment"]?.NA}
                                    label=""
                                    name="Harassment_NA"
                                    value={OrientationChecklistCheckBoxResult["Harassment"]?.NA}
                                />
                            </td>
                            <td>Coordination of Services</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["CoordinationofServices"]?.Y}
                                    label=""
                                    name="CoordinationofServices_Y"
                                    value={OrientationChecklistCheckBoxResult["CoordinationofServices"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["CoordinationofServices"]?.N}
                                    label=""
                                    name="CoordinationofServices_N"
                                    value={OrientationChecklistCheckBoxResult["CoordinationofServices"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["CoordinationofServices"]?.NA}
                                    label=""
                                    name="CoordinationofServices_NA"
                                    value={OrientationChecklistCheckBoxResult["CoordinationofServices"]?.NA}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>AcceptanceGift</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["AcceptanceGift"]?.Y}
                                    label=""
                                    name="AcceptanceGift_Y"
                                    value={OrientationChecklistCheckBoxResult["AcceptanceGift"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["AcceptanceGift"]?.N}
                                    label=""
                                    name="AcceptanceGift_N"
                                    value={OrientationChecklistCheckBoxResult["AcceptanceGift_N"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["AcceptanceGift"]?.NA}
                                    label=""
                                    name="AcceptanceGift_NA"
                                    value={OrientationChecklistCheckBoxResult["AcceptanceGift"]?.NA}
                                />
                            </td>
                            <td>Modification Orders</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["ModificationOrders"]?.Y}
                                    label=""
                                    name="ModificationOrders_Y"
                                    value={OrientationChecklistCheckBoxResult["ModificationOrders"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["ModificationOrders"]?.N}
                                    label=""
                                    name="ModificationOrders_N"
                                    value={OrientationChecklistCheckBoxResult["ModificationOrders"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["ModificationOrders"]?.NA}
                                    label=""
                                    name="ModificationOrders_NA"
                                    value={OrientationChecklistCheckBoxResult["ModificationOrders"]?.NA}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Conflict of Interests</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["ConflictofInterests"]?.Y}
                                    label=""
                                    name="ConflictofInterests_Y"
                                    value={OrientationChecklistCheckBoxResult["ConflictofInterests"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["ConflictofInterests"]?.N}
                                    label=""
                                    name="ConflictofInterests_N"
                                    value={OrientationChecklistCheckBoxResult["ConflictofInterests"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["ConflictofInterests"]?.NA}
                                    label=""
                                    name="ConflictofInterests_NA"
                                    value={OrientationChecklistCheckBoxResult["ConflictofInterests"]?.NA}
                                />
                            </td>
                            <td>Home Bound Status</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["HomeBoundStatus"]?.Y}
                                    label=""
                                    name="HomeBoundStatus_Y"
                                    value={OrientationChecklistCheckBoxResult["HomeBoundStatus"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["HomeBoundStatus"]?.N}
                                    label=""
                                    name="HomeBoundStatus_N"
                                    value={OrientationChecklistCheckBoxResult["HomeBoundStatus"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["HomeBoundStatus"]?.NA}
                                    label=""
                                    name="HomeBoundStatus_NA"
                                    value={OrientationChecklistCheckBoxResult["HomeBoundStatus"]?.NA}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <tr>Employee Health Requirement Policy (Annual TB testing)</tr>
                                Clinical Records Policy{" "}
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["EmployeeHealthRequirement"]?.Y}
                                    label=""
                                    name="EmployeeHealthRequirement_Y"
                                    value={OrientationChecklistCheckBoxResult["EmployeeHealthRequirement"]?.Y}
                                />{" "}
                                <br />
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["ClinicalRecordsPolicy"]?.Y}
                                    label=""
                                    name="ClinicalRecordsPolicy_Y"
                                    value={OrientationChecklistCheckBoxResult["ClinicalRecordsPolicy"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["EmployeeHealthRequirement"]?.N}
                                    label=""
                                    name="EmployeeHealthRequirement_N"
                                    value={OrientationChecklistCheckBoxResult["EmployeeHealthRequirement"]?.N}
                                />{" "}
                                <br />
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["ClinicalRecordsPolicy"]?.N}
                                    label=""
                                    name="ClinicalRecordsPolicy_N"
                                    value={OrientationChecklistCheckBoxResult["ClinicalRecordsPolicy"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["EmployeeHealthRequirement"]?.NA}
                                    label=""
                                    name="EmployeeHealthRequirement_NA"
                                    value={OrientationChecklistCheckBoxResult["EmployeeHealthRequirement"]?.NA}
                                />
                                <br />
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["ClinicalRecordsPolicy"]?.NA}
                                    label=""
                                    name="ClinicalRecordsPolicy_NA"
                                    value={OrientationChecklistCheckBoxResult["ClinicalRecordsPolicy"]?.NA}
                                />
                            </td>
                            <td>
                                Effective communication to include write down/read back/confirm verbal orders and
                                critical test results, avoiding prohibited abbreviations.
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["EffectiveDommunication"]?.Y}
                                    label=""
                                    name="EffectiveDommunication_Y"
                                    value={OrientationChecklistCheckBoxResult["EffectiveDommunication"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["EffectiveDommunication"]?.N}
                                    label=""
                                    name="EffectiveDommunication_N"
                                    value={OrientationChecklistCheckBoxResult["EffectiveDommunication"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["EffectiveDommunication"]?.NA}
                                    label=""
                                    name="EffectiveDommunication_NA"
                                    value={OrientationChecklistCheckBoxResult["EffectiveDommunication"]?.NA}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <tr>Plan of Care Policy</tr>
                                Code of Conduct
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["PlanofCarePolicy"]?.Y}
                                    label=""
                                    name="PlanofCarePolicy_Y"
                                    value={OrientationChecklistCheckBoxResult["PlanofCarePolicy"]?.Y}
                                />
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["CodeofConduct"]?.Y}
                                    label=""
                                    name="CodeofConduct_Y"
                                    value={OrientationChecklistCheckBoxResult["CodeofConduct"]?.Y}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["PlanofCarePolicy"]?.N}
                                    label=""
                                    name="PlanofCarePolicy_N"
                                    value={OrientationChecklistCheckBoxResult["PlanofCarePolicy"]?.N}
                                />
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["CodeofConduct"]?.N}
                                    label=""
                                    name="CodeofConduct_N"
                                    value={OrientationChecklistCheckBoxResult["CodeofConduct"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["PlanofCarePolicy"]?.NA}
                                    label=""
                                    name="PlanofCarePolicy_NA"
                                    value={OrientationChecklistCheckBoxResult["PlanofCarePolicy"]?.NA}
                                />
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["CodeofConduct"]?.NA}
                                    label=""
                                    name="CodeofConduct_NA"
                                    value={OrientationChecklistCheckBoxResult["CodeofConduct"]?.NA}
                                />
                            </td>
                            <td>Reports of case Conference & Supervisor visits policies</td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["ReportsofcaseConference"]?.Y}
                                    label=""
                                    name="ReportsofcaseConference_Y"
                                    value={OrientationChecklistCheckBoxResult["ReportsofcaseConference"]?.Y}
                                />
                            </td>

                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["ReportsofcaseConference"]?.N}
                                    label=""
                                    name="ReportsofcaseConference_N"
                                    value={OrientationChecklistCheckBoxResult["ReportsofcaseConference"]?.N}
                                />
                            </td>
                            <td>
                                {" "}
                                <CheckboxWLabel
                                    checked={OrientationChecklistCheckBoxResult["ReportsofcaseConference"]?.NA}
                                    label=""
                                    name="ReportsofcaseConference_NA"
                                    value={OrientationChecklistCheckBoxResult["ReportsofcaseConference"]?.NA}
                                />
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OrientationCheckFirst;
