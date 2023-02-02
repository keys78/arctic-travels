import axios from 'axios'
// const ADMIN_API_URL = 'http://localhost:4000/private/admin/' //local
// const ADMIN_API_URL = 'https://arctic-travels-api.herokuapp.com/private/admin/' //production
const ADMIN_API_URL = 'https://arctic-travels-api.cyclic.app/private/admin/' //production



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

const getAllUnVerifiedUsers = async (token) => {
  const config = {
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const {data} = await axios.get(`${ADMIN_API_URL + 'all-unverified-users'}`, config)
  return data
}


const deleteUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(`${ADMIN_API_URL + `delete-user/${id}`}`, config)

  return response.data
}

const adminService = {
    getAllVerifiedUsers,
    getAllUnVerifiedUsers,
    deleteUser
}

export default adminService