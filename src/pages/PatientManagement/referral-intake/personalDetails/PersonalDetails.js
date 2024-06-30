import React, { useEffect, useState } from 'react';
import Button from '../../../../components/button/Button';
import { BUTTON_TYPE } from '../../../../libs/constant';
import Heading from '../../../../components/heading/Heading';
import { HEADING } from '../../../../components/heading/constants/constants';
import TextInput from '../../../../components/input/textinput/TextInput';
import TextArea from '../../../../components/input/textarea/TextArea';
import { useDispatch, useSelector } from 'react-redux';
import {
    componentKey,
    setMultiplePersonalDetails,
    setPersonalDetailsFieldsTouched,
    setAutoCompleteAddressFields,
    setAutoCompleteAddressFieldsInPatientManagement
} from '../PatientManagementSlice';
import CheckboxWLabel from '../../../../components/checkbox/checkboxwlabel/CheckboxWLabel';
import { postPersonalDetails } from '../PatientManagementSaga';
import GeneralValidator, { generalValidator } from '../../../../libs/utility/validators/GeneralValidator';
import DatePicker from '../../../../components/datePicker/DatePicker';
import { toast } from 'react-toastify';
import General from '../../../../libs/utility/General';
import GoogleAutoComplete from '../../../../components/googleAutoComplete/GoogleAutoComplete';
import SelectDropdown from '../../../../components/select/Select';
const PersonalDetails = () => {
    const { personalDetails, physicianDetails, patientDropdownDetails, personalDetailsFieldTouched, patientId } =
        useSelector((state) => state[componentKey]);
    const agencyId = General.getLocalStorageData('agencyId');
    const token = General.getLocalStorageData('token');

    // const patientId = General.getLocalStorageData('patientId');
    const race = [
        { label: 'White', value: 'White' },
        { label: 'Black or African American', value: 'Black or African American' },
        { label: 'American Indian or Alaska Native', value: 'American Indian or Alaska Native' },
        { label: 'Asian', value: 'Asian' },
        { label: 'Native Hawaiian or Other Pacific Islander', value: 'Native Hawaiian or Other Pacific Islander' },
        { label: 'Hispanic or Latino', value: 'Hispanic or Latino' },
        { label: 'UK - Unknown', value: 'UK - Unknown' }
    ];

    const gender = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' }
    ];

    const dispatch = useDispatch();

    function containsSpecialChars(str) {
        var specialChars = /[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/;
        return specialChars.test(str);
    }

    const onChangeHandler = (event, rules) => {
        const { name, value, type } = event.target;
        
        if (name === 'phoneNumber') {
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
                dispatch(setMultiplePersonalDetails({ object: { [name]: { value: formattedValue, errors, rules } } }));
            } else {
                dispatch(setMultiplePersonalDetails({ object: { [name]: { value: formattedValue } } }));
            }
        } else {
            let regex = /\d/;
            let noWhiteSpaceRegex = /^\s|\s/;
            let alphanumericRegex = /^[a-zA-Z0-9-]+$/;

            if (name === 'pinCode') {
                if (
                    (type === 'text' && alphanumericRegex.test(value)) ||
                    (noWhiteSpaceRegex.test(value) && type === 'text')
                ) {
                    if (rules) {
                        const errors = generalValidator.validate(value, rules);
                        dispatch(setMultiplePersonalDetails({ object: { [name]: { value, errors, rules } } }));
                    } else {
                        dispatch(setMultiplePersonalDetails({ object: { [name]: { value } } }));
                    }
                }
            }
            if (name === 'HICNumber') {
                if (value === '' || (value.length === 11 && /^[a-zA-Z0-9]+$/.test(value))) {
                    if (rules) {
                        const errors = generalValidator.validate(value, rules);
                        dispatch(setMultiplePersonalDetails({ object: { [name]: { value, errors, rules } } }));
                    } else {
                        dispatch(setMultiplePersonalDetails({ object: { [name]: { value } } }));
                    }
                } else {
                    const errors = { length: 'HIC Number must be 11 characters' };
                    dispatch(setMultiplePersonalDetails({ object: { [name]: { value, errors, rules } } }));
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
                

                if (name == 'ssn') {
                    rules = {
                        ...(value.length !== 0
                            ? { regex: { pattern: /\b\d{9}\b/, message: 'Please enter 9 digits only' } }
                            : {})
                    };
                }

                if (name == 'mrn') {
                    rules = {
                        ...(value.length !== 0
                            ? { regex: { pattern: /\b\d{7}\b/, message: 'Please enter 7 digits only' } }
                            : {})
                    };
                }

                if (name == 'email') {
                    rules = {
                        ...(value.length !== 0
                            ? { regex: { pattern: /^\S+@\S+\.\S+$/, message: 'Please enter a valid email address' } }
                            : {})
                    };
                }

                const errors = generalValidator.validate(value, rules);

                dispatch(
                    setMultiplePersonalDetails({
                        object: { [name]: { value, errors, rules } }
                    })
                );
            } else {
                dispatch(setMultiplePersonalDetails({ object: { [name]: { value } } }));
            }
        }
    };

    const handlePlaceSelect = (place) => {
        const mappingKey = {
            addressLine2: { type: 'locality', required: false },
            // Landmark: { type: "administrative_area_level_3", required: true },
            city: { type: 'administrative_area_level_2', required: true },
            state: { type: 'administrative_area_level_1', required: true },
            country: { type: 'country', required: true },
            pinCode: { type: 'postal_code', required: true }
        };

        const result = General.mapAddressToStates(place.address_components, mappingKey);
        dispatch(
            setMultiplePersonalDetails({
                object: { addressLine1: { value: place.formatted_address.split(',')[0] } },
                filedName: 'personalDetails'
            })
        );
        dispatch(setAutoCompleteAddressFieldsInPatientManagement(result));
    };

    return (
        <div className="personal-information">
            <div className="">
                <Heading type={HEADING.H3}>Patient</Heading>

                <div className="name-block">
                    <div className="block">
                        <TextInput
                            type="text"
                            placeHolder={'Please enter firstname'}
                            name="firstName"
                            label="First Name"
                            onChangeCb={onChangeHandler}
                            value={personalDetails.firstName.value}
                            rules={personalDetails.firstName.rules}
                            errors={personalDetails.firstName.errors}
                            formSubmitted={personalDetailsFieldTouched}
                        />
                    </div>
                    <div className="block">
                        <TextInput
                            type="text"
                            placeHolder={'Please enter lastname'}
                            // onChangeCb={({ target: { name, value } }) => dispatch(setPersonalDetails({ name, value }))}
                            name="lastName"
                            label="Last Name"
                            onChangeCb={onChangeHandler}
                            value={personalDetails.lastName.value}
                            rules={personalDetails.lastName.rules}
                            errors={personalDetails.lastName.errors}
                            formSubmitted={personalDetailsFieldTouched}
                        />
                    </div>
                    <div className="block">
                        <SelectDropdown
                            placeHolder={'Please select gender'}
                            name="gender"
                            onChangeCb={onChangeHandler}
                            options={gender}
                            label="Gender"
                            value={personalDetails.gender.value}
                            rules={personalDetails.gender.rules}
                            errors={personalDetails.gender.errors}
                            formSubmitted={personalDetailsFieldTouched}
                            defaultValue={
                                personalDetails.gender.value.length ? { label: personalDetails.gender.value } : ''
                            }
                        />
                    </div>
                </div>
                <div className="contact-info-block">
                    <div className="block">
                        <TextInput
                            type="email"
                            placeHolder={'Please enter email'}
                            name="email"
                            onChangeCb={onChangeHandler}
                            label="Email"
                            value={personalDetails.email.value}
                            rules={personalDetails.email.rules}
                            errors={personalDetails.email.errors}
                            formSubmitted={personalDetailsFieldTouched}
                        />
                    </div>{' '}
                    <div className="block">
                        <TextInput
                            type="text"
                            placeHolder={'Please enter phone number'}
                            name="phoneNumber"
                            label="Phone No"
                            onChangeCb={onChangeHandler}
                            value={personalDetails.phoneNumber.value}
                            rules={personalDetails.phoneNumber.rules}
                            errors={personalDetails.phoneNumber.errors}
                            formSubmitted={personalDetailsFieldTouched}
                        />
                    </div>
                    <div className="block">
                        <SelectDropdown
                            placeHolder={'Please select race'}
                            name="race"
                            onChangeCb={onChangeHandler}
                            options={race}
                            label="Race"
                            value={personalDetails.race.value}
                            rules={personalDetails.race.rules}
                            errors={personalDetails.race.errors}
                            formSubmitted={personalDetailsFieldTouched}
                            defaultValue={
                                personalDetails.race.value.length ? { label: personalDetails.race.value } : ''
                            }
                        />
                    </div>
                </div>
                <div className="race-date-block">
                    <div className="block">
                        <DatePicker
                            label="Date Of Birth"
                            name="dateOfBirth"
                            onChangeCb={onChangeHandler}
                            value={personalDetails.dateOfBirth.value}
                            rules={personalDetails.dateOfBirth.rules}
                            errors={personalDetails.dateOfBirth.errors}
                            formSubmitted={personalDetailsFieldTouched}
                            maxDate={new Date()}
                        />
                    </div>
                    <div className="block">
                        <TextInput
                            type="text"
                            placeHolder={'Please enter Diagnosis: for EX:Diabetes mellitus, steoarthritis '}
                            name="diseases"
                            onChangeCb={onChangeHandler}
                            label="Diagnosis"
                            value={personalDetails.diseases.value}
                        />
                    </div>
                    <div className="block"></div>
                </div>

                <div className="address-block">
                    <div className="address">
                        <div className="block">
                            <GoogleAutoComplete
                                name="addressLine1"
                                label="Address Line 1"
                                placeHolder="Please enter address line 1"
                                onChangeCb={onChangeHandler}
                                value={personalDetails.addressLine1.value}
                                rules={personalDetails.addressLine1.rules}
                                errors={personalDetails.addressLine1.errors}
                                formSubmitted={personalDetailsFieldTouched}
                                onPlaceSelectedCb={handlePlaceSelect}
                            />
                        </div>
                        <div className="block">
                            <TextInput
                                type="text"
                                placeHolder={'Please enter address line 2'}
                                name="addressLine2"
                                onChangeCb={onChangeHandler}
                                label="Address Line 2"
                                value={personalDetails.addressLine2.value}
                                rules={personalDetails.addressLine2.rules}
                                errors={personalDetails.addressLine2.errors}
                                formSubmitted={personalDetailsFieldTouched}
                            />
                        </div>
                        <div className="block">
                            <TextInput
                                type="text"
                                placeHolder={'Please enter city'}
                                name="city"
                                onChangeCb={onChangeHandler}
                                label="City"
                                value={personalDetails.city.value}
                                rules={personalDetails.city.rules}
                                errors={personalDetails.city.errors}
                                formSubmitted={personalDetailsFieldTouched}
                            />
                        </div>
                    </div>
                    <div className="address">
                        <div className="block">
                            <TextInput
                                type="text"
                                placeHolder={'Please enter state'}
                                onChangeCb={onChangeHandler}
                                name="state"
                                label="State"
                                value={personalDetails.state.value}
                                rules={personalDetails.state.rules}
                                errors={personalDetails.state.errors}
                                formSubmitted={personalDetailsFieldTouched}
                            />
                        </div>
                        <div className="block">
                            <TextInput
                                type="text"
                                placeHolder={'Please enter zip'}
                                name="pinCode"
                                onChangeCb={onChangeHandler}
                                label="Zip"
                                value={personalDetails.pinCode.value}
                                rules={personalDetails.pinCode.rules}
                                errors={personalDetails.pinCode.errors}
                                formSubmitted={personalDetailsFieldTouched}
                            />
                        </div>
                        <div className="block">
                            <TextInput
                                type="text"
                                placeHolder={'Please enter country'}
                                name="country"
                                onChangeCb={onChangeHandler}
                                label="Country"
                                value={personalDetails.country.value}
                                rules={personalDetails.country.rules}
                                errors={personalDetails.country.errors}
                                formSubmitted={personalDetailsFieldTouched}
                            />
                        </div>
                    </div>
                </div>

                <div className="checkbox-container">
                    <CheckboxWLabel
                        checked={personalDetails?.isSameBillingAddress?.value ? false : true}
                        label="Add Another Address"
                        onChangeCb={(event) => {
                            dispatch(
                                setMultiplePersonalDetails({
                                    object: {
                                        [event.target.name]: { value: !personalDetails.isSameBillingAddress.value }
                                    }
                                })
                            );
                        }}
                        name="isSameBillingAddress"
                        value={personalDetails?.isSameBillingAddress?.value}
                    />
                </div>
                {!personalDetails?.isSameBillingAddress?.value && (
                    <div className="address-block">
                        <div className="address">
                            <div className="block">
                                <TextInput
                                    type="text"
                                    placeHolder={'Please enter address'}
                                    name="billingAddress_line1"
                                    onChangeCb={onChangeHandler}
                                    label="Address line 1"
                                    value={personalDetails.billingAddress_line1.value}
                                />
                            </div>
                            <div className="block">
                                <TextInput
                                    type="text"
                                    placeHolder={'Please enter address line 2'}
                                    name="billingAddress_line2"
                                    onChangeCb={onChangeHandler}
                                    label="Address Line 2"
                                    value={personalDetails.billingAddress_line2.value}
                                />
                            </div>
                            <div className="block">
                                <TextInput
                                    type="text"
                                    placeHolder={'Please enter city'}
                                    name="billingAddress_city"
                                    onChangeCb={onChangeHandler}
                                    label="City"
                                    value={personalDetails.billingAddress_city.value}
                                />
                            </div>
                        </div>
                        <div className="address">
                            <div className="block">
                                <TextInput
                                    type="text"
                                    placeHolder={'Please enter state'}
                                    onChangeCb={onChangeHandler}
                                    name="billingAddress_state"
                                    label="State"
                                    value={personalDetails.billingAddress_state.value}
                                />
                            </div>
                            <div className="block">
                                <TextInput
                                    type="text"
                                    placeHolder={'Please enter zip'}
                                    name="billingAddress_pinCode"
                                    onChangeCb={onChangeHandler}
                                    label="Zip"
                                    value={personalDetails.billingAddress_pinCode.value}
                                />
                            </div>
                            <div className="block">
                                <TextInput
                                    type="text"
                                    placeHolder={'Please enter country'}
                                    name="billingAddress_country"
                                    onChangeCb={onChangeHandler}
                                    label="Country"
                                    value={personalDetails.billingAddress_country.value}
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div className="hic-ssn-number">
                    <div className="block">
                        <TextInput
                            type="text"
                            placeHolder={'Please enter HIC Number'}
                            name="HICNumber"
                            onChangeCb={onChangeHandler}
                            label="HIC"
                            value={personalDetails.HICNumber.value}
                            rules={personalDetails.HICNumber.rules}
                            errors={personalDetails.HICNumber.errors}
                            formSubmitted={personalDetailsFieldTouched}
                        />
                    </div>{' '}
                    <div className="block">
                        <TextInput
                            type="number"
                            placeHolder={'Please enter SSN'}
                            name="ssn"
                            onChangeCb={onChangeHandler}
                            label="SSN"
                            // onWheel={(e) => e.preventDefault()}
                            // handleKeyPress={(e) => e.preventDefault()}

                            value={personalDetails.ssn.value}
                            rules={personalDetails.ssn.rules}
                            errors={personalDetails.ssn.errors}
                            formSubmitted={personalDetailsFieldTouched}
                        />
                    </div>
                    <div className="block">
                        <TextInput
                            type="number"
                            placeHolder={'Please enter MRN'}
                            name="mrn"
                            onChangeCb={onChangeHandler}
                            label="MRN"
                            value={personalDetails.mrn.value}
                            rules={personalDetails.mrn.rules}
                            errors={personalDetails.mrn.errors}
                            formSubmitted={personalDetailsFieldTouched}
                        />
                    </div>
                </div>
            </div>

            <div>
                <Button
                    type={BUTTON_TYPE.PRIMARY}
                    className="button-width primary-btn"
                    onClickCb={() => {
                        dispatch(setPersonalDetailsFieldsTouched(true));
                        if (!GeneralValidator.validateRequiredFields(personalDetails)) {
                            dispatch(
                                postPersonalDetails({
                                    personalDetails,
                                    agencyId,
                                    patientDropdownDetails,
                                    physicianDetails,
                                    patientId,
                                    token
                                    // activeIndex: 0
                                })
                            );
                        } else {
                            toast.error('Please enter all the required fields');
                        }
                    }}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};
export default PersonalDetails;
