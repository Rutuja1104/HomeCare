import React, { useEffect, useState } from "react";
import { Form } from "@formio/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { componentKey } from "../../../AdminEpisodeManagementSlice";
import { getFilledFormDataById, getFormComponentById } from "../../../AdminEpisodeManagementSaga";
import { toast } from "react-toastify";
import { EPISODE_MANAGEMENT } from "../../../../../../../routes/constants";

const SubmittedForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { episodeId, formId } = useParams();
    const { formData, formComponent } = useSelector((state) => state[componentKey]);

    useEffect(() => {
        dispatch(getFilledFormDataById({ episodeId, formId }));
        dispatch(getFormComponentById({ formId }));
    }, []);

    let data;
    const shouldRenderForm = formComponent && formData && formData.formData;
    if (shouldRenderForm) {
        data = JSON.parse(JSON.stringify(formData.formData));
    }

    const handleSubmit = async () => {
        toast.info("Form Is already filled by Nurse, You can not submit the form.");
        navigate(
            `/${EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${EPISODE_MANAGEMENT.CHILD_ROUTS.EPISODE_DETAILS}/${episodeId}?at=7`
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
            <div>{shouldRenderForm && <Form form={formComponent} submission={data} onSubmit={handleSubmit} />}</div>
        </div>
    );
};
export default SubmittedForm;
