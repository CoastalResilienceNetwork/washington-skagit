<template>
 
    <div class="q-pt-md" >
    <div class="q-gutter-y-md">
      <q-card flat>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="models" label="Model Layers" />
          <q-tab name="supporting" label="Supporting Layers" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated >
          <q-tab-panel name="models" class="panel">
             <div>
                 <Selectors />
              </div>
          </q-tab-panel>

          <q-tab-panel name="supporting" class="panel">
             <div id="supportingLayers">
              <SupportingLayers />
             </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
  
</template>

<script>

import Selectors from './Selectors.vue'
import SupportingLayers from './SupportingLayers.vue'

export default {
  name: 'ThePanel',
  components: {
    Selectors, SupportingLayers

  },
  data(){
    return{
      tab: 'models'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .panel{
    position: relative;
    height: calc(100vh - 100px);
    overflow-y: auto;
    display: block;
    width: 100%;
  }
</style>
