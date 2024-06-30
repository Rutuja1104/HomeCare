import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import TextInput from '../input/textinput/TextInput';
import Button from '../button/Button';
import { BUTTON_TYPE } from '../../libs/constant';
import ResponsiveBox from '../responsivebox/ResponsiveBox';
import { GENDER_LIST } from '../../pages/JobPostings/constants';
import FileUpload from '../fileUpload/FileUpload';
import Label from '../label/Label';
import SelectDropdown from '../select/Select';
import { useDispatch, useSelector } from 'react-redux';
import { componentKey, setUploadedResume } from '../../pages/JobPostings/JobPostingSlice';

const JobApplicationModal = ({
    isOpen,
    toggle = () => { },
    onSuccessCb = () => { },
    jobApplicationFormData = {},
    onChangeCb = () => { },
    jobApplicationDropdown = {},
    onSelectCb = () => { },
    allRequiredFieldsTouched = false,
    onUploadFiles = () => { },
    isRole = "HHA"
}) => {
    const { uploadedResume } = useSelector((state) => state[componentKey]);
    const dispatch = useDispatch();

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered size="xl">
            <ModalHeader className="modal-title">Apply For This Job</ModalHeader>
            <ModalBody className="p-4">
                <ResponsiveBox>
                    <TextInput
                        type="text"
                        placeHolder="Please enter first name"
                        name="FirstName"
                        label="First Name"
                        onChangeCb={onChangeCb}
                        value={jobApplicationFormData?.FirstName?.value}
                        rules={jobApplicationFormData?.FirstName?.rules}
                        errors={jobApplicationFormData?.FirstName?.errors}
                        formSubmitted={allRequiredFieldsTouched}
                    />
                    <TextInput
                        type="text"
                        placeHolder="Please enter middle name"
                        name="MiddleName"
                        label="Middle Name"
                        onChangeCb={onChangeCb}
                        value={jobApplicationFormData?.MiddleName?.value}
                        rules={jobApplicationFormData?.MiddleName?.rules}
                        errors={jobApplicationFormData?.MiddleName?.errors}
                        formSubmitted={allRequiredFieldsTouched}
                    />
                    <TextInput
                        type="text"
                        placeHolder="Please enter last name"
                        name="LastName"
                        label="Last Name"
                        onChangeCb={onChangeCb}
                        value={jobApplicationFormData?.LastName?.value}
                        rules={jobApplicationFormData?.LastName?.rules}
                        errors={jobApplicationFormData?.LastName?.errors}
                        formSubmitted={allRequiredFieldsTouched}
                    />
                    <TextInput
                        type="text"
                        placeHolder="Please enter phone number"
                        name="TelephoneNumber"
                        label="Phone Number"
                        onChangeCb={(event, rule = { required: true, regex: { pattern: /\b\d{10}\b/, message: 'Please enter 10 digits only' } }) => onChangeCb(event, rule)}
                        value={jobApplicationFormData?.TelephoneNumber?.value}
                        rules={jobApplicationFormData?.TelephoneNumber?.rules}
                        errors={jobApplicationFormData?.TelephoneNumber?.errors}
                        formSubmitted={allRequiredFieldsTouched}
                    />
                    <TextInput
                        type="email"
                        placeHolder="Please enter email address"
                        name="Email"
                        label="Email"
                        onChangeCb={onChangeCb}
                        value={jobApplicationFormData?.Email?.value}
                        rules={jobApplicationFormData?.Email?.rules}
                        errors={jobApplicationFormData?.Email?.errors}
                        formSubmitted={allRequiredFieldsTouched}
                    />
                    {(isRole !== "HHA" && isRole !== "DSP") && <TextInput
                        type="number"
                        placeHolder="Please enter year of experience"
                        name="Experience"
                        label="Experience (In Years)"
                        onChangeCb={onChangeCb}
                        value={jobApplicationFormData?.Experience?.value}
                        rules={jobApplicationFormData?.Experience?.rules}
                        errors={jobApplicationFormData?.Experience?.errors}
                        formSubmitted={allRequiredFieldsTouched}
                    />}
                    <TextInput
                        type="text"
                        placeHolder="Please enter previous employeer name"
                        name="PreviousEmployerName"
                        label="Previous Employer Name"
                        onChangeCb={onChangeCb}
                        value={jobApplicationFormData?.PreviousEmployerName?.value}
                        rules={jobApplicationFormData?.PreviousEmployerName?.rules}
                        errors={jobApplicationFormData?.PreviousEmployerName?.errors}
                        formSubmitted={allRequiredFieldsTouched}
                    />
                    <SelectDropdown //User this dropdown
                        name="Gender"
                        label="Gender"
                        onChangeCb={onChangeCb}
                        placeHolder="Please select gender"
                        value={jobApplicationFormData?.Gender?.value}
                        defaultValue={
                            jobApplicationFormData?.Gender?.value.length
                                ? { label: jobApplicationFormData?.Gender?.value }
                                : ''
                        }
                        rules={jobApplicationFormData?.Gender?.rules}
                        errors={jobApplicationFormData?.Gender?.errors}
                        formSubmitted={allRequiredFieldsTouched}
                        options={GENDER_LIST}
                    />
                    <SelectDropdown //User this dropdown
                        name="isLicense"
                        label="Do you have a valid driver's license ?"
                        onChangeCb={onChangeCb}
                        placeHolder="Do you have a valid driver's license "
                        value={jobApplicationFormData?.isLicense?.value}
                        defaultValue={
                            jobApplicationFormData?.isLicense?.value.length
                                ? { label: jobApplicationFormData?.isLicense?.value }
                                : ''
                        }
                        rules={jobApplicationFormData?.isLicense?.rules}
                        errors={jobApplicationFormData?.isLicense?.errors}
                        formSubmitted={allRequiredFieldsTouched}
                        options={[
                            { value: 'Yes', label: 'Yes' },
                            { value: 'No', label: 'No' }
                        ]}
                    />
                    <SelectDropdown //User this dropdown
                        name="validAge"
                        label="Are you over 18 years of age ?"
                        onChangeCb={onChangeCb}
                        placeHolder="Are you over 18 years of age"
                        value={jobApplicationFormData?.validAge?.value}
                        defaultValue={
                            jobApplicationFormData?.validAge?.value.length
                                ? { label: jobApplicationFormData?.validAge?.value }
                                : false
                        }
                        rules={jobApplicationFormData?.validAge?.rules}
                        errors={jobApplicationFormData?.validAge?.errors}
                        formSubmitted={allRequiredFieldsTouched}
                        options={[
                            { value: 'Yes', label: 'Yes' },
                            { value: 'No', label: 'No' }
                        ]}
                    />

                    {(isRole === "HHA" || isRole === "DSP") &&
                        <SelectDropdown
                            name="isvalidCNA"
                            label="Do you possess a valid CNA/STNA certification ?"
                            onChangeCb={onChangeCb}
                            placeHolder="Please select your answer"
                            value={jobApplicationFormData?.isvalidCNA?.value}
                            defaultValue={
                                jobApplicationFormData?.isvalidCNA?.value.length
                                    ? { label: jobApplicationFormData?.isvalidCNA?.value }
                                    : ''
                            }
                            rules={jobApplicationFormData?.isvalidCNA?.rules}
                            errors={jobApplicationFormData?.isvalidCNA?.errors}
                            formSubmitted={allRequiredFieldsTouched}
                            options={[
                                { value: 'Yes', label: 'Yes' },
                                { value: 'No', label: 'No' }
                            ]}
                        />
                    }
                    
                    {(isRole === "HHA" || isRole === "DSP") &&
                        <TextInput
                            name="homeCareExperience"
                            type="number"
                            label="How many years of home care experience do you have ?"
                            onChangeCb={onChangeCb}
                            placeHolder="How many years of home care experience do you have "
                            value={jobApplicationFormData?.homeCareExperience?.value}
                            rules={jobApplicationFormData?.homeCareExperience?.rules}
                            errors={jobApplicationFormData?.homeCareExperience?.errors}
                            formSubmitted={allRequiredFieldsTouched}
                        />
                    }
                </ResponsiveBox>
                <Label>Upload Your Resume</Label>
                <FileUpload
                    className="m-0"
                    onUploadFiles={onUploadFiles}
                    uploadFiles={false}
                    isMultipleDocuments={false}
                    onRemoveFilesCb={()=>{
                        if (Object.keys(uploadedResume).length !== 0) {
                            dispatch(setUploadedResume({}));
                        }
                    }}
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

export default JobApplicationModal;
