import store from "../../../../store/store"

export const componentKey = 'EPISODE_MANAGEMENT_ADMIN/PATIENT_DETAILS'

const { actions } = store.reducerManager.add({
    key: componentKey,
    addedReducers: {
        setPatientEpisodeList: (state, action) => {
            state.patientEpisodeList = action.payload
        },
        setPatientDetails: (state, action) => {
            state.patientDetails = action.payload
        }
    },
    initialReducerState: {
        patientEpisodeList: [],
        patientDetails: {}
    }
})

export const { setLoadingState, setPatientDetails, setPatientEpisodeList } = actions