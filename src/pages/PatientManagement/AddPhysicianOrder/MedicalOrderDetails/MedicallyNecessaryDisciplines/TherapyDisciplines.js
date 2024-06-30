import React, { useState } from 'react';
import Heading from '../../../../../components/heading/Heading';
import { HEADING } from '../../../../../components/heading/constants/constants';
import SelectDropdown from '../../../../../components/dropdown/selectdropdown/SelectDropdown';
import CheckboxWLabel from '../../../../../components/checkbox/checkboxwlabel/CheckboxWLabel';
import { useDispatch, useSelector } from 'react-redux';
import { componentKey, setMedicalOrderDetails } from '../../physicianOrderSlice';
const TherapiestDisciplines = () => {
    const THERAPIEST_OPTIONS = {
        CHECKBOX_OPTIONS: [
            {
                label: 'PT evaluation',
                checked: false,
                name: 'PT evaluation',
                value: '',
                onChangeCb: () => {}
            },
            {
                label: 'Therapeutic exercise',
                checked: false,
                name: 'Therapeutic exercise',
                value: '',
                onChangeCb: () => {}
            },
            {
                label: 'Balance / coordination exercise',
                checked: false,
                name: 'Balance / coordination exercise',
                value: '',
                onChangeCb: () => {}
            },
            {
                label: 'Transfer training',
                checked: false,
                name: 'Transfer training',
                value: '',
                onChangeCb: () => {}
            },
            {
                label: 'Bed mobility',
                checked: false,
                name: 'Bed mobility',
                value: '',
                onChangeCb: () => {}
            },
            {
                label: 'Gait training with AD',
                checked: false,
                name: 'Gait training with AD',
                value: '',
                onChangeCb: () => {}
            },
            {
                label: 'Active ROM exercises',
                checked: false,
                name: 'Active ROM exercises',
                value: '',
                onChangeCb: () => {}
            },
            {
                label: 'Use ofassistive device',
                checked: false,
                name: 'Use ofassistive device',
                value: '',
                onChangeCb: () => {}
            },
            {
                label: 'Home exercise program',
                checked: false,
                name: 'Home exercise program',
                value: '',
                onChangeCb: () => {}
            },
            {
                label: 'Heat',
                checked: false,
                name: 'Heat',
                value: '',
                onChangeCb: () => {}
            },
            {
                label: 'Safety awareness',
                checked: false,
                name: 'Safety awareness',
                value: '',
                onChangeCb: () => {}
            },
            {
                label: 'Pain management',
                checked: false,
                name: 'Pain management',
                value: '',
                onChangeCb: () => {}
            },
            {
                label: 'Massage',
                checked: false,
                name: 'Massage',
                value: '',
                onChangeCb: () => {}
            },
            {
                label: 'EMS',
                checked: false,
                name: 'EMS',
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
    const { medicalOrderDetails } = useSelector((state) => state[componentKey]);
    const [therapiestDisciplines, setTherapiestDisciplines] = useState(THERAPIEST_OPTIONS.CHECKBOX_OPTIONS);
    const handleCheckboxChange = (index) => {
        const updatedDisciplines = [...therapiestDisciplines];
        updatedDisciplines[index].checked = !updatedDisciplines[index].checked;
        setTherapiestDisciplines(updatedDisciplines);
        const filteredList = updatedDisciplines
            .filter((item) => item.checked)
            .map((item) => ({
                service: item.label,
                caseSequence: item?.selectedOption?.value
            }));
        dispatch(setMedicalOrderDetails({ name: 'therapist', value: filteredList }));
    };

    const handleDropdownChange = (index, selectedOption) => {
        const updatedDisciplines = [...therapiestDisciplines];
        updatedDisciplines[index].selectedOption = selectedOption;
        setTherapiestDisciplines(updatedDisciplines);
        const filteredList = updatedDisciplines
            .filter((item) => item.checked)
            .map((item) => ({
                service: item.label,
                caseSequence: item?.selectedOption?.value
            }));
        dispatch(setMedicalOrderDetails({ name: 'therapist', value: filteredList }));
    };

    return (
        <div>
            <div>
                <Heading type={HEADING.H3}>Skill Selection</Heading>
                {/* <SelectDropdown
                    type="text"
                    placeHolder={'Nurse'}
                    name="orderOfBenifits"
                    // value={patientDropdownDetails.patientPhysician}
                    // onSelectCb={(name, selectedOption) => {
                    //     dispatch(setPatienDetailsDropdown({ name, selectedOption }));
                    // }}
                    // options={physicians}
                    label="Order Of Benifits"
                    // onSearchInputChangeCb={(e) => {
                    //     dispatch(getPhysicians({ name: e.target.value }));
                    // }}
                /> */}
            </div>

            {/* {THERAPIEST_OPTIONS.CHECKBOX_OPTIONS.map((nurseDiscipline, index) => (
                <div className="nurse-disciplins" key={index}>
                    <div className="block1">
                        <CheckboxWLabel
                            checked={nurseDiscipline.checked}
                            label={nurseDiscipline.label}
                            onChangeCb={nurseDiscipline.onChangeCb}
                            name={nurseDiscipline.name}
                            value={nurseDiscipline.value}
                        />
                    </div>
                    <div className="block2">
                        <SelectDropdown
                            type="text"
                            placeHolder={'Frequency'}
                            name="orderOfBenifits"
                            options={THERAPIEST_OPTIONS.OPTIONS}
                        />
                    </div>
                </div>
            ))} */}
            <div>
                {therapiestDisciplines.map((item, index) => (
                    <div className="nurse-disciplins" key={index}>
                        <div className="block1">
                            <CheckboxWLabel
                                checked={therapiestDisciplines[index].checked}
                                label={item.label}
                                onChangeCb={() => handleCheckboxChange(index)}
                                name={item[index]?.name}
                                value={item[index]?.value}
                            />
                        </div>
                        <div className="block2">
                            <SelectDropdown
                                type="text"
                                placeHolder={'frequency'}
                                name={`therapiestDisciplines_${index}`}
                                // onSelectCb={(selectedOption) => handleDropdownChange(index, selectedOption)}
                                onSelectCb={(name, selectedOption) => handleDropdownChange(index, selectedOption)}
                                options={THERAPIEST_OPTIONS.OPTIONS}
                                value={therapiestDisciplines[index].selectedOption}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TherapiestDisciplines;
