import React, { useEffect } from "react"
import TextInput from "../../../../../components/input/textinput/TextInput"
import CheckboxWLabel from "../../../../../components/checkbox/checkboxwlabel/CheckboxWLabel"
import { toast } from "react-toastify"
import Heading from "../../../../../components/heading/Heading"
import { HEADING } from "../../../../../components/heading/constants/constants"
import { useDispatch, useSelector } from "react-redux"
import { componentKey, setActiveDeclarationTab, setCitizenshipStatus, setEmploymentEligibilityVerification, setEmploymentEligibilityVerificationFieldsTouched, setEmploymentEligibilityVerificationSign, setJobApplicationActiveStep } from "../../JobApplicationSlice"
import GeneralValidator, { generalValidator } from "../../../../../libs/utility/validators/GeneralValidator"
import { componentKey as nurseOnboardingComponentKey } from "../../../NurseOnboardingSlice"
import { getEmploymentEligibilityVerificationByForm, postCreateDynamicForm } from "../../JobApplicationSaga"
import { useParams } from "react-router-dom"
import Information from "../../../../../components/information/Information"
import DatePicker from "../../../../../components/datePicker/DatePicker"
import { componentKey as professionalInformationComponentKey } from '../../ProfessionalInformation/ProfessionalInformationSlice'
import Base64Image from "../../../../../components/base64Image/Base64Image"
import Button from "../../../../../components/button/Button"
import { BUTTON_TYPE } from "../../../../../libs/constant"
import General from "../../../../../libs/utility/General"

const EligibilityVerification = ({ activeIndex }) => {

    const dispatch = useDispatch()

    const { agencyId } = useParams()
    const { citizenshipStatus, EmploymentEligibilityVerification, employmentEligibilityVerificationSign, activeDeclarationTab, eligibilityVerificationFormDetails } = useSelector(state => state[componentKey])
    const { applicationId, signatureInBase64 } = useSelector(state => state[nurseOnboardingComponentKey])
    const nurseId = General.getLocalStorageData("nurseId")
    const { professionalInformation: { personalInfo } } = useSelector(state => state[professionalInformationComponentKey])
    useEffect(() => {
        dispatch(getEmploymentEligibilityVerificationByForm({ agencyId, nurseId }))
    }, [])
    useEffect(() => {
        dispatch(setActiveDeclarationTab(0))
    }, [activeDeclarationTab])

    useEffect(() => {
        if (Object.keys(eligibilityVerificationFormDetails).length === 0) return;
        citizenshipStatus.map((obj, index) => {
            if (obj.label === eligibilityVerificationFormDetails?.data['label']) {
                dispatch(setCitizenshipStatus({ checked: true, index }))
            }
        })

        for (let data of Object.keys(eligibilityVerificationFormDetails?.data)) {
            if (['FirstName', 'LastName', 'MiddleName', "OtherLastName", "Address", 'ApartmentNumber', "CityOrTown", 'State', 'ZIPCode', 'DateOfBirth', 'SocialSecurityNumber', 'EmailAddress', 'PhoneNumber'].includes(data)) {
                let value = eligibilityVerificationFormDetails?.data[data];
                dispatch(setEmploymentEligibilityVerification({ [data]: { value } }));
            }
        }
    }, [eligibilityVerificationFormDetails])

    useEffect(() => {
        for (let data of Object.keys(personalInfo)) {
            if (['FirstName', 'LastName', 'MiddleName', 'State', 'ZipCode', 'City', 'EmailID', 'TelephoneNumber', 'AddressLine1', "DateOfBirth", 'SSN'].includes(data)) {
                let { value } = personalInfo[data];
                if (data == 'AddressLine1') data = 'Address'
                else if (data == 'City') data = "CityOrTown"
                else if (data == 'ZipCode') data = "ZIPCode"
                else if (data == 'EmailID') data = "EmailAddress"
                else if (data == 'TelephoneNumber') data = "PhoneNumber"
                else if (data == 'DateOfBirth') data = "DateOfBirth"
                else if (data == 'SSN') data = "SocialSecurityNumber"
                dispatch(setEmploymentEligibilityVerification({ [data]: { value } }));
            }
        }
    },[eligibilityVerificationFormDetails])

    useEffect(() => {
        for (let data of Object.keys(personalInfo)) {
            if (['FirstName', 'LastName', 'MiddleName', 'State', 'ZipCode', 'City', 'EmailID', 'TelephoneNumber', 'AddressLine1', "DateOfBirth",'SSN'].includes(data)) {
                let { value } = personalInfo[data];
                if (data == 'AddressLine1') data = 'Address'
                else if (data == 'City') data = "CityOrTown"
                else if (data == 'ZipCode') data = "ZIPCode"
                else if (data == 'EmailID') data = "EmailAddress"
                else if (data == 'TelephoneNumber') data = "PhoneNumber"
                else if (data == 'DateOfBirth') data = "DateOfBirth"
                else if (data == 'SSN') data = "SocialSecurityNumber"
                dispatch(setEmploymentEligibilityVerification({ [data]: { value } }));
            }
        }
    }, [])

    const handleSaveSignatureClick = (sign, isCanvasEmpty) => {
        dispatch(setEmploymentEligibilityVerificationFieldsTouched(true))

        if (!isCanvasEmpty && !GeneralValidator.validateRequiredFields(EmploymentEligibilityVerification)) {

            if (!citizenshipStatus.some(item => item.checked)) {
                toast.error("At least select one type of your citizenship!")
                return
            }

            let ucsiEntered = citizenshipStatus.filter(item => item.checked).length !== 0 && citizenshipStatus.filter(item => item.checked)[0]?.label == "A lawful permanent resident (Enter USCIS or A-Number.)" && EmploymentEligibilityVerification.USCISNumber.value.length == 0

            if (ucsiEntered) {
                toast.error("Please enter USCIS number")
                return
            }

            let i94Entered = citizenshipStatus.filter(item => item.checked).length !== 0 && citizenshipStatus.filter(item => item.checked)[0].label == "A noncitizen (other than Item Numbers 2. and 3. above) authorized to work until (exp. date, if any)" && EmploymentEligibilityVerification.AdmissionNumber.value == 0

            if (i94Entered) {
                toast.error("Please enter Form I-94 Admission Number")
                return
            }

            let i94WorkauthorizationnumberEntered = citizenshipStatus.filter(item => item.checked).length !== 0 && citizenshipStatus.filter(item => item.checked)[0].label == "A noncitizen (other than Item Numbers 2. and 3. above) authorized to work until (exp. date, if any)" && EmploymentEligibilityVerification.WorkAuthorizationNumber.value == 0

            if (i94WorkauthorizationnumberEntered) {
                toast.error("Please enter Work Authorization Number")
                return
            }

            dispatch(setEmploymentEligibilityVerificationSign(sign))

            const result = {};
            for (const key in EmploymentEligibilityVerification) {
                if (key !== "allRequiredFieldsTouched") {
                    result[key] = EmploymentEligibilityVerification[key].value;
                }
            }

            const data = {
                "fromType": "EmploymentEligibilityVerification",
                "applicationId": applicationId,
                "agencyId": agencyId,
                "nurseId": nurseId,
                "data": { ...result, ...citizenshipStatus.filter(item => item.checked)[0] }
            }

            dispatch(postCreateDynamicForm({ data, applicationId, agencyId, activeIndex }))
            window.scrollTo(0, 0);
        } else {
            toast.error('Please enter all required data!')
        }
    }

    function containsSpecialChars(str) {
        var specialChars = /[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/
        return specialChars.test(str);
    }

    const onChangeHandler = (event, rules) => {
        const { name, value, type } = event.target;
    
        if (name === 'PhoneNumber') {
            const numericValue = value.replace(/\D/g, '');
    
            let formattedValue = '';
            if (numericValue.length > 0) {
                formattedValue += `(${numericValue.slice(0, 3)}`;
            }
            if (numericValue.length > 3) {
                formattedValue += `)-${numericValue.slice(3, 6)}`;
            }
            if (numericValue.length > 6) {
                formattedValue += `-${numericValue.slice(6, 10)}`;
            }
    
            if (!formattedValue && type === 'text') {
                // Handle empty formatted value for 'PhoneNumber' field
                dispatch(setEmploymentEligibilityVerification({ [name]: { value: '', errors: [], rules } }));
            } else if (rules) {
                const errors = generalValidator.validate(numericValue, rules);
                dispatch(setEmploymentEligibilityVerification({ [name]: { value: formattedValue, errors, rules } }));
            } else {
                dispatch(setEmploymentEligibilityVerification({ [name]: { value: formattedValue } }));
            }
        } else {
            let regex = /\d/;
    
            if ((regex.test(value) && type === 'text') || (type === 'text' && containsSpecialChars(value))) {
                return;
            } else if (!value && type === 'number') {
                return;
            }
    
            if (rules) {
                const errors = generalValidator.validate(value, rules);
                dispatch(setEmploymentEligibilityVerification({ [name]: { value, errors, rules } }));
            } else {
                dispatch(setEmploymentEligibilityVerification({ [name]: { value } }));
            }
        }
    };
    
    // const onChangeHandler = (event, rules) => {
    //     const { name, value, type } = event.target;
    //     if (name == 'PhoneNumber') {

    //         const numericValue = value.replace(/\D/g, '');

    //         let formattedValue = '';
    //         if (numericValue.length > 0) {
    //             formattedValue += `(${numericValue.slice(0, 3)}`;
    //         }
    //         if (numericValue.length > 3) {
    //             formattedValue += `)-${numericValue.slice(3, 6)}`;
    //         }
    //         if (numericValue.length > 6) {
    //             formattedValue += `-${numericValue.slice(6, 10)}`;
    //         }
    //         if (rules) {
    //             const errors = generalValidator.validate(numericValue, rules);
    //             dispatch(setEmploymentEligibilityVerification({ [name]: { value: formattedValue, errors, rules } }));
    //         } else {
    //             dispatch(setEmploymentEligibilityVerification({ [name]: { value: formattedValue } }));
    //         }
    //     }
    //     else {
    //         let regex = /\d/

    //         if ((regex.test(value) && type == "text") || (type == "text" && containsSpecialChars(value))) {
    //             return
    //         }
    //         else if (!value && type == "number") {
    //             return
    //         }

    //         if (rules) {
    //             const errors = generalValidator.validate(value, rules);
    //             dispatch(setEmploymentEligibilityVerification({ [name]: { value, errors, rules } }));
    //         } else {
    //             dispatch(setEmploymentEligibilityVerification({ [name]: { value } }));
    //         }
    //     }
    // };

    return (
        <React.Fragment>
            <div className="employee-eligibility-container">
                <div className="header-text">
                    <div className="header-left">
                        <Heading type={HEADING.H2}>USCIS</Heading>
                        <Heading type={HEADING.H2}>Form I-9</Heading>
                        <div className="ombNo-date">
                            <div className="ombNo">
                                <Heading type={HEADING.H3}>OMB No.1615-0047</Heading>
                            </div>
                            <div className="Expiry date">
                                <Heading type={HEADING.H3}>Expires 07/31/2026</Heading>
                            </div>
                        </div>
                    </div>

                    <div className="header-right">
                        <Heading type={HEADING.H1}>Employment Eligibility Verification</Heading>
                        <Heading type={HEADING.H2} customStyle={{ color: "Grey/90" }}>Department of Homeland Security</Heading>
                        <Heading type={HEADING.H3} customStyle={{ color: "Grey/90" }}>U.S. Citizenship and Immigration Services</Heading>
                    </div>
                </div>
                <div className="disclaimer">
                    <div className="disclaimerName">I9 and W4 Disclaimer:</div>
                    <div className="disclaimerDescription grey-text"><p className="text-para"> The I-9 and W-4 forms generated by this software are based on official forms provided by the Department of Homeland Security (DHS) and the Internal
                        Revenue Service (IRS),respectively. While every effort has been made to ensure the accuracy and compliance of the forms generated, it is the responsibility
                        of the user to review and verify the information entered into these forms for completeness and accuracy. MediSoft Group and this software are not affiliated
                        with or endorsed by the DHS or the IRS.Any reference to official forms or government agencies is for informational purposes only. By using I-9 and W-4
                        forms established by our software you acknowledge and accept that MediSoft Group is not responsible for any errors, omissions,or discrepancies in the
                        completed forms.`</p></div>
                </div>
                <div className="startHere">
                    <div className="startHereName"> <p className="text-para">START HERE:</p></div>
                    <div className="disclaimerDescription,.grey-text"><p className="text-para"> Employers must ensure the form instructions are available to employees when completing
                        this form. Employers are liable for failing to comply with the requirements for completing
                        this form. See below and the Instructions.</p></div>
                </div>
                <div className="notice">
                    <div className="noticeText"><p className="text-para">ANTI-DISCRIMINATION NOTICE:</p></div>
                    <div className="disclaimerDescription,.grey-text"> <p className="text-para">All employees can choose which acceptable documentation to present for Form I-9.
                        Employers cannot ask employees for documentation to verify information in Section 1,
                        or specify which acceptable documentation employees must present for Section 2 or
                        Supplement B, Revivification and Rehire. Treating employees differently based on their
                        citizenship, immigration status, or national origin may be illegal.</p>
                    </div>
                </div>

                <Information>Section 1 :</Information>
                <div className="employeeInformation">
                    <Heading type={HEADING.H5} customStyle={{ margin: "0" }} className="icon-text">Employee Information and Attestation:</Heading>
                    <div className="disclaimerDescription,.grey-text">Employees must complete and sign Section 1 of Form I-9 no later than the first day of employment, but not before accepting a job offer.</div>
                </div>
                <div className="inputText">
                    <div>
                        <TextInput className="text-input"
                            type="text"
                            placeHolder={''}
                            name="LastName"
                            label="Last Name (Family Name)"
                            onChangeCb={onChangeHandler}
                            value={EmploymentEligibilityVerification.LastName.value}
                            rules={EmploymentEligibilityVerification.LastName.rules}
                            errors={EmploymentEligibilityVerification.LastName.errors}
                            formSubmitted={EmploymentEligibilityVerification.allRequiredFieldsTouched}
                        />
                    </div>
                    <div>
                        <TextInput
                            type="text"
                            placeHolder={''}
                            name="FirstName"
                            label="First Name (Given Name)"
                            onChangeCb={onChangeHandler}
                            value={EmploymentEligibilityVerification.FirstName.value}
                            rules={EmploymentEligibilityVerification.FirstName.rules}
                            errors={EmploymentEligibilityVerification.FirstName.errors}
                            formSubmitted={EmploymentEligibilityVerification.allRequiredFieldsTouched}
                        />
                    </div>
                    <div>
                        <TextInput
                            type="text"
                            placeHolder={''}
                            name="MiddleName"
                            label="Middle Initial (If Any)"
                            onChangeCb={onChangeHandler}
                            value={EmploymentEligibilityVerification.MiddleName.value}
                            rules={EmploymentEligibilityVerification.MiddleName.rules}
                            errors={EmploymentEligibilityVerification.MiddleName.errors}
                            formSubmitted={EmploymentEligibilityVerification.allRequiredFieldsTouched}
                        />
                    </div>
                </div>
                <div className="inputText">
                    <div>
                        <TextInput
                            type="text"
                            placeHolder={''}
                            name="OtherLastName"
                            label="Other Last Name Used(If Any)"
                            onChangeCb={onChangeHandler}
                            value={EmploymentEligibilityVerification.OtherLastName.value}
                            rules={EmploymentEligibilityVerification.OtherLastName.rules}
                            errors={EmploymentEligibilityVerification.OtherLastName.errors}
                            formSubmitted={EmploymentEligibilityVerification.allRequiredFieldsTouched}
                        />
                    </div>
                </div>
                <div className="inputText">
                    <div>
                        <TextInput
                            type="text"
                            placeHolder={''}
                            name="Address"
                            label="Address (Street Number and Name)"
                            onChangeCb={onChangeHandler}
                            value={EmploymentEligibilityVerification.Address.value}
                            rules={EmploymentEligibilityVerification.Address.rules}
                            errors={EmploymentEligibilityVerification.Address.errors}
                            formSubmitted={EmploymentEligibilityVerification.allRequiredFieldsTouched}
                        />
                    </div>
                    <div>

                        <TextInput
                            type="number"
                            placeHolder={''}
                            name="ApartmentNumber"
                            label="Appt. Number (If Any)"
                            onChangeCb={onChangeHandler}
                            value={EmploymentEligibilityVerification.ApartmentNumber.value}
                            rules={EmploymentEligibilityVerification.ApartmentNumber.rules}
                            errors={EmploymentEligibilityVerification.ApartmentNumber.errors}
                            formSubmitted={EmploymentEligibilityVerification.allRequiredFieldsTouched}
                        />
                    </div>
                    <div>
                        <TextInput
                            type="text"
                            placeHolder={''}
                            name="CityOrTown"
                            label="City or Town"
                            onChangeCb={onChangeHandler}
                            value={EmploymentEligibilityVerification.CityOrTown.value}
                            rules={EmploymentEligibilityVerification.CityOrTown.rules}
                            errors={EmploymentEligibilityVerification.CityOrTown.errors}
                            formSubmitted={EmploymentEligibilityVerification.allRequiredFieldsTouched}
                        />
                    </div>
                </div>
                <div className="inputText">
                    <div>
                        <TextInput
                            type="text"
                            placeHolder={''}
                            name="State"
                            label="State"
                            onChangeCb={onChangeHandler}
                            value={EmploymentEligibilityVerification.State.value}
                            rules={EmploymentEligibilityVerification.State.rules}
                            errors={EmploymentEligibilityVerification.State.errors}
                            formSubmitted={EmploymentEligibilityVerification.allRequiredFieldsTouched}
                        />
                    </div>
                    <div>

                        <TextInput
                            type="number"
                            placeHolder={''}
                            name="ZIPCode"
                            label="ZIP Code"
                            onChangeCb={onChangeHandler}
                            value={EmploymentEligibilityVerification.ZIPCode.value}
                            rules={EmploymentEligibilityVerification.ZIPCode.rules}
                            errors={EmploymentEligibilityVerification.ZIPCode.errors}
                            formSubmitted={EmploymentEligibilityVerification.allRequiredFieldsTouched}
                        />
                    </div> <div>

                        <DatePicker
                            type="date"
                            label="Date of Birth"
                            name="DateOfBirth"
                            onChangeCb={onChangeHandler}
                            value={EmploymentEligibilityVerification.DateOfBirth.value}
                            errors={EmploymentEligibilityVerification.DateOfBirth.errors}
                            rules={EmploymentEligibilityVerification.DateOfBirth.rules}
                            formSubmitted={EmploymentEligibilityVerification.allRequiredFieldsTouched}
                            maxDate={new Date()}
                        />
                    </div>
                </div>
                <div className="inputText">
                    <div>

                        <TextInput
                            type="number"
                            placeHolder={''}
                            name="SocialSecurityNumber"
                            label="U.S. Social Security Number"
                            onChangeCb={onChangeHandler}
                            value={EmploymentEligibilityVerification.SocialSecurityNumber.value}
                            rules={EmploymentEligibilityVerification.SocialSecurityNumber.rules}
                            errors={EmploymentEligibilityVerification.SocialSecurityNumber.errors}
                            formSubmitted={EmploymentEligibilityVerification.allRequiredFieldsTouched}
                        />
                    </div>
                    <div>

                        <TextInput
                            type="email"
                            placeHolder={''}
                            name="EmailAddress"
                            label="Employee's Email Address"
                            onChangeCb={(event, rule = { required: true, regex: { pattern: /^\S+@\S+\.\S+$/, message: "Please enter a valid email address" } }) => onChangeHandler(event, rule)}
                            value={EmploymentEligibilityVerification.EmailAddress.value}
                            rules={EmploymentEligibilityVerification.EmailAddress.rules}
                            errors={EmploymentEligibilityVerification.EmailAddress.errors}
                            formSubmitted={EmploymentEligibilityVerification.allRequiredFieldsTouched}
                        />
                    </div> <div>
                        <TextInput
                            type="text"
                            placeHolder={''}
                            name="PhoneNumber"
                            label="Employee's Phone Number"
                            onChangeCb={(event, rule = { required: true, regex: { pattern: /\b\d{10}\b/, message: 'Please enter 10 digits only' } }) => onChangeHandler(event, rule)}
                            value={EmploymentEligibilityVerification.PhoneNumber.value}
                            rules={EmploymentEligibilityVerification.PhoneNumber.rules}
                            errors={EmploymentEligibilityVerification.PhoneNumber.errors}
                            formSubmitted={EmploymentEligibilityVerification.allRequiredFieldsTouched}
                        />
                    </div>
                </div>
                <div className="uscis-form">
                    I am aware that federal law provides for imprisonment and/or fines for false statements, or the use of false documents, in connection with the completion of
                    this form. I attest, under penalty of perjury, that this information, including my selection of the box attesting to my citizenship or immigration status, is true and correct.
                </div>
                <div className="check-text mb-3">
                    Check one of the following boxes to attest to your citizenship or immigration status (See page 2 and 3 of the instructions.).
                </div>

                <div className="checkbox-container">

                    {citizenshipStatus.map((item, index) => (
                        <div className="checkbox-div" key={index}>
                            <CheckboxWLabel
                                label={item.label}
                                name="addAnotherAddress"
                                checked={item.checked}
                                onChangeCb={(event) => dispatch(setCitizenshipStatus({ checked: event.target.checked, index }))}
                            />
                        </div>
                    ))}

                </div>
                <div className="inputText mt-4">
                    {(citizenshipStatus.filter(item => item.checked)?.length !== 0 && citizenshipStatus.filter(item => item.checked)[0].label == "A lawful permanent resident (Enter USCIS or A-Number.)" && citizenshipStatus.filter(item => item.checked)[0].label !== "A citizen of the United States") && citizenshipStatus.filter(item => item.checked)[0].label !== "A noncitizen national of the United States (See Instructions.)" ?
                        <>
                            <TextInput
                                type="number"
                                placeHolder={''}
                                name="USCISNumber"
                                label="USCIS A-Number"
                                onChangeCb={onChangeHandler}
                                value={EmploymentEligibilityVerification.USCISNumber.value}
                                rules={EmploymentEligibilityVerification.USCISNumber.rules}
                                errors={EmploymentEligibilityVerification.USCISNumber.errors}
                                formSubmitted={EmploymentEligibilityVerification.allRequiredFieldsTouched}
                            />
                        </> : ""
                    }

                    {(citizenshipStatus.filter(item => item.checked)?.length !== 0 && citizenshipStatus.filter(item => item.checked)[0].label !== "A lawful permanent resident (Enter USCIS or A-Number.)" && citizenshipStatus.filter(item => item.checked)[0].label !== "A citizen of the United States") && citizenshipStatus.filter(item => item.checked)[0].label !== "A noncitizen national of the United States (See Instructions.)" ?
                        <>
                            <TextInput
                                type="number"
                                placeHolder={''}
                                name="AdmissionNumber"
                                label="Form I-94 Admission Number"
                                onChangeCb={onChangeHandler}
                                value={EmploymentEligibilityVerification.AdmissionNumber.value}
                                rules={EmploymentEligibilityVerification.AdmissionNumber.rules}
                                errors={EmploymentEligibilityVerification.AdmissionNumber.errors}
                                formSubmitted={EmploymentEligibilityVerification.allRequiredFieldsTouched}
                            />

                            <TextInput
                                type="number"
                                placeHolder={''}
                                name="WorkAuthorizationNumber"
                                label="Work Authorization Number"
                                onChangeCb={onChangeHandler}
                                value={EmploymentEligibilityVerification.WorkAuthorizationNumber.value}
                                rules={EmploymentEligibilityVerification.WorkAuthorizationNumber.rules}
                                errors={EmploymentEligibilityVerification.WorkAuthorizationNumber.errors}
                                formSubmitted={EmploymentEligibilityVerification.allRequiredFieldsTouched}
                            />

                            {citizenshipStatus.filter(item => item.checked)[0].label !== "A noncitizen (other than Item Numbers 2. and 3. above) authorized to work until (exp. date, if any)" ? <>
                                <TextInput
                                    type="text"
                                    placeHolder={''}
                                    name="PassportNumber"
                                    label="Foreign Passport Number and Country of Issuance"
                                    onChangeCb={onChangeHandler}
                                    value={EmploymentEligibilityVerification.PassportNumber.value}
                                    rules={EmploymentEligibilityVerification.PassportNumber.rules}
                                    errors={EmploymentEligibilityVerification.PassportNumber.errors}
                                    formSubmitted={EmploymentEligibilityVerification.allRequiredFieldsTouched}
                                />
                            </> : ""}
                        </> : ""
                    }
                </div>

                <Base64Image base64={signatureInBase64} header="Applicant Signature" />

                <div className='mt-5'>
                    <Button
                        className="button-width me-3"
                        variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}
                        onClickCb={() => dispatch(setJobApplicationActiveStep(activeIndex - 1))}
                    >Back</Button>
                    <Button className="button-width" onClickCb={handleSaveSignatureClick}>Submit</Button>
                </div>
            </div>
        </React.Fragment>
    )
}
export default EligibilityVerification


