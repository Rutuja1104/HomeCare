import React, { useEffect } from 'react';
import StepperNavigation from '../../../components/stepperNavigation/StepperNavigation';
import PhysicianOrder from './PhysicianOrder';
import { useDispatch, useSelector } from 'react-redux';
import { componentKey } from '../referral-intake/PatientManagementSlice';
import PatientDetails from './patientDetails/PatientDetails';

import FaceToFaceForm from './FaceToFaceForm/FaceToFaceForm';
import { setNonAuthLayoutHeader } from '../../../layouts/LayoutSlice';

const PhysicianOrderFlow = () => {
    const { activeRefferalPatientIntakeStep } = useSelector((state) => state[componentKey]);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setNonAuthLayoutHeader("Physician Order"))
    }, [])
    const steps = [
        {
            title: 'Patient Details',
            stepBodyComponent: <PatientDetails />,
            // discardCb: () => {},
            // // backButtonText: 'Back',
            // prevCb: () => {},
            // submitButtonText: 'Next',
            // submitCb: () => {}
        },
        {
            title: 'Face to Face Encounter',
            stepBodyComponent: <FaceToFaceForm />,
        },

        {
            title: 'Physician Order',
            stepBodyComponent: <PhysicianOrder />
        }
    ];
    return (
        <div>
            <StepperNavigation steps={steps} activeStep={activeRefferalPatientIntakeStep} />
        </div>
    );
};

export default PhysicianOrderFlow;
