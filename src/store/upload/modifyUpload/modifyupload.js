import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  modifiedproduct: [],
}


export const productSlice = createSlice({
    name: 'modify',
    initialState,
    reducers: {
      modifyProduct: (state, action) => {
        console.log('here')
        console.log(action.payload)
        state.modifiedproduct = action.payload
      }
    }
})

export const { modifyProduct } = productSlice.actions
export default productSlice.reducer
