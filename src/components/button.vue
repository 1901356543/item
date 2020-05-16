<template>
  <div class="btn-container" @click="comfirm" :style="{width: width, height: height}">
    <button :style="{'background': bgColor, color: btnFontColor}" class="bor-radio">
      <i :class="icon" v-if="icon"></i>
      {{text}}{{submitState ? '...' : ''}}
    </button>
  </div>
</template>
<script>
export default {
  props: {
    submitState: false,
    width: String,
    height: String,
    bgColor: String,
    text: String,
    icon: String,
    btnFontColor: String
  },
  created(){
    console.log(this.bgColor)
  },
  data() {
    return {};
  },
  methods: {
    comfirm() {
      if (this.submitState) return;
      this.$emit("comfirm");
    }
  }
};
</script>
<style lang="scss" scoped>
.btn-container {
  text-align: center;
  margin: 0 auto;
  i {
    width: 22px;
    height: 22px;
    display: inline-block;
    background-size: 100% 100%;
    vertical-align: middle;
    margin-right: 5px;
  }
  i.download_ios {
    background-image: url("../assets/images/download_ios@2x.png");
  }
  i.download_android {
    background-image: url("../assets/images/download_android@2x.png");
  }
  i.download_web {
    background-image: url("../assets/images/download_web@2x.png");
  }
  button {
    height: 46px;
    color: $btnFontColor;
    font-size: 14px;
    width: 100%;
    border: 0;
    font-size: 16px;
    background-color: $blue;
    font-weight: 500;
    &.bor-radio {
      border-radius: 6px;
    }
  }
}
</style>