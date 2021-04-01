<template>
  <div class="blg-comment-container">
      <MessageArea 
        :title='"评论列表"'
        :subTitle="`(${data.total})`"
        :list="data.rows"
        :isListLoading="isLoading"
        @submit="handleSubmit"
      />
  </div>
</template>

<script>
import MessageArea from '@/components/MessageArea'
import fetchData from '@/mixins/fetchData'
import {postComment,getComments} from '@/api/blog'
export default {
  mixins:[fetchData({total:0,rows:[]})],
  components:{
    MessageArea
  },
  data(){
    return{
      page:1,
      limit:10
    }
  },
  created(){
    this.$bus.$on('mainScroll',this.handleMainScroll)
  },
  destroyed(){
     this.$bus.$off('mainScroll',this.handleMainScroll)
  },
  computed:{
    hasMore(){
      return this.data.rows.length <this.data.total
    }
  },
  methods:{
    async fetchData(){
      return await getComments(this.$route.params.id,this.page,this.limit)
    },
    async handleSubmit(formData,callback){
      const resp = await postComment({
        blogId:this.$route.params.id,
        ...formData
      })
      this.data.rows.unshift(resp);
      this.data.total++;
      callback("评论成功");
    },
    async moreFetchData(){
      if(!this.hasMore){
        return
      }
      this.isLoading = true
      this.page++
      let resp = await this.fetchData()
      this.data.total = resp.total
      this.data.rows = this.data.rows.concat(resp.rows)
      this.isLoading = false
    },
    handleMainScroll(dom){
      if(this.isLoading || !dom){
        return
      }
      const range = 100 //误差值
      const desc = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight)
      if(desc <= range){
        this.moreFetchData()
      }
    }
  }
}
</script>

<style>

</style>