<template>
  <header> 
    <span>Skagit Estuary Restoration: <br v-if=" this.$q.screen.lt.sm "/><span class="text-secondary">A Multi-benefit Analysis</span></span>
    <div><q-btn @click="showHelp=true; step=3" padding="none" color="white" flat icon="help"  /></div>
  </header>

    <!-- INTRO DIALOG -->
  <q-dialog v-model="showHelp" >
    <q-card class="maxWidth">
      <q-toolbar>
        <q-toolbar-title class="text-primary text-subtitle2 text-bold">Skagit Estuary Restoration: <br v-if=" this.$q.screen.lt.sm "/> <span class="text-secondary text-subtitle2">A Multi-benefit Analysis</span></q-toolbar-title>
        <q-btn flat round dense color="pirmary" icon="close" v-close-popup />
      </q-toolbar>
      <q-separator spaced />

      <q-card-section class="text-center items-center">
        <q-stepper
          v-model="step"
          header-nav
          ref="stepper"
          color="primary"
          animated
          :vertical="$q.screen.lt.sm ? true : false"
        >
          <q-step
            :name="1"
            title="Purpose"
            active-icon="favorite"
            :done="step > 1"
            class="row items-center minHeight"
          >
            In the Skagit River, the futures of salmon and people are intertwined. The Estuary Restoration Strategic Assessment (ERSA) sets a course to balance the needs of fish, farmers, and flood risk reduction.
            The goal of the assessment was to identify estuary restoration actions that will increase habitat for salmon while providing benefits and minimizing negative impacts for farms and flood risk reduction. This work resulted in a strategic approach for prioritizing restoration project concepts for implementation. 
          </q-step>

          <q-step
            :name="2"
            title="About the study"
            icon="library_books"
            active-icon="library_books"
            :done="step > 2"
            class="row items-center minHeight"
          >
            Using scientific modeling and analysis, [representatives from salmon recovery, flood risk reduction, and agricultural groups] evaluated the potential benefits and impacts of more than twenty project concepts for estuary restoration. In a collaborative decision-making process placing equal weight on farms, fish, and flooding, they used data to develop recommendations for restoration actions that will increase estuarine habitat for salmon while providing benefits and minimizing negative impacts for farms and flood risk reduction.
          
            <div class="bg-grey-3 q-ma-md q-pa-md">
              Project Report Links <br/>
              <a href="https://tnc.app.box.com/s/lsnl2br8f1hejgrlziep9tqeowsscc5p" target="_blank">Technical Report</a><br/>
              <a href="https://tnc.app.box.com/s/l6gkt8a46ztkt00zuby4t2whpr9d12we" target="_blank">4-Page Summary</a><br/>
              <a href="https://tnc.app.box.com/s/nto3iijg9y6xkxze9e2s1l7rylbewxeo" target="_blank">16-Page Summary</a>
            </div>
          </q-step>

          <q-step
            :name="3"
            title="Help Using the tool"
            icon = "build"
            active-icon="build"
            class="row items-center minHeight"
            :done="step > 3"
          >
            <div class="text-caption text-secondary text-center">
              *At any time you can retrieve this info box by clicking the ? icon in the top right corner of the app*
            </div>
            <div class="text-left">
              <p class="text-subtitle2 text-primary q-mb-none">Overview:</p>
              <p>
                Compare layers from the hydrodynamic model outputs to consider relative changes in the Skagit Delta based on selections. Click the simulation layer to view it on the map.
              </p>
              <q-card class="q-pa-md" >
                <p class="text-subtitle2 text-primary q-mb-none">Model Selectors</p>
                <q-separator spaced></q-separator>
                <p><span class="text-secondary">Step 1]</span>
                Select from a list of 10 estuary restoration project simulations. Eleven simulations and a baseline were run to model hydraulic impacts of implementing particular projects and project combinations. The baseline represents existing conditions without new project implementation around 2015. Click on the (i) next to the drop-down box for more info. </p>
                <p><span class=" text-secondary">Step 2]</span> Select from four flow scenarios. Information about flows and tides can allow a hydraulic model to estimate water volumes, elevations, and dynamics. Flow refers to the mean volume of water moving through the Skagit River Delta during a specified time of the year or during flood stage. Four flow scenarios were assessed here with volume provided in cubic feet per second (cfs). Click on the (i) next to the drop-down box for more info. </p>
                <p><span class=" text-secondary">Step 3]</span> Select from three types of model outputs are available here: water surface elevation (WSE), change in WSE, and depth. All are in units of vertical feet. Click on the (i) next to the drop-down box for more info. </p>
                <p><span class=" text-secondary">Step 4]</span> The selection of the above will result in a model layer displaying your choices shown on the map. You can select several model layers. Each will result in a clickable rectangle with selections shown for each model layer. You can click between model layers for comparison.</p>
              </q-card>
            </div>
          </q-step>

          <q-step
            :name="4"
            title="Model Outcomes and Project Results"
            icon="library_books"
            active-icon="library_books"
            class="row items-center minHeight"
          >
            <div class="text-left">
              <p class="text-subtitle2 text-primary q-mb-none">Outcomes</p>
              <p>
              ERSA used the models and additional GIS analysis to assess benefits and impacts of each project concept in meeting objectives for fish, farm, and flood interests. <a href="https://tnc.app.box.com/s/l6gkt8a46ztkt00zuby4t2whpr9d12we" target="_blank">[see page 2 on ERSA Summary]</a>
              </p>
              <p class="text-subtitle2 text-primary q-mb-none">Results</p>
              <p>
              The ERSA analysis defined five distinct management groups. These groups represent restoration concepts with significant differences in the relative level of benefits and/or impacts to fish, floods, and farms. Project concept management groups:
              </p>
            </div>
            <div>
              <q-img style="max-width:600px" :src="require('@/assets/mngmentGroups.png')"/>
            </div>
            <div class="text-left">
              <p>The SHDM Team has prioritized advancement of the Green Project Concepts because of their potential to achieve more significant benefits while having relatively low impacts. 
              </p>
              <p>If you select “Project Concept Areas” from “supporting layers” it will display each management group, or priority group for each concept.
              </p>
              <p>For a map of just the management groups by project concept,  <a href="https://tnc.app.box.com/s/l6gkt8a46ztkt00zuby4t2whpr9d12we" target="_blank">see page 3 of the ERSA Summary.</a>
              </p>
            </div>
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn v-if="step!==4" @click="$refs.stepper.next()" color="primary" label="Continue" />
              <q-btn v-if="step === 4" @click="showHelp = false" color="primary" label="finish" />
              <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
            </q-stepper-navigation>
          </template>
        </q-stepper>
        
      </q-card-section>
    </q-card>
  </q-dialog>
   
</template>

<script>
export default {
  data(){
    return{
      showHelp: true,
      step: 1
    }
  }
}
</script>

<style scoped>
    header{
        background: var(--q-primary);
        height: 50px;
        color: #fff;
        font-size: 22px;
        padding: 10px 20px;
        box-shadow: 0px 8px 8px -2px rgb(51 51 51 / 42%);
        position: relative;
        z-index: 10;
        display: flex;
    }

    header span{
      flex: 1;
      width: 700px;
      overflow: hidden;
      white-space: wrap; 
      text-overflow: ellipsis;
    }
    
    .minHeight{
      min-height: 200px;
    }

    .maxWidth{
      max-width: 1000px;
    }

    @media screen and (max-width: 700px){
     .minHeight{
       min-height: 100%;
      }
     header{
      background: var(--q-primary);
      height: 50px;
      color: #fff;
      font-size: 14px;
      padding: 5px 10px;
      box-shadow: 0px 8px 8px -2px rgb(51 51 51 / 42%);
      position: relative;
      z-index: 10;
      display: flex;
    }

}
</style>