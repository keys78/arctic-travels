import axios from 'axios'

const AUTH_API_URL = 'http://localhost:4000/auth/'


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
    localStorage.setItem('authToken', JSON.stringify(data.token))
  }

  console.log(data)
  return data
}


const verify2FA = async (id, userData) => {
  const {data} = await axios.post(`${AUTH_API_URL + `verify2FA/${id}`}`, userData)

  if (data.success === true) {
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
  verify2FA,
  logout,
}
 
export default authService