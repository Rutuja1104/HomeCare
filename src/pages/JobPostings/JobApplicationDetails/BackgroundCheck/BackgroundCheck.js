import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import ResponsiveLabelValue from '../../../../components/responsiveLabelValue/ResponsiveLabelValue'
import Container from '../../../../components/container/Container'
import FileUpload from '../../../../components/fileUpload/FileUpload'
import { getDocumentFromS3Bucket } from '../JobApplicationDetailsSaga'
import { componentKey } from '../JobApplicationDetailsSlice'

const BackgroundCheck = () => {
    const dispatch = useDispatch()
    const { backgroundCheckDetails, setS3UploadedDocumentList } = useSelector(state => state[componentKey])
    return (
        <React.Fragment>
            {backgroundCheckDetails.length ? backgroundCheckDetails.map((item, index) =>
                <Container header={item[0].category} containerMainClassName="mb-4" key={index}>
                    <ResponsiveLabelValue data={item} />
                </Container>
            ) : ""}

            <Container>
                {setS3UploadedDocumentList.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            {item.documentType == "BackgroundCheck" ?
                                <FileUpload
                                    isRemoveAbel={false}
                                    label={"Uploaded Document"}
                                    isUploadable={false}
                                    className="m-0"
                                    onPreviewCb={(url) => dispatch(getDocumentFromS3Bucket(url))}
                                    uploadedFiles={item?.items || []}
                                /> : ""
                            }
                        </React.Fragment>
                    )
                })}
            </Container>
        </React.Fragment>
    )
}

export default BackgroundCheck
