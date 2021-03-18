<template>
  <div class="image-loader-container">
    <img v-if="!everythingDone" :src="placeholder" alt="" class="placeholder"/>
    <img
      :src="src"
      alt=""
      @load="handleLoad"
      :style="{ opacity: originOpacity, transition: duration + 'ms' }"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      require: true,
    },
    placeholder: {
      type: String,
      require: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      originLoaded: false,
      everythingDone: false,
    };
  },
  computed: {
    originOpacity() {
      return this.originLoaded ? 1 : 0;
    },
  },
  methods: {
    handleLoad() {
      this.originLoaded = true;
      setTimeout(() => {
        this.everythingDone = true;
        this.$emit("load");
      }, this.duration);
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/minxin.less";
.image-loader-container{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    img{
        .self-fill();
        object-fit:cover
    }
    .placeholder{
        filter: blur(2vw);
    }
}
</style>