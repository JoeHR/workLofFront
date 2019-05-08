<template>
  <div class="social-signup-container">
    <div class="sign-btn" @click="wechatHandleClick('wechat')">
      <span class="wx-svg-container">
        <svg-icon icon-class="wechat" class="icon"/>
      </span> 微信
    </div>
    <div class="sign-btn" @click="tencentHandleClick('tencent')">
      <span class="qq-svg-container">
        <svg-icon icon-class="qq" class="icon"/>
      </span> QQ
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({name:'SocialSignin'})
export default class SocialSignin extends Vue {
  private wechatHandleClick(thirdpart: string) {
    alert("ok");
    // this.$store.commit('SET_AUTH_TYPE', thirdpart)
    // const appid = 'xxxxx'
    // const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/auth-redirect')
    // const url = 'https://open.weixin.qq.com/connect/qrconnect?appid=' + appid + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_login#wechat_redirect'
    // openWindow(url, thirdpart, 540, 540)
  }

  private tencentHandleClick(thirdpart: string) {
    alert("ok");
    // this.$store.commit('SET_AUTH_TYPE', thirdpart)
    // const client_id = 'xxxxx'
    // const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/auth-redirect')
    // const url = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirect_uri
    // openWindow(url, thirdpart, 540, 540)
  }
}
</script>

<style lang="scss" scoped>
</style>
