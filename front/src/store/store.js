import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./reducers/userReducer"

// const userSlice = createSlice({
//     name: "user",
//     initialState: {
//         isLogged: false,
//         infos: null,
//     },
//     reducers: {
//         loginUser: (state, action) => {
//             state.isLogged = true
//             state.infos = action.payload
//         },
//         loginOutUser: (state, action) => {
//             state.isLogged = false
//             state.infos = null
//         },
//     },
// })
// export const { loginUser } = userSlice.actions

export const store = configureStore({
    reducer: {
        user: userSlice,
    },
})
