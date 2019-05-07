<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{$t('login.title')}}</h3>
        <lang-select class="set-language"></lang-select>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"></svg-icon>
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          :placeholder="$t('login.username')"
          name="username"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          :placeholder="$t('login.password')"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >{{ $t('login.logIn') }}</el-button>

      <div style="position:relative">
        <div class="tips">
          <span>{{ $t('login.username') }} : admin</span>
          <span>{{ $t('login.password') }} : {{ $t('login.any') }}</span>
        </div>
        <div class="tips">
          <span style="margin-right:18px;">{{ $t('login.username') }} : editor</span>
          <span>{{ $t('login.password') }} : {{ $t('login.any') }}</span>
        </div>

        <el-button
          class="thirdparty-button"
          type="primary"
          @click="showDialog=true"
        >{{ $t('login.thirdparty') }}</el-button>
      </div>
    </el-form>

    <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog">
      {{ $t('login.thirdpartyTips') }}
      <br>
      <br>
      <br>
      <social-sign/>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { validUsername } from "@/utils/validate";
import { Component, Vue ,Watch} from "vue-property-decorator";
import LangSelect from "@/components/LangSelect/index.vue";
import SocialSign from "./socialsignin.vue";

@Component({
  components: {
    LangSelect,
    SocialSign
  }
})
export default class Login extends Vue {
  private loginForm: object = { username: "admin", password: "111111" };
  private loginRules: object = {
    username: [
      { required: true, trigger: "blur", validator: this.validateUsername }
    ],
    password: [
      { required: true, trigger: "blur", validator: this.validatePassword }
    ]
  };
  private passwordType: string = "password";
  private loading: boolean = false;
  private showDialog: boolean = false;
  private redirect: any = undefined;

  private get elPassword(): any {
    return this.$refs.password;
  }

  private get elLoginForm(): any {
    return this.$refs.loginForm;
  }

  @Watch('$route',{immediate: true})
  private $routeChange(route:any){
    this.redirect = route.query && route.query.redirect
  }

  private validateUsername(rule: any, value: any, callback: any) {
    if (!validUsername(value)) {
      callback(new Error("Please enter the correct user name"));
    } else {
      callback();
    }
  }

  private validatePassword(rule: any, value: any, callback: any) {
    if (value.length < 6) {
      callback(new Error("The password can not be less than 6 digits"));
    } else {
      callback();
    }
  }

  private showPwd() {
    if (this.passwordType === "password") {
      this.passwordType = "";
    } else {
      this.passwordType = "password";
    }
    this.$nextTick(() => {
      this.elPassword.focus();
    });
  }

  private handleLogin() {
    this.elLoginForm.validate(async (valid: boolean) => {
      if (valid) {
        this.loading = true;
        const data: any = await this.$store.dispatch(
          "LoginByUsername",
          this.loginForm
        );
        if (!!data) {
          this.loading = false;
          this.$router.push({ path: this.redirect || "/" });
        } else {
          this.loading = false;
        }
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #eee;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    &::first-line {
      color: $light_gray;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
}
</style>
