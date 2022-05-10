import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistCombineReducers, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
// Reducers
import counterReducer from '../features/counter/counterSlice';
import loginReducer from '../features/auth/loginSlice';
import registerReducer from "../features/auth/registerSlice";
import locationHotelReducer from "../features/locationhotel/locationHotelSlice";
import searchReducer from "../features/search/searchSlice";
import modalReducer from "../features/modal/modalSlice";
import bookingReducer from "../features/booking/bookingSlice";
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistCombineReducers( persistConfig,{
  login: loginReducer,
  booking: bookingReducer
});




export const store = configureStore({
  reducer: {
    register: registerReducer,
    search: searchReducer,
    modal: modalReducer,
    persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
