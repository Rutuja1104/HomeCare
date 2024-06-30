import React from "react";
import Heading from "../../../../components/heading/Heading";
import { HEADING } from "../../../../components/heading/constants/constants";
import { VEC_ICON_NAME } from "../../../../components/icon/constants";
import Icons from '../../../../components/icon/Icon'


const FinalResult = () => {
    return (
        <div className="interview">
            <div className="container">
                <div className="interviewImg">
                    <div className="job-application-image">
                        <Icons iconName={VEC_ICON_NAME.FINAL_RESULT_IMAGE} />
                    </div>
                    <div className="congratulationsText">
                        <h5 style={{ color: 'teal'}}>Congratulations!!!!! You have been selected for the Job</h5>
                    </div>
                    <div className="emailNotificationText">
                        <h6>Check your <a href="#" className="emailLink">Email Address</a> which you have shared with us to know how to proceed further!</h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinalResult;
