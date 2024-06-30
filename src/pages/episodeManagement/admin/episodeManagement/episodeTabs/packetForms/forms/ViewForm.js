import React, { useState, useEffect } from "react";
import { Form } from "@formio/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { componentKey } from "../../../AdminEpisodeManagementSlice";
import { getFormComponentById } from "../../../AdminEpisodeManagementSaga";
import { toast } from "react-toastify";
import { EPISODE_MANAGEMENT } from "../../../../../../../routes/constants";

const ViewForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { episodeId, formId } = useParams();
    const { formComponent } = useSelector((state) => state[componentKey]); 
    
    useEffect(() => {
        const fetchForm = async () => {
            dispatch(getFormComponentById({ formId }));
        };
        fetchForm();
    }, [formId]);
    
    const handleSubmit = async () => {
        toast.info("You can not submit the form. As this is to be filled by nurse");
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
            <Form
                form={formComponent}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default ViewForm;
