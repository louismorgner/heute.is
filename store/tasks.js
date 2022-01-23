export const state = () => ({
  tasks: [],
  inbox: [],
  archive: [],
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
    if (newState.archive !== undefined) {
      state.archive = newState.archive
    }
  },
  resetTasksAndInbox(state) {
    state.tasks = []
    state.inbox = []
  },
  addEverythingToArchive(state, items) {
    state.archive = [...state.archive, ...items]
  },
  turnArchiveItemToTask(state, itemIndex) {
    state.tasks = [
      ...state.tasks,
      {
        name: state.archive[itemIndex],
        isdone: false,
        id: '_' + Math.random().toString(36).substr(2, 9),
      },
    ]

    state.archive = state.archive.filter((_item, index) => index !== itemIndex)
  },
  removeArchiveItem(state, itemIndex) {
    state.archive = state.archive.filter((_item, index) => index !== itemIndex)
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
        archive: context.state.archive,
      })
    )
  },
  archiveEverything(context) {
    // Add all items to archive list
    const items = []

    context.state.tasks.forEach((task) => {
      items.push(task.name)
    })

    context.state.inbox.forEach((inboxItem) => {
      items.push(inboxItem)
    })

    context.commit('addEverythingToArchive', items)

    // Remove reset inbox & tasks
    context.commit('resetTasksAndInbox')
  },
}
