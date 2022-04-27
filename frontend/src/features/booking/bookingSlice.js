import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
      // can add more reducers
      bookingStatus: (state, action) => {
        // state = [];  
        // state.push(action.payload)
        state.unshift(action.payload);
      }
    },
  })

export const { bookingStatus } = bookingSlice.actions;
  // The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectAuth = (state) => state.auth.authed;

export default bookingSlice.reducer;