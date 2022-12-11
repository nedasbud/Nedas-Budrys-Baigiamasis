import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const RegisterComp = () => {

  const uRef = useRef();
  const p1Ref = useRef();
  const p2Ref = useRef();
  const gRef = useRef();
  const aRef = useRef();
  const cRef = useRef();

  const [feedback, setFeedback] = useState('')
  const [isBad, setIsBad] = useState('fdbck good')
  const nav = useNavigate()

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
    if (data.error) {
      setFeedback(data.message)
      setIsBad('fdbck bad')
      return
    }
    setFeedback(data.message)
    setIsBad('fdbck good')
    setTimeout(() => {
      nav('/login')
    }, 1500);
  }


  return (
    <div className='RegisterComp'>
      {feedback !== '' && <h2 className={isBad}> {feedback} </h2>}
      <input ref={uRef} type="text" placeholder='Username' />
      <input ref={p1Ref} type="text" placeholder='Password' />
      <input ref={p2Ref} type="text" placeholder='Re-Enter Password' />
      <select defaultValue={''} ref={gRef} name="gender" id="gender">
        <option disabled value="">Your gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input ref={aRef} type="number" placeholder='Enter your age' />
      <select defaultValue={''} ref={cRef} name="city" id="city">
        <option disabled value="">Choose nearest city</option>
        <option value="Kaunas">Kaunas</option>
        <option value="Vilnius">Vilnius</option>
        <option value="Klaipeda">Klaipeda</option>
        <option value="Panevezys">Panevezys</option>
        <option value="Siauliai">Siauliai</option>
      </select>
      <button onClick={register}>Register</button>
    </div >
  )
}

export default RegisterComp
