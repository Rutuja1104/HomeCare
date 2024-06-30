import React, { useEffect } from 'react'
import Heading from '../../../../../components/heading/Heading'
import { HEADING } from '../../../../../components/heading/constants/constants'
import ResponsiveBox from '../../../../../components/responsivebox/ResponsiveBox'
import TextInput from '../../../../../components/input/textinput/TextInput'
import Button from '../../../../../components/button/Button'
import { BUTTON_TYPE } from '../../../../../libs/constant'
import { VEC_ICON_NAME } from '../../../../../components/icon/constants'
import { useDispatch, useSelector } from 'react-redux'
import { componentKey, setAddNewInformation, setAllRequiredFieldsTouched, setMultiplePersonalInformation, setRemoveNewInformation } from '../ProfessionalInformationSlice'
import { generalValidator } from '../../../../../libs/utility/validators/GeneralValidator'
import { REFERENCE_INFO } from '../constants'

const ReferencesInfo = () => {

    const dispatch = useDispatch()

    const { professionalInformation } = useSelector(state => state[componentKey])

    useEffect(() => {
        if (professionalInformation.ReferencesInfo.length < 2) {
            dispatch(setAddNewInformation({ name: "ReferencesInfo", object: REFERENCE_INFO }))
            dispatch(setAddNewInformation({ name: "ReferencesInfo", object: REFERENCE_INFO }))
        }
    }, [])

    function containsSpecialChars(str) {
        var specialChars = /[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/
        return specialChars.test(str);
    }

    const onChangeHandler = (event, rules, index) => {
        const { name, value, type } = event.target;

        if (name == "PhoneNumber") {
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
                dispatch(setMultiplePersonalInformation({ object: { [name]: { value: formattedValue, errors, rules } }, name: "ReferencesInfo", index }));
            } else {
                dispatch(setMultiplePersonalInformation({ object: { [name]: { value: formattedValue } }, name: "ReferencesInfo", index }));
            }

        } else {

            let regex = /\d/

            if ((regex.test(value) && type == "text") || (type == "text" && containsSpecialChars(value))) {
                return
            }

            if (rules) {
                const errors = generalValidator.validate(value, rules);
                dispatch(setMultiplePersonalInformation({ object: { [name]: { value, errors, rules } }, name: "ReferencesInfo", index }));
            } else {
                dispatch(setMultiplePersonalInformation({ object: { [name]: { value } }, name: "ReferencesInfo", index }));
            }
        }

    };

    return (
        <React.Fragment>
            <Heading type={HEADING.H2}>Professional Reference (Add at least two professional references)</Heading>
            <Heading type={HEADING.H3}>Reference 1 :</Heading>

            {professionalInformation.ReferencesInfo.map((item, index) => {
                return (
                    <React.Fragment key={index}>
                        {index > 0 && <Heading type={HEADING.H3}>Reference {index + 1} : </Heading>}
                        <Heading type={HEADING.H3}></Heading>
                        <ResponsiveBox>
                            <TextInput
                                type='text'
                                placeHolder={'Please enter First name'}
                                name='FirstName'
                                onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                label='First name'
                                value={item?.FirstName?.value}
                                errors={item?.FirstName?.errors}
                                rules={item?.FirstName?.rules}
                                formSubmitted={professionalInformation.ReferencesInfoFieldsTouched}
                            />
                            <TextInput
                                type='text'
                                placeHolder={'Please enter Last name'}
                                name='LastName'
                                onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                label='Last name'
                                value={item?.LastName?.value}
                                errors={item?.LastName?.errors}
                                rules={item?.LastName?.rules}
                                formSubmitted={professionalInformation.ReferencesInfoFieldsTouched}
                            />
                            <TextInput
                                type='text'
                                placeHolder={'Please enter reference title'}
                                name='ReferenceTitle'
                                onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                label='Title'
                                value={item.ReferenceTitle.value}
                                errors={item?.ReferenceTitle?.errors}
                                rules={item?.ReferenceTitle?.rules}
                                formSubmitted={professionalInformation.ReferencesInfoFieldsTouched}
                            />
                            <TextInput
                                type='text'
                                placeHolder={'Please enter reference phone number'}
                                name='PhoneNumber'
                                onChangeCb={(event, rule = { required: true, regex: { pattern: /\b\d{10}\b/, message: 'Please enter 10 digits only' } }) => onChangeHandler(event, rule, index)}
                                label='Phone Number'
                                value={item?.PhoneNumber?.value}
                                errors={item?.PhoneNumber?.errors}
                                rules={item?.PhoneNumber?.rules}
                                formSubmitted={professionalInformation.ReferencesInfoFieldsTouched}
                            />
                            <TextInput
                                type='email'
                                placeHolder={'Please enter reference email'}
                                name='email'
                                onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                label='Email'
                                value={item.email.value}
                                errors={item?.email?.errors}
                                rules={item?.email?.rules}
                                formSubmitted={professionalInformation.ReferencesInfoFieldsTouched}
                            />
                            <TextInput
                                type='text'
                                placeHolder={'Please enter reference relationship'}
                                name='ReferenceRelationship'
                                onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                label='Relationship'
                                value={item?.ReferenceRelationship?.value}
                                errors={item?.ReferenceRelationship?.errors}
                                rules={item?.ReferenceRelationship?.rules}
                                formSubmitted={professionalInformation.ReferencesInfoFieldsTouched}
                            />
                            <TextInput
                                type='text'
                                placeHolder={'Please enter reference company'}
                                name='ReferenceCompany'
                                onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                label='Company'
                                value={item.ReferenceCompany.value}
                                errors={item?.ReferenceCompany?.errors}
                                rules={item?.ReferenceCompany?.rules}
                                formSubmitted={professionalInformation.ReferencesInfoFieldsTouched}
                            />

                        </ResponsiveBox>
                        {index > 1 && <Button onClickCb={() => dispatch(setRemoveNewInformation({ name: "ReferencesInfo", index }))} variant={BUTTON_TYPE.LIGHT_WITH_NO_BORDER} className={`mt-2 ${(index < professionalInformation.ReferencesInfo.length - 1) && 'mb-4'}`}>Remove</Button>}

                    </React.Fragment>
                )
            })}
            <Button
                className='mt-2'
                variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}
                onClickCb={() => {
                    dispatch(setAllRequiredFieldsTouched(false))
                    dispatch(setAddNewInformation({ name: "ReferencesInfo", object: REFERENCE_INFO }))
                }}
                prefixProps={{ icon: VEC_ICON_NAME.ADD_NEW_ICON }}
            >Add New</Button>
        </React.Fragment>
    )
}

export default ReferencesInfo
