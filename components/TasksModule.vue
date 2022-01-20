<template>
    <div class="h-full w-full taskWrapper text-black" data-theme="light">
        <div>
            <h1 class="text-6xl mt-0 mb-12 inline-block">Tasks</h1>
            <button class="ml-4 cursor-pointer" @click="resetTasksAndInbox">
                    <img src="~/static/img/refresh_icon.svg" alt="" width="10px" height="auto">
            </button>
        </div>

        <div>
            <draggable v-model="tasks" @start="drag=true" @end="drag=false">
                <div v-for="(task) in tasks" :key="task.id" class="taskItem flex items-center mb-6">
                    <input type="checkbox" :checked="task.isDone" class="checkbox checkbox-lg mr-4" :class="{ isDone: task.isDone }" @click="toggleTaskState(task.id)">
                    <span :class="{ isDone: task.isDone, 'text-2xl': true }" >{{ task.name }}</span>
                </div>
            </draggable>
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
            <div v-if="inbox.length > 0">
                <div v-for="(item, index) in inbox" :key="index" class="taskItem flex items-center mb-1">
                <span class="text-lg">{{ item }}</span>
                <button class="ml-5 mr-3 cursor-pointer" @click="turnInboxItemToTask(index)">
                    <img src="~/static/img/green_checkmark.svg" alt="" width="14px">
                </button>
                <button class="cursor-pointer" @click="removeInboxItem(index)">
                    <img src="~/static/img/red_delete.png" alt="" width="10px" height="auto">
                </button>
            </div>
            </div>
            <div v-else>
                <p class="text-slate-500">You can add items to your inbox by pressing the <i>Command + i</i> key.</p>
            </div>
        </div>

    </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
    components: {
            draggable,
    },
  data() {
      return {
        showTaskAddInput: false,
        newTaskText: ""
      }
  },
  computed: {
        tasks: {
            get() {
                return this.$store.state.tasks.tasks
            },
            set(value) {
                this.$store.commit('tasks/updateTaskList', value)
            }
        },
        inbox: {
            get() {
                return this.$store.state.tasks.inbox
            }
        }
    },
    created() {
        this.unsubscribe = this.$store.subscribe(() => {
            this.$store.dispatch("tasks/updateLocalData");
        });
    },
    methods: {
        toggleTaskAddInputVisibility() {
      this.showTaskAddInput = !this.showTaskAddInput;
      if(this.showTaskAddInput === true) {
          // Defer to nextTick so element is visible (small fix)
          this.$nextTick(function(){
            this.$refs.taskInput.focus();
        });
      }
    },
    toggleTaskState(key) {
        this.$store.commit("tasks/toggleTaskState", key);
    },
    addTask() {
        this.$store.commit("tasks/addTask", this.newTaskText);

        this.newTaskText = "";
        this.toggleTaskAddInputVisibility();
    },
    turnInboxItemToTask(index) {
        this.$store.commit("tasks/turnInboxItemToTask", index);
    },  
    removeInboxItem(index) {
        this.$store.commit("tasks/removeInboxItem", index);
    },
    resetTasksAndInbox() {
        this.$store.commit("tasks/resetTasksAndInbox");
    }
  }
}
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