<template>
  <div  class="q-pl-md q-pr-md q-gutter-sm" v-if="$store.state.data.supportingLayers" @click.stop @keypress.stop >
    <p class="text-subtitle2 text-primary q-mb-none"> {{$store.state.config.supportingLayersTitle}}</p>
    <p>Use the search to filter layers or expand the contents to browse</p>
     <q-input ref="filterRef" class="q-mb-md" outlined dense v-model="filter" label="Begin typing to filter layers">
      <template v-slot:append>
        <q-icon v-if="filter !== ''" name="clear" class="cursor-pointer" @click="resetFilter" />
      </template>
    </q-input>
    <q-tree
      :nodes="$store.state.data.supportingLayers"
      node-key="id"
      tick-strategy="leaf"
      v-model:ticked="ticked"
      v-model:expanded="expanded"
      :filter = "filter"
    >
    <template v-slot:body-toggle="prop">
    <div class="q-pa-none" style="max-width: 350px">
      <q-list class="">
      <q-expansion-item
        dense
        dense-toggle
        icon=""
        label=""
        header-class="text-secondary"
        id="expandMore"
      >
        <q-card class="q-ma-none q-pa-none">
          <p class="q-mb-none">{{prop.node.description}} </p>
          <div class='row items-left q-pa-sm'>
            <div class="col-1"><q-icon color="secondary" name="opacity" size="xs" /></div>
            <div class="col-11 q-pr-xl"><q-slider  color="secondary" snap dense @change="setTransparency($event, prop.node.id)" :min="0" :max="1" :step=".1" :model-value="1" label /></div>
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
import { ref } from 'vue'

export default {
  name: 'SupportingLayers',
  data() {
      return{
        layerList:'',
        activeLayers:[],
        showDescription: false,
        ticked: this.$store.state.tree.ticked,
        expanded: this.$store.state.tree.expanded
      }
    },

  setup () {
    //TODO: this is the setup for the filter.  I think this can be moved to data obj.
    const filter = ref('')
    const filterRef = ref(null)
    return {
      filter,
      filterRef,
      resetFilter () {
        filter.value = ''
        filterRef.value.focus()
      },

      
    }
  },

  watch: {
    ticked: function(){        
      this.$store.commit('updateSupportingVisibleLayers', this.ticked) //TODOreplace this with tree obj
      this.$store.commit('updateTreeState', {ticked: this.ticked, expanded: this.expanded})
    }
  },
  methods: {
    setTransparency(value,id){
      let layerObj = {value: value, id: id}
      this.$store.commit('updateSupportingLayerVisibleOpacity', layerObj)
      
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.backgroundMap{
  background-color: white;
  overflow: auto;
  max-height: calc(100vh - 120px);
  min-width: 500px;
}


.esri-widget *:focus-visible, .esri-widget *:focus{
  outline: none;
}
</style>
<style>
.q-tree__node-body{
  padding:0px !important;
  top:-30px;
  margin-bottom: -30px;
  left: 25px;
}


</style>
