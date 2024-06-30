import React, { useEffect } from "react";
import General from "../../../libs/utility/General";
import Loadable from "../../loadable/Loadable";

import { useDispatch, useSelector } from "react-redux";
import { componentKey, setStatesList } from "./DataLoaderSlice";
import { USA_STATES } from "../../../libs/constant";
import { getProfessionalRoles } from "./DataLoaderSaga";

export default function DataLoader({ children }) {
    const { loadingState } = useSelector(state => state[componentKey])
    const dispatch = useDispatch();

    const token = General.getLocalStorageData("token")

    useEffect(() => {
        dispatch(setStatesList(USA_STATES))
        dispatch(getProfessionalRoles(token))
    }, [])

    return (
        <Loadable loadingStates={loadingState.state} loadingMessage={loadingState.message}>
            {children}
        </Loadable>
    )
}