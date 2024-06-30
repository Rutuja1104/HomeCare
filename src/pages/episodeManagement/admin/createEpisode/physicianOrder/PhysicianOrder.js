import React, { useState } from 'react'

import Heading from '../../../../../components/heading/Heading'
import ResponsiveBox from '../../../../../components/responsivebox/ResponsiveBox'
import TextInput from '../../../../../components/input/textinput/TextInput'
import DatePicker from '../../../../../components/datePicker/DatePicker'
import TextArea from '../../../../../components/input/textarea/TextArea'
import Icons from '../../../../../components/icon/Icon'
import Container from '../../../../../components/container/Container'
import CheckboxWLabel from '../../../../../components/checkbox/checkboxwlabel/CheckboxWLabel'
import SelectDropdown from '../../../../../components/select/Select'

import { HEADING } from '../../../../../components/heading/constants/constants'
import { VEC_ICON_NAME } from '../../../../../components/icon/constants'
import { Collapse } from 'reactstrap'
import { VISIT_FREQUENCY_OPTIONS } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { componentKey, setMedicallyNecessaryDiscipliner } from '../CreateEpisodeSlice'
import Base64Image from '../../../../../components/base64Image/Base64Image'

const PhysicianOrder = () => {
    const [collapse, setCollapse] = useState(0)

    const dispatch = useDispatch()

    const { medicallyNecessaryDisciplines, patientDetails } = useSelector(state => state[componentKey])

    const toggle = (idx) => {
        if (collapse == idx) {
            setCollapse(-1)
        } else {
            setCollapse(idx)
        }
    }

    return (
        <React.Fragment>
            <Heading type={HEADING.H3} customStyle={{ marginBottom: "20px" }}>Physician Order :</Heading>
            <ResponsiveBox size={500}>
                <TextInput
                    type='text'
                    label='First Name'
                    value={patientDetails?.firstName || "N/A"}
                    disabled={true}
                />
                <TextInput
                    type='text'
                    placeHolder={'Please enter blood pressure'}
                    label='Last Name'
                    value={patientDetails?.lastName || "N/A"}
                    disabled={true}
                />
            </ResponsiveBox>
            <ResponsiveBox size={500}>
                <DatePicker
                    placeHolder={'Please select Cert to date'}
                    name='DateOfBirth'
                    label='Date of Birth'
                    value={patientDetails?.dateOfBirth || "N/A"}
                    disabled={true}
                />
                <TextInput
                    type='text'
                    placeHolder={'Please enter blood pressure'}
                    label='Email'
                    value={patientDetails?.email || "N/A"}
                    disabled={true}
                />
            </ResponsiveBox>
            <ResponsiveBox size={500}>
                <TextInput
                    type='text'
                    placeHolder={'Please enter blood pressure'}
                    label='Physician’s Name'
                    value={`${patientDetails?.physician?.firstName} ${patientDetails?.physician?.lastName}` || "N/A"}
                    disabled={true}
                />
                <TextInput
                    type='text'
                    label='HIC Number'
                    value={patientDetails?.HICNumber || "N/A"}
                    disabled={true}
                />
                <TextInput
                    type='text'
                    placeHolder={'Please enter blood pressure'}
                    label='SSN'
                    value={patientDetails?.ssn || "N/A"}
                    disabled={true}
                />
            </ResponsiveBox>

            <TextArea
                disabled={true}
                label={"Patient Diagnosis(es)"}
                value={patientDetails?.medicalOrder && patientDetails?.medicalOrder[0]?.patientDiagnostics ? patientDetails?.medicalOrder[0]?.patientDiagnostics : ''}
            />

            <Heading type={HEADING.H3} customStyle={{ marginBottom: "20px" }}>Medically Necessary Disciplines :</Heading>

            {medicallyNecessaryDisciplines.map((item, idx) => {
                return (
                    <div key={idx} className='mb-3'>
                        <div onClick={() => toggle(idx)} className={`custom-collapse ${collapse == idx && "collapse-border"}`}>
                            <div>
                                <span className='document-name'>{item.title}</span>
                            </div>
                            <Icons iconName={VEC_ICON_NAME.PLUS_ICON} />
                        </div>
                        <Collapse
                            isOpen={true} //collapse == idx
                        >
                            <Container containerMainClassName="collapse-container">
                                {item.disciplines.map((disc, index) => {
                                    return (
                                        <div className='d-flex justify-content-between align-items-baseline' key={index}>
                                            <CheckboxWLabel
                                                checked={disc.checked}
                                                label={disc.label}
                                                // onChangeCb={(e) => dispatch(setMedicallyNecessaryDiscipliner({ parentIndex: idx, childIndex: index, checked: e.target.checked, type: "Checked" }))}
                                                containerStyles={{ margin: index > 0 ? "30px 0" : "15px 0", width: "100%" }}
                                                labelCustomStyles={{ color: "var(--grey-70, #727272)" }}
                                            />
                                            <TextInput
                                                value={disc.selectedVisitFrequency}
                                                disabled={true}
                                            />

                                            {/* SelectDropdown convert if want to change frequency */}
                                            {/* <SelectDropdown
                                                defaultValue={disc.selectedVisitFrequency.length ? { value: disc.selectedVisitFrequency, label: disc.selectedVisitFrequency } : null}
                                                options={VISIT_FREQUENCY_OPTIONS}
                                                onChangeCb={e => dispatch(setMedicallyNecessaryDiscipliner({ parentIndex: idx, childIndex: index, value: e.target.value }))}
                                            /> */}
                                        </div>
                                    )
                                })}
                            </Container>
                        </Collapse>
                    </div>
                )
            })}
            <Base64Image base64={patientDetails?.medicalOrder && patientDetails?.medicalOrder[0]?.physiciansDigitalSignature ? patientDetails?.medicalOrder[0]?.physiciansDigitalSignature : ''} header="Physician Signature" />
        </React.Fragment>
    )
}

export default PhysicianOrder
