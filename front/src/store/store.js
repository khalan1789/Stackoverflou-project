import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        user: "",
        token: "",
        isConnected: false,
    },
    reducers: {
        logUser: (state, action) => {
            state.user = action.payload;
            state.isConnected = action.payload;
        },
    },
});

export const store = configureStore({
    reducer: {
        userSlice: userSlice.reducer,
    },
});
