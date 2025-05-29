import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
    initialState: {
        darkmode: false,
        notFoundPage: false
    } as {
        darkmode: boolean
        notFoundPage: boolean
    },

    name: 'theme',
    reducers: {
        setThemeMode: (state, action) => {
            state.darkmode = action.payload
        },
        setNotFoundPage: (state, action) => {
            state.notFoundPage = action.payload
        }
    }
})

export const { setThemeMode, setNotFoundPage } = globalSlice.actions
export default globalSlice.reducer