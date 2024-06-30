import React, { useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { componentKey as episodeManagementComponentKey } from '../EpisodeManagementSlice'
import { componentKey, setActiveStep, setAllRequiredFieldsTouched, setStaffSelectionFieldsTouch, setUpdatedEmergencyVitals } from './CreateEpisodeSlice'
import { setHeaderLabel } from '../../../../layouts/LayoutSlice'
import { EPISODE_MANAGEMENT } from '../../../../routes/constants'
import { getAllPayerList, getEmergencyVitals, getPatientDetailsById, getStaffListByAgencyId, postCreateEpisode } from './CreateEpisodeSaga'

import StepperNavigation from '../../../../components/stepperNavigation/StepperNavigation'
import EpisodeBasicManagement from './episodeBasicManagement/EpisodeBasicManagement'
import PhysicianOrder from './physicianOrder/PhysicianOrder'
import Loadable from '../../../../components/loadable/Loadable'
import useFlexCleanup from '../../../../store/FlexCleanup'
import GeneralValidator from '../../../../libs/utility/validators/GeneralValidator'
import AssigneeStaffSelection from './staffSelection/StaffSelection'
import General from '../../../../libs/utility/General'

const CreateEpisode = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useFlexCleanup(componentKey)

    const { patientId } = useParams()

    const agencyId = General.getLocalStorageData("agencyId")
    const token = General.getLocalStorageData("token")

    const { loadingState } = useSelector(state => state[episodeManagementComponentKey])
    const { activeStep, assignEpisodeForPatient, StaffSelection, patientDetails, selectedNurseDetails, emergencyVitals, SelectedCaseManager, navigateToEpisodePage, selectedDiscipline, selectedPayerDetails } = useSelector(state => state[componentKey])

    useEffect(() => {
        dispatch(setHeaderLabel("New Intake Process"))
    }, [])

    useEffect(() => {
        if (navigateToEpisodePage) {
            navigate(`/${EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${EPISODE_MANAGEMENT.CHILD_ROUTS.EPISODE_LISTING}`)
        }
    }, [navigateToEpisodePage])

    useEffect(() => {
        if (patientId) {
            dispatch(getPatientDetailsById({ agencyId, patientId, token }))
            dispatch(getStaffListByAgencyId({ agencyId, token }))
            dispatch(getEmergencyVitals({ agencyId, token }))
            dispatch(getAllPayerList({ patientId, token }))
        }
    }, [patientId])

    useEffect(() => {
        if (emergencyVitals.length !== 0) {
            const copiedEpisodeDetails = JSON.parse(JSON.stringify(assignEpisodeForPatient.basicEpisodeDetails));
            copiedEpisodeDetails.LowBloodPressure.value = emergencyVitals.lowBloodPressure || ""
            copiedEpisodeDetails.HighBloodPressure.value = emergencyVitals.highBloodPressure || ""
            copiedEpisodeDetails.LowDiastolic.value = emergencyVitals.lowDiastolic || ""
            copiedEpisodeDetails.HighDiastolic.value = emergencyVitals.highDiastolic || ""
            copiedEpisodeDetails.LowSystolic.value = emergencyVitals.lowSystolic || ""
            copiedEpisodeDetails.HighSystolic.value = emergencyVitals.highSystolic || ""
            copiedEpisodeDetails.LowPulse.value = emergencyVitals.lowPulse || ""
            copiedEpisodeDetails.HighPulse.value = emergencyVitals.highPulse || ""
            copiedEpisodeDetails.LowTemperature.value = emergencyVitals.lowTemperature || ""
            copiedEpisodeDetails.HighTemperature.value = emergencyVitals.highTemperature || ""
            copiedEpisodeDetails.LowRespiratory.value = emergencyVitals.lowRespiratory || ""
            copiedEpisodeDetails.HighRespiratory.value = emergencyVitals.highRespiratory || ""
            copiedEpisodeDetails.LowBloodSugar.value = emergencyVitals.lowBloodSugar || ""
            copiedEpisodeDetails.HighBloodSugar.value = emergencyVitals.highBloodSugar || ""

            dispatch(setUpdatedEmergencyVitals(copiedEpisodeDetails))
        }
    }, [emergencyVitals])

    const CREATE_EPISODE_STEPS = [
        {
            title: "Basic Episode Details",
            stepBodyComponent: <EpisodeBasicManagement />,
            backButtonText: "Back",
            submitButtonText: "Next",
            prevCb: () => {
                navigate(`/${EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${EPISODE_MANAGEMENT.CHILD_ROUTS.PATIENT_DETAILS}?pid=${patientId}`)
            },
            submitCb: () => {
                dispatch(setActiveStep(1))
            },
            submitButtonDisabled: GeneralValidator.validateRequiredFields(assignEpisodeForPatient.basicEpisodeDetails) ? true : false,
            submitButtonDisabledInfoCb: () => {
                window.scrollTo(0, 0)
                dispatch(setAllRequiredFieldsTouched({ name: "basicEpisodeDetailsFieldsTouch", value: true }))
            },
            linkTo: "episode-basic-management",
            isTitleClickAllow: true,
            onTitleClickCb: (index) => {
                dispatch(setAllRequiredFieldsTouched({ name: "basicEpisodeDetailsFieldsTouch", value: true }))
                if (!GeneralValidator.validateRequiredFields(assignEpisodeForPatient.basicEpisodeDetails)) {
                    dispatch(setActiveStep(index))
                }
            }
        }, {
            title: "Physician Order",
            stepBodyComponent: <PhysicianOrder />,
            backButtonText: "Back",
            submitButtonText: "Next",
            prevCb: () => {
                dispatch(setActiveStep(0))
            },
            submitCb: () => {
                dispatch(setActiveStep(2))
            },
            submitButtonDisabled: false,
            submitButtonDisabledInfoCb: () => { },
            linkTo: "physician-order",
            isTitleClickAllow: true,
            onTitleClickCb: (index) => {
                dispatch(setActiveStep(index))
            }
        }, {
            title: "Staff Selection",
            stepBodyComponent: <AssigneeStaffSelection />,
            backButtonText: "Back",
            submitButtonText: "Next",
            prevCb: () => {
                dispatch(setActiveStep(1))
            },
            submitCb: () => {

                const data = {
                    "agencyLocation": assignEpisodeForPatient.basicEpisodeDetails.AgencyLocation.value,
                    "faceToFaceDate": assignEpisodeForPatient.basicEpisodeDetails.FaceToFaceDate.value,
                    "SOCDate": assignEpisodeForPatient.basicEpisodeDetails.SOCDate.value,
                    "emergencyLevel": assignEpisodeForPatient.basicEpisodeDetails.EmergencyLevel.value,
                    "episodeDuration": +assignEpisodeForPatient.basicEpisodeDetails.EpisodeDuration.value,
                    "comments": assignEpisodeForPatient.basicEpisodeDetails.EpisodeComments.value,
                    "isEpisodeDeleted": false,
                    "startTime": assignEpisodeForPatient.basicEpisodeDetails.EpisodeStartDate.value,
                    "endTime": assignEpisodeForPatient.basicEpisodeDetails.EpisodeEndDate.value,
                    "caseManagerId": SelectedCaseManager.id,
                    "physicianId": patientDetails.physicianId,
                    "nurseIds": [selectedNurseDetails.id],
                    "status": "OPEN",
                    "purpose":StaffSelection[0].episodePurpose.value,
                    "discipline":selectedDiscipline.role,
                    "payerId" : selectedPayerDetails?.id
                }

                dispatch(postCreateEpisode({ agencyId, patientId, data, token }))

            },
            submitButtonDisabled: GeneralValidator.validateRequiredFieldsArray(StaffSelection) ? true : false,
            submitButtonDisabledInfoCb: () => {
                dispatch(setStaffSelectionFieldsTouch(true))
            },
            linkTo: "staff-selection",
            isTitleClickAllow: true,
            onTitleClickCb: (index) => {
                dispatch(setActiveStep(index))
            }
        },
    ];

    return (
        <Loadable loadingStates={loadingState.state} loadingMessage={loadingState.message}>
            <StepperNavigation skipAutoNextStep={true} containerClassName={"mt-4"} activeStep={activeStep} className={"pt-0"} steps={CREATE_EPISODE_STEPS} />
        </Loadable>
    )
}

export default CreateEpisode
