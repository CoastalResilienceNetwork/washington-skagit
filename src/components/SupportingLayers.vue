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
        <!--div class="q-pa-none">
          <div class="">
            <p class="q-mb-none">{{prop.node.description}} </p>
            <div class="cursor-pointer" style="width: 100px">
              <q-icon color="accent" name="opacity" size="xs" /> Opacity
              <q-popup-edit v-model="label" class="" v-slot="scope">
                <p class="text-secondary q-ma-none">Set Opacity</p>
                <div class="row items-center">
                  <div class="col-2" ><q-icon name="opacity" size="xs" color="primary" /></div>
                  <div class="col-8"><q-slider  v-model="scope.value" @update="setTransparency($event, prop.node.id)" :min="0" :max="1" :step=".1" :model-value="1" label /></div>
                </div>
                <q-input dark color="white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                  <template v-slot:append>
                    <q-icon name="edit" />
                  </template>
                </q-input>
              </q-popup-edit>
            </div>
        </div>
       
      </div-->
    <div class="q-pa-none" style="max-width: 350px">
      <q-list class="">
      <q-expansion-item
        dense
        dense-toggle
        icon="more_horiz"
        label="see more"
        header-class="text-secondary"
      >
        <q-card class="q-pa-sm q-ml-md">
              <p class="q-mb-none">{{prop.node.description}} </p>
          <div class='row items-center q-pa-sm'>
            <div class="col-1"><q-icon color="secondary" name="opacity" size="xs" /></div>
            <div class="col-11 q-pr-xl"><q-slider  color="secondary" snap dense @change="setTransparency($event, prop.node.id)" :min="0" :max="1" :step=".1" :model-value="1" label /></div>
          </div>
          <div  q-mt-md>
         
          </div>
           
        </q-card>
      </q-expansion-item>
      </q-list>
    </div>
    <!--div class="q-pa-none" style="max-width: 350px">
        <p class="q-mb-none">{{prop.node.description}} </p>
          <div class='row items-center q-pa-sm'>
            <div class="col-1"><q-icon color="accent" name="opacity" size="xs" /></div>
            <div class="col-6 q-pr-xl"><q-slider color="accent" snap dense @change="setTransparency($event, prop.node.id)" :min="0" :max="1" :step=".1" :model-value="1" label /></div>
          </div>
     </div-->

  
      
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
      },
       label: ref('Click me'),
      label2: ref('Also click me')
      
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

.q-tree__node-body relative-position{
  padding:0px !important;
}
</style>
