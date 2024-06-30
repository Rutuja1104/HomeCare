import React, { useEffect } from 'react'

import Information from '../../../components/information/Information'
import Label from '../../../components/label/Label'
import SignaturePad from "../../../components/signaturePad/SignaturePad"

import { VEC_ICON_NAME } from '../../../components/icon/constants'
import { useDispatch, useSelector } from 'react-redux'
import { componentKey, setActiveTabIndex, setSignatureOnAgreement } from '../NurseOnboardingSlice'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { postAppendDocument } from '../NurseOnboardingSaga'


const ConfidentialAgreement = () => {

    const { applicationId, agencyId } = useParams();
    const { signatureInBase64 } = useSelector(state => state[componentKey])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setActiveTabIndex(0))
    }, [])

    const handleSaveSignatureClick = (sign, isCanvasEmpty) => {
        if (!isCanvasEmpty) {
            dispatch(setSignatureOnAgreement(sign))
            dispatch(postAppendDocument({ applicationId: applicationId || "", imageBase64: sign, agencyId: agencyId, fileName: "consent-form.pdf", fileType: "consentForm", activeTabIndex: 1 }))
            window.scrollTo(0, 0)
        } else {
            toast.error('Please sign the consent form!')
        }
    }

    return (
        <React.Fragment>
            <Information iconName={VEC_ICON_NAME.ALERT_ROUNDED_ICON}>
                This agency bases hiring decisions on the ability, skills, education, experience, and background of applicants, and does not discriminate in employment opportunities or practices on the basis of race, colour, religion, sex, sexual orientation, national origin, age, disability, or any other characteristic protected by law.
            </Information>

            <Label>Confidentiality Agreement :</Label>
            <Label>
                In compliance with government (federal, state, local) rules, regulations and guidelines, as well as professional standards of the health care industry, the nature of services, <b>(Agency Name)</b> requires that all client information be handled in a private and confidential manner by all staff and employees.
            </Label>

            <Label>
                In compliance with HIPPA regulations, information about our agency, employees or clients will only be released to authorized individuals with prior written client consent. Exceptions to this policy will be explained during our New Employee Orientation. All staff, managers and employees are hereby advised that all agency reports, memoranda, notes, invoices, and any other documents will remain a part of the agency's confidential records.
            </Label>

            <Label>As a condition of employment, the undersigned agrees to abide by the terms of this confidentiality agreement.</Label>

            <Label>Applicant’s Signature <span style={{color:'red'}}>*</span> :</Label>

            <SignaturePad saveSignatureCb={handleSaveSignatureClick} savedSignature={signatureInBase64} />

        </React.Fragment>
    )
}

export default ConfidentialAgreement
