import React, { useEffect } from "react";

import Icons from "../../../../components/icon/Icon";
import Heading from "../../../../components/heading/Heading";
import ProgressStatus from "../../../../components/progressStatus/ProgressStatus";

import { HEADING } from "../../../../components/heading/constants/constants";
import { VEC_ICON_NAME } from "../../../../components/icon/constants";

import { getJobApplicationStatus, getInterviewScheduledDetailsNurseOnboarding } from "../JobApplicationSaga";
import { componentKey } from "../JobApplicationSlice";
import { componentKey as nurseOnboardingComponentKey } from "../../NurseOnboardingSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import moment from "moment";
import Button from "../../../../components/button/Button";
import General from "../../../../libs/utility/General";

const Interview = () => {
    const dispatch = useDispatch();
    const { agencyId } = useParams();

    const [searchParams, setSearchParams] = useSearchParams();
    const nurseId = General.getLocalStorageData("nurseId");
    const { applicationId } = useSelector((state) => state[nurseOnboardingComponentKey]);
    const { jobApplicationStatus, interviewScheduledDetails } = useSelector((state) => state[componentKey]);
    useEffect(() => {
        if (applicationId) {
            dispatch(getJobApplicationStatus({ applicationId, agencyId }));
        }
    }, [applicationId]);

    useEffect(() => {
        dispatch(getInterviewScheduledDetailsNurseOnboarding({ agencyId, nurseId }));
    }, [jobApplicationStatus])

    const activitiesData = [
        {
            info: "Sent",
            time: "Your application has been submitted",
            active: jobApplicationStatus?.toLowerCase() === "pending" ? true : false
        },
        {
            info: jobApplicationStatus.split("-")[0].toLowerCase() === "validating" ? "Validating" : jobApplicationStatus?.toLowerCase() === "scheduled" ? "Validated": jobApplicationStatus?.toLowerCase() === "active"?"Validated": "Validate",
            time: jobApplicationStatus.split("-")[0].toLowerCase() === "validating" ? "Please wait, we are currently reviewing your application" :
                jobApplicationStatus?.toLowerCase() === "scheduled" ||
                    jobApplicationStatus?.toLowerCase() === "fail" ||
                    jobApplicationStatus?.toLowerCase() === "active" ? "Your application has been validated" : "Please be patient as your application is being reviewed.",
            active: jobApplicationStatus.split("-")[0].toLowerCase() === "validating" ? true : false
        },
        {
            info: "Interview Schedule",
            time:
                jobApplicationStatus?.toLowerCase() === "scheduled" ||
                    jobApplicationStatus?.toLowerCase() === "pending" ||
                    jobApplicationStatus?.toLowerCase() === "fail" ||
                    jobApplicationStatus?.toLowerCase() === "active"
                    ? "Your interview has been scheduled"
                    : "Hiring team will schedule an interview",
            active: jobApplicationStatus?.toLowerCase() === "scheduled" ? true : false
        },
        {
            info:
                jobApplicationStatus?.toLowerCase() === "scheduled" ||
                    jobApplicationStatus?.toLowerCase() === "validated" ||
                    jobApplicationStatus?.toLowerCase() === "pending"
                    ? "Hire"
                    : jobApplicationStatus?.toLowerCase() === "active"
                        ? "Hired"
                        : jobApplicationStatus?.toLowerCase() === "fail"
                            ? "Failed"
                            : "",
            time:
                jobApplicationStatus?.toLowerCase() === "scheduled"
                    ? "Your application is currently being validated"
                    : jobApplicationStatus?.toLowerCase() === "active"
                        ? "Your application has been approved"
                        : jobApplicationStatus?.toLowerCase() === "fail"
                            ? "Your application has been failed"
                            : "HR will reach to you for further instructions",
            active:
                jobApplicationStatus?.toLowerCase() === "active"
                    ? true
                    : jobApplicationStatus?.toLowerCase() === "fail"
                        ? true
                        : false
        }
    ];

    const interviewerPhoneNumberNameonly = <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', textAlign: 'start' }}>
        <div>
            <div>
                Interviewer phone number :
            </div>
            <div>
                Interviewer name :
            </div>
        </div>
        <div>
            <div>
                {interviewScheduledDetails?.interviewerPhoneNumber || "-"}
            </div>
            <div>
                {interviewScheduledDetails?.interviewerName || "-"}
            </div>
        </div>
    </div>

    const interviewerPhoneNumberName = <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', textAlign: 'start' }}>
        <div>
            <div>
                Interviewer phone number :
            </div>
            <div>
                Interviewer name :
            </div>
            <div>
                Address Line 1 :
            </div>
            <div>
                AddressLine 2 :
            </div>
            <div>
                Landmark :
            </div>
            <div>
                State :
            </div>
            <div>
                Country:
            </div>
            <div>
                ZIP Code:
            </div>


        </div>
        <div>
            <div>
                {interviewScheduledDetails?.interviewerPhoneNumber || "-"}
            </div>
            <div>
                {interviewScheduledDetails?.interviewerName || "-"}
            </div>
            <div>
                {interviewScheduledDetails?.address?.addressLine1 || "-"}
            </div>
            <div>
                {interviewScheduledDetails?.address?.addressLine2 || "-"}
            </div>
            <div>
                {interviewScheduledDetails?.address?.landmark || "-"}
            </div>
            <div>
                {interviewScheduledDetails?.address?.state || "-"}
            </div>
            <div>
                {interviewScheduledDetails?.address?.country || "-"}
            </div>
            <div>
                {interviewScheduledDetails?.address?.pinCode || "-"}
            </div>
        </div>
    </div>

    const interviewScheduledDetailsAll = (
        <div
            style={{
                // dispaly: "flex",
                fontWeight: "700",
                fontSize: "20px",
                // lineHeight: "29px",
                color: "var(--grey-60, var(--grey-60, #8F8F8F))"
            }}
        >
            <div>
                Your Interview has been Scheduled on date
                <span> {moment.utc(interviewScheduledDetails.date).format('LL')} Interview duration {interviewScheduledDetails.duration}</span>
            </div>
            <br />
            {interviewScheduledDetails.meetingLink && interviewerPhoneNumberNameonly}
            <br />
            {!interviewScheduledDetails.addressId ? (
                interviewScheduledDetails.meetingLink ? <Button
                    onClickCb={() => {
                        window.open(
                            `${interviewScheduledDetails.meetingLink}`,
                            "_blank"
                        );
                    }}
                >
                    Meeting Link
                </Button> : ""
            ) : (
                interviewScheduledDetails.meetingLink && <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', textAlign: 'start' }}>
                    <div>
                        <div>
                            Interviewer phone number :
                        </div>
                        <div>
                            Interviewer name :
                        </div>
                    </div>
                    <div>
                        <div>
                            {interviewScheduledDetails.interviewerPhoneNumber}
                        </div>
                        <div>
                            {interviewScheduledDetails.interviewerName}
                        </div>
                    </div>
                </div>
            )}
            {(!interviewScheduledDetails.meetingLink && interviewScheduledDetails.addressId) ? interviewerPhoneNumberName : ""}
        </div>
    );

    return (
        <React.Fragment>
            <div className="progress-container">
                <div className="inprogress-block ">
                    <div className="progress-step-title interview-in-progress">
                        <Heading type={HEADING.H3} className="text-[40px]">
                            Application Progress
                        </Heading>
                        <span>Jan 24-Feb14</span>
                    </div>
                    <div className="progress-steps interview-in-progress">
                        <ProgressStatus isEditable={false} activities={activitiesData} />
                    </div>
                </div>
                <div className="image-container p-5 interview-status">
                    <div className="contents">
                        {jobApplicationStatus?.toLowerCase() !== "scheduled" ?
                            <div>
                                <Icons iconName={VEC_ICON_NAME.WAITING_IMAGE} />
                            </div> : ""
                        }
                        <div className="heading">
                            {jobApplicationStatus === "Scheduled" ? (
                                <Heading
                                    type={HEADING.H1}
                                    customStyle={{
                                        color: "var(--grey-60, var(--grey-60, #8F8F8F))",
                                        marginTop: "30px"
                                    }}
                                >
                                    {(interviewScheduledDetails.addressId || interviewScheduledDetails.meetingLink) ? interviewScheduledDetailsAll : ""}
                                </Heading>
                            ) : (
                                <Heading
                                    type={HEADING.H1}
                                    customStyle={{
                                        color: "var(--grey-60, var(--grey-60, #8F8F8F))",
                                        marginTop: "30px"
                                    }}
                                >
                                    Please wait for reply from the Agency!!!!!
                                </Heading>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Interview;
