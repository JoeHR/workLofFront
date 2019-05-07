<template>
  <div :class="classObj" class="app-wrapper">
    <div class="drawer-bg" v-if="device==='mobile'&&sidebar.opened" @click="handleClickOutside"></div>
    <Sidebar class="sidebar-container"/>
    <div class="main-container">
      <Navbar/>
      <TagsView/>
      <AppMain/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Navbar, Sidebar, AppMain, TagsView } from "./components";
// import ResizeMixin from './mixin/ResizeHandler'

@Component({
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  }
})
export default class Layout extends Vue {
  private get sidebar() {
    return this.$store.state.app.sidebar;
  }

  private get device() {
    return this.$store.state.app.device;
  }

  private get classObj() {
    return {
      hideSidebar: !this.sidebar.opened,
      openSidebar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation,
      mobile: this.device === "mobile"
    };
  }

  private handleClickOutside() {
    this.$store.dispatch("closeSideBar", { withoutAnimation: false });
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>

