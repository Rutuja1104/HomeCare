import React, { useState, useEffect } from 'react';
import Label from '../label/labelV2/Label';
import RadioInput from '../input/radioinput/RadioInput';
import TextArea from '../input/textarea/TextArea';
import Button from '../button/Button';
import { BUTTON_TYPE } from '../../libs/constant';

const Questionnaire = ({ questions, onChangeCb = () => { }, showOrderNumber = false, compulsory = false, questionsPerPage = 15, onSubmitTestCb = () => { }, onPreviousCb = () => { }, buttonVisible = false,showVerically=false,spaceHorizontally=false}) => {
    const [startIndex, setStartIndex] = useState(0);
    const endIndex = startIndex + questionsPerPage;
    const isLastSet = endIndex >= questions.length;

    const [selectedAnswers, setSelectedAnswers] = useState({});

    useEffect(() => {
        setSelectedAnswers({});
        window.scrollTo(0, 0);
    }, [startIndex]);

    const handleNext = () => {
        if (!compulsory || areAllAnswersSelected(startIndex, endIndex)) {
            if (isLastSet) {
                window.scrollTo(0, 0);
                onSubmitTestCb()
            } else {
                setStartIndex(endIndex);
            }
        }
    };

    const handleBack = () => {
        window.scrollTo(0, 0);
        if (startIndex > 0) {
            setStartIndex(startIndex - questionsPerPage);
        } else {
            onPreviousCb()
        }
    };

    const areAllAnswersSelected = (start, end) => {
        end = Math.min(end, questions.length);

        for (let i = start; i < end; i++) {
            const question = questions[i];
            if (!question.choices.some((choice) => choice.checked === true)) {
                return false;
            }
        }
        return true;
    };

    const handleRadioChange = (index, choiceIndex, checked) => {
        setSelectedAnswers(prevAnswers => ({
            ...prevAnswers,
            [startIndex + index]: choiceIndex,
        }));
        onChangeCb(checked, startIndex + index, choiceIndex);
    };

    return (
        <React.Fragment>
            {questions.slice(startIndex, endIndex).map((item, index) => {
                const questionIndex = startIndex + index;
                return (
                    <div className="job-application-questions" key={questionIndex} >
                        <Label>{showOrderNumber && `${questionIndex + 1}. `}{item.question} {compulsory && <span className='text-danger'>*</span>}</Label>
                        {!showVerically && <div className={`${spaceHorizontally ? 'taskAssesment-radio-button-space':null }`}>
                            {item?.choices?.map((data, idx) => (
                                <RadioInput
                                    key={idx}
                                    label={{ suffixLabel: data.label }}
                                    name={data.name}
                                    value={data.label}
                                    color={`${item.correctOptionIndex !== undefined ? item.correctOptionIndex ? "green" : "red" : "#215DAA"}`}
                                    checked={data.checked}
                                    onChangeCb={(e) => handleRadioChange(index, idx, e.target.checked)}
                                />
                            ))}
                        </div>
                        }
                        {showVerically &&<div>
                            {item?.choices?.map((data, idx) => (
                                // eslint-disable-next-line react/jsx-key
                                <div style={{marginBottom:'20px'}} className='taskAssesment-checkBoxAndRadioButton-option'>
                                    <RadioInput
                                        key={idx}
                                        label={{ suffixLabel: data.label }}
                                        name={data.name}
                                        value={data.label}
                                        // color={`${
                                        //     item.correctOptionIndex !== undefined
                                        //         ? item.correctOptionIndex
                                        //             ? "green"
                                        //             : "red"
                                        //         : "#215DAA"
                                        // }`}
                                        checked={data.checked}
                                        onChangeCb={(e) => handleRadioChange(index, idx, e.target.checked)}
                                    />
                                </div>
                            ))}
                        </div>}
                        {item?.isDescription &&
                            <div>
                                <Label>If yes, please mention the reason in the following column:</Label>
                                <TextArea
                                    placeholder="Mention Reason"
                                    onChangeCb={(event) => item?.onChangeDescriptionCb(event, questionIndex)}
                                    value={item?.description || ""}
                                ></TextArea>
                            </div>
                        }
                    </div>
                );
            })}

            {buttonVisible &&
                <div className='mt-5'>
                    <Button className="button-width me-3" variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER} onClickCb={handleBack} >Back</Button>
                    <Button className="button-width" onClickCb={handleNext} disabled={compulsory && !areAllAnswersSelected(startIndex, endIndex)}>{isLastSet ? "Submit" : "Next"}</Button>
                </div>
            }
        </React.Fragment>
    );
};

export default Questionnaire;
