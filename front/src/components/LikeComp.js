import React from 'react'

const LikeComp = ({ user }) => {
  return (
    <div>
      <h1>Username: {user.username}</h1>
      <img src={user.pictures[0]} alt="" />

    </div>
  )
}

export default LikeComp
