<template>
  <section class="alpha-power-detail">
    <Header title="α算力明细" />
    <div class="content">
      <PowerDetail :list="list" />
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          date: "2019-11-17 08:30",
          power: "500"
        },
        {
          date: "2019-11-17 08:30",
          power: "500"
        },
        {
          date: "2019-11-17 08:30",
          power: "500"
        },
        {
          date: "2019-11-17 08:30",
          power: "500"
        },
        {
          date: "2019-11-17 08:30",
          power: "500"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.alpha-power-detail {
  .content {
    padding-top: 50px;
  }
}
</style>