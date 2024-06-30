import React, { useState, useEffect } from 'react';
import Label from '../label/labelV2/Label';
import RadioInput from '../input/radioinput/RadioInput';
import TextArea from '../input/textarea/TextArea';
import Button from '../button/Button';
import { BUTTON_TYPE } from '../../libs/constant';
import { useDispatch } from 'react-redux';
import { setJobDescriptionText } from '../../pages/NurseOnboarding/JobApplication/JobApplicationSlice';
import SignaturePad from '../signaturePad/SignaturePad';
import Container from '../container/Container';
import Base64Image from '../base64Image/Base64Image';
import { toast } from 'react-toastify';
import { postAppendDocument } from '../../pages/NurseOnboarding/NurseOnboardingSaga';
import { setActiveJobApplicationStep, setApproversSign } from '../../pages/JobPostings/JobApplicationDetails/JobApplicationDetailsSlice';
import { postApproverSign, putValidateUserByAgencyAdmin } from '../../pages/JobPostings/JobApplicationDetails/JobApplicationDetailsSaga';
import { useParams } from 'react-router-dom';
import General from '../../libs/utility/General';

const CheckListRender = ({
    questions,
    jobApplicationCompleteDetails = '',
    index = '',
    approversSign = '',
    getSubmittedChecklist='',
    onChangeCb = () => { },
    compulsory = false,
    questionsPerPage = 15,
    onSubmitTestCb = () => { },
    onPreviousCb = () => { },
    buttonVisible = false,
    isAllowSignature = false,
    saveSignatureCb = () => { },
    signature = "",
    isSecondSignature = false,
    secondSignature = "",
    isReadOnlySignature = false
}) => {
    const [startIndex, setStartIndex] = useState(0);
    const endIndex = startIndex + questionsPerPage;
    const isLastSet = endIndex >= questions.length;
    const { nurseId } = useParams();
    const dispatch = useDispatch();

    const token = General.getLocalStorageData('token');

    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isGetSignature, setIsGetSignature] = useState(false)
    useEffect(() => {
        setSelectedAnswers({});
        window.scrollTo(0, 0);
    }, [startIndex]);

    // const handleGetSignature = (signature, isEmpty) => {
    //     if (isEmpty) {
    //         setIsGetSignature(false)
    //     } else {

    //         saveSignatureCb(signature)
    //     }
    // }
    const handleSaveSignatureClick = (sign, isCanvasEmpty) => {

        if (!compulsory || areAllAnswersSelected(startIndex, endIndex)) {
            if (isLastSet) {
                onSubmitTestCb();
            } else {
                setStartIndex(endIndex);
            }
        }

        if (!isCanvasEmpty) {
            dispatch(setApproversSign(sign))
            dispatch(postApproverSign({
                id: getSubmittedChecklist?.id, AdminSignBase64: sign, agencyId: getSubmittedChecklist?.agencyId,
                nurseId: getSubmittedChecklist?.nurseId, formType: getSubmittedChecklist?.formType, ...getSubmittedChecklist
            }))
            window.scrollTo(0, 0)
        } else {
            return toast.error('Please sign the form!')
        }

        if (jobApplicationCompleteDetails?.role == 'HHA') {
            dispatch(
                putValidateUserByAgencyAdmin({
                    nurseId,
                    data: { onboardingStatus: 'validating-8' },
                    activeIndex: index + 1
                })
            );
        } else if (!["ADMINISTRATOR", "DON", "QAPI", "HR", "DSP", "RECEPTIONIST", "MARKETINGMANAGER", "CM"].includes(jobApplicationCompleteDetails?.role)) {
            dispatch(
                putValidateUserByAgencyAdmin({
                    nurseId,
                    data: { onboardingStatus: 'validating-9' },
                    activeIndex: index + 1
                })
            );
        }

        setIsGetSignature(true)

    }

    const handleNext = () => {
        if (jobApplicationCompleteDetails?.role == 'HHA') {
            dispatch(
                putValidateUserByAgencyAdmin({
                    nurseId,
                    data: { onboardingStatus: 'validating-4' },
                    activeIndex: index + 1
                })
            );
        } else if (!["ADMINISTRATOR", "DON", "QAPI", "HR", "DSP", "RECEPTIONIST", "MARKETINGMANAGER", "CM"].includes(jobApplicationCompleteDetails?.role)) {
            dispatch(
                putValidateUserByAgencyAdmin({
                    nurseId,
                    data: { onboardingStatus: 'validating-5' },
                    activeIndex: index + 1
                })
            );
        }

        setIsGetSignature(true)
        if (!compulsory || areAllAnswersSelected(startIndex, endIndex)) {
            if (isLastSet) {
                onSubmitTestCb();
            } else {
                setStartIndex(endIndex);
            }
        }
    };

    const handleBack = () => {
        dispatch(setActiveJobApplicationStep(index - 1));
        onPreviousCb()
        if (startIndex > 0) {
            setStartIndex(startIndex - questionsPerPage);
        }
    };

    const areAllAnswersSelected = (start, end) => {
        end = Math.min(end, questions.length);

        for (let i = start; i < end; i++) {
            const category = questions[i];
            for (let j = 0; j < category.questions.length; j++) {
                const question = category.questions[j];
                if (!question?.choices?.some((choice) => choice?.checked === true)) {
                    return false;
                }
            }
        }
        return true;
    };

    const handleRadioChange = (categoryIndex, questionIndex, choiceIndex, checked) => {
        setSelectedAnswers(prevAnswers => ({
            ...prevAnswers,
            [categoryIndex]: {
                ...prevAnswers[categoryIndex],
                [questionIndex]: choiceIndex,
            },
        }));
        onChangeCb(checked, categoryIndex, questionIndex, choiceIndex);
    };

    return (
        <React.Fragment>
            {questions.slice(startIndex, endIndex).map((category, categoryIndex) => {
                return (
                    <div className='job-application-checklist' key={categoryIndex}>
                        <Label>{`${categoryIndex + 1}. `}{category.category}</Label>
                        {category.questions.map((item, questionIndex) => {
                            return (
                                <div className={`job-application-checklist ms-5 ${category.questions.length == 1 ? " mt-0" : ""}`} key={questionIndex}>
                                    <Label>{category.questions.length > 1 && item.question}</Label>
                                    <div>
                                        {item.choices.map((data, idx) => (
                                            <RadioInput
                                                key={idx}
                                                label={{ suffixLabel: data.label }}
                                                name={`category-${categoryIndex}-question-${questionIndex}`}
                                                value={data.label}
                                                // color={data.checked ? "green" : "red"}
                                                checked={data.checked}
                                                onChangeCb={(e) => handleRadioChange(categoryIndex, questionIndex, idx, e.target.checked)}
                                            />
                                        ))}
                                    </div>
                                    {item?.isDescription &&
                                        <div>
                                            <Label>{item?.isDescriptionFromAdmin ? "If No, mentioned the reason in the below box" : "If No, please mention the reason in the following column:"}</Label>
                                            <TextArea
                                                rows={2}
                                                readOnly={item?.isDescriptionFromAdmin}
                                                placeholder="Mention Reason"
                                                onChangeCb={(event) => dispatch(setJobDescriptionText({ value: event.target.value, categoryIndex, questionIndex }))}
                                                value={item.description || ""}
                                            ></TextArea>
                                        </div>
                                    }
                                </div>
                            );
                        })}
                    </div>
                );
            })}
            {isReadOnlySignature && <Base64Image base64={signature} header="Applicant Signature" />}

            {isAllowSignature &&
                <div>
                    {isSecondSignature &&
                        <Base64Image base64={secondSignature} header="Applicant's Signature" />
                    }
                    <Label>Approver Signature : <span style={{ color: 'red' }}>*</span> </Label>
                    <SignaturePad isGetSignature={isGetSignature} savedSignature={approversSign} isNextAllowed={true}
                        isPreviousAllowed={true} onPrevCb={handleBack} saveSignatureCb={handleSaveSignatureClick} />
                </div>
            }

            {buttonVisible &&
                <div className='mt-5'>
                    <Button className="button-width me-3" variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER} onClickCb={handleBack} >Back</Button>
                    <Button className="button-width" onClickCb={() => isReadOnlySignature ? onSubmitTestCb(isReadOnlySignature) : handleNext()} disabled={compulsory && !areAllAnswersSelected(startIndex, endIndex)}>{isLastSet ? "Submit" : "Next"}</Button>
                </div>
            }
        </React.Fragment >
    );
};

export default CheckListRender;
