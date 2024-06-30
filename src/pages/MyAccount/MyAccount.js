import React, { useEffect, useRef } from "react";
import ProfileImage from "../../components/profileImg/ProfileImage";
import { HEADING } from "../../components/heading/constants/constants";
import Heading from "../../components/heading/Heading";
import Icons from "../../components/icon/Icon";
import { VEC_ICON_NAME } from "../../components/icon/constants";
import IconLabel from "../../components/iconlabel/IconLabel";
import Label from "../../components/label/labelV2/Label";
import moment from "moment";
import TabbedNavigation from "../../components/tabbedNavigation/TabbedNavigation";
import LoggedInUserTasks from "./LoggedInUserTasks";
import LoggedInUserBillingDetails from "./LoggedInUserBillingDetails";
import LoggedInUserDocuments from "./LoggedInUserDocuments";
import General from "../../libs/utility/General";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUserDetails, postProfileImg } from "../Home/HomeSaga";
import { componentKey } from "../Home/HomeSlice";
import Avatar from "../../components/avatar/Avatar";
const MyAccount = () => {
    const token = General.getLocalStorageData("token");
    const dispatch = useDispatch();
    const inputBoxRef = useRef(null);
    const { loggedInUserDetails } = useSelector((state) => state[componentKey]);
    const userPersonalDetails = Object.keys(loggedInUserDetails).length > 0 && loggedInUserDetails?.nurse[0];
    const tabList = [
        {
            title: "Educations",
            linkTo: "/tab2",
            tabBodyComponent: <LoggedInUserTasks educations={userPersonalDetails?.educations} />,
        },
        {
            title: "Employments",
            linkTo: "/tab3",
            tabBodyComponent: <LoggedInUserBillingDetails employments={userPersonalDetails?.employments} />,
        },
        {
            title: "Documents",
            linkTo: "/tab3",
            tabBodyComponent: userPersonalDetails && (
                <LoggedInUserDocuments documents={userPersonalDetails?.documents} />
            ),
        },
    ];

    useEffect(() => {
        dispatch(
            getLoggedInUserDetails({
                agencyId: General.tokenDecode(token)?.agencyId,
                userId: General.tokenDecode(token)?.id,
            })
        );
    }, []);

    const onChangeInput = (e) => {
        const image = e.target.files[0];
        const userId = userPersonalDetails?.userId;

        if (image) {
            const reader = new FileReader();

            reader.onloadend = function () {
                const imageDataArrayBuffer = reader.result;
                let imageDataUnitArray = btoa(
                    new Uint8Array(imageDataArrayBuffer).reduce(function (imageDataArrayBuff, byte) {
                        return imageDataArrayBuff + String.fromCharCode(byte);
                    }, "")
                );
                dispatch(postProfileImg({ profilePhoto: `data:image/png;base64,${imageDataUnitArray}`, userId }));
            };
            reader.readAsArrayBuffer(image);
        }
    };

    const onSelectProfileImg = (e) => {
        inputBoxRef.current.click();
    };

    return (
        <div className="view-patient-container">
            {userPersonalDetails ? (
                <>
                    <div className="view-patient-details">
                        <div className="personal-info-1">
                            <div className="block1">
                                <Avatar
                                    style={{
                                        height: "105px",
                                        width: "105px",
                                        fontSize: "40px",
                                        backgroundColor: "#6a96ab4d",
                                    }}
                                    src={userPersonalDetails?.profilePhoto}
                                />
                                <div className="add-profile-img" onClick={onSelectProfileImg}>
                                    <input
                                        ref={inputBoxRef}
                                        type="file"
                                        onChange={onChangeInput}
                                        style={{ display: "none" }}
                                        accept="image/*"
                                    />
                                    <Icons iconName={VEC_ICON_NAME.CAMERA_ICON} />
                                </div>
                            </div>

                            <div className="block2">
                                <Heading type={HEADING.h6}>
                                    {userPersonalDetails?.firstName || ""} {userPersonalDetails?.lastName || ""}
                                </Heading>
                                <div className="">
                                    <span>
                                        <Icons iconName={VEC_ICON_NAME.CALL_ICON} />
                                    </span>
                                    <span className="text" style={{ marginLeft: 10 }}>
                                        {userPersonalDetails?.Telephone}
                                    </span>
                                    <span style={{ marginLeft: 10 }}>
                                        <Icons iconName={VEC_ICON_NAME.MAIL_OUTLINE} />
                                    </span>
                                    <span className="text" style={{ marginLeft: 10 }}>
                                        {userPersonalDetails?.email}
                                    </span>
                                </div>

                                <div className="d-flex mt-2">
                                    <Icons iconName={VEC_ICON_NAME.LOCATION_ICON} />
                                    <IconLabel
                                        text={
                                            userPersonalDetails?.addresses &&
                                            `${userPersonalDetails?.addresses[0]?.addressLine1 || ""}, ${
                                                userPersonalDetails?.addresses[0]?.addressLine2 || ""
                                            } ${userPersonalDetails?.addresses[0]?.city || ""},  ${
                                                userPersonalDetails?.addresses[0]?.state || ""
                                            }, ${userPersonalDetails?.addresses[0]?.pinCode || "-"}, ${
                                                userPersonalDetails?.addresses[0]?.country || "-"
                                            }`
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="personal-info-2">
                            <div className="block1">
                                <div className="block">
                                    <Label>Role</Label>
                                    <p>{userPersonalDetails?.role}</p>
                                </div>
                                <div className="block">
                                    <Label>US Citizen</Label>
                                    <p>{userPersonalDetails?.usCitizen === "true" ? "Yes" : "No"}</p>
                                </div>
                                <div className="block">
                                    <Label>SSN</Label>
                                    <p>{userPersonalDetails?.ssn}</p>
                                </div>
                            </div>
                            <div className="block2">
                                <div className="block">
                                    <Label>Date of Birth</Label>
                                    <p>{moment(userPersonalDetails?.dob).format("MM-DD-YYYY") || "-"}</p>
                                </div>
                                <div className="block">
                                    <Label>State Residence</Label>
                                    <p>{userPersonalDetails?.StateResidence}</p>
                                </div>{" "}
                                <div className="block">
                                    <Label>Gender</Label>
                                    <p>{userPersonalDetails?.gender}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <TabbedNavigation tabList={tabList} />
                    </div>
                </>
            ) : (
                <p>No patient data available.</p>
            )}
        </div>
    );
};
export default MyAccount;
