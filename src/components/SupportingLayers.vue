<template>
  <div  class="q-pa-md background" v-if="$store.state.data.supportingLayers">
    <h6 class="q-mb-none q-mt-none text-primary">  {{$store.state.config.supportingLayersTitle}}</h6>
    <q-tree
      :nodes="$store.state.data.supportingLayers"
      node-key="id"
      tick-strategy="leaf"
      v-model:ticked="ticked"
    />
 
  </div>
</template>

<script>
//import esriRequest from "@arcgis/core/request"
import { ref } from 'vue'

export default {
  name: 'SupportingLayers',
  data() {
        return{
            layerList:'',
            activeLayers:[],
       }
    },

  setup () {
    return {
      //selected: ref([]),
      ticked: ref([]),
      //expanded: ref([]),
    }
  },

  watch: {
      ticked: function(){        
        this.$store.commit('updateSupportingVisibleLayers', this.ticked)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.background{
  background-color: white;
  overflow: auto;
  padding: 20px;
  max-height: 500px;
  min-width: 400px;
}


</style>
