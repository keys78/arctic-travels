import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'



// Perform localStorage action
const user = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('authToken'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI, {}) => {
    try {
      return await authService.register(user)
    } catch (error) {
      const message =
        error.response.data.error ||
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message
      error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// login user
export const login = createAsyncThunk(
  'auth/login',
  async (user, thunkAPI, {}) => {
    try {
      return await authService.login(user)
    } catch (error) {
      const message =
        error.response.data.error ||
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message
      error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//resend OTP
export const resendOTP = createAsyncThunk(
  'auth/resend-otp',
  async (obj, { }, thunkAPI) => {

    const { id, userData } = obj
    try {
      return await authService.resendOTP(id, userData)
    } catch (error) {
      const message =
        error.response.data.error ||
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message
      error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// verify 2FA
export const verify2FA = createAsyncThunk(
  '/verify2FA',
  async (obj, { }, thunkAPI) => {
    try {
      return await authService.verify2FA(obj.id, obj.otp)
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

export const logout = createAsyncThunk('auth/logout', () => {
  authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.user = action.payload
        // state.isError = true
        // state.message = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = "login successful"
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(verify2FA.pending, (state) => {
        state.isLoading = true
      })
      .addCase(verify2FA.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(verify2FA.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = 'invalid token'
      })
      .addCase(resendOTP.pending, (state) => {
        state.isLoading = true
      })
      .addCase(resendOTP.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = "unable to resend token"
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer