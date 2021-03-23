<template>
  <ul class="right-list-container">
      <li v-for="(item,i) in list" :key="i">
          <span :class="{active : item.isSelect}" @click="handleClick(item)">{{ item.name }}</span>
          <RightList :list="item.children" @select="handleClick"/>
      </li>
  </ul>
</template>

<script>
export default {
    name:'RightList',
    props:{
        list:{
            type:Array,
            default:()=>[]
        }
    },
    methods:{
        handleClick(item){
            this.$emit('select',item)
        }
    }
}
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.right-list-container{
    list-style: none;
    padding: 0;
    li{
        line-height: 40px;
        cursor: pointer;
        .right-list-container{
            margin-left: 1em;
        }
        .active{
            color: @warn;
            font-weight: bold;
        }
    }
}
</style>