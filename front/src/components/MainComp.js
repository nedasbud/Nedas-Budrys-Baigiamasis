import React, { useEffect, useState } from 'react'

const MainComp = ({ currentUser, userCard, socket, setUserCard }) => {

  const [index, setIndex] = useState(0);

  const handleLike = () => {
    socket.emit('liked', [currentUser, userCard.username])
    socket.emit('getUser', currentUser)
    setIndex(0)
  }

  const handleSkip = () => {
    socket.emit('skipped', [currentUser, userCard.username])
    socket.emit('getUser', currentUser)
    setIndex(0)
  }

  return (
    <div>
      <div className='UserCard'>
        <h2>username: {userCard.username}</h2>
        <img src={userCard.pictures[index]} alt="" />
        {index < userCard.pictures.length - 1 && <button onClick={() => setIndex(index + 1)}> Next picture</button>}
        {index > 0 && <button onClick={() => setIndex(index - 1)}> Previous picture</button>}
      </div>
      <button onClick={handleLike} className='Like'>Like</button>
      <button onClick={handleSkip} className='Skip'>Skip</button>
    </div>
  )
}

export default MainComp
