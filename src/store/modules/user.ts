import { loginByUsername,getUserInfo,logout } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user:any = {

  state:{
    user:'',
    status:'',
    code:'',
    token:getToken(),
    name:'',
    avatar:'',
    introduction:'',
    roles:[],
    setting:{
      articlePlatform:[]
    }
  },

  mutations: {
    SET_CODE:(state:any,code:string)=>{
      state.code=code
    },
    SET_TOKEN:(state:any,token:string) =>{
      state.token = token
    },
    SET_INTRODUCTION: (state:any, introduction:any) => {
      state.introduction = introduction
    },
    SET_SETTING: (state:any, setting:any) => {
      state.setting = setting
    },
    SET_STATUS: (state:any, status:string) => {
      state.status = status
    },
    SET_NAME: (state:any, name:string) => {
      state.name = name
    },
    SET_AVATAR: (state:any, avatar:string) => {
      state.avatar = avatar
    },
    SET_ROLES: (state:any, roles:any) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名 登录
    LoginByUsername({commit}:any,userInfo:any){
      const username:string = userInfo.username.trim()
      return new Promise((resolve,reject)=>{
        loginByUsername(username,userInfo.password).then((response:any)=>{
          const data:any = response.data
          commit('SET_TOKEN',data.token)
          setToken(response.data.token)
          resolve(data)
        }).catch((error:any)=>{
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({commit,state}:any){
      return new Promise((resolve:any,reject:any)=>{
        getUserInfo(state.token).then((response:any)=>{
          // 由于mockjs 不支持自定义状态码只能这样hack
          if(!response.data){
            reject('Verification failed, please login again.')
          }
          const data:any = response.data

          if(data.roles && data.roles.length>0){// 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          }else{
            reject('getInfo: roles must be a non-null array!')
          }

          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        }).catch((error:any)=>{
          reject(error)
        })
      })
    },

    // 登出
    LogOut({commit,state}:any){
      return new Promise((resolve:any,reject:any)=>{
        this.LogOut(state.token).then(()=>{
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch((error:any)=>{
          reject(error)
        })
      })
    },

     // 前端 登出
     FedLogOut({ commit }:any) {
      return new Promise((resolve:any) => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }:any, role:any) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then((response:any) => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }



}

export default user