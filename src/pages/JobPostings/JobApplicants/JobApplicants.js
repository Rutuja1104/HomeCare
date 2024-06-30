import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setHeaderLabel } from '../../../layouts/LayoutSlice';
import {
    componentKey,
    setApplicationDetails,
    setNameToSearch,
    setPaginationState,
    setReceivedDate,
    setSelectedJobApplicationList,
    setShowApplicationDetailsModal,
    setShowPreviewOfPDF
} from '../JobPostingSlice';
import { LABEL_WEIGHT } from '../../../components/label/labelV2/constants';
import { getAllJobApplications, postSendEmailInvitation, putValidateUser } from '../JobPostingSaga';

import Loadable from '../../../components/loadable/Loadable';
import RichGrid from '../../../components/richgrid/RichGrid';
import Label from '../../../components/label/labelV2/Label';
import General from '../../../libs/utility/General';
import BadgeV2 from '../../../components/badge/BadgeV2';
import UncontrolledDropdownV2 from '../../../components/uncontrolledDropdown/UncontrolledDropdown';
import ApplicationModal from '../../../components/models/ApplicationModal';
import { useNavigate } from 'react-router';
import { JOB_POSTING } from '../../../routes/constants';
import { ROW_SELECTION_OPTIONS } from '../../../components/pagination/constants';
import DatePicker from '../../../components/datePicker/DatePicker';
// import { setReceivedDate } from '../JobApplicationDetails/JobApplicationDetailsSlice';
import FilterButton from '../../../components/filterButton/FilterButton';
import FilterDrawer from './Filters';
import moment from 'moment';
import Button from '../../../components/button/Button';
import TextInput from '../../../components/input/textinput/TextInput';
import BasicModal from '../../../components/modal/Modal';
import AdminDataService from '../../../services/AdminDataService';
import { BUTTON_TYPE } from '../../../libs/constant';
import download from 'downloadjs';
import { toast } from 'react-toastify';
import useFlexCleanup from '../../../store/FlexCleanup';

const JobApplicants = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        loadingState,
        jobApplicationList,
        selectedJobApplicationList,
        applicationDetails,
        showApplicationDetailsModal,
        PaginationState,
        receivedDate,
        nameToSearch,
        showPreviewOfPDF
    } = useSelector((state) => state[componentKey]);

    const token = General.getLocalStorageData('token');
    const agencyId = General.getLocalStorageData('agencyId');
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    const [downloadPdfData, setDownloadPdfData] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [pdfTitle, setPdfTitle] = useState('');
    useFlexCleanup(componentKey)

    useEffect(() => {
        dispatch(setHeaderLabel('Job Application List'));
        dispatch(
            getAllJobApplications({
                agencyId,
                token,
                pageNumber: PaginationState.pageNumber,
                limit: PaginationState?.PageSize,
                status: PaginationState?.status
            })
        );
        dispatch(setReceivedDate(''));
        dispatch(setNameToSearch(''));
    }, []);

    useEffect(() => {
        let delayedApiCall;
        delayedApiCall = setTimeout(() => {
            dispatch(setPaginationState({ PageNumber: 1 }));
            dispatch(
                getAllJobApplications({
                    agencyId,
                    token,
                    pageNumber: PaginationState.pageNumber,
                    limit: PaginationState?.PageSize,
                    receivedDate: receivedDate,
                    status: PaginationState?.status,
                    name: nameToSearch
                })
            );
        }, 300);

        return () => clearTimeout(delayedApiCall);
    }, [agencyId, token,PaginationState.pageNumber, PaginationState?.PageSize, receivedDate, nameToSearch]);

    const convertStringUsingStatus = (status) => {
        if (status.includes("validating")) {
            const extractNumber = status.split("-")
            if (status == "validating-10") {
                return "validated"
            } else {
                return extractNumber[0]
            }
        } else {
            return status
        }
    }

    const JOB_APPLICATION_COLUMNS = [
        {
            field: 'userName',
            header: <Label weight={LABEL_WEIGHT[700]}>Name</Label>,
            renderLogic: (row, idx) => (
                <span>
                    {row?.nurse?.firstName} {row?.nurse?.lastName}
                </span>
            )
        },
        {
            field: 'userName',
            header: <Label weight={LABEL_WEIGHT[700]}>Email</Label>,
            renderLogic: (row, idx) => <span>{row?.nurse?.email}</span>
        },
        {
            field: 'userName',
            header: <Label weight={LABEL_WEIGHT[700]}>Experience</Label>,
            renderLogic: (row, idx) => <span>{
                row?.nurse?.yearofExperience ? row?.nurse?.yearofExperience + ' Years' : row?.nurse?.homeCareExperience ? row?.nurse?.homeCareExperience + ' Years' : '-'
            }</span>
        },
        {
            field: 'userName',
            header: <Label weight={LABEL_WEIGHT[700]}>Employer Name</Label>,
            renderLogic: (row, idx) => <span>{row?.nurse?.previousEmployerName}</span>
        },
        {
            field: 'userName',
            header: <Label weight={LABEL_WEIGHT[700]}>Role</Label>,
            renderLogic: (row, idx) => (
                <BadgeV2 color={General.renderBadgeColor(row?.job?.role || '')}>{row?.job?.role}</BadgeV2>
            )
        },
        {
            field: 'userName',
            header: <Label weight={LABEL_WEIGHT[700]}>Status</Label>,
            renderLogic: (row, idx) => (
                <BadgeV2 color={General.renderBadgeColor(row?.nurse?.onboardingStatus || '')}>
                    {convertStringUsingStatus(row?.nurse?.onboardingStatus)}
                </BadgeV2>
            )
        },
        {
            field: 'userName',
            header: <Label weight={LABEL_WEIGHT[700]}>Received Date</Label>,
            renderLogic: (row, idx) => <span>{moment(row?.created_at).format("MM-DD-YYYY")}</span>
        },
        {
            field: 'userName',
            header: <Label weight={LABEL_WEIGHT[700]}>Action</Label>,
            renderLogic: (row, idx) => (
                <UncontrolledDropdownV2 data={{ row, idx }} action={renderActionButton(row, idx)} />
            )
        },
    ];
    const handlePrintAndPreview = async (nurseId) => {
        dispatch(setShowPreviewOfPDF(true));
        try {
            // dispatch(setLoadingState(true))
            const response = await AdminDataService.postPrintApplicationForNurse(nurseId);
            const bData = new Uint8Array(response?.data?.file.data);

            const blob = new Blob([bData], { type: 'application/pdf' });

            const url = URL.createObjectURL(blob);

            setPdfUrl(url);
            setDownloadPdfData(bData);
            setPdfTitle(response?.data?.fileName);
        } catch (error) {
            console.error('Error in handlePrintAndPreview:', error);
            toast.error("error in pdf")
        }
    };
    const handleDownloadPdf = () => {
        download(downloadPdfData, pdfTitle, 'application/pdf');
    };

    const ACTION_BUTTONS = [
        {
            text: 'View Details',
            onClickCb: (row, idx) =>
                navigate(`/${JOB_POSTING.JOBS}/${JOB_POSTING.CHILD_ROUTS.JOB_APPLICATION_DETAILS}/${row.nurse.id}`),
            status: ['Validated', 'Pending', 'Scheduled', "validating-1", "validating-2", "validating-3", "validating-4", "validating-5", "validating-6"]
        },
        {
            text: 'View Application',
            onClickCb: (row, idx) => {
                dispatch(setShowApplicationDetailsModal(true));
                dispatch(setApplicationDetails(row));
            },
            status: ['Received']
        },
        {
            text: 'Print/Preview',
            onClickCb:(row,idx) => {
                handlePrintAndPreview(row?.nurseId)
            },
            status: ['Validated', 'Pending',"Step-7","Incomplete","Step-9","Step-NO-10","Step-NO-3","Step-NO-7","Step-NO-2","Step-NO-9","Step-1","Step-4","validating","validating","Step-2","Step-8","Step-NO-8","Step-3","Step-5", 'Scheduled', "validating-1", "validating-2", "validating-3", "validating-4", "validating-5", "validating-6","Received"]

        }
    ];

    const renderActionButton = (row) => {
        return ACTION_BUTTONS.filter((item) => item?.status?.includes(row?.nurse?.onboardingStatus));
    };
    const onChangeHandler = (event) => {
        const { name, value } = event.target;

        if(name === 'receivedDate'){
            dispatch(setReceivedDate(value));
        }
        if(name === 'nameToSearch'){
            dispatch(setNameToSearch(value));
        }
    };
    const closeFilterDrawer = () => {
        setIsFilterDrawerOpen(false);
    };
    return (
        <Loadable loadingStates={loadingState.state} loadingMessage={loadingState.message}>
            <div className='d-flex justify-content-between'>
                <div style={{ width: '30%' }} className='d-flex'>
                    <DatePicker
                        placeHolder={'Search by received date'}
                        name="receivedDate"
                        onChangeCb={(event) => onChangeHandler(event)}
                        value={receivedDate}
                    />
                    <TextInput
                        type='text'
                        placeHolder={'Search by Name'}
                        name='nameToSearch'
                        className='me-2 ms-3'
                        value={nameToSearch}
                        onChangeCb={(event) => onChangeHandler(event)}
                    />
                    <Button className="mb-4" onClickCb={() => {
                        dispatch(setReceivedDate(""))
                        dispatch(setNameToSearch(""));
                        dispatch(
                            getAllJobApplications({
                                agencyId,
                                token,
                                pageNumber: PaginationState.pageNumber,
                                limit: PaginationState?.PageSize,
                                status: PaginationState?.status
                            })
                        );
                    }}>
                        Clear
                    </Button>
                </div>

                <div className=''>
                    <FilterButton className="filter-button " onClickCb={() => setIsFilterDrawerOpen(true)} />
                    {isFilterDrawerOpen && <FilterDrawer isOpen={isFilterDrawerOpen} onClose={closeFilterDrawer} setIsOpen={setIsFilterDrawerOpen} />}
                </div>
            </div>
            <RichGrid
                data={jobApplicationList}
                columns={JOB_APPLICATION_COLUMNS}
                selectable={true}
                extractRowKey={(row) => row.id}
                onSelectionChangeCallBack={(selectedData) => dispatch(setSelectedJobApplicationList(selectedData))}
                onHeaderSelectionChangeCallBack={(selectedData) =>
                    dispatch(setSelectedJobApplicationList(selectedData))
                }
                selectedRows={selectedJobApplicationList}
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
                                PageSize: newTake,
                                status: PaginationState?.status
                            })
                        );
                        dispatch(
                            getAllJobApplications({
                                agencyId,
                                token,
                                pageNumber: PaginationState.PageNumber,
                                limit: newTake,
                                receivedDate: receivedDate,
                                status: PaginationState?.status
                            })
                        );
                        
                    },
                    onChange: (page) => {
                        dispatch(
                            getAllJobApplications({
                                agencyId,
                                token,
                                pageNumber: page,
                                limit: PaginationState.PageSize,
                                receivedDate: receivedDate,
                                status: PaginationState?.status
                            })
                        );

                        dispatch(setPaginationState({ PageNumber: page }));
                    }
                }}
            />

            <ApplicationModal
                onSuccessCb={() =>
                    dispatch(postSendEmailInvitation({ data: { nurseId: applicationDetails.nurse.id }, token }))
                }
                isOpen={showApplicationDetailsModal}
                toggle={() => dispatch(setShowApplicationDetailsModal(!showApplicationDetailsModal))}
                applicationDetails={applicationDetails.nurse}
                onDiscardCb={() =>
                    dispatch(
                        putValidateUser({
                            nurseId: applicationDetails.nurse.id,
                            data: { onboardingStatus: 'Discarded' },
                            token,
                            agencyId,
                            pageNumber:PaginationState.PageNumber,
                            limit:PaginationState.PageSize,
                            status: PaginationState?.status
                        })
                    )
                }
            />
            <BasicModal
                title={pdfTitle}
                open={showPreviewOfPDF}
                handleClose={() => dispatch(setShowPreviewOfPDF(false))}
                closeButtonHandler={() => dispatch(setShowPreviewOfPDF(false))}
                customStyle={{
                    width: '80%',
                    height: '80%',
                    position: 'absolute',
                    top: '45%',
                    left: '50%',
                    padding: '20px'
                }}
            >
                <iframe
                    title="PDF Preview"
                    width="100%"
                    height="590px"
                    src={pdfUrl}
                    onLoad={() => console.log('PDF loaded successfully')}
                    onError={(e) => console.error('Error loading PDF', e)}
                ></iframe>
                <div className="mt-4">
                    <Button type={BUTTON_TYPE.PRIMARY} onClickCb={handleDownloadPdf} className="me-3">
                        Download PDF
                    </Button>
                    <Button
                        type={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}
                        onClickCb={() => {
                            dispatch(setShowPreviewOfPDF(false));
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </BasicModal>
        </Loadable>
    );
};

export default JobApplicants;
