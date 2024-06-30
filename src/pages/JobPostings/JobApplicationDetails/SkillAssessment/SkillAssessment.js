import React, { useEffect } from 'react'
import Questionnaire from '../../../../components/questionnaire/Questionnaire'
import Information from '../../../../components/information/Information'
import { VEC_ICON_NAME } from '../../../../components/icon/constants'
import Heading from '../../../../components/heading/Heading'
import { HEADING } from '../../../../components/heading/constants/constants'
import { useSelector } from 'react-redux'
import { componentKey } from '../JobApplicationDetailsSlice'

const SkillAssessment = () => {

    const { readOnlyAssessmentResult, assessmentResult } = useSelector(state => state[componentKey])
    const percentage = (assessmentResult / readOnlyAssessmentResult.length) * 100;

    return (
        <React.Fragment>
            <Information iconName={VEC_ICON_NAME.ALERT_ROUNDED_ICON}>
                {`${percentage.toFixed(2)}%`} Assessment Result
            </Information>
            <Heading type={HEADING.H2} customStyle={{ margin: "20px 0" }}>Questionnaire :</Heading>
            <Questionnaire questionsPerPage={100} compulsory={true} showOrderNumber={true} questions={readOnlyAssessmentResult} />
        </React.Fragment>
    )
}

export default SkillAssessment