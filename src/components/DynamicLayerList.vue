<template>
<hr/>
<h4 class="mb-0"> Model Layers: </h4>
Use the selectors above to add viewable layers to the map for comparison.  
  <div id="layerCards" ref="layerCards" v-if="$store.state.selectedLayerList.length>0">
    <div
      @click="cardSelected(layer,index)"
      v-for="layer, index in $store.state.selectedLayerList"
      :key="index"
      :id="index"
      v-bind:class="{active: (index === selected) ? true : false}"
      class="card"
    >
        {{layer.layerNameFirst}} <br/>
        {{layer.layerNameSecond}} <br/>
        {{layer.layerNameThird}} <br/>

    </div>

  </div>
</template>

<script>

export default {
  name: 'DynamicLayerList',
  components: { },
  data(){
    return {
      selected: 0,
      selectedLayerNum: 0,
      isActive: false,
    }
  },
  computed: {
    //watch for when a new layer is added to make it active
    selectedLayerListLength () {
      return this.$store.state.selectedLayerList.length
    },
  },
  watch: {
    selectedLayerNum: function () {
      console.log('is pickingup')
      if (Number.isInteger(this.selectedLayerNum )){
        console.log('changing to layer number:' + this.selectedLayerNum)
        this.$store.commit('updateVisibleLayer', this.selectedLayerNum)
      }
    },
    selectedLayerListLength: function(){
      //new items are at the top of the list
      this.selected = 0
      //now access its layer num and update here
      this.selectedLayerNum = this.$store.state.selectedLayerList[0].layerNum
    }
  
  },
  methods:{
    cardSelected(layer,index){
      console.log('clicked')
      //console.log('layer: ' + layer)
      //console.log('index:' + index)
      console.log('this.selectedLayerNumBefore: ' + this.selectedLayerNum)
      console.log('changingTo:'  + layer.layerNum)
      this.selectedLayerNum = layer.layerNum
      console.log('this.selectedLayerNumAfter: ' + this.selectedLayerNum)
      this.selected = index
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#layerCards{
  width: 29vw;
  height: 50vh;
  overflow-y: auto;
  overflow-y: auto;
}

.card{
  margin:5px; cursor: default;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.5);
  padding: 10px;
}

.card:hover{
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.5);
}

.active {
  border: 2px solid rgb(77, 77, 255)
 
}
.mb-0{
  margin-bottom: 0px;
}

</style>
