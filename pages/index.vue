<template>
  <div id="rootContainer" class="p-10 h-screen bg-cover bg-center text-white" style="background-image: url('https://images.unsplash.com/photo-1515896769750-31548aa180ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')" >
    <div class="container mx-auto h-full relative z-10">
      <div class="container w-full">
        <div class="grid grid-cols-2">
          <div class="">
            <HeuteIsLogo class="mb-1" />
            <h3>{{ dateString }}</h3>
          </div>
          <div class="text-right">
            <h3 class="text-2xl">{{ time }}</h3>
          </div>
        </div>
      </div>
      <div class="max-w-s w-full absolute top-2/4 left-2/4 transform -translate-y-2/3 -translate-x-1/2 text-center">
        <h1 class="text-6xl">{{ headline }}</h1>
        <div v-if="!showBuildPrompt">
          <button class="btn btn-outline btn-circle btn-xs mt-5" style="color: rgb(255 255 255 / 31%)" @click="toggleBuildPrompt(true)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-4 h-4 stroke-current">   
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>                       
            </svg>
          </button>
        </div>
        <textarea v-if="showBuildPrompt" v-model="buildPrompt" rows="1" placeholder="Today, I will..." class="buildPromptForm mt-8" @keypress="detectBuildPromptChange($event)" @keyup.enter="toggleBuildPrompt(false)" />
        <div class="block text-center pt-5">
          <div v-show="showBuildPromptSubmissionHint" class="badge">Hit 'Enter' to save your daily goal.</div>
        </div>
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
      time: "",
      buildPrompt: "",
      headline: "What will you build today?",
      showBuildPrompt: true,
      showBuildPromptSubmissionHint: false
    }
  },
  computed: {
    yearInPercent() {
      // Returns the progress of the year in rounded percent
      const dayOfYear = Math.floor((Date.now() - Date.parse(new Date().getFullYear().toString())) / 86400000)
      const yearInPercent = dayOfYear / 365

      return Math.round(yearInPercent * 100)
    },
    dateString() {
      const today = new Date();
      const weekDay = today.toLocaleString('en-us', {weekday:'long'});
      const month = today.toLocaleString('en-us', {month:'short'});
      const day = today.toLocaleString('en-us', {day:'numeric'});
      
      // Converts numeric day with approprate suffix
      function ordinal(n) {
          const s = ["th", "st", "nd", "rd"];
          const v = n%100;
          return n + (s[(v-20)%10] || s[v] || s[0]);
      }

      return weekDay + ", " + month + " " + ordinal(day);
    }
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
      if(now.getMinutes() < 10)  {
        this.time = now.getHours() + ":0" + now.getMinutes()
      } else {
        this.time = now.getHours() + ":" + now.getMinutes()
      }
    },
    detectBuildPromptChange() {
      if(this.buildPrompt.length > 3) {
        this.showBuildPromptSubmissionHint = true;
      } else {
        this.showBuildPromptSubmissionHint = false;
      }
    },
    toggleBuildPrompt(isShowing) {
      // Handles the submission of a build prompt
      if(isShowing) {
        this.showBuildPromptSubmissionHint = true;
        this.showBuildPrompt = true;
        this.headline = "What will you build today?";
      } else {
        this.showBuildPromptSubmissionHint = false;
        this.showBuildPrompt = false;
        this.headline = this.buildPrompt;
      }
    }
  },
})
</script>

<style scoped>
progress.progress.progress-primary {
    height: 3px;
    background-color: #ffffff30;
}

textarea.buildPromptForm {
    background: transparent;
    border-bottom: 3px white solid;
    width: 40%;
    font-size: 26px;
    text-align: center;
}

textarea:focus{
    outline: none!important;
    box-shadow: none!important;
}
</style>
