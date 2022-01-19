export const state = () => ({
  tasks: [],
  inbox: ['test1', 'test 3'],
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

    state.inbox = state.inbox.filter((item, index) => index !== itemIndex)
  },
  removeInboxItem(state, itemIndex) {
    state.inbox = state.inbox.filter((item, index) => index !== itemIndex)
  },
}
