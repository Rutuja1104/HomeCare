import React, { useEffect } from 'react'
import Heading from '../../../../../components/heading/Heading'
import ResponsiveBox from '../../../../../components/responsivebox/ResponsiveBox'
import TextInput from '../../../../../components/input/textinput/TextInput'
import { HEADING } from '../../../../../components/heading/constants/constants'
import Button from '../../../../../components/button/Button'
import { BUTTON_TYPE } from '../../../../../libs/constant'
import { VEC_ICON_NAME } from '../../../../../components/icon/constants'
import { useDispatch, useSelector } from 'react-redux'
import { componentKey, setAddNewInformation, setAllRequiredFieldsTouched, setMultiplePersonalInformation, setRemoveNewInformation } from '../ProfessionalInformationSlice'
import { generalValidator } from '../../../../../libs/utility/validators/GeneralValidator'
import { LICENSE_INFORMATION } from '../constants'
import DatePicker from '../../../../../components/datePicker/DatePicker'
import { useParams } from 'react-router-dom'

const NursingLicense = () => {

    const dispatch = useDispatch()

    const { professionalInformation } = useSelector(state => state[componentKey])
    const { role } = useParams();

    useEffect(() => {
        if (professionalInformation.LicenseInformation.length < 1 && (role === "RN" || role === "LPN")) {
            dispatch(setAddNewInformation({ name: "LicenseInformation", object: LICENSE_INFORMATION }))
        }
    }, [])

    const onChangeHandler = (event, rules, index) => {
        const { name, value, type } = event.target;

        function containsSpecialChars(str) {
            var specialChars = /[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/
            return specialChars.test(str);
        }

        let regex = /\d/

        if ((regex.test(value) && type == "text") || (type == "text" && containsSpecialChars(value))) {
            return
        }

        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(setMultiplePersonalInformation({ object: { [name]: { value, errors, rules } }, name: "LicenseInformation", index }));
        } else {
            dispatch(setMultiplePersonalInformation({ object: { [name]: { value } }, name: "LicenseInformation", index }));
        }
    };

    return (
        <React.Fragment>
            <Heading type={HEADING.H2}>Nursing License (Please fill all the fields)</Heading>
            <Heading type={HEADING.H3}>License Info {professionalInformation.LicenseInformation.length > 1 && "1 "}:</Heading>

            {professionalInformation.LicenseInformation.map((item, index) => {
                return (
                    <React.Fragment key={index}>
                        {index > 0 && <Heading type={HEADING.H3}>License Info {index + 1} : </Heading>}
                        <ResponsiveBox>
                            <TextInput
                                type='text'
                                placeHolder={'Please enter license name'}
                                name='LicenseName'
                                onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                label='License Name'
                                value={item.LicenseName.value}
                                errors={item?.LicenseName?.errors}
                                rules={item?.LicenseName?.rules}
                                formSubmitted={professionalInformation.LicenseInformationFieldsTouched}
                            />

                            <TextInput
                                type='number'
                                placeHolder={'Please enter license number'}
                                name='LicenseNumber'
                                onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                label='License Number'
                                value={item.LicenseNumber.value}
                                errors={item?.LicenseNumber?.errors}
                                rules={item?.LicenseNumber?.rules}
                                formSubmitted={professionalInformation.LicenseInformationFieldsTouched}
                            />

                            <TextInput
                                type='text'
                                placeHolder={'Please enter license state'}
                                name='LicenseState'
                                onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                label='State'
                                value={item.LicenseState.value}
                                errors={item?.LicenseState?.errors}
                                rules={item?.LicenseState?.rules}
                                formSubmitted={professionalInformation.LicenseInformationFieldsTouched}
                            />
                            <DatePicker
                                label='Issued Date'
                                name='LicenseDateIssued'
                                onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                value={item.LicenseDateIssued.value}
                                errors={item?.LicenseDateIssued?.errors}
                                rules={item?.LicenseDateIssued?.rules}
                                formSubmitted={professionalInformation.LicenseInformationFieldsTouched}
                                maxDate={new Date()}
                            />
                            <DatePicker
                                label='Expiration Date'
                                name='LicenseExpirationDate'
                                onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                value={item.LicenseExpirationDate.value}
                                errors={item?.LicenseExpirationDate?.errors}
                                rules={item?.LicenseExpirationDate?.rules}
                                formSubmitted={professionalInformation.LicenseInformationFieldsTouched}
                            />
                        </ResponsiveBox>
                        {index > 0 && <Button onClickCb={() => dispatch(setRemoveNewInformation({ name: "LicenseInformation", index }))} variant={BUTTON_TYPE.LIGHT_WITH_NO_BORDER} className={`mt-2 ${(index < professionalInformation.LicenseInformation.length - 1) && 'mb-4'}`}>Remove</Button>}
                    </React.Fragment>
                )
            })}
            <Button
                className='mt-2'
                variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}
                onClickCb={() => {
                    dispatch(setAllRequiredFieldsTouched(false))
                    dispatch(setAddNewInformation({ name: "LicenseInformation", object: LICENSE_INFORMATION }))
                }}
                prefixProps={{ icon: VEC_ICON_NAME.ADD_NEW_ICON }}
            >Add New</Button>
        </React.Fragment>
    )
}

export default NursingLicense
