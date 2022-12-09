import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import UserProfilePage from './pages/UserProfilePage';
import NavBar from './components/NavBar';
import MainPage from './pages/MainPage';
import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentUser, updateLoggedIn, updateUserCard, updateUserData, updateUserPics, updateUsersData } from './store/generalStore';

const socket = io.connect('http://localhost:4000')

function App() {

  // const [usersData, setUsersData] = useState([]);
  // const [loggedIn, setLoggedIn] = useState(false)
  // const [currentUser, setCurrentUser] = useState('')

  const usersData = useSelector(state => state.generalStore.usersData)
  const loggedIn = useSelector(state => state.generalStore.loggedIn)
  const currentUser = useSelector(state => state.generalStore.currentUser)
  const userData = useSelector(state => state.generalStore.userData)
  const userCard = useSelector(state => state.generalStore.userCard)
  const userPics = useSelector(state => state.generalStore.userPics)

  const dispatch = useDispatch();

  const setUsersData = (value) => {
    dispatch(updateUsersData(value))
  }
  const setLoggedIn = (value) => {
    dispatch(updateLoggedIn(value))
  }
  const setCurrentUser = (value) => {
    dispatch(updateCurrentUser(value))
  }
  const setUserData = (value) => {
    dispatch(updateUserData(value))
  }
  const setUserCard = (value) => {
    dispatch(updateUserCard(value))
  }
  const setUserPics = (value) => {
    dispatch(updateUserPics(value))
  }

  if (!loggedIn) checkIfLogged()

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
    socket.emit('getUser', data.data)
  }

  socket.off('getData').on('getData', data => {
    console.log('atnaujino')
    setUsersData(data)
    socket.emit('getOne', currentUser)
  })

  socket.off('getOne').on('getOne', data => {
    console.log('vienas useris => ', data)
    setUserData(data)
    if (loggedIn) setUserPics(data[0].pictures.length)
  })

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar socket={socket} setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} currentUser={currentUser}></NavBar>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<RegisterPage></RegisterPage>} />
          <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} setLoggedIn={setLoggedIn} socket={socket}></LoginPage>} />
          <Route path='/profile' element={<UserProfilePage userPics={userPics} setUserPics={setUserPics} userData={userData} socket={socket} ></UserProfilePage>}></Route>
          {userPics >= 2 && <Route path='/app' element={<MainPage userCard={userCard} setUserCard={setUserCard} socket={socket} currentUser={currentUser}></MainPage>}></Route>}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
