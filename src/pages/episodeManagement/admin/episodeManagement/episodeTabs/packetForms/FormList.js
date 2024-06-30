import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setHeaderLabel } from "../../../../../../layouts/LayoutSlice";
import RichGrid from "../../../../../../components/richgrid/RichGrid";
import UncontrolledDropdownV2 from "../../../../../../components/uncontrolledDropdown/UncontrolledDropdown";
import { LABEL_WEIGHT } from "../../../../../../components/label/labelV2/constants";
import Label from "../../../../../../components/label/labelV2/Label";
import BadgeV2 from "../../../../../../components/badge/BadgeV2";
import { componentKey } from "../../AdminEpisodeManagementSlice";
import General from "../../../../../../libs/utility/General";
import { getEpisodePurposeByEpisodeId, updateEpisodeFormStatus } from "../../AdminEpisodeManagementSaga";
import { EPISODE_MANAGEMENT } from "../../../../../../routes/constants";

function FormsList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { episodeId } = useParams();
    const [selectedRows, setSelectedRows] = useState([]);
    const { formList } = useSelector((state) => state[componentKey]);
    const agencyId = General.getLocalStorageData("agencyId");
    const token = General.getLocalStorageData("token")

    useEffect(() => {
        dispatch(setHeaderLabel("Forms"));
        dispatch(getEpisodePurposeByEpisodeId({ agencyId, episodeId, token }));
    }, []);
    const handleSelectionChange = (rows) => {
        setSelectedRows(rows);
    };

    const renderActionButton = (row) => {
        return ACTION_BUTTONS.filter((item) => item?.status?.includes(row?.status));
    };

    const renderDate = (row) => {
        if (row.fillDate) return row.fillDate.split("T")[0];
    };

    const ACTION_BUTTONS = [
        {
            text: "View Form",
            onClickCb: (row) => {
                navigate(
                    `/${EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${EPISODE_MANAGEMENT.CHILD_ROUTS.FORM}/${episodeId}/${row.formId}`
                );
            },
            status: ["Pending"],
        },
        {
            text: "View Submitted Form",
            onClickCb: (row) =>
                navigate(
                    `/${EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${EPISODE_MANAGEMENT.CHILD_ROUTS.SUBMITTED_FORM}/${episodeId}/${row.formId}`
                ),
            status: ["Submitted", "Approved", "Rejected"],
        },
        {
            text: "Approve",
            onClickCb: (row) =>
                dispatch(updateEpisodeFormStatus({ agencyId, episodeId, formId: row.formId, status: "Approved", token })),
            status: ["Submitted"],
        },
        {
            text: "Reject",
            onClickCb: (row) =>
                dispatch(updateEpisodeFormStatus({ agencyId, episodeId, formId: row.formId, status: "Rejected", token })),
            status: ["Submitted"],
        },
    ];

    const FORMS_COLUMNS = [
        {
            field: "formName",
            header: <Label weight={LABEL_WEIGHT[700]}>Form Name</Label>,
            renderLogic: (row, idx) => <span>{row?.formName}</span>,
        },
        {
            field: "filledDate",
            header: <Label weight={LABEL_WEIGHT[700]}>Filled Date</Label>,
            renderLogic: (row, idx) => <span>{renderDate(row)}</span>,
        },
        {
            field: "filledBy",
            header: <Label weight={LABEL_WEIGHT[700]}>Filled By</Label>,
            renderLogic: (row, idx) => <span>{row?.filledBy}</span>,
        },
        {
            field: "status",
            header: <Label weight={LABEL_WEIGHT[700]}>Status</Label>,
            renderLogic: (row, idx) => (
                <BadgeV2 color={General.renderBadgeColor(row?.status || "")}>{row?.status}</BadgeV2>
            ),
        },
        {
            field: "more",
            header: <Label weight={LABEL_WEIGHT[700]}>More</Label>,
            renderLogic: (row, idx) => (
                <UncontrolledDropdownV2 data={{ row, idx }} action={renderActionButton(row, idx)} />
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginTop: "16px" }}>
                <RichGrid
                    data={formList}
                    columns={FORMS_COLUMNS}
                    selectedRows={selectedRows}
                    onSelectionChangeCallBack={handleSelectionChange}
                    extractRowKey={(row) => row.id}
                />
            </div>
        </div>
    );
}

export default FormsList;
