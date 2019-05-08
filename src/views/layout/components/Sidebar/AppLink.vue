<template>
  <!-- eslint-disable vue/require-component-is -->
  <component v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script lang="ts">
import { Component, Vue,Prop} from "vue-property-decorator";
import { isExternal } from '@/utils/validate'

@Component({
  name:'AppLink'
})
export default class AppLink extends Vue{
  @Prop(String) to!:string

  private linkProps(url:string){
    if(isExternal(url)){
      return {
        is:'a',
        href:url,
        target:'_blank',
        rel:'noopener'
      }
    }else{
      return {
        is:'router-link',
        to:url
      }
    }
  }
}
</script>
