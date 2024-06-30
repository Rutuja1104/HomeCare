import store from "../../../../store/store"

export const componentKey = 'EPISODE_MANAGEMENT_ADMIN/EPISODE_LISTING'

const { actions } = store.reducerManager.add({
    key: componentKey,
    addedReducers: {
        setShowSelectPatientModal: (state, action) => {
            state.showSelectPatientModal = action.payload
        },
        setSelectedPatient: (state, action) => {
            state.selectedPatient = action.payload.slice(-1)
        },
        setAllPatientList: (state, action) => {
            state.allPatientList = action.payload
        },
        setPaginationState: (state, action) => {
            state.PaginationState = { ...state.PaginationState, ...action.payload }
        },
        setEpisodePaginationState: (state, action) => {
            state.EpisodePaginationState = { ...state.EpisodePaginationState, ...action.payload }
        },
        setEpisodeList: (state, action) => {
            state.episodeList = action.payload
        },
        setSelectedEpisode: (state, action) => {
            state.selectedEpisode = action.payload
        },
        setSelectedEpisodeToDelete: (state, action) => {
            state.selectedEpisodeToDelete = action.payload
        },
        setShowDeleteEpisodeModal: (state, action) => {
            state.showDeleteEpisodeModal = action.payload
        }
    },
    initialReducerState: {
        selectedPatient: [],
        allPatientList: [],
        patientDetails: {},
        episodeList: [],
        selectedEpisode: [],

        //modals 
        showSelectPatientModal: false,
        showDeleteEpisodeModal: false,

        selectedEpisodeToDelete: {},

        PaginationState: {
            PageNumber: 1,
            PageSize: 5,
            FilterText: "",
            IsDesc: true,
            totalPatients: 10,
            Status: "active"
        },


        EpisodePaginationState: {
            PageNumber: 1,
            PageSize: 20,
            FilterText: "",
            IsDesc: true,
            totalPatients: 10,
            Status: { label: "Open", value: "OPEN" }
        },
    }
})

export const { setShowSelectPatientModal, setSelectedPatient, setAllPatientList, setPaginationState, setEpisodePaginationState, setEpisodeList, setSelectedEpisode, setSelectedEpisodeToDelete, setShowDeleteEpisodeModal } = actions