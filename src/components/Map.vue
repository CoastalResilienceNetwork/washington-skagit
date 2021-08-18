<template>
  <div id="map">
    
    <div id="supportingLayers">
      <SupportingLayers 
        v-if="supportingLayersInfo"
        v-bind:supportingLayers= "supportingLayersInfo"
        v-bind:expand="false"
        v-bind:skipLayers="[1,2]"
        title="Supporting Layers" />
   </div>
  </div>
</template>

<script>
import SupportingLayers from "./SupportingLayers.vue"
import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import MapImageLayer from "@arcgis/core/layers/MapImageLayer"

//in order to have access to the maplayer
let mapLayer = ''
//TODP:  esri global object

export default {
  name: 'Map',
  components: {
    SupportingLayers
  },
  computed: {
    layerSelected () {
      return this.$store.state.visibleLayer
    },
    supportingLayersInfo(){
        console.log(this.$store.state.supportingLayers)
         return this.$store.state.supportingLayers
    },
   
  },
  watch:{
    layerSelected() {
      this.updateMap()
    }
  },
 
  mounted() {
     //select a basemap
    const map = new Map({
      basemap: "streets"
    })

    //create the map view 
    const mapView = new MapView({
      map: map,
      center: [-122.506479,48.370655],
      zoom: 11,
      container: this.$el
    })

    //add layer and show sublayer selected
    mapLayer = new MapImageLayer({
      url: "https://services2.coastalresilience.org/arcgis/rest/services/Washington/Skagit/MapServer",
      sublayers: [],
    });

    map.add(mapLayer)
    
    mapView.ui.add("supportingLayers", "top-right")
  },  

  methods: {
     updateMap(){
        mapLayer.sublayers = []
        mapLayer.sublayers = [{id: this.layerSelected}] 
       }
    }     
 }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://js.arcgis.com/4.20/@arcgis/core/assets/esri/themes/dark/main.css";
div {
  width: 70%;
  height: 100%;
}
#supportingLayers{
  width: 400px;

}
</style>
