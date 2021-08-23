<template>
  <div style="width: 400px; background-color: white;" class="q-pa-md" v-if="$store.state.supportingLayers">
         {{ticked}}
    <q-tree class="background"
      :nodes="$store.state.supportingLayers"
      node-key="id"
      tick-strategy="leaf"
      v-model:ticked="ticked"
      v-model:expanded="expanded"
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
      selected: ref([]),
      ticked: ref([]),
      expanded: ref([]),
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
}


</style>
