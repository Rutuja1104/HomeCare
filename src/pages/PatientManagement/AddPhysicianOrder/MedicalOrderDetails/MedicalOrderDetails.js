import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPatientById, postMedicalOrder, postSendEmailToPhysicianAndAgency } from '../phsyicianOrderSaga';
import Heading from '../../../../components/heading/Heading';
import { HEADING } from '../../../../components/heading/constants/constants';
import TextInput from '../../../../components/input/textinput/TextInput';
import TextArea from '../../../../components/input/textarea/TextArea';
import Label from '../../../../components/label/labelV2/Label';
import CustomCollapse from '../../../../components/accordion/CustomCollapse';
import { BUTTON_TYPE } from '../../../../libs/constant';
import Button from '../../../../components/button/Button';
import BasicModal from '../../../../components/modal/Modal';
import {
    componentKey,
    setActivePhysicianPatientIntakeStep,
    setGetPatientById,
    setIsmailSent,
    setMedicalOrderSign
} from '../physicianOrderSlice';
import NurseDisciplines from './MedicallyNecessaryDisciplines/NurseDisciplines';
import TherapiestDisciplines from './MedicallyNecessaryDisciplines/TherapyDisciplines';
import MSW from './MedicallyNecessaryDisciplines/MSW';
import HHA from './MedicallyNecessaryDisciplines/HHA';
import SignaturePad from '../../../../components/signaturePad/SignaturePad';
import { toast } from 'react-toastify';
import DatePicker from '../../../../components/datePicker/DatePicker';
import General from '../../../../libs/utility/General';
import Base64Image from '../../../../components/base64Image/Base64Image';

const MedicalOrderDetails = () => {
    const dispatch = useDispatch();
    // const physicianName = General.getLocalStorageData('physicianName');

    // const { patientId, agencyId } = useParams();
    const [openConsentModal, setOpenConsentModal] = useState(false);
    const data = [
        {
            name: 'Nursing',
            status: 'uploaded',
            component: <NurseDisciplines />
        },
        {
            name: 'Therapies (PT / OT / ST)',
            status: 'uploaded',
            component: <TherapiestDisciplines />
        },
        {
            name: 'MSW',
            status: 'uploaded',
            component: <MSW />
        },
        {
            name: 'HHH',
            status: 'uploaded',
            component: <HHA />
        }
    ];
    const {
        patientById,
        medicalOrderDetails,
        patientDropdownDetails,
        personalDetailsResp,
        medicalOrderSign,
        physicianName,
        patientId,
        patientPhysicianIntakeSign,
        isMailSent,
        faceToFace
    } = useSelector((state) => state[componentKey]);

    const navigate = useNavigate();
    useEffect(() => {
        if (isMailSent === true) {
            navigate('/patientmanagement');
            dispatch(setIsmailSent(false));
        }
    }, [isMailSent]);

    // const physicianId = patientDropDownDetails?.patientPhysician?.value;
    const physicianId = patientDropdownDetails?.patientPhysician?.value;
    // const patientId = General.getLocalStorageData('patientId');
    const agencyId = General.getLocalStorageData('agencyId');
    const token = General.getLocalStorageData("token")

    
    useEffect(() => {
        dispatch(getPatientById({ patientId, agencyId }));
    }, []);
    return (
        <div className="">
            <div className="physician-order-container">
                <Heading type={HEADING.H3}>Patient Details</Heading>
                <div className="personal-info-block">
                    <div className="block">
                        <TextInput
                            type="text"
                            placeHolder={'John'}
                            name="FirstName"
                            // onChangeCb={({ target: { name, value } }) => dispatch(setPersonalDetails({ name, value }))}
                            label="First Name"
                            value={personalDetailsResp?.firstName}
                        />
                    </div>
                    <div className="block">
                        {/* <TextInput
                            type="text"
                            placeHolder={'123-456-7890'}
                            name="ID#"
                            // onChangeCb={({ target: { name, value } }) => dispatch(setPersonalDetails({ name, value }))}
                            label="ID#"
                        /> */}
                        <TextInput
                            type="text"
                            placeHolder={'Doe'}
                            name="LastName"
                            // onChangeCb={({ target: { name, value } }) => dispatch(setPersonalDetails({ name, value }))}
                            label="Last Name"
                            value={personalDetailsResp?.lastName}
                        />
                    </div>
                    <div className="block">
                        <TextInput
                            type="text"
                            placeHolder={'Doe'}
                            name="email"
                            // onChangeCb={({ target: { name, value } }) => dispatch(setPersonalDetails({ name, value }))}
                            label="Email"
                            value={personalDetailsResp?.email}
                        />
                    </div>
                </div>
                <div className="physician-block">
                    <div className="block">
                        <DatePicker
                            label="Date Of Birth"
                            name="dateOfBirth"
                            // onChangeCb={onChangeHandler}
                            value={personalDetailsResp.dateOfBirth}
                            // rules={personalDetails.dateOfBirth.rules}
                            // errors={personalDetails.dateOfBirth.errors}
                            // formSubmitted={personalDetailsFieldTouched}
                        />
                    </div>
                    <div className="block">
                        <TextInput
                            type="text"
                            placeHolder={'Doe'}
                            name="PhysicianName"
                            // onChangeCb={({ target: { name, value } }) => dispatch(setPersonalDetails({ name, value }))}
                            label="Physician’s Name"
                            value={patientDropdownDetails?.patientPhysician.label}
                        />
                    </div>
                    <div className="block"></div>
                </div>
                <div className="">
                    <Label>Patient Diagnosis(es)</Label>
                    <TextArea></TextArea>
                    {/* <TextArea name="explain" value={.patientDiagnostics.value} onChangeCb={onChangeHandler}></TextArea> */}
                </div>
                <div className="">
                    <Heading type={HEADING.H3}>Medically Necessary Disciplines:</Heading>
                    <CustomCollapse data={data}></CustomCollapse>
                </div>
                <div className="mt-4">
                   
                    <Base64Image base64={patientPhysicianIntakeSign} header="Physician Signature" />
                </div>
                <div className="mt-4">
                    <Button
                        type={BUTTON_TYPE.PRIMARY}
                        onClickCb={() => {
                            // if (!isCanvasEmpty) {
                            // dispatch(setMedicalOrderSign(sign));
                            setOpenConsentModal(true);
                            // dispatch(postFaceToFace({ agencyId, physicianId, patientId, faceToFace, sign, patientById }));
                            // dispatch(setActiveRefferalPatientIntakeStep(2));
                            // } else {
                            //     toast.error('Please sign the consent form!');
                            // }
                        }}
                    >
                        Submit
                    </Button>
                </div>

                <BasicModal
                    title={'Consent Form'}
                    open={openConsentModal}
                    handleClose={() => setOpenConsentModal(false)}
                    closeButtonHandler={() => setOpenConsentModal(false)}
                    // handleClose={() => {
                    //     setOpenConsentModal(false);
                    // }}
                >
                    <p>
                        This is to confirm the information is filled with best of your knowledge. The filled information
                        will be sent to the Agency to start the medical care.
                    </p>
                    <p>You will receive an email confirmation for the same.</p>
                    <div className="consentmodal-buttton">
                        <Button
                            type={BUTTON_TYPE.PRIMARY}
                            onClickCb={() => {
                                setOpenConsentModal(false);
                                dispatch(
                                    postMedicalOrder({
                                        patientId,
                                        medicalOrderDetails,
                                        patientById,
                                        agencyId,
                                        patientPhysicianIntakeSign,
                                        token
                                    })
                                );
                                dispatch(postSendEmailToPhysicianAndAgency({ patientId, physicianId, agencyId,token }));
                            }}
                        >
                            Submit
                        </Button>
                        <Button
                            type={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}
                            onClickCb={() => setOpenConsentModal(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </BasicModal>
            </div>
        </div>
    );
};
export default MedicalOrderDetails;
