import axios from 'axios'

const PRIVATE_API_URL = 'http://localhost:4000/private/'
const ADMIN_API_URL = 'http://localhost:4000/private/admin/'


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

// Get all user
const getAllVerifiedUsers = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const {data} = await axios.get(`${ADMIN_API_URL + 'all-verified-users'}`, config)
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

  console.log(data)
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

  console.log(data)
  return data
}

// Delete user goal
// const deleteGoal = async (goalId, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }

//   const response = await axios.delete(API_URL + goalId, config)

//   return response.data
// }

const privateService = {
    getUser,
    activate2FA,
    deActivate2FA,
}

export default privateService