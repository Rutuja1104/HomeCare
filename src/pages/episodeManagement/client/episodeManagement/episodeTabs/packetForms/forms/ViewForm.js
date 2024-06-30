import React, { useState, useEffect } from "react";
import { Form } from "@formio/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import General from "../../../../../../../libs/utility/General";
import { componentKey } from "../../../ClientEpisodeManagementSlice";
import { createForm, getFormComponentById } from "../../../ClientEpisodeManagementSaga";
import { CLIENT_EPISODE_MANAGEMENT } from "../../../../../../../routes/constants";

const ClientViewForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { episodeId, formId } = useParams();
    const [formSubmission, setFormSubmission] = useState({});
    const agencyId = General.getLocalStorageData("agencyId");
    const userId = General.getLocalStorageData("userId");
    const { formComponent } = useSelector((state) => state[componentKey]);
    const token = General.getLocalStorageData("token")

    useEffect(() => {
        const fetchForm = async () => {
            dispatch(getFormComponentById({ formId }));
        };
        fetchForm();
    }, [formId]);

    const handleSubmit = async (submission) => {
        setFormSubmission(submission);
        dispatch(
            createForm({
                episodeId: episodeId,
                agencyId: agencyId,
                data: submission,
                userId: userId,
                formId: formId,
                filledBy:`${General.tokenDecode(token)?.firstName} ${General.tokenDecode(token)?.lastName}`
            })
        );
        navigate(
            `/${CLIENT_EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${CLIENT_EPISODE_MANAGEMENT.CHILD_ROUTS.EPISODE_DETAILS}/${episodeId}`
        );
    };

    return (
        <div>
            <link rel="stylesheet" href="https://cdn.form.io/formiojs/formio.full.css" crossOrigin="anonymous" />
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
                crossOrigin="anonymous"
            />
            <link
                rel="stylesheet"
                href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <script src="https://cdn.form.io/formiojs/formio.form.min.js" crossOrigin="anonymous"></script>
            <Form
                form={formComponent}
                onSubmit={handleSubmit}
                onChange={(submission) => setFormSubmission(submission)}
            />
        </div>
    );
};

export default ClientViewForm;
