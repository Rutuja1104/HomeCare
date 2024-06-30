import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
// import { componentKey, setActiveRefferalPatientIntakeStep } from '../referral-intake/PatientManagementSlice';
// import PersonalDetails from '../PersonalDetails';
import GeneralValidator from '../../../libs/utility/validators/GeneralValidator';
import {
    getAllPayers,
    postInsuranceDetails,
    postPersonalDetails,
    postSendEmail,
    postServiceDetails
} from '../referral-intake/PatientManagementSaga';
import ServiceDetails from '../referral-intake/serviceDetails/ServiceDetails';
import StepperNavigation from '../../../components/stepperNavigation/StepperNavigation';
import Loadable from '../../../components/loadable/Loadable';
import BasicModal from '../../../components/modal/Modal';
import Button from '../../../components/button/Button';
import PhysicianOrder from '../PhysicianOrder/PhysicianOrder';
import PersonalDetails from './PersenoalDetails/PersonalDetails';
import InsuranceDetails from './InsuranceDetails/InsuranceDetails';
import MedicalOrderDetails from './MedicalOrderDetails/MedicalOrderDetails';
import FaceToFaceForm from './faceToFace/FaceToFaceForm';
import UploadDocuments from './uploaddocuments/UploadDocuments';
import { componentKey, setActivePhysicianPatientIntakeStep } from './physicianOrderSlice';
import AddNewPhysician from './addNewPhysician/AddNewPhysician';
import useFlexCleanup from '../../../store/FlexCleanup'
import General from '../../../libs/utility/General';

const AddNewPatient = () => {
    const dispatch = useDispatch();
    const {
        personalDetails,
        serviceDetails,
        insuranceDetails,
        patientDropdownDetails,
        physicianDetails,
        activeRefferalPatientIntakeStep,
        activePhysicianPatientIntakeStep,
        loadingState,patientId
    } = useSelector((state) => state[componentKey]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReportsModalOpen, setIsReportModalOpen] = useState(false);
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    // const patientId = General.getLocalStorageData('patientId');
    const agencyId = General.getLocalStorageData('agencyId');

    useFlexCleanup(componentKey)

    // const token = loadingState.getItem("token")

    const steps = [
        {
            title: 'Personal Details',
            stepBodyComponent: <PersonalDetails />,
            isTitleClickAllow: false,

            
            
        },
        {
            title: 'Insurance Details',
            stepBodyComponent: <InsuranceDetails />,
            isTitleClickAllow: false,


          
        },
        {
            title: 'Medical Documents',
            stepBodyComponent: <UploadDocuments />,
            isTitleClickAllow: false,

            
        },
        {
            title: 'Add Physician',
            stepBodyComponent: <AddNewPhysician />,
            isTitleClickAllow: false,

            
        },
        {
            title: 'Face-To-Face Encounter',
            stepBodyComponent: <FaceToFaceForm />,
            isTitleClickAllow: false,

        },
        {
            title: 'Physician Order',
            isTitleClickAllow: false,
            stepBodyComponent: <MedicalOrderDetails />,

        }
    ];

    return (
        <div>
            <Loadable loadingStates={loadingState.state} loadingMessage={loadingState.message}>
                <StepperNavigation steps={steps} activeStep={activePhysicianPatientIntakeStep} />
            </Loadable>
            <BasicModal
                open={isModalOpen}
                closeButtonHandler={() => {
                    setIsModalOpen(false);
                }}
                handleClose={() => {
                    setIsModalOpen(false);
                }}
                title={'Warning'}
            >
                <p>Are you sure you want to Skip this Phase?</p>
            </BasicModal>

            <BasicModal
                open={isReportsModalOpen}
                closeButtonHandler={() => {
                    setIsReportModalOpen(false);
                }}
                handleClose={() => {
                    setIsReportModalOpen(false);
                }}
                title={'Share Reports'}
            >
                <p>Submitted information will be sent to the respective physician to generate the Physician Order.</p>
                <p>Select the Medium below to send</p>
                <div className="report-modal-buttons">
                    <Button
                        onClickCb={() => {
                            dispatch(setActivePhysicianPatientIntakeStep(4));
                            dispatch(
                                postSendEmail({
                                    patientId,
                                    personalDetails,
                                    agencyId,
                                    patientDropdownDetails,
                                    physicianDetails
                                })
                            );
                        }}
                    >
                        Via Mail
                    </Button>
                    <Button onClickCb={() => {}} disabled>
                        Via Fax
                    </Button>
                </div>
            </BasicModal>
        </div>
    );
};
export default AddNewPatient;
