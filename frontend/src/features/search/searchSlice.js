import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: null,
}

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
      // can add more reducers
      searchState: (state, action) => {
        state.data = {
          ...state.data,
          ...action.payload
        };
      }
    },
  })

export const { searchState } = searchSlice.actions;
  // The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectAuth = (state) => state.auth.authed;

export default searchSlice.reducer;