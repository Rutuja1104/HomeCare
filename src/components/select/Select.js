import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import ErrorsList from '../input/errorslist/ErrorsList';

const SelectDropdown = ({
    label,
    name = "",
    value = "",
    rules = {},
    errors = {},
    placeHolder = "Select...",
    formSubmitted = false,
    onChangeCb = () => { },
    formSubmittedCb = () => { },
    options = [],
    isSearchable = true,
    onInputChangeCb = () => { },
    defaultValue = null,
    onBlurOnChangeAllowed = false,
    disabled = false
}) => {
    const [isTouched, setIsTouched] = useState(false);
    const [selectedValue, setSelectedValue] = useState({ value: "", label: "" });

    useEffect(() => {
        if (formSubmitted) {
            setIsTouched(true);
            formSubmittedCb({ target: { name, value } }, rules);
        } else {
            setIsTouched(false);
        }
    }, [formSubmitted, errors]);

    const getErrorStyles = () => {
        if (Object.keys(errors).length > 0 || (isTouched && rules?.required && value.length === 0)) {
            return {
                border: '1px solid var(--grey-40, #e05243)',
            };
        } else {
            return {};
        }
    };

    const customSelectStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: "46px",
            width: "100%",
            borderRadius: "8px",
            border: "1px solid var(--grey-40, #d2d2d2)",
            flex: "1 1 0%",
            ...getErrorStyles()
        }),
    };

    return (
        <div className='react-select-dropdown-container'>
            {label && <label className='date-label'>{label} <span style={{ color: "red" }}>{rules.required && ' *'}</span></label>}
            <Select
                menuPosition="fixed"
                isDisabled={disabled}
                styles={customSelectStyles}
                value={defaultValue}
                defaultValue={value}
                onChange={(selectedOption) => {
                    setSelectedValue(selectedOption);
                    isTouched ? onChangeCb({ target: { value: selectedOption?.label, name, selectedOption } }, rules, selectedOption) : onChangeCb({ target: { value: selectedOption?.label, name, selectedOption } });
                }}
                options={options}
                placeholder={placeHolder}
                isSearchable={isSearchable}
                onInputChange={onInputChangeCb}
                onBlur={() => {
                    setIsTouched(true);
                    if (onBlurOnChangeAllowed) {
                        onChangeCb({ target: { value: selectedValue.label, name, selectedOption: selectedValue } }, rules,);
                    }
                }}
            />
            <ErrorsList errors={errors} />
        </div>
    );
}

export default SelectDropdown;
