import React from 'react'
import { Link } from 'react-router-dom'
import LoginComp from '../components/LoginComp'

const LoginPage = ({ setCurrentUser, socket, setLoggedIn }) => {
  return (
    <div className='LoginPage'>
      <LoginComp setCurrentUser={setCurrentUser} socket={socket} setLoggedIn={setLoggedIn} ></LoginComp>
      <h2>Don't have an account? <Link to={'/register'}>Create one here!</Link> </h2>
    </div>
  )
}

export default LoginPage
