// This plugin syncs the vuex store to localStorage
export default (context) => {
  const store = context.store

  store.dispatch('prompt/retrieveLocalPromptData')
  store.dispatch('timer/retrieveLocalData')
  store.dispatch('tasks/retrieveLocalData')
  // store.dispatch('config/retrieveLocalData')
}
