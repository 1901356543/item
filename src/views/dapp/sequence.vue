<template>
  <section class="sequence">
    <Header title color='none' :leftIcon="require('../../assets/images/home_search_white.png')"/>
    <div class="top-banner">
      <div class="banner-bg">
        <img src="../../assets/images/solitaire_bj@2x.png" />
      </div>
      <div class="titles">接龙</div>
    </div>
    <div class="content">
      <div class="highlight"></div>
      <Countdown title="倒计时" remainedTime="86405" />
      <div class="divider"></div>
      <div class="sequence-member">接龙人数</div>
      <div class="sequence-num">695002</div>
      <div class="divider"></div>
      <div class="sequence-consume">
        <div class="title">接龙花费</div>
        <div class="input-area">
          <input class="num-input" placeholder="输入数量" />
          <div class="unit">RCP</div>
        </div>
      </div>
    </div>
    <r-button text="参与接龙" class="btn-sequence"></r-button>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.sequence {
  background-color: $bodybg;
  .top-banner {
    position: relative;
    overflow: hidden;
    .banner-bg {
      img {
        width: 100%;
      }
    }
    .titles {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 41px;
      font-weight: 600;
      font-size: 26px;
      color: $white;
    }
  }
  .content {
    background-color: $border2;
    margin: 15px 15px 80px 15px;
    padding: 0 15px 20px 15px;
    border-radius: 5px;
    box-shadow:0px 6px 10px 0px rgba(0,0,0,0.06);
    .highlight {
      background: linear-gradient(270deg,rgba(1,101,237,0) 0%,rgba(1,101,237,1) 100%);
      border-radius: 5px 5px 0px 0px;
      height: 5px;
      margin: 0 -15px 15px -15px;
    }

    .divider {
      margin: 18px -15px;
      background-color: $inpBg;
      height: 1px;
    }

    .sequence-member {
      margin-bottom: 12px;
      font-size: 14px;
      color: $color1;
    }

    .sequence-num {
      font-family: DINAlternate-Bold, DINAlternate;
      color: $active;
      font-size: 26px;
      font-weight: bold;
    }

    .sequence-consume {
      font-size: 14px;
      .title {
        color: $active;
        margin-bottom: 15px;
      }
      .input-area {
        background-color: $inpBg;
        border-radius: 5px;
        overflow: hidden;
        padding: 12px 12px;
        color: $active;
        .num-input {
          float: left;
          background: transparent;
          outline: none;
          border: none;
          color: $active;
          width: 85%;
        }
        .unit {
          color: $active;
          float: right;
        }
      }
    }
  }
  .btn-sequence {
    position: fixed;
    bottom: 20px;
    width: 90%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>