<template>
  <div class="detail-container">
    <Layout>
      <div class="main-container" v-loading="isLoading">
        <BlogDetail :blog="data" v-if="data" />
        <BlogComment />
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
    BlogComment
  },
  methods: {
    async fetchData() {
      return await getBlog(this.$route.params.id);
    },
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