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

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// // export type AppDispatch = typeof store.dispatch

// // app/hooks.ts

// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
// import type { RootState, AppDispatch } from '../Store'

// // Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch = () => useDispatch<AppDispatch>()
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

