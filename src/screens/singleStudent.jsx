import React, { useContext } from 'react'
import UserContext from '../context/userContext';

const SingleStudent = () => {
  let { uid, isUser, setIsUser,singleUid,setSingleUid } = useContext(UserContext);
  console.log(singleUid);
  return (
    <div>SingleStudent</div>
  )
}

export default SingleStudent