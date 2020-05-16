<template>
  <section class="rank-list">
    <div class="title">{{title}}</div>
    <div class="rank-item" v-for="(item,idx) in list" :key="idx">
      <i class="rank-icon" :class="`rank-${idx+1} ${idx<3 && iconFlag}`"></i>
      <div class="rank-text">
        <div class="address">地址：{{item.address}}</div>
        <div class="power">算力：{{item.power}}</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: "title"
    },
    iconFlag: {
      type: String,
      default: "noFlag"
    },
    list: {
      type: Array,
      default: []
    }
  }
};
</script>

<style lang="scss" scoped>
.rank-list {
  color: $active;
  .title {
    font-size: 14px;
    margin-bottom: 21px;
  }

  .rank-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 21px;
    .divider {
      margin: 18px -15px;
      background-color: $bg;
      height: 1px;
    }
    .rank-icon {
      display: inline-block;
      background-size: 100% 100%;
      width: 35px;
      height: 35px;
      margin-right: 5px;
    }
    .rank-text {
      .address {
        font-size: 14px;
        font-weight: 500;
        color: $active;
        margin-bottom: 4px;
      }
      .power {
        font-size: 12px;
        color: $color1;
      }
    }
    .newbie {
      &.rank-1 {
        background-image: url("../assets/images/award_medal_1@2x.png");
      }
      &.rank-2 {
        background-image: url("../assets/images/award_medal_2@2x.png");
      }
      &.rank-3 {
        background-image: url("../assets/images/award_medal_3@2x.png");
      }
    }

    .trade {
      &.rank-1 {
        background-image: url("../assets/images/medal_1@2x.png");
      }
      &.rank-2 {
        background-image: url("../assets/images/medal_2@2x.png");
      }
      &.rank-3 {
        background-image: url("../assets/images/medal_3@2x.png");
      }
    }

    .xpower {
      &.rank-1 {
        background-image: url("../assets/images/x_medal_1@2x.png");
      }
      &.rank-2 {
        background-image: url("../assets/images/x_medal_2@2x.png");
      }
      &.rank-3 {
        background-image: url("../assets/images/x_medal_3@2x.png");
      }
    }

    .ypower {
      &.rank-1 {
        background-image: url("../assets/images/y_medal_1@2x.png");
      }
      &.rank-2 {
        background-image: url("../assets/images/y_medal_2@2x.png");
      }
      &.rank-3 {
        background-image: url("../assets/images/y_medal_3@2x.png");
      }
    }

    .rank-4 {
      background-image: url("../assets/images/medal_4@2x.png");
    }
    .rank-5 {
      background-image: url("../assets/images/medal_5@2x.png");
    }
    .rank-6 {
      background-image: url("../assets/images/medal_6@2x.png");
    }
    .rank-7 {
      background-image: url("../assets/images/medal_7@2x.png");
    }
    .rank-8 {
      background-image: url("../assets/images/medal_8@2x.png");
    }
    .rank-9 {
      background-image: url("../assets/images/medal_9@2x.png");
    }
    .rank-10 {
      background-image: url("../assets/images/medal_10@2x.png");
    }
  }
}
</style>