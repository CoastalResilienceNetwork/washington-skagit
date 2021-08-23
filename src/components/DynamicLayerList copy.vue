<template>
<hr/>
<p class="text-subtitle2 mb-0"> Model Layers: </p>
<p v-if="$store.state.selectedLayerList.length>0">Select a layer to view or use the layer controls to remove layers and set transparency</p>
  <div id="layerCards" ref="layerCards" v-if="$store.state.selectedLayerList.length>0">
    <div
      @click="cardSelected(layer,index)"
      v-for="layer, index in $store.state.selectedLayerList"
      :key="index"
      :id="index"
      v-bind:class="{active: (index === selected) ? true : false}"
      class="card"
    >
    <div class="row">
      <div class="column" >
        {{layer.layerNameFirst}} <br/>
        {{layer.layerNameSecond}} <br/>
        {{layer.layerNameThird}} <br/>
      </div>
      <div class="column2">
         <q-btn @click="removeItem(layer,index)" flat round color="red" icon="delete" size="10px" />
      </div>
    </div>
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
        this.$store.commit('updateVisibleLayer', this.selectedLayerNum)
      }
    },
    selectedLayerListLength: function(){
      //new items are at the top of the list
      this.selected = 0
      //now access its layer num and update here
      if (this.$store.state.selectedLayerList.length>0){
        this.selectedLayerNum = this.$store.state.selectedLayerList[0].layerNum
      }
    }
  
  },
  methods:{
    cardSelected(layer,index){
      this.selectedLayerNum = layer.layerNum
      this.selected = index
    },
    removeItem(layer, index){
      console.log(layer, index)
      this.$store.commit('removeLayer', layer.layerNum)
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#layerCards{
  width: 28vw;
  height: 45vh;
  overflow-y: auto;
  overflow-y: auto;
  margin: 10px;
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

.column {
  float: left;
  width: 80%;
}

.column2{
  width: 20%;
  padding-top: 20px;
}

</style>
