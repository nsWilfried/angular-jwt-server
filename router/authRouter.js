const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()
const userSchema = require('../models/User')
router.get('/', (req, res) => { 
  res.status(200).json({
    msg: 'Bienvenu sur api '
  })
})
router.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new userSchema({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    })
    user
      .save()
      .then((response) => {
        res.status(200).json({
          message: 'Success',
        })
      })
      .catch((error) => {
        console.log('error', error)
      })
    return user;
  })
})
router.post('/login', (req, res) => {
  let getUser;
  return userSchema
    .findOne({
      email: req.body.email,
    })
    .then((user) => {
      if (!user) {
        return 
      }
      getUser = user
      return bcrypt.compare(req.body.password, user.password)
    }).catch(error => {
      return res.status(401).json({
          message: "Cet email n'existe pas ",
        })
    })
    .then((response) => {
      if (!response) {
        return res.status(401).json({
          message: 'Authentication failed',
        })
      }
      let jwtToken = jwt.sign(
        {
          email: getUser.email,
          userId: getUser._id,
        },
        'longer-secret-is-better',
        {
          expiresIn: '1h',
        },
      )
      res.status(200).json({
        token: jwtToken,
        expiresIn: 3600,
        _id: getUser._id,
        email: getUser.email, 
        username:getUser.username
      })
    })
    .catch((err) => {
      return res.status(401).json({
        message: 'Erreur lors de l\'authentification',
      })
    })
})

module.exports = router