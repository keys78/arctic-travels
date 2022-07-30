import axios from 'axios'

// const AUTH_API_URL = 'http://localhost:4000/auth/' //local
const AUTH_API_URL = 'https://arctic-travels-api.herokuapp.com/auth/'


const register = async (userData) => {
  const response = await axios.post(`${AUTH_API_URL + 'register'}`, userData)
  return response.data.message
} 

const login = async (userData) => {
  const {data} = await axios.post(`${AUTH_API_URL + 'login'}`, userData)
 
  if(data.verified === false) {
    return data.message
  }

  if (data.token) {
    localStorage.setItem('authToken', JSON.stringify(data))
  }
  return data
}

const resendOTP = async (id, userData) => {
  const {data} = await axios.post(`${AUTH_API_URL + `resend-otp/${id}`}`, userData)

  return data
}


const verify2FA = async (id, userData) => {
  const {data} = await axios.post(`${AUTH_API_URL + `verify2FA/${id}`}`, userData)

  if (data.success === true) {
    localStorage.setItem('authToken', JSON.stringify(data.token))
  }
  return data
}


const logout = () => {
  localStorage.removeItem('authToken')
}

const authService = {
  register,
  login,
  verify2FA,
  resendOTP,
  logout,
}
 
export default authService