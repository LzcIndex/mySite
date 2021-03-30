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
@import "~@/styles/var.less";
.data-form-container {
  width: 100%;
  margin-bottom: 20px;
  overflow: hidden;
  .form-item {
      margin-bottom: 8px;
  }
  .tip {
    position: absolute;
    right: 5px;
    bottom: 5px;
    color: #b4b8bc;
    font-size: 12px;
  }
  .error {
    margin-top: 6px;
    color: @danger;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
  }
  .input-area {
    width: 50%;
    position: relative;
  }
  .text-area {
    position: relative;
  }
  button{
      cursor: pointer;
      outline: none;
      width: 100px;
      height: 34px;
      color: #fff;
      border-radius: 4px;
      border: none;
      background: @primary;
    &:hover{
        background: darken(@primary,10%);
    }
    &:disabled{
        background: lighten(@primary,20%);
        cursor: not-allowed;
    }
  }
  input,
  textarea {
    display: block;
    width: 100%;
    border: 1px dashed @gray;
    box-sizing: border-box;
    outline: none;
    color: @words;
    font-size: 14px;
    border-radius: 4px;
    &:focus {
      border-color: @primary;
    }
  }
  input {
    padding: 0 15px;
    height: 40px;
  }
  textarea {
    resize: none;
    padding: 8px 15px;
    height: 120px;
  }
}
</style>