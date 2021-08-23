<template>
  <div id="selectors" >
<!-- without sytle guide -->
    <!--for the first select we are looping through the list of objects in the store and displaying the 'first' attribute. 
    the selected value is stored in v-model so on the change event we build the second list from the first selected value-->
    <div class="center">
      <h5 class="headers"> Simulation Name </h5> 
    </div>
      <!-- this is for the info dialog 
      <button @click="dialogDisplay1=true" icon="pi pi-info-circle" class="p-button-sm p-button p-component p-button-icon-only p-button-rounded p-button-text p-button-plain" />
    </div>
    <div style="width:65%" v-show="dialogDisplay1" >     
        <h4>Simulation Name</h4>
 
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
    </div> -->
    <!--select id="select1" class="ma-5" v-model="selected1"  @change="buildSelect2()" placeholder="Select a Simulation" > 
      <option v-for="option,index in $store.state.selectorInfo" :key="index" :value="option">
        {{ option.first }}
      </option>
    </select-->
      <!--test -->
      <div class="dropdown">
        <button class="button dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
           {{selected1.first}}
          <i class="icon-down-open-mini caret"></i>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1" >
          <li v-for="option,index in $store.state.selectorInfo" :key="index" :value="option" @click="buildSelect2_test(option)">
            <a href="#">{{option.first}}</a></li>
        </ul>
      </div>

    
    <!--for the second select, we iterate through second, and build the third list from the second selected item  -->
    <div class="center">
      <h5 class="headers"> Flow (cfs) &amp; Tide (ft)</h5>
    </div>
    <!-- info dialog 
    <button @click="dialogDisplay2=true" icon="pi pi-info-circle" class="p-button-sm p-button p-component p-button-icon-only p-button-rounded p-button-text p-button-plain" />
    </div>
    <div style="width:65%" v-show="dialogDisplay2" >
    <h4>Flow (cfs) &amp; Tide (ft)</h4>
      Information about flows and tides can allow a hydraulic model to estimate water volumes, elevations, and dynamics.
      Flow refers to the mean volume of water moving through the Skagit River Delta during a specified time of the year or during flood stage. Four flow scenarios were assessed here with volume provided in cubic feet per second (cfs): Low flow (12,000 cfs for both current and future/climate change low flow simulations); Second quarter (62,000 cfs average over April, May, &amp; June without climate change or 103,237 cfs with climate change); May mean river discharge (20,400 cfs); and Flood stage (93,200 cfs).
      Tidal fluctations change water surface elevation (WSE) over the course of a day, and sea level rise is changing and projected to further change tidal WSE this century. Tidal water surface elevations relative to NADV88 vertical datum was assessed for five scenarios: High tide (10.8 ft); High tide with flood scenario only (10.4 ft); High tide with climate change (12.67 ft); Low tide (-3.3 ft); and Low tide with climate change (1.43 ft)."
    </div>-->
    <!--select id="select2" class="ma-5" v-if="selected1" v-model="selected2"  @change="buildSelect3()"
      placeholder="Select a Flow &amp; Tide">
      <option v-for="option,index in list2" :key="index" :value="option">
        {{ option.second }}
      </option>
    </select-->
    <!--test select-->
    <div class="dropdown" v-if="selected1.first !=='Select a simulation'">
      <button class="button dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          {{selected2.second}}
        <i class="icon-down-open-mini caret"></i>
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenu1" >
        <li v-for="option,index in list2" :key="index" :value="option" @click="buildSelect3_test(option)">
          <a href="#">{{option.second}}</a></li>
      </ul>
    </div>

    <!--the third select iterates through selected2 and stores the final layer number as its value -->
    <div class="center">
      <h5 class="headers"> Model output (ft)</h5>
    </div>
    <!-- this is for the info dialog 
    <button @click="dialogDisplay3=true" icon="pi pi-info-circle" class="p-button-sm p-button p-component p-button-icon-only p-button-rounded p-button-text p-button-plain" />
    </div>
    <div style="width: 65%" v-show="dialogDisplay3" >
      <h4>Model output (ft)</h4>
       Three types of model outputs are available here: water surface elevation (WSE), change in WSE, and depth. All are in units of vertical feet. Here, water surface elevation is the elevation of the water surface relative to the NADV88 vertical datum (as opposed to other datums like Mean High High Water or  Mean Sea Level). Change in WSE is calculated as the difference in WSE from baseline to post-project implementation. Depth is the vertical distance from the water surface to the river floor or sea floor.
    </div> -->
   
    <!--select id="select3" class="ma-5" v-if="selected2" v-model="selected3" placeholder="Select a model output">
      <option v-for="option,index in list3" :key="index" :value="option">
      {{ option.third }}
      </option>
    </select-->
    <!--test dropdown-->
    <div class="dropdown" v-if="selected2.second!='Select a flow & tide'">
      <button class="button dropdown-toggle" type="button" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          {{selected3.third}}
        <i class="icon-down-open-mini caret"></i>
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenu1" >
        <li v-for="option,index in list3" :key="index" :value="option" @click="onSelect3(option)">
          <a href="#">{{option.third}}</a></li>
      </ul>
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
            selected1: {first:'Select a simulation'},
            list2: '',
            selected2: {second:'Select a flow & tide'},
            list3: '',
            selected3: '' , 
            dialogDisplay1: false,
            dialogDisplay2: false,
            dialogDisplay3: false,
 
        }
    },
    watch: {
      selected3: function () {
        if (this.selected3.third != 'Select a model output'){
          let layerSelectedObj = {
            layerNameFirst: this.selected1.first,
            layerNameSecond: this.selected2.second,
            layerNameThird: this.selected3.third,
            layerNum: this.selected3.layerNum
          }
          this.$store.commit('addLayer', layerSelectedObj)
          this.$store.commit('updateVisibleLayer', this.selected3.layerNum)
       }
      }
    },
    methods: {
      //format data for dropdown 2
      buildSelect2(){
        console.log(this.selected1)
        this.selected3=''; this.selected2=''
        let list2 = []
        this.selected1.second.forEach(element => list2.push({"second": Object.keys(element)[0], "third": element[Object.keys(element)[0]]}))
        this.list2 = list2      
      },
      buildSelect3(){
        this.selected3=''
        let list3 = []
        this.selected2.third.forEach(element => list3.push({"third":element[0] , "layerNum":element[1]}))
        this.list3 = list3
      },
      buildSelect2_test(option){
        this.selected3={third: 'Select a model output'}; this.selected2={second:'Select a flow & tide'}
        let list2 = []
        option.second.forEach(element => list2.push({"second": Object.keys(element)[0], "third": element[Object.keys(element)[0]]}))
        this.list2 = list2   
        this.selected1 = option  
      },
      buildSelect3_test(option){
        this.selected3={third:'Select a model output'}
        let list3 = []
        option.third.forEach(element => list3.push({"third":element[0] , "layerNum":element[1]}))
        this.list3 = list3
        this.selected2 = option  
      },
      onSelect3(option){
        this.selected3 = option.third
        this.selected3= option
      }
    },

 

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 #selectors {padding: 10px; width: 30vw; }
 .headers{ margin-bottom: 0px; margin-top: 10px}
 .ma-5{margin: 5px; }
 .center{display: flex; align-items: center}
 .dialogWidth{width: 70%}
</style>
