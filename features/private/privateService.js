import axios from 'axios'

const PRIVATE_API_URL = 'http://localhost:4000/private/'


// Get user
const getUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const {data} = await axios.get(PRIVATE_API_URL + 'user', config)

  return data
}

// activate 2FA
const activate2FA = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const {data} = await axios.post(`${PRIVATE_API_URL + `activate2FA/${id}`}`, config)

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
}

export default privateService