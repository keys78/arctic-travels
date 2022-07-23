import React, { useState, useEffect } from 'react'
import { getUser, resetUser } from '../../features/private/privateSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import PrivateNav from '../../components/PrivateNav'
import UserInfo from './UserInfo'
import ForAdmin from './ForAdmin'



const Dashboard = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [isPasswordModal, setIsPasswordModal] = useState(false)
  const { user } = useSelector((state: any) => state.auth)
  const { user: userData, isLoading, isError, message } = useSelector((state: any) => state.private)


  // useEffect(() => {
  //   if (!user) { router.push('/signin') } 
  //   if (isError) { console.log(message) }

  //   dispatch(getUser())

  //   return () => {
  //     dispatch(resetUser())
  //   };

  // }, [user, router, message])

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user && !user.token) {
      router.push('/signin')
    }

    dispatch(getUser())

    return () => {
      dispatch(resetUser())
    }
  }, [user, router, isError, message, dispatch])

  if (isLoading) {
    return 'LOADING..... ..... ..... '
  }




return user ? (
  <>
    <PrivateNav isPasswordModal={isPasswordModal} setIsPasswordModal={setIsPasswordModal} userData={userData && userData}/>
    <UserInfo isPasswordModal={isPasswordModal} setIsPasswordModal={setIsPasswordModal} userData={userData && userData} />
    {userData.role === "admin" && <ForAdmin />}
  </>
) : isError
}

export default Dashboard