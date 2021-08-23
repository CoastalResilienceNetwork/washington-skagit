<template>
  <div v-if="layerList" id="supportingLayers">{{title}} 
    <br />
    <ul v-for="layer in layerList" :key="layer.id">
        <input type="checkbox" name="topGroup" id="topGroup" v-model="activeLayers" :value="value" @change="checkboxChanged()">
        <label for="topGroup" class="">{{layer.name}}({{layer.id}})</label>
        <ul v-if="layer.subLayers.length>0">
            <li v-for="sl, index in layer.subLayers" :key="index">
                <input type="checkbox" :name="sl.id" :value="sl.id" v-model="activeLayers">
                <label :for="sl.id" class="">{{sl.name}}({{sl.id}})</label>
                <ul v-if="sl.subLayers.length>0">
                <li v-for="sl2, index in sl.subLayers" :key="index">
                    <input type="checkbox" :name="sl2.id" :value="sl2.id" v-model="value">
                    <label :for="sl2.id" class="">{{sl2.name}}({{sl2.id}})</label>
                </li>
            </ul>
            </li>
           
        </ul>
    </ul>
    </div>
</template>

<script>
//import esriRequest from "@arcgis/core/request"
export default {
    name: 'SupportingLayers',
    data() {
        return{
            layerList:'',
            activeLayers:[],
        }
    },
    props: {
      supportingLayers: Object,
      expand: Boolean,
      // layer ids to skip in layer viewer
      skipLayers: Array,
      // layer viewer title
      title: String	
    },
    methods: {
        parseData(){
           console.log(this.supportingLayers)
           let layerList = []
           let sublayerList = []
           this.supportingLayers.forEach((l) => {
                // Group Layers with no parents
                console.log(this.skipLayers)
                if (this.skipLayers.indexOf(l.id) == -1){
                    console.log
                    // Group Layers with no parents
                    if (l.type == "Group Layer" && !l.parentLayer){
                        if(l.subLayers){
                           //find the sublayer object
                           sublayerList = []
                            l.subLayers.forEach((sl)=>{
                                let sublayer = this.supportingLayers.filter( obj => {
                                    return obj.id === sl.id
                                })
                                sublayerList.push(sublayer[0])
                                })
                         }

                         layerList.push({name: l.name, type: l.type, parentLayer:l.parentLayer, subLayers: sublayerList, id: l.id})
                    }
              
                }
                
            })
            this.layerList = layerList
       },
       checkboxChanged(){
           console.log(this.activeLayers)
       }

    },
    mounted() {
        this.parseData()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#supportingLayers{
  height:90vh;
  background-color: white;
  overflow: auto;
}
ul { 
  list-style: none;
}

</style>
