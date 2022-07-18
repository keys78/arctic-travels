import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import privateReducer from '../features/private/privateSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    private: privateReducer
  },
})