import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    initialState: {
        auth: {
            token: ''
        }
    },

    name: 'auth',
    reducers: {
        setToken: (state, action) => {
            state.auth.token = action.payload
        }
    }
})

export const { setToken } = authSlice.actions
export default authSlice.reducer