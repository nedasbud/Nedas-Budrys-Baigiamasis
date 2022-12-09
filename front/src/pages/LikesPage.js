import React, { useEffect } from 'react'
import LikeComp from '../components/LikeComp';

const LikesPage = ({ currentUser, socket, matches }) => {

  useEffect(() => {
    const aaa = setInterval(() => {
      socket.emit('getMatches', currentUser)
    }, 3000);
    return () => {
      clearInterval(aaa);
    }
  })

  return (
    <div>
      <h2>People that also liked you({matches.length}):</h2>
      {matches && matches.map((x, i) => <LikeComp key={i} user={x}></LikeComp>)}
    </div>
  )
}

export default LikesPage
