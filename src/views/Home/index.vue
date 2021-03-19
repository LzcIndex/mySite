<template>
  <div class="home-container" ref="container">
    <ul class="carousel-container" :style="{marginTop:marginTop}">
      <li v-for="item in banners" :key="item.id">
        <Carouselitem />
      </li>
    </ul>
    <div class="icon icon-up" v-show="currentIndex >= 1" @click="switchTo(currentIndex-1)">
      <Icon type="arrowUp" />
    </div>
    <div class="icon icon-down" v-show="currentIndex < banners.length - 1" @click="switchTo(currentIndex+1)">
      <Icon type="arrowDown" />
    </div>
    <ul class="indicator">
      <li v-for="(item,i) in banners" :key="item.id" @click="switchTo(i)" :class="{active : i == currentIndex}"></li>
    </ul>
  </div>
</template>

<script>
import { getBanners } from "@/api/banner.js";
import Carouselitem from "./Carouselitem";
import Icon from "@/components/Icon";
export default {
  components: {
    Carouselitem,
    Icon,
  },
  data() {
    return {
      banners: [],
      currentIndex: 0,
      containerHeight:0
    };
  },
  computed:{
    marginTop(){
      return -this.currentIndex * this.containerHeight + 'px'
    }
  },
  async created() {
    const resp = await getBanners();
    this.banners = resp;
  },
  mounted(){
    this.containerHeight = this.$refs.container.clientHeight
  },
  methods:{
    switchTo(index){
      this.currentIndex = index
    }
  }
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
      background: @words;
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