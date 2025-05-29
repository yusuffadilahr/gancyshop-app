import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
    initialState: {
        darkmode: false,
        notFoundPage: false,
        profileAdmin: {
            fullname: '',
            phoneNumber: '',
            email: ''
        }
    } as {
        darkmode: boolean
        notFoundPage: boolean
        profileAdmin: {
            fullname: string,
            phoneNumber: string,
            email: string
        }
    },

    name: 'theme',
    reducers: {
        setThemeMode: (state, action) => {
            state.darkmode = action.payload
        },
        setNotFoundPage: (state, action) => {
            state.notFoundPage = action.payload
        },
        setProfileAdmin: (state, action) => {
            state.profileAdmin = action.payload
        }
    }
})

export const { setThemeMode, setNotFoundPage, setProfileAdmin } = globalSlice.actions
export default globalSlice.reducer