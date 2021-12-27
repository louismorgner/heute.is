export const state = () => ({
  todaysImage:
    'https://images.unsplash.com/photo-1515896769750-31548aa180ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
  todaysImageLastUpdated: '',
})

export const mutations = {
  setImage(state, data) {
    state.todaysImage = data.url
    state.todaysImageLastUpdated = data.todaysImageLastUpdated
  },
}

export const actions = {
  async updateTodaysPicture(context) {
    // Unslpash API

    const newImage = await this.$axios.$get(
      'https://api.unsplash.com/photos/ks7q3diIJUw'
    )
    console.log(newImage)
  },
  retrieveLocalData(context) {
    context.dispatch('updateTodaysPicture')
    // Check if a local picture exists in local storage
    const configDataStore = localStorage.getItem('configData')
    if (!configDataStore) {
      return null
    }

    if (!datesAreOnSameDay(context.state.todaysImageLastUpdated, new Date())) {
      // Set new daily picture
      console.log('Do work')
    }

    const configData = JSON.parse(configDataStore)
    context.commit('setImage', {
      url: configData.url,
      todaysImageLastUpdated: configData.todaysImageLastUpdated,
    })
  },
}

// Helper function
const datesAreOnSameDay = (first, second) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate()
