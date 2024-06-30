import React, { useEffect, useState } from 'react';
import StepperNavigation from '../../../components/stepperNavigation/StepperNavigation';
import InsuranceDetails from './insuraceDetails/InsuranceDetails';
import PersonalDetails from './personalDetails/PersonalDetails';
import ServiceDetails from './serviceDetails/ServiceDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientById, postInsuranceDetails, postSendEmail } from './PatientManagementSaga';
import { componentKey, setActiveRefferalPatientIntakeStep, setPersonalDetails } from './PatientManagementSlice';
import BasicModal from '../../../components/modal/Modal';
import Button from '../../../components/button/Button';

import UploadDocuments from './uploaddocuments/UploadDocuments';
import Loadable from '../../../components/loadable/Loadable';
import AddNewPhysician from './addNewPhysician/AddNewPhysician';
import useFlexCleanup from '../../../store/FlexCleanup';
import { PERSONAL_DETAILS } from '../constants';
import General from '../../../libs/utility/General';

const AddNewPatient = () => {
    const dispatch = useDispatch();
    const {
        personalDetails,
        insuranceDetails,
        patientDropdownDetails,
        physicianDetails,
        activeRefferalPatientIntakeStep,
        loadingState,
        patientId,
        patientById,
        medicalDetails,
        serviceDetails
    } = useSelector((state) => state[componentKey]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReportsModalOpen, setIsReportModalOpen] = useState(false);
    // const patientId = General.getLocalStorageData('patientId');
    const agencyId = General.getLocalStorageData('agencyId');
    useFlexCleanup(componentKey);

    const steps = [
        {
            title: 'Personal Details',
            stepBodyComponent: <PersonalDetails />
        },
        {
            title: 'Insurance Details',
            stepBodyComponent: <InsuranceDetails />
        },
        {
            title: 'Medical Documents',
            stepBodyComponent: <UploadDocuments />
        },
        {
            title: 'Service Details',
            stepBodyComponent: <ServiceDetails />
        },
        {
            title: 'Add New Physician',
            stepBodyComponent: <AddNewPhysician />
        }
    ];

    // useEffect(() => {
    //     console.log('in if');
    //     if (patientId) {
    //         dispatch(getPatientById({ agencyId, patientId }));
    //     }
    // }, [activeRefferalPatientIntakeStep, patientId]);
    // useEffect(() => {
    //     console.log('in useEffect', patientById);
    //     /* eslint-disable */
    //     if (patientById) {
    //         console.log('in useeffects if');
    //         console.log('🚀 ~ file: AddNewPatient.js:77 ~ useEffect ~ patientById.step:', patientById.step);
    //         switch (patientById.step) {
    //             case null:
    //                 dispatch(setActiveRefferalPatientIntakeStep(0));
    //                 break;
    //             case 'step-0':
    //                 console.log('in step 0');
    //                 dispatch(setActiveRefferalPatientIntakeStep(1));
    //                 break;
    //             case 'step-1':
    //                 console.log('in step 1');

    //                 dispatch(setActiveRefferalPatientIntakeStep(2));
    //                 if (medicalDetails === null) {
    //                     dispatch(setActiveRefferalPatientIntakeStep(3));
    //                 } else if (serviceDetails === null) {
    //                     dispatch(setActiveRefferalPatientIntakeStep(4));
    //                 }
    //                 break;
    //             case 'step-2':
    //                 console.log('in step 2');
    //                 dispatch(setActiveRefferalPatientIntakeStep(3));
    //                 break;
    //             case 'step-3':
    //                 console.log('in step 3');
    //                 dispatch(setActiveRefferalPatientIntakeStep(4));
    //                 break;
    //             case 'step-4':
    //                 console.log('in step 4');
    //                 dispatch(setActiveRefferalPatientIntakeStep(5));
    //                 break;
    //             case 'step-5':
    //                 console.log('in step 5');
    //                 dispatch(setActiveRefferalPatientIntakeStep(6));
    //         }
    //     }
    //     /* eslint-enable */
    // }, [patientById]);
    return (
        <div>
            <Loadable loadingStates={loadingState.state} loadingMessage={loadingState.message}>
                <StepperNavigation steps={steps} activeStep={activeRefferalPatientIntakeStep} />
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
                title={'Physician Order Request'}
            >
                <p>Submitted information will be sent to the respective physician to generate the Physician Order.</p>
                <p>Select the Medium below to send</p>
                <div className="report-modal-buttons">
                    <Button
                        onClickCb={() => {
                            dispatch(
                                postSendEmail({
                                    patientId,
                                    personalDetails,
                                    agencyId,
                                    patientDropdownDetails,
                                    physicianDetails
                                })
                            );
                            dispatch(setPersonalDetails(PERSONAL_DETAILS));
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
