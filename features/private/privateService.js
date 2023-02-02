import axios from 'axios'

// const PRIVATE_API_URL = 'http://localhost:4000/private/' //local
// const PRIVATE_API_URL = 'https://arctic-travels-api.herokuapp.com/private/'
const PRIVATE_API_URL = 'https://arctic-travels-api.cyclic.app/private/'


// Get user
const getUser = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const {data} = await axios.get(PRIVATE_API_URL + 'user', config)
  return data
}

// activate 2FA
const activate2FA = async (id, userData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      
    },
  }
  const {data} = await axios.post(`${PRIVATE_API_URL + `activate2FA/${id}`}`, userData, config) 
  return data
}

// deactivate 2FA
const deActivate2FA = async (id, userData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      
    },
  }
  const {data} = await axios.post(`${PRIVATE_API_URL + `deactivate2FA/${id}`}`, userData, config) 

  return data
}

const privateService = {
    getUser,
    activate2FA,
    deActivate2FA
}

export default privateService