import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setHeaderLabel } from "../../../../../../layouts/LayoutSlice";
import { CLIENT_EPISODE_MANAGEMENT } from "../../../../../../routes/constants";
import { getEpisodePurposeByEpisodeId } from "../../ClientEpisodeManagementSaga";
import { componentKey } from "../../ClientEpisodeManagementSlice";
import General from "../../../../../../libs/utility/General";
import Label from "../../../../../../components/label/labelV2/Label";
import { LABEL_WEIGHT } from "../../../../../../components/label/labelV2/constants";
import BadgeV2 from "../../../../../../components/badge/BadgeV2";
import UncontrolledDropdownV2 from "../../../../../../components/uncontrolledDropdown/UncontrolledDropdown";
import RichGrid from "../../../../../../components/richgrid/RichGrid";

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
            text: "Fill Form",
            onClickCb: (row) => {
                navigate(
                    `/${CLIENT_EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${CLIENT_EPISODE_MANAGEMENT.CHILD_ROUTS.FORM}/${episodeId}/${row.formId}`
                );
            },
            status: ["Pending"],
        },
        {
            text: "Edit Form",
            onClickCb: (row) =>
                navigate(
                    `/${CLIENT_EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${CLIENT_EPISODE_MANAGEMENT.CHILD_ROUTS.SUBMITTED_FORM}/${episodeId}/${row.formId}?status=${row.status}`
                ),
            status: ["Submitted"],
        },
        {
            text: "View Submitted Form",
            onClickCb: (row) =>
                navigate(
                    `/${CLIENT_EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${CLIENT_EPISODE_MANAGEMENT.CHILD_ROUTS.SUBMITTED_FORM}/${episodeId}/${row.formId}?status=${row.status}`
                ),
            status: ["Approved", "Rejected"],
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
