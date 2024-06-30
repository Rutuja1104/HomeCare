import React from "react";
import Label from "../../components/label/labelV2/Label";

const LoggedInUserTasks = ({ educations }) => {
    return (
        <div>
            {educations?.map((education, index) => {
                return (
                    <div className="educational-info-2" key={index}>
                        <div className="d-flex" style={{ columnGap: "8rem" }}>
                            <div className="block">
                                <Label>Type</Label>
                                <p>{education?.type}</p>
                            </div>
                            <div className="block">
                                <Label>Stream</Label>
                                <p>{education?.stream}</p>
                            </div>
                            <div className="block">
                                <Label>Institute Name</Label>
                                <p>{education?.instituteName}</p>
                            </div>
                            <div className="block">
                                <Label>Year Attended</Label>
                                <p>{education?.yearAttended}</p>
                            </div>
                            <div className="block">
                                <Label>Year Of Passout</Label>
                                <p>{education?.yearofPassout}</p>
                            </div>{" "}
                            <div className="block">
                                <Label>Address</Label>
                                <p>{education?.addressId}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default LoggedInUserTasks;
