import axios from 'axios'

const AUTH_API_URL = 'http://localhost:4000/auth/'

// // Register user
const register = async (userData) => {
  const response = await axios.post(`${AUTH_API_URL + 'register'}`, userData)
  return response.data.message
}

// Login user
const login = async (userData) => {
  const {data} = await axios.post(`${AUTH_API_URL + 'login'}`, userData)
  if (data) {
    localStorage.setItem('authToken', JSON.stringify(data.token))
  }
  return data
}


// Logout user
const logout = () => {
  localStorage.removeItem('authToken')
}

const authService = {
  register,
  login,
  logout,
//   login,
}
 
export default authService