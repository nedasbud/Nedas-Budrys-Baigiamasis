import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';

const ProfileComp = ({ userData, socket }) => {

  const picRef = useRef();
  const [imgIndex, setImgIndex] = useState(0)

  const handleUpload = () => {
    socket.emit('uploadingPicture', {
      newImg: picRef.current.value,
      username: userData.username
    })
  }

  if (!userData) {
    return <div>
      <h1>Authentication error: user is not logged in, try <Link to={'/login'}>logging in again</Link> </h1>
    </div>
  }

  return (
    <div className='ProfilePage'>
      <h1>User: {userData.username} </h1>
      <button onClick={() => console.log(userData)}>test dev</button>
      {userData.pictures.length < 2 && <h2>You must upload atleast 2 pictures before you can see other users</h2>}
      <h2>My pictures ({userData.pictures.length}):</h2>
      <div className='imgBox'>
        {imgIndex > 0 && <button onClick={() => { setImgIndex(imgIndex - 1) }}> Previous </button>}
        <img src={userData.pictures[imgIndex]} alt="" />
        {imgIndex < userData.pictures.length - 1 && <button onClick={() => { setImgIndex(imgIndex + 1) }}> Next </button>}
      </div>
      <input ref={picRef} type="text" placeholder='image url' />
      <button onClick={handleUpload}>Upload image</button>
    </div >
  )
}

export default ProfileComp
