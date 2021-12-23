<template>
  <div id="rootContainer" class="p-10 h-screen bg-cover bg-center text-white" style="background-image: url('https://images.unsplash.com/photo-1515896769750-31548aa180ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')" >
    <div class="container mx-auto h-full relative z-10">
      <div class="container w-full">
        <div class="grid grid-cols-2">
          <div class="">
            <HeuteIsLogo class="mb-1" />
            <h3>Monday, Dec 17th</h3>
          </div>
          <div class="text-right">
            <h3 class="text-2xl">{{ time }}</h3>
          </div>
        </div>
      </div>
      <div class="max-w-s w-full absolute top-2/4 left-2/4 transform -translate-y-2/3 -translate-x-1/2 text-center">
        <h1 class="text-6xl">What will you build today?</h1>
      </div>
      <div class="container w-full bottom-1 absolute">
        <div class="grid grid-cols-2">
          <div class="">
            <img src="~/static/img/sloth_icon.png" alt="" width="35px">
          </div>
          <div class="text-right">
            <div data-tip="This shows you the progress of the year in percent" class="tooltip tooltip-left">
              <div class="yearProgressWrapper">
                  <span>{{ yearInPercent }}%</span>
                  <progress class="progress progress-primary" value="70" max="100"></progress> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-1/2 absolute top-0 left-0 z-0" style="background: linear-gradient(180deg, #000000c7, transparent);" />
    <div class="w-full h-1/2 absolute bottom-0 left-0 z-0" style="background: linear-gradient(0deg, #000000c7, transparent);" />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'DashboardPage',
  data() {
    return {
      time: ""
    }
  },
  computed: {
    yearInPercent() {
      // Returns the progress of the year in rounded percent
      const dayOfYear = Math.floor((Date.now() - Date.parse(new Date().getFullYear().toString())) / 86400000)
      const yearInPercent = dayOfYear / 365

      return Math.round(yearInPercent * 100)
    },
  },
  mounted() {
    const self = this;
    self.currentTime()

    // Set interval to update watch
    setInterval(function(){
      self.currentTime()
    }, 1000);
  },
  methods: {
    currentTime() {
      // Sets time to the current time string for watch
      const now = new Date()
      this.time = now.getHours() + ":" + now.getMinutes()
    }
  },
})
</script>

<style scoped>
progress.progress.progress-primary {
    height: 3px;
    background-color: #ffffff30;
}
</style>
