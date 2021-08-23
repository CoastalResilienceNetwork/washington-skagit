<template>
  <div id="map">
    <div id="supportingLayers">
      <SupportingLayers />
   </div>
  </div>
</template>

<script>
import SupportingLayers from "./SupportingLayers.vue"
import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import MapImageLayer from "@arcgis/core/layers/MapImageLayer"
import Expand from "@arcgis/core/widgets/Expand";

//in order to have access to the maplayer
let mapLayer = ''
let supportingMapLayer = ''
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
    supportingMapLayers(){
      return this.$store.state.supportingVisibleLayers
    }
 
   
  },
  watch:{
    layerSelected() {
      this.updateMap()
    },
    supportingMapLayers(){
      this.updateSupporting()
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
      //sublayers: [{id:0, visible: true}],
    })
    supportingMapLayer = new MapImageLayer({
      url: "https://services2.coastalresilience.org/arcgis/rest/services/Washington/Skagit_Supporting/MapServer",
      sublayers: []
    })
 
    map.add(mapLayer)
    map.add(supportingMapLayer)

   
    let supportingLayersExpand = new Expand({
      expandIconClass: "esri-icon-layer-list",  // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
      // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
      view: mapView,
      content: document.getElementById('supportingLayers')
    })

    mapView.ui.add(supportingLayersExpand, "top-right")
  },  

  methods: {
    updateMap(){
      mapLayer.sublayers = [{id: this.layerSelected}] 
    },

    updateSupporting(){
      let sublayers = []
      this.supportingMapLayers.forEach((layer)=>{
        sublayers.push({id:layer, visible:true})

      })

      supportingMapLayer.sublayers = sublayers
      
      //[{"id": 4, visible: true},{"id": 3, visible: true},{"id": 2, visible: true},{"id": 0, visible: true}]

    }
  }     
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://js.arcgis.com/4.20/@arcgis/core/assets/esri/themes/dark/main.css";


</style>
