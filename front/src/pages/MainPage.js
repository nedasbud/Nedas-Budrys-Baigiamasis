import React, { useEffect, useState } from 'react'

const MainPage = ({ userCard, setUserCard, socket, currentUser }) => {

  const [index, setIndex] = useState(0);

  const handleLike = () => {
    socket.emit('liked', [currentUser, userCard.username])
    setIndex(0)
  }

  const handleSkip = () => {
    socket.emit('skipped', [currentUser, userCard.username])
    setIndex(0)
  }

  useEffect(() => {
    const aaa = setInterval(() => {
      socket.emit('getUser', currentUser)
    }, 500);
    return () => {
      clearInterval(aaa);
    }
  })

  socket.off('getUser').on('getUser', data => {
    console.log('data ===', data)
    if (data !== 'not found') {
      setUserCard(data)
    }
    else (setUserCard(null))
  })

  return (
    <div>
      {userCard && <div className='userCard'>
        <h2>{userCard.username}, a {userCard.age} year old from {userCard.city}</h2>
        <div className='UserCard'>
          {index > 0 && <button onClick={() => setIndex(index - 1)}> Previous picture</button>}
          {index === 0 && <button className='disabled'> Previous picture</button>}
          <img src={userCard.pictures[index]} alt="" />
          {index < userCard.pictures.length - 1 && <button onClick={() => setIndex(index + 1)}> Next picture</button>}
          {index === userCard.pictures.length - 1 && <button className='disabled'>Next picture</button>}
          {index === userCard.pictures.length && <button className='disabled'>Next picture</button>}
        </div>
        <button onClick={handleLike} className='Like'>Like</button>
        <button onClick={handleSkip} className='Skip'>Skip</button>
      </div>}
      {!userCard && <h2> No more users at the moment  </h2>}
    </div>
  )
}

export default MainPage
