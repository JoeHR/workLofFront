<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name:'svg-icon'
})
export default class SvgIcon extends Vue {
  @Prop(String) iconClass!: string;
  @Prop(String) className!: string;

  private get iconName() {
    return `#icon-${this.iconClass}`;
  }

  private get svgClass() {
    if (this.className) {
      return `svg-icon ${this.className}`;
    } else {
      return `svg-icon`;
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
