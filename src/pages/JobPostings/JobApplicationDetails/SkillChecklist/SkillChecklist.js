import React, { useEffect } from 'react'
import Heading from '../../../../components/heading/Heading'
import { HEADING } from '../../../../components/heading/constants/constants'
import { useSelector } from 'react-redux'
import CheckListRender from '../../../../components/questionnaire/CheckListRender'
import { componentKey } from '../JobApplicationDetailsSlice'
import Label from '../../../../components/label/labelV2/Label'
import SignaturePad from '../../../../components/signaturePad/SignaturePad'
import Base64Image from '../../../../components/base64Image/Base64Image'

const SkillChecklist = ({ index }) => {

    const { readOnlyCompetencyChecklist, nurseSignatureOnChecklist, jobApplicationCompleteDetails, approversSign, submittedChecklist } = useSelector(state => state[componentKey])
    return (
        <React.Fragment>
            <Heading type={HEADING.H2} customStyle={{ margin: "20px 0" }}>Competency Checklist :</Heading>
            <CheckListRender index={index} buttonVisible={false} questionsPerPage={100} isAllowSignature={true} isSecondSignature={true} secondSignature={nurseSignatureOnChecklist}
                compulsory={true} showOrderNumber={true} questions={readOnlyCompetencyChecklist} jobApplicationCompleteDetails={jobApplicationCompleteDetails}
                approversSign={approversSign} getSubmittedChecklist={submittedChecklist} />

        </React.Fragment>
    )
}

export default SkillChecklist
