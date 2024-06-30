import React, { useEffect } from 'react'
import { HEADING } from '../../../../components/heading/constants/constants'
import { useDispatch, useSelector } from 'react-redux'
import { postSubmitAssessmentsByRole } from '../JobApplicationSaga'
import { componentKey as NurseOnboardingComponentKey } from "../../NurseOnboardingSlice"
import { componentKey, setJobApplicationActiveStep, setSkillTestQuestionsChange } from '../JobApplicationSlice'

import Questionnaire from '../../../../components/questionnaire/Questionnaire'
import Heading from '../../../../components/heading/Heading'
import General from '../../../../libs/utility/General'
import { useParams } from 'react-router-dom'

const SkillTest = ({ activeIndex }) => {

    const dispatch = useDispatch()
    const { agencyId } = useParams()
    const { skillTestQuestion } = useSelector(state => state[componentKey])
    const { applicationId, userRole } = useSelector(state => state[NurseOnboardingComponentKey])

    const handleSubmitTest = () => {
        const selectedAnswers = General.convertQuestionIntoAnswer(skillTestQuestion)
        const data = {
            role: userRole,
            answers: selectedAnswers,
        }

        dispatch(postSubmitAssessmentsByRole({ data, applicationId, agencyId, activeIndex : activeIndex }))
    }

    return (
        <React.Fragment>
            <Heading type={HEADING.H2}>Questionnaire :</Heading>
            <Questionnaire
                compulsory={true}
                showOrderNumber={true}
                questions={skillTestQuestion}
                onChangeCb={(checked, parentIndex, childIndex) => dispatch(setSkillTestQuestionsChange({ checked, parentIndex, childIndex }))}
                onPreviousCb={() => dispatch(setJobApplicationActiveStep(activeIndex - 1))}
                buttonVisible={true}
                onSubmitTestCb={handleSubmitTest}
            />
        </React.Fragment>
    )
}

export default SkillTest
