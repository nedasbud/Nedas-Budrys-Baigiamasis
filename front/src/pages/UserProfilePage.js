import React from 'react'
import ProfileComp from '../components/ProfileComp'

const UserProfilePage = ({ userPics, setUserPics, userData, socket }) => {

  return (
    <div>
      {userData && <ProfileComp userPics={userPics} setUserPics={setUserPics} userData={userData[0]} socket={socket}></ProfileComp>}
    </div>
  )
}

export default UserProfilePage
