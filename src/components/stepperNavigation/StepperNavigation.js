import React, { useEffect, useState } from 'react';

import { BUTTON_TYPE } from '../../libs/constant';
import { VEC_ICON_NAME } from '../icon/constants';
import { Link } from 'react-router-dom';

import Container from '../container/Container';
import Icons from '../icon/Icon';

const StepperNavigation = ({ steps, className, activeStep = 0, containerClassName, skipAutoNextStep = false, isIndexAllowed = false, isNavigate = true }) => {
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    useEffect(() => {
        setActiveStepIndex(activeStep);
    }, [activeStep]);

    const handleOnPreviousClick = (previousCb, idx) => {
        if (activeStepIndex !== 0) {
            setActiveStepIndex((index) => index - 1);
        }
        previousCb(idx);
    };

    const handleOnNextClick = (nextCb, idx) => {
        if (activeStepIndex < steps.length - 1) {
            setActiveStepIndex((index) => index + 1);
        }
        nextCb(idx);
    };

    return (
        <React.Fragment>
            <div className={`steps-container ${className && className}`}>
                {steps.map((step, index) => (
                    <div className="step" key={index} >
                        {activeStepIndex > index && activeStepIndex !== 0 ? (
                            <Icons
                                style={{
                                    background: 'green',
                                    padding: '2px',
                                    width: '25px',
                                    height: '25px',
                                    borderRadius: '100%'
                                }}
                                iconName={VEC_ICON_NAME.STEP_DONE_ICON}
                            />
                        ) : (
                            <span className={`step-number ${activeStepIndex == index ? 'selected-step' : ''}`}>
                                {index + 1}
                            </span>
                        )}
                        {isNavigate ?
                            <Link className={`title ${activeStepIndex == index ? 'selected-step-title' : ''}`} to={step.isTitleClickAllow ? `#${step.linkTo}` : undefined} onClick={() => step.isTitleClickAllow ? () => step.onTitleClickCb(index) : () => { }}>
                                {step.title}
                            </Link> :
                            <span className={`title ${activeStepIndex == index ? 'selected-step-title' : ''}`} onClick={() => step.isTitleClickAllow ? () => step.onTitleClickCb(index) : () => { }}>
                                {step.title}
                            </span>
                        }
                        {steps.length - 1 !== index && <span className="step-line"></span>}
                    </div>
                ))}
            </div>

            <div className="mt-3">
                {steps.map((item, idx) => (
                    <React.Fragment key={idx}>
                        {idx == activeStepIndex && (
                            <Container
                                containerClassName={containerClassName}
                                prefixProps={{
                                    name: item.backButtonText,
                                    variant: BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER,
                                    onClickPreviousCb: () => skipAutoNextStep ? item.prevCb(idx) : handleOnPreviousClick(item.prevCb, idx)
                                }}
                                suffixProps={{
                                    name: item.submitButtonText,
                                    onClickNextCb: () => skipAutoNextStep ? item.submitCb(idx) : handleOnNextClick(item.submitCb, idx),
                                    disabled: item.submitButtonDisabled,
                                    submitButtonDisabledInfoCb: item.submitButtonDisabledInfoCb
                                }}
                            >
                                {isIndexAllowed ? item.stepBodyComponent(idx) : item.stepBodyComponent}
                            </Container>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </React.Fragment>
    );
};

export default StepperNavigation;
