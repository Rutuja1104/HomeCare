import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    componentKey,
    setActiveRefferalPatientIntakeStep,
    setAutoCompleteAddressFields,
    setAutoCompleteAddressForEmergencyInfo,
    setAutoCompleteAddressForReferralInfo,
    setCreatePhysicianOnChange,
    setEmergencyDetails,
    setEmergencyDetailsFieldTouch,
    setIsCreatePhysicianFieldTouch,
    setIsMultiRecord,
    setIsSingleRecord,
    setIsmailSent,
    setMedicalReportRequestModal,
    setPatienDetailsDropdown,
    setPhysicianFieldTouched,
    setReferralDetails,
    setReferralDetailsFieldTouch
} from '../PatientManagementSlice';
import TextInput from '../../../../components/input/textinput/TextInput';
import GeneralValidator, { generalValidator } from '../../../../libs/utility/validators/GeneralValidator';
import Heading from '../../../../components/heading/Heading';
import { HEADING } from '../../../../components/heading/constants/constants';
import SelectDropdown from '../../../../components/dropdown/selectdropdown/SelectDropdown';
import Button from '../../../../components/button/Button';
import { BUTTON_TYPE } from '../../../../libs/constant';
import {
    emergencyContact,
    getPhysicianByNameOrNumber,
    getPhysicians,
    patchUpadatePatientById,
    postPhysician,
    postSendEmail
} from '../PatientManagementSaga';
import BasicModal from '../../../../components/modal/Modal';
import RichGrid from '../../../../components/richgrid/RichGrid';
import { toast } from 'react-toastify';
import Loadable from '../../../../components/loadable/Loadable';
import GoogleAutoComplete from '../../../../components/googleAutoComplete/GoogleAutoComplete';
import General from '../../../../libs/utility/General';
import { useNavigate } from 'react-router-dom';

const AddNewPhysician = () => {
    const {
        personalDetails,
        physicianDetails,
        patientDropdownDetails,
        referralDetails,
        createPhysician,
        emergencyDetails,
        isSingleRecord,
        isMultiRecord,
        physician,
        referralDetailsTouched,
        emergencyDetailsTouched,
        medicalReportRequestModal,
        isCreatePhysicianFieldTouch,
        loadingState,
        isMailSent,
        physicianFieldTouched,
        patientId
    } = useSelector((state) => state[componentKey]);

    const dispatch = useDispatch();

    const agencyId = General.getLocalStorageData('agencyId');
    const physicianId = patientDropdownDetails?.patientPhysician?.value;
    const [physicianFirstName, setFirstName] = useState('');
    const [physicianLastName, setLastName] = useState('');
    const [selectedRow, setSelectedRow] = useState([]);
    const [npi, setNPI] = useState('');
    const [openPhysicianModal, setOpenPhysicianModal] = useState(false);
    const [clickedRowIndex, setClickedRowIndex] = useState(-1);
    const token = General.getLocalStorageData("token")
    
    const handlePlaceSelect = (place) => {
        const mappingKey = {
            referral_addressLine2: { type: 'locality', required: false },
            referral_city: { type: 'administrative_area_level_2', required: false },
            referral_state: { type: 'administrative_area_level_1', required: false },
            referral_country: { type: 'country', required: false },
            referral_pinCode: { type: 'postal_code', required: false }
        };

        const result = General.mapAddressToStates(place.address_components, mappingKey);
        dispatch(
            setReferralDetails({
                object: { referral_addressLine1: { value: place.formatted_address.split(',')[0] } },
                filedName: 'referralDetails'
            })
        );
        dispatch(setAutoCompleteAddressForReferralInfo(result));
    };
    const handlePlaceSelectForEmergency = (place) => {
        const mappingKey = {
            guarentor_addressLine2: { type: 'locality', required: false },
            // Landmark: { type: "administrative_area_level_3", required: true },
            guarentor_city: { type: 'administrative_area_level_2', required: false },
            guarentor_state: { type: 'administrative_area_level_1', required: false },
            guarentor_country: { type: 'country', required: false },
            guarentor_pinCode: { type: 'postal_code', required: false }
        };

        const result = General.mapAddressToStates(place.address_components, mappingKey);
        dispatch(
            setEmergencyDetails({
                object: { ' guarentor_addressLine1': { value: place.formatted_address.split(',')[0] } },
                filedName: 'emergencyDetails'
            })
        );
        dispatch(setAutoCompleteAddressForEmergencyInfo(result));
        
    };
    const physicians = [];
    physicianDetails.forEach((item) => {
        if (item?.physician?.length > 0) {
            item?.physician?.forEach((item) => {
                const extractedData = {
                    label: item?.firstName + ' ' + item?.lastName,
                    value: item?.id,
                    email: item?.email,
                    firstName: item?.firstName,
                    lastName: item?.lastName
                };

                physicians.push(extractedData);
            });
        }
    });

    const ASSIGN_MEMBER_COLUMNS = [
        {
            field: 'Name',
            header: 'Name',
            renderLogic: (row, idx) => <span>{row.basic.name}</span>
        },

        {
            field: 'npi',
            header: 'NPI',
            renderLogic: (row, idx) => <span>{row.number || '-'}</span>
        },
        {
            field: 'address',
            header: 'Primary Address',
            renderLogic: (row, idx) => (
                <span>
                    {row?.primaryAddress.addressLine1 +
                        '' +
                        row?.primaryAddress.addressLine2 +
                        ' , ' +
                        row?.primaryAddress.city +
                        ', ' +
                        row?.primaryAddress.state +
                        ', ' +
                        row?.primaryAddress.postalCode +
                        ', ' +
                        row?.primaryAddress.countryCode || '-'}
                </span>
            )
        },
        {
            field: 'addPhysician',
            header: 'Add Physician',
            renderLogic: (row, idx) => {
                return (
                    <div>
                        <input
                            className="form-check-input"
                            type="radio"
                            onChange={(item) => onSelect(item, idx)}
                        ></input>
                    </div>
                );
            }
        }
    ];
    const onSelect = (item, idx) => {
        dispatch(setIsMultiRecord({ state: false }));
        dispatch(setIsSingleRecord({ state: true }));

        dispatch(getPhysicianByNameOrNumber({ npi: physician[idx].number, token }));

        setClickedRowIndex(idx);
    };
    const onChangeHandler = (event, rules) => {
        const { name, value } = event.target;

        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(
                setCreatePhysicianOnChange({
                    object: { [name]: { value, errors, rules } }
                })
            );
        } else {
            dispatch(setCreatePhysicianOnChange({ object: { [name]: { value } } }));
        }
    };

    function containsSpecialChars(str) {
        var specialChars = /[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/;
        return specialChars.test(str);
    }
    const onChangeHandlerForReferral = (event, rules, index) => {
        const { name, value, type } = event.target;
        if (name === 'referral_phoneNumber') {
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
                dispatch(setReferralDetails({ object: { [name]: { value: formattedValue, errors, rules } } }));
            } else {
                dispatch(setReferralDetails({ object: { [name]: { value: formattedValue } } }));
            }
        } else {
            let regex = /\d/;

            let noWhiteSpaceRegex = /^\s|\s/;
            if (
                (regex.test(value) && type == 'text') ||
                (type == 'text' && containsSpecialChars(value)) ||
                (noWhiteSpaceRegex.test(value) && type == 'text')
            ) {
                return;
            }
            if (rules) {
                if (type == 'email') {
                    rules = {
                        ...(value.length !== 0
                            ? { regex: { pattern: /^\S+@\S+\.\S+$/, message: 'Please enter a valid email address' } }
                            : {})
                    };
                }
                const errors = generalValidator.validate(value, rules);
                dispatch(
                    setReferralDetails({
                        object: { [name]: { value, errors, rules } }
                    })
                );
            } else {
                dispatch(setReferralDetails({ object: { [name]: { value } } }));
            }
        }
    };
    const onChangeHandlerForEmergency = (event, rules, index) => {
        const { name, value, type } = event.target;
        if (name === 'guarentorPhoneNumber') {
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
                dispatch(setEmergencyDetails({ object: { [name]: { value: formattedValue, errors, rules } } }));
            } else {
                dispatch(setEmergencyDetails({ object: { [name]: { value: formattedValue } } }));
            }
        } else {
            let regex = /\d/;
            let noWhiteSpaceRegex = /^\s|\s/;
            if (
                (regex.test(value) && type == 'text') ||
                (type == 'text' && containsSpecialChars(value)) ||
                (noWhiteSpaceRegex.test(value) && type == 'text')
            ) {
                return;
            }

            if (rules) {
                if (type == 'email') {
                    rules = {
                        ...(value.length !== 0
                            ? { regex: { pattern: /^\S+@\S+\.\S+$/, message: 'Please enter a valid email address' } }
                            : {})
                    };
                }
                const errors = generalValidator.validate(value, rules);
                dispatch(setEmergencyDetails({ object: { [name]: { value, errors, rules } }, index }));
            } else {
                dispatch(setEmergencyDetails({ object: { [name]: { value } }, index }));
            }
        }
    };
    const navigate = useNavigate();
    useEffect(() => {
        if (isMailSent === true) {
            navigate('/patientmanagement');
            dispatch(setIsmailSent(false));
        }
    }, [isMailSent]);

    return (
        <Loadable loadingStates={loadingState.state} loadingMessage={loadingState.message}>
            <div>
                <Heading type={HEADING.H3}> Physician Details</Heading>
                <div className="physician-details-block">
                    <div className="block1">
                        <SelectDropdown
                            type="text"
                            placeHolder={'Please search physicians'}
                            name="patientPhysician"
                            value={patientDropdownDetails.patientPhysician}
                            onSelectCb={(name, selectedOption) => {
                                dispatch(setPatienDetailsDropdown({ name, selectedOption }));
                            }}
                            options={physicians}
                            label="Physician name, Physician ID"
                            onSearchInputChangeCb={(e) => {
                                dispatch(getPhysicians({ name: e?.target?.value }));
                            }}
                            rules={patientDropdownDetails.patientPhysician.rules}
                            errors={patientDropdownDetails.patientPhysician.errors}
                            formSubmitted={physicianFieldTouched}
                            physicians={true}
                        />
                    </div>
                    <div className="block2">
                        <Button
                            type="text"
                            variant={BUTTON_TYPE.PRIMARY}
                            className=""
                            onClickCb={() => {
                                setOpenPhysicianModal(true);
                            }}
                        >
                            Add Physician
                        </Button>
                    </div>
                </div>
            </div>

            <div className="referrral-details mt-5">
                <Heading type={HEADING.H3}> Referral Details</Heading>
                <div className="block1">
                    <div className="block">
                        <TextInput
                            type="text"
                            placeHolder={'Please enter firstname'}
                            name="referral_firstName"
                            label="First Name"
                            onChangeCb={onChangeHandlerForReferral}
                            value={referralDetails.referral_firstName.value}
                            rules={referralDetails.referral_firstName.rules}
                            errors={referralDetails.referral_firstName.errors}
                            formSubmitted={referralDetailsTouched}
                        />
                    </div>
                    <div className="block">
                        <TextInput
                            type="text"
                            placeHolder={'Please enter lastname'}
                            name="referral_lastName"
                            label="Last Name"
                            onChangeCb={onChangeHandlerForReferral}
                            value={referralDetails.referral_lastName.value}
                            rules={referralDetails.referral_lastName.rules}
                            errors={referralDetails.referral_lastName.errors}
                            formSubmitted={referralDetailsTouched}
                        />
                    </div>
                    <div className="block">
                        <TextInput
                            type="email"
                            placeHolder={'Please enter email'}
                            name="referral_email"
                            label="Email"
                            onChangeCb={onChangeHandlerForReferral}
                            value={referralDetails.referral_email.value}
                            rules={referralDetails.referral_email.rules}
                            errors={referralDetails.referral_email.errors}
                            formSubmitted={referralDetailsTouched}
                        />
                    </div>
                </div>
                <div className="block2">
                    <div className="block">
                        <TextInput
                            type="text"
                            placeHolder={'Please enter phone number'}
                            name="referral_phoneNumber"
                            label="Phone No"
                            onChangeCb={onChangeHandlerForReferral}
                            value={referralDetails.referral_phoneNumber.value}
                            rules={referralDetails.referral_phoneNumber.rules}
                            errors={referralDetails.referral_phoneNumber.errors}
                            formSubmitted={referralDetailsTouched}
                        />
                    </div>
                    <div className="block">
                        <GoogleAutoComplete
                            name="referral_addressLine1"
                            label="Address Line 1"
                            placeHolder="Please enter  address line 1"
                            onChangeCb={onChangeHandlerForReferral}
                            value={referralDetails.referral_addressLine1.value}
                            rules={referralDetails.referral_addressLine1.rules}
                            errors={referralDetails.referral_addressLine1.errors}
                            onPlaceSelectedCb={handlePlaceSelect}
                        />
                    </div>
                    <div className="block">
                        <TextInput
                            type="text"
                            placeHolder={'Please enter  address line 2'}
                            name="referral_addressLine2"
                            onChangeCb={onChangeHandlerForReferral}
                            label="Address line 2"
                            value={referralDetails.referral_addressLine2.value}
                            rules={referralDetails.referral_addressLine2.rules}
                            errors={referralDetails.referral_addressLine2.errors}
                            formSubmitted={referralDetailsTouched}
                        />
                    </div>
                </div>
                <div className="address-block">
                    <div className="address">
                        <div className="block">
                            <TextInput
                                type="text"
                                placeHolder={'Please enter  city'}
                                name="referral_city"
                                onChangeCb={onChangeHandlerForReferral}
                                label="City"
                                value={referralDetails.referral_city.value}
                                rules={referralDetails.referral_city.rules}
                                errors={referralDetails.referral_city.errors}
                                formSubmitted={referralDetailsTouched}
                            />
                        </div>
                        <div className="block">
                            <TextInput
                                type="text"
                                placeHolder={'Please enter  state'}
                                // onChangeCb={({ target: { name, value } }) =>
                                //     dispatch(setReferralDetails({ name, value }))
                                // }
                                onChangeCb={onChangeHandlerForReferral}
                                name="referral_state"
                                label="State"
                                value={referralDetails.referral_state.value}
                                rules={referralDetails.referral_state.rules}
                                errors={referralDetails.referral_state.errors}
                                formSubmitted={referralDetailsTouched}
                            />
                        </div>
                        <div className="block">
                            <TextInput
                                type="number"
                                placeHolder={'Please enter  pincode'}
                                name="referral_pinCode"
                                // onChangeCb={({ target: { name, value } }) =>
                                //     dispatch(setReferralDetails({ name, value }))
                                // }
                                onChangeCb={onChangeHandlerForReferral}
                                label="Zip"
                                value={referralDetails.referral_pinCode.value}
                                rules={referralDetails.referral_pinCode.rules}
                                errors={referralDetails.referral_pinCode.errors}
                                formSubmitted={referralDetailsTouched}
                            />
                        </div>
                    </div>
                    <div className="address">
                        <div className="block">
                            <TextInput
                                type="text"
                                placeHolder={'Please enter counrty name'}
                                name="referral_country"
                                // onChangeCb={({ target: { name, value } }) =>
                                //     dispatch(setReferralDetails({ name, value }))
                                // }
                                onChangeCb={onChangeHandlerForReferral}
                                label="Country"
                                value={referralDetails.referral_country.value}
                                rules={referralDetails.referral_country.rules}
                                errors={referralDetails.referral_country.errors}
                                formSubmitted={referralDetailsTouched}
                            />
                        </div>
                        <div className="block"></div>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <Heading type={HEADING.H3}>Patient's Emergency Contact</Heading>
                <div className="guarantor-information-block">
                    <div className="block">
                        <TextInput
                            type="text"
                            placeHolder={'Please enter firstname'}
                            name="guarentorFirstName"
                            // onChangeCb={({ target: { name, value } }) =>
                            //     dispatch(setInsuranceDetails({ name, value }))
                            // }
                            // onChangeCb={({ target: { name, value } }) => dispatch(setEmergencyDetails({ name, value }))}
                            onChangeCb={onChangeHandlerForEmergency}
                            label="FirstName"
                            // value={item.guarentorName.value}
                            value={emergencyDetails.guarentorFirstName.value}
                            rules={emergencyDetails.guarentorFirstName.rules}
                            errors={emergencyDetails.guarentorFirstName.errors}
                            formSubmitted={emergencyDetailsTouched}
                        />
                    </div>
                    <div className="block">
                        <TextInput
                            type="text"
                            placeHolder={'Please enter lastname'}
                            name="guarentorLastName"
                            // onChangeCb={({ target: { name, value } }) =>
                            //     dispatch(setInsuranceDetails({ name, value }))
                            // }
                            // onChangeCb={({ target: { name, value } }) => dispatch(setEmergencyDetails({ name, value }))}
                            onChangeCb={onChangeHandlerForEmergency}
                            label="LastName"
                            // value={item.guarentorName.value}
                            value={emergencyDetails.guarentorLastName.value}
                            rules={emergencyDetails.guarentorLastName.rules}
                            errors={emergencyDetails.guarentorLastName.errors}
                            formSubmitted={emergencyDetailsTouched}
                        />
                    </div>
                    <div className="block">
                        <TextInput
                            type="text"
                            placeHolder={'Please enter phone number'}
                            name="guarentorPhoneNumber"
                            // onChangeCb={({ target: { name, value } }) =>
                            //     dispatch(setInsuranceDetails({ name, value }))
                            // }
                            // onChangeCb={({ target: { name, value } }) => dispatch(setEmergencyDetails({ name, value }))}
                            onChangeCb={(event, rule = { required: true, regex: { pattern: /\b\d{10}\b/, message: 'Please enter 10 digits only' } }) => onChangeHandlerForEmergency(event, rule)}
                            // onChangeCb={onChangeHandler}
                            label="Phone Number"
                            // value={insuranceDetails.guarentorPhoneNumber.value}
                            value={emergencyDetails.guarentorPhoneNumber.value}
                            rules={emergencyDetails.guarentorPhoneNumber.rules}
                            errors={emergencyDetails.guarentorPhoneNumber.errors}
                            formSubmitted={emergencyDetailsTouched}
                        />
                    </div>
                </div>
                <div className="emailblock">
                    <div className="block">
                        <TextInput
                            type="email"
                            placeHolder={'Please enter email'}
                            name="guarentorEmail"
                            // onChangeCb={({ target: { name, value } }) =>
                            //     dispatch(setInsuranceDetails({ name, value }))
                            // }
                            // onChangeCb={({ target: { name, value } }) => dispatch(setEmergencyDetails({ name, value }))}
                            onChangeCb={onChangeHandlerForEmergency}
                            // onChangeCb={onChangeHandler}
                            label="Email"
                            // value={insuranceDetails.guarentorEmail.value}
                            value={emergencyDetails.guarentorEmail.value}
                            rules={emergencyDetails.guarentorEmail.rules}
                            errors={emergencyDetails.guarentorEmail.errors}
                            formSubmitted={emergencyDetailsTouched}
                        />
                    </div>
                    <div className="block">
                        <GoogleAutoComplete
                            name="guarentor_addressLine1"
                            label="Address Line1"
                            placeHolder="Please enter address line 1"
                            onChangeCb={onChangeHandlerForEmergency}
                            value={emergencyDetails.guarentor_addressLine1.value}
                            rules={emergencyDetails.guarentor_addressLine1.rules}
                            errors={emergencyDetails.guarentor_addressLine1.errors}
                            // value={professionalInformation.personalInfo.AddressLine1.value}
                            // rules={professionalInformation.personalInfo.AddressLine1.rules}
                            // errors={professionalInformation.personalInfo.AddressLine1.errors}
                            // formSubmitted={professionalInformation.personalInfoFieldsTouched}
                            onPlaceSelectedCb={handlePlaceSelectForEmergency}
                        />
                    </div>
                    <div className="block">
                        <TextInput
                            type="text"
                            placeHolder={'Please enter address line 2'}
                            name="guarentor_addressLine2"
                            // onChangeCb={({ target: { name, value } }) => dispatch(setEmergencyDetails({ name, value }))}
                            onChangeCb={onChangeHandlerForEmergency}
                            label="Address Line 2"
                            value={emergencyDetails.guarentor_addressLine2.value}
                            rules={emergencyDetails.guarentor_addressLine2.rules}
                            errors={emergencyDetails.guarentor_addressLine2.errors}
                            formSubmitted={emergencyDetailsTouched}
                        />
                    </div>
                </div>
                <div className="address-block">
                    <div className="address">
                        <div className="block">
                            <TextInput
                                type="text"
                                placeHolder={'Please enter city'}
                                name="guarentor_city"
                                // onChangeCb={({ target: { name, value } }) =>
                                //     dispatch(setEmergencyDetails({ name, value }))
                                // }
                                onChangeCb={onChangeHandlerForEmergency}
                                label="City"
                                value={emergencyDetails.guarentor_city.value}
                                rules={emergencyDetails.guarentor_city.rules}
                                errors={emergencyDetails.guarentor_city.errors}
                                formSubmitted={emergencyDetailsTouched}
                            />
                        </div>
                        <div className="block">
                            <TextInput
                                type="text"
                                placeHolder={'Please enter state'}
                                // onChangeCb={({ target: { name, value } }) =>
                                //     dispatch(setEmergencyDetails({ name, value }))
                                // }
                                onChangeCb={onChangeHandlerForEmergency}
                                name="guarentor_state"
                                label="State"
                                value={emergencyDetails.guarentor_state.value}
                                rules={emergencyDetails.guarentor_state.rules}
                                errors={emergencyDetails.guarentor_state.errors}
                                formSubmitted={emergencyDetailsTouched}
                            />
                        </div>
                        <div className="block">
                            <TextInput
                                type="number"
                                placeHolder={'Please enter pincode'}
                                name="guarentor_pinCode"
                                // onChangeCb={({ target: { name, value } }) =>
                                //     dispatch(setEmergencyDetails({ name, value }))
                                // }
                                onChangeCb={onChangeHandlerForEmergency}
                                label="Zip"
                                value={emergencyDetails.guarentor_pinCode.value}
                                rules={emergencyDetails.guarentor_pinCode.rules}
                                errors={emergencyDetails.guarentor_pinCode.errors}
                                formSubmitted={emergencyDetailsTouched}
                            />
                        </div>
                    </div>
                    <div className="address">
                        <div className="block">
                            <TextInput
                                type="text"
                                placeHolder={'Please enter country'}
                                name="guarentor_country"
                                // onChangeCb={({ target: { name, value } }) =>
                                //     dispatch(setEmergencyDetails({ name, value }))
                                // }
                                onChangeCb={onChangeHandlerForEmergency}
                                label="Country"
                                value={emergencyDetails.guarentor_country.value}
                                rules={emergencyDetails.guarentor_country.rules}
                                errors={emergencyDetails.guarentor_country.errors}
                                formSubmitted={emergencyDetailsTouched}
                            />
                        </div>
                        <div className="block"></div>
                        <div className="block"></div>
                    </div>
                </div>
            </div>
            <div className="nextbuttons">
                <Button
                    type={BUTTON_TYPE.LIGHT_WITH_NO_BORDER}
                    className="button-width primary-light-with-border-btn"
                    onClickCb={() => {
                        // dispatch(postServiceDetails(patientId, serviceDetails));
                        // dispatch(getAllPayers({ patientId, activeIndex: 2 }));
                        dispatch(setActiveRefferalPatientIntakeStep(3));
                    }}
                >
                    Back
                </Button>
                <Button
                    type={BUTTON_TYPE.PRIMARY}
                    className="button-width primary-btn"
                    onClickCb={() => {
                        dispatch(setReferralDetailsFieldTouch(true));
                        dispatch(setEmergencyDetailsFieldTouch(true));
                        dispatch(setPhysicianFieldTouched(true));

                        if (
                            !GeneralValidator.validateRequiredFields(emergencyDetails) &&
                            !GeneralValidator.validateRequiredFields(referralDetails) &&
                            !GeneralValidator.validateRequiredFields(patientDropdownDetails.patientPhysician)
                        ) {
                            if (patientDropdownDetails?.patientPhysician.value == '') {
                                toast.error('Please select physician');
                            } else {
                                dispatch(emergencyContact({ agencyId, patientId, emergencyDetails, referralDetails,token }));
                                // dispatch(referralInformation({ agencyId, patientId, referralDetails }));
                                dispatch(patchUpadatePatientById({ patientId, physicianId, agencyId,token }));
                            }
                            // dispatch(setMedicalReportRequestModal(true))
                            // setIsReportModalOpen(true);
                        } else {
                            toast.error('Please enter all the required fields');
                        }
                    }}
                >
                    Next
                </Button>
            </div>
            <BasicModal
                title={'Add Physician'}
                open={openPhysicianModal}
                closeButtonHandler={() => {
                    setOpenPhysicianModal(false);
                    setOpenPhysicianModal(false);
                    dispatch(setIsSingleRecord(false));
                    dispatch(setIsMultiRecord(false));
                    setFirstName('');
                    setLastName('');
                    setNPI('');
                }}
                handleClose={() => {
                    setOpenPhysicianModal(false);
                    setOpenPhysicianModal(false);
                    dispatch(setIsSingleRecord(false));
                    dispatch(setIsMultiRecord(false));
                    setFirstName('');
                    setLastName('');
                    setNPI('');
                }}
                className="add-physician-modal"
                customStyle={{ width: '80%' }}
            >
                <div className="">
                    <div className="fileds">
                        <div className="block">
                            <TextInput
                                type="number"
                                placeHolder={'Please enter physician npi'}
                                name="npi"
                                onChangeCb={(event) => setNPI(event.target.value)}
                                label="NPI ID"
                                value={npi}
                            />
                        </div>
                        <div className="or-block">OR</div>
                        <div className="block me-4">
                            <TextInput
                                type="text"
                                placeHolder={'Please enter physician firstname'}
                                name="firstName"
                                onChangeCb={(event) => setFirstName(event.target.value)}
                                label="Physician's Firstname"
                                value={physicianFirstName}
                            />
                        </div>
                        <div className="block">
                            <TextInput
                                type="text"
                                placeHolder={'Please enter physician lastname'}
                                name="lastName"
                                onChangeCb={(event) => setLastName(event.target.value)}
                                label="Physician's Lastname"
                                value={physicianLastName}
                            />
                        </div>
                        <div className="button">
                            <Button
                                type={BUTTON_TYPE.PRIMARY}
                                onClickCb={() => {
                                    dispatch(
                                        getPhysicianByNameOrNumber({ npi, physicianFirstName, physicianLastName })
                                    );
                                }}
                            >
                                Verify
                            </Button>
                        </div>
                    </div>

                    <>
                        <div>
                            {isMultiRecord && !isSingleRecord && (
                                <div>
                                    <RichGrid
                                        data={physician}
                                        columns={ASSIGN_MEMBER_COLUMNS}
                                        // selectable={true}
                                        // isAllSelectable={false}
                                        extractRowKey={(row) => row.number}
                                        onSelectionChangeCallBack={(selectedData) => setSelectedRow(selectedData)}
                                        onHeaderSelectionChangeCallBack={(selectedData) => setSelectedRow(selectedData)}
                                        selectedRows={selectedRow}
                                    />
                                </div>
                            )}
                        </div>
                        {isSingleRecord && (
                            <div className="extraFields">
                                <div>
                                    <Heading>Primary Addresss</Heading>
                                    <div className="block">
                                        <div>
                                            <TextInput
                                                type="text"
                                                placeHolder={'Please enter  Address Line 1'}
                                                name="addressLine1"
                                                onChangeCb={onChangeHandler}
                                                label="Address Line 1"
                                                value={createPhysician?.primaryAddress?.addressLine1?.value}
                                                rules={createPhysician?.primaryAddress?.addressLine1?.rules}
                                                errors={createPhysician?.primaryAddress?.addressLine1.errors}
                                                formSubmitted={isCreatePhysicianFieldTouch}
                                            />
                                        </div>
                                        <div>
                                            <TextInput
                                                type="text"
                                                placeHolder={'Please enter  Address Line 2'}
                                                name="addressLine2"
                                                onChangeCb={onChangeHandler}
                                                label="Address Line 2"
                                                value={createPhysician?.primaryAddress?.addressLine2?.value}
                                            />
                                        </div>
                                        <div>
                                            <TextInput
                                                type="text"
                                                placeHolder={'Please enter city'}
                                                name="city"
                                                onChangeCb={onChangeHandler}
                                                label="City"
                                                value={createPhysician?.primaryAddress?.city?.value}
                                                rules={createPhysician?.primaryAddress?.city?.rules}
                                                formSubmitted={isCreatePhysicianFieldTouch}
                                            />
                                        </div>
                                    </div>
                                    <div className="block">
                                        <div>
                                            <TextInput
                                                type="text"
                                                placeHolder={'Please enter state'}
                                                name="state"
                                                onChangeCb={onChangeHandler}
                                                label="State"
                                                value={createPhysician?.primaryAddress?.state?.value}
                                                rules={createPhysician?.primaryAddress?.state?.rules}
                                                formSubmitted={isCreatePhysicianFieldTouch}
                                            />
                                        </div>
                                        <div>
                                            <TextInput
                                                type="text"
                                                placeHolder={'Please enter pincode'}
                                                name="pinCode"
                                                onChangeCb={onChangeHandler}
                                                label="Zip"
                                                value={createPhysician?.primaryAddress?.pinCode?.value}
                                                rules={createPhysician?.primaryAddress?.pinCode?.rules}
                                                formSubmitted={isCreatePhysicianFieldTouch}
                                            />
                                        </div>
                                        <div>
                                            <TextInput
                                                type="text"
                                                placeHolder={'Please enter country'}
                                                name="country"
                                                onChangeCb={onChangeHandler}
                                                label="Country"
                                                value={createPhysician?.primaryAddress?.country?.value}
                                                rules={createPhysician?.primaryAddress?.country?.rules}
                                                formSubmitted={isCreatePhysicianFieldTouch}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Heading>Mailing Addresss</Heading>
                                    <div className="block">
                                        <div>
                                            <TextInput
                                                type="text"
                                                placeHolder={'Please enter Address Line 1'}
                                                name="addressLine1"
                                                onChangeCb={onChangeHandler}
                                                label="Address Line 1"
                                                value={createPhysician?.mailingAddress?.addressLine1?.value}
                                                rules={createPhysician?.mailingAddress?.addressLine1?.rules}
                                                formSubmitted={isCreatePhysicianFieldTouch}
                                            />
                                        </div>
                                        <div>
                                            <TextInput
                                                type="text"
                                                placeHolder={'Please enter Address Line 2'}
                                                name="addressLine2"
                                                onChangeCb={onChangeHandler}
                                                label="Address Line 2"
                                                value={createPhysician?.mailingAddress?.addressLine2?.value}
                                            />
                                        </div>
                                        <div>
                                            <TextInput
                                                type="text"
                                                placeHolder={'Please enter city'}
                                                name="city"
                                                onChangeCb={onChangeHandler}
                                                label="City"
                                                value={createPhysician?.mailingAddress?.city?.value}
                                                rules={createPhysician?.mailingAddress?.city?.rules}
                                                formSubmitted={isCreatePhysicianFieldTouch}
                                            />
                                        </div>
                                    </div>
                                    <div className="block">
                                        <div>
                                            <TextInput
                                                type="text"
                                                placeHolder={'Please enter state'}
                                                name="state"
                                                onChangeCb={onChangeHandler}
                                                label="State"
                                                value={createPhysician?.mailingAddress?.state?.value}
                                                rules={createPhysician?.mailingAddress?.state?.rules}
                                                formSubmitted={isCreatePhysicianFieldTouch}
                                            />
                                        </div>
                                        <div>
                                            <TextInput
                                                type="text"
                                                placeHolder={'Please enter pincode'}
                                                name="pinCode"
                                                onChangeCb={onChangeHandler}
                                                label="Zip"
                                                value={createPhysician?.mailingAddress?.pinCode?.value}
                                                rules={createPhysician?.mailingAddress?.pinCode?.rules}
                                                formSubmitted={isCreatePhysicianFieldTouch}
                                            />
                                        </div>
                                        <div>
                                            <TextInput
                                                type="text"
                                                placeHolder={'Please enter country'}
                                                name="country"
                                                onChangeCb={onChangeHandler}
                                                label="Country"
                                                value={createPhysician?.mailingAddress?.country?.value}
                                                rules={createPhysician?.mailingAddress?.country?.rules}
                                                formSubmitted={isCreatePhysicianFieldTouch}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="block">
                                    <div>
                                        <TextInput
                                            type="text"
                                            placeHolder={'Please Provide Primary Email Address'}
                                            name="primaryEmail"
                                            onChangeCb={onChangeHandler}
                                            label="Primary Email"
                                            value={createPhysician?.primaryEmail?.value}
                                            rules={createPhysician?.primaryEmail?.rules}
                                            formSubmitted={isCreatePhysicianFieldTouch}
                                        />
                                    </div>
                                    <div>
                                        <TextInput
                                            type="text"
                                            placeHolder={'Please Provide Secondary Email Address'}
                                            name="secondaryEmail"
                                            onChangeCb={onChangeHandler}
                                            label="Secondary Email"
                                            value={createPhysician?.secondaryEmail?.value}
                                        />
                                    </div>
                                    <div>
                                        <TextInput
                                            type="text"
                                            placeHolder={'Please Provide Contact Number'}
                                            name="contactNumber"
                                            onChangeCb={onChangeHandler}
                                            label="Contact"
                                            value={createPhysician?.contactNumber?.value}
                                            rules={createPhysician?.contactNumber?.rules}
                                            formSubmitted={isCreatePhysicianFieldTouch}
                                        />
                                    </div>{' '}
                                </div>
                                <div className="block">
                                    <div>
                                        <TextInput
                                            type="text"
                                            placeHolder={'Please Provide Fax Number'}
                                            name="fax"
                                            onChangeCb={onChangeHandler}
                                            label="Fax"
                                            value={createPhysician?.fax?.value}
                                            rules={createPhysician?.fax?.rules}
                                            formSubmitted={isCreatePhysicianFieldTouch}
                                        />
                                    </div>
                                    <div className="">
                                        <TextInput
                                            type="text"
                                            placeHolder={''}
                                            name="status"
                                            onChangeCb={onChangeHandler}
                                            label="Status"
                                            value={createPhysician?.status?.value}
                                        />
                                    </div>
                                    <div>
                                        <TextInput
                                            type="text"
                                            placeHolder={''}
                                            name="npi"
                                            onChangeCb={onChangeHandler}
                                            label="NPI"
                                            value={createPhysician?.NPI?.value}
                                            rules={createPhysician?.NPI?.rules}
                                            formSubmitted={isCreatePhysicianFieldTouch}
                                        />
                                    </div>
                                </div>
                                <div className="submit-button">
                                    {/* <Button
                                        className="mt-4"
                                        onClickCb={() => {
                                            setOpenPhysicianModal(true);
                                            dispatch(setIsSingleRecord(false));
                                            dispatch(setIsMultiRecord(true));
                                        }}
                                    >
                                        Back
                                    </Button> */}
                                    <Button
                                        className="mt-4"
                                        onClickCb={() => {
                                            dispatch(setIsCreatePhysicianFieldTouch(true));
                                            if (createPhysician.primaryEmail.value.length === 0) {
                                                toast.error(`Please Provide Primary Email`);
                                                return;
                                            }
                                            if (createPhysician.fax.value.length === 0) {
                                                toast.error(`Please Provide Fax`);
                                                return;
                                            }
                                            if (
                                                !GeneralValidator.validateRequiredFields(
                                                    createPhysician.mailingAddress
                                                ) &&
                                                !GeneralValidator.validateRequiredFields(createPhysician.primaryAddress)
                                            ) {
                                                dispatch(postPhysician({ createPhysician, token }));
                                                setOpenPhysicianModal(false);
                                                dispatch(setIsSingleRecord(false));
                                                dispatch(setIsMultiRecord(false));
                                                setFirstName('');
                                                setLastName('');
                                                setNPI('');
                                            }
                                        }}
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        className="mt-4 me-5"
                                        onClickCb={() => {
                                            setOpenPhysicianModal(false);
                                            dispatch(setIsSingleRecord(false));
                                            dispatch(setIsMultiRecord(false));
                                            setFirstName('');
                                            setLastName('');
                                            setNPI('');
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        )}
                    </>
                    {/* })} */}
                </div>
            </BasicModal>
            <BasicModal
                open={medicalReportRequestModal}
                closeButtonHandler={() => {
                    // setIsReportModalOpen(false);
                    dispatch(setMedicalReportRequestModal(false));
                }}
                handleClose={() => {
                    // setIsReportModalOpen(false);
                    dispatch(setMedicalReportRequestModal(false));
                }}
                title={'Physician Order Request'}
            >
                <p>Submitted information will be sent to the respective physician to generate the Physician Order.</p>
                <p>Select the Medium below to send</p>
                <div className="report-modal-buttons">
                    <Button
                        onClickCb={() => {
                            dispatch(
                                postSendEmail({
                                    patientId,
                                    personalDetails,
                                    agencyId,
                                    patientDropdownDetails,
                                    physicianDetails,
                                    token
                                })
                            );
                            // setIsReportModalOpen(false);
                            dispatch(setMedicalReportRequestModal(false));
                        }}
                    >
                        Via Mail
                    </Button>
                    <Button onClickCb={() => {}} disabled>
                        Via Fax
                    </Button>
                </div>
            </BasicModal>
        </Loadable>
    );
};
export default AddNewPhysician;
