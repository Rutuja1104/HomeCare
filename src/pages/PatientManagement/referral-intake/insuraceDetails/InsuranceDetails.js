import React, { useEffect, useState } from 'react';
import { VEC_ICON_NAME } from '../../../../components/icon/constants';
import Button from '../../../../components/button/Button';
import { BUTTON_TYPE } from '../../../../libs/constant';
import TextInput from '../../../../components/input/textinput/TextInput';
// import SelectDropdown from '../../../../components/dropdown/selectdropdown/SelectDropdown';
import Heading from '../../../../components/heading/Heading';
import { HEADING } from '../../../../components/heading/constants/constants';
import ResponsiveBox from '../../../../components/responsivebox/ResponsiveBox';
import RadioInput from '../../../../components/input/radioinput/RadioInput';
import { useDispatch, useSelector } from 'react-redux';
import {
    componentKey,
    setActiveRefferalPatientIntakeStep,
    setAddNewInsuranceDetails,
    setCardDetails,
    setInsuranceDocumentsListsToShow,
    setInsuranceFieldsTouched,
    setMultipleInsuranceDetails,
    setRemoveNewInsuranceDetails,
    setUploadedDocuments
} from '../PatientManagementSlice';
import {
    deleteDocumentFromS3AndDatabase,
    getDocumentFromS3Bucket,
    getPreSignedUrl,
    postCardDetails,
    postInsuranceDetails
} from '../PatientManagementSaga';
import FileUpload from '../../../../components/fileUpload/FileUpload';
import GeneralValidator, { generalValidator } from '../../../../libs/utility/validators/GeneralValidator';
import { INSURANCE_DETAILS } from '../../constants';
import DatePicker from '../../../../components/datePicker/DatePicker';
import { toast } from 'react-toastify';
import SelectDropdown from '../../../../components/select/Select';
import General from '../../../../libs/utility/General';
import ConfirmationModal from '../../../../components/models/ConfirmationModal';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const InsuranceDetails = () => {
    const elements = useElements();
    const stripe = useStripe();
    const [isEligible, setIsEligible] = useState(true);
    const [openConfirmationModal, setConfirmationModal] = useState(false);
    const [showFlagState, setShowFlagState] = useState(false);
    const agencyId = General.getLocalStorageData('agencyId');
    const token = General.getLocalStorageData("token")
    const {
        insuranceDetails,
        insuranceDocuments,
        cardDetails,
        getAllPayers,
        patientDropdownDetails,
        insuranceDetailsFieldTouched,
        uploadedDocumentsList,
        
        patientId,
        patientUserId,
        cardSavedState
    } = useSelector((state) => state[componentKey]);
   
    const insuranceType = [
        { label: 'HMO', value: 'HMO' },
        { label: 'PPO', value: 'PPO' },
        { label: 'POS', value: 'POS' },
        { label: 'EPO', value: 'EPO' }
    ];

    let payerNames = getAllPayers[0]?.map((item) => ({ label: item?.payerName, value: item?.payerName }));

    const dispatch = useDispatch();
    function containsSpecialChars(str) {
        var specialChars = /[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/;
        return specialChars.test(str);
    }
    const onChangeHandler = (event, rules, index) => {
        const { name, value, type } = event.target;
        let regex = /\d/;
        let noWhiteSpaceRegex = /^\s|\s\s/;
        let insuranceIdRegex = /^[a-zA-Z0-9]+$/;
        if (name == 'insuranceId' || name == 'groupId' || name == 'deductible') {
            if (
                (type === 'text' && insuranceIdRegex.test(value)) ||
                (noWhiteSpaceRegex.test(value) && type === 'text')
            ) {
                if (rules) {
                    const errors = generalValidator.validate(value, rules);
                    dispatch(setMultipleInsuranceDetails({ object: { [name]: { value, errors, rules } }, index }));
                } else {
                    dispatch(setMultipleInsuranceDetails({ object: { [name]: { value } }, index }));
                }
            }
        }
        if (
            (regex.test(value) && type == 'text') ||
            (type == 'text' && containsSpecialChars(value)) ||
            (noWhiteSpaceRegex.test(value) && type == 'text')
        ) {
            return;
        }
        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(setMultipleInsuranceDetails({ object: { [name]: { value, errors, rules } }, index }));
        } else {
            dispatch(setMultipleInsuranceDetails({ object: { [name]: { value } }, index }));
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });
        if(!cardDetails?.FullName || !paymentMethod.id) {
            toast.error("Please enter card details");
            return;
        }

                
        if (paymentMethod) {
            const { card } = paymentMethod;
            const tokenDetails={
                last4 : card.last4.toString(),
                exp_month : card.exp_month.toString(),
                exp_year : card.exp_year.toString(),
                paymentToken : paymentMethod.id,
                fullName : cardDetails.FullName,
                step:'step-1'
            }
            dispatch(postCardDetails(patientId, tokenDetails));
        } else {
            console.error('Error creating token:', error);
        }

    };
    return (
        <>
            <div className="insurance-details-container">
                <Heading type={HEADING.H2}>Insurance Details</Heading>
                {insuranceDetails.map((item, index) => (
                    <div key={index} className="mt-4">
                        <Heading type={HEADING.H3}>Insurance Details: {index + 1}</Heading>

                        <div className="payer-information-block">
                            <div className="block">
                                <SelectDropdown
                                    placeHolder={'Please select Payer Name'}
                                    name="payerName"
                                    onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                    options={payerNames}
                                    value={item?.payerName?.value}
                                    label="Payer Name"
                                    rules={item?.payerName?.rules}
                                    errors={item?.payerName?.errors}
                                    formSubmitted={insuranceDetailsFieldTouched}
                                    defaultValue={
                                        item?.payerName?.value.length ? { label: item?.payerName?.value } : ''
                                    }
                                />
                            </div>
                            <div className="block">
                                <TextInput
                                    type="text"
                                    placeHolder={'Please enter plan name'}
                                    name="planName"
                                    onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                    label="Plan Name"
                                    value={item.planName.value}
                                    rules={item.planName.rules}
                                    errors={item.planName.errors}
                                    formSubmitted={insuranceDetailsFieldTouched}
                                />
                            </div>
                            <div className="block">
                                <TextInput
                                    type="text"
                                    placeHolder={'Please enter order of benefits'}
                                    name="orderOfBenifits"
                                    onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                    label="Order Of Benifits"
                                    value={item.orderOfBenifits.value}
                                    errors={item.orderOfBenifits.errors}
                                />
                            </div>
                        </div>
                        <div className="insurance-details-block">
                            <div className="block">
                                <TextInput
                                    type="text"
                                    placeHolder={'Please enter insurance Id'}
                                    name="insuranceId"
                                    onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                    label="Insurance ID"
                                    rules={item.insuranceId.rules}
                                    errors={item.insuranceId.errors}
                                    formSubmitted={insuranceDetailsFieldTouched}
                                    value={item.insuranceId.value}
                                />
                            </div>
                            <div className="block">
                                <SelectDropdown
                                    placeHolder={'Please select insurance type'}
                                    name="insuranceType"
                                    onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                    options={insuranceType}
                                    value={item.insuranceType.value}
                                    label="Insurance Type"
                                    rules={item.insuranceType.rules}
                                    errors={item?.insuranceType?.errors}
                                    formSubmitted={insuranceDetailsFieldTouched}
                                    defaultValue={
                                        item.insuranceType.value.length ? { label: item.insuranceType.value } : ''
                                    }
                                />
                            </div>
                            <div className="block">
                                <TextInput
                                    type="number"
                                    placeHolder={'Please enter deductible'}
                                    name="deductible"
                                    onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                    label="Deductible"
                                    value={item.deductible.value}
                                    errors={item.deductible.errors}
                                    formSubmitted={insuranceDetailsFieldTouched}

                                />
                            </div>
                        </div>
                        <div className="copay-details-block">
                            <div className="block">
                                <TextInput
                                    type="text"
                                    placeHolder={'Please enter group ID'}
                                    name="groupId"
                                    onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                    label="Group ID"
                                    value={item.groupId.value}
                                    rules={item.groupId.rules}
                                    errors={item.groupId.errors}
                                    formSubmitted={insuranceDetailsFieldTouched}
                                />
                            </div>
                            <div className="block">
                                <TextInput
                                    type="text"
                                    placeHolder={'Please enter Copay'}
                                    name="copay"
                                    onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                    label="Copay"
                                    value={item.copay.value}
                                    errors={item.copay.errors}
                                    formSubmitted={insuranceDetailsFieldTouched}

                                />
                            </div>
                            <div className="block">
                                <TextInput
                                    type="number"
                                    placeHolder={'Please enter copay amount'}
                                    name="copayAmount"
                                    onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                    label="Copay Amount"
                                    value={item.copayAmount.value}
                                    errors={item.copayAmount.errors}
                                    formSubmitted={insuranceDetailsFieldTouched}

                                />
                            </div>
                        </div>

                        <div className="from-to-date-block">
                            <div className="block">
                                <DatePicker
                                    label="Effective From"
                                    name="effectiveFrom"
                                    onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                    value={item.effectiveFrom.value}
                                    rules={item.effectiveFrom.rules}
                                    errors={item.effectiveFrom.errors}
                                    formSubmitted={insuranceDetailsFieldTouched}
                                    maxDate={new Date()}
                                />
                            </div>
                            <div className="block">
                                <DatePicker
                                    label="Effective Till"
                                    name="effectiveTill"
                                    onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                    value={item.effectiveTill.value}
                                    rules={item.effectiveTill.rules}
                                    errors={item.effectiveTill.errors}
                                    formSubmitted={insuranceDetailsFieldTouched}
                                    minDate={item.effectiveFrom.value}
                                />
                            </div>
                            <div className="block">
                                <TextInput
                                    type="text"
                                    placeHolder={'Please enter relation with patient'}
                                    name="relationWithPatient"
                                    onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                    label="Relation With Patient"
                                    value={item.relationWithPatient.value}
                                    rules={item.relationWithPatient.rules}
                                    errors={item.relationWithPatient.errors}
                                    formSubmitted={insuranceDetailsFieldTouched}
                                />
                            </div>
                        </div>
                        <div className="from-to-date-block">
                            <div className="block"></div>
                        </div>

                        <div>
                            <Heading type={HEADING.H3}>Upload Document</Heading>
                            <div className="">
                                <FileUpload
                                    onUploadFiles={(file) => {
                                        dispatch(setMultipleInsuranceDetails({ index, object: { documents: file } }));
                                    }}
                                    onUploadDocumentCb={(file, idx) => {
                                        const data = {
                                            userId: patientId,
                                            agencyId: agencyId,
                                            fileName: file.name,
                                            documentType: 'insurance reports',
                                            type: 'patient'
                                        };
                                        dispatch(
                                            getPreSignedUrl({
                                                agencyId,
                                                data,
                                                file,
                                                idx,
                                                type: 'patient',
                                                documentType: 'insurance reports',
                                                patientUserId,
                                                index,
                                                
                                            })
                                        );
                                    }}
                                    onRemoveFilesCb={(idx, s3Url) => {
                                        if (s3Url) {
                                            dispatch(deleteDocumentFromS3AndDatabase({ s3Url, documentType: "insurance reports" }))
                                        }
                                        let copiedFiles = [ ...insuranceDetails[index].documents ];
                                    
                                        let arr = copiedFiles.filter((item, index) => index !== idx);
                                    
                                        dispatch(setMultipleInsuranceDetails({ object: { documents: arr }, index }));
                                    }}
                                    uploadedFiles={insuranceDetails[index].documents}
                                    onPreviewCb={(url) => {
                                        return dispatch(getDocumentFromS3Bucket(url));
                                    }}
                                />
                            </div>
                        </div>
                        <div className="buttons">
                            <Button variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}>Cancel</Button>
                            <Button variant={BUTTON_TYPE.PRIMARY} onClickCb={() => setIsEligible(!isEligible)} disabled>
                                Check Eligibility
                            </Button>
                        </div>
                        {isEligible && (
                            <div className="eligibility-block">
                                <div>
                                    <divc className="eligibility-icon"></divc>
                                    <div className="eligibility-info">
                                        <Heading type={HEADING.h3}>Not eligible for the service</Heading>
                                        <p>
                                            The service is not covered by this insurance plan, try applying with another
                                            plan if available.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {index > 0 && (
                            <Button
                                onClickCb={() => dispatch(setRemoveNewInsuranceDetails(index))}
                                variant={BUTTON_TYPE.LIGHT_WITH_NO_BORDER}
                                className={`mt-2 ${index < insuranceDetails.length - 1 && 'mb-4'}`}
                            >
                                Remove
                            </Button>
                        )}
                    </div>
                ))}

                <div className="add-details">
                    <Button
                        className="mt-2 "
                        variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}
                        onClickCb={() => {
                            dispatch(setAddNewInsuranceDetails(INSURANCE_DETAILS));
                            dispatch(setInsuranceDocumentsListsToShow([]));
                            dispatch(setInsuranceFieldsTouched(false));
                        }}
                        prefixProps={{ icon: VEC_ICON_NAME.ADD_NEW_ICON }}
                    >
                        Add New Insurance Details
                    </Button>
                </div>
                <div className="nextbuttons">
                    <Button
                        type={BUTTON_TYPE.LIGHT_WITH_NO_BORDER}
                        className="button-width primary-light-with-border-btn"
                        onClickCb={() => {
                            dispatch(setActiveRefferalPatientIntakeStep(0));
                        }}
                    >
                        Back
                    </Button>
                    <Button
                        type={BUTTON_TYPE.PRIMARY}
                        className="button-width primary-btn"
                        onClickCb={() => {
                            if(cardDetails?.FullName && cardSavedState) {
                                dispatch(setInsuranceFieldsTouched(true));
                                if (!GeneralValidator.validateRequiredFieldsArray(insuranceDetails)) {
                                    dispatch(
                                        postInsuranceDetails({
                                            patientId,
                                            insuranceDetails,
                                            patientDropdownDetails,
                                            uploadedDocumentsList,
                                            insuranceDocuments,
                                            documentType: 'insurance reports',
                                            token
                                        })
                                    );
                                    dispatch(setActiveRefferalPatientIntakeStep(2));
                                } else {
                                    toast.error('Please enter all the required fields');
                                }
                            }else{
                                if (GeneralValidator.validateRequiredFieldsArray(insuranceDetails)) {
                                    return toast.error('Please enter all the required fields');
                                }
                                else {
                                    setConfirmationModal(true)
                                    setShowFlagState(true);
                                }
                            }
                           
                        }}
                    >
                        Next
                    </Button>
                </div>
            </div>
            {isEligible && !cardSavedState && (
                <div className="card-details">
                    <Heading type={HEADING.H3}>Add Your Credit Card Details</Heading>
                    <form  onSubmit={handleSubmit}>
                        <div className='card-holder-name'>
                            <TextInput
                                type="text"
                                name="FullName"
                                onChangeCb={({ target: { name, value } }) => dispatch(setCardDetails({ name, value }))}
                                label="Full Name"
                            />
                        </div>
                        <div className='card-component d-flex'>
                            <label>
                                <CardElement options={{
                                    hidePostalCode: true,
                                }}
                                />
                            </label>
                        </div>
                        <Button type="submit" variant={BUTTON_TYPE.PRIMARY}>
                            Save
                        </Button>
                    </form>
                </div>
            )}
            { cardSavedState &&(
                <div className="card-details">
                    <Heading type={HEADING.H3}>Card details added successfully.</Heading>
                </div>
            )
            }

            <ConfirmationModal
                isOpen={openConfirmationModal}
                toggle={() => setConfirmationModal(!openConfirmationModal)}
                header='Are you sure?'
                bodyContent='You want to continue without adding co-pay details ?'
                successButtonText="Yes"
                closeButtonText="No"
                onSuccessCb={() => {
                    dispatch(setInsuranceFieldsTouched(true));
                    if (!GeneralValidator.validateRequiredFieldsArray(insuranceDetails)) {
                        const allDocumentsUploaded = insuranceDetails.every((item) =>
                            item.documents.every((doc) => doc.s3Url && doc.s3Url.length !== 0)
                        );
                
                        if (allDocumentsUploaded) {
                            dispatch(
                                postInsuranceDetails({
                                    patientId,
                                    insuranceDetails,
                                    patientDropdownDetails,
                                    uploadedDocumentsList,
                                    insuranceDocuments,
                                    documentType: 'insurance reports',
                                    token,
                                })
                            );
                            dispatch(setActiveRefferalPatientIntakeStep(2));
                        } else {
                            toast.error('Please upload all required documents in the insurance details');
                        }
                    } else {
                        toast.error('Please enter all the required fields in insurance details');
                    }
                }}
            />
        </>
    )
};
export default InsuranceDetails;
