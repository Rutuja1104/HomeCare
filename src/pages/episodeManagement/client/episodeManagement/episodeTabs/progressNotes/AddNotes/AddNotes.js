import React, { useEffect } from 'react'

import { setHeaderLabel } from '../../../../../../../layouts/LayoutSlice'
import { useDispatch, useSelector } from 'react-redux'
import { componentKey } from '../../../../ClientEpisodeSlice'
import { HEADING } from '../../../../../../../components/heading/constants/constants'
import { toast } from 'react-toastify'
import { setAddNoteStates, setExistingProgressNoteDetails, setIsNavigateToProgressNoteList, setSelectedProgressNoteAssignee } from '../../../ClientEpisodeManagementSlice'
import { componentKey as adminEpisodeManagementComponentKey, setAddNoteFieldTouch, setProgressNoteSignature } from "../../../ClientEpisodeManagementSlice"
import GeneralValidator, { generalValidator } from '../../../../../../../libs/utility/validators/GeneralValidator'
import { CLIENT_EPISODE_MANAGEMENT, EPISODE_MANAGEMENT } from '../../../../../../../routes/constants'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { getAssigneeByEpisodeId, getEmergencyVitals, getEpisodeDetailsById, getProgressNoteById, patchUpdateExistingProgressNotes, postCreateProgressNote } from '../../../ClientEpisodeManagementSaga'

import Loadable from '../../../../../../../components/loadable/Loadable'
import Container from '../../../../../../../components/container/Container'
import TextInput from '../../../../../../../components/input/textinput/TextInput'
import ResponsiveBox from '../../../../../../../components/responsivebox/ResponsiveBox'
import Heading from '../../../../../../../components/heading/Heading'
import SelectDropdown from '../../../../../../../components/select/Select'
import TextArea from '../../../../../../../components/input/textarea/TextArea'
import SignaturePad from '../../../../../../../components/signaturePad/SignaturePad'
import DatePicker from '../../../../../../../components/datePicker/DatePicker'
import moment from 'moment'
import General from '../../../../../../../libs/utility/General'
import { EPISODE_STATUS } from '../../../../../admin/constants'

const ClientAddNotes = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { episodeId } = useParams()
    const agencyId = General.getLocalStorageData("agencyId")
    const token = General.getLocalStorageData("token")

    const [searchParams] = useSearchParams();

    const noteId = searchParams.get('pi');

    const { loadingState } = useSelector(state => state[componentKey])
    const { addNoteStates, addNoteFieldTouch, episodeDetailsForCreatePage, assigneeByEpisodeId, selectedProgressNoteAssignee, isNavigateToProgressNoteList, emergencyVitalRanges, progressDetailById } = useSelector(state => state[adminEpisodeManagementComponentKey])

    useEffect(() => {
        if (noteId) {
            dispatch(getProgressNoteById({ agencyId, episodeId, noteId, token }))
        }
    }, [noteId])

    useEffect(() => {
        if (progressDetailById.id) {
            const copiedProgressDetails = JSON.parse(JSON.stringify(addNoteStates))

            copiedProgressDetails.NotesType.value = progressDetailById.noteType
            copiedProgressDetails.Status.value = progressDetailById.status
            copiedProgressDetails.NoteDate.value = progressDetailById.noteDate
            copiedProgressDetails.DescriptionDetails.value = progressDetailById.comment
            copiedProgressDetails.SelectAssignee.value = `${progressDetailById.Nurse.firstName} ${progressDetailById.Nurse.lastName}`
            copiedProgressDetails.PainSeverity.value = progressDetailById.painSeverity


            copiedProgressDetails.LowBloodPressure.value = progressDetailById.Vitals.lowBloodPressure
            copiedProgressDetails.HighBloodPressure.value = progressDetailById.Vitals.highBloodPressure
            copiedProgressDetails.LowDiastolic.value = progressDetailById.Vitals.lowDiastolic
            copiedProgressDetails.HighDiastolic.value = progressDetailById.Vitals.highDiastolic
            copiedProgressDetails.LowSystolic.value = progressDetailById.Vitals.lowSystolic
            copiedProgressDetails.HighSystolic.value = progressDetailById.Vitals.highSystolic
            copiedProgressDetails.LowPulse.value = progressDetailById.Vitals.lowPulse
            copiedProgressDetails.HighPulse.value = progressDetailById.Vitals.highPulse
            copiedProgressDetails.LowTemperature.value = progressDetailById.Vitals.lowTemperature
            copiedProgressDetails.HighTemperature.value = progressDetailById.Vitals.highTemperature
            copiedProgressDetails.LowRespiratory.value = progressDetailById.Vitals.lowRespiratory
            copiedProgressDetails.HighRespiratory.value = progressDetailById.Vitals.highRespiratory
            copiedProgressDetails.LowBloodSugar.value = progressDetailById.Vitals.lowBloodSugar
            copiedProgressDetails.HighBloodSugar.value = progressDetailById.Vitals.highBloodSugar

            dispatch(setExistingProgressNoteDetails(copiedProgressDetails))
            dispatch(setSelectedProgressNoteAssignee({ nurse: { id: progressDetailById.Nurse.id }, value: progressDetailById.Nurse.id, label: `${progressDetailById.Nurse.firstName} ${progressDetailById.Nurse.lastName}` }))
        }
    }, [progressDetailById.id])

    useEffect(() => {
        dispatch(setHeaderLabel("Create Progress Notes"))
        dispatch(getEpisodeDetailsById({ agencyId, episodeId, token, isForOtherUse: true }))
        dispatch(getAssigneeByEpisodeId({ agencyId, episodeId, token }))
        dispatch(getEmergencyVitals({ agencyId, token }))
        dispatch(setExistingProgressNoteDetails({}))
    }, [])

    useEffect(() => {
        if (isNavigateToProgressNoteList) {
            navigate(`/${CLIENT_EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${CLIENT_EPISODE_MANAGEMENT.CHILD_ROUTS.EPISODE_DETAILS}/${episodeId}`)
            dispatch(setIsNavigateToProgressNoteList(false))
        }
    }, [isNavigateToProgressNoteList])

    const handleSaveSignatureClick = (sign, isCanvasEmpty) => {

        dispatch(setAddNoteFieldTouch(true))

        if (!isCanvasEmpty) {
            dispatch(setProgressNoteSignature(sign))
            if (!GeneralValidator.validateRequiredFields(addNoteStates)) {
                const data = {
                    "physicianId": episodeDetailsForCreatePage.Physician.id,
                    "nurseId": selectedProgressNoteAssignee.nurse.id,
                    "patientId": episodeDetailsForCreatePage.Patient.id,
                    "noteType": addNoteStates.NotesType.value,
                    "status": addNoteStates.Status.value,
                    "noteDate": addNoteStates.NoteDate.value,
                    "comment": addNoteStates.DescriptionDetails.value,
                    "digitalSignature": sign,
                    "painSeverity": Number(addNoteStates.PainSeverity.value),
                    "vitals": {
                        "highSystolic": addNoteStates.HighSystolic.value,
                        "highDiastolic": addNoteStates.HighDiastolic.value,
                        "lowSystolic": addNoteStates.LowSystolic.value,
                        "lowDiastolic": addNoteStates.LowDiastolic.value,
                        "highPulse": addNoteStates.HighPulse.value,
                        "lowPulse": addNoteStates.LowPulse.value,
                        "highTemperature": addNoteStates.HighTemperature.value,
                        "lowTemperature": addNoteStates.LowTemperature.value,
                        "highRespiratory": addNoteStates.HighRespiratory.value,
                        "lowRespiratory": addNoteStates.LowRespiratory.value,
                        "highBloodSugar": addNoteStates.HighBloodSugar.value,
                        "lowBloodSugar": addNoteStates.LowBloodSugar.value,
                        "lowBloodPressure": addNoteStates.LowBloodPressure.value,
                        "highBloodPressure": addNoteStates.HighBloodPressure.value
                    }
                }

                if (noteId) {
                    dispatch(patchUpdateExistingProgressNotes({ agencyId, episodeId, noteId, data, token }))
                } else {
                    dispatch(postCreateProgressNote({ agencyId, episodeId, data, token }))
                }

            }
        } else {
            toast.error('Please add your signature!')
        }
    }

    const onChangeHandler = (event, rules) => {
        const { name, value } = event.target;

        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(setAddNoteStates({ [name]: { value, errors, rules } }));
        } else {
            dispatch(setAddNoteStates({ [name]: { value } }));
        }
    };

    return (
        <Loadable loadingStates={loadingState.state} loadingMessage={loadingState.message}>
            <Container>
                <Heading>Note Info</Heading>
                <ResponsiveBox size={500}>
                    <SelectDropdown
                        type="text"
                        placeHolder={"Enter Note Type"}
                        name="NotesType"
                        label="Note Type"
                        onChangeCb={onChangeHandler}
                        value={addNoteStates.NotesType.value}
                        rules={addNoteStates.NotesType.rules}
                        errors={addNoteStates.NotesType.errors}
                        formSubmitted={addNoteFieldTouch}
                        defaultValue={addNoteStates.NotesType.value.length !== 0 ? { label: addNoteStates.NotesType.value } : null}
                        options={[{ label: "Progress Note", value: "Progress Note" }, { label: "Communication", value: "Communication" }]}
                    />
                    <SelectDropdown
                        type="text"
                        placeHolder={"Please select status"}
                        name="Status"
                        label="Status"
                        options={EPISODE_STATUS}
                        onChangeCb={onChangeHandler}
                        value={addNoteStates.Status.value}
                        defaultValue={addNoteStates.Status.value.length !== 0 ? { label: addNoteStates.Status.value } : null}
                        rules={addNoteStates.Status.rules}
                        errors={addNoteStates.Status.errors}
                        formSubmitted={addNoteFieldTouch}
                    />
                    <DatePicker
                        type="text"
                        name="NoteDate"
                        label="Note Date"
                        onChangeCb={onChangeHandler}
                        value={addNoteStates.NoteDate.value}
                        rules={addNoteStates.NoteDate.rules}
                        errors={addNoteStates.NoteDate.errors}
                        formSubmitted={addNoteFieldTouch}
                        minDate={new Date()}
                    />
                </ResponsiveBox>

                <TextArea
                    label="Description details"
                    name='DescriptionDetails'
                    onChangeCb={onChangeHandler}
                    value={addNoteStates.DescriptionDetails.value}
                    rules={addNoteStates.DescriptionDetails.rules}
                    errors={addNoteStates.DescriptionDetails.errors}
                    formSubmitted={addNoteFieldTouch}
                />

                <Heading type={HEADING.H3} customStyle={{ margin: "20px 0" }}>
                    Vital Sign
                </Heading>
                <ResponsiveBox size={700}>
                    <TextInput
                        type="number"
                        placeHolder={"Please enter blood pressure"}
                        name="LowBloodPressure"
                        label={`Low Blood Pressure ${`(min ${emergencyVitalRanges.lowBloodPressure || 0})`}`}
                        onChangeCb={onChangeHandler}
                        value={addNoteStates.LowBloodPressure.value}
                        rules={addNoteStates.LowBloodPressure.rules}
                        errors={addNoteStates.LowBloodPressure.errors}
                        formSubmitted={addNoteFieldTouch}
                    />
                    <TextInput
                        type="number"
                        placeHolder={"Please enter blood pressure"}
                        name="HighBloodPressure"
                        label={`High Blood Pressure ${`(max ${emergencyVitalRanges.highBloodPressure || 0})`}`}
                        onChangeCb={onChangeHandler}
                        value={addNoteStates.HighBloodPressure.value}
                        rules={addNoteStates.HighBloodPressure.rules}
                        errors={addNoteStates.HighBloodPressure.errors}
                        formSubmitted={addNoteFieldTouch}
                    />
                    <TextInput
                        type="number"
                        placeHolder={"Please enter low diastolic"}
                        name="LowDiastolic"
                        label={`Low Diastolic ${`(min ${emergencyVitalRanges.lowDiastolic || 0})`}`}
                        onChangeCb={onChangeHandler}
                        value={addNoteStates.LowDiastolic.value}
                        rules={addNoteStates.LowDiastolic.rules}
                        errors={addNoteStates.LowDiastolic.errors}
                        formSubmitted={addNoteFieldTouch}
                    />
                    <TextInput
                        type="number"
                        placeHolder={"Please enter high diastolic"}
                        name="HighDiastolic"
                        label={`High Diastolic ${`(max ${emergencyVitalRanges.highDiastolic || 0})`}`}
                        onChangeCb={onChangeHandler}
                        value={addNoteStates.HighDiastolic.value}
                        rules={addNoteStates.HighDiastolic.rules}
                        errors={addNoteStates.HighDiastolic.errors}
                        formSubmitted={addNoteFieldTouch}
                    />
                    <TextInput
                        type="number"
                        placeHolder={"Please enter low systolic"}
                        name="LowSystolic"
                        label={`Low Systolic ${`(min ${emergencyVitalRanges.lowSystolic || 0})`}`}
                        onChangeCb={onChangeHandler}
                        value={addNoteStates.LowSystolic.value}
                        rules={addNoteStates.LowSystolic.rules}
                        errors={addNoteStates.LowSystolic.errors}
                        formSubmitted={addNoteFieldTouch}
                    />
                    <TextInput
                        type="number"
                        placeHolder={"Please enter low systolic"}
                        name="HighSystolic"
                        label={`High Systolic ${`(max ${emergencyVitalRanges.highSystolic || 0})`}`}
                        onChangeCb={onChangeHandler}
                        value={addNoteStates.HighSystolic.value}
                        rules={addNoteStates.HighSystolic.rules}
                        errors={addNoteStates.HighSystolic.errors}
                        formSubmitted={addNoteFieldTouch}
                    />
                </ResponsiveBox>
                <ResponsiveBox size={700}>
                    <TextInput
                        type="number"
                        placeHolder={"Please enter low pulse"}
                        name="LowPulse"
                        label={`Low Pulse ${`(min ${emergencyVitalRanges.lowPulse || 0})`}`}
                        onChangeCb={onChangeHandler}
                        value={addNoteStates.LowPulse.value}
                        rules={addNoteStates.LowPulse.rules}
                        errors={addNoteStates.LowPulse.errors}
                        formSubmitted={addNoteFieldTouch}
                    />
                    <TextInput
                        type="number"
                        placeHolder={"Please enter high pulse"}
                        name="HighPulse"
                        label={`High Pulse ${`(max ${emergencyVitalRanges.highPulse || 0})`}`}
                        onChangeCb={onChangeHandler}
                        value={addNoteStates.HighPulse.value}
                        rules={addNoteStates.HighPulse.rules}
                        errors={addNoteStates.HighPulse.errors}
                        formSubmitted={addNoteFieldTouch}
                    />
                    <TextInput
                        type="number"
                        placeHolder={"Please enter low temperature"}
                        name="LowTemperature"
                        label={`Low Temperature ${`(min ${emergencyVitalRanges.lowTemperature || 0})`}`}
                        onChangeCb={onChangeHandler}
                        value={addNoteStates.LowTemperature.value}
                        rules={addNoteStates.LowTemperature.rules}
                        errors={addNoteStates.LowTemperature.errors}
                        formSubmitted={addNoteFieldTouch}
                    />
                    <TextInput
                        type="number"
                        placeHolder={"Please enter high temperature"}
                        name="HighTemperature"
                        label={`High Temperature ${`(max ${emergencyVitalRanges.highTemperature || 0})`}`}
                        onChangeCb={onChangeHandler}
                        value={addNoteStates.HighTemperature.value}
                        rules={addNoteStates.HighTemperature.rules}
                        errors={addNoteStates.HighTemperature.errors}
                        formSubmitted={addNoteFieldTouch}
                    />
                    <TextInput
                        type="number"
                        placeHolder={"Please enter low respiratory"}
                        name="LowRespiratory"
                        label={`Low Respiratory ${`(min ${emergencyVitalRanges.lowRespiratory || 0})`}`}
                        onChangeCb={onChangeHandler}
                        value={addNoteStates.LowRespiratory.value}
                        rules={addNoteStates.LowRespiratory.rules}
                        errors={addNoteStates.LowRespiratory.errors}
                        formSubmitted={addNoteFieldTouch}
                    />
                    <TextInput
                        type="number"
                        placeHolder={"Please enter high respiratory"}
                        name="HighRespiratory"
                        label={`High Respiratory ${`(max ${emergencyVitalRanges.highRespiratory || 0})`}`}
                        onChangeCb={onChangeHandler}
                        value={addNoteStates.HighRespiratory.value}
                        rules={addNoteStates.HighRespiratory.rules}
                        errors={addNoteStates.HighRespiratory.errors}
                        formSubmitted={addNoteFieldTouch}
                    />
                    <TextInput
                        type="number"
                        placeHolder={"Please enter low blood sugar"}
                        name="LowBloodSugar"
                        label={`Low Blood Sugar ${`(min ${emergencyVitalRanges.lowBloodSugar || 0})`}`}
                        onChangeCb={onChangeHandler}
                        value={addNoteStates.LowBloodSugar.value}
                        rules={addNoteStates.LowBloodSugar.rules}
                        errors={addNoteStates.LowBloodSugar.errors}
                        formSubmitted={addNoteFieldTouch}
                    />
                    <TextInput
                        type="number"
                        placeHolder={"Please enter high blood sugar"}
                        name="HighBloodSugar"
                        label={`High Blood Sugar ${`(max ${emergencyVitalRanges.highBloodSugar || 0})`}`}
                        onChangeCb={onChangeHandler}
                        value={addNoteStates.HighBloodSugar.value}
                        rules={addNoteStates.HighBloodSugar.rules}
                        errors={addNoteStates.HighBloodSugar.errors}
                        formSubmitted={addNoteFieldTouch}
                    />

                    <TextInput
                        type="range"
                        placeHolder={"Please enter high blood sugar"}
                        name="PainSeverity"
                        label={`Pain Severity (${addNoteStates.PainSeverity.value + "/10"})`}
                        onChangeCb={onChangeHandler}
                        min='0'
                        max="10"
                        value={addNoteStates.PainSeverity.value}
                        rules={addNoteStates.PainSeverity.rules}
                        errors={addNoteStates.PainSeverity.errors}
                        formSubmitted={addNoteFieldTouch}
                    />
                </ResponsiveBox>

                <Heading>Patient Detail</Heading>
                <ResponsiveBox size={500}>
                    <TextInput
                        type="text"
                        placeHolder={"First Name"}
                        name="AgencyLocation"
                        label="First Name"
                        value={episodeDetailsForCreatePage?.Patient?.firstName || ""}
                        disabled={true}
                    />
                    <TextInput
                        type="text"
                        placeHolder={"Last Name"}
                        name="AgencyLocation"
                        label="Last Name"
                        value={episodeDetailsForCreatePage?.Patient?.lastName || ""}
                        disabled={true}
                    />
                    <TextInput
                        type="text"
                        placeHolder={"Gender"}
                        name="AgencyLocation"
                        label="Gender"
                        value={episodeDetailsForCreatePage?.Patient?.gender || ""}
                        disabled={true}
                    />
                </ResponsiveBox>
                <ResponsiveBox size={700}>
                    <TextInput
                        type="text"
                        placeHolder={"Email"}
                        name="AgencyLocation"
                        label="Email"
                        value={episodeDetailsForCreatePage?.Patient?.email || ""}
                        disabled={true}
                    />
                    <TextInput
                        type="text"
                        placeHolder={"Phone No"}
                        name="AgencyLocation"
                        label="Phone No"
                        value={episodeDetailsForCreatePage?.Patient?.phoneNumber || ""}
                        disabled={true}
                    />
                </ResponsiveBox>
                <ResponsiveBox size={700}>
                    <TextInput
                        type="text"
                        placeHolder={"Email"}
                        name="AgencyLocation"
                        label="Race"
                        value={episodeDetailsForCreatePage?.Patient?.race || ""}
                        disabled={true}
                    />
                    <TextInput
                        type="text"
                        placeHolder={"Phone No"}
                        name="AgencyLocation"
                        label="Date of Birth"
                        value={moment(episodeDetailsForCreatePage?.Patient?.dateOfBirth).format("LL") || ""}
                        disabled={true}
                    />
                </ResponsiveBox>

                <Heading>Physician Detail</Heading>
                <ResponsiveBox size={500}>
                    <TextInput
                        type="text"
                        placeHolder={"First Name"}
                        name="AgencyLocation"
                        label="First Name"
                        value={episodeDetailsForCreatePage?.Physician?.firstName || ""}
                        disabled={true}
                    />
                    <TextInput
                        type="text"
                        placeHolder={"Last Name"}
                        name="AgencyLocation"
                        label="Last Name"
                        value={episodeDetailsForCreatePage?.Physician?.lastName || ""}
                        disabled={true}
                    />
                    <TextInput
                        type="text"
                        placeHolder={"NPI"}
                        name="AgencyLocation"
                        label="NPI"
                        value={episodeDetailsForCreatePage?.Physician?.NPI || ""}
                        disabled={true}
                    />
                </ResponsiveBox>
                <ResponsiveBox size={700}>
                    <TextInput
                        type="text"
                        placeHolder={"Email"}
                        name="AgencyLocation"
                        label="Email"
                        value={episodeDetailsForCreatePage?.Physician?.primaryEmail || ""}
                        disabled={true}
                    />
                    <TextInput
                        type="text"
                        placeHolder={"Phone No"}
                        name="AgencyLocation"
                        label="Phone No"
                        value={episodeDetailsForCreatePage?.Physician?.contactNumber || ""}
                        disabled={true}
                    />
                </ResponsiveBox>

                <Heading>Select Assignee <span className='text-danger'>*</span></Heading>
                <SelectDropdown
                    type="text"
                    placeHolder={"Select Assignee"}
                    name="SelectAssignee"
                    onChangeCb={(e) => {
                        onChangeHandler(e)
                        dispatch(setSelectedProgressNoteAssignee(e.target.selectedOption))
                    }}
                    value={addNoteStates.SelectAssignee.value}
                    rules={addNoteStates.SelectAssignee.rules}
                    errors={addNoteStates.SelectAssignee.errors}
                    formSubmitted={addNoteFieldTouch}
                    defaultValue={addNoteStates.SelectAssignee.value.length !== 0 ? { label: addNoteStates.SelectAssignee.value } : null}
                    options={assigneeByEpisodeId}
                />

                <Heading>Digital Signature</Heading>
                <SignaturePad saveSignatureCb={handleSaveSignatureClick} onPrevCb={() => navigate(`/${CLIENT_EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${CLIENT_EPISODE_MANAGEMENT.CHILD_ROUTS.EPISODE_DETAILS}/${episodeId}`)} isPreviousAllowed={true} submitButtonText="Save" />
            </Container>
        </Loadable>
    )
}

export default ClientAddNotes
