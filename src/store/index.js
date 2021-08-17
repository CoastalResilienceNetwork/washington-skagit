import { createStore } from 'vuex'
import esriRequest from "@arcgis/core/request"

export default createStore({
  state: {
    selectorInfo: [],
    visibleLayer: '',
    selectedLayerList: []
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
    }
  },
  actions: {
    requestSelectorInfo(context){
      esriRequest("https://services2.coastalresilience.org/arcgis/rest/services/Washington/Skagit/MapServer/layers?f=pjson", {responseType: "json"}).then(function(response){
        let layerJson = response.data;
        let names = [];
        let firsts = [];
        let layerInfo = [];
        //for each layer in the map service, get the name and split it into three values
        //create a list of names objects that has the first, second, and third part of each name as a value
        layerJson.layers.forEach((l) => {
            let a = l.name.split(" / ");
            // push in first result
            names.push({first:a[0], second:a[1], third: a[2], id: l.id})
            // I think this removes any duplicates??
            if (firsts.findIndex(k => k == a[0]) == -1){
            // push all unique values for the first part of the name to an array
            firsts.push(a[0])
            }
        })
        //console.log('names array')
        //console.log(names)
        // for each one of the first names, create an array of objects that contains the 
        // name and empty list for second names
        firsts.forEach((f) => {
            layerInfo.push( { first: f, second: [] } )
        })
        //console.log('layer info')
        //console.log(layerInfo)
        // for each of objects created in the previous array, check each value in the 
        // names array.  
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
        console.log(layerInfo)
        context.commit('updateSelectorInfo', layerInfo)
      })
    },
    

  },
  modules: {
  }
})
