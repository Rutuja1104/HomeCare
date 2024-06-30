import React, { useEffect } from "react";
import DatePicker from "../datePicker/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import TextInput from "../input/textinput/TextInput";
import ResponsiveBox from "../responsivebox/ResponsiveBox";
import { componentKey, setWeCareHomeCareFormAllRequiredFieldsTouched, setWeCareHomeCareFormSign, setWeCareHomeCareFormStates } from "../../pages/NurseOnboarding/NurseOnboardingSlice";
import { generalValidator } from "../../libs/utility/validators/GeneralValidator";
import { useParams } from "react-router-dom";
import { getNurseOnboardingFormDetails, postAppendDocument } from "../../pages/NurseOnboarding/NurseOnboardingSaga";
import Base64Image from "../base64Image/Base64Image";
import General from "../../libs/utility/General";

function WeCareHomeCare() {
    const dispatch = useDispatch();
    const { applicationId, agencyId } = useParams();
    const nurseId = General.getLocalStorageData("nurseId");

    const { WeCareHomeCareForm,signatureInBase64,nurseOnboardingformsDetail } = useSelector((state) => state[componentKey]);

    useEffect(() => {
        dispatch(getNurseOnboardingFormDetails({ agencyId, applicationId, formType: "nonCompeteAgreement" }));
    }, []);
    useEffect(() => {
        if(!nurseOnboardingformsDetail?.data) return;
        if(nurseOnboardingformsDetail?.fromType === "nonCompeteAgreement" ){
            console.log("nonCompeteAgreement",nurseOnboardingformsDetail);
            let WeCareHomeCareForm = {
                id:nurseOnboardingformsDetail?.id ? nurseOnboardingformsDetail?.id : undefined,
                allRequiredFieldsTouched: nurseOnboardingformsDetail?.data,
                Date: { value: nurseOnboardingformsDetail?.data?.Date, errors: {}, rules: { required: true } },
                EmployeeName: { value: nurseOnboardingformsDetail?.data?.EmployeeName, errors: {}, rules: { required: true } },
                CompanyRepresentative: { value: nurseOnboardingformsDetail?.data?.CompanyRepresentative, errors: {}, rules: { required: true } },
                sign:nurseOnboardingformsDetail?.data?.sign
            }
            dispatch(setWeCareHomeCareFormStates(WeCareHomeCareForm));
        }else{
            return;
        }

    }, [nurseOnboardingformsDetail]);

    const onChangeHandler = (event, rules) => {
        const { name, value } = event.target;

        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(setWeCareHomeCareFormStates({ [name]: { value, errors, rules } }));
        } else {
            dispatch(setWeCareHomeCareFormStates({ [name]: { value } }));
        }
    };

    return (
        <div className="nurse-onboarding-new-forms">
            <div className="WeCareHomeCare">
                <div className="header_forms">NON-COMPETE AGREEMENT</div>
            </div>
            <div className="body">
                <div className="middle-size-form">
                    I hereby agree not to compete with the business of this company directly or indirectly during the
                    period of employment or for a period of 5 years thereafter and not withstanding the cause or reason
                    for termination.
                </div>
                <div className="middle-size-form">
                    The term “not complete” as used herein shall mean that the employee shall not directly or indirectly
                    own, operate, consult to or be employed by any company or entity engaged in a business substantial
                    similar to or competitive with any service and/or product of the company as not existing or as the
                    company may undertake during the term of employment.
                </div>
                <div className="middle-size-form">
                    This covenant shall apply only to a radius of sixty (60) miles from the present location of the
                    company as set forth below and a period of 4 years, and to no prospects or customers beyond said
                    area.
                </div>
                <div className="middle-size-form">
                    The Employee acknowledges that the company shall or may provide employee access to customers and
                    trade secrets and other confidential or propriety information in reliance of this agreement and that
                    the provisions of this agreement are reasonably necessary to protect the company.
                </div>
                <div className="middle-size-form">
                    This agreement shall be binding upon and inure to the benefit of the parties, their heirs, assigns
                    and personal representatives.
                </div>
            </div>
            <br />
            <ResponsiveBox size={100}>
                <DatePicker
                    label="Date :"
                    name="Date"
                    onChangeCb={(event) => onChangeHandler(event)}
                    value={WeCareHomeCareForm.Date.value}
                    errors={WeCareHomeCareForm?.Date?.errors}
                    rules={WeCareHomeCareForm?.Date?.rules}
                    formSubmitted={WeCareHomeCareForm.allRequiredFieldsTouched}
                    // maxDate={new Date()}
                />
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </ResponsiveBox>
            <br />
            <br />
            <ResponsiveBox size={100}>
                <Base64Image base64={signatureInBase64 || nurseOnboardingformsDetail?.data?.sign} header="Applicant Signature" />
                <div></div>
                <div>
                    <TextInput
                        type="text"
                        placeHolder=""
                        name="EmployeeName"
                        label="Employee Name"
                        onChangeCb={(event) => onChangeHandler(event)}
                        value={WeCareHomeCareForm.EmployeeName.value}
                        errors={WeCareHomeCareForm?.EmployeeName?.errors}
                        rules={WeCareHomeCareForm?.EmployeeName?.rules}
                        formSubmitted={WeCareHomeCareForm.allRequiredFieldsTouched}
                    />
                </div>
                <div></div>
                <div>
                    {" "}
                    <TextInput
                        type="text"
                        placeHolder=""
                        name="CompanyRepresentative"
                        label="Company Representative"
                        onChangeCb={(event) => onChangeHandler(event)}
                        value={WeCareHomeCareForm.CompanyRepresentative.value}
                        errors={WeCareHomeCareForm?.CompanyRepresentative?.errors}
                        rules={WeCareHomeCareForm?.CompanyRepresentative?.rules}
                        formSubmitted={WeCareHomeCareForm.allRequiredFieldsTouched}
                    />
                </div>
            </ResponsiveBox>
        </div>
    );
}

export default WeCareHomeCare;
