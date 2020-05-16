<template>
  <section class="issued-container">
    <Header title  color='none'/>
    <div class="banner">
      <img src="../../assets/images/gold_currency_bj@2x.png" alt class="bg" />
      <div class="title">发行</div>
    </div>
    <div class="content">
      <div class="highlight"></div>
      <div class="issue-form">
        <div class="issue-box">
          <div class="t">
            <label>资产名称</label>
          </div>
          <div class="inp">
            <input type="text" placeholder="请输入资产名称"/>
          </div>
        </div>
        <div class="issue-box">
          <div class="t">
            <label>资产符号</label>
          </div>
          <div class="inp">
            <input type="text" placeholder="请输入资产符号"/>
          </div>
        </div>
        <div class="issue-box">
          <div class="t">
            <label>发行总量</label>
          </div>
          <div class="inp">
            <input type="text" placeholder="请输入发行总量"/>
          </div>
        </div>
        <div class="issue-box">
          <div class="t">
            <label>发行方</label>
          </div>
          <div class="inp">
            <input type="text" placeholder="请输入发行方"/>
          </div>
        </div>
        <div class="issue-box">
          <div class="t">
            <label>项目网站</label>
          </div>
          <div class="inp">
            <input type="text" placeholder="请输入项目网站"/>
          </div>
        </div>
        <div class="issue-box">
          <div class="t">
            <label>联系方式</label>
          </div>
          <div class="inp">
            <input type="text" placeholder="请输入联系方式"/>
          </div>
        </div>
        <div class="issue-box">
          <div class="t">
            <label>发行说明</label>
          </div>
          <div class="inp">
            <textarea placeholder="请输入发行说明"/>
          </div>
        </div>
        <div class="issue-text">
          *消耗：0 ALD
        </div>
        <r-button text="确定发行" class="confirm-issue"></r-button>
      </div>
    </div>
    
  </section>
  
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.issued-container{
  .banner {
    position: relative;
    overflow: hidden;
    img.bg {
      width: 100%;
    }
    .title {
      color: $active;
      font-size: 26px;
      font-weight: 600;
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      margin-left: 12%;
    }
  }
  .content {
    background-color: $border2;
    margin: 15px;
    padding: 0 15px 15px;
    border-radius: 5px;

    .highlight {
      background: linear-gradient(270deg,rgba(0,255,0,0) 0%,rgba(0,255,0,1) 100%);;
      border-radius: 5px 5px 0px 0px;
      height: 5px;
      margin: 0 -15px 15px -15px;
    }
    .issue-form{
      .issue-box{
        margin-bottom: 30px;
        .t{
          font-size: 14px;
          color: $active;
          margin-bottom: 15px;
        }
        .inp{
          input, textarea{
            width: 100%;
            background: $black;
            border-radius: 5px;
            color: $active;
            padding: 12px;
            font-size: 14px;
            border:1px solid $color1;
          }
        }
      }
      .issue-text{
        margin-top: -18px;
        font-size: 12px;
        color: $active;
        margin-bottom: 45px;
      }
    }
  }
}
</style>