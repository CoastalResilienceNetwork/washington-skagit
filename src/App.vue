<template>
  <the-header></the-header>
  <div id="panel-map-wrap">
      <the-side-nav></the-side-nav>
      <the-map-toggle></the-map-toggle>
      <the-map></the-map>
  </div>


   <!-- INTRO DIALOG -->
    <q-dialog v-model="introDialog" >
      <q-card style="max-width:800px">
        <q-toolbar>

          <q-toolbar-title class="text-secondary"><span class="text-weight-bold text-primary">SKAGIT BAY,</span> WASHINGTON</q-toolbar-title>
          <q-btn flat round dense color="pirmary" icon="close" v-close-popup />
        </q-toolbar>
         
        <p><q-separator spaced /></p>
        <q-card-section class="text-center items-center">
          <h5 class="q-title text-primary">Hydrolic Models for Selected Projects in Skagit Bay</h5>
           <p>Image?</p>
           <div style="border 2px black;width:200px"> </div>
          ! Need intro content here <br/>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script>
     
import TheMap from './components/TheMap.vue'
import TheHeader from './components/UI/TheHeader.vue'
import TheMapToggle from './components/UI/TheMapToggle.vue'
import TheSideNav from './components/UI/TheSideNav.vue'

export default {
  name: 'App',
  components: {
    TheMap, TheHeader, TheMapToggle, TheSideNav
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
#panel-map-wrap{
    display: flex;
    flex-direction: row;
    height: calc(100vh - 49px);
    width: 100vw;
}
@media screen and (max-width: 700px){
  #panel-map-wrap {
    flex-direction: column-reverse;
    height: calc(94%);
  }
  #side-nav{
    width:100%;
    height: 45%;
   }
   #map-div{
    height:55%;
   }
   .esri-view-width-xsmall .esri-expand--auto .esri-expand__mask--expanded {
    display: none;
   }
  .esri-view-width-xsmall .esri-expand--auto .esri-expand__container--expanded {
    top: 60px;
    height: 45%;
  }
}
</style>
