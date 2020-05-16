<template>
  <section class="beta-power-detail">
    <Header title="β算力明细" />
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
.beta-power-detail {
  .content {
    padding-top: 50px;
  }
}
</style>