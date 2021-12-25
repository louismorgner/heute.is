<template>
  <div id="pomodoroTimer">
    <label for="my-modal-2" class="btn btn-sm btn-ghost">Start timer</label> 
    <input id="my-modal-2" type="checkbox"  class="modal-toggle"> 
    <div class="modal">
      <div class="modal-box" @keyup.enter="startTimer">
        <p class="mb-4" >To start a new pomodoro timer, please answer a few questions</p> 
        <input v-model="pomodoroFocus" type="text" placeholder="What will you work on?" class="input input-bordered w-full">
        <div class="modal-action">
          <label for="my-modal-2" class="btn">Don't focus</label>
          <label for="my-modal-2" class="btn btn-primary" @click="startTimer">Start timer</label> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
      return {
        pomodoroFocus: ""
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

<style scoped>
</style>
