<template>
  <section>
      <Header title="移除地址" />
      <div class="container">
          <div class="attention">
              您已备注改地址助记词，请输入正确的助记词，从而移除该地址
          </div>
          <div class="inp-textarea">
              <textarea></textarea>
          </div>
      </div>
      <r-button text="确定" class="btn-confirm"></r-button>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.container{
    padding-top: 70px;
    margin: 0 15px;
    font-size: 14px;
    .attention{
        
        color: $color1;
        margin-bottom: 20px;
    }
    .inp-textarea{
        padding: 15px;
        background-color: $bg9;
        border-radius: 2px;
        textarea{
            background-color: transparent;
            border: none;
            appearance: none;
            color: $active;
            height: 124px;
            width: 100%;
            outline: none;
        }
    }
}
.btn-confirm{
    width: 90%;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}
</style>