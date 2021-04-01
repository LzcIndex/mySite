<template>
  <div class="to-top-container" v-if="show" @click="handleClick">Top</div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  created() {
    this.$bus.$on("mainScroll", this.handeScroll);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handeScroll);
  },
  methods: {
    handeScroll(dom) {
      if (!dom) {
          this.show = false
        return;
      }
      if (dom.scrollTop > 500) {
        this.show = true;
        return;
      }
      this.show = false;
    },
    handleClick() {
      this.$bus.$emit("setMainScroll", 0);
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.to-top-container {
  background: @primary;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: fixed;
  z-index: 99;
  right: 50px;
  bottom: 50px;
  cursor: pointer;
  line-height: 50px;
  color: #fff;
  text-align: center;
}
</style>