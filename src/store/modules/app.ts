import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {

      // @ts-ignore
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
      withoutAnimation: false
    },
    device: 'desktop',
    language: Cookies.get('language') || 'en',
    size: Cookies.get('size') || 'medium'
  },

  mutations: {
    TOGGLE_SIDEBAR: (state: any) => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', '1')
      } else {
        Cookies.set('sidebarStatus', '0')
      }
    },
    CLOSE_SIDEBAR: (state: any, withoutAnimation: boolean) => {
      Cookies.set('sidebarStatus', '0')
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state: any, device: string) => {
      state.device = device
    },
    SET_LANGUAGE: (state: any, language: string) => {
      state.language = language
    },
    SET_SIZE: (state: any, size: string) => {
      state.size = size
    }
  },

  actions: {
    toggleSideBar({ commit }: any) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }: any, { withoutAnimation }: any) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }: any, device: string) {
      commit('TOGGLE_DEVICE', device)
    },
    setLanguage({ commit }: any, language: string) {
      commit('SET_LANGUAGE', language)
    },
    setSize({ commit }: any, size: string) {
      commit('SET_SIZE', size)
    }
  }
}


export default app