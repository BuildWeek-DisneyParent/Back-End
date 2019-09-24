const router = require('express').Router();

const Users = require('./authModel')
const bcrypt = require('bcryptjs')

const secrets = require('../config/secrets')
const jwt = require('jsonwebtoken')

router.post('/register', (req, res) => {
  let user = req.body
  
  if (!user.username || !user.password) {
    res.status(401).json({Message: "Please provide both a username and a password"})
  } else {
    const hash = bcrypt.hashSync(user.password, 12)
    user.password = hash

    Users.add(user)
      .then(user => {
        res.status(201).json(req.body)
      })
      .catch(error => {
        res.status(500).json({Error: 'there was an issue createing the user account in the database'})
      })
  }
});

router.post('/login', (req, res) => {
  let {username, password} = req.body

  Users.findBy({username})
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)
        res.status(200).json({token})
      } else {
        res.status(401).json({Message: "You have either entered the wrong username or password"})
      }
    })
    .catch(error => {
      res.status(500).json({Error: 'there was an issue logging into the account!'})
    })
});

router.delete('/login/:id', (req, res) => {
  const {id} = req.params
  Users.remove(id)
  .then(res => {
      res.status(200).json({message: 'action deleted succesfully'})
  })
  .catch(error => {
      res.status(500).json({error: "The action information could not be removed."})
  })
})

//to create the token
function generateToken(user) {
  const payload = {
    username: user.username
  }
  const options = {
    expiresIn: '1d'
  }
  return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;