<template>
  <div @scroll="scrollHandler" id="panel">
    <Selectors />
  </div>
</template>

<script>

import Selectors from './Selectors.vue'

export default {
  name: 'ThePanel',
  components: {
    Selectors,

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #panel{
    position: relative;
    height: calc(100% - 2px);
    overflow-y: auto;
    display: block;
    width: 100%;
  }
</style>
