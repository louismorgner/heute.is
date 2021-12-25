<template>
  <div id="timerWrapper" class="bg-black h-screen w-full">
    <div class="max-w-4xl w-full absolute top-2/4 left-2/4 transform -translate-y-2/3 -translate-x-1/2 text-center">
      <h1 class="timer">{{ timerString }}</h1>
      <p>{{ focusText }}</p>
    </div>
  </div>
</template>

<script>
import soundFile from "../static/sound/timer_done.mp3";

export default {
  data() {
    return {
      timeLeft: 1000 * 60 * 25,
      isPaused: false,
      isFinished: false,
      focusText: "Do your best work."
    }
  },
  computed: {
    timerString() {
      const minutes = Math.floor(this.timeLeft / (60 * 1000));
      const seconds = Math.round((this.timeLeft - minutes * (60 * 1000))/1000);
      
      if(seconds < 10) {
        return minutes + ":0" + seconds;
      }
      return minutes + ":" + seconds;
    }
  },
  mounted() {
    const self = this;

    // Set interval to update watch
    setInterval(function(){
      if(self.isPaused) return;
      
      if(self.timeLeft < 1) {
        self.timerDone();
        return;
      };
      self.timeLeft = self.timeLeft - 1000;
    }, 1000);
  },
  created() {
    const query = this.$route.query;

    if(query.minutes) {
      this.timeLeft = query.minutes * 1000 * 60;
    }
    
    if(query.paused === true) {
      this.isPaused = true;
    }

    if(query.focusText) {
      this.focusText = query.focusText;
    }
  },
  methods: {
    timerDone() {
      this.isPaused = true;
      this.isFinished = true;
      const audio = new Audio(soundFile);
      audio.play();
    }
  }
}
</script>

<style>
.timer {
  font-size: 10rem;
}
</style>