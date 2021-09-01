<template>
  <header> 
    <span>Skagit Estuary Restoration: <span class="text-secondary">A Multi-benefit Analysis</span></span>
    <div><q-btn @click="showHelp=true; step=3" padding="none" color="white" flat icon="help"  /></div>
  </header>

    <!-- INTRO DIALOG -->
  <q-dialog v-model="showHelp" >
    <q-card class="maxWidth">
      <q-toolbar>
        <q-toolbar-title class="text-primary text-bold">Skagit Estuary Restoration: <span class="text-secondary text-h6">A Multi-benefit Analysis</span></q-toolbar-title>
        <q-btn flat round dense color="pirmary" icon="close" v-close-popup />
      </q-toolbar>
      <q-separator spaced />

      <q-card-section class="text-center items-center">
        <q-stepper
          v-model="step"
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
                *Provide an overview and explain how to compare output*
                Select multiple simulations to add to the map for comparison.  Click the simulation layer to view it on the map. 
              </p>
              <q-card class="q-pa-md" >
                <p class="text-subtitle2 text-primary q-mb-none">Model Selectors</p>
                <q-separator spaced></q-separator>
                <p><span class="text-secondary">Step 1]</span>
                Select from a list of 10 estuary restoration project simulations </p>
                <p><span class=" text-secondary">Step 2]</span> Explain flow/tide options* </p>
                <p><span class=" text-secondary">Step 3]</span> Explain model output* </p>
              </q-card>
            </div>
          </q-step>

          <q-step
            :name="4"
            title="Additional Information"
            icon="library_books"
            active-icon="library_books"
             class="row items-center minHeight"
          >
            <div class="text-left">
              <p class="text-subtitle2 text-primary q-mb-none">Overview:</p>
              <p>
              *Provide an overview and explain how to use supporting layers*
              </p>
              </div>

            <q-card class="q-pa-md text-left" >
              <p class="text-subtitle2 text-primary q-mb-none">Supporting Layers</p>
              <q-separator spaced></q-separator>
              <p><span class="text-secondary">Elevation: Inform Fish Objectives 2 and 6]</span>
                Elevation data was used to calculate scores for fish two objectives: 1) habitat diversity represented by vegetation communities within a project site and 2) the time each acre of habitat would be inundated to a water depth that could be used by fish
              </p>
              <p><span class=" text-secondary">Project Concept Areas]</span> Project concepts are based on information available in 2016 and project details could change during planning, design and implementation.
              </p>
            </q-card>
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
      white-space: nowrap; 
      text-overflow: ellipsis;
    }
    
    .minHeight{
      min-height: 200px;
    }

    .maxWidth{
      max-width: 800px;
    }

    @media screen and (max-width: 700px){
     .minHeight{
       min-height: 100%;
      }

}
</style>