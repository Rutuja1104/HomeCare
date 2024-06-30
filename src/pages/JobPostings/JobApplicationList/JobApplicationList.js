import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/button/Button';
import Container from '../../../components/container/Container';
import { VEC_ICON_NAME } from '../../../components/icon/constants';
import Icons from '../../../components/icon/Icon';
import JobApplicationModal from '../../../components/models/JobApplicationModal';
import { BUTTON_TYPE } from '../../../libs/constant';
import { getAllJobPostingByAgencyId, postApplyForJobApplication } from '../JobPostingSaga';
import { useParams } from 'react-router-dom';
import {
    componentKey,
    setAllRequiredFieldsTouched,
    setJobApplication,
    setJobApplicationDropdown,
    setOpenJobApplicationModal,
    setPaginationState,
    setSelectedJobApplication,
    setUploadedResume
} from '../JobPostingSlice';
import BadgeV2 from '../../../components/badge/BadgeV2';
import moment from 'moment';
import GeneralValidator, { generalValidator } from '../../../libs/utility/validators/GeneralValidator';
import Loadable from '../../../components/loadable/Loadable';
import { toast } from 'react-toastify';
import { setNonAuthLayoutHeader } from '../../../layouts/LayoutSlice';
import JobAppicationListTooltip from '../../../components/tooltip/JobAppicationListTooltip';
import RichGrid from '../../../components/richgrid/RichGrid';
import { ROW_SELECTION_OPTIONS } from '../../../components/pagination/constants';
import ViewJobPostingModal from '../../../components/models/ViewJobPostingModal';

function JobApplicationList() {
    const { agencyId } = useParams();
    const dispatch = useDispatch();

    const { uploadedResume } = useSelector((state) => state[componentKey]);

    const {
        loadingState,
        allJobsList,
        jobApplication,
        openJobApplicationModal,
        jobApplicationDropdown,
        allRequiredFieldsTouched,
        selectedJobApplication,
        PaginationState
    } = useSelector((state) => state[componentKey]);
    const [role, setRole] = useState([]);
    const [viewMore, setViewMore] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [copySuccess, setCopySuccess] = useState(false);
    const [copyIndex, setCopyIndex] = useState();



    useEffect(() => {
        if (agencyId) {
            dispatch(
                getAllJobPostingByAgencyId({
                    agencyId,
                    pageNumber: PaginationState.pageNumber,
                    limit: PaginationState.PageSize
                })
            );

            dispatch(setNonAuthLayoutHeader(`Job Postings`));
        }
    }, [agencyId]);

    useEffect(() => {
        dispatch(setUploadedResume({}));
    }, []);

    function containsSpecialChars(str) {
        var specialChars = /[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/;
        return specialChars.test(str);
    }

    const onChangeHandler = (event, rules) => {
        const { name, value, type } = event.target;
        
        if(name == "TelephoneNumber"){
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
                dispatch(setJobApplication({ [name]: { value:formattedValue, errors, rules } }));
            } else {
                dispatch(setJobApplication({ [name]: { value:formattedValue } }));
            }
        }else{
            let regex = /\d/;

            if ((regex.test(value) && type == 'text') || (type == 'text' && containsSpecialChars(value))) {
                return;
            }
    
            if (rules) {
                const errors = generalValidator.validate(value, rules);
                dispatch(setJobApplication({ [name]: { value, errors, rules } }));
            } else {
                dispatch(setJobApplication({ [name]: { value } }));
            }
        }
    };

    const showDataAsTooltip = (description, index) => {
        return (
            <>
                {description.slice(0, 55)}...
                <span id={'id' + index + 1} style={{ color: '#087D9E' }}>
                    {' '}
                    show more
                </span>
                <JobAppicationListTooltip id={'id' + index + 1} text={description} />
            </>
        );
    };

    const copyToClipBoard = async (copyMe) => {
        try {
            await navigator.clipboard.writeText(copyMe);
            setCopySuccess(true);
        } catch (err) {
            setCopySuccess(false);
        }
    };

    const onClickCopyJob = (index,data)=>{
        const dataId = data?.id;
        let url = `https://app.dev.allinoneemr.com/job-post/${agencyId}/post/${dataId}`;
        copyToClipBoard(url);
        setCopySuccess(!copySuccess);
        setCopyIndex(index);
        localStorage.setItem('selectedPost',JSON.stringify(data));
    }

    return (
        <Loadable loadingStates={loadingState.state} loadingMessage={loadingState.message}>
            <div className="displayFlexContainer">
                {allJobsList.map((data, index) => {
                    return (
                        <Container key={index} containerMainClassName="cardStyle">
                            <div>
                                <div className='copyIconPosition' onClick={()=>onClickCopyJob(index,data)} title={copySuccess && copyIndex===index ?'Copied to clipboard':'Copy Post'}><Icons iconName={VEC_ICON_NAME.COPY_ICON} /></div>
                                <div className="flexSpace">
                                    <div className="jobPostCardTitle">
                                        {data.title == 'string' ? 'New Agency' : data.title}
                                    </div>
                                    {data.jobType && <div className="jobPostCardType">{data.jobType}</div>}
                                </div>
                                <div className="flexSpace">
                                    <div className="positionRolelabelStyle">Position</div>
                                    <div className="positionRolelabelValueStyle">{data.status}</div>
                                </div>
                                <div className="flexSpace">
                                    <div className="positionRolelabelStyle">Role</div>
                                    <div className="positionRolelabelValueStyle">{data.role}</div>
                                </div>
                                {/* <div
                                    className="description"
                                    style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}
                                >
                                    <span>
                                        {data.description.length > 65
                                            ? showDataAsTooltip(data.description, index)
                                            : data.description}
                                    </span>
                                </div> */}
                                <div className="flexSpace">
                                    <div>
                                        {data.jobLocation && (
                                            <div>
                                                <Icons iconName={VEC_ICON_NAME.LOCATION_ICON_2} /> {data.jobLocation}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flexSpace">
                                    {data.agencyName && (
                                        <div className="description">
                                            <Icons iconName={VEC_ICON_NAME.BUILDING_ICON} /> {data.agencyName}
                                        </div>
                                    )}
                                    {data.fixedSalary ? (
                                        <div>
                                            <Icons iconName={VEC_ICON_NAME.DOLLAR_ICON} style={{ color: '#087D9E' }} />
                                            {data.fixedSalary}
                                        </div>
                                    ) : data.salaryRange ? (
                                        <div>
                                            <Icons iconName={VEC_ICON_NAME.DOLLAR_ICON} style={{ color: '#087D9E' }} />{' '}
                                            {data.salaryRange?.split('-')[0]}{' '}
                                            {data.salaryRange?.split('-')[1] ? 'to' : ''}{' '}
                                            {data.salaryRange?.split('-')[1]}
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </div>
                                <Button
                                    type="text"
                                    variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}
                                    className="jobPostCardButton"
                                    onClickCb={() => {
                                        setViewMore(true);
                                        setSelectedJob(data);
                                        // dispatch(setOpenJobApplicationModal(true));
                                        // dispatch(setSelectedJobApplication(data));
                                        // setRole(data?.role);
                                    }}
                                    disabled={data.status === "Fulfilled" ? true : false}
                                >
                                    View More
                                </Button>

                                {/* <Button
                                    type="text"
                                    variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}
                                    className="jobPostCardButton"
                                    onClickCb={() => {
                                        dispatch(setOpenJobApplicationModal(true));
                                        dispatch(setSelectedJobApplication(data));
                                        setRole(data?.role);
                                    }}
                                >
                                    Apply
                                </Button> */}
                                <div style={{ marginTop: '10px' }}>
                                    Posting date : {moment(data.created_at).format('LL')}
                                </div>
                            </div>
                        </Container>
                    );
                })}
                <ViewJobPostingModal
                    isOpen={viewMore}
                    toggle={() => setViewMore(!viewMore)}
                    data={selectedJob}
                    successButtonText="Apply"
                    isButton={true}
                    onSuccessCb={() => {
                        dispatch(setOpenJobApplicationModal(true));
                        setRole(selectedJob?.role);
                    }}
                />
                ;
                <JobApplicationModal
                    allRequiredFieldsTouched={allRequiredFieldsTouched}
                    jobApplicationFormData={jobApplication}
                    jobApplicationDropdown={jobApplicationDropdown}
                    isRole={role}
                    isOpen={openJobApplicationModal}
                    toggle={() => {
                        dispatch(setOpenJobApplicationModal(!openJobApplicationModal))
                        dispatch(setAllRequiredFieldsTouched(false))
                    }}
                    onSelectCb={(name, selectedOption) => {
                        dispatch(setJobApplicationDropdown({ name, selectedOption }));
                    }}
                    onChangeCb={onChangeHandler}
                    onSuccessCb={() => {
                        dispatch(setAllRequiredFieldsTouched(true));

                        let obj = { ...jobApplication, isOneYrExp: { ...jobApplication.isOneYrExp, rules: { required: false } }, homeCareExperience: { ...jobApplication.homeCareExperience, rules: { required: false } }, isvalidCNA: { ...jobApplication.isvalidCNA, rules: { required: false } } }


                        if (!GeneralValidator.validateRequiredFields(obj)) {
                            const data = {
                                firstName: jobApplication.FirstName?.value,
                                middleName: jobApplication.MiddleName?.value,
                                lastName: jobApplication.LastName?.value,
                                email: jobApplication.Email?.value,
                                phone: jobApplication.TelephoneNumber?.value.replace(/[-()]/g, ''),
                                gender: jobApplication.Gender.value,
                                yearofExperience: jobApplication.Experience?.value,
                                previousEmployerName: jobApplication.PreviousEmployerName.value,
                                role: selectedJob.role,
                                status: 'Pending',
                                applicationFormStatus: 'Received',
                                jobId: selectedJob.id,
                                agencyId: agencyId,
                                isLicense: jobApplication?.isLicense?.value == 'Yes' ? true : false,
                                validAge: jobApplication?.validAge?.value == 'Yes' ? true : false,
                                isvalidCNA: jobApplication?.isvalidCNA?.value == 'Yes' ? true : false,
                                isOneYrExp: jobApplication?.isOneYrExp?.value == 'Yes' ? true : false,
                                homeCareExperience: jobApplication?.homeCareExperience?.value,
                                staff_type: 'CS'
                            };

                            const formData = new FormData();
                            formData.append('file', uploadedResume[0]);
                            dispatch(postApplyForJobApplication({ data, file: uploadedResume, formData }));
                            setViewMore(false);
                        }
                    }}
                    onUploadFiles={(file) => {
                        dispatch(setUploadedResume(file));
                    }}
                />
            </div>
            <div>
                <RichGrid
                    data={allJobsList}
                    paginationProps={{
                        page: PaginationState.PageNumber,
                        take: PaginationState.PageSize,
                        takeOptions: ROW_SELECTION_OPTIONS,
                        total: PaginationState.totalJobPost,
                        onChangeTakeCb: (newTake) => {
                            dispatch(
                                setPaginationState({
                                    ...PaginationState,
                                    PageNumber: 1,
                                    PageSize: newTake
                                })
                            );

                            dispatch(
                                getAllJobPostingByAgencyId({
                                    agencyId,
                                    pageNumber: PaginationState.pageNumber,
                                    limit: newTake
                                })
                            );
                        },
                        onChange: (page) => {
                            dispatch(
                                getAllJobPostingByAgencyId({
                                    agencyId,
                                    pageNumber: page,
                                    limit: PaginationState.PageSize
                                })
                            );
                            dispatch(setPaginationState({ PageNumber: page }));
                        }
                    }}
                />
            </div>
        </Loadable>
    );
}

export default JobApplicationList;
