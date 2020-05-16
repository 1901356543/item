<template>
  <div class="container">
    <Header title="修改安全密码" />
    <div class="main-content">
      <div class="content">
        <div class="password">原安全密码</div>
        <input class="psw-input" type="text" placeholder="请输入原安全密码" />
        <div class="divider"></div>
        <div class="password">新安全密码</div>
        <input class="psw-input" type="text" placeholder="请输入新安全密码" />
      </div>
    </div>
    
    <div class="error-msg" v-if="false">*原安全密码不正确</div>
    <r-button text="确定" width="90%" class="comfirm"/>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.container{
  background-color: $bodybg;
  height:100%;
}
.main-content{
  padding-top: 70px;
}
.content {
  background-color: $white;
  margin: 0 15px 0;
  padding: 15px;

  .password {
    font-size: 12px;
    color: $active;
    margin-bottom: 15px;
  }

  .psw-input {
      font-size: 14px;
      color: $active;
      outline: none;
      border: none;
      background: none;
      width: 100%;
  }

  .divider {
      width: 100%;
      height: 1px;
      background:rgba(0,0,0,1);
      opacity:0.1;
      margin: 15px 0;
  }
}
.error-msg{
    color: $up;
    font-size: 12px;
    padding:12px 0 0 15px;
}
.comfirm{
    position: absolute;
    bottom: 20px;
    transform: translateX(-50%);
    left: 50%;
}
</style>