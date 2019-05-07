<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">
          {{ generateTitle(item.meta.title) }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ generateTitle(item.meta.title)}}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { Component, Vue,Watch } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { generateTitle } from '@/utils/i18n'
import pathToRegexp from 'path-to-regexp'


@Component({name:'Breadcrumb'})
export default class Breadcrumb extends Vue{
  
  private levelList:any[] = []
  private generateTitle:any = generateTitle

  @Watch('$route',{})
  private $routeChange(val:any){
    this.getBreadcrumb()
  }

  private created () {
    this.getBreadcrumb()
  }

  private getBreadcrumb(){
    let matched:any = this.$route.matched.filter((v:any)=>v.name)

    const first:any = matched[0]

    if(first && first.name.trim().toLocaleLowerCase() !=='Dashboard'.toLocaleLowerCase()){
      matched = [{path:'/dashboard',meta: { title: 'dashboard' }}].concat(matched)
    }

    this.levelList = matched.filter((item:any)=> item.meta && item.meta.title && item.meta.breadcrumb !== false)
  }

  private pathCompile(path:string){
    // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
    const {params}:any = this.$route
    let toPath:any = pathToRegexp.compile(path)
    return toPath(params)
  }

  private handleLink(item:any){
    const {redirect,path}:any = item
    if(redirect){
      this.$router.push(redirect)
      return 
    }
    this.$router.push(this.pathCompile(path))
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>