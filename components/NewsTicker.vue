<template>
<div class="scroll text4">
    <div>
      Online <span>Tutorials - </span> Online <span>Tutorials - </span> Online <span>Tutorials - </span> Online <span>Tutorials - </span>
    </div>
    <div>
      Online <span>Tutorials - </span> Online <span>Tutorials - </span> Online <span>Tutorials - </span> Online <span>Tutorials - </span>
    </div>
</div>
</template>

<style lang="scss" scoped>
body {
  font-family: 'Poppins', sans-serif;
  color: #ffffff;
  background-color: #212121;
}

section {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.scroll {
  display: flex;
  width: 100%;
  box-shadow: 0 8px 16px rgba(#000000, 0.5);
  
  div {
    font-weight: 900;
    font-size: 4em;
    text-transform: uppercase;
    white-space: nowrap;
    color: #212121;
    background-color: #fff;
    animation: animate 40s -40s linear infinite;
    will-change: transform;
    
    &:nth-child(2) {
      animation: animate2 40s -20s linear infinite;
    }
  }
  
  span {
    -webkit-text-stroke: 2px #000000;
    color: #ffffff;
  }
}

.text1 {
  transform: rotate(30deg) translate(-200px, 200px);
}

.text2 {
  transform: rotate(-25deg) translate(-200px, 120px);
}

.text3 {
  transform: rotate(25deg) translate(-200px, 300px);
}

.text3 {
  transform: rotate(-2deg) translate(-200px, -150px);
}

.text5 {
  transform: rotate(5deg) translate(-200px, 250px);
}

@keyframes animate {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes animate2 {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-200%);
  }
}
</style>