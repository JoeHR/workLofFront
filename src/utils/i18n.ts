// translate router.meta.title, be used in breadcrumb sidebar tagsview



export function generateTitle(title:string){
  // @ts-ignore
  const hasKey:any = (this as any).$te('route.'+title)

  if(hasKey){
    // $t :this method from vue-i18n, inject in @/lang/index.js
    // @ts-ignore
    const translateTitle = (this as any).$t('route.'+title)

    return translateTitle
  }

  return title
}