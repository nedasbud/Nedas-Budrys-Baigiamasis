const express = require('express')
const cors = require('cors')
const app = express()
const socketIo = require('socket.io')
const http = require('http').createServer(app)
const session = require('express-session')
const mongoose = require('mongoose')
const router = require('../routers/mainRouter')
const userSchema = require('../schemas/userSchema')

require('dotenv').config()
mongoose.connect(process.env.MONGO_KEY)
  .then(() => {
    console.log('Connection has been established')
  }).catch((e) => {
    console.log('Failed to establish connection: ', e)
  })

const io = socketIo(http, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

app.use(cors({ origin: 'http://localhost:3000', credentials: true, methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' }))
app.use(express.json())
app.use(session({
  secret: 'tinderisxd',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))
require('dotenv').config()

http.listen(4000, () => console.log('server is running on port ' + 4000))
app.post('/register', router)
app.post('/login', router)
app.get('/isLogged', router)
app.get('/logout', router)
app.set('socketio', io)

let users = []
setInterval(async () => {
  users = await userSchema.find()
}, 1500)

io.on('connect', socket => {
  console.log('hi')
  const get = async () => {
    const data = await userSchema.find()
    return data
  }

  socket.on('getData', async () => {
    get().then(value => {
      socket.emit('getData', value)
    })
  })

  socket.on('getOne', async (data) => {
    get().then(value => {
      socket.emit('getOne', value.filter((x) => x.username === data))
    })
  })

  socket.on('uploadingPicture', data => {
    console.log(data)
    userSchema.findOneAndUpdate({ username: data.username }, { $push: { pictures: data.newImg } }, function (error) { if (error) { console.log(error) } else console.log('success') })
    get().then(value => {
      socket.emit('getData', value)
    })
  })

  socket.on('removingPicture', data => {
    userSchema.findOneAndUpdate({ username: data.username }, { $pull: { pictures: data.img } }, function (error) { if (error) { console.log(error) } else console.log('success') })
    get().then(value => {
      socket.emit('getData', value)
    })
  })

  socket.on('getUser', data => {
    const username = data
    const user = users.filter((x) => x.username === username)
    const withoutUser = users.filter((x) => x.username !== username)
    let seenUsers
    if (user.length > 0) seenUsers = user[0].seen
    else seenUsers = []
    console.log('seen users', seenUsers)
    const unseen = withoutUser.filter((x) => !seenUsers.includes(x.username))
    console.log('unseen', unseen)
    if (unseen.length === 0) {
      socket.emit('getUser', 'not found')
    } else (socket.emit('getUser', unseen[0]))
  })

  socket.on('liked', data => {
    userSchema.findOneAndUpdate({ username: data[0] }, { $push: { likes: data[1] } }, function (error) { if (error) { console.log(error) } else console.log('success') })
    userSchema.findOneAndUpdate({ username: data[0] }, { $push: { seen: data[1] } }, function (error) { if (error) { console.log(error) } else console.log('success') })
    console.log('ok')
  })

  socket.on('skipped', data => {
    userSchema.findOneAndUpdate({ username: data[0] }, { $push: { seen: data[1] } }, function (error) { if (error) { console.log(error) } else console.log('success') })
  })

  socket.on('getMatches', data => {
    const username = data
    const user = users.filter((x) => x.username === username)[0]
    const usersThatLikeUser = []
    const matches = []
    if (users) {
      users.forEach((user) => {
        for (let i = 0; i < user.likes.length; i++) {
          if (user.likes[i] === username) {
            usersThatLikeUser.push(user.username)
            return
          }
        }
      })
    }
    if (user) {
      for (let i = 0; i < usersThatLikeUser.length; i++) {
        if (user.likes.includes(usersThatLikeUser[i])) { matches.push(usersThatLikeUser[i]) }
      }
    }
    socket.emit('getMatches', users.filter((x) => matches.includes(x.username)))
  })
})
