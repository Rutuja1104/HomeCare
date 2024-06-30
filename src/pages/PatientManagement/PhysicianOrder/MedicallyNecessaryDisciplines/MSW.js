import React, { useState } from 'react';
import Heading from '../../../../components/heading/Heading';
import { HEADING } from '../../../../components/heading/constants/constants';
import SelectDropdown from '../../../../components/dropdown/selectdropdown/SelectDropdown';
import CheckboxWLabel from '../../../../components/checkbox/checkboxwlabel/CheckboxWLabel';
import { useDispatch, useSelector } from 'react-redux';
import { componentKey, setMedicalOrderDetails } from '../../referral-intake/PatientManagementSlice';
const MSW = () => {
    const MSW_OPTIONS = {
        CHECKBOX_OPTIONS: [
            {
                label: 'Assess home situation',
                checked: false,
                name: 'Assess home situation',
                value: '',
                onChangeCb: () => {}
            },
            {
                label: 'Assessment social /emotional factors',
                checked: false,
                name: 'Assessment social /emotional factors',
                value: '',
                onChangeCb: () => {}
            },
            {
                label: 'Referral to community programs',
                checked: false,
                name: 'Referral to community programs',
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
                label: 'ALF / nursing home placement',
                checked: false,
                name: 'ALF / nursing home placement',
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
    const {  medicalOrderDetails } = useSelector((state) => state[componentKey]);

    const [mswDisciplines, setMswDisciplines] = useState(MSW_OPTIONS.CHECKBOX_OPTIONS);
    const handleCheckboxChange = (index) => {
        const updatedDisciplines = [...mswDisciplines];
        updatedDisciplines[index].checked = !updatedDisciplines[index].checked;
        setMswDisciplines(updatedDisciplines);
        const filteredList = updatedDisciplines.filter((item) => item.checked).map((item)=>({
            service : item.label,
            caseSequence: item?.selectedOption?.value
        }));
        dispatch(setMedicalOrderDetails({name :"MSW" ,value:filteredList}))
    };

    const handleDropdownChange = (index, selectedOption) => {
        const updatedDisciplines = [...mswDisciplines];
        updatedDisciplines[index].selectedOption = selectedOption;
        setMswDisciplines(updatedDisciplines);

        const filteredList = updatedDisciplines.filter((item) => item.checked).map((item)=>({
            service : item.label,
            caseSequence: item?.selectedOption?.value
        }));
        dispatch(setMedicalOrderDetails({name :"MSW" ,value:filteredList}))
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

            <div>
                {mswDisciplines.map((mswDiscipline, index) => (
                    <div className="nurse-disciplins" key={index}>
                        <div className="block1">
                            <CheckboxWLabel
                                checked={mswDisciplines[index].checked}
                                label={mswDiscipline.label}
                                onChangeCb={() => handleCheckboxChange(index)}
                                name={mswDiscipline[index]?.name}
                                value={mswDiscipline[index]?.value}
                            />
                        </div>
                        <div className="block2">
                            <SelectDropdown
                                type="text"
                                placeHolder={'Frequency'}
                                name={`mswDiscipline_${index}`}
                                //  value={mswDiscipline.selectedOption}
                                onSelectCb={(name, selectedOption) => handleDropdownChange(index, selectedOption)}
                                // onSelectCb={(selectedOption) => handleDropdownChange(index, selectedOption)}
                                options={MSW_OPTIONS.OPTIONS}
                                value={mswDisciplines[index].selectedOption}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MSW;
