export const state = () => ({
  promptToday: '',
})

export const mutations = {
  setPrompt(state, text) {
    state.promptToday = text
  },
}
