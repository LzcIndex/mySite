<template>
  <div class="blog-list-container">
    <ul>
      <li>
        <div class="thumb">
          <a href="">
            <img src="" alt="" />
          </a>
        </div>
        <div class="main">
          <a href="">
            <h2></h2>
          </a>
          <div class="aside">
            <span> 日期 </span>
            <span> 浏览： </span>
            <span> 评论： </span>
            <a href=""></a>
          </div>
          <div class="desc"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import fetchData from '@/mixins/fetchData.js'
import { getBlogs } from '@/api/blog.js'
export default {
    mixins:[fetchData()],
    methods:{
        async fetchData(){
            await getBlogs()
        }
    }
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;
  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }
  .main {
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .aside {
    font-size: 12px;
    color: @gray;
    span {
      margin-right: 15px;
    }
  }
  .desc {
    margin: 15px 0;
    font-size: 14px;
  }
}
</style>