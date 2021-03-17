<template>
  <div id="app">
    <Avatar url="http://mdrs.yuanjin.tech/img/20201031141350.jpg" :size="200"/>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
export default {
  components: {
    Avatar
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
