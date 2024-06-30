import store from "../store/store"

export const componentKey = 'LAYOUT_SECTION'

const { actions } = store.reducerManager.add({
    key: componentKey,
    addedReducers: {
        setHeaderLabel: (state, action) => {
            state.headerLabel = action.payload
        },
        setNonAuthLayoutHeader: (state, action) => {
            state.nonAuthLayoutHeader = action.payload
        }
    },
    initialReducerState: {
        headerLabel: "",
        nonAuthLayoutHeader: ""
    }
})

export const { setHeaderLabel, setNonAuthLayoutHeader } = actions