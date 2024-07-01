// registering all slice to redux
import { configureStore } from "@reduxjs/toolkit";
import { revertAll } from "./actions.js";
import userReducer from './user/userSlice'
import comfirmTokenSlice from "./comfirmToken/comfirmTokenSlice";
import homeSlice from "./home/homeSlice";
import loginSlice from './loginToken/loginTokenSlice';
import userUploadSlice from "./upload/allUserUpload/userUploadSlice";
import { productSlice } from "./upload/modifyUpload/modifyupload.js";
import createStoreSlice from './upload/customizeUserStore/productsInStoreSlice';
import StoreSlice from "./upload/StoreProducts/StoreSlice.js";
import addToCartSlice from "./upload/cartCount/addToCartSlice.js";
import cartSlice from "./upload/cart/cartSlice.js";
import { combineReducers } from "@reduxjs/toolkit";
import orderSlice from "./orders/orderSlice.js";
import addressSlice from "./Address/addressSlice.js";
import profileSlice from './Profile/userProfileSlice';


export const store = configureStore({
    reducer: {
        user: userReducer,
        token: comfirmTokenSlice,
        home: homeSlice,
        login: loginSlice,
        userupload: userUploadSlice,
        modify: productSlice,
        createstore: createStoreSlice,
        storeproduct: StoreSlice,
        cart: addToCartSlice,
        myCart: cartSlice,
        order: orderSlice,
        address: addressSlice,
        profile: profileSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

const appReducer = combineReducers({
    user: userReducer,
    token: comfirmTokenSlice,
    home: homeSlice,
    login: loginSlice,
    userupload: userUploadSlice,
    modify: productSlice,
    createstore: createStoreSlice,
    storeproduct: StoreSlice,
    cart: addToCartSlice,
    myCart: cartSlice,
    order: orderSlice,
    address: addressSlice,
    profile: profileSlice
  });
  
const rootReducer = (state, action) => {
    if (action.type === revertAll.type) {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;
