<template>
  <div class="q-pr-md scroll" style="height: calc(100vh - 83px)" @scroll="scrollHandler" id="panel">
    <Selectors />
  </div>
</template>

<script>

import Selectors from './Selectors.vue'

export default {
  name: 'Panel',
  components: {
    Selectors,

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
