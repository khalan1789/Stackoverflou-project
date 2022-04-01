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
    },
})
export const { logInUser, logOutUser } = userSlice.actions
export default userSlice.reducer
