<template>
  <div id="panel">
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
div {
  float: left;
  width: 30%;
  height: 100%;
  
}

</style>
