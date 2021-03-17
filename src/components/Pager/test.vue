<template>
  <div id="app">
    <Pager :total="total" :current="current" @pageChange="handlePageChange($event)" />
  </div>
</template>

<script>
import Pager from "./";
export default {
  components: {
    Pager
  },
  data(){
    return{
      current:1,
      total:302
    }
  },
  methods:{
    handlePageChange(newPage){
      console.log(newPage)
      this.current = newPage;
      console.log("加载当前页数据");
    }
  }
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
