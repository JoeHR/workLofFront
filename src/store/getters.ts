const getters:any = {
  sidebar: (state:any) => state.app.sidebar,
  language: (state:any) => state.app.language,
  size: (state:any) => state.app.size,
  device: (state:any) => state.app.device,
  visitedViews: (state:any) => state.tagsView.visitedViews,
  cachedViews: (state:any) => state.tagsView.cachedViews,
  token: (state:any) => state.user.token,
  avatar: (state:any) => state.user.avatar,
  name: (state:any) => state.user.name,
  introduction: (state:any) => state.user.introduction,
  status: (state:any) => state.user.status,
  roles: (state:any) => state.user.roles,
  setting: (state:any) => state.user.setting,
  permission_routes: (state:any) => state.permission.routes,
  addRoutes: (state:any) => state.permission.addRoutes,
  errorLogs: (state:any) => state.errorLog.logs
}

export default getters