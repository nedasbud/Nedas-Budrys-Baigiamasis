import React, { useEffect, useState } from 'react'

const MainPage = ({ userCard, setUserCard, socket, currentUser }) => {

  const [index, setIndex] = useState(0);

  const handleLike = () => {
    socket.emit('liked', [currentUser, userCard.username])
    updateUser()
  }

  const handleSkip = () => {
    socket.emit('skipped', [currentUser, userCard.username])
    updateUser()
  }

  const updateUser = () => {
    console.log('updatings')
    setTimeout(() => {
      socket.emit('getUser', currentUser)
    }, 750);
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
      setIndex(0)
    }
    else (setUserCard(null))
  })

  return (
    <div>
      {userCard && <div>
        <div className='UserCard'>
          <h2>username: {userCard.username}</h2>
          <img src={userCard.pictures[index]} alt="" />
          {index < userCard.pictures.length - 1 && <button onClick={() => setIndex(index + 1)}> Next picture</button>}
          {index > 0 && <button onClick={() => setIndex(index - 1)}> Previous picture</button>}
        </div>
        <button onClick={handleLike} className='Like'>Like</button>
        <button onClick={handleSkip} className='Skip'>Skip</button>
      </div>}
      {!userCard && <h2> No more users at the moment  </h2>}
    </div>
  )
}

export default MainPage
