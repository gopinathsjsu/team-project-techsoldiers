import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: null,
    status: "noBooking",
    confirm: false
}

export const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
      // can add more reducers
      bookingStatus: (state, action) => {
        state.status = action.payload.status;
        state.data = action.payload.data;
        state.confirm = false;
      }
    },
  })

export const { bookingStatus } = bookingSlice.actions;
  // The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectAuth = (state) => state.auth.authed;

export default bookingSlice.reducer;