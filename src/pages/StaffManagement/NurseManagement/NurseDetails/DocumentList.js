import React from 'react';
import Container from '../../../../components/container/Container';
import Heading from '../../../../components/heading/Heading';
import { HEADING } from '../../../../components/heading/constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { componentKey } from '../NurseListing/NurseListingSlice';
import FileUpload from '../../../../components/fileUpload/FileUpload';
import General from '../../../../libs/utility/General';
import { getDocumentFromS3Bucket } from '../../../JobPostings/JobApplicationDetails/JobApplicationDetailsSaga';

const DocumentList = () => {
    const dispatch = useDispatch();
    const { uploadedDocuments } = useSelector((state) => state[componentKey]);

    return (
        <Container containerMainClassName="mb-4">
            <Heading type={HEADING.H2}>Documents :</Heading>
            {uploadedDocuments.map((item, index) => {
                return (
                    <React.Fragment key={index}>
                        <FileUpload
                            isRemoveAbel={false}
                            label={General.formatLabelAndValue(item?.documentType, item?.documentType).label}
                            isUploadable={false}
                            className="m-0"
                            uploadedFiles={item?.items || []}
                            onPreviewCb={(url) => dispatch(getDocumentFromS3Bucket(url))}
                        />{" "}
                    </React.Fragment>
                );
            })}
        </Container>
    );
};

export default DocumentList;
