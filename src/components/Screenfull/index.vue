<template>
  <div>
    <svg-icon  :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click"/>
  </div>
</template>

<script lang="ts">
import screenfull from 'screenfull'
import { Component, Vue } from "vue-property-decorator";

@Component({name:'Screenfull'})
export default class Screenfull extends Vue{
  private isFullscreen:boolean = false

  private click(){
    if(!screenfull.enabled){
      this.$message({
        message:'your browser can not work',
        type:'warning'
      })
      return false
    }
    screenfull.toggle()
  }

  private init(){
    if(screenfull.enabled){
      screenfull.on('change',()=>{
        this.isFullscreen =screenfull.isFullscreen
      })
    }
  }
}
</script>
