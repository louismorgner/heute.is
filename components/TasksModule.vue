<template>
    <div class="h-full w-full taskWrapper text-black">
        <h1 class="text-6xl mt-0 mb-12">Tasks</h1>

        <div>
            <div v-for="(task, index) in tasks" :key="index" class="taskItem flex items-center mb-6">
                <input type="checkbox" :checked="task.isDone" class="checkbox checkbox-lg mr-4">
                <span class="text-2xl">{{ task.name }}</span>
            </div>
        </div>

        <div class="mt-8">
            <span class="text-2xl" style="color: #CECECE">Add task...</span>
        </div>

        <h3 class="mt-14 text-2xl mb-5">Inbox</h3>
        <div>
            <div v-for="(item, index) in inbox" :key="index" class="taskItem flex items-center mb-1">
                <span class="text-lg">{{ item }}</span>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  data() {
      return {
        tasks: [
            {
                name: "Call someone",
                isDone: false
            },
            {
                name: "Write report",
                isDone: false
            }
        ],
        inbox: [
            "This is nice",
            "and that as well"
        ]
      }
  },
  methods: {
    startTimer() {
      // Starts timer
      this.$router.push ({name: 'timer', query: {minutes: '25', focusText: this.pomodoroFocus}})
    }
  }
}
</script>
</script>

// https://stackoverflow.com/questions/69941166/how-to-close-daisyui-drawer-menu-with-just-one-click

<style lang="scss" scoped>
.taskWrapper {
    background: #FFF5ED;
    padding: 100px;

    h1, h3 {
        color: #A65D23;
        font-weight: 600;
    }

    input[type="checkbox"] {
        // background: #fff;
        box-shadow: 0px 4px 30px rgb(0 0 0 / 8%);
        border: 1px solid #ddd;
    }
} 
</style>