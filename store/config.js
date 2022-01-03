import gql from 'graphql-tag'

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
  async getTodaysImage(context) {
    // Temporary auth fix for now until proper user authentication (with guest role) is implemented
    await this.$apolloHelpers.onLogin(
      'fnAEbvVYTCACU2qOsQcYLL9F5XRr4Rc4KAeqJ-ri'
    )

    const client = this.app.apolloProvider.defaultClient
    const query = gql`
      {
        getTodaysFeatureImage(isTodaysImage: true) {
          url
        }
      }
    `
    const r = await client.query({ query })

    this.featureImage = r.data.getTodaysFeatureImage.url
    context.commit('setImage', { url: this.featureImage })
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
