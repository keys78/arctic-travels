import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUnVerifiedUsers, getAllVerifiedUsers, deleteUser, resetUsers } from '../../features/admin/adminSlice'
import Tabs from '../../components/Tabs'
import Tab from '../../components/CustomTabs/Tab'

type TabsType = {
    label: string;
    index: number;
    Component: React.FC<{}>;
  }[];

const ForAdmin = () => {
    const dispatch = useDispatch();
    const { verifiedUsers, unVerifiedUsers, isSuccess, isError, message } = useSelector((state: any) => state.admin)

    useEffect(() => {
        if (!isError && message !== "") {
            alert(message)
        }

        dispatch(getAllVerifiedUsers())
        dispatch(getAllUnVerifiedUsers())

        return () => {
            dispatch(resetUsers())
        };

    }, [dispatch, message])


      
      // Tabs Array
      const tabs: TabsType = [
        {
          label: "Tab One",
          index: 1,
          Component: 'hello'
        },
        {
          label: "Tab Two",
          index: 2,
          Component: "hello 2222"
        },
        {
          label: "Tab Three",
          index: 3,
          Component: "hello 333"
        }
      ];

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
            {/* <div>{renderUnVerified}</div> <br /><br /><br /> */}
            {/* <div>{renderVerified}</div> */}

            <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={tabs} />
        </div>
    )
}

export default ForAdmin