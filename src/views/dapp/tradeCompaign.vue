<template>
  <section class="trade-compaign">
    <Header title color='none' :leftIcon="require('../../assets/images/home_search_white.png')"/>
    <div class="banner">
      <img src="../../assets/images/trading_competition_bj@2x.png" alt class="bg" />
      <div class="title">交易大赛</div>
    </div>
    <div class="content">
      <div class="highlight"></div>
      <RankList iconFlag="trade" title="获奖名单" :list="list" />
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          address: "DSJDS82HBW34533FS34",
          power: "86000800"
        },
        {
          address: "DSJDS82HBW34533FS34",
          power: "86000800"
        },
        {
          address: "DSJDS82HBW34533FS34",
          power: "86000800"
        },
        {
          address: "DSJDS82HBW34533FS34",
          power: "86000800"
        },
        {
          address: "DSJDS82HBW34533FS34",
          power: "86000800"
        },
        {
          address: "DSJDS82HBW34533FS34",
          power: "86000800"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.trade-compaign {
  background-color: $bodybg;
  .banner {
    position: relative;
    overflow: hidden;
    img.bg {
      width: 100%;
    }
    .title {
      color: $white;
      font-size: 26px;
      font-weight: 600;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .content {
    background-color: $border2;
    margin: 15px;
    padding: 0 15px 15px;
    border-radius: 5px;

    .highlight {
      background: linear-gradient(270deg,rgba(1,101,237,0) 0%,rgba(1,101,237,1) 100%);
      border-radius: 5px 5px 0px 0px;
      height: 5px;
      margin: 0 -15px 15px -15px;
    }
  }
}
</style>