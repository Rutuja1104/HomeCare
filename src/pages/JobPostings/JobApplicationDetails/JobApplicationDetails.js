import React, { useEffect } from 'react';

import Loadable from '../../../components/loadable/Loadable';
import StepperNavigation from '../../../components/stepperNavigation/StepperNavigation';
import General from '../../../libs/utility/General';

import { componentKey, setActiveJobApplicationStep, setS3UploadedDocumentList } from './JobApplicationDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
    getSubmittedChecklist,
    getUserAssessmentDetails,
    getUserDetailsByIdForAgencyAdmin,
    getUserStatusByUserId,
    putValidateUserByAgencyAdmin
} from './JobApplicationDetailsSaga';
import { useParams } from 'react-router-dom';
import JobApplicationForm from './JobApplicationForm/JobApplicationForm';
import BackgroundCheck from './BackgroundCheck/BackgroundCheck';
import SkillAssessment from './SkillAssessment/SkillAssessment';
import SkillChecklist from './SkillChecklist/SkillChecklist';
import Declarations from './Declarations/Declarations';
import ScheduleInterview from './ScheduleInterview/ScheduleInterview';
import { setHeaderLabel } from '../../../layouts/LayoutSlice';
import ReferenceCheckForm from './ReferenceCheckForm';
import OrientationChecklistFirst from './OrientationChecklistFirst';
import ConflictsOfInterest from './ConflictsOfInterest';
import OrientationChecklistSecond from './OrientationChecklistSecond';

const JobApplicationDetails = () => {
    const dispatch = useDispatch();
    const { nurseId } = useParams();
    const agencyId = General.getLocalStorageData('agencyId');
    const token = General.getLocalStorageData('token');

    const {
        loadingState,
        activeJobApplicationStep,
        jobApplicationDocumentsList,
        userStatus,
        jobApplicationCompleteDetails
    } = useSelector((state) => state[componentKey]);

    const role = jobApplicationCompleteDetails?.role
    useEffect(() => {
        if (nurseId) {
            dispatch(getUserDetailsByIdForAgencyAdmin(nurseId));
            if (!["ADMINISTRATOR", "DON", "QAPI", "HR", "DSP", "RECEPTIONIST", "MARKETINGMANAGER", "CM"].includes(jobApplicationCompleteDetails?.role)) {
                dispatch(getSubmittedChecklist({ agencyId, role, nurseId, token }));
            }
            dispatch(getUserStatusByUserId(nurseId));
        }
    }, [nurseId, role]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [activeJobApplicationStep])

    useEffect(() => {
        if (jobApplicationCompleteDetails?.role == 'HHA') {
            dispatch(getUserAssessmentDetails(nurseId));
        }
    }, [jobApplicationCompleteDetails?.role]);

    useEffect(() => {
        if (userStatus) {
            /* eslint-disable */
            switch (userStatus) {
                case 'validating-1':
                    dispatch(setActiveJobApplicationStep(1))
                    break;
                case 'validating-2':
                    dispatch(setActiveJobApplicationStep(2))
                    break;
                case 'validating-3':
                    if (["HHA","HR"].includes(jobApplicationCompleteDetails?.role)) {
                        dispatch(setActiveJobApplicationStep(3))
                    } else {
                        dispatch(setActiveJobApplicationStep(2))
                    }
                    break;
                case 'validating-4':
                    if (["HHA","HR"].includes(jobApplicationCompleteDetails?.role)) {
                        dispatch(setActiveJobApplicationStep(4))
                    } else if (["RN"].includes(jobApplicationCompleteDetails?.role)){
                        dispatch(setActiveJobApplicationStep(2))
                    }else{
                        dispatch(setActiveJobApplicationStep(3))
                    }
                    break;
                case 'validating-5':
                    if (["HHA","HR"].includes(jobApplicationCompleteDetails?.role)) {
                        dispatch(setActiveJobApplicationStep(5))
                    } else if (["RN"].includes(jobApplicationCompleteDetails?.role)){
                        dispatch(setActiveJobApplicationStep(3))
                    }else{
                        dispatch(setActiveJobApplicationStep(4))
                    }
                    break;
                case 'validating-6':
                    if (["ADMINISTRATOR", "DON", "QAPI", "DSP", "RECEPTIONIST", "MARKETINGMANAGER", "CM"].includes(jobApplicationCompleteDetails?.role)) {
                            dispatch(setActiveJobApplicationStep(5))
                        } else if (["HR"].includes(jobApplicationCompleteDetails?.role)){
                        dispatch(setActiveJobApplicationStep(6))
                    }
                    else{
                        dispatch(setActiveJobApplicationStep(3))
                    }
                    break;
                case 'validating-7':
                    if (["ADMINISTRATOR", "DON", "QAPI", "DSP", "RECEPTIONIST", "MARKETINGMANAGER", "CM"].includes(jobApplicationCompleteDetails?.role)) {
                        dispatch(setActiveJobApplicationStep(6))
                    } else if (["HR"].includes(jobApplicationCompleteDetails?.role)){
                        dispatch(setActiveJobApplicationStep(7))
                    }else{
                        dispatch(setActiveJobApplicationStep(5))
                    }
                    break;
                case 'validating-8':
                    dispatch(setActiveJobApplicationStep(3))
                    break;
                case 'validating-9':
                    if (["ADMINISTRATOR", "DON", "QAPI", "DSP", "RECEPTIONIST", "MARKETINGMANAGER", "CM"].includes(jobApplicationCompleteDetails?.role)) {
                        dispatch(setActiveJobApplicationStep(5))
                    } else if (["HR"].includes(jobApplicationCompleteDetails?.role)){
                        dispatch(setActiveJobApplicationStep(6))
                    }else{
                        dispatch(setActiveJobApplicationStep(4))
                    }
                    break;
                case 'validating-10':
                    if (["HR"].includes(jobApplicationCompleteDetails?.role)) {
                        dispatch(setActiveJobApplicationStep(7))
                    } else if(["ADMINISTRATOR", "QAPI", "DSP", "RECEPTIONIST", "MARKETINGMANAGER", "CM","HHA"].includes(jobApplicationCompleteDetails?.role)) {
                        dispatch(setActiveJobApplicationStep(6))
                    }else if(["MSW","RN","PT","LPTA","ST","OT"].includes(jobApplicationCompleteDetails?.role)){
                        dispatch(setActiveJobApplicationStep(5))
                    }else{
                        dispatch(setActiveJobApplicationStep(4))
                    }
                        break;
                case 'Scheduled':
                    if (["HR"].includes(jobApplicationCompleteDetails?.role)) {
                        dispatch(setActiveJobApplicationStep(7))
                    } else if(["ADMINISTRATOR", "QAPI", "DSP", "RECEPTIONIST", "MARKETINGMANAGER", "CM","HHA"].includes(jobApplicationCompleteDetails?.role)) {
                        dispatch(setActiveJobApplicationStep(6))
                    }else if(["MSW","RN","PT","LPTA","ST","OT"].includes(jobApplicationCompleteDetails?.role)){
                        dispatch(setActiveJobApplicationStep(5))
                    }else{
                        dispatch(setActiveJobApplicationStep(4))
                    }
                        break;
                case 'Fail':
                    if (["HR"].includes(jobApplicationCompleteDetails?.role)) {
                        dispatch(setActiveJobApplicationStep(7))
                    } else if(["ADMINISTRATOR", "QAPI", "DSP", "RECEPTIONIST", "MARKETINGMANAGER", "CM","HHA"].includes(jobApplicationCompleteDetails?.role)) {
                        dispatch(setActiveJobApplicationStep(6))
                    }else if(["MSW","RN","PT","LPTA","ST","OT"].includes(jobApplicationCompleteDetails?.role)){
                        dispatch(setActiveJobApplicationStep(5))
                    }else{
                        dispatch(setActiveJobApplicationStep(4))
                    }
                        break;
                case 'Active':
                    if (["HR"].includes(jobApplicationCompleteDetails?.role)) {
                        dispatch(setActiveJobApplicationStep(7))
                    } else if(["ADMINISTRATOR", "QAPI", "DSP", "RECEPTIONIST", "MARKETINGMANAGER", "CM","HHA"].includes(jobApplicationCompleteDetails?.role)) {
                        dispatch(setActiveJobApplicationStep(6))
                    }else if(["MSW","RN","PT","LPTA","ST","OT"].includes(jobApplicationCompleteDetails?.role)){
                        dispatch(setActiveJobApplicationStep(5))
                    }else{
                        dispatch(setActiveJobApplicationStep(4))
                    }
                        break;
                default:
                    dispatch(setActiveJobApplicationStep(0));
            }
            /* eslint-enable */
        }
    }, [userStatus, jobApplicationCompleteDetails.role])

    useEffect(() => {
        dispatch(setS3UploadedDocumentList(General.groupDataByCategory(jobApplicationDocumentsList)));
        dispatch(setHeaderLabel('Job Application Details'));
    }, [jobApplicationDocumentsList]);


    const FINAL_RESULT_STEPS = [
        {
            title: 'Job Application Form',
            stepBodyComponent: (idx) => <JobApplicationForm index={idx} />,
            submitButtonText: 'Approve & Next',
            submitCb: (activeIndex) => {
                dispatch(putValidateUserByAgencyAdmin({ nurseId, data: { onboardingStatus: 'validating-1' }, activeIndex: activeIndex + 1 }));
                dispatch(setActiveJobApplicationStep(activeIndex + 1));
            }
        },
        (jobApplicationCompleteDetails?.role === 'ADMINISTRATOR'||jobApplicationCompleteDetails?.role==='QAPI'||jobApplicationCompleteDetails?.role==='RECEPTIONIST'||jobApplicationCompleteDetails?.role==='HR'||jobApplicationCompleteDetails?.role==='DSP'||jobApplicationCompleteDetails?.role==="MarketingManager"||jobApplicationCompleteDetails?.role==='CM')?{
            title: 'Orientation Checklist 1',
            stepBodyComponent: (idx) =><OrientationChecklistFirst index={idx}/>,
            backButtonText: 'Back',
            prevCb: (activeIndex) => {
                dispatch(setActiveJobApplicationStep(activeIndex - 1));
            },
            submitButtonText: 'Approve & Next',
            submitCb: (activeIndex) => {
                dispatch(putValidateUserByAgencyAdmin({ nurseId, data: { onboardingStatus: 'validating-2' }, activeIndex: activeIndex + 1 }));
                dispatch(setActiveJobApplicationStep(activeIndex + 1));
            } 
        }:null,
        (jobApplicationCompleteDetails?.role  === 'HR')?{
            title: 'Reference Check',
            stepBodyComponent: (idx) =><ReferenceCheckForm index={idx}/>,
            backButtonText: 'Back',
            prevCb: (activeIndex) => {
                dispatch(setActiveJobApplicationStep(activeIndex - 1));
            },
            submitButtonText: 'Approve & Next',
            submitCb: (activeIndex) => {
                dispatch(putValidateUserByAgencyAdmin({ nurseId, data: { onboardingStatus: 'validating-3' }, activeIndex: activeIndex + 1 }));
                dispatch(setActiveJobApplicationStep(activeIndex + 1));
            } 
        }:null,
        {
            title: 'Conflict Of Interest',
            stepBodyComponent:(idx) => <ConflictsOfInterest index={idx}/>,
            backButtonText: 'Back',
            prevCb: (activeIndex) => {
                dispatch(setActiveJobApplicationStep(activeIndex - 1));
            },
            submitButtonText: 'Approve & Next',
            submitCb: (activeIndex) => {
                dispatch(putValidateUserByAgencyAdmin({ nurseId, data: { onboardingStatus: 'validating-4' }, activeIndex: activeIndex + 1 }));
                dispatch(setActiveJobApplicationStep(activeIndex + 1));
            } 
        },
        (jobApplicationCompleteDetails?.role === 'ADMINISTRATOR'||jobApplicationCompleteDetails?.role==='QAPI'||jobApplicationCompleteDetails?.role==='RECEPTIONIST'||jobApplicationCompleteDetails?.role==='HR'||jobApplicationCompleteDetails?.role==='DSP'||jobApplicationCompleteDetails?.role==="MarketingManager"||jobApplicationCompleteDetails?.role==='CM')?{
            title: 'Orientation Checklist 2',
            stepBodyComponent:(idx) => <OrientationChecklistSecond index={idx}/>,
            backButtonText: 'Back',
            prevCb: (activeIndex) => {
                dispatch(setActiveJobApplicationStep(activeIndex - 1));
            },
            submitButtonText: 'Approve & Next',
            submitCb: (activeIndex) => {
                dispatch(putValidateUserByAgencyAdmin({ nurseId, data: { onboardingStatus: 'validating-5' }, activeIndex: activeIndex + 1 }));
                dispatch(setActiveJobApplicationStep(activeIndex + 1));
            } 
        }:null,
        {
            title: 'Background Check',
            stepBodyComponent: (idx) => <BackgroundCheck index={idx} />,
            backButtonText: 'Back',
            prevCb: (activeIndex) => {
                dispatch(setActiveJobApplicationStep(activeIndex - 1));
            },
            submitButtonText: 'Approve & Next',
            submitCb: (activeIndex) => {
                dispatch(
                    putValidateUserByAgencyAdmin({ nurseId, data: { onboardingStatus: 'validating-6' }, activeIndex: activeIndex + 1 })
                );
                dispatch(setActiveJobApplicationStep(activeIndex + 1));
            }
        },
        ...(jobApplicationCompleteDetails?.role == 'HHA'
            ? [
                {
                    title: 'Skill Assessment',
                    stepBodyComponent: (idx) => <SkillAssessment index={idx} />,
                    backButtonText: 'Back',
                    prevCb: (activeIndex) => {
                        dispatch(setActiveJobApplicationStep(activeIndex - 1));
                    },
                    submitButtonText: 'Approve & Next',
                    submitCb: (activeIndex) => {
                        dispatch(
                            putValidateUserByAgencyAdmin({
                                nurseId,
                                data: { onboardingStatus: 'validating-7' },
                                activeIndex: activeIndex + 1
                            })
                        );
                    }
                },
                {
                    title: 'Competency Checklist',
                    stepBodyComponent:(idx)=> <SkillChecklist index={idx}/>,
                    // backButtonText: 'Back',
                    // prevCb: (activeIndex) => {
                    //     dispatch(setActiveJobApplicationStep(activeIndex - 1));
                    // },
                    // submitButtonText: 'Approve & Next',
                    // submitCb: (activeIndex) => {
                    //     dispatch(
                    //         putValidateUserByAgencyAdmin({
                    //             nurseId,
                    //             data: { onboardingStatus: 'validating-8' },
                    //             activeIndex: activeIndex + 1
                    //         })
                    //     );
                    // }
                }
            ]
            : ["ADMINISTRATOR", "DON", "QAPI", "HR", "DSP", "RECEPTIONIST", "MARKETINGMANAGER", "CM"].includes(jobApplicationCompleteDetails?.role)
                ? []
                : [
                    {
                        title: 'Competency Checklist',
                        stepBodyComponent:(idx)=> <SkillChecklist index={idx} />,
                        // backButtonText: 'Back',
                        // prevCb: (activeIndex) => {
                        //     dispatch(setActiveJobApplicationStep(activeIndex - 1));
                        // },
                        // submitButtonText: 'Approve & Next',
                        // submitCb: (activeIndex) => {
                        //     dispatch(
                        //         putValidateUserByAgencyAdmin({
                        //             nurseId,
                        //             data: { onboardingStatus: 'validating-9' },
                        //             activeIndex: activeIndex + 1
                        //         })
                        //     );
                        // }
                    }
                ]),
        {
            title: 'Declarations',
            stepBodyComponent: (idx) => <Declarations index={idx} />,
            backButtonText: 'Back',
            prevCb: (activeIndex) => {
                dispatch(setActiveJobApplicationStep(activeIndex - 1));
            },
            submitButtonText: 'Approve & Next',
            submitCb: (activeIndex) => {
                dispatch(
                    putValidateUserByAgencyAdmin({
                        nurseId,
                        data: { onboardingStatus: 'validating-10' },
                        activeIndex: activeIndex + 1
                    })
                );
            }
        },
        {
            title: 'Interview',
            stepBodyComponent: (idx) => <ScheduleInterview index={idx} />,
            backButtonText: 'Back',
            prevCb: (activeIndex) => {
                dispatch(setActiveJobApplicationStep(activeIndex - 1));
            }
        }
    ].filter(step => step !== null);

    return (
        <Loadable loadingStates={loadingState.state} loadingMessage={loadingState.message}>
            <StepperNavigation
                activeStep={activeJobApplicationStep}
                containerClassName={'mt-4'}
                className={'pt-0'}
                steps={FINAL_RESULT_STEPS}
                skipAutoNextStep={true}
                isIndexAllowed={true}
            />
        </Loadable>
    );
};

export default JobApplicationDetails;
