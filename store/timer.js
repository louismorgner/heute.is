export const state = () => ({
  dailyCounter: 0,
  lastUpdated: 0,
})

export const mutations = {
  setCounter(state, data) {
    state.dailyCounter = data.dailyCounter
    state.lastUpdated = data.lastUpdated
  },
}

export const actions = {
  setCounter(context, payload) {
    const now = new Date().getTime()

    let updatedDailyCounter
    if (payload.increment) {
      updatedDailyCounter = context.state.dailyCounter + 1
    } else {
      updatedDailyCounter = payload.count
    }

    context.commit('setCounter', {
      dailyCounter: updatedDailyCounter,
      lastUpdated: now,
    })

    // Update local storage
    localStorage.setItem(
      'timerData',
      JSON.stringify({
        dailyCounter: context.state.dailyCounter,
        lastUpdated: now,
      })
    )
  },
  retrieveLocalData(context) {
    const timerDataStore = localStorage.getItem('timerData')
    if (!timerDataStore) {
      return null
    }

    // Get timerData
    const timerData = JSON.parse(timerDataStore)

    // Check if local storage count is outdated
    const lastUpdated = new Date(timerData.lastUpdated)

    if (datesAreOnSameDay(lastUpdated, new Date())) {
      // Retrieve daily count from local storage
      context.dispatch('setCounter', {
        count: timerData.dailyCounter ? timerData.dailyCounter : 0,
      })
    } else {
      // Set daily count to 0
      context.dispatch('setCounter', {
        count: 0,
      })
    }
  },
}

// Helper function
const datesAreOnSameDay = (first, second) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate()
