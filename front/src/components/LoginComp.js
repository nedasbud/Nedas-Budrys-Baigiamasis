import React, { useRef } from 'react'

const LoginComp = () => {

  const uRef = useRef();
  const pRef = useRef();

  const loginUser = async () => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        username: uRef.current.value,
        password: pRef.current.value
      }),
      credentials: "include"
    }
    const res = await fetch('http://localhost:4000/login', options)
    const data = await res.json();
    console.log(data);
  }

  return (
    <div className='LoginComp'>
      <input ref={uRef} type="text" placeholder='Username' />
      <input ref={pRef} type="text" placeholder='Password' />
      <button onClick={loginUser}>Login</button>
    </div>
  )
}

export default LoginComp
