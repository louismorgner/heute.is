export const state = () => ({
  promptToday: '',
  lastPromptUpdate: '',
})

export const mutations = {
  setPrompt(state, text) {
    state.promptToday = text
    state.lastPromptUpdate = new Date().getTime()
  },
}
