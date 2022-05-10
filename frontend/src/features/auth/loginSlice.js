import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: null,
    status: "unauth",
    confirm: false
}

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
      // if want to add more reducers
      loginState: (state, action) => {
        state.status = "auth";
        state.data = action.payload;
        state.confirm = true;
      }
    },
  })

export const { loginState } = loginSlice.actions;
  // The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
//export const selectAuth = (state) => state.auth.authed;

export default loginSlice.reducer;

