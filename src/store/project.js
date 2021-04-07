import { getProject } from '@/api/project'
export default {
    namespaced: true,
    state: {
        loading: false,
        data: [],
    },
    mutations:{
        setLoading(state,payLoad){
            state.loading = payLoad
        },
        setData(state,payLoad){
            state.data = payLoad
        }
    },
    actions:{
        async fetchProject(ctx){
            ctx.commit('setLoading',true)
            let resp = await getProject()
            ctx.commit('setData',resp)
            ctx.commit('setLoading',false)
        }
    }

}