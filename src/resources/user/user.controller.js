const User = require('./user.model')
const _ = require('lodash')
const bcrypt = require('bcrypt') //TODO : Add this abstraction loguc inside the users model

const auth = async (req, res) => {
  const { body } = req
  let user = await User.findOne({ email: body.email })
  if (!user) return res.status(400).json('email et/ou mot de passe incorrect')
  const validePassword = bcrypt.compare(body.password, user.password)
  if (!validePassword)
    return res.status(400).json('email et/ou mot de passe incorrect')
  const token = user.generateAuthToken()
  res.send(token)
}

const create = async (req, res) => {
  const { body } = req
  try {
    let user = await User.findOne({ email: body.email })
    if (user)
      return res.status(400).json('Un utilisateur avec cet email exist déjà')
    user = new User(_.pick(body, ['name', 'email', 'password']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()

    const token = user.generateAuthToken()
    res
      .header('x-auth-token', token) //this is only done in a the account creatioh
      .send(_.pick(user, ['_id', 'name', 'email']))
  } catch (error) {}
}

// auth middleware
const me = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password')
  res.send(user)
}

module.exports = {
  auth,
  create,
  me,
}
