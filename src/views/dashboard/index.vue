<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import adminDashboard from './admin/index.vue'
import editorDashboard from './editor/index.vue'

@Component({
  name:'Dashboard',
  components: {
    adminDashboard,
    editorDashboard
  }
})
export default class Dashboard extends Vue{
  @Getter('roles') roles!:any
   
  private currentRole:string = 'adminDashboard'
  
  private created () {
    if(!this.roles.includes('admin')){
      this.currentRole = 'editorDashboard'
    }
  }
  
  
}
</script>
