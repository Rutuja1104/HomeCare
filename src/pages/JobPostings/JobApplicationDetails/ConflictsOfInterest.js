import { useDispatch, useSelector } from "react-redux";
import {
    componentKey,
    setConflictOfInterestFirstCheckbox,
    setConflictOfInterestForm,
    setConflictOfInterestSecondCheckbox,
} from "../../NurseOnboarding/NurseOnboardingSlice";
import { getNurseOnboardingFormDetails } from "../../NurseOnboarding/NurseOnboardingSaga";
import React, { useEffect } from "react";
import ResponsiveBox from "../../../components/responsivebox/ResponsiveBox";
import TextInput from "../../../components/input/textinput/TextInput";
import DatePicker from "../../../components/datePicker/DatePicker";
import Base64Image from "../../../components/base64Image/Base64Image";
import CheckboxWLabel from "../../../components/checkbox/checkboxwlabel/CheckboxWLabel";
import { componentKey as jobApplication } from "./JobApplicationDetailsSlice";

function ConflictsOfInterest() {
    const dispatch = useDispatch();

    const { ConflictOfInterest, signatureInBase64, nurseOnboardingformsDetail } = useSelector(
        (state) => state[componentKey]
    );
    const { jobApplicationCompleteDetails } = useSelector((state) => state[jobApplication]);

    useEffect(() => {
        if (!jobApplicationCompleteDetails?.JobApplication?.length) return;
        dispatch(
            getNurseOnboardingFormDetails({
                agencyId: jobApplicationCompleteDetails?.agencyId,
                applicationId: jobApplicationCompleteDetails?.JobApplication[0]?.id,
                formType: "conflictOfInterest",
            })
        );
    }, []);

    useEffect(() => {
        if (!nurseOnboardingformsDetail?.data) return;
        if (nurseOnboardingformsDetail?.fromType === "conflictOfInterest") {
            let conflictOfInterest = {
                allRequiredFieldsTouched: nurseOnboardingformsDetail?.data?.allRequiredFieldsTouched,
                Name: { value: nurseOnboardingformsDetail?.data?.Name, errors: {}, rules: { required: true } },
                Title: { value: nurseOnboardingformsDetail?.data?.Title, errors: {}, rules: { required: true } },
                Date: { value: nurseOnboardingformsDetail?.data?.Date, errors: {}, rules: { required: true } },
                desc: { value: nurseOnboardingformsDetail?.data?.desc, errors: {}, rules: { required: false } },
                dealWith: { value: nurseOnboardingformsDetail?.data?.dealWith, errors: {}, rules: { required: false } },
                sign: nurseOnboardingformsDetail?.data?.sign,
            };
            dispatch(setConflictOfInterestForm(conflictOfInterest));
            dispatch(setConflictOfInterestFirstCheckbox(nurseOnboardingformsDetail?.data?.checkBoxFirst));
            dispatch(setConflictOfInterestSecondCheckbox(nurseOnboardingformsDetail?.data?.checkBoxSecond));
        }
    }, [nurseOnboardingformsDetail]);

    return (
        <div className="nurse-onboarding-new-forms">
            <div className="conflictOfInterest">POLICY</div>
            <div className="conflictOfInterestContent">
                <div>
                    No Governing Board member, Professional Advisory Committee member or staff Member will place himself
                    or herself in a position where personal interest may influence decisions between agency and other
                    entities. All officers, directors, and management will adhere to the policy regarding avoiding
                    conflict of interest to ensure the agency’s mission is not harmed by their relationships.
                </div>
            </div>
            <br />
            <div className="conflictOfInterest">PURPOSE</div>
            <div className="conflictOfInterestContent">
                <div>
                    To assure the mission of Agency is not harmed by relationships of staff or governing body members.
                </div>
                <div>
                    To assist persons who serve as officers, directors, and management in understanding and meeting the
                    standard of conduct required for such persons.
                </div>
                <div>
                    To clarify whether Board of Director members, Professional Advisory Committee members or employees
                    could derive profit or gain through association with the agency.
                </div>
            </div>
            <br />
            <div className="conflictOfInterest">SPECIAL INSTRUCTIONS</div>
            <ol className="paragraph-without-flex ">
                <li className="margin-bottom">
                    No officer, director, or management person of this agency shall participate in a relationship if
                    he/she is a party to, or has financial interest in that relationship, is employed by or negotiating
                    prospective employment with the other party, or has financial interest in the other party.{" "}
                </li>
                <li className="margin-bottom">
                    All officers, directors, or management personnel shall promptly report any matters that may pose a
                    potential conflict of interest.
                </li>
                <li className="margin-bottom">
                    A board Member may not participate in discussions unless requested and may not vote on transactions
                    where conflict may or does exist. Abstention and reason for it will be included in the minutes.
                </li>

                <li className="margin-bottom">
                    No officers, directors, or management personnel shall solicit or accept any gratuities, favors, or
                    anything of significant monetary value from any person or party while representing the agency.
                    Significant value is defined as something that cannot be consumed or used up within twenty-four (24)
                    hours or has a face market value of more than $5.00.
                </li>
                <li className="margin-bottom">
                    Should there arise a need for disclosure the procedure is to present a list of proposed items to be
                    disclosed to the Executive Director for PPROVAL. Should approval be granted only those items that
                    are listed can be discussed? Should consent not be granted the list may be presented to the
                    Governing Body, who could grant permission if sufficient evidence is provided that states it would
                    be in the best interest of the agency to disclose the requested items. Should permission be denied
                    by the Governing Body then no items are to disclose (exception would be any governmental regulatory
                    body i.e. Medicare, law enforcement or (CHAP)
                </li>
                <li className="margin-bottom">
                    All staff shall conduct business practice in such a manner that no conflict of interest, real or
                    implied could be construed. Staff and families may not have financial interests in competing or
                    supplying companies that could affect their performance or influence business decisions.
                </li>
                <li className="margin-bottom">
                    The presiding chair of the governing body will have final authority on what constitutes conflict of
                    interest.
                </li>
                <li className="margin-bottom">
                    In the event of proceedings that require input, voting or decisions, the individual(s) with a
                    conflict will be excluded from the activity.
                </li>
            </ol>
            <div className="paragraph-without-flex conflictOfInterestContent">
                In a Medicare certified agency there must be evidence of annual disclosers that include:
            </div>
            <ol className="paragraph-without-flex ">
                <li className="margin-bottom">
                    Names, address of individuals or corporations having direct/ indirect ownership or controlling
                    interest of 5% or more in agency or in any subcontractor in which the agency has direct/ indirect
                    ownership interest of 5% or more.
                </li>
                <li className="margin-bottom">
                    Persons who are related (spouse, parent, child, sibling) that have direct or indirect ownership or
                    controlling interest of 5% or more in agency or subcontractor.
                </li>
                <li className="margin-bottom">
                    Persons who have ownership/ controlling interest in a Medicare certified facility.
                </li>

                <li className="margin-bottom">
                    Names/ addresses of any officer, director, or partner who has ownership or control of such facility.
                </li>
                <li className="margin-bottom">
                    Conviction of any criminal offense involving Medicare or Medicaid on the part of any person or
                    organization, agent or managing employee.
                </li>
                <li className="margin-bottom">
                    Names and addresses of any current managerial staff who were employed by fiscal intermediary in the
                    last year.
                </li>
                <li className="margin-bottom">Changes in ownership or control.</li>
            </ol>
            <ol className="paragraph-without-flex conflictOfInterestContent">
                <li className="margin-bottom">Change of address for parent corporation, sub-unit or branches.</li>
                <li className="margin-bottom">
                    Conflict of Interest Disclosure forms (see Attachment) and all Agency contractual arrangements are
                    reviewed by the administrator at least annually to ensure that the relationships of the Agency,
                    members of the Governing Body, Professional Advisory Committee, employees and contracted personnel
                    with other care providers, educational institutions and payers comply with applicable laws and
                    regulations and do not represent conflicts of interest.
                </li>
                <li className="margin-bottom">
                    In the event any Agency employee, contracted personnel or member of the Governing Body and/ or
                    Professional Advisory Committee identifies a potential/ actual conflict of interest, he/ she shall
                    provide a full disclosure and information to the Administrator within a reasonable time period.
                </li>

                <li className="margin-bottom">
                    Discussion should be initiated at the administrative level, with problem resolution as the primary
                    goal.
                </li>
                <li className="margin-bottom">
                    Conviction of any criminal offense involving Medicare or Medicaid on the part of any person or
                    organization, agent or managing employee.
                </li>
                <li className="margin-bottom">
                    The employee may be removed from the direct involvement in the situation that has given rise to the
                    conflict of interest discussion.
                </li>
                <li className="margin-bottom">
                    If the situation involves patient care, treatment or services, the Administrator/ Director of
                    Nursing may arrange for continuation of patient care and/ or services by another staff member until
                    resolution of the issue has been reached.
                </li>
                <li className="margin-bottom">
                    The Administrator, at his/her sole discretion, may discuss the matter with the Governing Body. The
                    determination by these individuals shall be final.
                </li>
                <li className="margin-bottom">
                    In connection with any conflict of interest, any member of the Governing Body, Professional Advisory
                    Committee, or manager should excuse himself/herself from discussions and/ or determinations with
                    vendors or contractors, with whom the individual has a relationship or prejudice.
                </li>
                <li className="margin-bottom">
                    Any member of the Governing Body, Professional Advisory Committee, or a member of any committee who
                    has vested interest in the issues under discussion should disclose himself/herself ineligible to
                    vote and should remove himself/herself from the discussion.
                </li>
            </ol>
            <div className="conflictOfInterest">Definition</div>
            <div>
                A conflict of interest may occur when the home care agency officers, directors, management or staff
                member enters into a relationship with another.organization of person(s), which in its content or
                process, may result in a compromise of agency’s obligation to act in the best interest of its patients.
            </div>
            <br />
            <div className="conflictOfInterest">CONFLICT OF INTEREST DISCLOSURE</div>
            <br />
            <div>
                A conflict of interest may occur when the home care agency officers, directors, management or staff
                member enters into a relationship with another.organization of person(s), which in its content or
                process, may result in a compromise of agency’s obligation to act in the best interest of its patients.
            </div>
            <br />
            <div className="conflictOfInterestContent">
                (Please check the applicable paragraph and complete this statement as appropriate.)
            </div>
            <br />
            <div className="conflictOfInterestContent" style={{ display: "flex", alignItems: "center" }}>
                <span>
                    <CheckboxWLabel
                        checked={ConflictOfInterest.checkBoxFirst}
                        label=""
                        name="isRememberMe"
                        value={ConflictOfInterest.checkBoxFirst}
                    />
                </span>
                I herby affirm that I know of no issues that would present a conflict of
            </div>
            <div className="conflictOfInterestContent">
                interest arising from any situation related to my involvement/association with WECARE HOMECARE, LLC
            </div>
            <br />
            <div className="conflictOfInterestContent" style={{ display: "flex", alignItems: "center" }}>
                <span>
                    <CheckboxWLabel
                        checked={ConflictOfInterest.checkBoxSecond}
                        label=""
                        name="isRememberMe"
                        value={ConflictOfInterest.checkBoxSecond}
                    />
                </span>
                I may have conflict of interest arising from the following situation:
            </div>
            <br />
            <div>
                <span style={{ display: "inline", fontSize: "16px", fontWeight: "400px" }}>
                    {" "}
                    (Describe the potential conflict, including both the other entity in which you have an interest and
                    the dealings it has with
                </span>
                <TextInput
                    type="text"
                    placeHolder=""
                    name="dealWith"
                    label=""
                    value={ConflictOfInterest?.dealWith?.value}
                    errors={ConflictOfInterest?.dealWith?.errors}
                    rules={ConflictOfInterest?.dealWith?.rules}
                    formSubmitted={ConflictOfInterest.allRequiredFieldsTouched}
                    customStyles={{ display: "inline", height: "5px !important", width: "200px !important" }}
                />
                <span style={{ display: "inline", fontSize: "16px", fontWeight: "400px" }}>
                    and the appropriate date(s) the conflict arose.)
                </span>
            </div>
            <br />
            <TextInput
                type="text"
                placeHolder=""
                name="desc"
                label=""
                value={ConflictOfInterest?.desc?.value}
                errors={ConflictOfInterest?.desc?.errors}
                rules={ConflictOfInterest?.desc?.rules}
                formSubmitted={ConflictOfInterest.allRequiredFieldsTouched}
            />
            <div className="conflictOfInterestContent">
                I understand that the Conflict of Interest Policy prohibits my involvement in transactions in which I
                have a conflict. Therefore, in any instance in which I may be required to participate in a situation
                impacted by such conflict, I will notify the Compliance Officer or the Administrator of the conflict of
                interest and will abide by the resultant decision.
            </div>
            <br />
            <br />
            <ResponsiveBox size={300}>
                <div>
                    <TextInput
                        type="text"
                        placeHolder=""
                        name="Name"
                        label="Employee Name"
                        value={ConflictOfInterest.Name.value}
                        errors={ConflictOfInterest?.Name?.errors}
                        rules={ConflictOfInterest?.Name?.rules}
                        formSubmitted={ConflictOfInterest.allRequiredFieldsTouched}
                    />
                </div>
                <div></div>
                <div>
                    {" "}
                    <TextInput
                        type="text"
                        placeHolder=""
                        name="Title"
                        label="Title"
                        value={ConflictOfInterest.Title.value}
                        errors={ConflictOfInterest?.Title?.errors}
                        rules={ConflictOfInterest?.Title?.rules}
                        formSubmitted={ConflictOfInterest.allRequiredFieldsTouched}
                    />
                </div>
            </ResponsiveBox>
            <ResponsiveBox size={300}>
                <Base64Image
                    base64={signatureInBase64 || nurseOnboardingformsDetail?.data?.sign}
                    header="Applicant Signature"
                />
                <div></div>
                <div>
                    <DatePicker
                        label="Date :"
                        name="Date"
                        value={ConflictOfInterest.Date.value}
                        errors={ConflictOfInterest?.Date?.errors}
                        rules={ConflictOfInterest?.Date?.rules}
                        formSubmitted={ConflictOfInterest.allRequiredFieldsTouched}
                        disabled={true}
                    />
                </div>
            </ResponsiveBox>
        </div>
    );
}

export default ConflictsOfInterest;
