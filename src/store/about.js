import { getAbout } from '@/api/about'
export default {
    namespaced:true,
    state:{
        loading:false,
        data:""
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
        async fetchAbout(ctx){
            if(ctx.state.data){
                return
            }
            ctx.commit('setLoading',true)
            let resp = await getAbout()
            ctx.commit('setData',resp)
            ctx.commit('setLoading',false)
        }
    }
}