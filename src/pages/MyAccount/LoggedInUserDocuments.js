import React from "react";
import { HEADING } from "../../components/heading/constants/constants";
import Heading from "../../components/heading/Heading";
import General from "../../libs/utility/General";
import { useDispatch } from "react-redux";
import Container from "../../components/container/Container";
import FileUpload from "../../components/fileUpload/FileUpload";
import { getDocumentFromS3Bucket } from "../JobPostings/JobApplicationDetails/JobApplicationDetailsSaga";
const LoggedInUserDocuments = ({ documents }) => {
    const dispatch = useDispatch();
    function organizeDocumentsByType(documents) {
        const organizedDocuments = {};
        if (!documents) return;
        documents.forEach((document) => {
            const { documentType } = document;

            if (!organizedDocuments[documentType]) {
                organizedDocuments[documentType] = [];
            }

            organizedDocuments[documentType].push({ document });
        });

        return organizedDocuments;
    }
    const organizedDocuments = organizeDocumentsByType(documents);

    return (
        <Container containerMainClassName="mb-4">
            <Heading type={HEADING.H2}>Documents :</Heading>
            {Object.keys(organizedDocuments).length > 0 &&
                Object.keys(organizedDocuments)?.map((key) => {
                    let doc = organizedDocuments[key]?.map((document) => {
                        const newObj = document?.document;
                        return newObj;
                    });
                    return (
                        <React.Fragment key={key}>
                            {doc[0]?.documentType !== "BackgroundCheck" ? (
                                <FileUpload
                                    isRemoveAbel={false}
                                    label={
                                        General.formatLabelAndValue(doc[0]?.documentType, doc[0]?.documentType).label
                                    }
                                    isUploadable={false}
                                    className="m-0"
                                    uploadedFiles={doc || []}
                                    onPreviewCb={(url) => dispatch(getDocumentFromS3Bucket(url))}
                                />
                            ) : (
                                ""
                            )}
                        </React.Fragment>
                    );
                })}
        </Container>
    );
};

export default LoggedInUserDocuments;
