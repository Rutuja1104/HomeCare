import React, { useEffect } from 'react'

import { toast } from 'react-toastify'
import { HEADING } from '../../../../components/heading/constants/constants'
import { useDispatch, useSelector } from 'react-redux'
import { getCompetencyChecklist, getUploadedChecklistForNurse, postStoreCompetencyChecklist } from '../JobApplicationSaga'
import { useParams } from 'react-router-dom'
import { componentKey, setCheckListTestQuestionsChange, setCompetencyCheckListSign, setJobApplicationActiveStep } from '../JobApplicationSlice'
import { componentKey as nurseOnboardingComponentKey } from "../../NurseOnboardingSlice"

import Heading from '../../../../components/heading/Heading'
import CheckListRender from '../../../../components/questionnaire/CheckListRender'
import General from '../../../../libs/utility/General'

const SkillCheckList = ({ activeIndex }) => {

    const dispatch = useDispatch()
    const { agencyId, applicationId, role } = useParams()
    const nurseId = General.getLocalStorageData("nurseId")
    const { skillCheckListData, competencyCheckListSign } = useSelector(state => state[componentKey])
    const { signatureInBase64 } = useSelector(state => state[nurseOnboardingComponentKey])

    useEffect(() => {
        if (skillCheckListData.length == 0) {
            dispatch(getCompetencyChecklist({ role, agencyId, applicationId, nurseId }))
        }
    }, [])

    const handleSubmitCompetencyTest = (isSignReadOnly) => {
        const filteredData = General.transformData(skillCheckListData)

        if (competencyCheckListSign.length !== 0) {
            const data = {
                // name: "Nursing Procedures Checklist",
                name: role,
                agencyId: agencyId,
                nurseId: nurseId,
                categories: filteredData,
                nurseSignBase64: competencyCheckListSign,
                applicationId: applicationId
            }
            const id = skillCheckListData?.id ?skillCheckListData?.id:undefined
            dispatch(postStoreCompetencyChecklist({ agencyId, applicationId, data, role, activeIndex,id:id }))
        } else if (isSignReadOnly) {
            const data = {
                // name: "Nursing Procedures Checklist",
                name: role,
                agencyId: agencyId,
                nurseId: nurseId,
                categories: filteredData,
                nurseSignBase64: signatureInBase64,
                applicationId: applicationId
            }
            window.scrollTo(0, 0)
            const id = skillCheckListData?.id ?skillCheckListData?.id:undefined
            dispatch(postStoreCompetencyChecklist({ agencyId, applicationId, data, role, activeIndex,id:id }))
        }
    }

    const handleSaveSignatureClick = (sign, isCanvasEmpty) => {
        if (!isCanvasEmpty) {
            dispatch(setCompetencyCheckListSign(sign))
        } else {
            toast.error('Please sign the consent box!')
        }
    }
    
    return (
        <React.Fragment>
            <Heading type={HEADING.H2}>Competency Checklist (Please answer all the questions)</Heading>
            <CheckListRender
                compulsory={true}
                showOrderNumber={true}
                questions={skillCheckListData}
                onChangeCb={(checked, categoryIndex, questionIndex, choiceIndex) => dispatch(setCheckListTestQuestionsChange({ checked, categoryIndex, questionIndex, choiceIndex }))}
                buttonVisible={true}
                onSubmitTestCb={handleSubmitCompetencyTest}
                isAllowSignature={false}
                isReadOnlySignature={true}
                saveSignatureCb={handleSaveSignatureClick}
                signature={signatureInBase64}
                onPreviousCb={() => dispatch(setJobApplicationActiveStep(activeIndex - 1))}
                questionsPerPage={100}
            />
        </React.Fragment>
    )
}

export default SkillCheckList
