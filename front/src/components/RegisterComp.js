import React, { useRef } from 'react'

const RegisterComp = () => {

  const uRef = useRef();
  const p1Ref = useRef();
  const p2Ref = useRef();
  const gRef = useRef();
  const aRef = useRef();
  const cRef = useRef();

  const register = async () => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        username: uRef.current.value,
        password1: p1Ref.current.value,
        password2: p2Ref.current.value,
        gender: gRef.current.value,
        age: aRef.current.value,
        city: cRef.current.value
      }),
      credentials: "include"
    }
    const res = await fetch('http://localhost:4000/register', options)
    const data = await res.json();
    console.log(data);
  }

  return (
    <div className='RegisterComp'>
      <input ref={uRef} type="text" placeholder='Username' />
      <input ref={p1Ref} type="text" placeholder='Password' />
      <input ref={p2Ref} type="text" placeholder='Re-Enter Password' />
      <select ref={gRef} name="gender" id="gender">
        <option disabled selected value="">Your gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <input ref={aRef} type="number" placeholder='Enter your age' />
      <input ref={cRef} type="text" placeholder='Enter your city' />
      <button onClick={register}>Register</button>
    </div>
  )
}

export default RegisterComp
