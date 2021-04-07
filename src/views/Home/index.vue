<template>
  <div class="home-container" ref="container" @wheel="handleWheel" v-loading="loading">
    <ul class="carousel-container" :style="{ marginTop: marginTop }" @transitionend="handleTransitionEnd">
      <li v-for="item in data" :key="item.id">
        <Carouselitem :bannerItem="item" />
      </li>
    </ul>
    <div
      class="icon icon-up"
      v-show="currentIndex >= 1"
      @click="switchTo(currentIndex - 1)"
    >
      <Icon type="arrowUp" />
    </div>
    <div
      class="icon icon-down"
      v-show="currentIndex < data.length - 1"
      @click="switchTo(currentIndex + 1)"
    >
      <Icon type="arrowDown" />
    </div>
    <ul class="indicator">
      <li
        v-for="(item, i) in data"
        :key="item.id"
        @click="switchTo(i)"
        :class="{ active: i == currentIndex }"
      ></li>
    </ul>
  </div>
</template>

<script>
import Carouselitem from "./Carouselitem";
import Icon from "@/components/Icon";
import {mapState} from 'vuex';
export default {
  components: {
    Carouselitem,
    Icon,
  },
  data() {
    return {
      currentIndex: 0,
      containerHeight: 0,
      switching:false,
    };
  },
  computed: {
    marginTop() {
      return -this.currentIndex * this.containerHeight + "px";
    },
    ...mapState('banner',['loading','data'])
  },
  created(){
    this.$store.dispatch('banner/fetchBanner')
  },
  mounted() {
    this.containerHeight = this.$refs.container.clientHeight;
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    switchTo(index) {
      this.currentIndex = index;
    },
    //鼠标滚动事件
    handleWheel(e) {
      if(this.switching){
        return;
      }
      if (e.deltaY < -5 && this.currentIndex > 0) {
        this.switching = true
        this.currentIndex--;
      }else if (e.deltaY > 5 && this.currentIndex < this.data.length - 1) {
        this.switching = true
        this.currentIndex++;
      }
    },
    handleTransitionEnd(){
      this.switching = false
    },
    handleResize() {
      this.containerHeight = this.$refs.container.clientHeight;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
@import "~@/styles/minxin.less";
.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  background: @dark;
  overflow: hidden;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .carousel-container {
    width: 100%;
    height: 100%;
    transition: 500ms;
    li {
      width: 100%;
      height: 100%;
    }
  }
  .icon {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    color: @gray;
    animation: jump-up 1.8s infinite;
    @space: 25px;
    &.icon-up {
      top: @space;
    }
    &.icon-down {
      bottom: @space;
      animation: jump-down 2s infinite;
    }
    @jump: 5px;
    @keyframes jump-up {
      0% {
        transform: translate(-50%, @jump);
      }
      50% {
        transform: translate(-50%, -@jump);
      }
      100% {
        transform: translate(-50%, @jump);
      }
    }
    @keyframes jump-down {
      0% {
        transform: translate(-50%, -@jump);
      }
      50% {
        transform: translate(-50%, @jump);
      }
      100% {
        transform: translate(-50%, -@jump);
      }
    }
  }
  .indicator {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
    li {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      border: 1px solid #fff;
      box-sizing: border-box;
      margin-bottom: 10px;
      cursor: pointer;
      &.active {
        background: #fff;
      }
    }
  }
}
</style>