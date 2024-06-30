import React, { useEffect } from "react";
import TabbedNavigation from "../../../../components/tabbedNavigation/TabbedNavigation";
import EligibilityVerification from "./eligibilityVerification/EligibilityVerification";
import EmployeesWithholdingCertificate from "./employeesWithholdingCertificate/EmployeesWithholdingCertificate";

const Declarations = () => {

    const tabList = [
        {
            title: "Employment Eligibility Verification (Form I-9)",
            linkTo: "/tab1",
            tabBodyComponent: <EligibilityVerification />
        },
        {
            title: "Employee’s Withholding Certificate (Form W-4)",
            linkTo: "/tab2",
            tabBodyComponent: <EmployeesWithholdingCertificate />
        },
    ];
    useEffect(() => {
        window.scrollTo(0, 0);
    });
    return (
        <div>
            <TabbedNavigation tabList={tabList} />
        </div>
    );
};

export default Declarations;
