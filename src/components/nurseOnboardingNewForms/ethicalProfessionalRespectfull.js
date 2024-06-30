import React, { useEffect } from "react";
import { toast } from "react-toastify";
import DatePicker from "../datePicker/DatePicker";
import { generalValidator } from "../../libs/utility/validators/GeneralValidator";
import {
    componentKey,
    setEthicalProfessionalRespectfullForms,
    setEthicalProfessionalRespectfullFormsSign,
    setNurseOnboardingNewFormsAllRequiredFieldsTouched,
} from "../../pages/NurseOnboarding/NurseOnboardingSlice";
import { useSelector, useDispatch } from "react-redux";
import { getNurseOnboardingFormDetails, postAppendDocument } from "../../pages/NurseOnboarding/NurseOnboardingSaga";
import { useParams } from "react-router-dom";
import Base64Image from "../base64Image/Base64Image";
import General from "../../libs/utility/General";

function EthicalProfessionalRespectfull() {
    const dispatch = useDispatch();
    const { applicationId, agencyId } = useParams();

    const { EthicalProfessionalRespectfullForms, signatureInBase64, nurseOnboardingformsDetail } = useSelector(
        (state) => state[componentKey]
    );

    useEffect(() => {
        dispatch(
            getNurseOnboardingFormDetails({ agencyId, applicationId, formType: "standardsRequirementsForProvider" })
        );
    }, []);
    useEffect(() => {
        if (!nurseOnboardingformsDetail?.data) return;
        if (nurseOnboardingformsDetail?.fromType === "standardsRequirementsForProvider"){
            let EthicalProfessionalRespectfullForms = {
                id:nurseOnboardingformsDetail?.id ? nurseOnboardingformsDetail?.id : undefined,
                allRequiredFieldsTouched: nurseOnboardingformsDetail?.data?.allRequiredFieldsTouched,
                Date: { value: nurseOnboardingformsDetail?.data?.Date, errors: {}, rules: { required: true } },
                sign: nurseOnboardingformsDetail?.data?.sign,
            };
            dispatch(setEthicalProfessionalRespectfullForms(EthicalProfessionalRespectfullForms));
        }
    }, [nurseOnboardingformsDetail]);

    const handleSaveSignatureClick = (sign, isCanvasEmpty) => {
        dispatch(setNurseOnboardingNewFormsAllRequiredFieldsTouched(true));

        if (!isCanvasEmpty) {
            dispatch(setEthicalProfessionalRespectfullFormsSign(sign));
            // dispatch(setAbuserRegistryAnnualNoticeSignature(sign));
            dispatch(
                postAppendDocument({
                    applicationId: applicationId || "",
                    imageBase64: sign,
                    agencyId: agencyId,
                    fileName: "consent-form.pdf",
                    fileType: "consentForm",
                    activeTabIndex: 10,
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
            dispatch(setEthicalProfessionalRespectfullForms({ [name]: { value, errors, rules } }));
        } else {
            dispatch(setEthicalProfessionalRespectfullForms({ [name]: { value } }));
        }
    };

    return (
        <div className="nurse-onboarding-new-forms">
            <div className="middle-size-form-center">
                <div>Ethical, Professional, Respectful and Legal Service Standards Requirements for Every</div>
                <div>Type of Provider to Remain Certified</div>
                <br />
                <div className="margin-bottom">OAC 173-39-02 (B)(8)</div>
                {/* <div >Effective 10/29/20</div> */}
            </div>
            <div className="middle-size-form">
                <div className="margin-bottom" style={{ fontWeight: "600", fontSize: "17px" }}>
                    The provider shall not engage in any unethical, unprofessional, disrespectful, or illegal behavior
                    including the following:
                </div>
                <div className="margin-bottom">(a) Consuming alcohol while providing services to the individual.</div>
                <div className="margin-bottom">
                    (b) Consuming medicine, drugs, or other chemical substances in a way that is illegal, unprescribed,
                    or impairs the provider from providing services to the individual.
                </div>
                <div className="margin-bottom">
                    (c) Accepting, obtaining, or attempting to obtain money, or anything of value, including gifts or
                    tips, from the individual or his or her household or family members.
                </div>
                <div className="margin-bottom">
                    (d) Engaging the individual in sexual conduct, or in conduct a reasonable person would interpret as
                    sexual in nature, even if the conduct is consensual.
                </div>
                <div className="margin-bottom">
                    (e) Leaving the individual's home when scheduled to provide a service for a purpose not related to
                    providing the service without notifying the agency supervisor, the individual's emergency contact
                    person, any identified caregiver, or ODA's designee.
                </div>
                <div className="margin-bottom">(f) Treating ODA or its designee disrespectfully.</div>
                <div className="margin-bottom">
                    (g) Engaging in any activity that may distract the provider from providing services, including the
                    following:
                </div>
                <div className="body">
                    <div className="paragraph-with-margin-left flex-column-gap">
                        <div>
                            <span style={{ marginRight: "10px" }}>(i)</span> Watching television, movies, videos, or
                            playing games on computers, personal phones, or other electronic devices whether owned by
                            the individual, provider, or the provider's staff.
                        </div>
                    </div>
                    <div className="paragraph-with-margin-left flex-column-gap">
                        <div>
                            <span style={{ marginRight: "10px" }}>(ii)</span> Non-care-related socialization with a
                            person other than the individual (e.g., a visit from a person who is not providing care to
                            the individual; making or receiving a personal telephone call; or, sending or receiving a
                            personal text message, email, or video).
                        </div>
                    </div>
                    <div className="paragraph-with-margin-left flex-column-gap">
                        <div>
                            <span style={{ marginRight: "10px" }}>(iii)</span> Providing care to a person other than the
                            individual.
                        </div>
                    </div>
                    <div className="paragraph-with-margin-left flex-column-gap">
                        <div>
                            <span style={{ marginRight: "10px" }}>(iv)</span> Smoking tobacco or any other material in
                            any type of smoking equipment, including cigarettes, electronic cigarettes, vaporizers,
                            hookahs, cigars, or pipes.
                        </div>
                    </div>
                    <div className="paragraph-with-margin-left flex-column-gap">
                        <div>
                            {" "}
                            <span style={{ marginRight: "10px" }}>(v)</span> Sleeping.
                        </div>
                    </div>
                    <div className="paragraph-with-margin-left flex-column-gap">
                        <div>
                            <span style={{ marginRight: "10px" }}>(vi)</span> Bringing a child, friend, relative, or
                            anyone else, or a pet, to the individual’s place of residence.
                        </div>
                    </div>
                    <div className="paragraph-with-margin-left flex-column-gap">
                        <div>
                            <span style={{ marginRight: "10px" }}>(vii)</span> Discussing religion or politics with the
                            individual or others.
                        </div>
                    </div>
                    <div className="paragraph-with-margin-left flex-column-gap">
                        <div>
                            <span style={{ marginRight: "10px" }}>(viii)</span> Discussing personal issues with the
                            individual or any other person.
                        </div>
                    </div>
                </div>
                <br />
                <div className="margin-bottom">
                    (h) Engaging in behavior that causes, or may cause, physical, verbal, mental, or emotional distress
                    or abuse to the individual including publishing photos of the individual on social media without the
                    individual's written consent.
                </div>
                <div className="margin-bottom">
                    (i) Engaging in behavior a reasonable person would interpret as inappropriate involvement in the
                    individual's personal relationships.
                </div>
                <div className="margin-bottom">
                    (j) Making decisions, or being designated to make decisions, for the individual in any capacity
                    involving a declaration for mental health treatment, power of attorney, durable power of attorney,
                    guardianship, or authorized representative.
                </div>
                <div className="margin-bottom">
                    (k) Selling to, or purchasing from, the individual products or personal items, unless the provider
                    is the individual's family member who does so only when not providing services.
                </div>
                <div className="margin-bottom">
                    (l) Consuming the individual's food or drink, or using the individual's personal property without
                    his or her consent.
                </div>
                <div className="margin-bottom">
                    (m) Taking the individual to the provider’s business site, unless the business site is an ADS
                    center, RCF, or (if the provider is a participant-directed provider) the individual’s home.
                </div>
                <div className="margin-bottom">
                    (n) Engaging in behavior constituting a conflict of interest, or taking advantage of, or
                    manipulating services resulting in an unintended advantage for personal gain that has detrimental
                    results to the individual, the individual's family or caregivers, or another provider.
                </div>
                <br />
            </div>
            <div className="flex-space-bet ">
                <Base64Image base64={signatureInBase64} header="Worker's Signature" />
                <div>
                    <DatePicker
                        label="Date :"
                        name="Date"
                        onChangeCb={(event) => onChangeHandler(event)}
                        value={EthicalProfessionalRespectfullForms.Date.value}
                        errors={EthicalProfessionalRespectfullForms?.Date?.errors}
                        rules={EthicalProfessionalRespectfullForms?.Date?.rules}
                        formSubmitted={EthicalProfessionalRespectfullForms.allRequiredFieldsTouched}
                    />
                </div>
            </div>
        </div>
    );
}

export default EthicalProfessionalRespectfull;
