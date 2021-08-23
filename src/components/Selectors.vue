<template>
  <div class="q-ma-md">
    <p class="text-subtitle2 q-mb-none"> Model Selectors: </p>
    <p>Use the selectors to add viewable layers to the map for comparison </p>
    <!--for the first select we are looping through the list of objects in the store and displaying the 'first' attribute. 
    the selected value is stored in v-model so on the change event we build the second list from the first selected value-->
    <div class='q-pl-md q-pr-md'>
     <!--div class="center">
        <p class="text-subtitle2 headers"> Simulation Name </p>&nbsp;
        <q-btn @click="dialogDisplay1=true" flat round color="primary" icon="info" size="10px" />
     </div-->
     <!-- DIALOG  
    <Dialog style="width:65%" v-model:visible="dialogDisplay1" >
      <template #header>
        <h4>Simulation Name</h4>
      </template>
      Eleven simulations and a baseline were run to model hydraulic impacts of implementing particular projects and project combinations. The baseline represents existing conditions without new project implementation around 2015. 
      <ul>
        <li>Simulation 1: Small Projects, which included these projects: SF Levee Setbacks 2, 3, 4 (dike setback; 55 acres), McGlinn Causeway (hydraulic; 5.8 acres), TNC South Fork (backwater channel; 1.2 acres), Cottonwood Island (hydraulic; 14 acres), East Cottonwood (backwater channel; 3 acres), Pleasant Ridge South (dike setback; 28 acres), Hall Slough (dike setback; 135 acres), Fir Island Farm (dike setback; 138 acres), Telegraph Slough Full (dike setback/hydraulic; 538 acres), Sullivan Hacienda (dike setback; 207 acres), and Rawlins Road Distributary Channel (hydraulic; 5 acres). 
        </li>
        <li>Simulation 2: Fir Island Cross Island Connector, a major hydraulic project covering 151 acres. 
        </li>
        <li>Simulation 3: Avon-Swinomish Bypass, a major hydraulic project covering 1297 acres. 
        </li>
        <li>Simulation 4: NF Left Bank Levee Setback C, a major dike setback project covering 279 acres. 
        </li>
        <li>Simulation 5: NF Left Bank Levee Setback A, a major dike setback project covering 284 acres. 
        </li>
        <li>Simulation 6: Moderate Influence Projects-Group 1, which included these projects: NF Right Bank Levee Setback (dike setback; 86 acres), Milltown Island (dike breach; 212 acres), Telegraph Slough 1 (dike setback; 188), and Thein Farm (levee setback; 75 acres). 
        </li>
        <li>Simulation 7: Moderate Influence Projects-Group 2, including these projects: Deepwater Slough Phase 2 (dike removal; 265 acres), Rawlins Road (dike setback; 192 acres), and Telegraph Slough 1&amp;2 (dike setback; 305 acres).
        </li>
        <li>Simulation 8: Selected Projects, selecting all projects except Avon-Swin Bypass and NF Left Bank Levee Setback A. 
        </li>
        <li>Simulation 9: Climate Change without projects, representing a climate change scenario with no new project implementation.
        </li>
        <li>Simulation 10: Climate Change with selected projects, representing a climate change scenario selecting all projects except Avon-Swin Bypass and NF Left Bank Levee Setback A.
        </li>
      </ul>
    </Dialog> -->
    <p class="text-caption text-red q-mt-sm q-mb-none" v-if="!selected1">Select a simulation</p>
     <q-select outlined id="select1" class="q-pa-xs" label="Simulation Name" v-model="selected1" 
     :options="$store.state.selectorInfo" dense options-dense></q-select>

    <!--for the second select, we iterate through second, and build the third list from the second selected item  -->

    <!--div class="center">
      <p class="text-subtitle2 headers"> Flow (cfs) &amp; Tide (ft)</p>
      <q-btn @click="dialogDisplay1=true" flat round color="primary" icon="info" size="10px" />
    </div-->
        <!-- DIALOG 
    <Dialog style="width:65%" v-model:visible="dialogDisplay2" >
      <template #header>
        <h4>Flow (cfs) &amp; Tide (ft)</h4>
      </template>
      Information about flows and tides can allow a hydraulic model to estimate water volumes, elevations, and dynamics.
      Flow refers to the mean volume of water moving through the Skagit River Delta during a specified time of the year or during flood stage. Four flow scenarios were assessed here with volume provided in cubic feet per second (cfs): Low flow (12,000 cfs for both current and future/climate change low flow simulations); Second quarter (62,000 cfs average over April, May, &amp; June without climate change or 103,237 cfs with climate change); May mean river discharge (20,400 cfs); and Flood stage (93,200 cfs).
      Tidal fluctations change water surface elevation (WSE) over the course of a day, and sea level rise is changing and projected to further change tidal WSE this century. Tidal water surface elevations relative to NADV88 vertical datum was assessed for five scenarios: High tide (10.8 ft); High tide with flood scenario only (10.4 ft); High tide with climate change (12.67 ft); Low tide (-3.3 ft); and Low tide with climate change (1.43 ft)."
    </Dialog> -->
    <p class="text-caption text-red q-mt-sm q-mb-none" v-if="!selected2 && selected1">Select a flow &amp; tide</p>
    <q-select v-if="this.selected1" outlined id="select2" class="q-pa-xs" v-model="selected2"
     :options="list2" label="Flow (cfs) &amp; Tide (ft)" dense options-dense ></q-select>

    <!--the third select iterates through selected2 and stores the final layer number as its value -->
    
   
    <!--div class="center">
    <p class="text-subtitle2 headers"> Model output (ft)</p>
    <q-btn @click="dialogDisplay1=true" flat round color="primary" icon="info" size="10px" />
    </div-->
     <!--DIALOG
    <Dialog style="width: 65%" v-model:visible="dialogDisplay3" >
      <template #header>
        <h4>Model output (ft)</h4>
      </template>
      Three types of model outputs are available here: water surface elevation (WSE), change in WSE, and depth. All are in units of vertical feet. Here, water surface elevation is the elevation of the water surface relative to the NADV88 vertical datum (as opposed to other datums like Mean High High Water or  Mean Sea Level). Change in WSE is calculated as the difference in WSE from baseline to post-project implementation. Depth is the vertical distance from the water surface to the river floor or sea floor.
    </Dialog> -->
    <p class="text-caption text-red q-mt-sm q-mb-none" v-if="!selected3 && selected2">Select a model output</p>
    <q-select v-if="this.selected2" outlined id="select2" class="q-pa-xs" v-model="selected3" 
    :options="list3" label="Model output (ft)" dense options-dense></q-select>
   </div>
    <DynamicLayerList />
 </div>
</template>

<script>
import DynamicLayerList from './DynamicLayerList.vue'

export default {
    name: 'Selectors',
    components: {
     DynamicLayerList
    },
    data(){
        return {
            selected1: '',
            list2: '',
            selected2: '',
            list3: '',
            selected3: '', //this value contains the map service layer number
            dialogDisplay1: false,
            dialogDisplay2: false,
            dialogDisplay3: false      
        }
    },
    watch: {
      selected3: function () {
        if (this.selected3){
          let layerSelectedObj = {
            layerNameFirst: this.selected1.label,
            layerNameSecond: this.selected2.label,
            layerNameThird: this.selected3.label,
            layerNum: this.selected3.layerNum
          }
          this.$store.commit('addLayer', layerSelectedObj)
          this.$store.commit('updateVisibleLayer', this.selected3.layerNum)
       }
      },
      selected1: function(){
        this.buildSelect2()
      },
      selected2: function(){
        if (this.selected2){
          this.buildSelect3()
        }
      }
    },
    methods: {
      //TODO:  re-build the selector info so we do not need to maniupulate the data here
      //format data for dropdown 2
      buildSelect2(){
        this.selected2=''; this.selected3=''
        let list2 = []
        this.selected1.second.forEach(element => list2.push({"label": Object.keys(element)[0], "third": element[Object.keys(element)[0]]}))
        this.list2 = list2      
      },
      //format data for dropdown 3
      buildSelect3(){
        this.selected3=''
        let list3 = []
        this.selected2.third.forEach(element => list3.push({"label":element[0] , "layerNum":element[1]}))
        this.list3 = list3
      },

   

    },

 

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
