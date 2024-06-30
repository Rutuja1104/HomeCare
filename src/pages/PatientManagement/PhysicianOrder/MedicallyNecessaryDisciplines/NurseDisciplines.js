import React, { useState } from 'react';
import Heading from '../../../../components/heading/Heading';
import { HEADING } from '../../../../components/heading/constants/constants';
import SelectDropdown from '../../../../components/dropdown/selectdropdown/SelectDropdown';
import CheckboxWLabel from '../../../../components/checkbox/checkboxwlabel/CheckboxWLabel';
import {
    componentKey,
    setMedicalOrderDetails,
    setPatienDetailsDropdown
} from '../../referral-intake/PatientManagementSlice';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from '../../../../components/input/textinput/TextInput';
import Label from '../../../../components/label/labelV2/Label';
const NurseDisciplines = () => {
    const NURSE_OPTIONS = {
        CHECKBOX_OPTIONS: [
            {
                label: 'Observation and complete organ system assessment',
                checked: false,
                name: 'observationAndCompleteOrganSystemAssessment',
                value: '',
                onChangeCb: () => {}
            },
            {
                label: 'Assess patient’s response to new/changed meds/treatments',
                checked: false,
                name: 'Assess patient’s response to new/changed meds/treatments',
                value: '',
                onChangeCb: () => {}
            },
            {
                label: 'Teach regarding new medication regimen and side effects',
                checked: false,
                name: 'Teach regarding new medication regimen and side effects',
                value: '',
                onChangeCb: () => {}
            },
            {
                label: 'Report changes in favorable response to physician',
                checked: false,
                name: 'Report changes in favorable response to physician',
                value: '',
                onChangeCb: () => {}
            },
            {
                label: 'Teach symptoms to report nurse, physician, 911',
                checked: false,
                name: 'Teach symptoms to report nurse, physician, 911',
                value: '',
                onChangeCb: () => {}
            },
            {
                label: 'Teach disease process / disease management',
                checked: false,
                name: 'Teach disease process / disease management',
                value: '',
                onChangeCb: () => {}
            },
            {
                label: 'Skilled observation of wound site',
                checked: false,
                name: 'Skilled observation of wound site',
                value: '',
                onChangeCb: () => {}
            },
            {
                label: 'Teach proper diet / hydration',
                checked: false,
                name: 'Teach proper diet / hydration',
                value: '',
                onChangeCb: () => {}
            },
            {
                label: 'Teach safety precaution',
                checked: false,
                name: 'Teach safety precaution',
                value: '',
                onChangeCb: () => {}
            },
            {
                label: 'Pain assessment / management',
                checked: false,
                name: 'Pain assessment / management',
                value: '',
                onChangeCb: () => {}
            }
        ],
        OPTIONS: [
            { label: 'Daily', value: 'Daily' },
            { label: 'Weekly', value: 'Weekly' },
            { label: 'Twice a Week', value: 'Twice a Week' },
            { label: 'Thrice a Week', value: 'Thrice a Week' },
            { label: 'Monthly', value: 'Monthly' },
            { label: 'Every Weekday', value: 'Every Weekday' }
        ]
    };
    const dispatch = useDispatch();
    const { medicalOrderDetails } = useSelector((state) => state[componentKey]);
    const [serviceInput, setServiceInput] = useState('');
    const [manuallyEnteredValues, setManuallyEnteredValues] = useState([]);

    const [frequencyInput, setFrequencyInput] = useState('');
    const handleServiceInputChange = (event) => {
        setServiceInput(event.target.value);
    };

    const handleFrequencyInputChange = (event) => {
        setFrequencyInput(event.target.value);
    };

    const handleManualEntry = () => {
        if (serviceInput && frequencyInput) {
            // Create a new item with the entered values
            const newItem = {
                service: serviceInput,
                caseSequence: frequencyInput
            };

            // Add the new item to the manuallyEnteredValues array
            const updatedManuallyEnteredValues = [...manuallyEnteredValues, newItem];
            dispatch(setMedicalOrderDetails({ name: 'nurse', value: manuallyEnteredValues }));

            // Clear the input fields
            setServiceInput('');
            setFrequencyInput('');
        }
    };

    const [nurseDisciplines, setNurseDisciplines] = useState(NURSE_OPTIONS.CHECKBOX_OPTIONS);
    const handleCheckboxChange = (index) => {
        const updatedDisciplines = [...nurseDisciplines];
        updatedDisciplines[index].checked = !updatedDisciplines[index].checked;
        setNurseDisciplines(updatedDisciplines);

        const filteredList = updatedDisciplines
            .filter((item) => item.checked)
            .map((item) => ({
                service: item.label,
                caseSequence: item?.selectedOption?.value
            }));
        dispatch(setMedicalOrderDetails({ name: 'nurse', value: filteredList }));
    };
    const handleDropdownChange = (index, selectedOption) => {
        const updatedDisciplines = [...nurseDisciplines];
        updatedDisciplines[index].selectedOption = selectedOption;
        setNurseDisciplines(updatedDisciplines);

        const filteredList = updatedDisciplines
            .filter((item) => item.checked)
            .map((item) => ({
                service: item.label,
                caseSequence: item?.selectedOption?.value
            }));
        dispatch(setMedicalOrderDetails({ name: 'nurse', value: filteredList }));
    };

    return (
        <div>
            <div>
                <Heading type={HEADING.H3}>Skill Selection</Heading>
            </div>

            {NURSE_OPTIONS.CHECKBOX_OPTIONS.map((nurseDiscipline, index) => (
                <>
                    <div className="nurse-disciplins" key={index}>
                        <div className="block1">
                            <CheckboxWLabel
                                checked={nurseDisciplines[index]?.checked}
                                label={nurseDiscipline.label}
                                onChangeCb={() => handleCheckboxChange(index)}
                                name={nurseDiscipline[index]?.name}
                                value={nurseDiscipline[index]?.value}
                            />
                        </div>

                        <div className="block2">
                            <SelectDropdown
                                type="text"
                                placeHolder={'Frequency'}
                                name={`nurseDisciplines_${index}`}
                                options={NURSE_OPTIONS.OPTIONS}
                                onSelectCb={(name, selectedOption) => handleDropdownChange(index, selectedOption)}
                                value={nurseDisciplines[index].selectedOption}
                            />
                        </div>
                    </div>
                </>
            ))}
            {/* <Label>other</Label>
            <div className="nurse-disciplins">
                <div className="block1">
                    <TextInput
                        type="text"
                        placeHolder="Please enter service"
                        name={'service'}
                        value={serviceInput}
                        onChangeCb={handleServiceInputChange}
                        label="Service"
                    />
                </div>
                <div className="block2">
                    <TextInput
                        type="text"
                        placeHolder="Please enter frequency"
                        name={'frequency'}
                        value={frequencyInput}
                        onChangeCb={handleFrequencyInputChange}
                        label="Frequency"
                    />
                </div>
                <div>
                    <button onClick={handleManualEntry}>Add Manually</button>
                </div>
            </div> */}
        </div>
    );
};

export default NurseDisciplines;
