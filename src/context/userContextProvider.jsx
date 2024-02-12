import React, { useState } from 'react'
import UserContext from './userContext'
import { auth } from "../config/firebaseconfig/firebaseconfig"
import { onAuthStateChanged } from 'firebase/auth'



const UserContextProvider = ({ children }) => {
  let [uid, setUid] = useState("")
  let [isUser, setIsUser] = useState(false)
  let [singleUid, setSingleUid] = useState("")

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userId = user.uid;
      setIsUser(true);
      setUid(userId);
    } else {
      console.log("not a user");
    }
  });

  return (
    <UserContext.Provider value={{ uid: uid, isUser, setIsUser, singleUid, setSingleUid }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider