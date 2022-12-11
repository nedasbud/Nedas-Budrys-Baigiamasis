module.exports = {
  validateRegistration: (req, res, next) => {
    console.log(req.body)
    const { username, password1, password2, gender, age, city } = req.body
    if (username.length <= 3) { return res.send({ error: true, message: 'username should at least be 4 symbols long', data: null }) }
    if (password1 !== password2) return res.send({ error: true, message: 'passwords do not match', data: null })
    if (password1.length < 5 || password1.length > 20) return res.send({ error: true, message: 'password should be from 5 to 20 symbols long', data: null })
    if (gender !== 'male' && gender !== 'female') return res.send({ error: true, message: 'please select your gender', data: null })
    if (age < 18) return res.send({ error: true, message: 'users age must be 18 or above', data: null })
    if (age > 100) return res.send({ error: true, message: 'max allowed user age is 100', data: null })
    if (city === '') return res.send({ error: true, message: 'you must choose a valid city', data: null })
    next()
  }
}
