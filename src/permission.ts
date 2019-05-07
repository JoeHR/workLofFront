import router from './router/index'
import store from './store/index'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// permission judge function
function hasPermission(roles:any,permissionRoles:any){
  if(roles.includes('admin')) return true
  if(!permissionRoles) return true
  return roles.some((role:any)=>permissionRoles.indexOf(role)>=0)
}

const whiteList:any[] = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach((to:any,from:any,next:any)=>{
  NProgress.start() // start progress bar

  if(getToken()){
    // determine if there has token

    /* has token */
    if(to.path === '/login'){
      next({path:'/'})
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    }else{
      if(store.getters.roles.length===0){
        // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo')
        .then((res:any)=>{
          // 拉取user_info
          const roles:any = res.data.roles // note: roles must be a object array! such as: [{id: '1', name: 'editor'}, {id: '2', name: 'developer'}]
          store.dispatch('GenerateRoutes', { roles }).then(accessRoutes => {
            // 根据roles权限生成可访问的路由表
            router.addRoutes(accessRoutes) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch((error:any)=>{
          store.dispatch('FedLogOut').then(()=>{
            Message.error(error)
            next({ path: '/' })
          })
        })
      }else{
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
        // 可删 ↑
      }

    }
  }else{
      /* has no token*/
      if (whiteList.indexOf(to.path) !== -1) {
        // 在免登录白名单，直接进入
        next()
      } else {
        next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
        NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
      }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})