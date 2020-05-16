<template>
  <section class="countdown">
    <div class="title">{{title}}</div>
    <div class="clock">
      <div class="day block">
        <div class="val">{{day}}</div>
        <div class="unit">天</div>
      </div>
      <div class="hour block">
        <div class="val">{{hour}}</div>
        <div class="unit">时</div>
      </div>
      <div class="minute block">
        <div class="val">{{minute}}</div>
        <div class="unit">分</div>
      </div>
      <div class="second block">
        <div class="val">{{second}}</div>
        <div class="unit">秒</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      day: "00",
      hour: "00",
      minute: "00",
      second: "00",
      timer: null,
      time: 0
    };
  },
  props: {
    title: {
      type: String,
      default: "倒计时"
    },
    remainedTime: {
      type: String,
      default: "86410"
    }
  },

  beforeMount() {
    this.time = parseInt(this.remainedTime);
    this.manipulate();
  },
  mounted() {
    this.timer = setInterval(() => {
      this.time--;
      this.manipulate();
    }, 1000);
  },
  methods: {
    manipulate() {
      this.day = this.completeZero(this.time / 86400);
      this.hour = this.completeZero((this.time % 86400) / 3600);
      this.minute = this.completeZero((this.time % 3600) / 60);
      this.second = this.completeZero(this.time % 60);
    },
    completeZero(num) {
      num = parseInt(num);
      if (num < 10) {
        return "0" + num;
      }
      return "" + num;
    }
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>

<style lang="scss" scoped>
.countdown {
  .title {
    color: $color1;
    font-size: 14px;
    margin-bottom: 15px;
  }
  .clock {
    display: flex;
    justify-content: flex-start;

    .block {
      background-color: $inpBg;
      text-align: center;
      padding: 5px 10px;
      margin-right: 10px;
      max-width: 46px;
      border:1px solid rgba(233,233,233,1);
      border-radius: 2px;
      .val {
        color: $active;
        font-size: 22px;
        font-weight: bold;
        font-family:DINAlternate-Bold,DINAlternate;
      }

      .unit {
        color: $color1;
        font-size: 12px;
      }
    }
  }
}
</style>