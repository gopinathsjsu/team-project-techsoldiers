import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistCombineReducers, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
// Reducers
import counterReducer from '../features/counter/counterSlice';
import loginReducer from '../features/auth/loginSlice';
import registerReducer from "../features/auth/registerSlice";

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistCombineReducers( persistConfig,{
  login: loginReducer
});




export const store = configureStore({
  reducer: {
    counter: counterReducer,
    register: registerReducer,
    persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
