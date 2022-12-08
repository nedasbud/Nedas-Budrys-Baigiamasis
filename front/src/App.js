import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import UserProfilePage from './pages/UserProfilePage';

const socket = io.connect('http://localhost:4000')

function App() {

  const [usersData, setUsersData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState('')

  async function checkIfLogged() {
    const res = await fetch('http://localhost:4000/isLogged', { credentials: "include" })
    const data = await res.json();
    console.log(data);
    if (data.error) {
      console.log('neprisijunges? :)')
      setLoggedIn(false)
      return
    }
    setLoggedIn(true)
    setCurrentUser(data.data)
    socket.emit('getData')
  }

  useEffect(() => {
    if (!loggedIn) checkIfLogged()
  }, [loggedIn])

  useEffect(() => {
    socket.on('getData', data => {
      console.log('atnaujino')
      console.log(data)
      setUsersData(data)
    })
  })


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<RegisterPage></RegisterPage>} />
          <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} socket={socket} setLoggedIn={setLoggedIn}></LoginPage>} />
          <Route path='/profile' element={<UserProfilePage user={usersData.filter((x) => x.username === currentUser)} loggedIn={loggedIn} socket={socket} usersData={usersData} currentUser={currentUser}></UserProfilePage>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
