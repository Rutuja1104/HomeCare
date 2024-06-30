import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './directcss/CalendarInput.scss';

const CalendarInputWDateFormat = ({ 
	label, 
	customStyle = {}, 
	value, 
	onChangeCb, 
	name = '', 
	dateFormat = "MM/dd/yyyy", 
	onBlurCb, 
	preventTyping = true, 
	onKeyDown = () => { }, 
	inputClassName = "", 
	maxAllowedDate = null, 
	allowOnlyFutureDate = false,
	showMonthDropdown = true,
	showYearDropdown = true,
}) => {

	const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
	const [changedDate, setChangedDate] = useState("");
	const [isFocused, setIsFocused] = useState(true);
	const [minDate, setMinDate] = useState(null);

	const handleChange = (date) => {
		setSelectedDate(date);
		const adjustedDate = new Date(date);
		adjustedDate.setMinutes(adjustedDate.getMinutes() - adjustedDate.getTimezoneOffset());
		setChangedDate(adjustedDate.toISOString().substring(0, 10));
		onChangeCb(adjustedDate.toISOString().substring(0, 10));
		setIsFocused(false);
	};

	useEffect(() => {
		setSelectedDate(value ? new Date(value) : null);
	}, [value]);

	useEffect(() => {
		if (allowOnlyFutureDate) {
			setMinDate(new Date());
		}
	}, []);

	useEffect(() => {
		if (!isFocused) {
			handleBlur(changedDate)
		}
	}, [isFocused]);

	const handleBlur = (date) => {
		if (onBlurCb) {
			onBlurCb(date);
		}
		onKeyDown();
	}

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleKeyDown = (event) => {
		if (preventTyping) {
			event.preventDefault();
		}
	};

	return (
		<div className="calendar-container" style={customStyle}>
			{label && <label className="calendar-label">{label}</label>}
			<DatePicker
				selected={selectedDate}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={() => handleBlur(changedDate)}
				onKeyDown={handleKeyDown}
				dateFormat={dateFormat}
				name={name}
				className={`calendar-input ${inputClassName}`}
				placeholderText={dateFormat}
				maxDate={maxAllowedDate}
				minDate={minDate}
				showMonthDropdown={showMonthDropdown}
				showYearDropdown={showYearDropdown}
			/>
		</div>
	);
};

export default CalendarInputWDateFormat;