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

//global in order to have access to the maplayer
let esri = { mapLayer: '', supportingMapLayer:''}


export default {
  name: 'Map',
  components: {
    SupportingLayers
  },
  computed: {
    layerSelected(){
      return this.$store.state.visibleLayer
    },
    supportingMapLayers(){
      return this.$store.state.supportingVisibleLayers
    },
    visibleLayerOpacity(){
      return this.$store.state.visibleLayerOpacity
    }
    
  },
  watch:{
    layerSelected() {
      this.updateMap()
    },
    supportingMapLayers(){
      this.updateSupporting()
    },
    visibleLayerOpacity(){
      this.updateOpacity()
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

    //TODO:  move these urls to config file
    esri.mapLayer = new MapImageLayer({
      url: "https://services2.coastalresilience.org/arcgis/rest/services/Washington/Skagit/MapServer",
    })
    esri.supportingMapLayer = new MapImageLayer({
      url: "https://services2.coastalresilience.org/arcgis/rest/services/Washington/Skagit_Supporting/MapServer",
      sublayers: []
    })
 
    map.add(esri.mapLayer)
    map.add(esri.supportingMapLayer)
   
    let supportingLayersExpand = new Expand({
      expandIconClass: "esri-icon-layer-list",  
      view: mapView,
      content: document.getElementById('supportingLayers')
    })

    mapView.ui.add(supportingLayersExpand, "top-right")
  },  

  methods: {
    updateMap(){
      if (this.layerSelected !== 'none' ){
        console.log(this.layerSelected)
        esri.mapLayer.sublayers = [{id: this.layerSelected}] 
      }
      else{
        esri.mapLayer.sublayers = []
      }
    },

    updateSupporting(){
      let sublayers = []
      this.supportingMapLayers.forEach((layer)=>{
        sublayers.push({id:layer, visible:true})
      })

      esri.supportingMapLayer.sublayers = sublayers
    },
    updateOpacity(){
      esri.mapLayer.opacity = this.visibleLayerOpacity
    }
  }     
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://js.arcgis.com/4.20/@arcgis/core/assets/esri/themes/dark/main.css";


</style>
