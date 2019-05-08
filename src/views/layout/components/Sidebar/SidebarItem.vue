<template>
  <div class="menu-wrapper" v-if="!item.hidden">
    <template
      v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow"
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{'submenu-title-noDropdown':!isNest}"
        >
          <MenuItem
            :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)"
            :title="generateTitle(onlyOneChild.meta.title)"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <MenuItem
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="generateTitle(item.meta.title)"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>
<script lang="ts">
import { Component, Vue ,Watch,Prop} from "vue-property-decorator";
import path from 'path'
import { generateTitle } from '@/utils/i18n'
import { isExternal } from '@/utils/validate'
import MenuItem from './MenuItem.vue'
import AppLink from './AppLink.vue'
// import FixiOSBug from './FixiOSBug'

@Component({
  name:'SidebarItem',
  components: {
    MenuItem,
    AppLink
  }
})
export default class SidebarItem extends Vue{
  @Prop(Object) item!:object
  @Prop(Boolean) isNest!:boolean
  @Prop(String) basePath!:string

  private onlyOneChild:any = null

  private generateTitle:any = generateTitle
  
  private hasOneShowingChild(children:any[]=[],parent:any){
    const showingChildren:any = children.filter((item:any)=>{

      if(item.hidden){
        return false
      }else{
        // Temp set(will be used if only has one showing child)
        this.onlyOneChild=item
        return true
      }
    })

    // When there is only one child router, the child router is displayed by default
    if(showingChildren.length === 1){
      return true
    }

     // Show parent if there are no child router to display
     if(showingChildren.length===0){
       this.onlyOneChild={...parent,path:'',noshowingChildren:true}
       return true
     }
  }

  private resolvePath(routePath:string){
    if(isExternal(routePath)){
      return routePath
    }
    return path.resolve(this.basePath,routePath)
  }

}
</script>
