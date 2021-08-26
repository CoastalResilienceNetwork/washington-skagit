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
  name: 'TheMap',
  components: {
    SupportingLayers
  },
  data() {
    return{
      sublayers: {} // this item is returned from the store and updated with visibility and opacity in the map component
    }
  },
  computed: {
    layerSelected(){
      return this.$store.state.visibleLayer
    },
    supportingMapVisibleLayers(){
      return this.$store.state.supportingVisibleLayers
    },
    visibleLayerOpacity(){
      return this.$store.state.visibleLayerOpacity
    },
    supportingVisibleLayerOpacity(){
      //returns object {value: val, id: id}
      return this.$store.state.supportingVisibleLayerOpacity
    },
    supportingSublayerList(){
       return this.$store.state.data.supportingSublayerList
    }
    
  },
  watch:{
    layerSelected() {
      this.updateMap()
    },
    supportingMapVisibleLayers(){
      this.updateSupportingVisibility()
    },
    visibleLayerOpacity(){
      this.updateOpacity()
    },
    supportingVisibleLayerOpacity(){
      this.updateSupportingOpacity()
    },
    supportingSublayerList(){
      this.addSupportingLayers()
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

    updateSupportingVisibility(){
     this.sublayers.forEach((layer, index) => {
        if (this.supportingMapVisibleLayers.includes(layer.id)){
          this.sublayers[index].visible = true
        }
        else{
           this.sublayers[index].visible = false
        }
      })
     
      //push the updated list to the map
      esri.supportingMapLayer.sublayers = this.sublayers
    },

    updateOpacity(){
      esri.mapLayer.opacity = this.visibleLayerOpacity
    },

    updateSupportingOpacity(){
    
      //find the layer in the list of sublayers and update its opacity
      let i = this.sublayers.findIndex(item => item.id == this.supportingVisibleLayerOpacity.id)
      this.sublayers[i].opacity = this.supportingVisibleLayerOpacity.value
      //ppush the updated list to the map
      esri.supportingMapLayer.sublayers = this.sublayers
      
    },
    addSupportingLayers(){
      //add all layers to the map with visibility false
      esri.supportingMapLayer.sublayers = this.supportingSublayerList
      this.sublayers = this.supportingSublayerList
    }
  }     
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://js.arcgis.com/4.20/@arcgis/core/assets/esri/themes/light/main.css";

#map{
  flex: 1;
  min-height: 40vh;
  width: 100%;
  position: relative;
  border-bottom: #999 solid 1pt;
}
</style>
