export const state = () => ({
  promptToday: '',
  lastPromptUpdate: '',
})

export const mutations = {
  setPrompt(state, data) {
    state.promptToday = data.text
    state.lastPromptUpdate = data.timeUpdated
  },
}

export const getters = {
  promptExists: (state) => {
    const lastUpdated = new Date(state.lastPromptUpdate)

    if (datesAreOnSameDay(lastUpdated, new Date())) {
      return state.promptToday
    } else {
      return false
    }
  },
}

export const actions = {
  setPrompt(context, text) {
    const now = new Date().getTime()
    context.commit('setPrompt', { text, timeUpdated: now })

    localStorage.setItem(
      'promptData',
      JSON.stringify({
        text,
        timeUpdated: now,
      })
    )
  },
  retrieveLocalPromptData(context) {
    const promptDataStore = localStorage.getItem('promptData')
    if (!promptDataStore) {
      return null
    }

    const promptData = JSON.parse(promptDataStore)
    context.commit('setPrompt', {
      text: promptData.text,
      timeUpdated: promptData.timeUpdated,
    })
  },
}

// Helper function
const datesAreOnSameDay = (first, second) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate()
