<template>
  <div class="detail-container">
    <Layout>
      <div class="main-container" ref="mainContainer" v-loading="isLoading">
        <BlogDetail :blog="data" v-if="data" />
        <BlogComment v-if="!isLoading" />
      </div>
      <template #right>
        <div class="right-container" v-loading="isLoading">
          <BlogTOC :toc="data.toc" v-if="data" />
        </div>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "@/components/Layout";
import BlogDetail from "./components/BlogDetail";
import BlogTOC from "./components/BlogTOC";
import BlogComment from "./components/BlogComment";
import fetchData from "@/mixins/fetchData.js";
import { getBlog } from "@/api/blog";
export default {
  mixins: [fetchData(null)],
  components: {
    Layout,
    BlogDetail,
    BlogTOC,
    BlogComment,
  },
  mounted() {
    this.$bus.$on("setMainScroll", this.handleSetMainScroll); 
    this.$refs.mainContainer.addEventListener("scroll", this.handeScroll);
  },
  beforeDestroy() {
    this.$bus.$emit("mainScroll");
    this.$refs.mainContainer.removeEventListener("scroll", this.handeScroll);
    this.$bus.$off("setMainScroll", this.handleSetMainScroll);
  },
  updated() {
    const hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 50);
  },
  methods: {
    async fetchData() {
      return await getBlog(this.$route.params.id);
    },
    handeScroll() {
      this.$bus.$emit("mainScroll", this.$refs.mainContainer);
    },
    handleSetMainScroll(scrollTop){
      this.$refs.mainContainer.scrollTop = scrollTop;
    }
  },
};
</script>

<style scoped lang="less">
.detail-container {
  height: 100%;
  width: 100%;
  .main-container {
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    box-sizing: border-box;
    padding: 20px;
    position: relative;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }
  .right-container {
    width: 300px;
    height: 100%;
    overflow-y: scroll;
    box-sizing: border-box;
    position: relative;
    padding: 20px;
  }
}
</style>