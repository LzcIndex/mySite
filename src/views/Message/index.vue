<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea
      title="留言板"
      :subTitle="`(${data.total})`"
      :isListLoading="isLoading"
      :list="data.rows"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData";
import { getMessages, postMessage } from "@/api/message";
import mainScroll from "@/mixins/mainScroll.js";
export default {
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("messageContainer")],
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  created() {
    this.$bus.$on("mainScroll", this.handleMainScroll);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleMainScroll);
  },
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total;
    },
  },
  methods: {
    async fetchData() {
      return await getMessages(this.page, this.limit);
    },
    async handleSubmit(data, callback) {
      const resp = await postMessage(data);
      this.data.total++
      callback("感谢您的留言");
      this.data.rows.unshift(resp);
    },
    async moreFetchData() {
      if (!this.hasMore) {
        return;
      }
      this.isLoading = true;
      this.page++;
      let resp = await this.fetchData();
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
    handleMainScroll(dom) {
      if (this.isLoading || !dom) {
        return;
      }
      const range = 100; //误差值
      const desc = Math.abs(
        dom.scrollTop + dom.clientHeight - dom.scrollHeight
      );
      if (desc <= range) {
        this.moreFetchData();
      }
    },
  },
};
</script>

<style scoped>
.message-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 25px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
.message-area-contianer {
  width: 700px;
  margin: 0 auto;
}
</style>