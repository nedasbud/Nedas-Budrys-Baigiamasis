const bcrypt = require('bcrypt')
const UserSchema = require('../schemas/userSchema')

module.exports = {
  register: async (req, res) => {
    const { username, password1, gender, age, city } = req.body
    const userExists = await UserSchema.findOne({ username })
    if (userExists) return res.send({ error: true, message: 'user already exists', data: null })
    const hashed = await bcrypt.hash(password1, 10)
    const newUser = new UserSchema({ username, password: hashed, gender, age, city, pictures: ['https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png'] })
    await newUser.save()
    res.send({ error: false, message: 'Sekmingai uzsiregsitravote', data: null })
  },
  login: async (req, res) => {
    const { username, password, stayLogged } = req.body
    // console.log(req.body)
    const user = await UserSchema.findOne({ username })
    if (!user) return res.send({ error: true, message: 'user not found', data: null })
    const dehash = await bcrypt.compare(password, user.password)
    if (dehash) {
      if (stayLogged) req.session.username = username
      req.session.stayLogged = stayLogged
      // console.log(req.session)
      return res.send({
        error: false,
        message: 'prisijungta sekmingai',
        data: {
          username
        }
      })
    }
    res.send({ error: true, message: 'wrong credentials', data: null })
  },
  isLogged: async (req, res) => {
    if (req.session.stayLogged === true) {
      return res.send({ error: false, message: 'user is logged in', data: req.session.username })
    }
    if (req.session.stayLogged === false) req.session.destroy()
    res.send({ error: true, message: 'user is not logged in', data: null })
  },
  logout: async (req, res) => {
    req.session.destroy(function () {
      res.send({ msg: 'ok' })
    })
  }
}
