<template>
  <form id="data-form-container" class="data-form-container">
    <div class="form-item">
      <div class="input-area">
        <input type="text" maxlength="10" placeholder="用户昵称" />
        <span class="tip">10/10</span>
      </div>
      <div class="error">错误信息</div>
    </div>
    <div class="form-item">
      <div class="text-area">
        <textarea maxlength="300" placeholder="输入内容"></textarea>
        <span class="tip">10/300</span>
      </div>
      <div class="error">错误信息</div>
    </div>
    <div class="form-item">
      <div class="button-area">
        <button>提交</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>

</style>