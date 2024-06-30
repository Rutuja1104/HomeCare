import React, { useEffect } from "react";
import { Form } from "@formio/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { updateEpisodeForm, getFilledFormDataById, getFormComponentById } from "../../../ClientEpisodeManagementSaga";
import { componentKey } from "../../../ClientEpisodeManagementSlice";
import { CLIENT_EPISODE_MANAGEMENT } from "../../../../../../../routes/constants";
import { toast } from "react-toastify";

const ClientSubmittedForm = () => {
    const dispatch = useDispatch();
    const { episodeId, formId } = useParams();
    const { formData, formComponent } = useSelector((state) => state[componentKey]);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const status = searchParams.get("status");

    useEffect(() => {
        dispatch(getFilledFormDataById({ episodeId, formId }));
        dispatch(getFormComponentById({ formId }));
    }, []);

    const handleSubmit = async (submission) => {
        if (status === "Approved" || status === "Rejected") {
            toast.error(`Form is already been ${status}`);
            navigate(
                `/${CLIENT_EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${CLIENT_EPISODE_MANAGEMENT.CHILD_ROUTS.EPISODE_DETAILS}/${episodeId}`
            );
        } else {
            dispatch(
                updateEpisodeForm({
                    episodeId: episodeId,
                    data: submission,
                    formId: formId,
                })
            );
            navigate(
                `/${CLIENT_EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${CLIENT_EPISODE_MANAGEMENT.CHILD_ROUTS.EPISODE_DETAILS}/${episodeId}`
            );
        }
    };

    let data;
    const shouldRenderForm = formComponent && formData && formData.formData;
    if (shouldRenderForm) {
        data = JSON.parse(JSON.stringify(formData.formData));
    }
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
            <div>
                {shouldRenderForm && (
                    <Form
                        form={formComponent}
                        submission={data}
                        onSubmit={handleSubmit}
                    />
                )}
            </div>
        </div>
    );
};
export default ClientSubmittedForm;
