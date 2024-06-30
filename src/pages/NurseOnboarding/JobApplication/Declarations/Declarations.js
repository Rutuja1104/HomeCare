import React from "react";
import TabbedNavigation from "../../../../components/tabbedNavigation/TabbedNavigation";
import EligibilityVerification from "./eligibilityVerification/EligibilityVerification";
import EmployeesWithholdingCertificate from "./employeesWithholdingCertificate/EmployeesWithholdingCertificate";
import { useSelector } from "react-redux";
import { componentKey } from "../JobApplicationSlice";

const Declarations = ({ activeIndex }) => {

    const { activeDeclarationTab } = useSelector(state => state[componentKey])

    const tabList = [
        {
            title: "Employment Eligibility Verification (Form I-9)",
            linkTo: "/tab1",
            tabBodyComponent: <EligibilityVerification activeIndex={activeIndex} />

        },
        {
            title: "Employee’s Withholding Certificate (Form W-4)",
            linkTo: "/tab2",
            tabBodyComponent: <EmployeesWithholdingCertificate activeIndex={activeIndex} />
        },
    ];
    return (
        <div>
            <TabbedNavigation tabList={tabList} activeTabIndex={activeDeclarationTab} />
        </div>
    );
};

export default Declarations;
