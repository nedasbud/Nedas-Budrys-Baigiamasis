import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LikeComp from '../components/LikeComp';

const LikesPage = ({ currentUser, socket, matches }) => {

  const nav = useNavigate()

  useEffect(() => {
    const aaa = setInterval(() => {
      socket.emit('getMatches', currentUser)
    }, 200);
    return () => {
      clearInterval(aaa);
    }
  })

  const handleHistory = () => {
    socket.emit('getHistory', currentUser)
    nav('/history')
  }

  return (
    <div>
      {matches.length > 0 && <h2>People that also liked you({matches.length}):</h2>}
      <div className='matches'>
        {matches.length === 0 && <h3>Seem's like there's no matches yet. Keep on swiping!</h3>}
        {matches && matches.map((x, i) => <LikeComp key={i} user={x}></LikeComp>)}
      </div>
      <button className='historyBtn' onClick={handleHistory}>Want to see the people that you liked? Click here</button>
    </div>
  )
}

export default LikesPage
