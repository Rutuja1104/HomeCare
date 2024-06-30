import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import ResponsiveLabelValue from '../../../../components/responsiveLabelValue/ResponsiveLabelValue'
import Container from '../../../../components/container/Container'
import RadioInput from '../../../../components/input/radioinput/RadioInput'
import Label from '../../../../components/label/labelV2/Label'
import Base64Image from '../../../../components/base64Image/Base64Image'
import FileUpload from '../../../../components/fileUpload/FileUpload'
import Heading from '../../../../components/heading/Heading'
import { HEADING } from '../../../../components/heading/constants/constants'
import General from '../../../../libs/utility/General'
import { getDocumentFromS3Bucket } from '../JobApplicationDetailsSaga'
import { componentKey } from '../JobApplicationDetailsSlice'

const JobApplicationForm = () => {
    const dispatch = useDispatch()
    const { jobApplicationDetails, jobApplicationCompleteDetails, setS3UploadedDocumentList } = useSelector(state => state[componentKey])
    const questions = [
        {
            text: "Are you of legal age to work?",
            choices: [
                { label: "Yes", checked: jobApplicationCompleteDetails.isLegalToWork == "true" ? true : false },
                { label: "No", checked: jobApplicationCompleteDetails.isLegalToWork == "false" ? true : false }
            ],
        },
        {
            text: "Are you a U.S citizen?",
            choices: [
                { label: "Yes", checked: jobApplicationCompleteDetails.usCitizen == "true" ? true : false },
                { label: "No", checked: jobApplicationCompleteDetails.usCitizen == "false" ? true : false }
            ],
        },
        {
            text: "Are you available for work full time",
            choices: [
                { label: "Full-time", checked: jobApplicationCompleteDetails.workType == "Full-time" },
                { label: "Part-time", checked: jobApplicationCompleteDetails.workType == "Part-time" },
            ],
        },
        {
            text: "Have you ever been convicted of a crime other than a routine traffic citation?",
            choices: [
                { label: "Yes", checked: jobApplicationCompleteDetails.convictedCrime == "true" ? true : false },
                { label: "No", checked: jobApplicationCompleteDetails.convictedCrime == "false" ? true : false }
            ],
        }
    ]
    return (
        <React.Fragment>
            {jobApplicationDetails.length ? jobApplicationDetails.map((item, index) =>
                <Container header={item[0]?.category} containerMainClassName="mb-4" key={index}>
                    <ResponsiveLabelValue data={item} />
                </Container>
            ) : ""}

            <Container containerMainClassName="mb-4">
                {questions.map((item, idx) => {
                    return (
                        <div className='job-application-questions mb-5 ' key={idx}>
                            <Label>{item.text}</Label>
                            <div className='d-flex'>
                                {item.choices.map((data, index) => (
                                    <RadioInput
                                        key={index + 5}
                                        label={{ suffixLabel: data.label }}
                                        name={data.label}
                                        value={data.label}
                                        checked={data.checked}
                                    />
                                ))}
                            </div>
                            
                        </div>
                    )
                })}
            </Container>

            <Container containerMainClassName="mb-4">
                <Heading type={HEADING.H2}>Required Document :</Heading>
                {setS3UploadedDocumentList.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            {item.documentType !== "BackgroundCheck" ?
                                <FileUpload
                                    isRemoveAbel={false}
                                    label={General.formatLabelAndValue(item?.documentType, item?.documentType).label}
                                    isUploadable={false}
                                    className="m-0"
                                    uploadedFiles={item?.items || []}
                                    onPreviewCb={(url) => dispatch(getDocumentFromS3Bucket(url))}
                                /> : ""
                            }
                        </React.Fragment>
                    )
                })}
            </Container>

            <Container>
                <Base64Image base64={jobApplicationCompleteDetails.digitalSignature} header="Applicant Signature" />
            </Container>
        </React.Fragment >
    )
}

export default JobApplicationForm
