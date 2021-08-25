<template>
<!--couldnt find helper classes for border or height.  Height is needed for scroll.-->
  <div class="q-pr-md" id="panel">
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
