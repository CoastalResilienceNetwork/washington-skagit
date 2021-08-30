<template>
  <header> Skagit Estuary Restoration: <span class="text-secondary">a multi-benefit analysis</span>
  <q-btn @click="showHelp=true; step=3" style="float:right" padding="none" color="white" flat icon="help"  />
  </header>

    <!-- INTRO DIALOG -->
  <q-dialog v-model="showHelp" >
    <q-card style="max-width:800px">
      <q-toolbar>

        <q-toolbar-title class="text-primary text-bold">Skagit Estuary Restoration: <span class="text-secondary text-h6">a multi-benefit analysis</span></q-toolbar-title>
        <q-btn flat round dense color="pirmary" icon="close" v-close-popup />
      </q-toolbar>
        
      <p><q-separator  /></p>
      <q-card-section class="text-center items-center">
        <!--h5 class="q-title text-primary">Hydro Dynamic Models for the Skagit Delta</h5-->
          <div style="border 2px black;width:200px"> </div>
            <q-stepper
              v-model="step"
              ref="stepper"
              color="primary"
              animated
            >
              <q-step
                :name="1"
                title="Purpose"
                active-icon="favorite"
                :done="step > 1"
              >
                In the Skagit River, the futures of salmon and people are intertwined. The Estuary Restoration Strategic Assessment (ERSA) sets a course to balance the needs of fish, farmers, and flood risk reduction.
              </q-step>

              <q-step
                :name="2"
                title="About the study"
                icon="library_books"
                active-icon="library_books"
                :done="step > 2"
              >
                Using scientific modeling and analysis, [representatives from salmon recovery, flood risk reduction, and agricultural groups] evaluated the potential benefits and impacts of more than twenty project concepts for estuary restoration. In a collaborative decision-making process placing equal weight on farms, fish, and flooding, they used data to develop recommendations for restoration actions that will increase estuarine habitat for salmon while providing benefits and minimizing negative impacts for farms and flood risk reduction.
              </q-step>

              <q-step
                :name="3"
                title="Using the tool"
                icon = "build"
                active-icon="build"
                
                
              >
                Using this tool, [who?] can do [what?]
                </q-step>

              <template v-slot:navigation>
                <q-stepper-navigation>
                  <q-btn v-if="step!==3" @click="$refs.stepper.next()" color="primary" label="Continue" />
                  <q-btn v-if="step === 3" @click="showHelp = false" color="primary" label="finish" />
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
        background:var(--q-primary);
        height: 50px;
        color: #fff;
        font-size: 22px;
        padding: 10px 20px;
        box-shadow: 0px 8px 8px -2px rgb(51 51 51 / 42%);
        position: relative;
        z-index: 10;
    }
</style>