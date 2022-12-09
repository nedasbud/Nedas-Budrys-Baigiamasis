import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = ({ socket, setLoggedIn, currentUser }) => {

  const nav = useNavigate();

  const handleLogout = async () => {
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json"
      },
      credentials: "include"
    }
    fetch('http://localhost:4000/logout', options)
    setLoggedIn(false)
    nav('/login')
    window.location.reload()
  }

  return (
    <div className='NavBar'>
      {currentUser === '' && <Link to={'/login'}>Login to find hot partners in your area!</Link>}
      {currentUser !== '' && <div className='innerBar'>
        <h2>Hey, {currentUser}!</h2>
        <div>
          <Link to={'/profile'}>Configure your profile</Link>
          <Link>Edit your filters</Link>
          <Link to={'/app'}>Discover new people</Link>
          <Link>Your matches</Link>
          <button onClick={handleLogout}>Log out</button></div>
      </div>}
    </div >
  )
}

export default NavBar
