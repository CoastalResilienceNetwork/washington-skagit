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
      <template v-slot:default-header="prop">
        <div class="row items-center" v-if="prop.node.icon" >
          <div class="text-weight-bold text-primary"  >{{ prop.node.label }}</div>
          <q-btn  @click.stop="clickedIcon(prop.node.id)" class="q-ml-sm" padding="none" color="primary" flat icon="info"  />
        </div>
        <div class="row items-center" v-if="!prop.node.icon">
          <div class="">{{ prop.node.label }}</div>
        </div>
      </template>
      
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

  <!--DIALOGS -->
  <q-dialog v-model="showDialog_0">
    <q-card style="max-width:1000px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-primary">Project Concept Areas</div>
        <q-space />
        <q-btn icon="close" color="primary" flat round dense v-close-popup />
      </q-card-section>
      <p><q-separator spaced /></p>
      <q-card-section class="q-ma-lg">
        There were twenty-three restoration concepts for evaluation in the alternative analysis. Three types of projects were assessed: (1)Dike setbacks or removals that restore tidal and riverine inundation and construction of new dikes to protect adjacent lands;(2)Hydraulic projects that change the flow pattern by excavating new channels to distribute flow; and(3)Backwater channels where an existing channel waterward of the dikes is altered to increase backwater flow. Most of these projects were identified and described in the Skagit River Chinook Recovery Plan, some of which include further refinements from later planning processes such as the Puget Sound Nearshore Estuary Restoration Project or individual project sponsor actions. A few projects were pulled from the Skagit River Flood General Investigation or developed by the SHDM Team. Each project concept is identified with its management group from the project results. Blue group: low benefits, low impacts; Green group: moderate benefits,
        low impacts; Yellow group: high benefits, moderate impacts; Orange group: moderate benefits, moderate impacts; Red Group: high benefits, high impacts.
           <div>
              <q-img style="max-width:600px" :src="require('@/assets/tableofIncludedProjects.png')"/>
           </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showDialog_24">
    <q-card>
      
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-primary">Relevant Farm Analysis (ca. 2016)</div>
        <q-space />
        <q-btn icon="close" color="primary" flat round dense v-close-popup />
      </q-card-section>
      <p><q-separator spaced /></p>

      <q-card-section class="q-pt-none">
        <div class="text-left">
          <p class="text-subtitle2 text-primary q-mb-none">Agriculture easements</p>
          <p>
          GIS analysis was used to understand the spatial relationship of project concept footprints to levee and dike features, modeling outputs such as change in water surface elevation and wetted area, and parcel information such as land use zoning, ownership, and agricultural easements. Detailed descriptions of the methods used are in <a href="https://tnc.app.box.com/s/lsnl2br8f1hejgrlziep9tqeowsscc5p" target="_blank">technical report Appendix E.</a> GIS was used to overlay project sites and Skagit County and NRCS farmland protection easements to determine if any projects are on land preserved for farmland. Preference is to avoid land under preservation.
          </p>
        </div>
        <div class="text-left">
          <p class="text-subtitle2 text-primary q-mb-none">Parcels by owner</p>
          <p>
          Farm Objective 4 places a higher priority on project concepts located on public land. Skagit County parcel data was used to determine whether a project concept is located on land that is publicly orprivately owned. Four owner types were used: District, Private, Public, and Water
          </p>
        </div>
        <div class="text-left">
          <p class="text-subtitle2 text-primary q-mb-none">Land Use (Zoning)</p>
          <p>
          In determining potential impacts to Farm interests, Skagit County Comprehensive Plan zoning was used to indicate where there was a history of farming on land that would be converted. Areas zoned AG-NRL or OSRI were considered to have a history of farming.
          </p>
        </div>
     
     </q-card-section>

    </q-card>
  </q-dialog>

  <q-dialog v-model="showDialog_29">
    <q-card>
      
        <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-primary">Elevation: Inform Fish Objv. 2 and 6</div>
        <q-space />
        <q-btn icon="close" color="primary" flat round dense v-close-popup />
      </q-card-section>
      <p><q-separator spaced /></p>

      <q-card-section class="q-pt-none">
       Four Elevation outputs from the Skagit Delta Hydrodynamic Model were used to inform two fish objectives in the ERSA. The two indicators used for these objectives: Fish 2 – Decreases in wetted area during a 2-year flow outside the project concept. Fish 6 – Diversity metric of predicted habitat types within project area based on elevation. (for details see pages 791-2 in the <a href="https://tnc.app.box.com/s/lsnl2br8f1hejgrlziep9tqeowsscc5p" target="_blank"> technical report.)</a>
      </q-card-section>

      </q-card>
  </q-dialog>
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
        expanded: this.$store.state.tree.expanded,
        showDialog_0: false,
        showDialog_24: false,
        showDialog_29: false
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
      this.$store.commit('updateTreeState', {ticked: this.ticked, expanded: this.expanded})
    }
  },
  methods: {
    setTransparency(value,id){
      console.log('set transparency')
      let layerObj = {value: value, id: id}
      this.$store.commit('updateSupportingLayerVisibleOpacity', layerObj)
    },
    clickedIcon(id){
      if(id===0){
        this.showDialog_0 = true
      }
      else if(id===24){
        this.showDialog_24 = true
      }
      else if(id===29){
        this.showDialog_29 = true
      }
    }
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
