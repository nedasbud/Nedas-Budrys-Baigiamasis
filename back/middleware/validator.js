module.exports = {
  validateRegistration: (req, res, next) => {
    console.log(req.body)
    const { username, password1, password2 } = req.body

    if (username.length <= 3) { return res.send({ error: true, message: 'username should at least be 4 symbols long', data: null }) }

    if (password1 !== password2) return res.send({ error: true, message: 'passwords do not match', data: null })
    if (password1.length < 5 || password1.length > 20) return res.send({ error: true, message: 'password should be from 5 to 20 symbols long', data: null })
    next()
  }
}
