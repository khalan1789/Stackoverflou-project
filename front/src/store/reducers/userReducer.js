import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLogged: false,
        infos: null,
    },
    reducers: {
        logInUser: (state, action) => {
            state.isLogged = true
            state.infos = action.payload
        },
        logOutUser: (state, action) => {
            state.isLogged = false
            state.infos = null
        },
        updateReduxUserInfos: (state, action) => {
            state.infos = action.payload
        },
    },
})
export const { logInUser, logOutUser, updateReduxUserInfos } = userSlice.actions
export default userSlice.reducer
