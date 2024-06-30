import React from 'react';

import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { BUTTON_TYPE } from '../../libs/constant';

import ResponsiveBox from '../responsivebox/ResponsiveBox';
import TextInput from '../input/textinput/TextInput';
import Button from '../button/Button';
import SelectDropdown from '../select/Select';
import ErrorsList from '../input/errorslist/ErrorsList';
import MyCKEditor from '../ckeditorforDiscription/CKEditor';

const JobPostingModal = ({
    isOpen,
    toggle = () => { },
    onSuccessCb = () => { },
    jobPostStates = {},
    onChangeCb = () => { },
    allRequiredFieldsTouched = false,
    jobRoles = [],
    modalTitle,
}) => {

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
                        value={jobPostStates?.title?.value}
                        rules={jobPostStates?.title?.rules}
                        errors={jobPostStates?.title?.errors}
                        formSubmitted={allRequiredFieldsTouched}
                    />

                    <SelectDropdown
                        type="text"
                        placeHolder="Please enter job role"
                        name="role"
                        label="Select Job Role"
                        onChangeCb={onChangeCb}
                        defaultValue={jobPostStates?.role?.value.length ? { label: jobPostStates?.role?.value } : null}
                        value={jobPostStates?.role?.value}
                        rules={jobPostStates?.role?.rules}
                        errors={jobPostStates?.role?.errors}
                        formSubmitted={allRequiredFieldsTouched}
                        options={jobRoles}
                    />

                    <TextInput
                        type="text"
                        placeHolder="Please enter job location"
                        name="jobLocation"
                        label="Job Location"
                        onChangeCb={onChangeCb}
                        value={jobPostStates?.jobLocation?.value}
                        rules={jobPostStates?.jobLocation?.rules}
                        errors={jobPostStates?.jobLocation?.errors}
                        formSubmitted={allRequiredFieldsTouched}
                    />

                    <SelectDropdown
                        name="jobType"
                        label="Job Type"
                        onChangeCb={onChangeCb}
                        placeHolder="Please select job type"
                        value={jobPostStates?.jobType?.value}
                        defaultValue={
                            jobPostStates?.jobType?.value.length ? { label: jobPostStates?.jobType?.value } : ''
                        }
                        rules={jobPostStates?.jobType?.rules}
                        errors={jobPostStates?.jobType?.errors}
                        formSubmitted={allRequiredFieldsTouched}
                        options={[
                            { value: 'Full-Time', label: 'Full-Time' },
                            { value: 'Part-Time', label: 'Part-Time' }
                        ]}
                    />

                    <TextInput
                        type="text"
                        placeHolder="Please enter agency name"
                        name="agencyName"
                        label="Agency Name"
                        onChangeCb={onChangeCb}
                        value={jobPostStates?.agencyName?.value || ''}
                        rules={jobPostStates?.agencyName?.rules}
                        errors={jobPostStates?.agencyName?.errors}
                        formSubmitted={allRequiredFieldsTouched}
                        disabled={true}
                    />
                    <SelectDropdown
                        name="salaryType"
                        label="Salary Type"
                        onChangeCb={onChangeCb}
                        placeHolder="Please select Salary type"
                        defaultValue={
                            jobPostStates?.salaryType?.value.length ? { label: jobPostStates?.salaryType?.value } : null
                        }
                        value={jobPostStates?.salaryType?.value}
                        rules={jobPostStates?.salaryType?.rules}
                        errors={jobPostStates?.salaryType?.errors}
                        formSubmitted={allRequiredFieldsTouched}
                        options={[
                            { value: 'Fixed', label: 'Fixed' },
                            { value: 'In-Range', label: 'In-Range' }
                        ]}
                    />
                    {jobPostStates?.salaryType?.value ? (
                        jobPostStates?.salaryType?.value == 'Fixed' ? (
                            <TextInput
                                type="number"
                                placeHolder="Please enter maximum salary $ / hr "
                                name="salary"
                                label="Salary"
                                onChangeCb={onChangeCb}
                                value={jobPostStates?.salary?.value}
                                rules={jobPostStates?.salary?.rules}
                                errors={jobPostStates?.salary?.errors}
                                formSubmitted={allRequiredFieldsTouched}
                            />
                        ) : (
                            <div style={{ marginBottom: '20px' }}>
                                <div style={{ opacity: '0.7', marginBottom: '3px' }}>
                                    Salary range <span className="text-danger">*</span>
                                </div>
                                <div className="d-flex">
                                    <TextInput
                                        type="number"
                                        placeHolder="Min salary $ / hr"
                                        name="minimumHourlySalary"
                                        onChangeCb={onChangeCb}
                                        value={jobPostStates?.minimumHourlySalary?.value}
                                        rules={jobPostStates?.minimumHourlySalary?.rules}
                                        errors={jobPostStates?.minimumHourlySalary?.errors}
                                        formSubmitted={allRequiredFieldsTouched}
                                        className="me-2"
                                    />
                                    <TextInput
                                        type="number"
                                        placeHolder="Max salary $ / hr"
                                        name="maximumHourlySalary"
                                        onChangeCb={onChangeCb}
                                        value={jobPostStates?.maximumHourlySalary?.value}
                                        rules={jobPostStates?.maximumHourlySalary?.rules}
                                        errors={jobPostStates?.maximumHourlySalary?.errors}
                                        formSubmitted={allRequiredFieldsTouched}
                                    />
                                </div>

                                {Number(jobPostStates?.maximumHourlySalary?.value) <
                                    Number(jobPostStates?.minimumHourlySalary?.value) &&
                                    jobPostStates?.maximumHourlySalary?.value.length > 0 ?
                                    (
                                        <ErrorsList errors={{ message: "Max salary can't be less than minimum salary" }} />
                                    ) : null}
                            </div>
                        )
                    ) : (
                        ''
                    )}
                </ResponsiveBox>

                {/* <label style={{ fontSize: '16px', color: 'rgb(103, 103, 103)', marginBottom: '-5px !important' }}>
                    Job Description <span style={{ color: 'red' }}>*</span>
                </label> */}
                <MyCKEditor
                    editorData={jobPostStates?.description?.value}
                    onChangeCb={onChangeCb}
                    name="description"
                    label="Job Description"
                    errors={jobPostStates?.description?.errors}
                    rules={jobPostStates?.description?.rules}
                    formSubmitted={allRequiredFieldsTouched}
                />
                <div className="mt-5">
                    <Button variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER} onClickCb={toggle}>
                        Close
                    </Button>
                    <Button className="ms-3" onClickCb={onSuccessCb}>
                        Submit
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default JobPostingModal;
