import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  modifiedproduct: [],
}

// this code does nothing yet
export const productSlice = createSlice({
    name: 'modify',
    initialState,
    reducers: {
      modifyProduct: (state, action) => {
        state.modifiedproduct = action.payload
      }
    }
})

export const { modifyProduct } = productSlice.actions
export default productSlice.reducer
