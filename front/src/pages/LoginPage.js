import React from 'react'
import { Link } from 'react-router-dom'
import LoginComp from '../components/LoginComp'

const LoginPage = ({ setCurrentUser, setLoggedIn, socket }) => {
  return (
    <div className='LoginPage'>
      <LoginComp setCurrentUser={setCurrentUser} setLoggedIn={setLoggedIn} socket={socket} ></LoginComp>
      <h2>Don't have an account? <Link to={'/register'}>Create one here!</Link> </h2>
    </div>
  )
}

export default LoginPage
