import React, { useEffect } from 'react'

import TextInput from '../../../../../components/input/textinput/TextInput'
import ResponsiveBox from '../../../../../components/responsivebox/ResponsiveBox'
import Heading from "../../../../../components/heading/Heading"
import Questionnaire from '../../../../../components/questionnaire/Questionnaire'
import GoogleAutoComplete from '../../../../../components/googleAutoComplete/GoogleAutoComplete'
import General from '../../../../../libs/utility/General'
import DatePicker from '../../../../../components/datePicker/DatePicker'

import { HEADING } from '../../../../../components/heading/constants/constants'
import { componentKey, setAutoCompleteAddressFields, setPersonalInformation, setProfessionalDetails } from '../ProfessionalInformationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setPersonalInformationQuestions } from '../ProfessionalInformationSlice'
import { generalValidator } from "../../../../../libs/utility/validators/GeneralValidator"
import { useLocation } from 'react-router-dom'

const PersonalInformation = ({ activeIndex }) => {

    const dispatch = useDispatch()

    const { questionnaires, professionalInformation, userDetailsById } = useSelector(state => state[componentKey])

    function containsSpecialChars(str) {
        var specialChars = /[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/
        return specialChars.test(str);
    }

    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

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
                dispatch(setPersonalInformation({ object: { [name]: { value:formattedValue, errors, rules } }, filedName: "personalInfo" }));
            } else {
                dispatch(setPersonalInformation({ object: { [name]: { value:formattedValue } }, filedName: "personalInfo" }));
            }
        }else{
            let regex = /\d/

            if ((regex.test(value) && type == "text") || (type == "text" && containsSpecialChars(value))) {
                return
            }

            if (rules) {
                const errors = generalValidator.validate(value, rules);
                dispatch(setPersonalInformation({ object: { [name]: { value, errors, rules } }, filedName: "personalInfo" }));
            } else {
                dispatch(setPersonalInformation({ object: { [name]: { value } }, filedName: "personalInfo" }));
            }
      
        }
    };

    const handlePlaceSelect = (place) => {
        const mappingKey = {
            AddressLine2: { type: "locality", required: false },
            // Landmark: { type: "administrative_area_level_3", required: true },
            City: { type: "administrative_area_level_2", required: true },
            State: { type: "administrative_area_level_1", required: true },
            Country: { type: "country", required: true },
            ZipCode: { type: "postal_code", required: true },
        };

        const result = General.mapAddressToStates(place.address_components, mappingKey)
        dispatch(setPersonalInformation({ object: { "AddressLine1": { value: place.formatted_address.split(",")[0] } }, filedName: "personalInfo" }));
        dispatch(setAutoCompleteAddressFields(result))
    }

    return (
        <React.Fragment>
            <Heading type={HEADING.H3}>Personal Information :</Heading>
            <ResponsiveBox>
                <TextInput
                    type='text'
                    placeHolder={'Please enter first name'}
                    name='FirstName'
                    onChangeCb={onChangeHandler}
                    label='First Name'
                    value={professionalInformation.personalInfo.FirstName.value}
                    rules={professionalInformation.personalInfo.FirstName.rules}
                    errors={professionalInformation.personalInfo.FirstName.errors}
                    formSubmitted={professionalInformation.personalInfoFieldsTouched}
                />

                <TextInput
                    type='text'
                    placeHolder={'Please enter middle name'}
                    name='MiddleName'
                    onChangeCb={onChangeHandler}
                    label='Middle Name'
                    value={professionalInformation.personalInfo.MiddleName.value}
                    rules={professionalInformation.personalInfo.MiddleName.rules}
                    errors={professionalInformation.personalInfo.MiddleName.errors}
                    formSubmitted={professionalInformation.personalInfoFieldsTouched}
                />

                <TextInput
                    type='text'
                    placeHolder={'Please enter last Name'}
                    name='LastName'
                    onChangeCb={onChangeHandler}
                    label='Last Name'
                    value={professionalInformation.personalInfo.LastName.value}
                    rules={professionalInformation.personalInfo.LastName.rules}
                    errors={professionalInformation.personalInfo.LastName.errors}
                    formSubmitted={professionalInformation.personalInfoFieldsTouched}
                />

                <TextInput
                    type='text'
                    placeHolder={'Please enter telephone number'}
                    name='TelephoneNumber'
                    onChangeCb={(event, rule = { required: true, regex: { pattern: /\b\d{10}\b/, message: 'Please enter 10 digits only' } }) => onChangeHandler(event, rule)}
                    label='Phone Number'
                    value={professionalInformation.personalInfo.TelephoneNumber.value}
                    rules={professionalInformation.personalInfo.TelephoneNumber.rules}
                    errors={professionalInformation.personalInfo.TelephoneNumber.errors}
                    formSubmitted={professionalInformation.personalInfoFieldsTouched}
                />

                <TextInput
                    type='email'
                    placeHolder={'Please enter email'}
                    name='EmailID'
                    onChangeCb={(event, rule) => onChangeHandler(event, rule)}
                    label='Email ID'
                    value={professionalInformation.personalInfo.EmailID.value}
                    rules={professionalInformation.personalInfo.EmailID.rules}
                    errors={professionalInformation.personalInfo.EmailID.errors}
                    formSubmitted={professionalInformation.personalInfoFieldsTouched}
                />

                <DatePicker
                    label="Date of Birth"
                    onChangeCb={onChangeHandler}
                    name='DateOfBirth'
                    value={professionalInformation.personalInfo.DateOfBirth.value}
                    rules={professionalInformation.personalInfo.DateOfBirth.rules}
                    errors={professionalInformation.personalInfo.DateOfBirth.errors}
                    formSubmitted={professionalInformation.personalInfoFieldsTouched}
                    maxDate={new Date()}
                />

                <TextInput
                    type='number'
                    placeHolder={'Please enter SSN number'}
                    name='SSN'
                    onChangeCb={(event, rule) => onChangeHandler(event, rule)}
                    label='SSN'
                    value={professionalInformation.personalInfo.SSN.value}
                    rules={professionalInformation.personalInfo.SSN.rules}
                    errors={professionalInformation.personalInfo.SSN.errors}
                    formSubmitted={professionalInformation.personalInfoFieldsTouched}
                />
            </ResponsiveBox>

            <Questionnaire compulsory={true} questions={questionnaires} onChangeCb={(checked, parentIndex, childIndex) => dispatch(setPersonalInformationQuestions({ checked, parentIndex, childIndex }))} />

            <Heading type={HEADING.H3}>Address :</Heading>
            <ResponsiveBox>
                <GoogleAutoComplete
                    name='AddressLine1'
                    label='Address Line 1'
                    placeHolder='Please enter address'
                    onChangeCb={onChangeHandler}
                    value={professionalInformation.personalInfo.AddressLine1.value}
                    rules={professionalInformation.personalInfo.AddressLine1.rules}
                    errors={professionalInformation.personalInfo.AddressLine1.errors}
                    formSubmitted={professionalInformation.personalInfoFieldsTouched}
                    onPlaceSelectedCb={handlePlaceSelect}
                />
                <TextInput
                    type='text'
                    placeHolder={'Please enter address line 2'}
                    name='AddressLine2'
                    onChangeCb={onChangeHandler}
                    label='Address Line 2'
                    value={professionalInformation.personalInfo.AddressLine2.value}
                    rules={professionalInformation.personalInfo.AddressLine2.rules}
                    errors={professionalInformation.personalInfo.AddressLine2.errors}
                    formSubmitted={professionalInformation.personalInfoFieldsTouched}
                />

                {/* <TextInput
                    type='text'
                    placeHolder={'Please enter Landmark name'}
                    name='Landmark'
                    onChangeCb={onChangeHandler}
                    label='Landmark'
                    value={professionalInformation.personalInfo.Landmark.value}
                    rules={professionalInformation.personalInfo.Landmark.rules}
                    errors={professionalInformation.personalInfo.Landmark.errors}
                    formSubmitted={professionalInformation.personalInfoFieldsTouched}
                /> */}

                <TextInput
                    type='text'
                    placeHolder={'Please enter city name'}
                    name='City'
                    onChangeCb={onChangeHandler}
                    label='City'
                    value={professionalInformation.personalInfo.City.value}
                    rules={professionalInformation.personalInfo.City.rules}
                    errors={professionalInformation.personalInfo.City.errors}
                    formSubmitted={professionalInformation.personalInfoFieldsTouched}
                />

                <TextInput
                    type='text'
                    placeHolder={'Please enter state name'}
                    name='State'
                    onChangeCb={onChangeHandler}
                    label='State'
                    value={professionalInformation.personalInfo.State.value}
                    rules={professionalInformation.personalInfo.State.rules}
                    errors={professionalInformation.personalInfo.State.errors}
                    formSubmitted={professionalInformation.personalInfoFieldsTouched}
                />

                <TextInput
                    type='text'
                    placeHolder={'Please enter country name'}
                    name='Country'
                    onChangeCb={onChangeHandler}
                    label='Country'
                    value={professionalInformation.personalInfo.Country.value}
                    rules={professionalInformation.personalInfo.Country.rules}
                    errors={professionalInformation.personalInfo.Country.errors}
                    formSubmitted={professionalInformation.personalInfoFieldsTouched}
                />
                <TextInput
                    type='number'
                    placeHolder={'Please enter zip code'}
                    name='ZipCode'
                    onChangeCb={onChangeHandler}
                    label='Zip Code'
                    value={professionalInformation.personalInfo.ZipCode.value}
                    rules={professionalInformation.personalInfo.ZipCode.rules}
                    errors={professionalInformation.personalInfo.ZipCode.errors}
                    formSubmitted={professionalInformation.personalInfoFieldsTouched}
                />
            </ResponsiveBox>
        </React.Fragment>
    )
}

export default PersonalInformation
