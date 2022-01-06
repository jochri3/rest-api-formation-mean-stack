const User = require('./user.model')
const _ = require('lodash')
const bcrypt = require('bcrypt')




const create = (req, res) => {
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
      .header('x-auth-token', token)
      .send(_.pick(user, ['_id', 'name', 'email']))
  } catch (error) {}
}
