import service from '@/utils/request'

export function loginByUsername(username:string,password:string){
  const data:any = {username,password}
  const url:string = '/login/login'
  return service({
    url:url,
    method:'post',
    data
  })
}

export function getUserInfo(token:string) {
  return service({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return service({
    url: '/login/logout',
    method: 'post'
  })
}