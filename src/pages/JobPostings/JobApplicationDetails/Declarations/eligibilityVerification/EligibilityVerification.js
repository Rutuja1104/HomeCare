import React, { useEffect } from "react";
import Heading from "../../../../../components/heading/Heading";
import { HEADING } from "../../../../../components/heading/constants/constants";
import Information from "../../../../../components/information/Information";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getDeclarationFormDetails } from "../../JobApplicationDetailsSaga";
import ResponsiveLabelValue from "../../../../../components/responsiveLabelValue/ResponsiveLabelValue";
import Container from "../../../../../components/container/Container";
import { componentKey } from "../../JobApplicationDetailsSlice";
import Base64Image from "../../../../../components/base64Image/Base64Image";
import General from "../../../../../libs/utility/General";

function EligibilityVerification() {
    const dispatch = useDispatch()
    const { nurseId } = useParams()
    const agencyId = General.getLocalStorageData("agencyId")

    const { eligibilityFormVerificationFormData, jobApplicationCompleteDetails } = useSelector(state => state[componentKey])

    useEffect(() => {
        if (nurseId && agencyId) dispatch(getDeclarationFormDetails({ nurseId, agencyId, formType: "EmploymentEligibilityVerification" }))
    }, [])

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
                        <Heading type={HEADING.H2} customStyle={{ color: "Grey/90" }}>
                            Department of Homeland Security
                        </Heading>
                        <Heading type={HEADING.H3} customStyle={{ color: "Grey/90" }}>
                            U.S. Citizenship and Immigration Services
                        </Heading>
                    </div>
                </div>

                <div className="disclaimer">
                    <div className="disclaimerName">I9 and W4 Disclaimer:</div>
                    <div className="disclaimerDescription grey-text">
                        <p className="text-para">
                            {" "}
                            The I-9 and W-4 forms generated by this software are based on official forms provided by the
                            Department of Homeland Security (DHS) and the Internal Revenue Service (IRS),respectively.
                            While every effort has been made to ensure the accuracy and compliance of the forms
                            generated, it is the responsibility of the user to review and verify the information entered
                            into these forms for completeness and accuracy. MediSoft Group and this software are not
                            affiliated with or endorsed by the DHS or the IRS.Any reference to official forms or
                            government agencies is for informational purposes only. By using I-9 and W-4 forms
                            established by our software you acknowledge and accept that MediSoft Group is not
                            responsible for any errors, omissions,or discrepancies in the completed forms.`
                        </p>
                    </div>
                </div>

                <div className="startHere">
                    <div className="startHereName">
                        {" "}
                        <p className="text-para">START HERE:</p>
                    </div>
                    <div className="disclaimerDescription,.grey-text">
                        <p className="text-para">
                            {" "}
                            Employers must ensure the form instructions are available to employees when completing this
                            form. Employers are liable for failing to comply with the requirements for completing this
                            form. See below and the Instructions.
                        </p>
                    </div>
                </div>

                <div className="notice">
                    <div className="noticeText">
                        <p className="text-para">ANTI-DISCRIMINATION NOTICE:</p>
                    </div>
                    <div className="disclaimerDescription,.grey-text">
                        {" "}
                        <p className="text-para">
                            All employees can choose which acceptable documentation to present for Form I-9. Employers
                            cannot ask employees for documentation to verify information in Section 1, or specify which
                            acceptable documentation employees must present for Section 2 or Supplement B,
                            Revivification and Rehire. Treating employees differently based on their citizenship,
                            immigration status, or national origin may be illegal.
                        </p>
                    </div>
                </div>

                <Information>Section 1 :</Information>
                <div className="employeeInformation">
                    <Heading type={HEADING.H5} customStyle={{ margin: "0" }} className="icon-text">
                        Employee Information and Attestation:
                    </Heading>
                    <div className="disclaimerDescription,.grey-text">
                        Employees must complete and sign Section 1 of Form I-9 no later than the first day of
                        employment, but not before accepting a job offer.
                    </div>
                </div>
                <div className="uscis-form">
                    I am aware that federal law provides for imprisonment and/or fines for false statements, or the use
                    of false documents, in connection with the completion of this form. I attest, under penalty of
                    perjury, that this information, including my selection of the box attesting to my citizenship or
                    immigration status, is true and correct.
                </div>
                <div className="check-text mb-3">
                    Check one of the following boxes to attest to your citizenship or immigration status (See page 2 and
                    3 of the instructions.).
                </div>

                <div className="checkbox-container">
                    <div className="checkText">
                        If you check <strong>Item Number 4.</strong>, enter one of these:
                    </div>
                </div>

                {eligibilityFormVerificationFormData.length ? eligibilityFormVerificationFormData.map((item, index) =>
                    <Container header={item[0]?.category} containerMainClassName="mb-4" key={index}>
                        <ResponsiveLabelValue data={item} />
                    </Container>
                ) : ""}
                <Container>
                    <Base64Image base64={jobApplicationCompleteDetails.digitalSignature} header="Applicant Signature" />
                </Container>
            </div>
        </React.Fragment>
    );
}

export default EligibilityVerification;
