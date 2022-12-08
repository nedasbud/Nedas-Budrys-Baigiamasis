import React from 'react'
import { Link } from 'react-router-dom'
import RegisterComp from '../components/RegisterComp'

const RegisterPage = () => {
  return (
    <div className='RegisterPage'>
      <RegisterComp></RegisterComp>
      <h2>Already have an account? <Link to={'/login'}>Log in here!</Link></h2>
    </div>
  )
}

export default RegisterPage
