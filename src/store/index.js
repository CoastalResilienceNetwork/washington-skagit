import { createStore } from 'vuex'
import esriRequest from "@arcgis/core/request"

export default createStore({
  state: {
    selectorInfo: [],
    visibleLayer: '',
    selectedLayerList: [],
    supportingLayers: '',
    supportingVisibleLayers: []
   },
  mutations: {
    updateSelectorInfo(state, obj){
      state.selectorInfo = obj
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
    updateSupportingLayers(state, obj){
      console.log(obj)
      state.supportingLayers = obj
    },
    updateSupportingVisibleLayers(state, arr){
      state.supportingVisibleLayers = arr
    }
  },
   
  actions: {
    requestSelectorInfo(context){
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
                    l.second.push({[n.second]:[[n.third,n.id]]})
                }
                }
                else{
                l.second.push({[n.second]:[[n.third,n.id]]})
                }
            }
            })
        })
        context.commit('updateSelectorInfo', layerInfo)
      })
    },
   
    requestSupportingLayers(context){
      esriRequest("https://services2.coastalresilience.org/arcgis/rest/services/Washington/Skagit_Supporting/MapServer" + "/layers?f=pjson", {responseType: "json"}).then(function (response) {
        let layerJson = response.data.layers
        let layerList = []
        let sublayerList = []
        layerJson.forEach((l) => {
          //TODO: Add the skip layers // if (context.skipLayers.indexOf(l.id) == -1){
          // ONLY NESTED 3 DEEP!
          // Group Layers with no parents
          if (l.type == "Group Layer" && !l.parentLayer){
            sublayerList = []
              if(l.subLayers){
              //find the sublayer object
                l.subLayers.forEach((sl)=>{
                  let sublayerObject = layerJson.filter( obj => {
                      return obj.id === sl.id
                  })
                  let children = []
                  // if the sublayer has children populate its child array
                  if(sublayerObject[0].subLayers.length >0){
                    console.log('sublayer has sublayers')
                    sublayerObject[0].subLayers.forEach((sublayer)=>{
                    children.push({label: sublayer.name, children: [], id: sublayer.id})
                    })
                  }
                  sublayerList.push({label: sl.name + "(" + sl.id +")", children: children, id: sl.id})
                })
              }
            
              layerList.push({label: l.name +"(" + l.id +")", children: sublayerList, id: l.id, noTick: true})
          }
        })
        context.commit('updateSupportingLayers', layerList)
      })
    }

  },

  modules: {
  }
})
