import React, { useEffect, useState } from 'react'
import Flatpickr from "react-flatpickr";
import ErrorsList from '../input/errorslist/ErrorsList';
import moment from 'moment';

const DatePicker = ({
    label,
    name = "",
    value = "",
    rules = {},
    errors = {},
    dateFormat = 'm-d-Y',
    placeHolder = "MM/DD/YYYY",
    formSubmitted = false,
    onChangeCb = () => { },
    formSubmittedCb = () => { },
    momentFormat = "MM/DD/YYYY",
    styles = {},
    maxDate = null,
    minDate = null,
    disabled = false
}) => {
    const [isTouched, setIsTouched] = useState(false);

    const flatpickrOptions = {
        maxDate: maxDate !== null ? new Date(maxDate) : null,
        minDate: minDate !== null ? moment(minDate).toISOString() : null,
        dateFormat: dateFormat,
        onChange: (selectedDates) => {
            isTouched ? onChangeCb({ target: { value: moment(selectedDates[0]).format(momentFormat), name } }, rules) : onChangeCb({ target: { value: moment(selectedDates[0]).format(momentFormat), name } })
        }
    };

    useEffect(() => {
        if (formSubmitted) {
            setIsTouched(true)
            formSubmittedCb({ target: { name, value } }, rules)
        } else {
            setIsTouched(false)
        }
    }, [formSubmitted, errors])

    const getErrorStyles = () => {
        if (Object.keys(errors).length > 0 || (isTouched && rules?.required && value.length == 0)) {
            return 'date-picker-error-styles'
        } else {
            return {};
        }
    }

    return (
        <div className='date-picker-container' style={styles}>
            {label && <label className='date-label'>{label} <span style={{ color: "red" }}>{rules.required && ' *'}</span></label>}
            <Flatpickr
                disabled={disabled}
                options={flatpickrOptions}
                placeholder={placeHolder}
                className={`date-picker ${getErrorStyles()} `}
                value={value}
                onBlur={() => {
                    // setIsTouched(true)
                    // onChangeCb({ target: { value: e.target.value ? moment(e.target.value).format(momentFormat) : "", name } }, rules)
                }}
            />

            <ErrorsList errors={errors} />
        </div>
    )
}

export default DatePicker
