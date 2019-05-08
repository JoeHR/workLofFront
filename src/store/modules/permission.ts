import { asyncRoutes, constantRoutes } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles:any, route:any) {
  if (route.meta && route.meta.roles) {
    return roles.some((role:any) => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export function filterAsyncRoutes(routes:any,roles:any){
  const res:any[]=[]

  routes.forEach((route:any) => {
    const tmp:any = {...route}
    if(hasPermission(roles,tmp)){
      if(tmp.children){
        tmp.children = filterAsyncRoutes(tmp.children,roles)
      }
      res.push(tmp)
    }
  })

  return res
}


const permission:any={
  state:{
    routes:[],
    addRoutes:[]
  },
  mutations: {
    SET_ROUTES(state:any,routes:any){
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    }
  },
  actions: {
    GenerateRoutes({ commit }:any, data:any) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRoutes
        if (roles.includes('admin')) {
          accessedRoutes = asyncRoutes
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
}


export default permission