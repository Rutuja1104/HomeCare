import { useState } from "react";
import styles from './CommaSeparatedTextInput.styles'
import Button from "../../button/Button";
import { BUTTON_TYPE } from "../../button/constants";

export default function CommaSeparatedInput({
	value = [],
	onChangeCB = () => { },
	customStyles = {}
}) {
	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleInputKeyPress = (e) => {
		if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault();
			addTag(inputValue.trim());
		}
	};

	const addTag = (tag) => {
		if (tag !== '' && !value.includes(tag)) {
			onChangeCB([...value, tag]);
			setInputValue('');
		}
	};

	const deleteTag = (tagToDelete) => {
		const filteredTags = value.filter((tag) => tag !== tagToDelete);
		onChangeCB(filteredTags);
	};

	return (
		<div style={{ ...styles.inputContainer, ...customStyles }}>
			<div style={styles.tags}>
				{value.map((tag) => (
					<Button style={styles.buttonNoWrap} onClickCb={() => deleteTag(tag)} type={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}>{tag} X</Button>
				))}
			</div>
			<input
				placeholder="Please Enter Comma Separated Value"
				style={styles.textInput}
				type="text"
				value={inputValue}
				onChange={handleInputChange}
				onKeyDown={handleInputKeyPress}
			/>
		</div>
	);
}