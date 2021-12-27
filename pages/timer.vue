<template>
  <div id="timerWrapper" class="bg-black h-screen w-full" data-theme="dark" >
    <div class="max-w-2xl w-full absolute top-2/4 left-2/4 transform -translate-y-2/3 -translate-x-1/2 text-center">
      <div v-if="!isFinished">
        <h1 class="timer text-white mb-o leading-normal">{{ timerString }}</h1>
        <progress class="progress progress-primary max-w-sm mt-0 mb-5 opacity-40" :value="timeLeft" :max="initialTime"></progress> 
        <p class="text-white text-3xl font-light" >{{ focusText }}</p>
      </div>
      <div v-else>
        <div>
          <h3 class="text-3xl mb-10">How satisfies were you with this focus block?</h3>
          <img class="inline-block mx-3 reactionEmoji" src="/img/emojis/very_bad.png" width="50px" @click="rateBlock(1)" />
          <img class="inline-block mx-3 reactionEmoji" src="/img/emojis/bad.png" width="50px" @click="rateBlock(2)" />
          <img class="inline-block mx-3 reactionEmoji" src="/img/emojis/neutral.png" width="50px" @click="rateBlock(3)" />
          <img class="inline-block mx-3 reactionEmoji" src="/img/emojis/good.png" width="50px" @click="rateBlock(4)"  />
          <img class="inline-block mx-3 reactionEmoji" src="/img/emojis/very_good.png" width="50px" @click="rateBlock(5)" />
        </div>
        <nuxt-link to="/" class="btn glass mt-10" >Go back</nuxt-link>    
      </div>
    </div>
    <div class="max-w-2xl w-full absolute bottom-5 text-center left-2/4 transform -translate-x-1/2 flex align-middle justify-center">
      <button class="btn btn-xs btn-outline mr-5 inline-block text-white" @click="cancelTimer">Surrender focus</button>
      <div class="inline-block cursor-pointer" @click="toggleMusic()">
        <div v-if="isMusicPlaying === true">
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-1"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
        </div>
        <div v-else>
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#eee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-x"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
        </div>
      </div>
    </div>
    <div class="gradient-background"></div>
  </div>
</template>

<script>
import {Howl} from 'howler';
import soundFile from "../static/sound/timer_done.mp3";
import lofiFile from "../static/sound/lofi.mp3";

const lofiSound = new Howl({
    src: [lofiFile],
    html5: true,
    loop: true,
});

export default {
  data() {
    return {
      timeLeft: 1000 * 60 * 25,
      initialTime: 1000 * 60 * 25,
      isPaused: false,
      isFinished: false,
      focusText: "Do your best work.",
      howlerIdLofi: undefined,
      isMusicPlaying: true
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

    this.startMusic();

    this.$mixpanel.track("timer_started", {
      duration: this.timerString
    })
  },
  created() {
    const query = this.$route.query;
    if(query.minutes) {
      this.timeLeft = query.minutes * 1000 * 60;
      this.initialTime = query.minutes * 1000 * 60;
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

      this.stopMusic();

      // Finish sound
      const sound = new Howl({
        src: [soundFile],
         volume: 0.5,
      });

      sound.play();

      // Update daily Timer counter
      this.$store.dispatch('timer/setCounter', { increment: true })
    },
    startMusic() {
      if(this.isFinished) return;
      const id = lofiSound.play();
      this.howlerIdLofi = id;
    },
    stopMusic() {
      lofiSound.fade(1, 0, 1000, this.howlerIdLofi);
    },
    rateBlock(rating) {
      // Gathers the rating of this timer block
      this.stopMusic();
      
      this.$router.push({ name: "index"})

      this.$mixpanel.track("timer_rating", {
        rating
      });
    },
    toggleMusic() {
      if(this.isMusicPlaying) {
        this.stopMusic();
        this.isMusicPlaying = false;
      } else {
        this.startMusic();
        this.isMusicPlaying = true;
      }
    },
    cancelTimer() {
      this.stopMusic();

      this.$router.push({ name: "index"})

      this.$mixpanel.track("timer_canceled", {
        intialDuration: this.initialTime,
        canceledAt: this.timeLeft
      });
    }
  }
}
</script>

<style scoped lang="scss">
#timerWrapper {
  // background-image: url("~/static/img/gradient_background.jpg");
  background-size: cover;
  background-position: center;
}

.timer {
  font-size: 10rem;
}

.reactionEmoji {
  transition: all ease-out 0.15s;
  filter: grayscale(80%);

  &:hover {
    transform: scale(1.4);
    filter: grayscale(0%);
  }
}

.gradient-background {
  background: linear-gradient(160deg,#9FADFB, #F4DDD5);
  background-size: 240% 240%;
  animation: gradient-animation 20s ease infinite;
  height: 100%;
  width: 100%;
}

@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>