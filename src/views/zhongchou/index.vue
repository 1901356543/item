<template>
  <section class="zhongchou">

    <Header title="众筹"/>

    <div class="nav">
      <router-link exact to="/zhongchou/preheat" tag='span' active-class='on'>预热中</router-link>
      <router-link exact to="/zhongchou/underway" tag='span' active-class='on'>进行中</router-link>
      <router-link exact to="/zhongchou/finished" tag='span' active-class='on'>已结束</router-link>
    </div>
    
    <div class="content">
      <!-- 匹配二级路由-->
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
  .zhongchou{
    width: 100%;
    height: 100%;
    .nav{
      height: 44px;
      width: 100%;
      position: fixed;
      top: 50px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      padding: 0 15px 0 15px;
      z-index: 100;
      background: #FFF;
      box-shadow:0px 4px 2px 0px rgba(30,49,107,0.05);
      span{
        display: block;
        height: 100%;
        font-size: 14px;
        color: #A9A9A9;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        line-height: 44px;
        border-bottom: 2px solid #FFF;
      }
    }
    .nav span.on{
      color: #FB3B5B;
      border-bottom: 2px solid #FB3B5B;
    }
    .content{
      width: 100%;
      height: 100%;
      padding: 100px 15px 0 15px;
      overflow-y: auto;
    }
  }
</style>