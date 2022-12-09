import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';

const ProfileComp = ({ userPics, setUserPics, userData, socket }) => {

  const picRef = useRef();
  const [imgIndex, setImgIndex] = useState(0)

  const handleUpload = () => {
    socket.emit('uploadingPicture', {
      newImg: picRef.current.value,
      username: userData.username
    })
    setUserPics(userPics + 1)
    setImgIndex(userData.pictures.length)
    picRef.current.value = ''
  }

  const handleRemoval = () => {
    socket.emit('removingPicture', {
      username: userData.username,
      img: userData.pictures[imgIndex]
    })
    setUserPics(userPics - 1)
    setImgIndex(0)
  }

  if (!userData) {
    return <div>
      <h1>Authentication error: user is not logged in, try <Link to={'/login'}>logging in again</Link> </h1>
    </div>
  }

  return (
    <div className='ProfilePage'>
      <div className='userInfo'>
        <h2>Your information:</h2>
        <h1>{userData.username}</h1>
        <h3>{userData.gender}</h3>
        <h2>{userData.age} from {userData.city}</h2>
      </div>
      <div className='userCard'>
        {userPics < 2 && <h2 style={{ color: 'red' }}>You must upload atleast 2 pictures before you can see other users</h2>}
        <h2>My pictures ({userData.pictures.length}):</h2>
        <div className='UserCard'>
          {imgIndex > 0 && <button onClick={() => { setImgIndex(imgIndex - 1) }}>Previous picture</button>}
          {imgIndex === 0 && <button className='disabled'>Previous picture</button>}
          <img src={userData.pictures[imgIndex]} alt="" />

          {imgIndex < userData.pictures.length - 1 && <button onClick={() => { setImgIndex(imgIndex + 1) }}>Next picture</button>}
          {imgIndex === userData.pictures.length - 1 && <button className='disabled'>Next picture</button>}
          {imgIndex === userData.pictures.length && <button className='disabled'>Next picture</button>}
        </div>
        <div className='bottomUtils'>
          {userData.pictures.length >= 1 && <button onClick={handleRemoval}>Remove this picture</button>}
          <div>
            <input ref={picRef} type="text" placeholder='image url' />
            <button onClick={handleUpload}>Upload image</button>
          </div>
        </div>
      </div>
    </div >
  )
}

export default ProfileComp
