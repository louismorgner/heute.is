<template>
  <div class="text-white">
    <div class="absolute top-11 left-11 bottom-11 right-11 z-10 flex items-center justify-center">
      <div class="w-full absolute top-0">
        <div class="grid grid-cols-2">
          <div class="">
            <HeuteIsLogo class="mb-1" />
            <h3>{{ dateString }}</h3>
            <!-- button @click="login">Login</button -->
          </div>
          <div class="text-right">
            <h3 class="text-2xl">{{ time }}</h3>
          </div>
        </div>
      </div>
      <!-- div class="max-w-4xl w-full mx-auto text-center" style="margin-top: 25vh"-->
      <div class="max-w-4xl w-full text-center">
        <h1 class="text-6xl font-medium leading-10" style="font-size: 4rem;line-height: 4.2rem;" >{{ headline }}</h1>
        <div v-if="!showBuildPrompt">
          <button class="btn btn-outline btn-circle btn-xs mt-5" style="color: rgb(255 255 255 / 31%)" @click="toggleBuildPrompt(true)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-4 h-4 stroke-current">   
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>                       
            </svg>
          </button>
          <PomodoroTimer class="inline-block ml-3" />
          <span>{{ dailyCounter }}</span>
        </div>
        <textarea v-if="showBuildPrompt" v-model="buildPrompt" rows="1" placeholder="Today, I will..." class="buildPromptForm mt-8" @keypress="detectBuildPromptChange($event)" @keyup.enter="toggleBuildPrompt(false)" />
        <div class="block text-center pt-5">
          <div v-show="showBuildPromptSubmissionHint" class="badge">Hit 'Enter' to save your daily goal.</div>
        </div>
      </div>
      <div class="w-full bottom-0 absolute">
        <div class="grid" style="grid-template-columns: 1fr 3fr 1fr;">
          <NuxtLink to="/about">
            <img src="~/static/icon.png" alt="" width="35px">
          </NuxtLink>
          <div class="flex items-center justify-items-center">
            <span class="block w-full text-center" style="color: #ffffffb0">"{{ dailyQuote.q }}" - {{ dailyQuote.a }}</span>
          </div>
          <div class="text-right">
            <div data-tip="This shows you the progress of the year in percent" class="tooltip tooltip-left">
              <div class="yearProgressWrapper">
                  <span class="">{{ yearInPercent }}%</span>
                  <div class="h-2"></div>
                  <progress class="progress progress-primary absolute left-0 bottom-0" :value="yearInPercent" max="100"></progress> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="sideMenu" class="fixed right-0 left-0 top-0 bottom-0 z-10 drawer drawer-end">

        <input id="my-drawer-4" type="checkbox" class="drawer-toggle"> 
        <div class="sideMenuItemWrapper absolute top-1/2 p-3 drawer-content">
          <label for="my-drawer-4" class="drawer-button">
            <img src="~/static/img/checklist.svg" alt="" width="30px">
          </label>
        </div>

      <div class="drawer-side">
        <label for="my-drawer-4" class="drawer-overlay"></label>
        <div class="w-full h-full grid grid-cols-2">
          <div class="" style="	background-color: rgb(0 0 0 0.2)"></div>
          <TasksModule />
        </div>
      </div>
    </div>

    <div class="w-full h-1/2 absolute top-0 left-0 z-0" style="background: linear-gradient(180deg, #000000c7, transparent);" />
    <div class="w-full h-1/2 absolute bottom-0 left-0 z-0" style="background: linear-gradient(0deg, #000000c7, transparent);" />
  <div id="backgroundLayer" class="p-10 h-full bg-cover bg-center" :style="{'background-image': `url(${(todaysImage)})`}" ></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'DashboardPage',
  layout: 'fullScreen',
  data() {
    return {
      time: "",
      buildPrompt: "",
      headline: "What's the most impactful thing you can accomplish today?",
      showBuildPrompt: true,
      showBuildPromptSubmissionHint: false,
      dailyQuote: {}, // From zenquotes.io
    }
  },
  async fetch(){
    await this.$store.dispatch("config/getTodaysImage"); // Get new background image
    try {
      const quote = await this.$axios.$get("https://zenquotes.io/api/today");
      this.dailyQuote = quote[0];
    } catch (e) {
      console.log(e);
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
    },
    promptToday () {
      return this.$store.state.prompt.promptToday
    },
    lastPromptUpdate () {
      return this.$store.state.prompt.lastPromptUpdate
    },
    ...mapState('timer', ['dailyCounter']),
    ...mapState('config', ['todaysImage']),
  },
  mounted() {
    const self = this;
    self.currentTime()

    // Set interval to update watch
    setInterval(function(){
      self.currentTime()
    }, 1000);

    if(this.$store.getters['prompt/promptExists']) {
      // Show existing prompt
      this.showBuildPromptSubmissionHint = false;
      this.showBuildPrompt = false;
      this.headline = this.$store.state.prompt.promptToday;
    }
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
        this.showBuildPromptSubmissionHint = false;
        this.headline = "What's the most impactful thing you can accomplish today?";
      } else {
        this.showBuildPromptSubmissionHint = false;
        this.showBuildPrompt = false;
        this.$store.dispatch('prompt/setPrompt', this.buildPrompt)
        this.headline = this.buildPrompt;

        this.$mixpanel.track("daily_prompt_answered")
      }
    },
    login() {
      this.$auth.loginWith('auth0')
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

.sideMenuItemWrapper {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding-right: 50px;
  transform: translateX(35px);
}
</style>
