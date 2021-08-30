<template>
   
  <div id="map">
    <!--div id="supportingLayers">
      <SupportingLayers />
   </div-->
    <div id="toolbarDiv" class="">
       <button
        id="distance"
        class="esri-widget--button esri-interactive esri-icon-measure-line esriCustomButton"
        title="Distance Measurement Tool"
        @click="activateLineMeasurement()"
      ></button>
      <button
        id="area"
        class="esri-widget--button esri-interactive esri-icon-measure-area esriCustomButton"
        title="Area Measurement Tool"
        @click="activateAreaMeasurement()"
      ></button>
      <button
        id="clear"
        class="esri-widget--button esri-interactive esri-icon-trash esriCustomButton"
        title="Clear Measurements"
        @click="clearMeasurements()"
      ></button>
    </div>
  </div>
</template>

<script>
//import SupportingLayers from "./SupportingLayers.vue"
import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import MapImageLayer from "@arcgis/core/layers/MapImageLayer"
//import Expand from "@arcgis/core/widgets/Expand"
import Legend from "@arcgis/core/widgets/Legend"
import Measurement from "@arcgis/core/widgets/Measurement"
import Expand from "@arcgis/core/widgets/Expand"
import PortalSource from "@arcgis/core/widgets/BasemapGallery/support/PortalBasemapsSource"
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery"

//global in order to have access to the maplayer
let esri = { mapLayer: '', supportingMapLayer:'', legend: '', map:'', measurement:'', lgExpand:''}


export default {
  name: 'TheMap',
  components: {
    //SupportingLayers
  },
  data() {
    return{
      sublayers: {}, // this item is returned from the store and updated with visibility and opacity in the map component only,
      active: true
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
    esri.map = new Map({
      basemap: "topo"
    })

    //create the map view 
    const mapView = new MapView({
      map: esri.map,
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
      sublayers: [],

    })
 
  
    esri.map.add(esri.supportingMapLayer)
    esri.map.add(esri.mapLayer)
    //
   
    esri.measurement = new Measurement({
    view: mapView,

    });
    mapView.ui.add(esri.measurement, "top-left");

    // create legend widget
    esri.legend = new Legend({
      view: mapView
    });
    // create expand widget to hide and show legend
    esri.lgExpand = new Expand({
      view: mapView,
      content: esri.legend
    })
    // add expand to map
    mapView.ui.add(esri.lgExpand, "bottom-left")
    // show expanded legend
    esri.lgExpand.expand();

    // basemaps
    const allowedBasemapTitles = ["Topographic", "Imagery Hybrid", "Streets"];
    // filtering portal basemaps
    const source = new PortalSource({
      filterFunction: (basemap) => allowedBasemapTitles.indexOf(basemap.portalItem.title) > -1
    });
    // basemap gallery widget
    var basemapGallery = new BasemapGallery({
      view: mapView,
      source: source,
      container: document.createElement("div")
    });
    // expand to hold basemap gallery
    var bgExpand = new Expand({
      view: mapView,
      content: basemapGallery
    });
    // place expand in view
    mapView.ui.add(bgExpand, {
      position: "top-right"
    });
    // close expand when basemap is changed
    esri.map.watch('basemap.title', function(){
      bgExpand.collapse();
    });

    // move zoom controls to top right
    mapView.ui.move([ "zoom" ], "top-right");
  },  

  methods: {
   
    updateMap(){
      // instead of updaing the sublayers of the layer, we want to update the visibility of sublayers.
      // for this line we loop through all the sublayers and turn off each one's visibility
      esri.mapLayer.sublayers.forEach((sl) => {
        sl.visible = false;
      })
      if (this.layerSelected !== 'none' ){
        // now we find the selected sublayer and turn it's visibility to true.
        // this is what the legend widget is looking for so it adds the layers. 
        let layer = esri.mapLayer.findSublayerById(parseInt(this.layerSelected));
        layer.visible = true;
      }
    },

    updateSupportingVisibility(){
      // turn off all sublayers visibility
      esri.supportingMapLayer.sublayers.forEach((sl) => {
        sl.visible = false;
      })
     // turn on all sublayers that are part of supportingMapVisibleLayers object
     this.supportingMapVisibleLayers.forEach((l) => {
       let suplayer = esri.supportingMapLayer.findSublayerById(l);
       suplayer.visible = true;
     })  
    },

    updateOpacity(){
      //update the opacity of the model layers
      esri.mapLayer.opacity = this.visibleLayerOpacity
    },

    updateSupportingOpacity(){
      //find the layer in the list of sublayers and update its opacity
      let i = this.sublayers.findIndex(item => item.id == this.supportingVisibleLayerOpacity.id)
      this.sublayers[i].opacity = this.supportingVisibleLayerOpacity.value
      //push the updated list to the map
      esri.supportingMapLayer.sublayers = this.sublayers
      
    },
    addSupportingLayers(){
      //add all layers to the map with visibility false
      //this method only gets run once when the map is loaded
      esri.supportingMapLayer.sublayers = this.supportingSublayerList
      this.sublayers = this.supportingSublayerList

    },
    activateAreaMeasurement(){
      const distanceButton = document.getElementById("distance");
      const areaButton = document.getElementById("area");
      esri.measurement.activeTool = 'area'
      distanceButton.classList.remove("active")
      areaButton.classList.add("active")
    },
    activateLineMeasurement(){
      const distanceButton = document.getElementById("distance");
      const areaButton = document.getElementById("area");
      esri.measurement.activeTool = 'distance'
      distanceButton.classList.add("active")
      areaButton.classList.remove("active")
    },
     // Clears all measurements
    clearMeasurements() {
      const distanceButton = document.getElementById("distance");
      const areaButton = document.getElementById("area");
      //const clearButton = document.getElementById("clear");
      distanceButton.classList.remove("active")
      areaButton.classList.remove("active")
      esri.measurement.clear();
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

#toolbarDiv {
  position: absolute;
  left: 10px;
  top: 10px;
  display: flex;
  box-shadow: 0 1px 2px rgb(0 0 0 / 30%);
 }
#toolbarDiv button{
  border: unset;
}
#area{
  border-right: solid 1px rgba(110,110,110,0.3) !important;
  border-left: solid 1px rgba(110,110,110,0.3) !important;
}

.esri-widget--button.active,
.esri-widget--button.active:hover,
.esri-widget--button.active:focus {
  cursor: default;
  background-color: lightgrey;
}
.esri-widget--button.active path,
.esri-widget--button.active:hover path,
.esri-widget--button.active:focus path {
  fill: #E4E4E4;
}

</style>
<style>
.esri-legend__service h3{
  line-height: unset;
}
.esri-legend__layer-cell{
  padding-top:0;
  padding-bottom:0;
}
.esri-measurement{
   margin: 40px 0 0 -4px;
}
</style>