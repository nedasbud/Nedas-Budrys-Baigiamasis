import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = ({ setLoggedIn, currentUser }) => {

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
      <div className='logo'>
        <img src="https://logos-world.net/wp-content/uploads/2020/09/Tinder-Symbol.png" alt="" />
        <h1>Bimber</h1>
      </div>
      <div className='barRight'>
        {currentUser === '' && <Link className='mainRef' to={'/login'}>Login to find hot partners in your area!</Link>}
        {currentUser !== '' && <div className='innerBar'>
          <h2>Hey, {currentUser}!</h2>
          <div className='navLinks'>
            <Link to={'/profile'}>Configure your profile</Link>
            <Link >Edit your filters</Link>
            <Link to={'/app'}>Discover new people</Link>
            <Link to={'/matches'}>Your matches</Link>
            <button onClick={handleLogout}>Log out</button></div>
        </div>}
      </div>
    </div >
  )
}

export default NavBar
