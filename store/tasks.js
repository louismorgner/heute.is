export const state = () => ({
  tasks: [],
  inbox: [''],
})

export const mutations = {
  addTask(state, taskText) {
    state.tasks = [
      ...state.tasks,
      {
        name: taskText,
        isdone: false,
        id: '_' + Math.random().toString(36).substr(2, 9),
      },
    ]
  },
  addInbox(state, itemText) {
    state.inbox = [...state.inbox, itemText]
  },
  toggleTaskState(state, id) {
    state.tasks = state.tasks.map((task) => {
      if (task.id === id) {
        task.isDone = !task.isDone
      }
      return task
    })
  },
  updateTaskList(state, data) {
    state.tasks = data
  },
  turnInboxItemToTask(state, itemIndex) {
    state.tasks = [
      ...state.tasks,
      {
        name: state.inbox[itemIndex],
        isdone: false,
        id: '_' + Math.random().toString(36).substr(2, 9),
      },
    ]

    state.inbox = state.inbox.filter((_item, index) => index !== itemIndex)
  },
  removeInboxItem(state, itemIndex) {
    state.inbox = state.inbox.filter((_item, index) => index !== itemIndex)
  },
  setState(state, newState) {
    state.tasks = newState.tasks
    state.inbox = newState.inbox
  },
  resetTasksAndInbox(state) {
    state.tasks = []
    state.inbox = []
  },
}

export const actions = {
  retrieveLocalData(context) {
    const dataStore = localStorage.getItem('taskData')
    if (!dataStore) {
      return null
    }

    const data = JSON.parse(dataStore)

    context.commit('setState', data)
  },
  updateLocalData(context) {
    localStorage.setItem(
      'taskData',
      JSON.stringify({
        tasks: context.state.tasks,
        inbox: context.state.inbox,
      })
    )
  },
}
