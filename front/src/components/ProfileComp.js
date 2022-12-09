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
    setImgIndex(imgIndex - 1)
    setUserPics(userPics + 1)
  }

  const handleRemoval = () => {
    socket.emit('removingPicture', {
      username: userData.username,
      img: userData.pictures[imgIndex]
    })
    setImgIndex(imgIndex - 1)
    setUserPics(userPics - 1)
  }

  if (!userData) {
    return <div>
      <h1>Authentication error: user is not logged in, try <Link to={'/login'}>logging in again</Link> </h1>
    </div>
  }

  return (
    <div className='ProfilePage'>
      <h1>User: {userData.username} </h1>
      <button onClick={() => socket.emit('getData')}>test dev</button>
      {userPics < 2 && <h2>You must upload atleast 2 pictures before you can see other users</h2>}
      <h2>My pictures ({userData.pictures.length}):</h2>
      <div className='imgBox'>
        {imgIndex > 0 && <button onClick={() => { setImgIndex(imgIndex - 1) }}> Previous </button>}
        <img src={userData.pictures[imgIndex]} alt="" />
        {userData.pictures.length >= 1 && <button onClick={handleRemoval}>Remove this picture</button>}
        {imgIndex < userData.pictures.length - 1 && <button onClick={() => { setImgIndex(imgIndex + 1) }}> Next </button>}
      </div>
      <input ref={picRef} type="text" placeholder='image url' />
      <button onClick={handleUpload}>Upload image</button>
    </div >
  )
}

export default ProfileComp
