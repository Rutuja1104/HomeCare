import React, { useEffect, useState } from 'react';
import Heading from '../../../components/heading/Heading';
import { HEADING } from '../../../components/heading/constants/constants';
import TextInput from '../../../components/input/textinput/TextInput';
import TextArea from '../../../components/input/textarea/TextArea';
import Label from '../../../components/label/labelV2/Label';
import CustomCollapse from '../../../components/accordion/CustomCollapse';
import { BUTTON_TYPE } from '../../../libs/constant';
import Button from '../../../components/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
    componentKey,
    setActiveRefferalPatientIntakeStep,
    setMedicalOrderDetails,
    setMedicalOrderSign,
    setPatientReferralIntakeSign,
    setPhysicianOrderSent
} from '../referral-intake/PatientManagementSlice';
import {
    getPatientById,
    postMedicalOrder,
    postSendEmailToPhysicianAndAgency
} from '../referral-intake/PatientManagementSaga';
import { useParams } from 'react-router-dom';
import BasicModal from '../../../components/modal/Modal';
import NurseDisciplines from './MedicallyNecessaryDisciplines/NurseDisciplines';
import TherapiestDisciplines from './MedicallyNecessaryDisciplines/TherapyDisciplines';
import MSW from './MedicallyNecessaryDisciplines/MSW';
import HHA from './MedicallyNecessaryDisciplines/HHA';
import SignaturePad from '../../../components/signaturePad/SignaturePad';
import { toast } from 'react-toastify';
import DatePicker from '../../../components/datePicker/DatePicker';
import Base64Image from '../../../components/base64Image/Base64Image';
const PhysicianOrder = () => {
    const dispatch = useDispatch();
    const { patientId, physicianId, agencyId } = useParams();
    const [openConsentModal, setOpenConsentModal] = useState(false);
    const { isMailSent, physicianOrderSent } = useSelector((state) => state[componentKey]);
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
    const { patientById, medicalOrderDetails, medicalOrderSign, patientReferralIntakeSign } = useSelector(
        (state) => state[componentKey]
    );

    const handleSaveSignatureClick = (sign, isCanvasEmpty) => {
        // if (!GeneralValidator.validateRequiredFields(faceToFace)) {
        if (!isCanvasEmpty) {
            // dispatch(setMedicalOrderSign(sign));
            setOpenConsentModal(true);

            // dispatch(postFaceToFace({ agencyId, physicianId, patientId, faceToFace, sign, patientById }));
            // dispatch(setActiveRefferalPatientIntakeStep(2));
        } else {
            toast.error('Please sign the consent form!');
        }
        // } else {
        //     toast.error('Please enter all required fields');
        // }
    };
    // useEffect(() => {
    //     dispatch(getPatientById({ patientId, agencyId }));
    // }, []);
    return (
        <div className="">
            <div className="physician-order-container">
                <Heading type={HEADING.H3}>Physician Order</Heading>
                <div className="personal-info-block">
                    <div className="block">
                        <TextInput
                            type="text"
                            placeHolder={'John'}
                            name="FirstName"
                            // onChangeCb={({ target: { name, value } }) => dispatch(setPersonalDetails({ name, value }))}
                            label="First Name"
                            value={patientById?.firstName}
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
                            value={patientById?.lastName}
                        />
                    </div>
                    <div className="block">
                        <TextInput
                            type="text"
                            placeHolder={'Doe'}
                            name="email"
                            // onChangeCb={({ target: { name, value } }) => dispatch(setPersonalDetails({ name, value }))}
                            label="Email"
                            value={patientById?.email}
                        />
                    </div>
                </div>
                <div className="physician-block">
                    <div className="block">
                        <DatePicker
                            label="Date Of Birth"
                            name="dateOfBirth"
                            value={new Date(patientById.dateOfBirth)}
                            // onChangeCb={onChangeHandler}
                            // value={personalDetails.dateOfBirth.value}
                            // rules={personalDetails.dateOfBirth.rules}
                            // errors={personalDetails.dateOfBirth.errors}
                            // formSubmitted={personalDetailsFieldTouched}
                            momentFormat="YYYY-MM-DD"
                        />
                    </div>
                    <div className="block">
                        <TextInput
                            type="text"
                            placeHolder={'Doe'}
                            name="PhysicianName"
                            // onChangeCb={({ target: { name, value } }) => dispatch(setPersonalDetails({ name, value }))}
                            label="Physician’s Name"
                            value={patientById?.physician?.firstName + ' ' + patientById?.physician?.lastName}
                        />
                    </div>
                    <div className="block"></div>
                </div>
                <div className="">
                    {/* <Label>Patient Diagnosis(es)</Label>
                    <TextArea></TextArea> */}
                    <TextArea
                        rows={2}
                        name="patientDiagnostics"
                        //  readOnly={item?.isDescriptionFromAdmin}
                        //  placeholder="Mention Reason"
                        // onChangeCb={(event) => dispatch(setMedicalOrderDetails({ value: event.target.value }))}
                        onChangeCb={({ target: { name, value } }) => dispatch(setMedicalOrderDetails({ name, value }))}
                        //  value={item.description || ""}
                        // disabled={true}
                        label={'Patient Diagnosis(es)'}
                        value={medicalOrderDetails?.patientDiagnostics}
                    />
                </div>
                <div className="">
                    <Heading type={HEADING.H3}>Medically Necessary Disciplines:</Heading>
                    <CustomCollapse data={data}></CustomCollapse>
                </div>
                <div className="mt-4">
                    <Base64Image base64={patientReferralIntakeSign} header="Physician Signature" />
                </div>
                <div className="mt-4">
                    <Button
                        type={BUTTON_TYPE.PRIMARY}
                        onClickCb={() => {
                            setOpenConsentModal(true);
                        }}
                        disabled={isMailSent === true ? true : false}
                    >
                        Submit
                    </Button>
                </div>
                <BasicModal
                    title={'Consent Form'}
                    open={openConsentModal}
                    closeButtonHandler={() => {
                        setOpenConsentModal(false);
                    }}
                    handleClose={() => {
                        setOpenConsentModal(false);
                    }}
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
                                dispatch(
                                    postMedicalOrder({
                                        agencyId,
                                        patientId,
                                        medicalOrderDetails,
                                        patientById,
                                        patientReferralIntakeSign
                                    })
                                );
                                dispatch(postSendEmailToPhysicianAndAgency({ agencyId, patientId, physicianId }));
                                setOpenConsentModal(false);
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
                <BasicModal
                    open={physicianOrderSent}
                    title={'Physician Order Confirmation'}
                    closeButtonHandler={() => {
                        dispatch(setPhysicianOrderSent(false));
                    }}
                    handleClose={() => {
                        dispatch(setPhysicianOrderSent(false));
                    }}
                >
                    <p>
                        You have successfully completed physician order for{' '}
                        {patientById?.firstName + ' ' + patientById?.lastName}. We have sent an email to the Agency,
                        they will reach out to you if anything required. We have sent an acknowledgement email to you.
                    </p>
                    <p>You can safely close this window.</p>
                    <Button
                        type={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}
                        onClickCb={() => dispatch(setPhysicianOrderSent(false))}
                    >
                        Ok
                    </Button>
                </BasicModal>
            </div>
        </div>
    );
};
export default PhysicianOrder;
