const { Router } = require('express')

const router = Router()

const faunadb = require('faunadb')
const q = faunadb.query

const secret = process.env.FAUNA_SECRET_KEY

const client = new faunadb.Client({
  secret,
  domain: 'db.fauna.com',
  // NOTE: Use the correct domain for your database's Region Group.
  port: 443,
  scheme: 'https',
})

// Test route
router.use('/daily', async (req, res) => {
  // Remove todays tag from current daily picture

  // Get today ->  Paginate(Match(Index("getTodaysFeatureImage"), true))
  let temp = await client.query(
    q.Paginate(q.Match(q.Index('getTodaysFeatureImage'), true))
  )

  console.log(temp)

  res.end('Test API!')
})

module.exports = router
