import React, { useState } from 'react'
import { unstable_HistoryRouter } from 'react-router-dom'
import HistoryComp from '../components/HistoryComp'

const HistoryPage = ({ socket }) => {

  const [history, setHistory] = useState(null)

  socket.on('getHistory', data => {
    setHistory(data)
  })

  return (
    <div>
      {!history && <h1>Seems like you have'nt liked anyone yet</h1>}
      {history && <h1>People you have liked so far:</h1>}
      <div className='historyPage'>
        {history && history.map((x, i) => <HistoryComp key={i} card={x}></HistoryComp>)}
      </div>
    </div>
  )
}

export default HistoryPage
