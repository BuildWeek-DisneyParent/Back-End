/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken')

const secrets = require('../config/secrets')

module.exports = (req, res, next) => {
  const token = req.headers.token

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ you: 'shall not pass!' });
      } else {
        req.user = {username: decodedToken.username}
        next()
      }
    })
  } else {
    res.status(400).json({Message: 'You must login to acess this endpoint'})
  }
};
