import React, { useEffect } from "react";
import ResponsiveBox from "../responsivebox/ResponsiveBox";
import SignaturePad from "../signaturePad/SignaturePad";
import TextInput from "../input/textinput/TextInput";
import { toast } from "react-toastify";
import DatePicker from "../datePicker/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import {
    componentKey,
    setDrugFreeWorkplace,
    setDrugFreeWorkplaceForm,
    setDrugFreeWorkplaceFormAllRequiredFieldsTouched,
} from "../../pages/NurseOnboarding/NurseOnboardingSlice";
import { generalValidator } from "../../libs/utility/validators/GeneralValidator";
import { useParams } from "react-router-dom";
import { getNurseOnboardingFormDetails, postAppendDocument } from "../../pages/NurseOnboarding/NurseOnboardingSaga";
import Base64Image from "../base64Image/Base64Image";
import General from "../../libs/utility/General";

function DrugFreeWorkplace() {
    const dispatch = useDispatch();
    const { applicationId, agencyId } = useParams();

    const { DrugFreeWorkplace, signatureInBase64, nurseOnboardingformsDetail } = useSelector(
        (state) => state[componentKey]
    );

    useEffect(() => {
        dispatch(getNurseOnboardingFormDetails({ agencyId, applicationId, formType: "drugFreeWorkplace" }));
    }, []);
    useEffect(() => {
        if (!nurseOnboardingformsDetail?.data) return;
        if (nurseOnboardingformsDetail?.fromType === "drugFreeWorkplace") {
            let DrugFreeWorkplace = {
                id: nurseOnboardingformsDetail?.id ? nurseOnboardingformsDetail?.id : undefined,
                allRequiredFieldsTouched: nurseOnboardingformsDetail?.data?.allRequiredFieldsTouched,
                Date: { value: nurseOnboardingformsDetail?.data?.Date, errors: {}, rules: { required: true } },
                EmployeeName: {
                    value: nurseOnboardingformsDetail?.data?.EmployeeName,
                    errors: {},
                    rules: { required: true },
                },
                Sign: nurseOnboardingformsDetail?.data?.Sign,
            };
            dispatch(setDrugFreeWorkplaceForm(DrugFreeWorkplace));
        }
    }, [nurseOnboardingformsDetail]);

    const handleSaveSignatureClick = (sign, isCanvasEmpty) => {
        dispatch(setDrugFreeWorkplaceFormAllRequiredFieldsTouched(true));
        if (!isCanvasEmpty) {
            dispatch(setDrugFreeWorkplace(sign));
            dispatch(
                postAppendDocument({
                    applicationId: applicationId || "",
                    imageBase64: sign,
                    agencyId: agencyId,
                    fileName: "consent-form.pdf",
                    fileType: "consentForm",
                    activeTabIndex: 9,
                })
            );
            window.scrollTo(0, 0);
        } else {
            toast.error("Please sign the consent form!");
        }
    };

    const onChangeHandler = (event, rules) => {
        const { name, value } = event.target;

        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(setDrugFreeWorkplaceForm({ [name]: { value, errors, rules } }));
        } else {
            dispatch(setDrugFreeWorkplaceForm({ [name]: { value } }));
        }
    };

    return (
        <div className="nurse-onboarding-new-forms">
            <div className="WeCareHomeCare">
                <div className="header_forms">DRUG FREE WORKPLACE</div>
            </div>
            <div className="body">
                <div className="middle-size-form">
                    In accordance with our company's Drug Free Workplace (HR Policy) and Federal and State law, all
                    employees as a condition of employment must:
                </div>
                <div>
                    <ul className="middle-size-form paragraph-with-margin-left" style={{ listStyleType: "square" }}>
                        <li className="margin-bottom">Abide by the terms of the Drug Free Workplace program. </li>
                        <li className="margin-bottom">
                            Notify your employer of any criminal drug statue conviction for a violation occurring in the
                            workplace no later than (5) business days after such a conviction.
                        </li>
                    </ul>
                    <div className="middle-size-form margin-bottom">
                        Within thirty (30) days of receiving notice of an employee's conviction, our company will impose
                        remedial measures on the employee convicted of abuse violations in the workplace. Remedial
                        actions taken against the employee can be up to including termination.
                    </div>
                </div>
            </div>
            <br />
            <div className="WeCareHomeCare">
                <div className="header_forms">EMPLOYEE ACKNOWLEDGEMENT OF RECEIPT AND UNDERSTANDING.</div>
            </div>
            <br />
            <ResponsiveBox size={100}>
                <Base64Image
                    base64={signatureInBase64 || nurseOnboardingformsDetail?.data?.Sign}
                    header="Applicant Signature"
                />
                <div></div>
                <div>
                    <TextInput
                        type="text"
                        placeHolder=""
                        name="EmployeeName"
                        label="Employee Name"
                        onChangeCb={(event) => onChangeHandler(event)}
                        value={DrugFreeWorkplace.EmployeeName.value}
                        errors={DrugFreeWorkplace?.EmployeeName?.errors}
                        rules={DrugFreeWorkplace?.EmployeeName?.rules}
                        formSubmitted={DrugFreeWorkplace.allRequiredFieldsTouched}
                    />
                </div>
                <div></div>
                <div>
                    {" "}
                    <DatePicker
                        label="Date :"
                        name="Date"
                        onChangeCb={(event) => onChangeHandler(event)}
                        value={DrugFreeWorkplace.Date.value}
                        errors={DrugFreeWorkplace?.Date?.errors}
                        rules={DrugFreeWorkplace?.Date?.rules}
                        formSubmitted={DrugFreeWorkplace.allRequiredFieldsTouched}
                        // maxDate={new Date()}
                    />
                </div>
            </ResponsiveBox>
        </div>
    );
}

export default DrugFreeWorkplace;
