const router = require('express').Router();

const Users = require('./authModel')
const bcrypt = require('bcryptjs')

const secrets = require('../config/secrets')
const jwt = require('jsonwebtoken')

router.get("/register", (req, res) => {
  Users.findAll().then(users => {
    res.status(200).json(users);
  });
});

router.post('/register', (req, res) => {
  let { email, password, fullname, username } = req.body
  
  if (email && password && fullname && username) {
  
    const hash = bcrypt.hashSync(password, 12)
    password = hash
  }
  else{
    res.status(401).json({Message: "Please provide username, password, and email"})
  }
    Users.add({ email, password, fullname, username })
      .then(user => {
        res.status(201).json(user)
      })
      .catch(error => {
        res.status(500).json({Error: 'there was an issue createing the user account in the database'})
      })
  }
);
router.get("/login", (req, res) => {
  Users.findAll().then(users => {
    res.status(200).json(users);
  });
  
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