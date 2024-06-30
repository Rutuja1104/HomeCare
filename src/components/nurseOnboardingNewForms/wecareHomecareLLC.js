import React, { useEffect } from "react";
import TextInput from "../input/textinput/TextInput";
import ResponsiveBox from "../responsivebox/ResponsiveBox";
import DatePicker from "../datePicker/DatePicker";
import { generalValidator } from "../../libs/utility/validators/GeneralValidator";
import { useDispatch, useSelector } from "react-redux";
import {
    setWeCareHomeCareLLCForm,
    setWeCareHomeCareLLCFormCheckBoxResult,
} from "../../pages/NurseOnboarding/NurseOnboardingSlice";
import { componentKey as NurseOnboardingComponentKey } from "../../pages/NurseOnboarding/NurseOnboardingSlice";
import CheckboxWLabel from "../checkbox/checkboxwlabel/CheckboxWLabel";
import { useParams } from "react-router-dom";
import Base64Image from "../base64Image/Base64Image";
import General from "../../libs/utility/General";
import { getNurseOnboardingFormDetails } from "../../pages/NurseOnboarding/NurseOnboardingSaga";

function WecareHomecareLLC() {
    const dispatch = useDispatch();
    const { applicationId, agencyId } = useParams();

    const {
        WeCareHomeCareLLCForm,
        weCareHomeCareLLCFormCheckBoxResult,
        signatureInBase64,
        nurseOnboardingformsDetail,
    } = useSelector((state) => state[NurseOnboardingComponentKey]);
    useEffect(() => {
        dispatch(getNurseOnboardingFormDetails({ agencyId, applicationId, formType: "weCareHomeCareLLC" }));
    }, []);
    useEffect(() => {
        if (!nurseOnboardingformsDetail?.data) return;
        if (nurseOnboardingformsDetail?.fromType === "weCareHomeCareLLC") {
            let WeCareHomeCareLLCForm = {
                id: nurseOnboardingformsDetail?.id ? nurseOnboardingformsDetail?.id : undefined,
                allRequiredFieldsTouched: nurseOnboardingformsDetail?.data?.allRequiredFieldsTouched,
                AgencyStaffSignature: nurseOnboardingformsDetail?.data?.AgencyStaffSignature,
                AgencyStaffName: {
                    value: nurseOnboardingformsDetail?.data?.AgencyStaffName,
                    errors: {},
                    rules: { required: true },
                },
                AgencyStaffTitle: {
                    value: nurseOnboardingformsDetail?.data?.AgencyStaffTitle,
                    errors: {},
                    rules: { required: true },
                },
                AgencyStaffDateCompleted: {
                    value: nurseOnboardingformsDetail?.data?.AgencyStaffDateCompleted,
                    errors: {},
                    rules: { required: true },
                },
                EmployeeName: {
                    value: nurseOnboardingformsDetail?.data?.EmployeeName,
                    errors: {},
                    rules: { required: true },
                },
                EmployeeSign: nurseOnboardingformsDetail?.data?.EmployeeSign,
                Date: { value: nurseOnboardingformsDetail?.data?.Date, errors: {}, rules: { required: true } },
            };
            if (
                nurseOnboardingformsDetail?.data?.weCareHomeCareLLCFormCheckBoxResult &&
                typeof nurseOnboardingformsDetail?.data?.weCareHomeCareLLCFormCheckBoxResult === "object"
            ) {
                Object.keys(nurseOnboardingformsDetail?.data?.weCareHomeCareLLCFormCheckBoxResult).forEach((data) => {
                    dispatch(setWeCareHomeCareLLCFormCheckBoxResult(data));
                });
            }

            dispatch(setWeCareHomeCareLLCForm(WeCareHomeCareLLCForm));
        }
    }, [nurseOnboardingformsDetail]);

    const onChangeHandler = (event, rules) => {
        const { name, value } = event.target;

        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(setWeCareHomeCareLLCForm({ [name]: { value, errors, rules } }));
        } else {
            dispatch(setWeCareHomeCareLLCForm({ [name]: { value } }));
        }
    };

    return (
        <div className="referenceCheck">
            <div className="header2" style={{ marginBottom: "30px" }}>
                ORIENTATION CHECKLIST
            </div>
            <div className="labelStyleReference">
                <div>(Must be completed and signed where appropriate prior to assignment.</div>
                employee signs off with check mark against each item)
            </div>
            <br />
            <div className="body labelStyleReference">
                <div className="displayFlex">
                    1. Overview of Agency’s Organizational Structure, Policies and Procedures{" "}
                    <CheckboxWLabel
                        checked={weCareHomeCareLLCFormCheckBoxResult["OverviewAgencys"]}
                        label=""
                        name="OverviewAgencys"
                        onChangeCb={(e) => {
                            dispatch(setWeCareHomeCareLLCFormCheckBoxResult("OverviewAgencys"));
                        }}
                        value={weCareHomeCareLLCFormCheckBoxResult["OverviewAgencys"]}
                    />{" "}
                </div>
                <div>2. Summary of Select Policies and Procedures*:</div>
                <div className="displayFlex">
                    a. Incident Reporting, Abuse and Neglect Reporting
                    <CheckboxWLabel
                        checked={weCareHomeCareLLCFormCheckBoxResult["IncidentReporting"]}
                        label=""
                        name="IncidentReporting"
                        onChangeCb={(e) => {
                            dispatch(setWeCareHomeCareLLCFormCheckBoxResult("IncidentReporting"));
                        }}
                        value={weCareHomeCareLLCFormCheckBoxResult["IncidentReporting"]}
                    />{" "}
                </div>
                <div className="displayFlex">
                    b. HIPAA Review and Client’s Privacy and Confidentiality Rights
                    <CheckboxWLabel
                        checked={weCareHomeCareLLCFormCheckBoxResult["HIPAAReviewandClients"]}
                        label=""
                        name="HIPAAReviewandClients"
                        onChangeCb={(e) => {
                            dispatch(setWeCareHomeCareLLCFormCheckBoxResult("HIPAAReviewandClients"));
                        }}
                        value={weCareHomeCareLLCFormCheckBoxResult["HIPAAReviewandClients"]}
                    />{" "}
                </div>
                <div className="displayFlex">
                    c. Timesheet and Documentation{" "}
                    <CheckboxWLabel
                        checked={weCareHomeCareLLCFormCheckBoxResult["TimesheetandDocumentation"]}
                        label=""
                        name="TimesheetandDocumentation"
                        onChangeCb={(e) => {
                            dispatch(setWeCareHomeCareLLCFormCheckBoxResult("TimesheetandDocumentation"));
                        }}
                        value={weCareHomeCareLLCFormCheckBoxResult["TimesheetandDocumentation"]}
                    />{" "}
                </div>
                <div className="displayFlex">
                    d. Standard Precautions and Infection Control{" "}
                    <CheckboxWLabel
                        checked={weCareHomeCareLLCFormCheckBoxResult["StandardPrecautions"]}
                        label=""
                        name="StandardPrecautions"
                        onChangeCb={(e) => {
                            dispatch(setWeCareHomeCareLLCFormCheckBoxResult("StandardPrecautions"));
                        }}
                        value={weCareHomeCareLLCFormCheckBoxResult["StandardPrecautions"]}
                    />{" "}
                </div>
                <div className="displayFlex">
                    e. Respecting Cultural Diversity
                    <CheckboxWLabel
                        checked={weCareHomeCareLLCFormCheckBoxResult["RespectingCultural"]}
                        label=""
                        name="RespectingCultural"
                        onChangeCb={(e) => {
                            dispatch(setWeCareHomeCareLLCFormCheckBoxResult("RespectingCultural"));
                        }}
                        value={weCareHomeCareLLCFormCheckBoxResult["RespectingCultural"]}
                    />{" "}
                </div>
                <div className="displayFlex">
                    f. Complaint and Grievance Procedures
                    <CheckboxWLabel
                        checked={weCareHomeCareLLCFormCheckBoxResult["ComplaintGrievance"]}
                        label=""
                        name="ComplaintGrievance"
                        onChangeCb={(e) => {
                            dispatch(setWeCareHomeCareLLCFormCheckBoxResult("ComplaintGrievance"));
                        }}
                        value={weCareHomeCareLLCFormCheckBoxResult["ComplaintGrievance"]}
                    />{" "}
                </div>
                <div className="displayFlex">
                    g. Fraud Reporting
                    <CheckboxWLabel
                        checked={weCareHomeCareLLCFormCheckBoxResult["FraudReporting"]}
                        label=""
                        name="FraudReporting"
                        onChangeCb={(e) => {
                            dispatch(setWeCareHomeCareLLCFormCheckBoxResult("FraudReporting"));
                        }}
                        value={weCareHomeCareLLCFormCheckBoxResult["FraudReporting"]}
                    />{" "}
                </div>
                <div className="displayFlex">
                    h. Safety{" "}
                    <CheckboxWLabel
                        checked={weCareHomeCareLLCFormCheckBoxResult["Safety"]}
                        label=""
                        name="Safety"
                        onChangeCb={(e) => {
                            dispatch(setWeCareHomeCareLLCFormCheckBoxResult("Safety"));
                        }}
                        value={weCareHomeCareLLCFormCheckBoxResult["Safety"]}
                    />
                </div>
                <div className="displayFlex">
                    i. Emergency Preparedness Procedure
                    <CheckboxWLabel
                        checked={weCareHomeCareLLCFormCheckBoxResult["EmergencyPreparednessProcedure"]}
                        label=""
                        name="EmergencyPreparednessProcedure"
                        onChangeCb={(e) => {
                            dispatch(setWeCareHomeCareLLCFormCheckBoxResult("EmergencyPreparednessProcedure"));
                        }}
                        value={weCareHomeCareLLCFormCheckBoxResult["EmergencyPreparednessProcedure"]}
                    />
                </div>
                <div className="displayFlex">
                    j. Job Expectations and Scope of Work{" "}
                    <CheckboxWLabel
                        checked={weCareHomeCareLLCFormCheckBoxResult["JobExpectationsScope"]}
                        label=""
                        name="JobExpectationsScope"
                        onChangeCb={(e) => {
                            dispatch(setWeCareHomeCareLLCFormCheckBoxResult("JobExpectationsScope"));
                        }}
                        value={weCareHomeCareLLCFormCheckBoxResult["JobExpectationsScope"]}
                    />
                </div>
                <div className="displayFlex">
                    k. Affirmative Action, EEO and Non-Discrimination Practices{" "}
                    <CheckboxWLabel
                        checked={weCareHomeCareLLCFormCheckBoxResult["AffirmativeAction"]}
                        label=""
                        name="AffirmativeAction"
                        onChangeCb={(e) => {
                            dispatch(setWeCareHomeCareLLCFormCheckBoxResult("AffirmativeAction"));
                        }}
                        value={weCareHomeCareLLCFormCheckBoxResult["AffirmativeAction"]}
                    />
                </div>
                <div className="displayFlex">
                    l. Criminal Background, BCI&I Requirements{" "}
                    <CheckboxWLabel
                        checked={weCareHomeCareLLCFormCheckBoxResult["CriminalBackground"]}
                        label=""
                        name="CriminalBackground"
                        onChangeCb={(e) => {
                            dispatch(setWeCareHomeCareLLCFormCheckBoxResult("CriminalBackground"));
                        }}
                        value={weCareHomeCareLLCFormCheckBoxResult["CriminalBackground"]}
                    />
                </div>
                <div className="displayFlex">
                    m. Health Screening Requirements{" "}
                    <CheckboxWLabel
                        checked={weCareHomeCareLLCFormCheckBoxResult["HealthScreeningRequirements"]}
                        label=""
                        name="HealthScreeningRequirements"
                        onChangeCb={(e) => {
                            dispatch(setWeCareHomeCareLLCFormCheckBoxResult("HealthScreeningRequirements"));
                        }}
                        value={weCareHomeCareLLCFormCheckBoxResult["HealthScreeningRequirements"]}
                    />
                </div>
                <div className="displayFlex">
                    n. Conveying of Charges{" "}
                    <CheckboxWLabel
                        checked={weCareHomeCareLLCFormCheckBoxResult["ConveyingCharges"]}
                        label=""
                        name="ConveyingCharges"
                        onChangeCb={(e) => {
                            dispatch(setWeCareHomeCareLLCFormCheckBoxResult("ConveyingCharges"));
                        }}
                        value={weCareHomeCareLLCFormCheckBoxResult["ConveyingCharges"]}
                    />
                </div>
                <div className="displayFlex">
                    o. Client’s/Rights and Responsibilities{" "}
                    <CheckboxWLabel
                        checked={weCareHomeCareLLCFormCheckBoxResult["ClientRightsResponsibilities"]}
                        label=""
                        name="ClientRightsResponsibilities"
                        onChangeCb={(e) => {
                            dispatch(setWeCareHomeCareLLCFormCheckBoxResult("ClientRightsResponsibilities"));
                        }}
                        value={weCareHomeCareLLCFormCheckBoxResult["ClientRightsResponsibilities"]}
                    />
                </div>
                <div className="displayFlex">
                    3. Any outstanding application documents (see New Hire Checklist){" "}
                    <CheckboxWLabel
                        checked={weCareHomeCareLLCFormCheckBoxResult["Anyoutstandingapplication"]}
                        label=""
                        name="Anyoutstandingapplication"
                        onChangeCb={(e) => {
                            dispatch(setWeCareHomeCareLLCFormCheckBoxResult("Anyoutstandingapplication"));
                        }}
                        value={weCareHomeCareLLCFormCheckBoxResult["Anyoutstandingapplication"]}
                    />
                </div>
                <div className="displayFlex">
                    4. Signed Job Description{" "}
                    <CheckboxWLabel
                        checked={weCareHomeCareLLCFormCheckBoxResult["SignedJobDescription"]}
                        label=""
                        name="SignedJobDescription"
                        onChangeCb={(e) => {
                            dispatch(setWeCareHomeCareLLCFormCheckBoxResult("SignedJobDescription"));
                        }}
                        value={weCareHomeCareLLCFormCheckBoxResult["SignedJobDescription"]}
                    />
                </div>
                <div className="displayFlex">
                    5. Signed Code of Ethics{" "}
                    <CheckboxWLabel
                        checked={weCareHomeCareLLCFormCheckBoxResult["SignedCodeofEthics"]}
                        label=""
                        name="SignedCodeofEthics"
                        onChangeCb={(e) => {
                            dispatch(setWeCareHomeCareLLCFormCheckBoxResult("SignedCodeofEthics"));
                        }}
                        value={weCareHomeCareLLCFormCheckBoxResult["SignedCodeofEthics"]}
                    />
                </div>
                <div className="displayFlex">
                    6. Signed Confidentiality Statement{" "}
                    <CheckboxWLabel
                        checked={weCareHomeCareLLCFormCheckBoxResult["SignedConfidentialityStatement"]}
                        label=""
                        name="SignedConfidentialityStatement"
                        onChangeCb={(e) => {
                            dispatch(setWeCareHomeCareLLCFormCheckBoxResult("SignedConfidentialityStatement"));
                        }}
                        value={weCareHomeCareLLCFormCheckBoxResult["SignedConfidentialityStatement"]}
                    />
                </div>
                <div className="displayFlex">
                    7. Signed Conflict of Interest Statement (if applicable){" "}
                    <CheckboxWLabel
                        checked={weCareHomeCareLLCFormCheckBoxResult["SignedConflictInterest"]}
                        label=""
                        name="SignedConflictInterest"
                        onChangeCb={(e) => {
                            dispatch(setWeCareHomeCareLLCFormCheckBoxResult("SignedConflictInterest"));
                        }}
                        value={weCareHomeCareLLCFormCheckBoxResult["SignedConflictInterest"]}
                    />
                </div>
                <div className="displayFlex">
                    8. In-service Requirements{" "}
                    <CheckboxWLabel
                        checked={weCareHomeCareLLCFormCheckBoxResult["InServiceRequirements"]}
                        label=""
                        name="InServiceRequirements"
                        onChangeCb={(e) => {
                            dispatch(setWeCareHomeCareLLCFormCheckBoxResult("InServiceRequirements"));
                        }}
                        value={weCareHomeCareLLCFormCheckBoxResult["InServiceRequirements"]}
                    />
                </div>
                <div className="displayFlex">
                    9. Employee Handbook{" "}
                    <CheckboxWLabel
                        checked={weCareHomeCareLLCFormCheckBoxResult["EmployeeHandbook"]}
                        label=""
                        name="EmployeeHandbook"
                        onChangeCb={(e) => {
                            dispatch(setWeCareHomeCareLLCFormCheckBoxResult("EmployeeHandbook"));
                        }}
                        value={weCareHomeCareLLCFormCheckBoxResult["EmployeeHandbook"]}
                    />
                </div>
                <div className="displayFlex">
                    10. ID Badge{" "}
                    <CheckboxWLabel
                        checked={weCareHomeCareLLCFormCheckBoxResult["IDBadge"]}
                        label=""
                        name="IDBadge"
                        onChangeCb={(e) => {
                            dispatch(setWeCareHomeCareLLCFormCheckBoxResult("IDBadge"));
                        }}
                        value={weCareHomeCareLLCFormCheckBoxResult["IDBadge"]}
                    />
                </div>
                <div className="displayFlex">
                    11. Medicare/Medicaid Condition of participation{" "}
                    <CheckboxWLabel
                        checked={weCareHomeCareLLCFormCheckBoxResult["MedicareMedicaidCondition"]}
                        label=""
                        name="MedicareMedicaidCondition"
                        onChangeCb={(e) => {
                            dispatch(setWeCareHomeCareLLCFormCheckBoxResult("MedicareMedicaidCondition"));
                        }}
                        value={weCareHomeCareLLCFormCheckBoxResult["MedicareMedicaidCondition"]}
                    />
                </div>
                <div className="displayFlex">
                    12. MDA{" "}
                    <CheckboxWLabel
                        checked={weCareHomeCareLLCFormCheckBoxResult["MDA"]}
                        label=""
                        name="MDA"
                        onChangeCb={(e) => {
                            dispatch(setWeCareHomeCareLLCFormCheckBoxResult("MDA"));
                        }}
                        value={weCareHomeCareLLCFormCheckBoxResult["MDA"]}
                    />
                </div>
                <div className="displayFlex">
                    13. TB{" "}
                    <CheckboxWLabel
                        checked={weCareHomeCareLLCFormCheckBoxResult["TB"]}
                        label=""
                        name="TB"
                        onChangeCb={(e) => {
                            dispatch(setWeCareHomeCareLLCFormCheckBoxResult("TB"));
                        }}
                        value={weCareHomeCareLLCFormCheckBoxResult["TB"]}
                    />
                </div>
                <div>14. Other_ </div>
                <br />
                <br />
                *Requires annual review/updates
            </div>
            <div className="labelStyleReference">Orientation Facilitated by:</div>
            <ResponsiveBox size={300}>
                <div>
                    {" "}
                    <TextInput
                        type="text"
                        placeHolder=""
                        name="AgencyStaffName"
                        label="Agency Staff Name"
                        onChangeCb={(event) => onChangeHandler(event)}
                        value={WeCareHomeCareLLCForm?.AgencyStaffName?.value}
                        errors={WeCareHomeCareLLCForm?.AgencyStaffName?.errors}
                        rules={WeCareHomeCareLLCForm?.AgencyStaffName?.rules}
                        formSubmitted={WeCareHomeCareLLCForm?.allRequiredFieldsTouched}
                    />
                </div>
                <div>
                    <TextInput
                        type="text"
                        placeHolder=""
                        name="AgencyStaffTitle"
                        label="Agency Staff Title"
                        onChangeCb={(event) => onChangeHandler(event)}
                        value={WeCareHomeCareLLCForm?.AgencyStaffTitle?.value}
                        errors={WeCareHomeCareLLCForm?.AgencyStaffTitle?.errors}
                        rules={WeCareHomeCareLLCForm?.AgencyStaffTitle?.rules}
                        formSubmitted={WeCareHomeCareLLCForm?.allRequiredFieldsTouched}
                    />
                </div>
            </ResponsiveBox>
            <ResponsiveBox size={300}>
                <div>
                    {" "}
                    <DatePicker
                        label="Date Completed :"
                        name="AgencyStaffDateCompleted"
                        onChangeCb={(event) => onChangeHandler(event)}
                        value={WeCareHomeCareLLCForm?.AgencyStaffDateCompleted?.value}
                        errors={WeCareHomeCareLLCForm?.AgencyStaffDateCompleted?.errors}
                        rules={WeCareHomeCareLLCForm?.AgencyStaffDateCompleted?.rules}
                        formSubmitted={WeCareHomeCareLLCForm?.allRequiredFieldsTouched}
                    />
                </div>
                {/* <div style={{ display: "flex" }}>
                        {" "}
                        Agency Staff Signature :{" "}
                        <SignaturePad
                            saveSignatureCb={handleSaveSignatureClick2}
                            savedSignature={WeCareHomeCareLLCForm.AgencyStaffSignature}
                            isNextAllowed={false}
                        />
                    </div> */}
            </ResponsiveBox>
            <br />
            <br />
            <div className="labelStyleReference">
                My signature below verifies that I have received all the required documents to complete my application,
                that I have participated in the above Orientation session and received all information required to carry
                out my duties for the position for which I was hired
            </div>
            <br />
            <br />
            <ResponsiveBox size={300}>
                <div>
                    {" "}
                    <TextInput
                        type="text"
                        placeHolder=""
                        name="EmployeeName"
                        label="Employee Name"
                        onChangeCb={(event) => onChangeHandler(event)}
                        value={WeCareHomeCareLLCForm?.EmployeeName?.value}
                        errors={WeCareHomeCareLLCForm?.EmployeeName?.errors}
                        rules={WeCareHomeCareLLCForm?.EmployeeName?.rules}
                        formSubmitted={WeCareHomeCareLLCForm?.allRequiredFieldsTouched}
                    />
                </div>
                <div>
                    {" "}
                    <DatePicker
                        label="Date:"
                        name="Date"
                        onChangeCb={(event) => onChangeHandler(event)}
                        value={WeCareHomeCareLLCForm?.Date?.value}
                        errors={WeCareHomeCareLLCForm?.Date?.errors}
                        rules={WeCareHomeCareLLCForm?.Date?.rules}
                        formSubmitted={WeCareHomeCareLLCForm?.allRequiredFieldsTouched}
                    />
                </div>
            </ResponsiveBox>
            <ResponsiveBox size={300}>
                <Base64Image
                    base64={signatureInBase64 || nurseOnboardingformsDetail?.data?.EmployeeSign}
                    header="Applicant Signature"
                />
            </ResponsiveBox>
        </div>
    );
}

export default WecareHomecareLLC;
