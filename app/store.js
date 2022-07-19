import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import privateReducer from '../features/private/privateSlice'
import adminReducer from '../features/admin/adminSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    private: privateReducer,
    admin: adminReducer
  },
})