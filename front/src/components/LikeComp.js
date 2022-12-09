import React from 'react'

const LikeComp = ({ user }) => {
  return (
    <div className='matchCard'>
      <h1>{user.username}, {user.age}</h1>
      <img src={user.pictures[0]} alt="" />
      <button className='disabled convoBtn'>Start a conversation</button>
    </div>
  )
}

export default LikeComp
