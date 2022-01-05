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
router.use('/cron/updateDailyPicture', async (req, res) => {
  // Check auth
  if (process.env.NODE_ENV === 'production') {
    const { authorization } = req.headers

    if (authorization !== `Bearer ${process.env.API_SECRET_KEY}`) {
      res.status(401).json({ success: false })
      return
    }
  }

  // Remove todays tag from current daily picture
  // Get today ->  Paginate(Match(Index("getTodaysFeatureImage"), true))
  const todaysRef = await client
    .query(q.Paginate(q.Match(q.Index('getTodaysFeatureImage'), true)))
    .then((res) => {
      return res.data[0]
    })

  // Get list sorted by lastUsed -> Paginate(Match(Index("featureImage_sort_by_last_used_asc")), { size: 1 })
  const updatedImageRef = await client
    .query(
      q.Paginate(q.Match(q.Index('featureImage_sort_by_last_used_asc')), {
        size: 1,
      })
    )
    .then((res) => {
      return res.data[0][1]
    })

  console.log(updatedImageRef)
  // Update docs here
  try {
    await client.query(
      q.Update(todaysRef, {
        data: {
          isTodaysImage: false,
        },
      })
    )
    console.log('Successfully deleted current todays image')
  } catch (e) {}

  const now = new Date().getTime()

  await client.query(
    q.Update(updatedImageRef, {
      data: {
        isTodaysImage: true,
        lastUsed: now,
      },
    })
  )

  console.log('Successfully updated new todays image')

  res.send('success')
})

module.exports = router
