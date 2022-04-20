import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    state: false
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
      // can add more reducers
      modalOpen: (state) => {
        state.state = true;
      },
      modalClose: (state) => {
          state.state = false;
      }
    },
  })

export const { modalOpen, modalClose } = modalSlice.actions;
  // The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export default modalSlice.reducer;