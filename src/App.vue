<template>
  <q-layout view="hHh lpR fFf">
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
      <q-drawer
        v-model="drawerLeft"
        show-if-above
        :width="400"
        :breakpoint="700"
        elevated
        class=""
      >
        <q-scroll-area class="fit">
          <div class="q-pa-sm">
             <Panel />
          </div>
        </q-scroll-area>
      </q-drawer>

    <q-page-container>
      <Map />  
    </q-page-container>
  <!-- INTRO DIALOG -->
    <q-dialog v-model="introDialog" full-width full-height>
      <q-card>
        <q-toolbar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
          </q-avatar>

          <q-toolbar-title><span class="text-weight-bold">TNC,</span> Washington</q-toolbar-title>
         
         
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
         

        <q-card-section class="text-center items-center">
          <h5 class="q-title text-primary">Hydrolic Models for Selected Projects in Skagit Bay</h5>
           <p>Image?</p>
           <div style="border 2px black;width:200px"> </div>
          ! Need intro content here <br/>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>
      </q-card>
    </q-dialog>
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
  data(){
    return{
      introDialog: true
    }
      
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
