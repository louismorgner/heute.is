const { Router } = require('express')

const router = Router()

const faunadb = require('faunadb')
const q = faunadb.query

const secret = process.env.FAUNADB_SECRET
var endpoint = process.env.FAUNADB_ENDPOINT

// Test route
router.use('/daily', (req, res) => {
  res.end('Test API!')
})

module.exports = router
