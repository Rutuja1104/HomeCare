import React, { useEffect, useState } from 'react';
import { BUTTON_TYPE } from '../../../../libs/constant';
import Button from '../../../../components/button/Button';
import Heading from '../../../../components/heading/Heading';
import { HEADING } from '../../../../components/heading/constants/constants';
import SelectDropdown from '../../../../components/select/Select';
import TextInput from '../../../../components/input/textinput/TextInput';
import { VEC_ICON_NAME } from '../../../../components/icon/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
    componentKey,
    setActiveRefferalPatientIntakeStep,
    setAddNewInformation,
    setMultipleServiceDetails,
    setRemoveNewInformation,
    setServiceDetails,
    setServiceDetailsFieldsTouched,
    setServiceDetailsFieldsToucheed
} from '../PatientManagementSlice';
import GeneralValidator, { generalValidator } from '../../../../libs/utility/validators/GeneralValidator';
import { PATIENT_SERVICE_DETAILS } from '../../constants';
import { getAllPayers, postServiceDetails } from '../PatientManagementSaga';
import General from '../../../../libs/utility/General';

const services = [
    { label: 'Skilled observation of wound site', value: 'Skilled observation of wound site' },
    { label: 'Pain assessment / management', value: 'Pain assessment / management' },
    { label: 'Ocupational Therapist', value: 'Ocupational Therapist' },
    { label: 'ADL Assistance', value: 'ADL Assistance' },
    {
        label: 'Personal Care Services/Homemaker',
        value: 'Personal Care Services/Homemaker'
    },
    { label: 'Assess home situation', value: 'Assess home situation' },
    {
        label: 'Assessment social /emotional factors',
        value: 'Assessment social /emotional factors'
    },
    {
        label: 'Referral to community programs',
        value: 'Referral to community programs'
    },
    {
        label: 'Report changes in favorable response to physician',
        value: 'Report changes in favorable response to physician'
    },
    { label: 'ALF / nursing home placement', value: 'ALF / nursing home placement' },
    {
        label: 'Pain assessment / management',
        value: 'Pain assessment / management'
    },
    {
        label: 'Teach safety precaution',
        value: 'Teach safety precaution'
    },
    {
        label: 'Teach proper diet / hydration',
        value: 'Teach proper diet / hydration'
    },
    {
        label: 'Skilled observation of wound site',
        value: 'Skilled observation of wound site'
    },
    {
        label: 'Teach disease process / disease management',
        value: 'Teach disease process / disease management'
    },
    {
        label: 'Teach symptoms to report nurse, physician, 911',
        value: 'Teach symptoms to report nurse, physician, 911'
    },
    {
        label: 'Report changes in favorable response to physician',
        value: 'Report changes in favorable response to physician'
    },
    {
        label: 'PT evaluation',
        value: 'PT evaluation'
    },
    {
        label: 'Therapeutic exercise',
        value: 'Therapeutic exercise'
    },
    {
        label: 'Balance / coordination exercise',
        value: 'Balance / coordination exercise'
    },
    {
        label: 'Transfer training',
        value: 'Transfer training'
    },
    {
        label: 'Bed mobility',
        value: 'Bed mobility'
    },
    {
        label: 'Gait training with AD',
        value: 'Gait training with AD'
    },
    {
        label: 'Active ROM exercises',
        value: 'Active ROM exercises'
    },
    {
        label: 'Use ofassistive device',
        value: 'Use ofassistive device'
    },
    {
        label: 'Home exercise program',
        value: 'Home exercise program',

    }
];
// const patientId = General.getLocalStorageData('patientId');

const ServiceDetails = () => {
    const { serviceDetails, serviceDetailsFieldTouched, patientId } = useSelector((state) => state[componentKey]);
    const dispatch = useDispatch();
    const token = General.getLocalStorageData("token")

    const onChangeHandler = (event, rules, index) => {
        const { name, value } = event.target;

        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(setMultipleServiceDetails({ object: { [name]: { value, errors, rules } }, index }));
        } else {
            dispatch(setMultipleServiceDetails({ object: { [name]: { value } }, index }));
        }
    };

    return (
        <>
            <div className="">
                <div className="service-details">
                    <Heading type={HEADING.H3}>New Service (Optional)</Heading>
                    {serviceDetails?.map((item, index) => (
                        <div key={index} className="mt-4">
                            <div className="">
                                <Heading type={BUTTON_TYPE.h3}>Service Details: {index + 1}</Heading>
                                <SelectDropdown
                                    type="text"
                                    placeHolder={'Please select service'}
                                    name="service"
                                    value={item?.service?.value}
                                    onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                    // onSelectCb={(name, selectedOption) => {
                                    //     dispatch(
                                    //         setMultipleServiceDetails({
                                    //             object: { [name]: { value: selectedOption } },
                                    //             index
                                    //         })
                                    //     );
                                    // }}
                                    options={services}
                                    label="Service"
                                    defaultValue={
                                        item?.service?.value.length ? { label: item?.service?.value } : ''
                                    }
                                />
                            </div>
                            <div className="case-seq-block">
                                <TextInput
                                    type="text"
                                    placeHolder={'Please enter case Sequence'}
                                    name="caseSequence"
                                    onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                    label="Case Sequence"
                                    value={item?.caseSequence.value}
                                    rules={serviceDetails[index].caseSequence.rules}
                                    errors={serviceDetails[index].caseSequence.errors}
                                    formSubmitted={serviceDetailsFieldTouched}
                                />
                            </div>

                            {index > 0 && (
                                <Button
                                    onClickCb={() => dispatch(setRemoveNewInformation(index))}
                                    variant={BUTTON_TYPE.LIGHT_WITH_NO_BORDER}
                                    className={`mt-2 ${index < serviceDetails.length - 1 && 'mb-4'}`}
                                >
                                    Remove
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
                <div className="add-new-service-block">
                    <Button
                        className="mt-2 "
                        variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}
                        onClickCb={() =>
                            dispatch(
                                setAddNewInformation(
                                    // name: 'Service Details',
                                    PATIENT_SERVICE_DETAILS
                                )
                            )
                        }
                        prefixProps={{ icon: VEC_ICON_NAME.ADD_NEW_ICON }}
                    >
                        Add New Service
                    </Button>
                </div>
                <div className="nextbuttons">
                    <Button
                        type={BUTTON_TYPE.LIGHT_WITH_NO_BORDER}
                        className="button-width primary-light-with-border-btn"
                        onClickCb={() => {
                            // dispatch(postServiceDetails(patientId, serviceDetails));
                            // dispatch(getAllPayers({ patientId, activeIndex: 2 }));
                            dispatch(setActiveRefferalPatientIntakeStep(2));
                        }}
                    >
                        Back
                    </Button>
                    <Button
                        type={BUTTON_TYPE.PRIMARY}
                        className="button-width primary-btn"
                        onClickCb={() => {
                            // dispatch(setServiceDetailsFieldsTouched(true));
                            // if (!GeneralValidator.validateRequiredFields(serviceDetails)) {
                            if (serviceDetails.some((item) => !!item.service.value)) {
                                dispatch(postServiceDetails(patientId, serviceDetails, token));
                                // dispatch(getAllPayers({ patientId, activeIndex: 2 }));
                            }
                            dispatch(setActiveRefferalPatientIntakeStep(4));
                            // } else{

                            // }
                        }}
                    >
                        Next
                    </Button>
                </div>
            </div>
            {/* ))} */}
        </>
    );
};

export default ServiceDetails;
