import React from 'react'

const HistoryComp = ({ card }) => {
  return (
    <div className='matchCard'>
      <h1>{card.username}, {card.age} from {card.city}</h1>
      <img src={card.pictures[0]} alt="" />
    </div>
  )
}

export default HistoryComp
