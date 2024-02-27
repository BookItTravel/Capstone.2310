const express = require('express')
const router = express.Router()
const Amadeus = require('amadeus')
const amadeus = new Amadeus({
    clientId: '[API Key]',
    clientSecret: '[API Secret]'
})





module.exports = router 