<template>
  <section class="empty">
    <div class="imgbox">
         <img src="../assets/images/blank_page@2x.png" alt="" srcset="">
    </div>
    <div class="text">暂无数据</div>
  </section>
</template>
<script>
export default {
  name: "empty"
};
</script>
<style lang="scss" scoped>
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px;
  color: $color1;
  .imgbox {
    width: 30%;
    height: 30%;
    min-width: 80px;
    min-height: 80px;
    max-width: 200px;
    max-height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
