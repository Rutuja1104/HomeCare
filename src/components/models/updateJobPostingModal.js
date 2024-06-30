import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { BUTTON_TYPE } from '../../libs/constant';
import ResponsiveBox from '../responsivebox/ResponsiveBox';
import TextInput from '../input/textinput/TextInput';
import Button from '../button/Button';
import SelectDropdown from '../select/Select';
import ErrorsList from '../input/errorslist/ErrorsList';
import { useDispatch } from 'react-redux';
import MyCKEditor from '../ckeditorforDiscription/CKEditor';
import { setUpdateROwSelectedData } from '../../pages/JobPostings/JobPostingSlice';
import { generalValidator } from '../../libs/utility/validators/GeneralValidator';

const UpdateJobPostingModal = ({
    isOpen,
    toggle = () => {},
    onSuccessCb = () => {},
    updatedJobPostData = {},
    onChangeCb = () => {},
    allRequiredFieldsTouched = false,
    jobRoles = [],
    modalTitle
}) => {
    const dispatch = useDispatch();
    const onChangeHandler = (name, value, rules) => {
        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(setUpdateROwSelectedData({ [name]: { value, errors, rules } }));
        } else {
            dispatch(setUpdateROwSelectedData({ [name]: { value } }));
        }
    };
    const [minSalary, maxSalary] =
        updatedJobPostData && updatedJobPostData.salaryRange ? updatedJobPostData.salaryRange.split('-') : ['', ''];

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered size="xl">
            <ModalHeader className="modal-title">{modalTitle}</ModalHeader>
            <ModalBody className="p-4">
                <ResponsiveBox>
                    <TextInput
                        type="text"
                        placeHolder="Please enter job title"
                        name="title"
                        label="Job Title"
                        onChangeCb={onChangeCb}
                        value={updatedJobPostData?.title}
                        rules={updatedJobPostData?.title?.rules}
                        errors={updatedJobPostData?.title?.errors}
                        formSubmitted={allRequiredFieldsTouched}
                    />
                    <SelectDropdown
                        type="text"
                        placeHolder="Please enter job role"
                        name="role"
                        label="Select Job Role"
                        // onChangeCb={onChangeCb}
                        defaultValue={updatedJobPostData?.role?.length ? { label: updatedJobPostData?.role } : null}
                        value={updatedJobPostData?.role}
                        options={jobRoles}
                        // rules={updatedJobPostData?.title?.rules}
                        // errors={updatedJobPostData?.title?.errors}
                        // formSubmitted={allRequiredFieldsTouched}
                    />
                    <TextInput
                        type="text"
                        placeHolder="Please enter job location"
                        name="jobLocation"
                        label="Job Location"
                        onChangeCb={onChangeCb}
                        value={updatedJobPostData?.jobLocation}
                        rules={updatedJobPostData?.jobLocation?.rules}
                        errors={updatedJobPostData?.jobLocation?.errors}
                        formSubmitted={allRequiredFieldsTouched}
                    />
                    <SelectDropdown
                        name="status"
                        label="Status"
                        onChangeCb={onChangeCb}
                        placeHolder="Please select status"
                        value={updatedJobPostData?.status}
                        defaultValue={
                            updatedJobPostData?.status?.length ? { label: updatedJobPostData?.status } : null
                        }
                        options={[
                            { value: 'open', label: 'Open' },
                            { value: 'fulfilled', label: 'Fulfilled' }
                        ]}
                    />
                    <SelectDropdown
                        name="jobType"
                        label="Job Type"
                        onChangeCb={onChangeCb}
                        placeHolder="Please select job type"
                        value={updatedJobPostData?.jobType}
                        defaultValue={
                            updatedJobPostData?.jobType?.length ? { label: updatedJobPostData?.jobType } : null
                        }
                        options={[
                            { value: 'Full-Time', label: 'Full-Time' },
                            { value: 'Part-Time', label: 'Part-Time' }
                        ]}
                    />
                    <SelectDropdown
                        name="salaryType"
                        label="Salary Type"
                        onChangeCb={onChangeCb}
                        placeHolder="Please select Salary type"
                        defaultValue={
                            updatedJobPostData?.salaryType === 'Fixed'
                                ? { label: 'Fixed', value: 'Fixed' }
                                : { label: 'In-Range', value: 'In-Range' }
                        }
                        value={updatedJobPostData?.salaryType}
                        options={[
                            { value: 'Fixed', label: 'Fixed' },
                            { value: 'In-Range', label: 'In-Range' }
                        ]}
                    />

                    {updatedJobPostData?.salaryType && (
                        <React.Fragment>
                            {updatedJobPostData?.salaryType === 'Fixed' ? (
                                <TextInput
                                    type="number"
                                    placeHolder="Please enter maximum salary $ / hr "
                                    name="fixedSalary"
                                    label="Salary"
                                    onChangeCb={onChangeCb}
                                    value={updatedJobPostData?.fixedSalary}
                                    // value={jobPostStates?.salary?.value}
                                    rules={updatedJobPostData?.fixedSalary?.rules}
                                    errors={updatedJobPostData?.fixedSalary?.errors}
                                    formSubmitted={allRequiredFieldsTouched}
                                />
                            ) : (
                                <>
                                    <div style={{ marginBottom: '20px' }}>
                                        <div style={{ opacity: '0.7', marginBottom: '3px' }}>Salary range</div>
                                        <div className="d-flex">
                                            <TextInput
                                                type="number"
                                                placeHolder="Min salary $ / hr"
                                                name="minimumHourlySalary"
                                                onChangeCb={onChangeCb}
                                                value={updatedJobPostData?.minimumHourlySalary}
                                                ules={updatedJobPostData?.minimumHourlySalary?.rules}
                                                errors={updatedJobPostData?.minimumHourlySalary?.errors}
                                                formSubmitted={allRequiredFieldsTouched}
                                                className="me-2"
                                            />
                                            <TextInput
                                                type="number"
                                                placeHolder="Max salary $ / hr"
                                                name="maximumHourlySalary"
                                                onChangeCb={onChangeCb}
                                                value={updatedJobPostData?.maximumHourlySalary}
                                                rules={updatedJobPostData?.maximumHourlySalary?.rules}
                                                errors={updatedJobPostData?.maximumHourlySalary?.errors}
                                                formSubmitted={allRequiredFieldsTouched}
                                            />
                                        </div>

                                        {Number(updatedJobPostData?.maximumHourlySalary) <
                                            Number(updatedJobPostData?.minimumHourlySalary) &&
                                        updatedJobPostData?.maximumHourlySalary?.length > 0 ? (
                                                <ErrorsList
                                                    errors={{ message: "Max salary can't be less than minimum salary" }}
                                                />
                                            ) : null}
                                    </div>
                                </>
                            )}
                        </React.Fragment>
                    )}
                </ResponsiveBox>

                <label style={{ fontSize: '16px', color: 'rgb(103, 103, 103)', marginBottom: '-5px !important' }}>
                    Job Description
                </label>
                <MyCKEditor
                    editorData={updatedJobPostData?.description}
                    onChangeCb={(newData) => onChangeHandler('description', newData)}
                />
                <div className="mt-5">
                    <Button variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER} onClickCb={toggle}>
                        Close
                    </Button>
                    <Button className="ms-3" onClickCb={onSuccessCb}>
                        Update
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default UpdateJobPostingModal;
