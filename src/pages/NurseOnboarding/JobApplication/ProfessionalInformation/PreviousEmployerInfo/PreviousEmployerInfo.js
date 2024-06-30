import React, { useEffect } from 'react'
import Heading from '../../../../../components/heading/Heading'
import { HEADING } from '../../../../../components/heading/constants/constants'
import ResponsiveBox from '../../../../../components/responsivebox/ResponsiveBox'
import TextInput from '../../../../../components/input/textinput/TextInput'
import Button from '../../../../../components/button/Button'
import { BUTTON_TYPE } from '../../../../../libs/constant'
import { VEC_ICON_NAME } from '../../../../../components/icon/constants'
import { componentKey, setAddNewInformation, setAllRequiredFieldsTouched, setAutoCompletePreviousEmployerAddress, setMultiplePersonalInformation, setRemoveNewInformation } from '../ProfessionalInformationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { generalValidator } from '../../../../../libs/utility/validators/GeneralValidator'
import { PREVIOUS_EMPLOYER_INFO } from '../constants'
import DatePicker from '../../../../../components/datePicker/DatePicker'
import General from '../../../../../libs/utility/General'
import GoogleAutoComplete from '../../../../../components/googleAutoComplete/GoogleAutoComplete'

const PreviousEmployerInfo = () => {

    const dispatch = useDispatch()
    const { professionalInformation } = useSelector(state => state[componentKey])

    useEffect(() => {
        if (professionalInformation.PreviousEmployerInfo.length < 1) {
            dispatch(setAddNewInformation({ name: "PreviousEmployerInfo", object: PREVIOUS_EMPLOYER_INFO }))
        }
    }, [])

    function containsSpecialChars(str) {
        var specialChars = /[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/

        return specialChars.test(str);
    }

    const onChangeHandler = (event, rules, index) => {
        const { name, value, type } = event.target;
        if (name == "PreviousEmployerContactNumber" || name == "PreviousEmployerCompanyContactNumber") {
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
                const errors = generalValidator.validate(numericValue, { ...rules, regex: { pattern: /\b\d{10}\b/, message: 'Please enter 10 digits only' } });
                dispatch(setMultiplePersonalInformation({ object: { [name]: { value: formattedValue, errors, rules } }, name: "PreviousEmployerInfo", index }));
            } else {
                dispatch(setMultiplePersonalInformation({ object: { [name]: { value: formattedValue } }, name: "PreviousEmployerInfo", index }));
            }
        } else {

            let regex = /\d/

            if ((regex.test(value) && type == "text") || (type == "text" && containsSpecialChars(value))) {
                return
            }
            if (name === "PreviousEmployerStartingSalary") {
                const filteredData = professionalInformation?.PreviousEmployerInfo.find((_, idx) => idx === index);
                const errors = generalValidator.validate(
                    filteredData?.PreviousEmployerEndingSalary?.value,
                    { ...filteredData?.PreviousEmployerEndingSalary?.rules, ...{ minValue: { min: value, message: 'Ending hourly pay can not be less than starting hourly pay' } } }
                );
                
                // dispatch(setMultiplePersonalInformation({
                //     object: {
                //         "PreviousEmployerEndingSalary": {
                //             value: filteredData?.PreviousEmployerEndingSalary?.value,
                //             errors,
                //             rules: { ...filteredData?.PreviousEmployerEndingSalary?.rules, ...{ minValue: { min: value, message: 'Ending hourly pay can not be less than starting hourly pay' } } }
                //         }
                //     },
                //     name: "PreviousEmployerInfo",
                //     index
                // }));
            }

            // const filteredData = professionalInformation?.PreviousEmployerInfo.find((_, idx) => idx == idx)
            // if (name == "PreviousEmployerStartingSalary") {
            //     const errors = generalValidator.validate(filteredData.PreviousEmployerEndingSalary.value, { ...filteredData.PreviousEmployerEndingSalary.rules, ...{ minValue: { min: value, message: 'Ending hourly pay can not be less than starting hourly pay' } } });
            //     dispatch(setMultiplePersonalInformation({ object: { "PreviousEmployerEndingSalary": { value: filteredData.PreviousEmployerEndingSalary.value, errors, rules: { ...filteredData.PreviousEmployerEndingSalary.rules, ...{ minValue: { min: value, message: 'Ending hourly pay can not be less than starting hourly pay' } } } } }, name: "PreviousEmployerInfo", index }));
            // }

            if (rules) {
                const errors = generalValidator.validate(value, rules);
                dispatch(setMultiplePersonalInformation({ object: { [name]: { value, errors, rules } }, name: "PreviousEmployerInfo", index }));
            } else {
                dispatch(setMultiplePersonalInformation({ object: { [name]: { value } }, name: "PreviousEmployerInfo", index }));
            }
        }
    };

    const handlePlaceSelect = (place, index) => {
        const mappingKey = {
            PreviousEmployerAddressline2: { type: "locality", required: false },
            PreviousEmployerAddresscity: { type: "administrative_area_level_2", required: true },
            PreviousEmployerAddressstate: { type: "administrative_area_level_1", required: true },
            PreviousEmployerAddresscountry: { type: "country", required: true },
            PreviousEmployerAddresspinCode: { type: "postal_code", required: true },
        };

        const result = General.mapAddressToStates(place.address_components, mappingKey)
        dispatch(setAutoCompletePreviousEmployerAddress({ data: result, index }))
        dispatch(setMultiplePersonalInformation({ object: { "PreviousEmployerAddressline1": { value: place.formatted_address.split(",")[0] } }, name: "PreviousEmployerInfo", index }));
    }

    return (
        <React.Fragment>
            <Heading type={HEADING.H3}>Previous Employer Info {professionalInformation.PreviousEmployerInfo.length > 1 && "1 "}: </Heading>

            {professionalInformation?.PreviousEmployerInfo.map((item, index) => {
                return (
                    <React.Fragment key={index}>
                        {index > 0 && <Heading type={HEADING.H3}>Previous Employer Info {index + 1} : </Heading>}
                        <ResponsiveBox>
                            <TextInput
                                type='text'
                                placeHolder={'Please enter company name'}
                                name='CompanyName'
                                onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                label='Company Name'
                                value={item.CompanyName.value}
                                errors={item?.CompanyName?.errors}
                                rules={item?.CompanyName?.rules}
                                formSubmitted={professionalInformation.previousEmployerInfoFieldsTouched}
                            />
                            <TextInput
                                type='text'
                                placeHolder={'Please enter job title'}
                                name='JobTitle'
                                onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                label='Job Title'
                                value={item.JobTitle.value}
                                errors={item?.JobTitle?.errors}
                                rules={item?.JobTitle?.rules}
                                formSubmitted={professionalInformation.previousEmployerInfoFieldsTouched}
                            />
                            <TextInput
                                type='text'
                                placeHolder={'Please enter job type'}
                                name='JobType'
                                onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                label='Job Responsibilities'
                                value={item.JobType.value}
                                errors={item?.JobType?.errors}
                                rules={item?.JobType?.rules}
                                formSubmitted={professionalInformation.previousEmployerInfoFieldsTouched}
                            />
                            <TextInput
                                type='text'
                                placeHolder={'Please enter employer contact number'}
                                name='PreviousEmployerContactNumber'
                                onChangeCb={(event, rule = { required: true, regex: { pattern: /\b\d{10}\b/, message: 'Please enter 10 digits only' } }) => onChangeHandler(event, rule, index)}
                                label='Employer Contact Number'
                                value={item?.PreviousEmployerContactNumber?.value}
                                errors={item?.PreviousEmployerContactNumber?.errors}
                                rules={item?.PreviousEmployerContactNumber?.rules}
                                formSubmitted={professionalInformation.previousEmployerInfoFieldsTouched}
                            />
                            <TextInput
                                type='number'
                                placeHolder={'Start salary $ / hr'}
                                name='PreviousEmployerStartingSalary'
                                onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                label='Starting Hourly Pay'
                                value={item?.PreviousEmployerStartingSalary?.value}
                                errors={item?.PreviousEmployerStartingSalary?.errors}
                                rules={item?.PreviousEmployerStartingSalary?.rules}
                                formSubmitted={professionalInformation.previousEmployerInfoFieldsTouched}
                            />
                            <TextInput
                                type='number'
                                placeHolder={'End salary $ / hr'}
                                name='PreviousEmployerEndingSalary'
                                onChangeCb={(event, rule = { minValue: { min: item?.PreviousEmployerStartingSalary?.value, message: 'Ending hourly pay can not be less than starting hourly pay' } }) => onChangeHandler(event, rule, index)}
                                label='Ending Hourly Pay'
                                value={item?.PreviousEmployerEndingSalary?.value}
                                errors={item?.PreviousEmployerEndingSalary?.errors}
                                rules={item?.PreviousEmployerEndingSalary?.rules}
                                formSubmitted={professionalInformation.previousEmployerInfoFieldsTouched}
                            />
                            <GoogleAutoComplete
                                name='PreviousEmployerAddressline1'
                                label='Address Line 1'
                                placeHolder='Please enter address'
                                onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                value={item?.PreviousEmployerAddressline1?.value}
                                errors={item?.PreviousEmployerAddressline1?.errors}
                                rules={item?.PreviousEmployerAddressline1?.rules}
                                formSubmitted={professionalInformation.previousEmployerInfoFieldsTouched}
                                onPlaceSelectedCb={(place) => handlePlaceSelect(place, index)}
                            />
                            <TextInput
                                type="text"
                                placeHolder={"Please enter address line 2"}
                                name="PreviousEmployerAddressline2"
                                onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                label="Address Line 2"
                                value={item?.PreviousEmployerAddressline2?.value}
                                errors={item?.PreviousEmployerAddressline2?.errors}
                                rules={item?.PreviousEmployerAddressline2?.rules}
                                formSubmitted={professionalInformation.previousEmployerInfoFieldsTouched}
                            />
                            <TextInput
                                type="text"
                                placeHolder={"Please enter city"}
                                name="PreviousEmployerAddresscity"
                                onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                label="City"
                                value={item?.PreviousEmployerAddresscity?.value}
                                errors={item?.PreviousEmployerAddresscity?.errors}
                                rules={item?.PreviousEmployerAddresscity?.rules}
                                formSubmitted={professionalInformation.previousEmployerInfoFieldsTouched}
                            />

                            <TextInput
                                type="text"
                                placeHolder={"Please enter state"}
                                onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                name="PreviousEmployerAddressstate"
                                label="State"
                                value={item?.PreviousEmployerAddressstate?.value}
                                errors={item?.PreviousEmployerAddressstate?.errors}
                                rules={item?.PreviousEmployerAddressstate?.rules}
                                formSubmitted={professionalInformation.previousEmployerInfoFieldsTouched}
                            />
                            <TextInput
                                type="number"
                                placeHolder={"Please enter zip"}
                                name="PreviousEmployerAddresspinCode"
                                onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                label="Zip"
                                value={item?.PreviousEmployerAddresspinCode?.value}
                                errors={item?.PreviousEmployerAddresspinCode?.errors}
                                rules={item?.PreviousEmployerAddresspinCode?.rules}
                                formSubmitted={professionalInformation.previousEmployerInfoFieldsTouched}
                            />
                            <TextInput
                                type="text"
                                placeHolder={"Please enter country"}
                                name="PreviousEmployerAddresscountry"
                                onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                label="Country"
                                value={item?.PreviousEmployerAddresscountry?.value}
                                errors={item?.PreviousEmployerAddresscountry?.errors}
                                rules={item?.PreviousEmployerAddresscountry?.rules}
                                formSubmitted={professionalInformation.previousEmployerInfoFieldsTouched}
                            />
                            {/* <TextInput
                                type="text"
                                placeHolder={"Please enter company contact number"}
                                name="PreviousEmployerCompanyContactNumber"
                                onChangeCb={(event, rule = { required: true, regex: { pattern: /\b\d{10}\b/, message: 'Please enter 10 digits only' } }) => onChangeHandler(event, rule, index)}
                                label="Company contact number"
                                value={item?.PreviousEmployerCompanyContactNumber?.value}
                                errors={item?.PreviousEmployerCompanyContactNumber?.errors}
                                rules={item?.PreviousEmployerCompanyContactNumber?.rules}
                                formSubmitted={professionalInformation.previousEmployerInfoFieldsTouched}
                            /> */}
                            <TextInput
                                type="text"
                                placeHolder={"Please enter reason for leaving"}
                                name="PreviousEmployerReasonForLeavingCompany"
                                onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                label="Reason for Leaving"
                                value={item?.PreviousEmployerReasonForLeavingCompany?.value}
                                errors={item?.PreviousEmployerReasonForLeavingCompany?.errors}
                                rules={item?.PreviousEmployerReasonForLeavingCompany?.rules}
                                formSubmitted={professionalInformation.previousEmployerInfoFieldsTouched}
                            />
                            <TextInput
                                type="text"
                                placeHolder={"Please enter contact person name"}
                                name="PreviousEmployerContactPersonName"
                                onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                label="Contact Person Name"
                                value={item?.PreviousEmployerContactPersonName?.value}
                                errors={item?.PreviousEmployerContactPersonName?.errors}
                                rules={item?.PreviousEmployerContactPersonName?.rules}
                                formSubmitted={professionalInformation.previousEmployerInfoFieldsTouched}
                            />
                            <div className='education-start-end-date'>
                                <DatePicker
                                    label='Start Date'
                                    name='PreviousEmployerStartDate'
                                    onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                    value={item.PreviousEmployerStartDate.value}
                                    errors={item?.PreviousEmployerStartDate?.errors}
                                    rules={item?.PreviousEmployerStartDate?.rules}
                                    formSubmitted={professionalInformation.previousEmployerInfoFieldsTouched}
                                    maxDate={new Date()}
                                />
                                <DatePicker
                                    label='End Date'
                                    name='PreviousEmployerEndDate'
                                    onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                    value={item.PreviousEmployerEndDate.value}
                                    errors={item?.PreviousEmployerEndDate?.errors}
                                    rules={item?.PreviousEmployerEndDate?.rules}
                                    formSubmitted={professionalInformation.previousEmployerInfoFieldsTouched}
                                    minDate={item.PreviousEmployerStartDate.value}
                                />
                            </div>
                        </ResponsiveBox>
                        {index > 0 && <Button onClickCb={() => dispatch(setRemoveNewInformation({ name: "PreviousEmployerInfo", index }))} variant={BUTTON_TYPE.LIGHT_WITH_NO_BORDER} className={`mt-2 ${(index < professionalInformation.PreviousEmployerInfo.length - 1) && 'mb-4'}`}>Remove</Button>}
                    </React.Fragment>
                )
            })}
            <Button
                className='mt-2'
                variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}
                onClickCb={() => {
                    dispatch(setAllRequiredFieldsTouched(false))
                    dispatch(setAddNewInformation({ name: "PreviousEmployerInfo", object: PREVIOUS_EMPLOYER_INFO }))
                }}
                prefixProps={{ icon: VEC_ICON_NAME.ADD_NEW_ICON }}
            >Add New</Button>
        </React.Fragment >
    )
}

export default PreviousEmployerInfo
