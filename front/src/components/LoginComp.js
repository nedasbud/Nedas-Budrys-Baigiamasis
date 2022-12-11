import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginComp = ({ setCurrentUser, setLoggedIn, socket }) => {

  const [checked, setChecked] = useState(false);

  const uRef = useRef();
  const pRef = useRef();
  const nav = useNavigate();
  const [feedback, setFeedback] = useState('')
  const [isBad, setIsBad] = useState('fdbck good')

  const changeCheck = () => {
    setChecked(!checked);
  }

  const loginUser = async () => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        username: uRef.current.value,
        password: pRef.current.value,
        stayLogged: checked
      }),
      credentials: "include"
    }
    const res = await fetch('http://localhost:4000/login', options)
    const data = await res.json();
    console.log(data);
    if (data.error) {
      setFeedback(data.message)
      setIsBad('fdbck bad')
      return
    }
    setFeedback(data.message)
    setIsBad('fdbck good')
    setLoggedIn(true)
    setCurrentUser(data.data.username)
    socket.emit('getData')
    setTimeout(() => {
      nav('/profile');
    }, 500);
  }

  return (
    <div className='LoginComp'>
      {feedback !== '' && <h2 className={isBad}> {feedback} </h2>}
      <input ref={uRef} type="text" placeholder='Username' />
      <input ref={pRef} type="text" placeholder='Password' />
      <label htmlFor="check">Stay logged in</label>
      <input type="checkbox" name="check" id="check" value={checked} onChange={changeCheck} />
      <button onClick={loginUser}>Login</button>
    </div>
  )
}

export default LoginComp
