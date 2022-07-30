// import { configureStore } from '@reduxjs/toolkit'
// import authReducer from '../features/auth/authSlice'
// import privateReducer from '../features/private/privateSlice'
// import adminReducer from '../features/admin/adminSlice'


// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     private: privateReducer,
//     admin: adminReducer
//   },

// })


// ts formatting

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
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

