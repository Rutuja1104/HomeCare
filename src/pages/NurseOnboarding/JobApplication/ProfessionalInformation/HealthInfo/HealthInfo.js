import React, { useEffect } from 'react'
import Heading from '../../../../../components/heading/Heading'
import { HEADING } from '../../../../../components/heading/constants/constants'
import TextInput from '../../../../../components/input/textinput/TextInput'
import ResponsiveBox from '../../../../../components/responsivebox/ResponsiveBox'
import Label from '../../../../../components/label/labelV2/Label'
import SignaturePad from '../../../../../components/signaturePad/SignaturePad'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { JOB_APPLICATION_TYPE } from '../../../constants'
import { setJobApplicationActiveStep, setJobApplicationFormType } from '../../JobApplicationSlice'
import Questionnaire from '../../../../../components/questionnaire/Questionnaire'
import { componentKey as professionalInformationComponentKey, setAllRequiredFieldsTouched, setHealthInfoQuestions, setHealthInfoQuestionsChange, setHealthInfoQuestionsDescription, setHealthInformationSignature, setPersonalInformation } from "../ProfessionalInformationSlice"
import GeneralValidator, { generalValidator } from '../../../../../libs/utility/validators/GeneralValidator'
import { postNurseOnboardingApplication } from '../../JobApplicationSaga'
import { componentKey as NurseOnboardingComponentKey } from "../../../NurseOnboardingSlice"
import { useParams } from 'react-router-dom'
import DatePicker from '../../../../../components/datePicker/DatePicker'

const HealthInfo = () => {

    const { agencyId } = useParams()
    const { professionalInformation, healthInfoQuestions, healthInformationSignature, questionnaires } = useSelector(state => state[professionalInformationComponentKey])
    const { applicationId } = useSelector(state => state[NurseOnboardingComponentKey])

    const dispatch = useDispatch()

    const health_info_questions = [
        {
            name: "question 1",
            question: "Do you have any physical/health limitations that might affect your ability to perform the expected duties you are Active for?",
            choices: [
                { checked: false, label: "Yes" },
                { checked: false, label: "No" }
            ],
            isDescription: true,
            onChangeDescriptionCb: (event, parentIndex) => dispatch(setHealthInfoQuestionsDescription({ text: event.target.value, parentIndex }))
        },
        // {
        //     name: "question 2",
        //     question: "Have you ever been dismissed from employment for drug use/addiction or ever been treated for drug use/addiction?",
        //     choices: [
        //         { checked: false, label: "Yes" },
        //         { checked: false, label: "No" }
        //     ],
        //     isDescription: true,
        //     onChangeDescriptionCb: (event, parentIndex) => dispatch(setHealthInfoQuestionsDescription({ text: event.target.value, parentIndex }))
        // },
        {
            name: "question 3",
            question: "Have you ever been convicted of a crime other than a routine traffic citation?",
            choices: [
                { checked: false, label: "Yes" },
                { checked: false, label: "No" }
            ],
        }, {
            name: "question 4",
            question: "How did you hear about our company?",
            choices: [
                { checked: false, label: "Direct Mailer" },
                { checked: false, label: "Newspaper Ad" },
                { checked: false, label: "Referral by another employee" },
            ],
        }
    ]

    useEffect(() => {
        if (!healthInfoQuestions.length) {
            dispatch(setHealthInfoQuestions(health_info_questions))
        }
        dispatch(setJobApplicationActiveStep(6))
    }, [])

    const handleSaveSignatureClick = (sign, isCanvasEmpty) => {
        dispatch(setAllRequiredFieldsTouched(true))

        // && !GeneralValidator.validateRequiredFieldsArray(professionalInformation.LicenseInformation)
        if ((!isCanvasEmpty)) {
            dispatch(setHealthInformationSignature(sign))

            dispatch(postNurseOnboardingApplication({ agencyId, applicationId: applicationId, professionalInformation, questionnaires, healthInfoQuestions, healthInformationSignature }))
        } else {
            toast.error('Please enter all required information.')
        }
    }

    const handlePrevClick = () => {
        dispatch(setJobApplicationActiveStep(5))
    }

    const onChangeHandler = (event, rules) => {
        const { name, value } = event.target;

        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(setPersonalInformation({ object: { [name]: { value, errors, rules } }, filedName: "healthInformation" }));
        }
        else {
            dispatch(setPersonalInformation({ object: { [name]: { value } }, filedName: "healthInformation" }));
        }
    };

    return (
        <React.Fragment>
            <Heading type={HEADING.H2}>Health Info</Heading>
            <ResponsiveBox>
                <DatePicker
                    label='Date of last examination by physician:'
                    name='LastExaminationByPhysician'
                    onChangeCb={onChangeHandler}
                    value={professionalInformation.healthInformation.LastExaminationByPhysician.value}
                    rules={professionalInformation.healthInformation.LastExaminationByPhysician.rules}
                    errors={professionalInformation.healthInformation.LastExaminationByPhysician.errors}
                    formSubmitted={professionalInformation.allRequiredFieldsTouched}
                    maxDate={new Date()}
                />
                <div></div>
                <div></div>
            </ResponsiveBox>

            <Questionnaire questions={healthInfoQuestions} onChangeCb={(checked, parentIndex, childIndex) => dispatch(setHealthInfoQuestionsChange({ checked, parentIndex, childIndex }))} />

            {healthInfoQuestions[2]?.choices?.filter(item => item.checked)[0]?.label === "Referral by another employee" &&
                <ResponsiveBox>
                    <TextInput
                        type='text'
                        placeHolder={'Please enter referred name'}
                        name='ReferredBy'
                        onChangeCb={onChangeHandler}
                        label='I was referred by :'
                        value={professionalInformation.healthInformation.ReferredBy.value}
                        rules={{ rules: { required: false } }}
                        errors={professionalInformation.healthInformation.ReferredBy.errors}
                        formSubmitted={professionalInformation.allRequiredFieldsTouched}
                    />
                    <div></div>
                    <div></div>
                </ResponsiveBox>
            }

            <div className='mt-4'>
                <Label className="mb-2">Applicant’s Signature :</Label>
                <SignaturePad onPrevCb={handlePrevClick} isPreviousAllowed={true} saveSignatureCb={handleSaveSignatureClick} savedSignature={healthInformationSignature} />
            </div>

        </React.Fragment>
    )
}

export default HealthInfo
