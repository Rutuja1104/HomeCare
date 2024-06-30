import React, { useEffect } from "react"
import Heading from "../../../../../components/heading/Heading";
import { HEADING } from "../../../../../components/heading/constants/constants";
import Information from "../../../../../components/information/Information";
import { VEC_ICON_NAME } from "../../../../../components/icon/constants";
import TextInput from "../../../../../components/input/textinput/TextInput";
import RadioInput from "../../../../../components/input/radioinput/RadioInput";
import GeneralValidator, { generalValidator } from "../../../../../libs/utility/validators/GeneralValidator";
import { componentKey, setEmployeesWithholdingCertificate, setEmployeesWithholdingCertificateFieldsTouched, setEmployeesWithholdingCertificateSign, setSingleOrMarried, setEmploymentEligibilityVerification } from "../../JobApplicationSlice";
import { useDispatch, useSelector } from "react-redux";
import ResponsiveBox from "../../../../../components/responsivebox/ResponsiveBox";
import Button from "../../../../../components/button/Button";
import { postCreateDynamicForm, postNurseOnboardingApplication } from "../../JobApplicationSaga";
import { componentKey as professionalInformationComponentKey } from "../../ProfessionalInformation/ProfessionalInformationSlice"
import { useParams } from "react-router-dom";
import General from "../../../../../libs/utility/General";

const EmployeesWithholdingCertificate = ({ activeIndex }) => {

    const dispatch = useDispatch()
    const { EmployeesWithholdingCertificate, SingleOrMarried } = useSelector(state => state[componentKey])
    const { professionalInformation, healthInfoQuestions, healthInformationSignature, questionnaires } = useSelector(state => state[professionalInformationComponentKey])
    const { agencyId, applicationId, role } = useParams()
    const nurseId = General.getLocalStorageData("nurseId")

    useEffect(() => {
        for (let data of Object.keys(professionalInformation.personalInfo)) {
            if (['FirstName', 'LastName', 'MiddleName', 'State', 'ZipCode', 'City', 'SSN'].includes(data)) {
                let { value } = professionalInformation.personalInfo[data];
                if (data == 'AddressLine1') data = 'Address'
                else if (data == 'City') data = "CityOrTown"
                else if (data == 'ZipCode') data = "ZIPCode"
                else if (data == 'EmailID') data = "EmailAddress"
                else if (data == 'TelephoneNumber') data = "PhoneNumber"
                dispatch(setEmployeesWithholdingCertificate({ [data]: { value } }));
            }
        }
    }, [])

    const handleProceedClick = () => {
        dispatch(setEmployeesWithholdingCertificateFieldsTouched(true))

        if (!GeneralValidator.validateRequiredFields(EmployeesWithholdingCertificate)) {
            const result = {};
            for (const key in EmployeesWithholdingCertificate) {
                if (key !== "allRequiredFieldsTouched") {
                    result[key] = EmployeesWithholdingCertificate[key].value;
                }
            }
            window.scrollTo(0, 0);

            const data = {
                "fromType": "EmployeesWithholdingCertificate",
                "applicationId": applicationId,
                "agencyId": agencyId,
                "nurseId": nurseId,
                "data": { ...result, ...SingleOrMarried }
            }

            dispatch(postCreateDynamicForm({ data, applicationId, agencyId, role, activeIndex }))
        }
    }

    function containsSpecialChars(str) {
        var specialChars = /[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/
        return specialChars.test(str);
    }

    // const onChangeHandler = (event, rules) => {
    //     const { name, value, type } = event.target;

    //     let regex = /\d/

    //     if ((regex.test(value) && type == "text") || (type == "text" && containsSpecialChars(value))) {
    //         return
    //     }
    //     else if (!value && type == "number") {
    //         return
    //     }

    //     if (rules) {
    //         const errors = generalValidator.validate(value, rules);
    //         dispatch(setEmployeesWithholdingCertificate({ [name]: { value, errors, rules } }));
    //     } else {
    //         dispatch(setEmployeesWithholdingCertificate({ [name]: { value } }));
    //     }
    // };
    const onChangeHandler = (event, rules) => {
        const { name, value, type } = event.target;
    
        let regex = /\d/
    
        if ((regex.test(value) && type === "text") || (type === "text" && containsSpecialChars(value))) {
            return;
        } else if (!value && type === "number") {
            dispatch(setEmployeesWithholdingCertificate({ [name]: { value: '', errors: [], rules } }));
            return;
        }
    
        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(setEmployeesWithholdingCertificate({ [name]: { value, errors, rules } }));
        } else {
            dispatch(setEmployeesWithholdingCertificate({ [name]: { value } }));
        }
    };
    
    return (
        <React.Fragment>
            <div>
                <div className="employee-certificate-container">
                    <div className="header-text">
                        <div className="header-left ">
                            <Heading type={HEADING.H2}>Form W-4</Heading>
                            <Heading type={HEADING.H6}>OMB No. - 1545-0074  2023</Heading>
                        </div>
                        <div className="header-right ">
                            <Heading type={HEADING.H1}>Employee’s Withholding Certificate</Heading>
                            <Heading type={HEADING.H2}>Department of the Treasury Internal Revenue Service</Heading>
                            <Heading type={HEADING.H6}>U.S. Citizenship and Immigration Services</Heading>
                        </div>
                        <div></div>
                    </div>
                    <div className="disclaimer">
                        <div className="disclaimerName">I9 and W4 Disclaimer:</div>
                        <div className="disclaimerDescription grey-text"><p className="text-para"> The I-9 and W-4 forms generated by this software are based on official forms provided by the Department of Homeland Security (DHS) and the Internal Revenue Service (IRS), respectively. While every effort has been made to ensure the accuracy and compliance of the forms generated, it is the responsibility of the user to review and verify the information entered into these forms for completeness and accuracy. MediSoft Group and this software are not affiliated with or endorsed by the DHS or the IRS. Any reference to official forms or government agencies is for informational purposes only. By using I-9 and W-4 forms established by our software you acknowledge and accept that MediSoft Group is not responsible for any errors, omissions, or discrepancies in the completed forms.`</p></div>
                    </div>
                    <div className="notice">
                        <div className="noticeText"><p className="text-para">Employee Withholding Certificate :</p></div>
                        <div className="disclaimerDescription,.grey-text"> <p className="text-para">All employees can choose which acceptable documentation to present for Form I-9.
                            Employers cannot ask employees for documentation to verify information in Section 1,
                            or specify which acceptable documentation employees must present for Section 2 or
                            Supplement B, Revivification and Rehire. Treating employees differently based on their
                            citizenship, immigration status, or national origin may be illegal.</p>
                        </div>
                    </div>
                    <Heading type={HEADING.H1}>General Instructions</Heading>
                    <div className="disclaimerDescription,.grey-text"> <p className="text-para">Section references are to the Internal Revenue Code.</p>
                    </div>
                    <Heading type={HEADING.H2}>Future Developments</Heading>
                    <div className="disclaimerDescription,.grey-text"> <p className="text-para">For the latest information about developments related to Form W-4, such as legislation enacted after it was published, go to www.irs.gov/FormW4.</p>
                    </div>
                    <Heading type={HEADING.H2}>Purpose of Form</Heading>
                    <div className="disclaimerDescription,.grey-text"> <p className="text-para">Complete Form W-4 so that your employer can withhold the correct federal income tax from your pay. If too little is withheld, you will generally owe tax when you file your tax return and may owe a penalty. If too much is withheld, you will generally be due a refund. Complete a new Form W-4 when changes to your personal or financial situation would change the entries on the form. For more information on withholding and when you must furnish a new Form W-4, see Pub. 505, Tax Withholding and Estimated Tax.</p>
                    </div>
                    <Heading type={HEADING.H5}>Exemption from withholding</Heading>
                    <div className="disclaimerDescription,.grey-text"> <p className="text-para">You may claim exemption from withholding for 2023 if you meet both of the following conditions: you had no federal income tax liability in 2022 and you expect to have no federal income tax liability in 2023. You had no federal income tax liability in 2022 if (1) your total tax on line 24 on your 2022 Form 1040 or 1040-SR is zero (or less than the sum of lines 27, 28, and 29), or (2) you were not required to file a return because your income was below the filing threshold for your correct filing status. If you claim exemption, you will have no income tax withheld from your paycheck and may owe taxes and penalties when you file your 2023 tax return. To claim exemption from withholding, certify that you meet both of the conditions above by writing “Exempt” on Form W-4 in the space below Step 4(c). Then, complete Steps 1(a), 1(b), and 5. Do not complete any other steps. You will need to submit a new Form W-4 by February 15, 2024.</p>
                    </div>
                    <Heading type={HEADING.H5}>Your privacy</Heading>
                    <div className="disclaimerDescription,.grey-text"> <p className="text-para">If you have concerns with Step 2(c), you may choose Step 2(b); if you have concerns with Step 4(a), you may enter an additional amount you want withheld per pay period in Step 4(c).</p>
                    </div>
                    <Heading type={HEADING.H5}>Self-employment</Heading>
                    <div className="disclaimerDescription,.grey-text"> <p className="text-para">Generally, you will owe both income and self-employment taxes on any self-employment income you receive separate from the wages you receive as an employee. If you want to pay income and self-employment taxes through withholding from your wages, you should enter the self-employment income on Step 4(a). Then compute your self-employment tax, divide that tax by the number of pay periods remaining in the year, and include that resulting amount per pay period on Step 4(c). You can also add half of the annual amount of self-employment tax to Step 4(b) as a deduction. To calculate self-employment tax, you generally multiply the self-employment income by 14.13% (this rate is a quick way to figure your selfemployment tax and equals the sum of the 12.4% social security tax and the 2.9% Medicare tax multiplied by 0.9235). See Pub. 505 for more information, especially if the sum of self-employment income multiplied by 0.9235 and wages exceeds $160,200 for a given individual.</p>
                    </div>
                    <Heading type={HEADING.H5}>Nonresident alien</Heading>
                    <div className="disclaimerDescription,.grey-text"> <p className="text-para">If you’re a nonresident alien, see Notice 1392, Supplemental Form W-4 Instructions for Nonresident Aliens, before completing this form.</p>
                    </div>
                    <Heading type={HEADING.H1}>Specific Instructions</Heading>
                    <Heading type={HEADING.H5}>Step 1(c)</Heading>
                    <div className="disclaimerDescription,.grey-text"> <p className="text-para">Check your anticipated filing status. This will determine the standard deduction and tax rates used to compute your withholding.</p>
                    </div>
                    <Heading type={HEADING.H5}>Step 2</Heading>
                    <div className="disclaimerDescription,.grey-text"> <p className="text-para">Use this step if you (1) have more than one job at the same time, or (2) are married filing jointly and you and your spouse both work. If you (and your spouse) have a total of only two jobs, you may check the box in option (c). The box must also be checked on the Form W-4 for the other job. If the box is checked, the standard deduction and tax brackets will be cut in half for each job to calculate withholding. This option is roughly accurate for jobs with similar pay; otherwise, more tax than necessary may be withheld, and this extra amount will be larger the greater the difference in pay is between the two jobs.</p>
                    </div>
                    <Information iconName={VEC_ICON_NAME.ALERT_ROUNDED_ICON}>
                        Multiple jobs. Complete Steps 3 through 4(b) on only one Form W-4. Withholding will be most accurate if you do this on the Form W-4 for the highest paying job.
                    </Information>
                    <Heading type={HEADING.H5}>Step 3</Heading>
                    <div className="disclaimerDescription,.grey-text"> <p className="text-para">This step provides instructions for determining the amount of the child tax credit and the credit for other dependents that you may be able to claim when you file your tax return. To qualify for the child tax credit, the child must be under age 17 as of December 31, must be your dependent who generally lives with you for more than half the year, and must have the required social security number. You may be able to claim a credit for other dependents for whom a child tax credit can’t be claimed, such as an older child or a qualifying relative. For additional eligibility requirements for these credits, see Pub. 501, Dependents, Standard Deduction, and Filing Information. You can also include other tax credits for which you are eligible in this step, such as the foreign tax credit and the education tax credits. To do so, add an estimate of the amount for the year to your credits for dependents and enter the total amount in Step 3. Including these credits will increase your paycheck and reduce the amount of any refund you may receive when you file your tax return.</p>
                    </div>
                    <Heading type={HEADING.H5}>Step 4 (optional)</Heading>
                    <div className="disclaimerDescription,.grey-text"> <p className="text-para">Step 4(a). Enter in this step the total of your other estimated income for the year, if any. You shouldn’t include income from any jobs or self-employment. If you complete Step 4(a), you likely won’t have to make estimated tax payments for that income. If you prefer to pay estimated tax rather than having tax on other income withheld from your paycheck, see Form 1040-ES, Estimated Tax for Individuals.</p>
                    </div>
                    <div className="disclaimerDescription,.grey-text"> <p className="text-para">Step 4(b). Enter in this step the amount from the Deductions Worksheet, line 5, if you expect to claim deductions other than the basic standard deduction on your 2023 tax return and want to reduce your withholding to account for these deductions. This includes both itemized deductions and other deductions such as for student loan interest and IRAs.</p>
                    </div>
                    <div className="disclaimerDescription,.grey-text"> <p className="text-para">Step 4(c). Enter in this step any additional tax you want withheld from your pay each pay period, including any amounts from the Multiple Jobs Worksheet, line 4. Entering an amount here will reduce your paycheck and will either increase your refund or reduce any amount of tax that you owe.</p>
                    </div>
                </div>
                <div className="personal-information-container">
                    <Information>Step 1 :</Information>
                    <Heading type={HEADING.H3} customStyle={{ margin: "20px 0" }}>Personal Information :</Heading>
                    <ResponsiveBox>
                        <TextInput
                            type="text"
                            name="FirstName"
                            label="First Name"
                            placeHolder="Please enter first name"
                            onChangeCb={onChangeHandler}
                            value={EmployeesWithholdingCertificate.FirstName.value}
                            rules={EmployeesWithholdingCertificate.FirstName.rules}
                            errors={EmployeesWithholdingCertificate.FirstName.errors}
                            formSubmitted={EmployeesWithholdingCertificate.allRequiredFieldsTouched}
                        />
                        <TextInput
                            type="text"
                            name="MiddleName"
                            label="Middle Name"
                            placeHolder="Please enter middle name"
                            onChangeCb={onChangeHandler}
                            value={EmployeesWithholdingCertificate.MiddleName.value}
                            rules={EmployeesWithholdingCertificate.MiddleName.rules}
                            errors={EmployeesWithholdingCertificate.MiddleName.errors}
                            formSubmitted={EmployeesWithholdingCertificate.allRequiredFieldsTouched}
                        />
                        <TextInput
                            type="text"
                            name="LastName"
                            label="Last Name"
                            placeHolder="Please enter last name"
                            onChangeCb={onChangeHandler}
                            value={EmployeesWithholdingCertificate.LastName.value}
                            rules={EmployeesWithholdingCertificate.LastName.rules}
                            errors={EmployeesWithholdingCertificate.LastName.errors}
                            formSubmitted={EmployeesWithholdingCertificate.allRequiredFieldsTouched}
                        />
                        <TextInput
                            type="text"
                            name="CityOrTown"
                            label="City"
                            placeHolder="Please enter city name"
                            onChangeCb={onChangeHandler}
                            value={EmployeesWithholdingCertificate.CityOrTown.value}
                            rules={EmployeesWithholdingCertificate.CityOrTown.rules}
                            errors={EmployeesWithholdingCertificate.CityOrTown.errors}
                            formSubmitted={EmployeesWithholdingCertificate.allRequiredFieldsTouched}
                        />


                        <TextInput
                            type="text"
                            name="State"
                            label="State"
                            placeHolder="Please enter state name"
                            onChangeCb={onChangeHandler}
                            value={EmployeesWithholdingCertificate.State.value}
                            rules={EmployeesWithholdingCertificate.State.rules}
                            errors={EmployeesWithholdingCertificate.State.errors}
                            formSubmitted={EmployeesWithholdingCertificate.allRequiredFieldsTouched}
                        />

                        <TextInput
                            type="number"
                            name="ZIPCode"
                            label="Zipcode"
                            placeHolder="Please enter zip code"
                            onChangeCb={onChangeHandler}
                            value={EmployeesWithholdingCertificate.ZIPCode.value}
                            rules={EmployeesWithholdingCertificate.ZIPCode.rules}
                            errors={EmployeesWithholdingCertificate.ZIPCode.errors}
                            formSubmitted={EmployeesWithholdingCertificate.allRequiredFieldsTouched}
                        />
                        <TextInput
                            type="number"
                            name="SSN"
                            label="SSN"
                            placeHolder="Please enter SSN number"
                            onChangeCb={onChangeHandler}
                            value={EmployeesWithholdingCertificate.SSN.value}
                            rules={EmployeesWithholdingCertificate.SSN.rules}
                            errors={EmployeesWithholdingCertificate.SSN.errors}
                            formSubmitted={EmployeesWithholdingCertificate.allRequiredFieldsTouched}
                        />
                    </ResponsiveBox>

                    <Information iconName={VEC_ICON_NAME.ALERT_ROUNDED_ICON}>
                        Does your name match the name on your social security card? ? If not, to ensure you get credit for your earnings, contact SSA at 800-772-1213 or go to www.ssa.gov.
                    </Information>

                    <div className="radio">
                        <RadioInput
                            customStyle={{ margin: "20px 0" }}
                            label={{ suffixLabel: 'Single or Married filing separately' }}
                            name="Single or Married filing separately"
                            checked={SingleOrMarried.label === "Single or Married filing separately"}
                            onChangeCb={({ target: { name, checked } }) => {
                                dispatch(setSingleOrMarried({ value: checked, label: name }))
                            }}
                        />

                        <RadioInput
                            label={{ suffixLabel: 'Married filing jointly or Qualifying surviving spouse' }}
                            name="Married filing jointly or Qualifying surviving spouse"
                            checked={SingleOrMarried.label === "Married filing jointly or Qualifying surviving spouse"}
                            onChangeCb={({ target: { name, checked } }) => {
                                dispatch(setSingleOrMarried({ value: checked, label: name }))
                            }}
                        />
                        <RadioInput
                            label={{ suffixLabel: 'Head of household (Check only if you’re unmarried and pay more than half the costs of keeping up a home for yourself and a qualifying individual.)' }}
                            name="Head of household(Check only if you’re unmarried and pay more than half the costs of keeping up a home for yourself and a qualifying individual.)"
                            checked={SingleOrMarried.label === "Head of household(Check only if you’re unmarried and pay more than half the costs of keeping up a home for yourself and a qualifying individual.)"}
                            onChangeCb={({ target: { name, checked } }) => {
                                dispatch(setSingleOrMarried({ value: checked, label: name }))
                            }}
                        />
                    </div>
                    <div className="element mt-5">
                        <Heading type={HEADING.H3}>Complete Steps 2–4 ONLY if they apply to you; otherwise, skip to Step 5.</Heading>
                        <div className="disclaimerDescription grey-text"><p className="text-para">See page 2 for more information on each step, who can claim exemption from withholding, other details, and privacy</p></div>
                    </div>

                    <div className="step2">
                        <Information>Step 2 :</Information>
                        <Heading type={HEADING.H3} customStyle={{ margin: "20px 0" }}>Multiple Jobs or Spouse Works</Heading>
                        <div className="disclaimerDescription grey-text"><p className="text-para"> Complete this step if you (1) hold more than one job at a time, or (2) are married filing jointly and your spouse also works. The correct amount of withholding depends on income earned from all of these jobs.</p></div>
                        <div className="disclaimerDescription grey-text"><p className="text-para"> Do only one of the following. <br />
                            (a) Reserved for future use. <br />
                            (b) Use the Multiple Jobs Worksheet on page 3 and enter the result in Step 4(c) below; or<br />
                            (c) If there are only two jobs total, you may check this box. Do the same on Form W-4 for the other job. This option is generally more accurate than (b) if pay at the lower paying job is more than half of the pay at the higher paying job. Otherwise, (b) is more accurate . . . . . . . . . . . . . . . . . . </p></div>
                        <Heading type={HEADING.H6} className="icon-text">TIP: If you have self-employment income, see page 2</Heading>

                        <Heading type={HEADING.H5}>Complete Steps 3–4(b) on Form W-4 for only ONE of these jobs.</Heading>
                        <div className="disclaimerDescription,.grey-text"> <p className="text-para">Leave those steps blank for the other jobs. (Your withholding will be most accurate if you complete Steps 3–4(b) on the Form W-4 for the highest paying job.</p>
                        </div>

                    </div>
                    <div className="step3">
                        <Information>Step 3 :</Information>
                        <Heading type={HEADING.H3} customStyle={{ margin: "20px 0" }}>Claim Dependent and Other Credits</Heading>
                        <div className="element">
                            <div className="p-input-text">
                                <div className="disclaimerDescription,.grey-text, text-input-container, inside_block2">
                                    <TextInput
                                        label="Multiply the number of qualifying children under age 17 by $2,000"
                                        type="number"
                                        name="numberOfQualifyingChildren"
                                        onChangeCb={onChangeHandler}
                                        value={EmployeesWithholdingCertificate.numberOfQualifyingChildren.value}
                                        rules={EmployeesWithholdingCertificate.numberOfQualifyingChildren.rules}
                                        errors={EmployeesWithholdingCertificate.numberOfQualifyingChildren.errors}
                                        formSubmitted={EmployeesWithholdingCertificate.allRequiredFieldsTouched}
                                    />
                                    <TextInput
                                        label="Multiply the number of other dependents by $500 . . . . ."
                                        type="number"
                                        placeHolder={''}
                                        name="MultiplyTheNumberOfOtherDependents"
                                        onChangeCb={onChangeHandler}
                                        value={EmployeesWithholdingCertificate.MultiplyTheNumberOfOtherDependents.value}
                                        rules={EmployeesWithholdingCertificate.MultiplyTheNumberOfOtherDependents.rules}
                                        errors={EmployeesWithholdingCertificate.MultiplyTheNumberOfOtherDependents.errors}
                                        formSubmitted={EmployeesWithholdingCertificate.allRequiredFieldsTouched}
                                    />
                                    <TextInput
                                        label="Add the amounts above for qualifying children and other dependents. You may add to this the amount of any other credits. Enter the total here . . . . . . . ."
                                        type="number"
                                        placeHolder={''}
                                        name="TotalOfQualifyingChildrenAndOtherDependents"
                                        onChangeCb={onChangeHandler}
                                        value={EmployeesWithholdingCertificate.TotalOfQualifyingChildrenAndOtherDependents.value}
                                        rules={EmployeesWithholdingCertificate.TotalOfQualifyingChildrenAndOtherDependents.rules}
                                        errors={EmployeesWithholdingCertificate.TotalOfQualifyingChildrenAndOtherDependents.errors}
                                        formSubmitted={EmployeesWithholdingCertificate.allRequiredFieldsTouched}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="step3">
                        <Information>Step 4 :</Information>
                        <Heading type={HEADING.H3} customStyle={{ margin: "20px 0" }}>Other Adjustments</Heading>
                        <div className="element">
                            <div className="claim">
                                <div className="p-input-text">
                                    <div className="disclaimerDescription,.grey-text, text-input-container, inside_block2">
                                        <Heading>If you want tax withheld for other income you expect this year that won’t have withholding, enter the amount of other income here. This may include interest, dividends, and retirement income . . . . . . . .</Heading>
                                        <TextInput
                                            label="Other income (not from jobs)."
                                            type="number"
                                            placeHolder={''}
                                            name="OtherIncome"
                                            onChangeCb={onChangeHandler}
                                            value={EmployeesWithholdingCertificate.OtherIncome.value}
                                            rules={EmployeesWithholdingCertificate.OtherIncome.rules}
                                            errors={EmployeesWithholdingCertificate.OtherIncome.errors}
                                            formSubmitted={EmployeesWithholdingCertificate.allRequiredFieldsTouched}
                                        />

                                        <Heading>If you expect to claim deductions other than the standard deduction and want to reduce your withholding, use the Deductions Worksheet on page 3 and enter the result here . . . . . . . . . . . . . . . . . . . . . . .</Heading>
                                        <TextInput
                                            label="Deductions"
                                            type="number"
                                            placeHolder={''}
                                            name="Deductions"
                                            onChangeCb={onChangeHandler}
                                            value={EmployeesWithholdingCertificate.Deductions.value}
                                            rules={EmployeesWithholdingCertificate.Deductions.rules}
                                            errors={EmployeesWithholdingCertificate.Deductions.errors}
                                            formSubmitted={EmployeesWithholdingCertificate.allRequiredFieldsTouched}
                                        />
                                        <Heading>Enter any additional tax you want withheld each pay period . .</Heading>
                                        <TextInput
                                            label="Extra withholding"
                                            type="number"
                                            placeHolder={''}
                                            name="AnyAdditionalTax"
                                            onChangeCb={onChangeHandler}
                                            value={EmployeesWithholdingCertificate.AnyAdditionalTax.value}
                                            rules={EmployeesWithholdingCertificate.AnyAdditionalTax.rules}
                                            errors={EmployeesWithholdingCertificate.AnyAdditionalTax.errors}
                                            formSubmitted={EmployeesWithholdingCertificate.allRequiredFieldsTouched}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Button onClickCb={handleProceedClick}>Proceed</Button>
                {/* <Information>Step 5 :</Information> */}
                {/* <div>
                    <Heading type={HEADING.H2} customStyle={{ margin: "30px 0" }}>Sign Here</Heading>
                    <Label>Under penalties of perjury, I declare that this certificate, to the best of my knowledge and belief, is true, correct, and complete</Label>

                    <div className="mt-3">
                        <Label>Employee’s signature (This form is not valid unless you sign it.)</Label>
                    </div>
                </div>
                <SignaturePad saveSignatureCb={handleSaveSignatureClick} isPreviousAllowed={false} onPrevCb={() => dispatch(setActiveDeclarationTab(0))} savedSignature={EmployeesWithholdingCertificateSign} /> */}
            </div>
        </React.Fragment>
    )
}
export default EmployeesWithholdingCertificate