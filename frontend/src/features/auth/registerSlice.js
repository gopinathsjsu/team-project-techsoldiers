import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: null,
    status: "unauth",
    confirm: false
}

export const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
      // if want to add more reducers
      registerState: (state, action) => {
        state.status = "newUser";
        state.data = action.payload;
        state.confirm =  false;
      },
      confirmState: (state) => {
        state.status = "confirmed";
        state.confirm = true;
      }
    },
  })

export const { registerState, confirmState } = registerSlice.actions;
  // The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
//export const selectAuth = (state) => state.auth.authed;

export default registerSlice.reducer;

