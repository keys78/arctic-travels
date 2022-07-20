import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import adminService from './adminService'

const initialState = {
  verifiedUsers: [],
  unVerifiedUsers:[],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// const token = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('authToken'))

// Get all verified users
export const getAllVerifiedUsers = createAsyncThunk(
  '/admin/all-verified-users',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await adminService.getAllVerifiedUsers(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get all unverified users
export const getAllUnVerifiedUsers = createAsyncThunk(
  '/admin/all-unverified-users',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await adminService.getAllUnVerifiedUsers(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// delete user
export const deleteUser = createAsyncThunk(
  '/admin/delete-user',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await adminService.deleteUser(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const adminSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUsers: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllVerifiedUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllVerifiedUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.verifiedUsers = action.payload
      })
      .addCase(getAllVerifiedUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllUnVerifiedUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllUnVerifiedUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.unVerifiedUsers = action.payload
      })
      .addCase(getAllUnVerifiedUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // state.verifiedUsers = state.verifiedUsers.filter( (user) => user._id !== action.payload.id )
        // state.unVerifiedUsers = state.unVerifiedUsers.filter( (user) => user._id !== action.payload.id )
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { resetUsers } = adminSlice.actions
export default adminSlice.reducer