import React, { useEffect } from 'react'
import LikeComp from '../components/LikeComp';

const LikesPage = ({ currentUser, socket, matches }) => {

  useEffect(() => {
    const aaa = setInterval(() => {
      socket.emit('getMatches', currentUser)
    }, 200);
    return () => {
      clearInterval(aaa);
    }
  })

  return (
    <div>
      <h2>People that also liked you({matches.length}):</h2>
      <div className='matches'>
        {matches && matches.map((x, i) => <LikeComp key={i} user={x}></LikeComp>)}
      </div>
    </div>
  )
}

export default LikesPage
