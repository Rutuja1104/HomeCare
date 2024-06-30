import React from 'react';
import './directcss/CalendarInput.scss';
import { Theme } from '../../constants';

const CalendarInput = ({ label, customStyle = {}, value, onChangeCb, name = '', disabled = false, disablePastDates = false }) => {

    return (
        <div className="calendar-container" style={customStyle}>
            {label && <label className="calendar-label">{label}</label>}
            <input
                type="date"
                className="calendar-input"
                value={value}
                onChange={onChangeCb}
                name={name}
                style={{ color: value == "" ? Theme.PLACEHOLDER : Theme.TEXT_PRIMARY_BLACK }}
                disabled={disabled}
                min={disablePastDates ? new Date().toISOString().split("T")[0] : null}
            />
        </div>
    );
};

export default CalendarInput;