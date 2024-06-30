import React from "react";
import Header from "./common/header";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { postAppendDocument } from "../../pages/NurseOnboarding/NurseOnboardingSaga";
import { componentKey, setAbuserRegistryAnnualNoticeSignature } from "../../pages/NurseOnboarding/NurseOnboardingSlice";
import Base64Image from "../base64Image/Base64Image";

function AbuserRegistryAnnualNotice() {
    const { applicationId, agencyId } = useParams();
    const dispatch = useDispatch();

    const { signatureInBase64 } = useSelector(state => state[componentKey]);

    return (
        <div className="nurse-onboarding-new-forms">
            <Header header={"ABUSER REGISTRY ANNUAL NOTICE"} />
            <div className="body">
                <div className="paragraph">
                    The Ohio Department of Developmental Disabilities (“department”) maintains an Abuser Registry
                    (“registry”), which is a list of employees who the department has determined have committed one of
                    the registry offenses listed below. The developmental disabilities (DD) employees that may be placed
                    on the registry include: department employees, county board of developmental disabilities employees,
                    independent providers under Ohio Revised Code (R.C.) section 5123.16, an employee providing
                    specialized services to an individual with a developmental disability, including an entity licensed
                    or certified by the department.
                </div>
                <div className="paragraph">
                    If your name is placed on the registry you are barred from employment as a DD employee in the state
                    of Ohio.
                </div>
                <div className="paragraph">
                    Since other state agencies require employers to check the registry, placement may also prohibit:
                </div>
                <div>
                    <div className="paragraph paragraph-with-margin-left">
                        (1) being employed by a Medicaid agency, being an owner (five percent or more) of an agency or
                        having a Medicaid Provider Agreement as a non-agency provider;
                    </div>
                    <div className="paragraph paragraph-with-margin-left">
                        (2) being in a position to provide Ombudsman services or direct care services to anyone enrolled
                        in a program administered by the Ohio Department of Aging; and
                    </div>
                    <div className="paragraph paragraph-with-margin-left">
                        (3) being employed by a home health agency, a nursing home, or residential care facility in a
                        direct care position.
                    </div>
                </div>
                <div className="bold-heading margin-bottom">Registry Offenses:</div>
                <ul className="paragraph-without-flex">
                    <li className="margin-bottom">
                        <span className="bold-heading">Physical Abuse -</span> the use of any physical force that could
                        reasonably be expected to result in physical harm.
                    </li>
                    <li className="margin-bottom">
                        <span className="bold-heading">Sexual Abuse -</span> unlawful sexual conduct (unprivileged
                        intercourse or other sexual penetration) and unlawful sexual contact (unprivileged touching of
                        another’s erogenous zone).
                    </li>
                    <li className="margin-bottom">
                        <span className="bold-heading">Verbal Abuse -</span> purposely using words to threaten, coerce,
                        intimidate, harass, or humiliate an individual.
                    </li>

                    <li className="margin-bottom">
                        <span className="bold-heading">Prohibited Sexual Relations-</span> Consensual touching of an
                        erogenous zone for sexual gratification and the individual is in the employee’s care and the
                        individual is not the employee’s spouse.
                    </li>
                    <li className="margin-bottom">
                        <span className="bold-heading">Neglect -</span> when there is a duty to do so, failing to
                        provide an individual with any treatment, care, goods, or services necessary to maintain the
                        health or safety of the individual.
                    </li>
                    <li className="margin-bottom">
                        <span className="bold-heading">Misappropriation (Theft) -</span> obtaining the property of an
                        individual or individuals, without consent, with a combined value of at least $100. Theft of the
                        individual’s prescribed medication, check, credit card, ATM card and the like of any monetary
                        value are also registry offenses.
                    </li>
                    <li className="margin-bottom">
                        <span className="bold-heading">Failure to Report Abuse, Neglect or Misappropriation -</span> the
                        employee unreasonably does not report abuse, neglect, or misappropriation of the property of a
                        person with developmental disabilities, or the substantial risk to such an individual of abuse,
                        neglect, or misappropriation, when the employee should know that their non-reporting will result
                        in a substantial risk of harm to such individual.
                    </li>
                    <li className="margin-bottom">
                        <span className="bold-heading">Conviction or plea of guilty to - </span>
                        <div>
                            <div className="paragraph paragraph-with-margin-left" style={{ display: "block" }}>
                                <span className="bold-heading">Offense of Violence - </span>
                                R. C. 2901.01, including convictions for the offense of Assault, Menacing, Domestic
                                Violence or Attempting to commit any offense of violence;
                            </div>
                            <div className="paragraph paragraph-with-margin-left">
                                <span className="bold-heading">Sexual Offenses - </span>
                                R. C. Chapter 2907;
                            </div>
                            <div className="paragraph paragraph-with-margin-left">
                                <span className="bold-heading">Theft Offenses - </span> R. C. Chapter 2913;
                            </div>
                            <div className="paragraph paragraph-with-margin-left">
                                <span className="bold-heading">
                                    Failing to provide for a functionally impaired person -
                                </span>
                                R.C. 2903.16;
                            </div>
                            <div className="paragraph paragraph-with-margin-left">
                                <span className="bold-heading">Patient Abuse or Neglect - </span> R.C. 2903.34;
                            </div>
                            <div className="paragraph paragraph-with-margin-left">
                                <span className="bold-heading">Patient Endangerment - </span> R.C. 2903.341; and/or
                            </div>
                            <div className="paragraph paragraph-with-margin-left">
                                <span className="bold-heading">Endangering Children - </span> R.C. 2919.22.
                            </div>
                        </div>
                    </li>
                </ul>
                <div className="paragraph-without-flex-no-margin">
                    More information is available on the department’s website under the Health and Welfare tab.
                </div>
                <div className="paragraph-with-margin-left margin-bottom paragraph-without-flex-no-margin">
                    The registry website is at:{" "}
                    <a href="https://its.prodapps.dodd.ohio.gov/ABR_Default.aspx">
                        https://its.prodapps.dodd.ohio.gov/ABR_Default.aspx.
                    </a>
                </div>
                <div className="paragraph-with-margin-left paragraph-without-flex-no-margin">
                    Please call the department at 614-995-3810 with any questions regarding the registry.
                </div>
                <br />
                <br />
                <div>
                    <Base64Image base64={signatureInBase64} header="Applicant Signature" />
                </div>
            </div>
        </div>
    );
}

export default AbuserRegistryAnnualNotice;
