import React, { useEffect, useState } from "react";
import { BUTTON_TYPE } from "../../libs/constant";
import Button from "../button/Button";

const CustomNavigation = ({ steps, activeTabIndex }) => {
    const [activeNavigationIndex, setActionNavigationIndex] = useState(0);
    useEffect(() => {
        if (activeTabIndex >= 0 && activeTabIndex <= steps.length - 1) {
            setActionNavigationIndex(activeTabIndex);
        }
    }, [activeTabIndex]);

    const handlePrevClick = (prevCb) => {
        if (activeNavigationIndex !== 0) {
            setActionNavigationIndex((index) => index - 1);
            prevCb();
        }
    };

    const handleOnNextClick = (nextCb, buttonDisable = false, submitButtonDisabledInfoCb = false) => {
        if (buttonDisable) {
            submitButtonDisabledInfoCb();
            return;
        }

        if (activeNavigationIndex < steps.length - 1) {
            setActionNavigationIndex((index) => index + 1);
            nextCb();
        }
    };
    return (
        <React.Fragment>
            {steps.map((item, idx) => (
                <React.Fragment key={idx}>
                    {activeNavigationIndex === idx && (
                        <div key={idx}>
                            {item.stepBodyComponent}
                            <div className="button-group mt-5">
                                {item.backButtonText?.length && (
                                    <Button
                                        className="button-width me-3"
                                        variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}
                                        onClickCb={() => handlePrevClick(item.prevCb)}
                                    >
                                        {item.backButtonText}
                                    </Button>
                                )}
                                {item.submitButtonText?.length ? (
                                    <Button
                                        className="button-width"
                                        onClickCb={() =>
                                            handleOnNextClick(
                                                item.submitCb,
                                                item.submitButtonDisabled,
                                                item.submitButtonDisabledInfoCb
                                            )
                                        }
                                    >
                                        {item.submitButtonText}
                                    </Button>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    )}
                </React.Fragment>
            ))}
        </React.Fragment>
    );
};

export default CustomNavigation;
