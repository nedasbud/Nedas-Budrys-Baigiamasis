import React, { useEffect, useState } from 'react'
import MainComp from '../components/MainComp';

const MainPage = ({ socket, currentUser }) => {

  const [userCard, setUserCard] = useState(null);
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
    socket.emit('getUser', currentUser)
    socket.on('getUser', data => {
      console.log('data===', data)
      if (data !== 'not found') {
        setUserCard(data)
        setIndex(0)
      }
      else (setUserCard(null))
    })
  }


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
      {/* {userCard && <MainComp currentUser={currentUser} socket={socket} userCard={userCard} setUserCard={setUserCard}></MainComp>} */}
      {!userCard && <h2> No more users at the moment  </h2>}
    </div>
  )
}

export default MainPage
