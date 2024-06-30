import { PAGE_STATE } from "../../../../libs/constant"
import store from "../../../../store/store"

export const componentKey = 'CLIENT_EPISODE_MANAGEMENT_ADMIN/EPISODE_LISTING'

const { actions } = store.reducerManager.add({
    key: componentKey,
    addedReducers: {
        setClientEpisodeList: (state, action) => {
            state.clientEpisodeList = action.payload
        },
        setPaginationState: (state, action) => {
            state.PaginationState = { ...state.PaginationState, ...action.payload }
        },
        setSelectedClientEpisodes: (state, action) => {
            state.selectedClientEpisodes = action.payload
        }
    },
    initialReducerState: {
        loadingState: { state: PAGE_STATE.PAGE_READY, message: '' },
        clientEpisodeList: [],
        selectedClientEpisodes: [],

        PaginationState: {
            PageNumber: 1,
            PageSize: 15,
            FilterText: "",
            IsDesc: true,
            totalEpisode: 10,
            Status: "OPEN"
        },
    }
})

export const { setClientEpisodeList, setPaginationState, setSelectedClientEpisodes } = actions