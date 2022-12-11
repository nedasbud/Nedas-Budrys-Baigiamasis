import React, { useEffect, useRef, useState } from 'react'

const MainPage = ({ userCard, setUserCard, socket, currentUser }) => {

  const [index, setIndex] = useState(0);
  const ageRefMin = useRef()
  const ageRefMax = useRef()
  const gRef = useRef()
  const cRef = useRef()
  const [filters, setFilters] = useState({ min: '', max: '', gender: '', city: '' })

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
      socket.emit('getUser', [currentUser, filters])
    }, 100);
    return () => {
      clearInterval(aaa);
    }
  })

  socket.off('getUser').on('getUser', data => {
    // console.log('data ===', data)
    if (data !== 'not found') {
      setUserCard(data)
    }
    else (setUserCard(null))
  })

  const handleFilters = () => {
    if (ageRefMin.current.value !== '') {
      const temp = filters
      temp.min = ageRefMin.current.value
      setFilters(temp)
    }
    if (ageRefMax.current.value !== '') {
      const temp = filters
      temp.max = ageRefMax.current.value
      setFilters(temp)
    }
    if (gRef.current.value !== '') {
      const temp = filters
      temp.gender = gRef.current.value
      setFilters(temp)
    }
    if (cRef.current.value !== '') {
      const temp = filters
      temp.city = cRef.current.value
      setFilters(temp)
    }
  }

  return (
    <div>
      <div className='filters'>
        <input ref={ageRefMin} type='number' min={18} max={100} defaultValue={''} placeholder='Set a minimum user age' />
        <input ref={ageRefMax} type='number' min={18} max={100} defaultValue={''} placeholder='Set a maximum user age' />
        <select ref={gRef} defaultValue={''} name="" id="">
          <option disabled value="">Looking for people of specific gender?</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select defaultValue={''} ref={cRef} name="city" id="city">
          <option disabled value="">Looking for people from a specific city?</option>
          <option value="Kaunas">Kaunas</option>
          <option value="Vilnius">Vilnius</option>
          <option value="Klaipeda">Klaipeda</option>
          <option value="Panevezys">Panevezys</option>
          <option value="Siauliai">Siauliai</option>
        </select>
        <button onClick={handleFilters}>Filter for me!</button>
      </div>
      {userCard && <div className='userCard'>
        <h2>{userCard.username}, a {userCard.age} year old {userCard.gender} from {userCard.city}</h2>
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
