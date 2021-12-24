// This plugin syncs the vuex store to localStorage
export default (context) => {
  const store = context.store

  store.dispatch('prompt/retrieveLocalPromptData')
  /**
  const store = context.store

  // Subscribe to store changes
  store.subscribe((mutations, state) => {
    // Get prompt state from namespaced module
    const promptState = state.prompt

    // Store the state object as a JSON string
    localStorage.setItem('promptState', JSON.stringify(promptState))
  })

  // This is called always on client side and trigger the replacement
  // of the promp store if data exists
  context.app.store.commit('prompt/initialiseStore')
   */
}
