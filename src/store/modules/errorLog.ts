const errorLog:any = {
  state:{
    logs:[]
  },
  mutations: {
    ADD_ERROR_LOG:(state:any,log:any)=>{
      state.logs.push(log)
    }
  },
  actions: {
    addErrorLog:({commit}:any,log:any)=>{
      commit('ADD_ERROR_LOG',log)
    }
  }
}

export default errorLog