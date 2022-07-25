import React, { useEffect, useState } from 'react'
// import { getUser, resetUser } from '../../features/private/privateSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUnVerifiedUsers, getAllVerifiedUsers, deleteUser, resetUsers } from '../../features/admin/adminSlice'

const ForAdmin = () => {
    const dispatch = useDispatch();
    const { verifiedUsers, unVerifiedUsers, isSuccess, isError, message } = useSelector((state: any) => state.admin)

    useEffect(() => {
        if(!isError && message !== "") {
            alert(message)
        }

        dispatch(getAllVerifiedUsers())
        dispatch(getAllUnVerifiedUsers())

        return () => {
            dispatch(resetUsers())
        };

    }, [ dispatch, message ])

    const renderUnVerified = unVerifiedUsers && unVerifiedUsers.map((val: any) => (
        <div key={val._id}>
            <p>{val.username}</p>
            <p>{val.email}</p>
            <button onClick={() => dispatch(deleteUser(val._id))} className='close'>
                X
            </button>
        </div>
    ))
    const renderVerified = verifiedUsers && verifiedUsers.map((val: any) => (
        <div key={val._id}>
            <p>{val.username}</p>
            <p>{val.email}</p>
            <button onClick={() => dispatch(deleteUser(val._id))} className='close'>
                X
            </button>
        </div>
    ))


    return (
        <div className='data-spec'>
            <div>{renderUnVerified}</div> <br /><br /><br />
            <div>{renderVerified}</div>
        </div>
    )
}

export default ForAdmin