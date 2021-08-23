<template>
  <q-separator style="margin:16px 0 16px 0" spaced />
  <p class="text-subtitle2 q-mb-none"> Model Layers: </p>
  <div v-if="$store.state.selectedLayerList.length>0">
    <p>Select a layer to view or use the layer controls to remove layers</p>
    <p>Set transparency:</p>
        <q-item-section>
          <q-slider
            v-model="transparency"
            :min="0"
            :max="1"
            :step=".1"
            label
           />
        </q-item-section>
   </div>
  <div class="q-pl-md q-pr-md scroll" style="height: calc(100vh - 460px)" @scroll="scrollHandler">
    <q-card class="q-ma-xs card" bordered  @click="cardSelected(layer,index)"
      v-for="layer, index in $store.state.selectedLayerList"
      :key="index"
      v-bind:class="{active: (index === selected) ? true : false}">
      <q-card-section>
        <div class="row">
          <div class="col-10" >
            {{layer.layerNameFirst}} <br/>
            {{layer.layerNameSecond}} <br/>
            {{layer.layerNameThird}} <br/>
          </div>
          <div class="col-2 text-center">
            <!-- adding .stop to click event prevents parent click event from firing when butn is clicked-->
            <q-btn @click.stop="removeItem(layer,index)" flat round color="red" icon="delete" size="10px" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'DynamicLayerList',
  components: { },
  data(){
    return {
      selected: 0,
      isActive: false,
      transparency: 100
    }
  },
  watch: {
    transparency (){
        this.$store.commit('updateVisibleLayerOpacity', this.transparency)
    }
  },
  methods:{
    cardSelected(layer,index){
      //make the selected item active
      this.selected = index
      //update visible layer on map
      let setLayer = (this.$store.state.selectedLayerList.length > 0) ? layer.layerNum : 'none'
      this.$store.commit('updateVisibleLayer', setLayer)
    },
    removeItem(layer){
      //remove layer from the list
      this.$store.commit('removeLayer', layer.layerNum)
      //set the selected item to the first layer in the list
      this.cardSelected(this.$store.state.selectedLayerList[0], 0)
    
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.card:hover{
  background: rgb(224, 224, 224);
  transition: background-color .3s;
}

.active {
  border: 2px solid #1976D2;
}

</style>
