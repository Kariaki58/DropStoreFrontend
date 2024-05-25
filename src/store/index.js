import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user/userSlice'
import comfirmTokenSlice from "./comfirmToken/comfirmTokenSlice";
import homeSlice from "./home/homeSlice";
import loginSlice from './loginToken/loginTokenSlice';
import logoutSlice from './logout/logoutSlice';
import userUploadSlice from "./upload/allUserUpload/userUploadSlice";
// import signatureSlice from './upload/products/uploadProductSlice';
// import uploadProductSlice from "./upload/products/uploadProductSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        token: comfirmTokenSlice,
        home: homeSlice,
        login: loginSlice,
        logout: logoutSlice,
        userupload: userUploadSlice
        // upload: uploadProductSlice,
        // signature: signatureSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})
