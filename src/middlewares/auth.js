const jwt = require('jsonwebtoken')

const isAuth = (req, res, next) => {
  const token = req.header('x-auth-token')
  if (!token) return res.status(401).json('Access Denied.No token provided')

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json('Invalid token')
  }
}

module.exports = isAuth
