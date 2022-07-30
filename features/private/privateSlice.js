import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import privateService from './privateService'

const initialState = {
  user: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

const token2 = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('authToken'))

// function myToken(thunkAPI) {
//   const token = thunkAPI.getState().auth.user.token
//   return token
// }

// Get user 
export const getUser = createAsyncThunk(
  'private/user',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token || token2
      return await privateService.getUser(token)
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


// activate 2FA
export const activate2FA = createAsyncThunk(
  'private/activate2FA',
  async (obj, thunkAPI, {}) => {
    try {
      let password = { password: obj.password }
      const token = thunkAPI.getState().auth.user.token || token2
      return await privateService.activate2FA(obj.id, password, token)
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
// deactivate 2FA
export const deActivate2FA = createAsyncThunk(
  'private/deactivate2FA',
  async (obj, thunkAPI, {}) => {
    try {
      let password = { password: obj.password }
      const token = thunkAPI.getState().auth.user.token || token2
      return await privateService.deActivate2FA(obj.id, password, token)
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


export const privateSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(activate2FA.pending, (state) => {
        state.isLoading = true
      })
      .addCase(activate2FA.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user.two_fa_status = action.payload.status
        state.message = action.payload.message
      })
      .addCase(activate2FA.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = true
        state.message = action.payload
      })
      .addCase(deActivate2FA.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deActivate2FA.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = "2FA deactivated successfully"
      })
      .addCase(deActivate2FA.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
      })
  },
})

export const { resetUser } = privateSlice.actions
export default privateSlice.reducer