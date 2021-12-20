<template>
  <div id="rootContainer" class="p-10 h-screen relative">
    <div class="container mx-auto">
      <div class="grid grid-cols-2">
        <div class="">
          <HeuteIsLogo />
          <h3>Monday, Dec 17th</h3>
        </div>
        <div class="text-right">
          <h3>4:30</h3>
        </div>
      </div>
    </div>
    <div class="container mx-auto bottom-1 absolute">
      <h1>What will you build today?</h1>
      <div class="yearProgressWrapper">
          <span>95%</span>
      </div>
      <img src="~/static/img/sloth_icon.png" alt="" width="35px">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage'
})
</script>

<style scoped>
#rootContainer {
  background-color: black;
  color: white;
}
</style>
