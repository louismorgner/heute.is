<template>
  <div id="timerWrapper" class="bg-black h-screen w-full">
    <div class="max-w-4xl w-full absolute top-2/4 left-2/4 transform -translate-y-2/3 -translate-x-1/2 text-center">
      <div v-if="!isFinished">
        <h1 class="timer">{{ timerString }}</h1>
        <p>{{ focusText }}</p>
      </div>
      <div v-else>        
        <input type="checkbox" id="st1" value="1">
        <label for="st1"></label> 
        <input type="checkbox" id="st2" value="2" />
        <label for="st2"></label>
        <input type="checkbox" id="st3" value="3" />
        <label for="st3"></label>
        <input type="checkbox" id="st4" value="4" />
        <label for="st4"></label>
        <input type="checkbox" id="st5" value="5" />
        <label for="st5"></label>
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
      });

      sound.play();
    },
    startMusic() {
      const id = lofiSound.play();
      this.howlerIdLofi = id;
    },
    stopMusic() {
      lofiSound.fade(1, 0, 1000, this.howlerIdLofi);
    }
  }
}
</script>

<style scoped>
.timer {
  font-size: 10rem;
}
input {
  border: 0;
  width: 1px;
  height: 1px;
  overflow: hidden;
  position: absolute !important;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  opacity: 0;
}

label {
  position: relative;
  float: right;
  color: #C8C8C8;
}

label:before {
  margin: 5px;
  content: "\f005";
  font-family: FontAwesome;
  display: inline-block;
  font-size: 1.5em;
  color: #ccc;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

input:checked ~ label:before {
  color: #FFC107;
}

label:hover ~ label:before {
  color: #ffdb70;
}

label:hover:before {
  color: #FFC107;
}
</style>