<template>
  <section class="hash-guess">
    <Header title color='none' :leftIcon="require('../../assets/images/home_search_white.png')"/>
    <div class="top-banner">
      <div class="banner-bg">
        <img src="../../assets/images/hash_bj@2x.png" />
      </div>
      <div class="titles">
        <div class="title-en">HASH</div>
        <div class="title-cn">竞猜</div>
      </div>
    </div>
    <div class="content">
      <div class="highlight"></div>
      <div class="jackpot">奖池</div>
      <div class="jackpot-detail">
        <div class="jackpot-num">85330002</div>
        <div class="jackpot-unit">RCP</div>
      </div>
      <div class="progress-bar">
        <div class="progressed"></div>
        <div class="all"></div>
      </div>
      <div class="remained-jackpot">
        <div class="remained-num">剩余：6200000RCP</div>
        <div class="remained-percent">68%</div>
      </div>
      <div class="divider"></div>
      <Countdown title="开奖倒计时" remainedTime="86405" />
      <div class="divider"></div>
      <div class="guess-num">
        <div class="title">竞猜数量</div>
        <div class="input-area">
          <input class="num-input" placeholder="输入竞猜数量" />
          <div class="unit">RCP</div>
        </div>
      </div>
    </div>
    <r-button text="参与竞猜" class="btn-guess"></r-button>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.hash-guess {
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
      font-size: 26px;
      color: $white;

      .title-en {
        letter-spacing: 15px;
        font-family: PingFangSC-Thin, PingFang SC;
        margin-bottom: 10px;
      }

      .title-cn {
        font-weight: 600;
      }
    }
  }
  .content {
    background-color: $border2;
    margin: 15px 15px 80px 15px;
    border-radius: 5px;
    padding: 0 15px 20px 15px;
    box-shadow:0px 6px 10px 0px rgba(0,0,0,0.06);
    .highlight {
      background: linear-gradient(270deg,rgba(1,101,237,0) 0%,rgba(1,101,237,1) 100%);
      border-radius: 5px 5px 0px 0px;
      height: 5px;
      margin: 0 -15px 15px -15px;
    }

    .jackpot {
      color: $color1;
      font-size: 14px;
      margin-bottom: 12px;
    }

    .jackpot-detail {
      color: $active;
      font-weight: bold;
      overflow: hidden;
      .jackpot-num {
        font-size: 26px;
        float: left;
        font-family: DINAlternate-Bold, DINAlternate;
      }
      .jackpot-unit {
        float: right;
        font-size: 16px;
      }
    }

    .progress-bar {
      overflow: hidden;
      margin: 10px 0;

      .progressed {
        float: left;
        width: 68%;
        background-color: $blue;
        height: 5px;
        border-radius: 5px;
      }

      .all {
        width: 100%;
        background-color: $bg;
        height: 5px;
        border-radius: 5px;
      }
    }

    .remained-jackpot {
      font-size: 12px;
      color: $color1;
      overflow: hidden;
      .remained-num {
        float: left;
      }
      .remained-percent {
        float: right;
      }
    }

    .divider {
      margin: 18px -15px;
      background-color: $inpBg;
      height: 1px;
    }

    .guess-num {
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
  .btn-guess {
    position: fixed;
    bottom: 20px;
    width: 90%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>