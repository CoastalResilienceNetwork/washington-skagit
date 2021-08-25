<template>
  <q-layout view="lHh lpR lFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
           TNC, WASHINGTON
        </q-toolbar-title>
        <q-toolbar-subtitle>Hydrolic Models for Selected Projects in Skagit Bay
        </q-toolbar-subtitle>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
         <q-page class="q-pa-md row">
         <Panel class="col-4" />
         <Map class="col-8" />  
      </q-page>     
    </q-page-container>
  </q-layout>
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
    this.$store.dispatch('requestSelectorData')
    this.$store.dispatch('requestSupportingLayers')
  }
}
</script>

<style>

</style>
