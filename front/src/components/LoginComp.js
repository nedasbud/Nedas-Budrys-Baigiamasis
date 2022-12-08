import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginComp = ({ setCurrentUser, socket, setLoggedIn }) => {

  const [checked, setChecked] = useState(false);

  const uRef = useRef();
  const pRef = useRef();
  const nav = useNavigate();

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
    if (data.error) { return }
    setLoggedIn(true)
    setCurrentUser(data.data.username)
    socket.emit('getData')
    nav('/profile');
  }

  return (
    <div className='LoginComp'>
      <input ref={uRef} type="text" placeholder='Username' />
      <input ref={pRef} type="text" placeholder='Password' />
      <label htmlFor="check">Stay logged in</label>
      <input type="checkbox" name="check" id="check" value={checked} onChange={changeCheck} />
      <button onClick={loginUser}>Login</button>
    </div>
  )
}

export default LoginComp
