import { createStore } from 'vuex'
import esriRequest from "@arcgis/core/request"

export default createStore({
  state: {
    data: {
      // data retrieved from web services
      selctors: [],
      supportingLayers: []
    },
    config: {
      // config info 
      skagitMapLayersURL: '',
      supportingMapLayersURL:'',
      supportingLayersSkip:[2,3],
      supportingLayersTitle: 'Supporting Layers'
    },
      //app state info
      visibleLayer: '',
      visibleLayerOpacity: 1,
      selectedLayerList: [],
      supportingVisibleLayers:[]
   },
  mutations: {
    updateSelectorData(state, obj){
      state.data.selectors = obj
    },
    updateSupportingLayers(state, obj){
      state.data.supportingLayers = obj
    },
    addLayer(state, obj){
      //add to layer list - wanting to add to the top of the card list
      state.selectedLayerList.unshift(obj)
    },
    removeLayer(state,itemID){
      state.selectedLayerList = state.selectedLayerList.filter(item => item.layerNum !== itemID)
    },
    updateVisibleLayer(state,num){
      state.visibleLayer = num
    },
    updateSupportingVisibleLayers(state, arr){
      state.supportingVisibleLayers = arr
    },
    updateVisibleLayerOpacity(state,num){
      state.visibleLayerOpacity = num
    }
  },
   
  actions: {
    requestSelectorData(context){
      esriRequest("https://services2.coastalresilience.org/arcgis/rest/services/Washington/Skagit/MapServer/layers?f=pjson", {responseType: "json"}).then(function(response){
        let layerJson = response.data;
        let names = [];
        let firsts = [];
        let layerInfo = [];
        layerJson.layers.forEach((l) => {
            let a = l.name.split(" / ");
            names.push({first:a[0], second:a[1], third: a[2], id: l.id})
            if (firsts.findIndex(k => k == a[0]) == -1){
            firsts.push(a[0])
            }
        })
        firsts.forEach((f) => {
            layerInfo.push( { label: f, second: [] } )
        })
        layerInfo.forEach((l) => {
            names.forEach((n) => {
            // if laer info first = name.first
            if (l.label == n.first){
                //and if there is a second name
                if (l.second.length > 0){
                let match = false;
                l.second.forEach((s) => {
                    if (s[n.second]){
                     s[n.second].push([n.third,n.id])
                    match = true;
                    }
                })
                if (!match){
                    l.second.push({[n.second]:[[n.third,n.id]]
                    })
                }
                }
                else{
                l.second.push({[n.second]:[[n.third,n.id]]})
                }
            }
            })
        })
       
     
        console.log(layerInfo)
        context.commit('updateSelectorData', layerInfo)
      })
    },
   
    requestSupportingLayers(context){
      esriRequest("https://services2.coastalresilience.org/arcgis/rest/services/Washington/Skagit_Supporting/MapServer" + "/layers?f=pjson", {responseType: "json"}).then(function (response) {
        let layerJson = response.data.layers
        let obj = []
        let storeNodes = []

        layerJson.forEach((l) => {
          // add layer to layer viewer if it's id is not present in the skip array
          if (context.state.config.supportingLayersSkip.indexOf(l.id) == -1){
              // Group Layer with no parent
             if (l.type == "Group Layer" && !l.parentLayer){
                //push the object to the list 
                obj.push({label: l.name, children: [], id: l.id, noTick: true})
                //find the index of the object we just pushed, saves the reference to the location
                let parentIndex = obj.findIndex(( obj => obj.id == l.id))
                //save the parent node to the store
                storeNodes.push({parentIndex: parentIndex, parentLoc: obj[parentIndex], parentId: l.id})
               }
              // featurel layer with parent
             if (l.type !== "Group Layer" && l.parentLayer){
                    //find the location of the parent in the node lookup
                    let nodesIndex = storeNodes.findIndex(( obj => obj.parentId == l.parentLayer.id)) 
                    //set the location of the parent
                    let parentLoc = storeNodes[nodesIndex].parentLoc 
                    //push the child to the parent            
                    parentLoc.children.push({label: l.name, children: [], id: l.id})
              }
              // group layer with parent
             if (l.type == "Group Layer" && l.parentLayer){
                //find the location of the parent in the node lookup
                let nodesIndex = storeNodes.findIndex(( obj => obj.parentId == l.parentLayer.id)) 
                //set the location of the parent
                let parentLoc = storeNodes[nodesIndex].parentLoc 
                //push the new parent into the found parent as child
                parentLoc.children.push({label: l.name, children: [], id: l.id, noTick:true})
                //find the index of the child we just pushed
                let parentIndex = parentLoc.children.findIndex(( obj => obj.id == l.id))   
                //save the reference to the location          
                parentLoc = parentLoc.children[parentIndex]
                //store the parent in the nodes
                storeNodes.push({parentIndex: parentIndex, parentLoc: parentLoc, parentId: l.id})
             }
              // feature layer with no parent length = number of nodes
              if (l.type !== "Group Layer" && !l.parentLayer){
                  obj.push({label: l.name, children: [], id: l.id})
              }
            }
          })
          context.commit('updateSupportingLayers', obj)
      })
      
    }
  
  },

  modules: {
  }
})
