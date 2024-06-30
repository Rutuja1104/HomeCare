import React, { useState } from 'react';
import Heading from '../../../../../components/heading/Heading';
import { HEADING } from '../../../../../components/heading/constants/constants';
import SelectDropdown from '../../../../../components/dropdown/selectdropdown/SelectDropdown';
import CheckboxWLabel from '../../../../../components/checkbox/checkboxwlabel/CheckboxWLabel';
import { useDispatch } from 'react-redux';
// import { setMedicalOrderDetails } from '../../../PatientManagementSlice';
import { componentKey, setMedicalOrderDetails } from '../../physicianOrderSlice';

const HHA = () => {
    const HHA_OPTIONS = {
        CHECKBOX_OPTIONS: [
            {
                label: 'ADL Assistance',
                checked: false,
                name: 'ADL Assistance',
                value: '',
                onChangeCb: () => {}
            },
            {
                label: 'Personal Care Services/Homemaker',
                checked: false,
                name: 'Personal Care Services/Homemaker',
                value: '',
                onChangeCb: () => {}
            }
        ],
        OPTIONS: [
            { label: 'Daily', value: 'Daily' },
            { label: 'Weekly', value: 'Weekly' },
            { label: 'Thrice a Week', value: 'Thrice a Week' },
            { label: 'Monthly', value: 'Monthly' },
            { label: 'Every Weekday', value: 'Every Weekday' }
        ]
    };
    const dispatch = useDispatch();

    const [hhaDisciplines, setHHADisciplines] = useState(HHA_OPTIONS.CHECKBOX_OPTIONS);
    const handleCheckboxChange = (index) => {
        const updatedDisciplines = [...hhaDisciplines];
        updatedDisciplines[index].checked = !updatedDisciplines[index].checked;
        setHHADisciplines(updatedDisciplines);
        const filteredList = updatedDisciplines
            .filter((item) => item.checked)
            .map((item) => ({
                service: item.label,
                caseSequence: item?.selectedOption?.value
            }));
        dispatch(setMedicalOrderDetails({ name: 'HHA', value: filteredList }));
    };

    const handleDropdownChange = (index, selectedOption) => {
        const updatedDisciplines = [...hhaDisciplines];
        updatedDisciplines[index].selectedOption = selectedOption;
        setHHADisciplines(updatedDisciplines);
        const filteredList = updatedDisciplines
            .filter((item) => item.checked)
            .map((item) => ({
                service: item.label,
                caseSequence: item?.selectedOption?.value
            }));
        dispatch(setMedicalOrderDetails({ name: 'HHA', value: filteredList }));
    };

    return (
        <div>
            <div>
                <Heading type={HEADING.H3}>Skill Selection</Heading>
            </div>

            <div>
                {hhaDisciplines.map((hhaDiscipline, index) => (
                    <div className="nurse-disciplins" key={index}>
                        <div className="block1">
                            <CheckboxWLabel
                                checked={hhaDisciplines[index]?.checked}
                                label={hhaDiscipline.label}
                                onChangeCb={() => handleCheckboxChange(index)}
                                name={hhaDiscipline[index]?.name}
                                value={hhaDiscipline[index]?.value}
                            />
                        </div>
                        <div className="block2">
                            <SelectDropdown
                                // type="text"
                                // placeHolder={'Frequency'}
                                // name="frequency"
                                // options={HHA_OPTIONS.OPTIONS}
                                // onSelectCb={(selectedOption) => handleDropdownChange(index, selectedOption)}
                                // value={hhaDiscipline.selectedOption}

                                type="text"
                                placeHolder={'Frequency'}
                                name={`hhaDisciplines_${index}`}
                                onSelectCb={(name, selectedOption) => handleDropdownChange(index, selectedOption)}
                                //  value={hhaDiscipline.selectedOption}
                                // onSelectCb={(selectedOption) => handleDropdownChange(index, selectedOption)}
                                options={HHA_OPTIONS.OPTIONS}
                                value={hhaDisciplines[index].selectedOption}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HHA;
