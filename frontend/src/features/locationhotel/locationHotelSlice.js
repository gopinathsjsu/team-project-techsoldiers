import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: null,
    status: "noBooking",
}

export const locationHotelSlice = createSlice({
    name: "locationhotel",
    initialState,
    reducers: {
      // can add more reducers
      locationHotelState: (state, action) => {
        state.status = "prebook";
        state.data = action.payload.data;
      }
    },
  })

export const { locationHotelState } = locationHotelSlice.actions;
  // The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectAuth = (state) => state.auth.authed;

export default locationHotelSlice.reducer;