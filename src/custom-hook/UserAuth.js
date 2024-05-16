import React, { useEffect, useState } from 'react'
import { auth,onAuthStateChanged } from '../Firebase/firebaseConfig'
function UserAuth() {
    const [currentUser,setCurrentUser] = useState({})
    useEffect(() => {
        onAuthStateChanged(auth,(user) => {
            if(user){
                setCurrentUser(user)
                const users = localStorage.setItem('user', JSON.stringify(currentUser));
                console.log(user)
            }else if(!user){
                setCurrentUser(null)
            }
        })
       
    }
    )
        
    console.log("user", currentUser)
  return (
    currentUser
    
    

  )
}

export default UserAuth