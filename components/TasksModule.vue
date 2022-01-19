<template>
    <div class="h-full w-full taskWrapper text-black">
        <h1 class="text-6xl mt-0 mb-12">Tasks</h1>

        <div>
            <div v-for="(task, index) in tasks" :key="index" class="taskItem flex items-center mb-6">
                <input v-model="task.isDone" type="checkbox" :checked="task.isDone" class="checkbox checkbox-lg mr-4" :class="{ isDone: task.isDone }">
                <span :class="{ isDone: task.isDone, 'text-2xl': true }" >{{ task.name }}</span>
            </div>
        </div>

        <div class="mt-8">
            <span v-show="!showTaskAddInput" class="text-2xl" style="color: #CECECE" @click="toggleTaskAddInputVisibility">Add task...</span>
            <div v-show="showTaskAddInput">
                <input ref="taskInput"  v-model="newTaskText" type="text" placeholder="New task" class="input input-bordered" @keyup.enter="addTask">
                <button class="ml-5 cursor-pointer" @click="addTask">
                    ✅
                </button>
                <button class="ml-4 cursor-pointer" @click="toggleTaskAddInputVisibility">
                    ✖️
                </button>
            </div>
        </div>

        <h3 class="mt-14 text-2xl mb-5">Inbox</h3>
        <div>
            <div v-for="(item, index) in inbox" :key="index" class="taskItem flex items-center mb-1">
                <span class="text-lg">{{ item }}</span>
                <button class="ml-5 mr-3 cursor-pointer" @click="turnInboxItemToTask(index)">
                    <img src="~/static/img/green_checkmark.svg" alt="" width="14px">
                </button>
                <button class="cursor-pointer" @click="removeInboxItem(index)">
                    <img src="~/static/img/red_delete.png" alt="" width="10px" height="auto">
                </button>
            </div>
            <div v-if="inbox.length === 0">
                <p class="text-slate-500">You can add items to your inbox by pressing the 'a' key</p>
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
        ],
        showTaskAddInput: false,
        newTaskText: ""
      }
  },
  methods: {
    toggleTaskAddInputVisibility() {
      this.showTaskAddInput = !this.showTaskAddInput;
      if(this.showTaskAddInput === true) {
          // Defer to nextTick so element is visible
          this.$nextTick(function(){
            this.$refs.taskInput.focus();
        });
      }
    },
    addTask() {
        this.tasks.push({
            name: this.newTaskText,
            isDone: false
        })

        this.newTaskText = "";
        this.toggleTaskAddInputVisibility();
    },
    turnInboxItemToTask(index) {
        this.tasks.push({
            name: this.inbox[index],
            isDone: false
        })
        this.inbox.splice(index, 1)
    },  
    removeInboxItem(index) {
        this.inbox.splice(index, 1)
    }
  }
}
</script>
</script>

// https://stackoverflow.com/questions/69941166/how-to-close-daisyui-drawer-menu-with-just-one-click

<style lang="scss" scoped>
.taskWrapper {
    background: #FFF5ED;
    padding: 80px;

    .isDone {
        opacity: 0.2
    }
    
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