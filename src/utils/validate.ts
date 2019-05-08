/*
 * @Author: Joe.Rh 
 * @Date: 2019-05-06 09:35:04 
 * @Last Modified by: Joe.Rh
 * @Last Modified time: 2019-05-07 17:05:08
 */


export function validUsername(str: string) {
  const valid_map: string[] = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function isExternal(path:string){
  return /^(https?:|mailto:|tel:)/.test(path)
}