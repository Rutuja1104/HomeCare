import React, { useEffect } from 'react';
import Heading from '../../../../../components/heading/Heading';
import { HEADING } from '../../../../../components/heading/constants/constants';
import TextInput from '../../../../../components/input/textinput/TextInput';
import ResponsiveBox from '../../../../../components/responsivebox/ResponsiveBox';
import { BUTTON_TYPE } from '../../../../../libs/constant';
import Button from '../../../../../components/button/Button';
import { VEC_ICON_NAME } from '../../../../../components/icon/constants';
import {
    componentKey,
    setAddNewInformation,
    setAllRequiredFieldsTouched,
    setMultiplePersonalInformation,
    setRemoveNewInformation
} from '../ProfessionalInformationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { generalValidator } from '../../../../../libs/utility/validators/GeneralValidator';
import { EDUCATIONAL_INFORMATION } from '../constants';
import DatePicker from '../../../../../components/datePicker/DatePicker';
import { useParams } from 'react-router-dom';
import SelectDropdown from '../../../../../components/dropdown/selectdropdown/SelectDropdown';

const EducationalInfo = () => {
    const dispatch = useDispatch();
    const { applicationId, agencyId, role } = useParams();

    const { professionalInformation } = useSelector((state) => state[componentKey]);

    useEffect(() => {
        if (professionalInformation.EducationalInformation.length < 1) {
            dispatch(setAddNewInformation({ name: 'EducationalInformation', object: EDUCATIONAL_INFORMATION }));
        }
    }, [])
    function containsSpecialChars(str) {
        var specialChars = /[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/;
        return specialChars.test(str);
    }

    const onChangeHandler = (event, rules, index) => {
        const { name, value, type } = event.target;

        let regex = /\d/;

        if ((regex.test(value) && type == 'text') || (type == 'text' && containsSpecialChars(value))) {
            return;
        }

        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(
                setMultiplePersonalInformation({
                    object: { [name]: { value, errors, rules } },
                    name: 'EducationalInformation',
                    index
                })
            );
        } else {
            dispatch(
                setMultiplePersonalInformation({ object: { [name]: { value } }, name: 'EducationalInformation', index })
            );
        }
    };

    return (
        <React.Fragment>
            <Heading type={HEADING.H3}>
                Educational Info {professionalInformation.EducationalInformation.length > 1 && '1 '}:{' '}
            </Heading>
            {professionalInformation.EducationalInformation?.map((item, index) => {
                return (
                    <React.Fragment key={index}>
                        {index > 0 && <Heading type={HEADING.H3}>Educational Info {index + 1} : </Heading>}
                        <ResponsiveBox>
                            <TextInput
                                type="text"
                                placeHolder={'Please enter institute name'}
                                name="InstituteName"
                                onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                label="Institute Name"
                                value={item?.InstituteName?.value}
                                errors={item?.InstituteName?.errors}
                                rules={item?.InstituteName?.rules}
                                formSubmitted={professionalInformation.educationalInformationFieldsTouched}
                            />

                            <TextInput
                                type="text"
                                placeHolder={'Please enter degree name'}
                                name="Degree"
                                onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                label="Degree"
                                value={item.Degree.value}
                                errors={item?.Degree?.errors}
                                rules={item?.Degree?.rules}
                                formSubmitted={professionalInformation.educationalInformationFieldsTouched}
                            />

                            <TextInput
                                type="text"
                                placeHolder={'Please enter branch name'}
                                name="Branch"
                                onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                label="Branch"
                                value={item.Branch.value}
                                errors={item?.Branch?.errors}
                                rules={item?.Branch?.rules}
                                formSubmitted={professionalInformation.educationalInformationFieldsTouched}
                            />

                            <TextInput
                                type="text"
                                placeHolder={'Please enter city name'}
                                name="EducationalCity"
                                onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                label="City"
                                value={item.EducationalCity.value}
                                errors={item?.EducationalCity?.errors}
                                rules={item?.EducationalCity?.rules}
                                formSubmitted={professionalInformation.educationalInformationFieldsTouched}
                            />

                            <TextInput
                                type="text"
                                placeHolder={'Please enter state'}
                                name="EducationalState"
                                onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                label="State"
                                value={item.EducationalState.value}
                                errors={item?.EducationalState?.errors}
                                rules={item?.EducationalState?.rules}
                                formSubmitted={professionalInformation.educationalInformationFieldsTouched}
                            />
                            <div className="education-start-end-date">
                                <DatePicker
                                    label="Start Date"
                                    name="EducationStartDate"
                                    onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                    value={item.EducationStartDate.value}
                                    errors={item?.EducationStartDate?.errors}
                                    rules={item?.EducationStartDate?.rules}
                                    formSubmitted={professionalInformation.educationalInformationFieldsTouched}
                                    maxDate={new Date()}
                                />
                                <DatePicker
                                    label="End Date"
                                    name="EducationEndDate"
                                    onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                    value={item.EducationEndDate.value}
                                    errors={item?.EducationEndDate?.errors}
                                    rules={item?.EducationEndDate?.rules}
                                    formSubmitted={professionalInformation.educationalInformationFieldsTouched}
                                    minDate={item.EducationStartDate.value || null}
                                />
                                {/* <DatePicker
                                    label='End Date'
                                    name='EducationEndDate'
                                    onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                    value={item.EducationEndDate.value}
                                    errors={item?.EducationEndDate?.errors}
                                    rules={item?.EducationEndDate?.rules}
                                    formSubmitted={professionalInformation.educationalInformationFieldsTouched}
                                    // minDate={item.EducationStartDate.value.length ? new Date(item.EducationStartDate.value) : null}
                                    minDate={item.EducationStartDate.value}

                                /> */}
                            </div>
                            {/* {role === 'RN' &&
                                <SelectDropdown
                                    name="IsRONLicense"
                                    label="Do you have valid RON lincense ?"
                                    onSelectCb={(name, selectedOption) => dispatch(setMultiplePersonalInformation({ object: { [name]: { value: selectedOption } }, name: "EducationalInformation", index }))}
                                    placeHolder="Do you have valid RON lincense "
                                    value={item?.IsRONLicense?.value}
                                    rules={item?.IsRONLicense?.rules}
                                    errors={item?.IsRONLicense?.errors}
                                    formSubmitted={professionalInformation.educationalInformationFieldsTouched}
                                    options={[
                                        { value: 'Yes', label: 'Yes' },
                                        { value: 'No', label: 'No' }
                                    ]}
                                />
                            } */}
                        </ResponsiveBox>

                        {index > 0 && (
                            <Button
                                onClickCb={() =>
                                    dispatch(setRemoveNewInformation({ name: 'EducationalInformation', index }))
                                }
                                variant={BUTTON_TYPE.LIGHT_WITH_NO_BORDER}
                                className={`mt-2 ${
                                    index < professionalInformation.EducationalInformation.length - 1 && 'mb-4'
                                }`}
                            >
                                Remove
                            </Button>
                        )}
                    </React.Fragment>
                );
            })}

            <Button
                className="mt-2"
                variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}
                onClickCb={() => {
                    dispatch(setAllRequiredFieldsTouched(false));
                    dispatch(setAddNewInformation({ name: 'EducationalInformation', object: EDUCATIONAL_INFORMATION }));
                }}
                prefixProps={{ icon: VEC_ICON_NAME.ADD_NEW_ICON }}
            >
                Add New
            </Button>
        </React.Fragment>
    );
};

export default EducationalInfo;
