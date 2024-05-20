import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user/userSlice'
import comfirmTokenSlice from "./comfirmToken/comfirmTokenSlice";
import homeSlice from "./home/homeSlice";


export const store = configureStore({
    reducer: {
        user: userReducer,
        token: comfirmTokenSlice,
        home: homeSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})
