import React, { useEffect, useState } from 'react';
import TextInput from '../../../../components/input/textinput/TextInput';
import { HEADING } from '../../../../components/heading/constants/constants';
import Heading from '../../../../components/heading/Heading';
import CheckboxWLabel from '../../../../components/checkbox/checkboxwlabel/CheckboxWLabel';
import RadioInput from '../../../../components/input/radioinput/RadioInput';
import TextArea from '../../../../components/input/textarea/TextArea';
import SignaturePad from '../../../../components/signaturePad/SignaturePad';
import { useDispatch, useSelector } from 'react-redux';
import GeneralValidator, { generalValidator } from '../../../../libs/utility/validators/GeneralValidator';
import {
    componentKey,
    setActiveRefferalPatientIntakeStep,
    setFaceToFace,
    setFaceToFaceFieldsTouched,
    setPatientReferralIntakeSign,
} from '../../referral-intake/PatientManagementSlice';
import DatePicker from '../../../../components/datePicker/DatePicker';
import { useParams } from 'react-router-dom';
import { postFaceToFace } from '../../referral-intake/PatientManagementSaga';
import { toast } from 'react-toastify';

const FaceToFaceForm = () => {
    const { agencyId, physicianId, patientId } = useParams();

    const {
        patientReferralIntakeSign,
        faceToFace,
        faceToFaceFieldTouched,
        patientById,
    } = useSelector((state) => state[componentKey]);

    const dispatch = useDispatch();
    const handleSaveSignatureClick = (sign, isCanvasEmpty) => {
        dispatch(setFaceToFaceFieldsTouched(true));
        if (!GeneralValidator.validateRequiredFields(faceToFace)) {
            if (!isCanvasEmpty) {
                dispatch(setPatientReferralIntakeSign(sign));
                dispatch(postFaceToFace({ agencyId, physicianId, patientId, faceToFace, sign, patientById }));
                dispatch(setActiveRefferalPatientIntakeStep(2));
            } else {
                toast.error('Please sign the consent form!');
            }
        } else {
            toast.error('Please enter all required fields');
        }
    };

    const onChangeHandler = (event, rules) => {
        const { name, value, type } = event.target;
        let insuranceIdRegex = /^[a-zA-Z0-9]+$/;
        let noWhiteSpaceRegex = /^\s|\s/;
        let regex = /\d/
        if(name == "middleName"){

            if(regex.test(value) || noWhiteSpaceRegex.test(value) && type === 'text'){
                if (rules) {
                    const errors = generalValidator.validate(value, rules);
                    dispatch(setFaceToFace({ object: { [name]: { value, errors, rules } } }));
                } else {
                    dispatch(setFaceToFace({ object: { [name]: { value } } }));
                }
            }
        }
        if (name == 'id') {
            if (
                (type === 'text' && insuranceIdRegex.test(value)) ||
                (noWhiteSpaceRegex.test(value) && type === 'text')
            ) {
                if (rules) {
                    const errors = generalValidator.validate(value, rules);
                    dispatch(setFaceToFace({ object: { [name]: { value, errors, rules } } }));
                } else {
                    dispatch(setFaceToFace({ object: { [name]: { value } } }));
                }
            }
        }
        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(
                setFaceToFace({
                    object: { [name]: { value, errors, rules } }
                })
            );
        } else {
            dispatch(setFaceToFace({ object: { [name]: { value } } }));
        }
    };
    return (
        <div className="face-to-face-container">
            <div>
                <>
                    <div>
                        <Heading type={HEADING.H6}>
                            Hospitalist provider conducted the face-to-face encounter and certification.
                        </Heading>
                    </div>
                    <div className="name-block">
                        <div className="block">
                            <TextInput
                                type="text"
                                placeHolder={'Please enter lastname'}
                                name="lastName"
                                label="Last Name (Family Name)"
                                onChangeCb={onChangeHandler}
                                value={patientById?.lastName}
                                
                                formSubmitted={faceToFaceFieldTouched}
                            />
                        </div>
                        <div className="block">
                            <TextInput
                                type="text"
                                placeHolder={'Please enter firstname'}
                                name="firstName"
                                label="First Name (Given Name)"
                                onChangeCb={onChangeHandler}
                                value={patientById?.firstName}
                                formSubmitted={faceToFaceFieldTouched}
                            />
                        </div>
                        <div className="block">
                            <TextInput
                                type="text"
                                placeHolder={'Please enter middlename'}
                                name="middleName"
                                label="Middle Initial (If Any)"
                                onChangeCb={onChangeHandler}
                                value={faceToFace.middleName.value}
                               
                            />
                        </div>
                    </div>
                    <div className="name-block">
                       
                        <div className="block">
                            <DatePicker
                                label="Patient D.O.B"
                                name="dateOfBirth"
                                onChangeCb={onChangeHandler}
                                value={patientById?.dateOfBirth}
                                
                            />
                        </div>
                        <div className="block">
                            <TextInput
                                type="text"
                                placeHolder={'Please enter ID'}
                                name="id"
                                onChangeCb={onChangeHandler}
                                label="ID"
                                value={faceToFace.id.value}
                                rules={faceToFace.id.rules}
                                errors={faceToFace.id.errors}
                                formSubmitted={faceToFaceFieldTouched}
                            />
                        </div>
                        <div className="block"></div>
                    </div>
                </>
                <div className="section-1">
                    <Heading type={HEADING.H3}>Qualifying Encounter Type:</Heading>
                    <div>
                        <CheckboxWLabel
                            checked={faceToFace?.quallifyingEncounterType_section1_service?.isChecked}
                            label="Section 1:"
                            onChangeCb={(event) => {
                                dispatch(
                                    setFaceToFace({
                                        object: {
                                            [event.target.name]: {
                                                value: 'Hospitalist provider conducted the face-to-face encounter and certificationC',
                                                isChecked:
                                                    !faceToFace?.quallifyingEncounterType_section1_service?.isChecked
                                            }
                                        }
                                    })
                                );
                            }}
                            name="quallifyingEncounterType_section1_service"
                        />

                        <Heading type={HEADING.H6}>
                            Hospitalist provider conducted the face-to-face encounter and certification.
                        </Heading>
                    </div>
                    <div className="name-block">
                        <div className="block">
                            <DatePicker
                                label="Date Conducted"
                                name="quallifyingEncounterType_section1_dateConducted"
                                onChangeCb={onChangeHandler}
                                value={faceToFace.quallifyingEncounterType_section1_dateConducted.value}
                                rules={faceToFace.quallifyingEncounterType_section1_dateConducted.rules}
                                errors={faceToFace.quallifyingEncounterType_section1_dateConducted.errors}
                                formSubmitted={faceToFaceFieldTouched}
                            />
                        </div>
                        <div className="block">
                            <TextInput
                                type="text"
                                placeHolder={'Please enter physician name'}
                                name="quallifyingEncounterType_section1_providerName"
                                label="Physician name"
                                onChangeCb={onChangeHandler}
                                value={ patientById?.physician?.firstName + ' ' + patientById?.physician?.lastName}
                                // value={faceToFace.quallifyingEncounterType_section1_providerName.value}
                                rules={faceToFace.quallifyingEncounterType_section1_providerName.rules}
                                errors={faceToFace.quallifyingEncounterType_section1_providerName.errors}
                                formSubmitted={faceToFaceFieldTouched}
                            />
                        </div>
                        <div className="block"></div>
                    </div>
                    <div className="">
                        <Heading type={HEADING.H6}>
                            Copy of face-to-face certification documentation requested/obtained:
                        </Heading>
                        <RadioInput
                            label={{ suffixLabel: 'Yes' }}
                            name={'quallifyingEncounterType_section1_questionResponse'}
                            onChangeCb={onChangeHandler}
                            value={'Yes'}
                            checked={
                                faceToFace.quallifyingEncounterType_section1_questionResponse.value === 'Yes'
                                    ? true
                                    : false
                            }
                        />
                        <RadioInput
                            label={{ suffixLabel: 'No' }}
                            name={'quallifyingEncounterType_section1_questionResponse'}
                            onChangeCb={onChangeHandler}
                            value={'No'}
                            checked={
                                faceToFace.quallifyingEncounterType_section1_questionResponse.value === 'No'
                                    ? true
                                    : false
                            }
                        />
                    </div>
                </div>
                <div className="section-2 mt-4">
                    <div>
                        <CheckboxWLabel
                            checked={faceToFace?.quallifyingEncounterType_section2_service.isChecked}
                            label="Section 2:"
                            onChangeCb={(event) => {
                                dispatch(
                                    setFaceToFace({
                                        object: {
                                            [event.target.name]: {
                                                value: 'Face-to-face encounter conducted within 90 days of home careSOC',
                                                isChecked:
                                                    !faceToFace?.quallifyingEncounterType_section2_service?.isChecked
                                            }
                                        }
                                    })
                                );
                            }}
                            name="quallifyingEncounterType_section2_service"
                        />

                        <Heading type={HEADING.H6}>
                            Face-to-face encounter conducted within 90 days of home careSOC.
                        </Heading>
                    </div>
                    <div className="name-block">
                        <div className="block">
                            <DatePicker
                                label="Date Conducted"
                                name="quallifyingEncounterType_section2_dateConducted"
                                onChangeCb={onChangeHandler}
                                value={faceToFace.quallifyingEncounterType_section2_dateConducted.value}
                                rules={faceToFace.quallifyingEncounterType_section2_dateConducted.rules}
                                errors={faceToFace.quallifyingEncounterType_section2_dateConducted.errors}
                                formSubmitted={faceToFaceFieldTouched}
                            />
                        </div>
                        <div className="block">
                            <TextInput
                                type="text"
                                placeHolder={'Please enter physician name'}
                                name="quallifyingEncounterType_section2_providerName"
                                label="Physician name"
                                onChangeCb={onChangeHandler}
                                value={ patientById?.physician?.firstName + ' ' + patientById?.physician?.lastName}
                                // value={faceToFace?.quallifyingEncounterType_section2_providerName?.value}
                                rules={faceToFace.quallifyingEncounterType_section2_providerName.rules}
                                errors={faceToFace.quallifyingEncounterType_section2_providerName.errors}
                                formSubmitted={faceToFaceFieldTouched}
                            />
                        </div>
                        <div className="block"></div>
                    </div>
                    <div>
                        <Heading type={HEADING.H6}>
                            Copy of face-to-face certification documentation requested/obtained:
                        </Heading>
                        <RadioInput
                            label={{ suffixLabel: 'Yes' }}
                            name={'quallifyingEncounterType_section2_questionResponse'}
                            value={'Yes'}
                            onChangeCb={onChangeHandler}
                            checked={
                                faceToFace.quallifyingEncounterType_section2_questionResponse.value === 'Yes'
                                    ? true
                                    : false
                            }
                        />
                        <RadioInput
                            label={{ suffixLabel: 'No' }}
                            name={'quallifyingEncounterType_section2_questionResponse'}
                            value={'No'}
                            onChangeCb={onChangeHandler}
                            checked={
                                faceToFace.quallifyingEncounterType_section2_questionResponse.value === 'No'
                                    ? true
                                    : false
                            }
                        />
                    </div>
                </div>
                <div className="section-3 mt-4">
                    <div>
                        <CheckboxWLabel
                            checked={faceToFace?.quallifyingEncounterType_section3_service.isChecked}
                            label="section-3"
                            onChangeCb={(event) => {
                                dispatch(
                                    setFaceToFace({
                                        object: {
                                            [event.target.name]: {
                                                value: 'Face-to-face encounter conducted within 30 days of home care SOC',
                                                isChecked:
                                                    !faceToFace?.quallifyingEncounterType_section3_service.isChecked
                                            }
                                        }
                                    })
                                );
                            }}
                            name="quallifyingEncounterType_section3_service"
                        />

                        <Heading type={HEADING.H6}>
                            Face-to-face encounter conducted within 30 days of home care SOC.
                        </Heading>
                    </div>
                    <div className="name-block">
                        <div className="block">
                            <DatePicker
                                label="SOC Date"
                                name="quallifyingEncounterType_section3_SOCDate"
                                onChangeCb={onChangeHandler}
                                value={faceToFace.quallifyingEncounterType_section3_SOCDate.value}
                                rules={faceToFace.quallifyingEncounterType_section3_SOCDate.rules}
                                errors={faceToFace.quallifyingEncounterType_section3_SOCDate.errors}
                                formSubmitted={faceToFaceFieldTouched}
                            />
                        </div>
                        <div className="block">
                            <DatePicker
                                label="Date of 30th day"
                                name="quallifyingEncounterType_section3_thirtyDay"
                                onChangeCb={onChangeHandler}
                                value={faceToFace.quallifyingEncounterType_section3_thirtyDay.value}
                                rules={faceToFace.quallifyingEncounterType_section3_thirtyDay.rules}
                                errors={faceToFace.quallifyingEncounterType_section3_thirtyDay.errors}
                                formSubmitted={faceToFaceFieldTouched}
                            />
                        </div>
                        <div className="block">
                            <DatePicker
                                label="Date of visit"
                                name="quallifyingEncounterType_section3_dateOfVisit"
                                onChangeCb={onChangeHandler}
                                value={faceToFace.quallifyingEncounterType_section3_dateOfVisit.value}
                                rules={faceToFace.quallifyingEncounterType_section3_dateOfVisit.rules}
                                errors={faceToFace.quallifyingEncounterType_section3_dateOfVisit.errors}
                                formSubmitted={faceToFaceFieldTouched}
                            />
                        </div>
                    </div>
                    
                    <div>
                        <Heading type={HEADING.H6}>
                            Was physician’s office contacted to verify appointment and purpose of appointment?
                        </Heading>
                        <RadioInput
                            label={{ suffixLabel: 'Yes' }}
                            name={'quallifyingEncounterType_section3_questionResponse'}
                            value={'Yes'}
                            onChangeCb={onChangeHandler}
                            checked={
                                faceToFace.quallifyingEncounterType_section3_questionResponse.value === 'Yes'
                                    ? true
                                    : false
                            }
                        />
                        <RadioInput
                            label={{ suffixLabel: 'No' }}
                            name={'quallifyingEncounterType_section3_questionResponse'}
                            value={'No'}
                            onChangeCb={onChangeHandler}
                            checked={
                                faceToFace.quallifyingEncounterType_section3_questionResponse.value === 'No'
                                    ? true
                                    : false
                            }
                        />
                    </div>
                    {
                        // if yes
                        <div>
                            <div>
                                <p>IF Yes</p>
                            </div>
                            <div>
                                <div className="name-block">
                                    <div className="block">
                                        <DatePicker
                                            label="Date Conducted"
                                            name="quallifyingEncounterType_section3_dateConducted_2"
                                            onChangeCb={onChangeHandler}
                                            value={faceToFace.quallifyingEncounterType_section3_dateConducted_2.value}
                                           
                                        />
                                    </div>
                                    <div className="block">
                                        <TextInput
                                            type="text"
                                            placeHolder={'Please enter physician name'}
                                            name="quallifyingEncounterType_section3_providerName_2"
                                            label="Physician name"
                                            onChangeCb={onChangeHandler}
                                            value={faceToFace.quallifyingEncounterType_section3_providerName_2.value}
                                           
                                        />
                                    </div>
                                    <div className="block"></div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        // if no
                        <div>
                            <div>
                                <p>IF No</p>
                            </div>
                            <div>
                                <div>
                                    <Heading type={HEADING.H3}>Explain :</Heading>
                                    <TextArea
                                        name="explain"
                                        value={faceToFace.explain.value}
                                        onChangeCb={onChangeHandler}
                                    ></TextArea>
                                </div>
                                <div>
                                    <Heading type={HEADING.H3}>Additional Information :</Heading>
                                    <TextArea
                                        name="additionalInformation"
                                        value={faceToFace.additionalInformation.value}
                                        onChangeCb={onChangeHandler}
                                    ></TextArea>
                                </div>
                            </div>
                        </div>
                    }
                </div>

                <div className="mt-4">
                    <Heading type={HEADING.H3}>
                        To be filled out by physician conducting the initial certification/face-to-face encounter.
                    </Heading>
                    <div>
                        <Heading type={HEADING.H3}>Physician Attention :</Heading>
                        <div className="block">
                            <TextInput
                                type="text"
                                placeHolder={'Please enter physician name'}
                                name="PhysicianAttention_physicianName"
                                label="Home Health Certifying Physician (print name):"
                                onChangeCb={onChangeHandler}
                                value={patientById?.physician?.firstName + ' ' + patientById?.physician?.lastName}
                                rules={faceToFace.PhysicianAttention_physicianName.rules}
                                errors={faceToFace.PhysicianAttention_physicianName.errors}
                                formSubmitted={faceToFaceFieldTouched}
                            />
                        </div>
                    </div>
                    <div>
                        <Heading type={HEADING.H3}>
                            I certify that this patient is under my care and that I, or a nurse practitioner, clinical
                            nurse specialist, certified nurse midwife, or physician’s assistant working with me, had a
                            face-to-face encounterthat meets the physician face-to-face encounterrequirements on
                        </Heading>
                        <div className="name-block">
                            <div className="block">
                                <DatePicker
                                    label="Date Conducted"
                                    name="PhysicianAttention_attestationDate"
                                    onChangeCb={onChangeHandler}
                                    value={faceToFace.PhysicianAttention_attestationDate.value}
                                    rules={faceToFace.PhysicianAttention_attestationDate.rules}
                                    errors={faceToFace.PhysicianAttention_attestationDate.errors}
                                    formSubmitted={faceToFaceFieldTouched}
                                />
                            </div>
                            <div className="block">
                                <TextInput
                                    type="text"
                                    placeHolder={'Please enter physician name'}
                                    name="PhysicianAttention_practitionerName"
                                    onChangeCb={onChangeHandler}
                                    label="Non-Physician Practitioner Name:"
                                    value={faceToFace.PhysicianAttention_practitionerName.value}
                                    rules={faceToFace.PhysicianAttention_practitionerName.rules}
                                    errors={faceToFace.PhysicianAttention_practitionerName.errors}
                                    formSubmitted={faceToFaceFieldTouched}
                                />
                            </div>
                            <div className="block">
                                <TextInput
                                    type="text"
                                    placeHolder={'Please enter license no.'}
                                    name="PhysicianAttention_licenseNo"
                                    onChangeCb={onChangeHandler}
                                    label="License No"
                                    value={faceToFace.PhysicianAttention_licenseNo.value}
                                    rules={faceToFace.PhysicianAttention_licenseNo.rules}
                                    errors={faceToFace.PhysicianAttention_licenseNo.errors}
                                    formSubmitted={faceToFaceFieldTouched}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Heading type={HEADING.H3}>
                            The encounter with the patient was in whole, orin part, forthe following medical condition,
                            which is the primary reason for home health care
                        </Heading>
                        <div>
                            <Heading type={HEADING.H3}>Descibe :</Heading>
                            <TextArea
                                name="PhysicianAttention_encounterDescription"
                                value={faceToFace.PhysicianAttention_encounterDescription.value}
                                onChangeCb={onChangeHandler}
                            ></TextArea>
                        </div>
                        <div>
                           
                            <div className="block">
                                <TextInput
                                    type="text"
                                    placeHolder={''}
                                    name="PhysicianAttention_clinicalFindings"
                                    label="My clinical findings support the need for the services listed below because:"
                                    onChangeCb={onChangeHandler}
                                    value={faceToFace.PhysicianAttention_clinicalFindings.value}
                                    rules={faceToFace.PhysicianAttention_clinicalFindings.rules}
                                    errors={faceToFace.PhysicianAttention_clinicalFindings.errors}
                                    formSubmitted={faceToFaceFieldTouched}
                                />
                            </div>
                        </div>
                        <div>
                            <Heading type={HEADING.H3}>
                                I certify that my clinical findings support that this patient is homebound* because:
                            </Heading>
                            <TextArea
                                name="PhysicianAttention_clinicalFindingsReason"
                                value={faceToFace.PhysicianAttention_clinicalFindingsReason.value}
                                onChangeCb={onChangeHandler}
                            ></TextArea>
                            <span className="">
                                (<span>*</span>i.e. Patient has normal inability toleavethe homeand absences fromhome
                                requireconsiderable and taxing effort, are formedicalreasons orreligious services or
                                infrequently or of short duration when for other reasons.)
                            </span>
                        </div>
                    </div>
                    <div className="">
                        <Heading type={HEADING.H6}>
                            I certify that the following home care services are medically reasonable and necessary:
                            (Check all that apply):
                        </Heading>
                       
                        <div className="d-flex">
                            <div className="me-4">
                                <CheckboxWLabel
                                    checked={faceToFace?.serviceNursing?.isChecked === 'Nursing'}
                                    label="Nursing"
                                    onChangeCb={(event) => {
                                        dispatch(
                                            setFaceToFace({
                                                object: {
                                                    [event.target.name]: {
                                                        value: event.target.value,
                                                        isChecked: event.target.checked ? 'Nursing' : ''
                                                    }
                                                }
                                            })
                                        );
                                    }}
                                    name="serviceNursing"
                                    value={'Nursing'}
                                />
                            </div>
                            <div className="">
                                <CheckboxWLabel
                                    checked={faceToFace?.serviceTherapy?.isChecked === 'Therapy'}
                                    label="Therapy"
                                    onChangeCb={(event) => {
                                        dispatch(
                                            setFaceToFace({
                                                object: {
                                                    [event.target.name]: {
                                                        value: event.target.value,

                                                        isChecked: event.target.checked ? 'Therapy' : ''
                                                    }
                                                }
                                            })
                                        );
                                    }}
                                    name="serviceTherapy"
                                    value={'Therapy'}
                                />
                            </div>
                        </div>
                     
                    </div>
                    <div>
                        <Heading type={HEADING.H3}>Physician, please sign and return within 2 days.</Heading>
                        <div className="name-block">
                            <div className="block">
                                <DatePicker
                                    label="Date of Signature:"
                                    name="dateOfSignature"
                                    onChangeCb={onChangeHandler}
                                    value={faceToFace.dateOfSignature.value}
                                    rules={faceToFace.dateOfSignature.rules}
                                    errors={faceToFace.dateOfSignature.errors}
                                    formSubmitted={faceToFaceFieldTouched}
                                  
                                />
                            </div>
                            <div className="block">
                                <TextInput
                                    type="text"
                                    placeHolder={'Please enter physician name'}
                                    name="physiciansName"
                                    label="Physician Name:"
                                    onChangeCb={onChangeHandler}
                                    value={patientById?.physician?.firstName + ' ' + patientById?.physician?.lastName}
                                    rules={faceToFace.physiciansName.rules}
                                    errors={faceToFace.physiciansName.errors}
                                    formSubmitted={faceToFaceFieldTouched}
                                />
                            </div>
                            <div className="block"></div>
                        </div>
                        <SignaturePad
                            saveSignatureCb={handleSaveSignatureClick}
                            savedSignature={patientReferralIntakeSign}
                            isPreviousAllowed
                            onPrevCb={() => {
                                dispatch(setActiveRefferalPatientIntakeStep(0));
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default FaceToFaceForm;
