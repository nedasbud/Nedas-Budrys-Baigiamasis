import React, { useEffect, useState } from 'react'
import ProfileComp from '../components/ProfileComp'

const UserProfilePage = ({ user, loggedIn, socket, usersData, currentUser }) => {

  const [userData, setUserData] = useState(null)

  useEffect(() => {
    socket.emit('getOne', currentUser)
  }, [currentUser, socket])

  useEffect(() => {
    socket.on('getOne', data => {
      setUserData(data)
    })
  })

  return (
    <div>
      {userData && <ProfileComp userData={userData[0]} socket={socket}></ProfileComp>}
    </div>
  )
}

export default UserProfilePage
