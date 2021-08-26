<template>
  <div  class="q-pa-md q-gutter-sm background" v-if="$store.state.data.supportingLayers" @click.stop @keypress.stop >
    <h6 class="q-mb-none q-mt-none text-primary">  {{$store.state.config.supportingLayersTitle}}</h6>
     <q-input ref="filterRef" outlined dense v-model="filter" label="Begin typing to find a layer">
      <template v-slot:append>
        <q-icon v-if="filter !== ''" name="clear" class="cursor-pointer" @click="resetFilter" />
      </template>
    </q-input>
    <q-tree
      :nodes="$store.state.data.supportingLayers"
      node-key="id"
      tick-strategy="leaf"
      v-model:ticked="ticked"
      :filter = "filter"
    >
    <template v-slot:body-toggle="prop">
    <div class="q-pa-none" style="max-width: 350px">
      <q-list class="">
      <q-expansion-item
        dense
        dense-toggle
        icon="more_horiz"
        label="see more"
        header-class="text-secondary"
      >
        <q-card bordered class="q-pa-sm rounded-borders">
          <div class='row items-center q-pa-sm'>
            <div class="col-1"><q-icon color="primary" name="opacity" size="xs" /></div>
            <div class="col-11 q-pr-xl"><q-slider @change="setTransparency($event, prop.node.id)" :min="0" :max="1" :step=".1" :model-value="1" label /></div>
          </div>
          <div  q-mt-md>
             <p class="text-secondary q-mb-none">{{prop.node.description}} </p>
          </div>
           
        </q-card>
      </q-expansion-item>
      </q-list>
    </div>

  
      
    </template>
    </q-tree>
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
            showDescription: false,
            expanded: false,
            transparency: [1],
        }
    },

  setup () {
    const filter = ref('')
    const filterRef = ref(null)
    return {
      //selected: ref([]),
      ticked: ref([]),
      //expanded: ref([]),
      filter,
      filterRef,
      resetFilter () {
        filter.value = ''
        filterRef.value.focus()
      }
      
    }
  },

  watch: {
      ticked: function(){        
        this.$store.commit('updateSupportingVisibleLayers', this.ticked)
      }
  },
  methods: {
    setTransparency(value,id){
      let layerObj = {value: value, id: id}
      this.$store.commit('updateSupportingLayerVisibleOpacity', layerObj)
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

.esri-widget *:focus-visible, .esri-widget *:focus{
  outline: none;
}
</style>
