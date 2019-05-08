<template>
    <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class-name="size-icon" icon-class="size" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item of sizeOptions" :key="item.value" :disabled="size===item.value" :command="item.value">
        {{ item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Component, Vue,Watch } from "vue-property-decorator";

@Component({name:'SizeSelect'})
export default class SizeSelect extends Vue{
  private sizeOptions:object[]= [
        { label: 'Default', value: 'default' },
        { label: 'Medium', value: 'medium' },
        { label: 'Small', value: 'small' },
        { label: 'Mini', value: 'mini' }
      ]

  private get size(){
    return this.$store.getters.size
  }

  private handleSetSize(size:string){
    (this as any).$ELEMENT.size = size
    this.$store.dispatch('setSize',size)
    this.refreshView()
    this.$message({
      message:'Switch Size Success',
      type:'success'
    })
  }

  private refreshView(){
    // In order to make the cached page re-rendered
      this.$store.dispatch('delAllCachedViews', this.$route)

      const { fullPath } = this.$route

      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath
        })
      })
  }
}
</script>
