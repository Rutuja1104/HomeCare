import React, { useEffect, useState } from 'react';
import Icons from '../../../components/icon/Icon';
import { VEC_ICON_NAME } from '../../../components/icon/constants';
import { useNavigate } from 'react-router-dom';
import {
    setEpisodePaginationState,
    setPaginationState,
} from "../../episodeManagement/admin/episodeListing/EpisodeListingSlice";
import { useDispatch } from "react-redux";
const EpisodeCount = ({ title, totalPercentage, children, percentage = false }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [status, setStatus] = useState("");

    const goToEpisodesManagement = () => {
        if (title === "Open Episodes ") {
            navigate(`/episode-management/episode-list`);
            dispatch(setEpisodePaginationState({ Status: { label: "Open", value: "OPEN" } }));
        }
        if (title === "Closed Episodes ") {
            navigate(`/episode-management/episode-list`);
            dispatch(setEpisodePaginationState({ Status: { label: "Closed", value: "CLOSED" } }));
        }
        if (title === "Total Episodes") {
            navigate(`/episode-management/episode-list`);
            dispatch(setEpisodePaginationState({ Status:{ label: "All Episodes", value: "OPEN,CLOSED,COMPLETED,INPROGRESS"} }));
        }
    };
    return (
        <div className="episode-count-box">
            <div className="title">
                <span style={{ fontWeight: "bold", color: "#087D9E",cursor: 'pointer', textDecoration: 'underline' }} onClick={goToEpisodesManagement}>
                    {title}
                </span>
                <span className="" style={{ color: "#027A48" }}>
                    {percentage && <Icons iconName={VEC_ICON_NAME.UP_ARROW}></Icons>}
                    {totalPercentage}
                </span>
            </div>
            <div>{children}</div>
        </div>
    );
};
export default EpisodeCount;
