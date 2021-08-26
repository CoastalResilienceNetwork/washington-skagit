<template>
    <div id="map-toggle" @click="toggleControls">
        <div class="landscape-toggle"> 
            <span v-if="$store.state.hideControls"><i class="fas fa-chevron-left mar-bottom"></i>HIDE</span> 
            <span v-if="$store.state.showControls"><i class="fas fa-chevron-right mar-bottom"></i>SHOW</span> 
            <span v-if="$store.state.hideControls"><i class="fas fa-chevron-left mar-top"></i></span>
            <span v-if="$store.state.showControls"><i class="fas fa-chevron-right mar-top"></i></span>
        </div>
        <div class="portrait-toggle">
            <span v-if="$store.state.hideControls"><i class="fas fa-chevron-down mar-right"></i>HIDE </span> 
            <span v-if="$store.state.showControls"><i class="fas fa-chevron-up mar-right"></i>SHOW </span> 
            <span v-if="$store.state.hideControls">CONTROLS<i style="" class="fas fa-chevron-down mar-left"></i></span>
            <span v-if="$store.state.showControls">CONTROLS<i style="margin-left: 10px;" class="fas fa-chevron-up mar-left"></i></span>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        toggleControls(){
          this.$store.state.hideControls = !this.$store.state.hideControls;
          this.$store.state.showControls = !this.$store.state.showControls; 
        }
    }   
}
</script>

<style scoped>
#map-toggle {
    width: 20px;
    background: var(--q-grey);
    font-size: 14px;
    color: var(--q-primary);
    text-align: center;
    box-shadow: 7px 0px 8px -2px rgb(51 51 51 / 42%);
    z-index: 2;
    writing-mode: vertical-rl;
    text-orientation: upright;
    padding-top: 10px;
    cursor: pointer;
    border-left: 1pt solid var(--q-primary);
}
#map-toggle:hover{
   color: #444;
}
.landscape-toggle {
    display: block;
}
.portrait-toggle {
    display: none;
}
.mar-bottom{
    margin-bottom: 10px;
}
.mar-top{
    margin-top: 10px;
}
.mar-right{
    margin-right: 10px;
}
.mar-left{
    margin-left: 10px;
}
@media screen and (max-width: 700px){
    #map-toggle {
        height: 30px;
        width: 100%;
        writing-mode: unset;
        text-orientation: unset;
        padding-top: 4px;
        font-size: 14px;
        border-left: none;
        border-bottom: 1pt solid var(--q-primary);
    }
    .portrait-toggle{
        display: block;
    }
    .landscape-toggle{
        display: none;
    }
}
</style>