<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <svg-icon class-name="international-icon" icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh'" command="zh">
        中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">
        English
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='es'" command="es">
        Español
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class LangSelect extends Vue {
  private get language(){
    return this.$store.getters.language
  }

  private handleSetLanguage(lang:string){
    this.$i18n.locale = lang
    this.$store.dispatch('setLanguage',lang)
    this.$message({
      message:'Switch Language Success',
      type:'success'
    })
  }
}
</script>
