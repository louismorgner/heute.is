<template>
  <div id="timerWrapper" class="bg-black h-screen w-full">
    <div class="max-w-2xl w-full absolute top-2/4 left-2/4 transform -translate-y-2/3 -translate-x-1/2 text-center">
      <div v-if="!isFinished">
        <h1 class="timer">{{ timerString }}</h1>
        <p>{{ focusText }}</p>
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
      isPaused: false,
      isFinished: false,
      focusText: "Do your best work.",
      howlerIdLofi: undefined
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
      this.$router.push({ name: "index"})

      this.$mixpanel.track("timer_rating", {
        rating
      });
    }
  }
}
</script>

<style scoped lang="scss">
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
</style>