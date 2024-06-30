import React, { useEffect } from 'react';

import StepperNavigation from '../../../components/stepperNavigation/StepperNavigation';
import PersonalInformation from './ProfessionalInformation/PersonalInformation/PersonalInformation';
import EducationalInfo from './ProfessionalInformation/EducationalInfo/EducationalInfo';
import PreviousEmployerInfo from './ProfessionalInformation/PreviousEmployerInfo/PreviousEmployerInfo';
import ReferencesInfo from './ProfessionalInformation/ReferencesInfo/ReferencesInfo';
import NursingLicense from './ProfessionalInformation/NursingLicense/NursingLicense';
import RequiredDocument from './ProfessionalInformation/RequiredDocument/RequiredDocument';
import BackgroundCheck from './BackgroundCheck/BackgroundCheck';
import SkillTest from './SkillTest/SkillTest';
import Declarations from './Declarations/Declarations';
import Interview from './Interview/Interview';
import GeneralValidator from '../../../libs/utility/validators/GeneralValidator';
import SkillCheckList from './SkillCheckList/SkillCheckList';

import { useDispatch, useSelector } from 'react-redux';
import { setActiveTabIndex } from '../NurseOnboardingSlice';
import { JOB_APPLICATION_TYPE } from '../constants';
import { setAllRequiredFieldsTouched } from './ProfessionalInformation/ProfessionalInformationSlice';
import { componentKey, setJobApplicationActiveStep } from './JobApplicationSlice';
import { componentKey as professionalInformationComponentKey } from '../JobApplication/ProfessionalInformation/ProfessionalInformationSlice';
import { componentKey as nurseOnboardingComponentKey } from '../NurseOnboardingSlice';
import { getAssessmentsByRole, postNurseOnboardingApplication } from './JobApplicationSaga';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import General from '../../../libs/utility/General';

const JobApplication = () => {
    const dispatch = useDispatch();
    const { applicationId, agencyId, role } = useParams();

    const {
        jobApplicationActiveStep,
        jobApplicationFormType,
        uploadedDocumentsList,
        backgroundCheck,
        backgroundCheckDocumentList
    } = useSelector((state) => state[componentKey]);

    const { professionalInformation, healthInfoQuestions, healthInformationSignature, questionnaires } = useSelector((state) => state[professionalInformationComponentKey]);
    const { signatureInBase64,activeTabIndex} = useSelector((state) => state[nurseOnboardingComponentKey]);
    const nurseId = General.getLocalStorageData("nurseId")
    useEffect(() => {
        if (role === 'HHA') {
            dispatch(getAssessmentsByRole({ role: role, agencyId, nurseId }))
        }
    }, [role]);

    const PROFESSIONAL_INFO_STEPS = [
        {
            title: 'Personal Information',
            stepBodyComponent: (idx) => <PersonalInformation activeIndex={idx} />,
            discardCb: () => { },
            submitCb: (idx) => {
                window.scrollTo(0, 0)
                dispatch(
                    postNurseOnboardingApplication({
                        agencyId,
                        applicationId: applicationId,
                        professionalInformation,
                        questionnaires,
                        healthInfoQuestions,
                        healthInformationSignature,
                        signatureInBase64,
                        step: 'Step-1',
                        uploadedDocumentsList,
                        activeIndex: idx,
                        applicationSteps: PROFESSIONAL_INFO_STEPS.length
                    })
                );
                dispatch(setJobApplicationActiveStep(idx + 1));
            },
            backButtonText: 'Back',
            prevCb: (idx) => {
                dispatch(setActiveTabIndex(activeTabIndex-1));
                window.scrollTo(0, 0)
            },
            submitButtonText: 'Next',
            submitButtonDisabled: GeneralValidator.validateRequiredFields(professionalInformation.personalInfo) || !questionnaires.every((item) => item.choices.some((item) => item.checked == true)),
            submitButtonDisabledInfoCb: () => {
                dispatch(setAllRequiredFieldsTouched({ name: 'personalInfoFieldsTouched', value: true }));
                window.scrollTo(0, 0)
                if (!questionnaires.every((item) => item.choices.some((item) => item.checked == true))) {
                    toast.error('Please select all questions');
                }
            },
            linkTo: 'personal-information',
            isTitleClickAllow: true,
            onTitleClickCb: (index) => {
                dispatch(setAllRequiredFieldsTouched({ name: 'personalInfoFieldsTouched', value: true }));
                if (!GeneralValidator.validateRequiredFields(professionalInformation.personalInfo)) {
                    dispatch(setJobApplicationActiveStep(index));
                }
            }
        },
        {
            title: 'Educational Info',
            stepBodyComponent: (idx) => <EducationalInfo activeIndex={idx} />,
            discardCb: () => { },
            backButtonText: 'Back',
            prevCb: (idx) => {
                window.scrollTo(0, 0)
                dispatch(setJobApplicationActiveStep(idx - 1));
            },
            submitButtonText: 'Next',
            submitButtonDisabled: GeneralValidator.validateRequiredFieldsArray(professionalInformation.EducationalInformation) ? true : false,
            submitCb: (idx) => {
                window.scrollTo(0, 0)
                dispatch(
                    postNurseOnboardingApplication({
                        agencyId,
                        applicationId: applicationId,
                        professionalInformation,
                        questionnaires,
                        healthInfoQuestions,
                        healthInformationSignature,
                        signatureInBase64,
                        step: 'Step-2',
                        uploadedDocumentsList,
                        activeIndex: idx,
                        applicationSteps: PROFESSIONAL_INFO_STEPS.length
                    })
                );
                dispatch(setJobApplicationActiveStep(idx + 1));
            },
            submitButtonDisabledInfoCb: () => {
                dispatch(setAllRequiredFieldsTouched({ name: 'educationalInformationFieldsTouched', value: true }));
            },
            linkTo: 'educational-info',
            isTitleClickAllow: true,
            onTitleClickCb: (index) => {
                dispatch(setAllRequiredFieldsTouched({ name: 'educationalInformationFieldsTouched', value: true }));
                if (!GeneralValidator.validateRequiredFieldsArray(professionalInformation.EducationalInformation)) {
                    dispatch(setJobApplicationActiveStep(index));
                }
            }
        },
        {
            title: 'Previous Employer Info',
            stepBodyComponent: (idx) => <PreviousEmployerInfo activeIndex={idx} />,
            discardCb: () => { },
            backButtonText: 'Back',
            prevCb: (idx) => {
                window.scrollTo(0, 0)
                dispatch(setJobApplicationActiveStep(idx - 1));
            },
            submitButtonText: 'Next',
            submitButtonDisabled: GeneralValidator.validateRequiredFieldsArray(professionalInformation.PreviousEmployerInfo) ? true : false,
            submitButtonDisabledInfoCb: () => {
                dispatch(setAllRequiredFieldsTouched({ name: 'previousEmployerInfoFieldsTouched', value: true }));
            },
            submitCb: (idx) => {
                window.scrollTo(0, 0)
                dispatch(
                    postNurseOnboardingApplication({
                        agencyId,
                        applicationId: applicationId,
                        professionalInformation,
                        questionnaires,
                        healthInfoQuestions,
                        healthInformationSignature,
                        signatureInBase64,
                        step: 'Step-3',
                        uploadedDocumentsList,
                        activeIndex: idx,
                        applicationSteps: PROFESSIONAL_INFO_STEPS.length
                    })
                );
                dispatch(setJobApplicationActiveStep(idx + 1));
            },
            linkTo: 'employer-info',
            isTitleClickAllow: true,
            onTitleClickCb: (index) => {
                dispatch(setAllRequiredFieldsTouched({ name: 'previousEmployerInfoFieldsTouched', value: true }));
                if (!GeneralValidator.validateRequiredFieldsArray(professionalInformation.PreviousEmployerInfo)) {
                    dispatch(setJobApplicationActiveStep(index));
                }
            }
        },
        {
            title: 'References',
            stepBodyComponent: (idx) => <ReferencesInfo activeIndex={idx} />,
            backButtonText: 'Back',
            prevCb: (idx) => {
                window.scrollTo(0, 0)
                dispatch(setJobApplicationActiveStep(idx - 1));
            },
            submitButtonText: 'Next',
            submitCb: (idx) => {
                window.scrollTo(0, 0)
                dispatch(
                    postNurseOnboardingApplication({
                        agencyId,
                        applicationId: applicationId,
                        professionalInformation,
                        questionnaires,
                        healthInfoQuestions,
                        healthInformationSignature,
                        signatureInBase64,
                        step: 'Step-4',
                        uploadedDocumentsList,
                        activeIndex: idx,
                        applicationSteps: PROFESSIONAL_INFO_STEPS.length
                    })
                );
                dispatch(setJobApplicationActiveStep(idx + 1));
            },
            submitButtonDisabled: GeneralValidator.validateRequiredFieldsArray(professionalInformation.ReferencesInfo) ? true : false,
            submitButtonDisabledInfoCb: () => {
                dispatch(setAllRequiredFieldsTouched({ name: 'ReferencesInfoFieldsTouched', value: true }));
            },
            linkTo: 'references',
            isTitleClickAllow: true,
            onTitleClickCb: (index) => {
                dispatch(setAllRequiredFieldsTouched({ name: 'ReferencesInfoFieldsTouched', value: true }));
                if (!GeneralValidator.validateRequiredFieldsArray(professionalInformation.ReferencesInfo)) {
                    dispatch(setJobApplicationActiveStep(index));
                }
            }
        },
        {
            title: 'Required Document',
            stepBodyComponent: (idx) => <RequiredDocument activeIndex={idx} applicationSteps={PROFESSIONAL_INFO_STEPS.length} />,
            linkTo: 'required-document',
            isTitleClickAllow: true,
            onTitleClickCb: (index) => {
                dispatch(setJobApplicationActiveStep(index));
            }
        },
        ...(role === "RN" || role === "LPN" ?
            [
                {
                    title: 'Nursing License',
                    stepBodyComponent: (idx) => <NursingLicense activeIndex={idx} />,
                    backButtonText: 'Back',
                    prevCb: (idx) => {
                        window.scrollTo(0, 0)
                        dispatch(setJobApplicationActiveStep(idx - 1));
                    },
                    submitButtonText: 'Next',
                    submitCb: (idx) => {
                        window.scrollTo(0, 0)
                        dispatch(
                            postNurseOnboardingApplication({
                                agencyId,
                                applicationId: applicationId,
                                professionalInformation,
                                questionnaires,
                                healthInfoQuestions,
                                healthInformationSignature,
                                signatureInBase64,
                                step: 'Step-6',
                                uploadedDocumentsList,
                                activeIndex: idx,
                                applicationSteps: PROFESSIONAL_INFO_STEPS.length
                            })
                        );
                    },
                    submitButtonDisabled: GeneralValidator.validateRequiredFieldsArray(professionalInformation.LicenseInformation) ? true : false,
                    submitButtonDisabledInfoCb: () => {
                        dispatch(setAllRequiredFieldsTouched({ name: 'LicenseInformationFieldsTouched', value: true }));
                    },
                    linkTo: 'nursing-license',
                    isTitleClickAllow: true,
                    onTitleClickCb: (index) => {
                        dispatch(setAllRequiredFieldsTouched({ name: 'LicenseInformationFieldsTouched', value: true }));
                        if (!GeneralValidator.validateRequiredFieldsArray(professionalInformation.LicenseInformation)) {
                            dispatch(setJobApplicationActiveStep(index));
                        }
                    }
                }]
            : [])
    ];

    const FINAL_RESULT_STEPS = [
        {
            title: 'Job Application Form',
            stepBodyComponent: (idx) => <span>Job Application</span>,
            backButtonText: 'Back',
            prevCb: () => window.scrollTo(0, 0),
            submitButtonText: 'Submit',
            submitCb: () => window.scrollTo(0, 0),
            linkTo: 'application-form'
        },
        {
            title: 'Background Check',
            stepBodyComponent: (idx) => <BackgroundCheck activeIndex={idx} applicationSteps={PROFESSIONAL_INFO_STEPS.length} />,
            linkTo: 'background-check'
        },
        ...(role === 'HHA'
            ? [
                {
                    title: 'Skill Assessment',
                    stepBodyComponent: (idx) => <SkillTest activeIndex={idx} />,
                    linkTo: 'skill-assessment'
                },
                {
                    title: 'Competency Checklist',
                    stepBodyComponent: (idx) => <SkillCheckList activeIndex={idx} />,
                    linkTo: 'competency-assessment'
                }
            ]
            : role !== 'ADMINISTRATOR' && role !== 'DON' && role !== 'QAPI' && role !== "HR" && role !== "DSP" && role !== "RECEPTIONIST" && role !== "MARKETINGMANAGER" && role !== 'CM'
                ? [
                    {
                        title: 'Competency Checklist',
                        stepBodyComponent: (idx) => <SkillCheckList activeIndex={idx} />,
                        linkTo: 'competency-assessment'
                    }
                ]
                : []),
        {
            title: 'Declarations',
            stepBodyComponent: (idx) => <Declarations activeIndex={idx} />,
            linkTo: 'declarations'
        },
        {
            title: 'Interview',
            stepBodyComponent: (idx) => <Interview activeIndex={idx} />,
            linkTo: 'interview'
        }
    ];

    return (
        <StepperNavigation
            containerClassName={'mt-4'}
            activeStep={jobApplicationActiveStep}
            className={'pt-0'}
            steps={jobApplicationFormType === JOB_APPLICATION_TYPE.Professional_Information ? PROFESSIONAL_INFO_STEPS : FINAL_RESULT_STEPS}
            isIndexAllowed={true}
            skipAutoNextStep={true}
            isNavigate={false}
        />
    );
};

export default JobApplication;
