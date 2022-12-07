const express = require('express')
const cors = require('cors')
const app = express()
const socketIo = require('socket.io')
const http = require('http').createServer(app)
const session = require('express-session')
const mongoose = require('mongoose')
const router = require('../routers/mainRouter')
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
app.use(
  session({
    secret: 'tinderisxd',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
  })
)
require('dotenv').config()

http.listen(4000, () => console.log('server is running on port ' + 4000))
app.post('/register', router)
app.post('/login', router)
app.set('socketio', io)

io.on('connect', socket => {
})
