<template>
  <section class="xpower">
    <Header title  color='none' :leftIcon="require('../../assets/images/home_search_white.png')"/>
    <div class="banner">
      <img src="../../assets/images/x_bj@2x.png" alt class="bg" />
      <div class="title">X算力争霸</div>
    </div>
    <div class="content">
      <div class="highlight"></div>
      <RankList iconFlag="xpower" title="获奖名单" :list="list" />
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
.xpower {
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