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
  const { user, isError, message } = useSelector((state: any) => state.auth)
  const { user: userData } = useSelector((state: any) => state.private)


  useEffect(() => {
    if (!user) { router.push('/signin') }
    if (isError) { console.log(message) }

    dispatch(getUser())

    return () => {
      dispatch(resetUser())
    };

  }, [user, router, message, dispatch])




  return user ? (
    <>
      <PrivateNav isPasswordModal={isPasswordModal} setIsPasswordModal={setIsPasswordModal} />
      <UserInfo isPasswordModal={isPasswordModal} setIsPasswordModal={setIsPasswordModal} />
      {userData.role === "admin" && <ForAdmin />}
    </>
  ) : isError
}

export default Dashboard