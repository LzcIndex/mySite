<template>
  <div class="blog-toc-container">
    <h2>目录</h2>
    <RightList :list="switchToc" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList";
import {debounce} from "@/utils"
export default {
  props: {
    toc: {
      type: Array,
    },
  },
  components: {
    RightList,
  },
  data() {
    return {
      selectActive: "article-md-title-1",
    };
  },
  created(){
    this.setSelectDebounce = debounce(this.setSelect,50)
    this.$bus.$on('mainScroll',this.setSelectDebounce)
  },
  destroyed(){
    this.$bus.$off('mainScroll',this.setSelectDebounce)
  },
  computed: {
    switchToc() {
      let goToc = (toc = []) => {
        return toc.map((e) => {
          return {
            ...e,
            isSelect: e.anchor === this.selectActive,
            children: goToc(e.children),
          };
        });
      };
      return goToc(this.toc);
    },
    doms() {
      const doms = [];
      const addToDoms = (toc) => {
        for (const t of toc) {
          doms.push(document.getElementById(t.anchor));
          if (t.children && t.children.length) {
            addToDoms(t.children);
          }
        }
      };
      addToDoms(this.toc);
      return doms;
    },
  },
  methods: {
    handleSelect(item) {
      location.hash = item.anchor;
    },
    // 设置activeAnchor为正确的值
    setSelect() {
      this.selectActive = "";
      const range = 200;
      for (const dom of this.doms) {
        if (!dom) {
          continue;
        }
        // 看一下当前这个dom元素是不是应该被选中
        // 得到元素离视口顶部的距离
        const top = dom.getBoundingClientRect().top;
        
        if (top >= 0 && top <= range) {
          // 在规定的范围内
          this.selectActive = dom.id;
          return;
        } else if (top > range) {
          // 在规定的范围下方
          return;
        } else {
          // 在规定的范围上方
          this.selectActive = dom.id; // 先假设自己是激活的，然后继续看后面
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.blog-toc-container {
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>