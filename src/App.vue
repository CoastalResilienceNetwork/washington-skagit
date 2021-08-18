<template>
    <Panel />
    <Map />
</template>

<script>
import Panel from './components/Panel.vue'
import Map from './components/Map.vue'


export default {
  name: 'App',
  components: {
    Map, Panel
  },
  mounted() {
    // create data store for the app
    this.$store.dispatch('requestSelectorInfo')
    this.$store.dispatch('requestSupportingLayers')
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
  
}
</style>
