import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import bookingReducer from '../features/booking/bookingSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    booking: bookingReducer,
  }
});
