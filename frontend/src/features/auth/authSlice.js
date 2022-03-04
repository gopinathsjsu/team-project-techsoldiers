import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    authed: false
}

export const login = createAsyncThunk('auth/login',
async (username, password) => {
  return await new Promise((res) => {
    if (username === "username" && password === "password"){
      res()
    }
  })
}
)

export const logout = createAsyncThunk('auth/logout',
async () => {
  return await new Promise((res) => {
    res()
  })
}
)

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      // if want to add more reducers
    },
    extraReducers: (builder) => {
      builder.addCase(login.fulfilled, (state) => {
        state.authed = true
      })
  
      builder.addCase(logout.fulfilled, (state) => {
        state.authed = false
      })
    }
  
  })


  // The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAuth = (state) => state.auth.authed;

export default authSlice.reducer;

