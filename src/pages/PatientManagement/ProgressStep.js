import React, { useState } from 'react';
import Heading from '../../components/heading/Heading';
import { HEADING } from '../../components/heading/constants/constants';
import Icons from '../../components/icon/Icon';
import { VEC_ICON_NAME } from '../../components/icon/constants';
import Button from '../../components/button/Button';
import { BUTTON_TYPE } from '../../libs/constant';
import ProgressStatus from '../../components/progressStatus/ProgressStatus';
const ProgressStep = () => {
    const activitiesData = [
        {
            icon: <Icons familyName="vec" iconName={VEC_ICON_NAME.GREEN_ELLIPSE} />,
            info: 'Sent',
            time: 'Departed from country of origin'
            // view: 'View form'
        },
        {
            icon: <Icons familyName="vec" iconName={VEC_ICON_NAME.GREEN_ELLIPSE} />,
            info: 'Validate',
            time: 'Departed from country of origin'
        },
        {
            icon: <Icons familyName="vec" iconName={VEC_ICON_NAME.GREEN_ELLIPSE} />,
            info: 'Approval',
            time: 'Departed from country of origin'
        }
    ];

    return (
        <div className="progress-container">
            <div className="inprogress-block">
                <div className="progress-step-title">
                    <Heading type={HEADING.H1} className="text-[40px]">
                        In Progress
                    </Heading>
                    <span>Jan 24-Feb14</span>
                </div>
                <div className="progress-steps">
                    <ProgressStatus
                        isEditable
                        activities={activitiesData}
                        onClickCorrectIcon={() => {
                            console.log('hi');
                        }}
                        onClickCrossIcon={() => {
                            console.log('cross');
                        }}
                    />
                </div>
                <div>
                    <Button variant={BUTTON_TYPE.PRIMARY} className="mt-4 w-100">
                        Next
                    </Button>
                </div>
            </div>
            <div className="image-container">
                <div className="contents">
                    <div>
                        <Icons iconName={VEC_ICON_NAME.WAITING_IMAGE} />
                    </div>
                    <div className=" heading">
                        <p>Please wait for reply from the Physician to proceed further!!!!!</p>
                    </div>
                    <Button variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER} className="mt-4">
                        View Sent Order
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default ProgressStep;
