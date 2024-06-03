// import { createSlice } from "@reduxjs/toolkit";
// import { logOutAccount } from "./logoutPost";

// const initialState = {
//     data: '',
//     loading: true,
//     error: ''
// }
// const logoutSlice = createSlice({
//     name: 'logout',
//     initialState,
//     reducers: {
//         clearLogoutState: (state) => {
//             state.data = '';
//             state.loading = true;
//             state.error = '';
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//         .addCase(logOutAccount.pending, (state) => {
//             state.loading = true
//         })
//         .addCase(logOutAccount.fulfilled, (state, action) => {
//             state.loading = false
//             state.data = action.payload
//         })
//         .addCase(logOutAccount.rejected, (state, action) => {
//             state.loading = true
//             state.error = action.payload
//         })
//     }
// })


// export default logoutSlice.reducer
// export const { clearLogoutState } = logoutSlice.actions;
