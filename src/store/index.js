import { createStore } from 'vuex'
import esriRequest from "@arcgis/core/request"

export default createStore({
  state: {
    selectorInfo: [],
    visibleLayer: '',
    selectedLayerList: [],
    supportingLayers: ''
   },
  mutations: {
    updateSelectorInfo(state, obj){
      state.selectorInfo = obj
    },
    addLayer(state, obj){
      //add to layer list - wanting to add to the top of the card list
      state.selectedLayerList.unshift(obj)
    },
    updateVisibleLayer(state,num){
      state.visibleLayer = num
    },
    updateSupportingLayers(state, obj){
      console.log(obj)
      state.supportingLayers = obj
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
            layerInfo.push( { first: f, second: [] } )
        })
        layerInfo.forEach((l) => {
            names.forEach((n) => {
            // if laer info first = name.first
            if (l.first == n.first){
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
        context.commit('updateSupportingLayers', layerJson)
      })
    }
  },
  modules: {
  }
})
