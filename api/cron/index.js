const schedule = require('node-schedule')
const updateDailyPicture = require('./updateDailyPicture')

function scheduleJobs() {
  console.log('Cron jobs initialization starting...')

  schedule.scheduleJob(
    '0,10,20,30,40,50 * * * * *',
    async () => await updateDailyPicture()
  )

  console.log('Cron jobs initialization successful')
}

module.exports = scheduleJobs
