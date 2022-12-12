const userSchema = require('../schemas/userSchema')

let users = []
setInterval(async () => {
  users = await userSchema.find()
}, 100)

module.exports = io => {
  io.on('connect', socket => {
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
      // console.log(data)
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
      const username = data[0]
      const filters = data[1]
      const user = users.filter((x) => x.username === username)
      let withoutUser = users.filter((x) => x.username !== username)
      // console.log(filters)
      if (filters.min !== '') { withoutUser = withoutUser.filter((x) => x.age >= filters.min) }
      if (filters.max !== '') { withoutUser = withoutUser.filter((x) => x.age <= filters.max) }
      if (filters.gender !== '') { withoutUser = withoutUser.filter((x) => x.gender === filters.gender) }
      if (filters.city !== '') { withoutUser = withoutUser.filter((x) => x.city === filters.city) }
      let seenUsers
      if (user.length > 0) seenUsers = user[0].seen
      else seenUsers = []
      // console.log('seen users', seenUsers)
      const unseen = withoutUser.filter((x) => !seenUsers.includes(x.username))
      // console.log('unseen', unseen)
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

    socket.on('getHistory', data => {
      const username = data
      const user = users.filter((x) => x.username === username)
      const history = users.filter((x) => user[0].likes.includes(x.username))
      socket.emit('getHistory', history)
    })
  })
}
