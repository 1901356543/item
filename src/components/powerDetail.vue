<template>
  <section class="power-detail">
    <div class="chart-head">
      <span>时间</span>
      <span>持币算力</span>
    </div>
    <div class="chart-item" v-for="(item, idx) in list" :key="idx">
      <span class="date">{{item.date}}</span>
      <span class="power">{{item.power}}</span>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    list: Array,
    default: []
  }
};
</script>

<style lang="scss" scoped>
.power-detail {
  padding: 10px 15px;
  .chart-head {
    color: $color1;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
  }
  .chart-item {
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: $active;
  }
}
</style>