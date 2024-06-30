import React, { useEffect, useState } from "react";
import Icons from "../../../components/icon/Icon";
import { VEC_ICON_NAME } from "../../../components/icon/constants";
import PaymentsIcon from "@mui/icons-material/Payments";
import WorkIcon from "@mui/icons-material/Work";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Label from "../../../components/label/labelV2/Label";
import parse from "html-react-parser";
import Button from "../../../components/button/Button";
import { BUTTON_TYPE } from "../../../libs/constant";
import {
    componentKey,
    setAllRequiredFieldsTouched,
    setJobApplication,
    setJobApplicationDropdown,
    setOpenJobApplicationModal,
    setUploadedResume,
} from "../JobPostingSlice";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedJobPost, postApplyForJobApplication } from "../JobPostingSaga";
import JobApplicationModal from "../../../components/models/JobApplicationModal";
import GeneralValidator, { generalValidator } from "../../../libs/utility/validators/GeneralValidator";

function ViewJobPostPage() {
    const dispatch = useDispatch();
    const [viewMore, setViewMore] = useState(false);
    const {
        jobApplication,
        openJobApplicationModal,
        jobApplicationDropdown,
        allRequiredFieldsTouched,
        uploadedResume,
        selectedSingleJobPost,
    } = useSelector((state) => state[componentKey]);
    const postData = selectedSingleJobPost;
    const salaryFormat = postData?.fixedSalary
        ? `$ ${postData?.fixedSalary} an hour`
        : `$${postData?.salaryRange} an hour`;
    var currentURL = window.location.href;
    const url = new URL(currentURL);
    const agency = url.pathname.match(/\/job-post\/([^/]+)\/post\//);
    const jobPost = url.pathname.match(/\/post\/([^/]+)$/);

    useEffect(() => {
        const postId = jobPost[1];
        const agencyId = agency[1];
        dispatch(getSelectedJobPost({ agencyId, postId }));
    }, []);

    const onClickApply = () => {
        dispatch(setOpenJobApplicationModal(true));
    };

    function containsSpecialChars(str) {
        var specialChars = /[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/;
        return specialChars.test(str);
    }

    const onChangeHandler = (event, rules) => {
        const { name, value, type } = event.target;

        if (name == "TelephoneNumber") {
            const numericValue = value.replace(/\D/g, "");

            let formattedValue = "";
            if (numericValue.length > 0) {
                formattedValue += `(${numericValue.slice(0, 3)}`;
            }
            if (numericValue.length > 3) {
                formattedValue += `)-${numericValue.slice(3, 6)}`;
            }
            if (numericValue.length > 6) {
                formattedValue += `-${numericValue.slice(6, 10)}`;
            }

            if (rules) {
                const errors = generalValidator.validate(numericValue, rules);
                dispatch(setJobApplication({ [name]: { value: formattedValue, errors, rules } }));
            } else {
                dispatch(setJobApplication({ [name]: { value: formattedValue } }));
            }
        } else {
            let regex = /\d/;

            if ((regex.test(value) && type == "text") || (type == "text" && containsSpecialChars(value))) {
                return;
            }

            if (rules) {
                const errors = generalValidator.validate(value, rules);
                dispatch(setJobApplication({ [name]: { value, errors, rules } }));
            } else {
                dispatch(setJobApplication({ [name]: { value } }));
            }
        }
    };

    return (
        <div>
            <div className="jobPostTitle">{postData?.title}</div>
            <div className="p-4">
                <div>
                    <div className="">
                        <Icons iconName={VEC_ICON_NAME.BUILDING_ICON} /> {postData?.agencyName}
                    </div>

                    <div className="flexSpace">
                        <div>
                            <div>
                                <Icons iconName={VEC_ICON_NAME.LOCATION_ICON_2} /> {postData?.jobLocation}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="flexSpace">
                        <div>
                            <PaymentsIcon /> Pay
                            <div className="jobPostCardType mt-2" style={{ width: "" }}>
                                <p style={{ marginBottom: "0px" }}>{salaryFormat}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flexSpace">
                        <div>
                            <WorkIcon /> Job Type
                            <div className="jobPostCardType mt-2" style={{ alignItems: "center", marginBottom: "0px" }}>
                                <p className="" style={{ marginBottom: "0px" }}>
                                    {postData?.jobType}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flexSpace">
                        <div>
                            <PersonAddIcon /> Role
                            <div
                                className="jobPostCardType  mt-2"
                                style={{ alignItems: "center", marginBottom: "0px" }}
                            >
                                <p className="" style={{ marginBottom: "0px" }}>
                                    {postData?.role}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flexSpace">
                        <div>
                            <PersonAddIcon /> Position
                            <div
                                className="jobPostCardType  mt-2"
                                style={{ alignItems: "center", marginBottom: "0px" }}
                            >
                                <p className="" style={{ marginBottom: "0px" }}>
                                    {postData?.status}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div></div>
                    <div></div>
                </div>
                <div className="mt-4">
                    <Label>Description</Label>
                    <div style={{ overflowY: "visible" }} className="discription ">
                        <div>{parse(postData?.description || "")}</div>{" "}
                    </div>
                </div>
                <div className="mt-5">
                    <Button onClickCb={onClickApply}>Apply</Button>
                </div>
            </div>
            {
                <JobApplicationModal
                    allRequiredFieldsTouched={allRequiredFieldsTouched}
                    jobApplicationFormData={jobApplication}
                    jobApplicationDropdown={jobApplicationDropdown}
                    isRole={postData?.role}
                    isOpen={openJobApplicationModal}
                    toggle={() => {
                        dispatch(setOpenJobApplicationModal(!openJobApplicationModal));
                        dispatch(setAllRequiredFieldsTouched(false));
                    }}
                    onSelectCb={(name, selectedOption) => {
                        dispatch(setJobApplicationDropdown({ name, selectedOption }));
                    }}
                    onChangeCb={onChangeHandler}
                    onSuccessCb={() => {
                        dispatch(setAllRequiredFieldsTouched(true));

                        let obj = {
                            ...jobApplication,
                            isOneYrExp: { ...jobApplication.isOneYrExp, rules: { required: false } },
                            homeCareExperience: { ...jobApplication.homeCareExperience, rules: { required: false } },
                            isvalidCNA: { ...jobApplication.isvalidCNA, rules: { required: false } },
                        };

                        if (!GeneralValidator.validateRequiredFields(obj)) {
                            const data = {
                                firstName: jobApplication.FirstName?.value,
                                middleName: jobApplication.MiddleName?.value,
                                lastName: jobApplication.LastName?.value,
                                email: jobApplication.Email?.value,
                                phone: jobApplication.TelephoneNumber?.value.replace(/[-()]/g, ""),
                                gender: jobApplication.Gender.value,
                                yearofExperience: jobApplication.Experience?.value,
                                previousEmployerName: jobApplication.PreviousEmployerName.value,
                                role: postData?.role,
                                status: "Pending",
                                applicationFormStatus: "Received",
                                jobId: postData.id,
                                agencyId: agency[1],
                                isLicense: jobApplication?.isLicense?.value == "Yes" ? true : false,
                                validAge: jobApplication?.validAge?.value == "Yes" ? true : false,
                                isvalidCNA: jobApplication?.isvalidCNA?.value == "Yes" ? true : false,
                                isOneYrExp: jobApplication?.isOneYrExp?.value == "Yes" ? true : false,
                                homeCareExperience: jobApplication?.homeCareExperience?.value,
                                staff_type: "CS",
                            };

                            const formData = new FormData();
                            formData.append("file", uploadedResume[0]);
                            dispatch(postApplyForJobApplication({ data, file: uploadedResume, formData }));
                            setViewMore(false);
                        }
                    }}
                    onUploadFiles={(file) => {
                        dispatch(setUploadedResume(file));
                    }}
                />
            }
        </div>
    );
}

export default ViewJobPostPage;
