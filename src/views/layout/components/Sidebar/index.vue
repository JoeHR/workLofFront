<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in permission_routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import SidebarItem from "./SidebarItem.vue";
import variables from "@/styles/variables.scss";

@Component({
  name: "Sidebar",
  components: {
    SidebarItem
  }
})
export default class Sidebar extends Vue {
  @Getter('sidebar') sidebar!:any
  @Getter('permission_routes') permission_routes!:any

  private get variables() {
    return variables;
  }

  private get isCollapse() {
    return !this.sidebar.opened;
  }
}
</script>

