const { Router } = require('express')

const router = Router()

// Test route
router.use('/test', async (req, res) => {
  // Remove todays tag from current daily picture

  res.end('Success!')
})

module.exports = router
