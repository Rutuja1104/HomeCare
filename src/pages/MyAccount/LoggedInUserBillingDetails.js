import React from "react";
import Label from "../../components/label/labelV2/Label";

const LoggedInUserBillingDetails = ({ employments }) => {
    return (
        <div>
            {employments?.map((employment, index) => {
                return (
                    <div className="emplyment-info-2" key={index}>
                        <div className="d-flex" style={{ columnGap: "8rem" }}>
                            <div className="block">
                                <Label>Employer Name</Label>
                                <p>{employment?.Employername}</p>
                            </div>
                            <div className="block">
                                <Label>Contact Person Name</Label>
                                <p>{employment?.contactPersonName}</p>
                            </div>
                            <div className="block">
                                <Label>Job Title</Label>
                                <p>{employment?.jobTitle}</p>
                            </div>
                            <div className="block">
                                <Label>Responsibilities</Label>
                                <p>{employment?.responsibilities}</p>
                            </div>
                            <div className="block">
                                <Label>Starting Salary</Label>
                                <p>{employment?.startingSalary}</p>
                            </div>{" "}
                            <div className="block">
                                <Label>Ending Salary</Label>
                                <p>{employment?.endingSalary}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default LoggedInUserBillingDetails;
