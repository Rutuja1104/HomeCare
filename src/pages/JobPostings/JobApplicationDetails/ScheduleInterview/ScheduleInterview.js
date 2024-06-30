import React, { useEffect, useState } from 'react';
import ProgressStatus from '../../../../components/progressStatus/ProgressStatus';
import ScheduleInterviewModel from '../../../../components/models/ScheduleInterview';
import { useDispatch, useSelector } from 'react-redux';
import {
    componentKey,
    setInterviewStatus,
    setNavigateToNewPage,
    setScheduleInterview,
    setScheduleInterviewFieldsTouched,
    setShowScheduleInterviewModel,
    setShowUpdateInterviewStatusModel,
    setUserStatus
} from '../JobApplicationDetailsSlice';
import GeneralValidator, { generalValidator } from '../../../../libs/utility/validators/GeneralValidator';
import {
    postScheduleUserInterview,
    putValidateUserByAgencyAdmin,
    getInterviewScheduledDetails
} from '../JobApplicationDetailsSaga';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmationModal from '../../../../components/models/ConfirmationModal';
import ImageWithDescription from '../../../../components/ImageWithDescription/ImageWithDescription';
import { JOB_POSTING, STAFF_MANAGEMENT_ROUTES } from '../../../../routes/constants';
import moment from 'moment';
import General from '../../../../libs/utility/General';
import { setAutoCompleteAddressFields } from '../../../PatientManagement/referral-intake/PatientManagementSlice';

const ScheduleInterview = () => {
    const navigate = useNavigate();
    const [showStartEndError, setShowStartEndError] = useState('');
    const dispatch = useDispatch();
    const { nurseId } = useParams();
    const [convertSheduledDateInLocal,setConvertSheduledDateInLocal]=useState(false);
    const {
        showScheduleInterviewModel,
        scheduleInterview,
        MeetingLink,
        interviewStatus,
        showUpdateInterviewStatusModel,
        userStatus,
        navigateToNewPage,
        interviewScheduledDetails,
        jobApplicationCompleteDetails
    } = useSelector((state) => state[componentKey]);

    const activitiesData = [
        {
            info: 'Document',
            time: 'Documents approved',
            active: true
        },
        {
            info: 'Interview',
            time:
                userStatus?.toLowerCase() === 'scheduled'
                    ? 'Interview has been scheduled'
                    : 'Please schedule interview',
            isEditable: false,
            active: (userStatus?.toLowerCase() === 'scheduled' || userStatus?.toLowerCase() === 'fail' || userStatus?.toLowerCase() === 'Active') ? true : false
        },
        {
            info:
                userStatus?.toLowerCase() === 'scheduled'
                    ? 'Onboard'
                    : userStatus?.toLowerCase() === 'Active'
                        ? 'Approved'
                        : userStatus?.toLowerCase() === 'fail'
                            ? 'Failed'
                            : 'Onboard',
            time:
                userStatus?.toLowerCase() === 'scheduled'
                    ? 'Do you want to onboard ?'
                    : userStatus?.toLowerCase() === 'Active'
                        ? 'Your application has been approved'
                        : userStatus?.toLowerCase() === 'fail'
                            ? 'Application has been failed'
                            : 'Do you want to onboard ?',
            active: userStatus?.toLowerCase() === 'Active' ? true : userStatus?.toLowerCase() === 'fail' ? true : false,
            isEditable: (convertSheduledDateInLocal ? userStatus?.toLowerCase() === 'scheduled' && convertSheduledDateInLocal : false)
        }
    ];
   
    useEffect(() => {
        if(interviewScheduledDetails.date){
            const interviewDate = moment.utc(interviewScheduledDetails.date).format("MM-DD-YYYY")
            const currentDateTime =moment().format("MM-DD-YYYY");
            if(currentDateTime >= interviewDate){
                setConvertSheduledDateInLocal(true)            }
        }
    }, [interviewScheduledDetails.date]);

    useEffect(() => {
        let agencyId = General.getLocalStorageData('agencyId');
        dispatch(getInterviewScheduledDetails({ agencyId, nurseId }));
    }, []);

    useEffect(() => {
        if (navigateToNewPage) {
            if (userStatus == 'Active') {
                navigate(`/${JOB_POSTING.JOBS}/${JOB_POSTING.CHILD_ROUTS.JOB_APPLICATIONS}`);
            }
        }
    }, [navigateToNewPage]);

    const onChangeHandler = (event, rules) => {
        const { name, value } = event.target;
        if(name=='PhoneNumber'){

            const numericValue = value.replace(/\D/g, '');
    
            let formattedValue = '';
            if (numericValue.length > 0) {
                formattedValue += `(${numericValue.slice(0, 3)}`;
            }
            if (numericValue.length > 3) {
                formattedValue += `)-${numericValue.slice(3, 6)}`;
            }
            if (numericValue.length > 6) {
                formattedValue += `-${numericValue.slice(6, 10)}`;
            }
            if (rules) {
                const errors = generalValidator.validate(numericValue, rules);
                dispatch(setScheduleInterview({ [name]: { value:formattedValue, errors, rules } }));
            } else {
                dispatch(setScheduleInterview({ [name]: { value:formattedValue } }));
            }
        }
        else{
            if (rules) {
                const errors = generalValidator.validate(value, rules);
                dispatch(setScheduleInterview({ [name]: { value, errors, rules } }));
            } else {
                dispatch(setScheduleInterview({ [name]: { value } }));
            }
        }

    };

    function convertDateFormat(inputDate) {
        const parts = inputDate.split('/');
        const month = parts[0].padStart(2, '0'); // Ensure month is two digits (padded with zero if necessary)
        const day = parts[1].padStart(2, '0'); // Ensure day is two digits (padded with zero if necessary)
        const year = parts[2];

        return `${year}-${month}-${day}`;
    }

    const showOnboardCancelButton = () => {
        if (interviewScheduledDetails.date) {
            const currentDateTime = new Date();
            const inputDateTimeObj = new Date(interviewScheduledDetails.date);
            return currentDateTime > inputDateTimeObj;
        }
        return false;
    };

    return (
        <div className="progress-container">
            <div className="inprogress-block ">
                <div className="progress-steps interview-in-progress mt-0 me-3">
                    <ProgressStatus
                        isEditable={true}
                        activities={activitiesData}
                        onClickCrossIcon={() => {
                            dispatch(setInterviewStatus('Fail'));
                            dispatch(setShowUpdateInterviewStatusModel(true));
                        }}
                        onClickCorrectIcon={() => {
                            dispatch(setInterviewStatus('Active'));
                            dispatch(setShowUpdateInterviewStatusModel(true));
                        }}
                        showOnboardCancelButton={showOnboardCancelButton}
                    />
                </div>
            </div>

            {userStatus?.toLowerCase() == 'scheduled' ? (
                <ImageWithDescription
                    showImage={false}
                    content={
                        interviewScheduledDetails.date
                            ? `Candidate interview has been scheduled At ${moment
                                .utc(interviewScheduledDetails.date)
                                .format('LL')} Interview duration  ${interviewScheduledDetails.duration}`
                            : ''
                    }
                    buttonTitle={
                        interviewScheduledDetails.addressId
                            ? ''
                            : interviewScheduledDetails.meetingLink
                                ? 'Meeting Link'
                                : ''
                    }
                    onClickCb={() => {
                        window.open(`${interviewScheduledDetails.meetingLink}`, '_blank');
                    }}
                >
                    {interviewScheduledDetails.addressId ? (
                        <div
                            style={{
                                width: '50%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                textAlign: 'start',
                                fontWeight: '700',
                                fontSize: '20px',
                                color: 'var(--grey-60, var(--grey-60, #8F8F8F))'
                            }}
                        >
                            <div>
                                <div>Interviewer name :</div>
                                <div>Interviewer phone number :</div>
                                <div>Address Line 1 :</div>
                                <div>AddressLine 2 :</div>
                                <div>State :</div>
                                <div>Country:</div>
                                <div>ZIP Code:</div>
                            </div>
                            <div>
                                <div>{interviewScheduledDetails?.interviewerName || '-'}</div>
                                <div>{interviewScheduledDetails?.interviewerPhoneNumber || '-'}</div>
                                <div>{interviewScheduledDetails?.address?.addressLine1 || '-'}</div>
                                <div>{interviewScheduledDetails?.address?.addressLine2 || '-'}</div>
                                <div>{interviewScheduledDetails?.address?.state || '-'}</div>
                                <div>{interviewScheduledDetails?.address?.country || '-'}</div>
                                <div>{interviewScheduledDetails?.address?.pinCode || '-'}</div>
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                </ImageWithDescription>
            ) : (
                <ImageWithDescription
                    onClickCb={() => dispatch(setShowScheduleInterviewModel(true))}
                    buttonTitle="Schedule Interview"
                    buttonVisibility={userStatus?.toLowerCase() === 'fail'? true:false}
                />
            )}
            <ScheduleInterviewModel
                interviewDetails={scheduleInterview}
                MeetingLink={MeetingLink}
                isOpen={showScheduleInterviewModel}
                toggle={() => dispatch(setShowScheduleInterviewModel(!showScheduleInterviewModel))}
                onChangeCb={onChangeHandler}
                onSuccessCb={() => {
                    dispatch(setScheduleInterviewFieldsTouched(true));
                    dispatch(setNavigateToNewPage(false));

                    if (
                        scheduleInterview?.ScheduleDate?.value &&
                        scheduleInterview?.Duration?.value &&
                        scheduleInterview?.WayOfInterview?.value &&
                        General.getLocalStorageData('agencyId')
                    ) {
                        let data = {
                            status: 'Scheduled',
                            date: `${convertDateFormat(scheduleInterview?.ScheduleDate?.value)}`,
                            nurseId: nurseId,
                            wayOfInterview: scheduleInterview?.WayOfInterview?.value,
                            agencyId: General.getLocalStorageData('agencyId'),
                            interviewerName: scheduleInterview?.InterviewerName.value,
                            interviewerPhoneNumber: scheduleInterview?.PhoneNumber.value,
                            duration: scheduleInterview?.Duration.value
                        };

                        if (scheduleInterview?.WayOfInterview?.value === 'Online') {
                            let additionalDetails = { meetingLink: scheduleInterview?.MeetingLink?.value };
                            data = { ...data, ...additionalDetails };
                        } else if (scheduleInterview?.WayOfInterview?.value === 'In-person') {
                            let additionalDetails = {
                                address: {
                                    addressLine1: scheduleInterview?.addressLine1?.value,
                                    addressLine2: scheduleInterview?.addressLine2?.value,
                                    city: scheduleInterview?.city?.value,
                                    state: scheduleInterview?.state?.value,
                                    country: scheduleInterview?.country?.value,
                                    pinCode: scheduleInterview?.pinCode?.value
                                }
                            };
                            data = { ...data, ...additionalDetails };
                        }

                        if (
                            (scheduleInterview?.WayOfInterview?.value === 'Online' &&
                                scheduleInterview?.MeetingLink?.value &&
                                scheduleInterview?.InterviewerName &&
                                scheduleInterview?.PhoneNumber) ||
                            (scheduleInterview?.WayOfInterview?.value === 'In-person' &&
                                scheduleInterview?.addressLine1?.value &&
                                scheduleInterview?.city?.value &&
                                scheduleInterview?.WayOfInterview?.value &&
                                scheduleInterview?.country?.value &&
                                scheduleInterview?.pinCode?.value &&
                                scheduleInterview?.state?.value &&
                                scheduleInterview?.InterviewerName &&
                                scheduleInterview?.PhoneNumber)
                        ) {
                            dispatch(setUserStatus('Scheduled'));
                            dispatch(postScheduleUserInterview({ data, nurseId, agencyId: General.getLocalStorageData('agencyId') }));

                            let activeIndex;

                            if (["HR"].includes(jobApplicationCompleteDetails?.role)) {
                                activeIndex = 7;
                            } else if(["ADMINISTRATOR", "DON", "QAPI", "DSP", "RECEPTIONIST", "MARKETINGMANAGER", "CM"].includes(jobApplicationCompleteDetails?.role)) {
                                activeIndex = 6;
                            }else{
                                activeIndex = 5;
                            }
                  

                            dispatch(
                                putValidateUserByAgencyAdmin({
                                    nurseId,
                                    data: { onboardingStatus: 'Scheduled' },
                                    activeIndex: activeIndex
                                })
                            );
                        }
                    }

                }}
                showStartEndError={showStartEndError}
            />

            <ConfirmationModal
                isOpen={showUpdateInterviewStatusModel}
                successButtonText={`${interviewStatus == 'Active' ? 'Onboard' : 'Fail'} `}
                bodyContent={`${interviewStatus == 'Active' ? 'Are you sure you want to onboard this candidate!' : 'Are you sure you want to fail this candidate!'} `}
                toggle={() => dispatch(setShowUpdateInterviewStatusModel(!showUpdateInterviewStatusModel))}
                onSuccessCb={() => {

                    dispatch(setNavigateToNewPage(false));

                    let activeIndex;

                    if (["HR"].includes(jobApplicationCompleteDetails?.role)) {
                        activeIndex = 7;
                    } else if(["ADMINISTRATOR", "DON", "QAPI", "DSP", "RECEPTIONIST", "MARKETINGMANAGER", "CM"].includes(jobApplicationCompleteDetails?.role)) {
                        activeIndex = 6;
                    }else{
                        activeIndex = 5;
                    }
                    if (interviewStatus === 'Active') {
                        dispatch(setUserStatus('Active'));
                        dispatch(
                            putValidateUserByAgencyAdmin({
                                nurseId,
                                data: { onboardingStatus: 'Active' },
                                activeIndex: activeIndex
                            })
                        );
                    } else {
                        dispatch(setUserStatus('Fail'));
                        dispatch(
                            putValidateUserByAgencyAdmin({
                                nurseId,
                                data: { onboardingStatus: 'Fail' },
                                activeIndex: activeIndex
                            })
                        );
                        navigate(`/jobs/job-applications`);
                    }
                }}
            />
        </div>
    );
};

export default ScheduleInterview;
