const express = require('express')

const router = express.Router()
const userSchema = require('../models/User')
router.get('/', (req, res) => { 
  res.status(200).json({
    msg: 'Bienvenu sur le site '
  })
})

module.exports = router