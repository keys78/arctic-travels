import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import privateService from './privateService'

const initialState = {
  user: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


// Get user user
export const getUser = createAsyncThunk(
  'private/user',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
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
  'auth/activate2FA',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await privateService.activate2FA(id, token)
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
    reset: (state) => initialState,
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
  },
})

export const { reset } = privateSlice.actions
export default privateSlice.reducer