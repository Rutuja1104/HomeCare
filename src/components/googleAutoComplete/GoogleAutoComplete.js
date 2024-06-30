import React, { useEffect, useState } from 'react'
import Autocomplete from "react-google-autocomplete";
import ErrorsList from '../input/errorslist/ErrorsList';

const GoogleAutoComplete = ({
    name = "",
    value = "",
    rules = {},
    errors = {},
    placeHolder = "",
    label = "",
    formSubmitted = false,
    onChangeCb = () => { },
    onPlaceSelectedCb = () => { },
}) => {

    const [isTouched, setIsTouched] = useState(false);

    useEffect(() => {
        if (formSubmitted) {
            setIsTouched(true)
        } else {
            setIsTouched(false)
        }
    }, [formSubmitted, errors])

    const getErrorStyles = () => {
        if (Object.keys(errors).length > 0 || (isTouched && rules?.required && value.length == 0)) {
            return 'auto-complete-input-error-styles'
        } else {
            return {};
        }
    }

    return (
        <div className='auto-complete-container'>
            {label && <label className='date-label'>{label} <span style={{ color: "red" }}>{rules.required && ' *'}</span></label>}
            <Autocomplete
                value={value}
                options={{
                    types: ["geocode", "establishment"],
                }}
                placeholder={placeHolder}
                onPlaceSelected={onPlaceSelectedCb}
                apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                className={`auto-complete-input ${getErrorStyles()} `}
                onChange={(e) => isTouched ? onChangeCb({ target: { value: e.target.value, name } }, rules) : onChangeCb({ target: { value: e.target.value, name } })}
                onBlur={(e) => {
                    setIsTouched(true)
                    onChangeCb({ target: { value: e.target.value, name } }, rules)
                }}
            />
            <ErrorsList errors={errors} />
        </div>
    )
}

export default GoogleAutoComplete
