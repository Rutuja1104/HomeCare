import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generalValidator } from "../../libs/utility/validators/GeneralValidator";
import {
    setAttestationAgreementForm,
    setAttestationAgreementFormAllRequiredFieldsTouched,
    setAttestationAgreementFormSign,
} from "../../pages/NurseOnboarding/NurseOnboardingSlice";
import TextInput from "../input/textinput/TextInput";
import DatePicker from "../datePicker/DatePicker";
import { toast } from "react-toastify";
import ResponsiveBox from "../responsivebox/ResponsiveBox";
import { componentKey as AttestationAgreementEmployeerComponentKey } from "../../pages/NurseOnboarding/NurseOnboardingSlice";
import { useParams } from "react-router-dom";
import { getNurseOnboardingFormDetails, postAppendDocument } from "../../pages/NurseOnboarding/NurseOnboardingSaga";
import Base64Image from "../base64Image/Base64Image";
import General from "../../libs/utility/General";

function AttestationAgreementEmployeer() {
    const dispatch = useDispatch();
    const { applicationId, agencyId } = useParams();
    const nurseId = General.getLocalStorageData("nurseId");

    const { AttestationAgreementForm, signatureInBase64, nurseOnboardingformsDetail } = useSelector(
        (state) => state[AttestationAgreementEmployeerComponentKey]
    );

    useEffect(() => {
        dispatch(getNurseOnboardingFormDetails({ agencyId, applicationId, formType: "attestationAgreementEmployeer" }));
    }, []);
    useEffect(() => {
        if (!nurseOnboardingformsDetail?.data) return;
        if (nurseOnboardingformsDetail?.fromType === "attestationAgreementEmployeer") {
            let attestationAgreementForm = {
                id: nurseOnboardingformsDetail?.id ? nurseOnboardingformsDetail?.id : undefined,
                sign: nurseOnboardingformsDetail?.data?.sign,
                allRequiredFieldsTouched: nurseOnboardingformsDetail?.data?.allRequiredFieldsTouched,
                Name: { value: nurseOnboardingformsDetail?.data?.Name, errors: {}, rules: { required: true } },
                Date: { value: nurseOnboardingformsDetail?.data?.Date, errors: {}, rules: { required: true } },
            };
            dispatch(setAttestationAgreementForm(attestationAgreementForm));
        }
    }, [nurseOnboardingformsDetail]);

    const onChangeHandler = (event, rules) => {
        const { name, value } = event.target;

        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(setAttestationAgreementForm({ [name]: { value, errors, rules } }));
        } else {
            dispatch(setAttestationAgreementForm({ [name]: { value } }));
        }
    };

    const handleSaveSignatureClick = (sign, isCanvasEmpty) => {
        dispatch(setAttestationAgreementFormAllRequiredFieldsTouched(true));

        if (!isCanvasEmpty) {
            dispatch(setAttestationAgreementFormSign(sign));
            dispatch(
                postAppendDocument({
                    applicationId: applicationId || "",
                    imageBase64: sign,
                    agencyId: agencyId,
                    fileName: "consent-form.pdf",
                    fileType: "consentForm",
                    activeTabIndex: 11,
                })
            );
            window.scrollTo(0, 0);
        } else {
            toast.error("Please sign the consent form!");
        }
    };

    return (
        <div>
            <div className="Attestation-Agreement-Employer">
                <div className="nurse-onboarding-new-forms header_form" style={{ padding: "10px" }}>
                    <div className="header_form2">Attestation and Agreement to Notify Employer</div>
                </div>
                <div className="paragraph">
                    I hereby attest that I have not: 1) been convicted of, 2) pleaded guilty to, or 3) been found
                    eligible for intervention in lieu of conviction, for any of the disqualifying offenses listed below
                    and agree that I will notify my employer, within 14 calendar days, if while employed, I am formally
                    charged with, am convicted of, plead guilty to, or am found eligible for intervention in lieu of
                    conviction for any of the disqualifying offenses. I understand that failure to make this
                    notification may result in termination of employment.
                </div>
                <br />
                <ResponsiveBox size={100}>
                    <Base64Image base64={signatureInBase64} header="Applicant Signature" />
                    <div></div>
                    <div>
                        <TextInput
                            type="text"
                            placeHolder=""
                            name="Name"
                            label="Applicant's Signature"
                            onChangeCb={(event) => onChangeHandler(event)}
                            value={AttestationAgreementForm?.Name?.value}
                            errors={AttestationAgreementForm?.Name?.errors}
                            rules={AttestationAgreementForm?.Name?.rules}
                            formSubmitted={AttestationAgreementForm?.allRequiredFieldsTouched}
                        />
                    </div>
                    <div></div>
                    <div>
                        {" "}
                        <DatePicker
                            label="Date :"
                            name="Date"
                            onChangeCb={(event) => onChangeHandler(event)}
                            value={AttestationAgreementForm?.Date?.value}
                            errors={AttestationAgreementForm?.Date?.errors}
                            rules={AttestationAgreementForm?.Date?.rules}
                            formSubmitted={AttestationAgreementForm?.allRequiredFieldsTouched}
                        />
                    </div>
                </ResponsiveBox>
                <div className="header_form">
                    <div className="header_form2">Tier 1 Disqualifying Offenses (Permanent Exclusion):</div>
                </div>{" "}
                <table className="table">
                    <tr>
                        <td>2903.01 (aggravated murder)</td>
                    </tr>
                    <tr>
                        <td>2903.02 (murder)</td>
                    </tr>
                    <tr>
                        <td>2903.03 (voluntary manslaughter)</td>
                    </tr>
                    <tr>
                        <td>2903.11 (felonious assault)</td>
                    </tr>
                    <tr>
                        <td>2903.15 (permitting child abuse)</td>
                    </tr>
                    <tr>
                        <td>2903.16 (failing to provide for a functionally impaired person)</td>
                    </tr>
                    <tr>
                        <td>2903.34 (patient abuse and neglect)</td>
                    </tr>
                    <tr>
                        <td>2903.341 (patient endangerment)</td>
                    </tr>
                    <tr>
                        <td>2905.01 (kidnapping)</td>
                    </tr>
                    <tr>
                        <td>2905.02 (abduction)</td>
                    </tr>
                    <tr>
                        <td>2905.32 (human trafficking)</td>
                    </tr>
                    <tr>
                        <td>2905.33 (unlawful conduct with respect to documents)</td>
                    </tr>
                    <tr>
                        <td>2907.02 (rape)</td>
                    </tr>
                    <tr>
                        <td>2907.03 (sexual battery)</td>
                    </tr>
                    <tr>
                        <td>2907.04 (unlawful sexual conduct with a minor, formerly corruption of a minor)</td>
                    </tr>
                    <tr>
                        <td>2907.05 (gross sexual imposition)</td>
                    </tr>
                    <tr>
                        <td>2907.06 (sexual imposition)</td>
                    </tr>
                    <tr>
                        <td>2907.07 (importuning)</td>
                    </tr>
                    <tr>
                        <td>2907.08 (voyeurism)</td>
                    </tr>
                    <tr>
                        <td>2907.12 (felonious sexual penetration)</td>
                    </tr>
                    <tr>
                        <td>2907.31 (disseminating matter harmful to juveniles)</td>
                    </tr>
                    <tr>
                        <td>2907.32 (pandering obscenity)</td>
                    </tr>
                    <tr>
                        <td>2907.321 (pandering obscenity involving a minor)</td>
                    </tr>
                    <tr>
                        <td> 2907.322 (pandering sexually oriented matter involving a minor)</td>
                    </tr>
                    <tr>
                        <td>2907.323 (illegal use of minor in nudity-oriented material or performance)</td>
                    </tr>

                    <tr>
                        <td>2909.22 (soliciting/providing support for act of terrorism)</td>
                    </tr>

                    <tr>
                        <td>2909.23 (making terrorist threat)</td>
                    </tr>
                    <tr>
                        <td>2909.24 (terrorism)</td>
                    </tr>
                    <tr>
                        <td>2913.40 (Medicaid fraud)</td>
                    </tr>
                    <tr>
                        <td>
                            2923.01 (conspiracy) when the underlying offense is any of the offenses or violations on
                            this list
                        </td>
                    </tr>
                    <tr>
                        <td>
                            2923.02 (attempt) when the underlying offense is any of the offenses or violations on this
                            list
                        </td>
                    </tr>
                    <tr>
                        <td>
                            2923.03 (complicity) when the underlying offense is any of the offenses or violations on
                            this list
                        </td>
                    </tr>
                    <tr>
                        <td>
                            A conviction related to fraud, theft, embezzlement, breach of fiduciary responsibility, or
                            other financial misconduct
                        </td>
                    </tr>

                    <tr>
                        <td>
                            involving a federal or state-funded program, excluding the disqualifying offenses set forth
                            in section 2913.46 of the
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Revised Code (illegal use of supplemental nutrition assistance program [SNAP] or women,
                            infants, and children
                        </td>
                    </tr>
                    <tr>
                        <td>[WIC] program benefits).</td>
                    </tr>
                    <tr>
                        <td>
                            A violation of an existing or former municipal ordinance or law of this state, any other
                            state, or the United States
                        </td>
                    </tr>
                    <tr>
                        <td>that is substantially equivalent to any of the offenses or violations on this list.</td>
                    </tr>
                </table>
                <div className="header_form">
                    <div className="header_form2"> Tier 2 Disqualifying Offenses (Ten-Year Exclusion):</div>
                </div>{" "}
                <table className="table">
                    <tr>
                        <td> 2903.04 (involuntary manslaughter)</td>
                    </tr>
                    <tr>
                        <td>2903.041 (reckless homicide)</td>
                    </tr>
                    <tr>
                        <td>2905.04 (child stealing) as it existed prior to July 1, 1996</td>
                    </tr>
                    <tr>
                        <td>2905.05 (criminal child enticement)</td>
                    </tr>
                    <tr>
                        <td>2905.11 (extortion)</td>
                    </tr>
                    <tr>
                        <td>2907.21 (compelling prostitution)</td>
                    </tr>

                    <tr>
                        <td>2907.22 (promoting prostitution)</td>
                    </tr>

                    <tr>
                        <td>
                            2907.23 (enticement or solicitation to patronize a prostitute, procurement of a prostitute
                            for another)
                        </td>
                    </tr>

                    <tr>
                        <td>2909.02 (aggravated arson)</td>
                    </tr>
                    <tr>
                        <td>2909.03 (arson)</td>
                    </tr>
                    <tr>
                        <td>2911.01 (aggravated robbery)</td>
                    </tr>
                    <tr>
                        <td>2911.11 (aggravated burglary)</td>
                    </tr>
                    <tr>
                        <td>
                            2913.46 (illegal use of supplemental nutrition assistance program [SNAP] or women, infants,
                            and children [WIC]
                        </td>
                    </tr>
                    <tr>
                        <td>program benefits)</td>
                    </tr>
                    <tr>
                        <td>2913.48 (workers' compensation fraud)</td>
                    </tr>
                    <tr>
                        <td>2913.49 (identity fraud)</td>
                    </tr>
                    <tr>
                        <td>2917.02 (aggravated riot)</td>
                    </tr>
                    <tr>
                        <td>
                            2923.01 (conspiracy) when the underlying offense is any of the offenses or violations on
                            this list
                        </td>
                    </tr>
                    <tr>
                        <td>
                            2923.02 (attempt) when the underlying offense is any of the offenses or violations on this
                            list
                        </td>
                    </tr>
                    <tr>
                        <td>
                            2923.03 (complicity) when the underlying offense is any of the offenses or violations on
                            this list
                        </td>
                    </tr>
                    <tr>
                        <td>2923.12 (carrying concealed weapon)</td>
                    </tr>
                    <tr>
                        <td>
                            2923.122 (illegal conveyance or possession of deadly weapon or dangerous ordnance in a
                            school safety zone,illegal possession of an object indistinguishable from a firearm in a
                            school safety zone)
                        </td>
                    </tr>
                    <tr>
                        <td>
                            2923.123 (illegal conveyance, possession, or control of deadly weapon or dangerous ordnance
                            into courthouse)
                        </td>
                    </tr>
                    <tr>
                        <td>2923.13 (having weapons while under disability)</td>
                    </tr>
                    <tr>
                        <td>2923.161 (improperly discharging a firearm at or into a habitation or school)</td>
                    </tr>
                    <tr>
                        <td>2923.162 (discharge of firearm on or near prohibited premises)</td>
                    </tr>
                    <tr>
                        <td>2923.21 (improperly furnishing firearms to minor)</td>
                    </tr>
                    <tr>
                        <td>2923.32 (engaging in pattern of corrupt activity)</td>
                    </tr>
                    <tr>
                        <td>2923.42 (participating in criminal gang)</td>
                    </tr>
                    <tr>
                        <td>2925.02 (corrupting another with drugs)</td>
                    </tr>
                    <tr>
                        <td>2925.03 (trafficking in drugs)</td>
                    </tr>
                    <tr>
                        <td>2925.04 (illegal manufacture of drugs or cultivation of marihuana)</td>
                    </tr>
                    <tr>
                        <td>2925.041 (illegal assembly or possession of chemicals for the manufacture of drugs)</td>
                    </tr>
                    <tr>
                        <td>3716.11 (placing harmful objects in food or confection)</td>
                    </tr>
                    <tr>
                        <td>3716.11 (placing harmful objects in food or confection)</td>
                    </tr>
                    <tr>
                        <td>
                            A violation of an existing or former municipal ordinance or law of this state, any other
                            state, or the United States that is substantially equivalent to any of the offenses or
                            violations on this list.
                        </td>
                    </tr>
                </table>
                <div className="header_form">
                    <div className="header_form2"> Tier 3 Disqualifying Offenses (Seven-Year Exclusion):</div>
                </div>{" "}
                <table className="table">
                    <tr>
                        <td> 959.13 (cruelty to animals)</td>
                    </tr>

                    <tr>
                        <td>959.131 (prohibitions concerning companion animals)</td>
                    </tr>
                    <tr>
                        <td>2903.12 (aggravated assault)</td>
                    </tr>
                    <tr>
                        <td>2903.21 (aggravated menacing)</td>
                    </tr>
                    <tr>
                        <td>2903.211 (menacing by stalking)</td>
                    </tr>
                    <tr>
                        <td>2905.12 (coercion)</td>
                    </tr>
                    <tr>
                        <td>2909.04 (disrupting public services)</td>
                    </tr>
                    <tr>
                        <td>2911.02 (robbery)</td>
                    </tr>
                    <tr>
                        <td>2911.12 (burglary)</td>
                    </tr>
                    <tr>
                        <td>2913.47 (insurance fraud)</td>
                    </tr>
                    <tr>
                        <td>2917.01 (inciting to violence)</td>
                    </tr>
                    <tr>
                        <td>2917.03 (riot)</td>
                    </tr>
                    <tr>
                        <td>2917.31 (inducing panic)</td>
                    </tr>
                    <tr>
                        <td>2919.22 (endangering children)</td>
                    </tr>
                    <tr>
                        <td>2919.25 (domestic violence)</td>
                    </tr>
                    <tr>
                        <td>2921.03 (intimidation)</td>
                    </tr>
                    <tr>
                        <td>2921.11 (perjury)</td>
                    </tr>
                    <tr>
                        <td>
                            2921.13 (falsification, falsification in theft offense, falsification to purchase firearm,
                            or falsification to obtain a concealed handgun license)
                        </td>
                    </tr>
                    <tr>
                        <td>2921.34 (escape)</td>
                    </tr>
                    <tr>
                        <td>2921.35 (aiding escape or resistance to lawful authority)</td>
                    </tr>
                    <tr>
                        <td>
                            2921.36 (illegal conveyance of weapons, drugs, or other prohibited items onto grounds of
                            detention facility or institution)
                        </td>
                    </tr>

                    <tr>
                        <td>
                            2923.01 (conspiracy) when the underlying offense is any of the offenses or violations on
                            this list
                        </td>
                    </tr>

                    <tr>
                        <td>
                            2923.02 (attempt) when the underlying offense is any of the offenses or violations on this
                            list
                        </td>
                    </tr>

                    <tr>
                        <td>
                            2923.03 (complicity) when the underlying offense is any of the offenses or violations on
                            this list
                        </td>
                    </tr>
                    <tr>
                        <td>2925.05 (funding of drug or marihuana trafficking)</td>
                    </tr>

                    <tr>
                        <td>2925.06 (illegal administration or distribution of anabolic steroids)</td>
                    </tr>
                    <tr>
                        <td>2925.24 (tampering with drugs)</td>
                    </tr>
                    <tr>
                        <td>2927.12 (ethnic intimidation)</td>
                    </tr>
                    <tr>
                        <td>
                            A violation of an existing or former municipal ordinance or law of this state, any other
                            state, or the United States that is substantially equivalent to any of the offenses or
                            violations on this list.
                        </td>
                    </tr>
                </table>
                <div className="header_form">
                    <div className="header_form2">Tier 4 Disqualifying Offenses (Five-Year Exclusion):</div>
                </div>{" "}
                <table className="table">
                    <tr>
                        <td>2903.13 (assault)</td>
                    </tr>
                    <tr>
                        <td>2903.22 (menacing)</td>
                    </tr>
                    <tr>
                        <td>2907.09 (public indecency)</td>
                    </tr>
                    <tr>
                        <td>2907.24 (soliciting after positive human immunodeficiency virus test)</td>
                    </tr>
                    <tr>
                        <td>2907.25 (prostitution)</td>
                    </tr>
                    <tr>
                        <td>2907.33 (deception to obtain matter harmful to juveniles)</td>
                    </tr>
                    <tr>
                        <td>2911.13 (breaking and entering)</td>
                    </tr>
                    <tr>
                        <td>2913.02 (theft)</td>
                    </tr>
                    <tr>
                        <td>2913.03 (unauthorized use of a vehicle)</td>
                    </tr>
                    <tr>
                        <td>2913.04 (unauthorized use of property, computer, cable, or telecommunication property)</td>
                    </tr>
                    <tr>
                        <td>2913.05 (telecommunications fraud)</td>
                    </tr>
                    <tr>
                        <td>2913.11 (passing bad checks)</td>
                    </tr>
                    <tr>
                        <td>2913.21 (misuse of credit cards)</td>
                    </tr>
                    <tr>
                        <td> 2913.31 (forgery, forging identification cards)</td>
                    </tr>
                    <tr>
                        <td>2913.32 (criminal simulation)</td>
                    </tr>
                    <tr>
                        <td>2913.41 (defrauding a rental agency or hostelry)</td>
                    </tr>
                    <tr>
                        <td>2913.42 (tampering with records)</td>
                    </tr>
                    <tr>
                        <td>2913.43 (securing writings by deception)</td>
                    </tr>
                    <tr>
                        <td>2913.44 (personating an officer)</td>
                    </tr>
                    <tr>
                        <td>2913.441 (unlawful display of law enforcement emblem)</td>
                    </tr>
                    <tr>
                        <td>2913.45 (defrauding creditors)</td>
                    </tr>
                    <tr>
                        <td>2913.51 (receiving stolen property)</td>
                    </tr>
                    <tr>
                        <td>2919.12 (unlawful abortion)</td>
                    </tr>
                    <tr>
                        <td>2919.121 (unlawful abortion upon minor)</td>
                    </tr>
                    <tr>
                        <td>2919.123 (unlawful distribution of an abortion-inducing drug)</td>
                    </tr>
                    <tr>
                        <td>2919.23 (interference with custody)</td>
                    </tr>
                    <tr>
                        <td>2919.24 (contributing to unruliness or delinquency of child)</td>
                    </tr>
                    <tr>
                        <td>2921.12 (tampering with evidence)</td>
                    </tr>
                    <tr>
                        <td>2921.21 (compounding a crime)</td>
                    </tr>
                    <tr>
                        <td>2921.24 (disclosure of confidential information)</td>
                    </tr>
                    <tr>
                        <td>2921.32 (obstructing justice)</td>
                    </tr>
                    <tr>
                        <td>2921.321 (assaulting/harassing police dog or horse/service animal)</td>
                    </tr>
                    <tr>
                        <td>2921.51 (impersonation of peace officer)</td>
                    </tr>
                    <tr>
                        <td>
                            2923.01 (conspiracy) when the underlying offense is any of the offenses or violations on
                            this list
                        </td>
                    </tr>
                    <tr>
                        <td>
                            2923.02 (attempt) when the underlying offense is any of the offenses or violations on this
                            list
                        </td>
                    </tr>
                    <tr>
                        <td>
                            2923.03 (complicity) when the underlying offense is any of the offenses or violations on
                            this list
                        </td>
                    </tr>
                    <tr>
                        <td>
                            2925.09 (illegal administration, dispensing, distribution, manufacture, possession, selling,
                            or using any dangerous veterinary drug)
                        </td>
                    </tr>
                    <tr>
                        <td>2925.11 (drug possession other than a minor drug possession offense)</td>
                    </tr>
                    <tr>
                        <td>2925.13 (permitting drug abuse)</td>
                    </tr>
                    <tr>
                        <td>2925.22 (deception to obtain dangerous drugs)</td>
                    </tr>
                    <tr>
                        <td>2925.23 (illegal processing of drug documents)</td>
                    </tr>
                    <tr>
                        <td>2925.36 (illegal dispensing of drug samples)</td>
                    </tr>
                    <tr>
                        <td>2925.55 (unlawful purchase of pseudoephedrine product)</td>
                    </tr>
                    <tr>
                        <td>2925.56 (unlawful sale of pseudoephedrine product)</td>
                    </tr>
                    <tr>
                        <td>
                            A violation of an existing or former municipal ordinance or law of this state, any other
                            state, or the United States that is substantially equivalent to any of the offenses or
                            violations on this list.
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default AttestationAgreementEmployeer;
