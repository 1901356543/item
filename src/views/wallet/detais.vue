<template>
    <section class="detais">
        <Header :title="$t(`wallet.txDetails`)" ></Header>
        <load v-if="loadState"></load>
        <section v-else>
            <div class="text" v-if="item.type == 'payment'">
                {{item.address == rcp.address ? '-' : '+'}}
                {{item.specification && item.specification.source.maxAmount.value}}
                {{unitCoin(item.specification && item.specification.source.maxAmount.currency)}}
            </div>
            <div class="text" v-if="item.type == 'trustline'">
                {{item.specification.currency}}
            </div>
            <div class="text2">{{$t('type')}}:</div>
            <div class="text3">
                {{transactionTypeText(item)}}
            </div>
            <template v-if="item.type == 'payment'">
                <div class="text2">{{$t('from')}}:</div>
                <div class="text3" >
                    <r-copy :copyText="item.specification && item.specification.source.address">
                        {{item.specification && item.specification.source.address}}
                    </r-copy>
                </div>
                <div class="text2">{{$t('to')}}:</div>
                <div class="text3">
                    <r-copy :copyText="item.specification && item.specification.destination.address">
                        {{item.specification && item.specification.destination.address}}
                    </r-copy>
                </div>
            </template>
            <template v-if="item.type == 'trustline'">
                <div class="text2">{{$t('gateway')}}:</div>
                <div class="text3">
                    <r-copy :copyText="item.specification.counterparty">
                        {{item.specification.counterparty}}
                    </r-copy>
                </div>
            </template>
            <div class="text2">ID:</div>
            <div class="text3">
                <r-copy :copyText="id">
                    {{id}}
                </r-copy>
            </div>
            <div class="text2">{{$t(`wallet.zhuanqian5`)}}</div>
            <div class="text3">{{item.outcome && item.outcome.fee}} {{$t('title')}}</div>
            <div class="text2">{{$t(`Trade.time`)}}</div>
            <div class="text3">{{item.outcome && item.outcome.timestamp}}</div>
            <div class="text2">{{$t(`ledgerVersion`)}}</div>
            <div class="text3">{{item.outcome && item.outcome.ledgerVersion}}</div>
        </section>

    </section>
</template>
<script>
export default {
  name: "detais",
  props: ["id"],
  data() {
    return {
      loadState: true,
      item: {}
    };
  },
  watch: {
    connected(n, o) {
      if (n != o) {
        this.getTX();
      }
    }
  },
  mounted() {},
  created() {
    this.getTX();
  },
  methods: {
    getTX() {
      this.loadState = true;
      this.rcp.api
        .getTransaction(this.id)
        .then(data => {
          this.loadState = false;
          console.log(data);
          this.item = data;
        })
        .catch(e => {
          this.loadState = false;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.detais {
  overflow: hidden;
  margin-top: 50px;
  padding: 0 15px;
  .text2 {
    font-size: 12px;
    color: $color1;
    padding: 10px 0;
    word-wrap: break-word;
  }
  .text {
    color: $active;
    font-size: 14px;
    padding: 15px 0;
    border-top: 1px solid $border;
    border-bottom: 1px solid $border;
    word-wrap: break-word;
  }
  .text3 {
    padding-bottom: 10px;
    color: $active;
    font-size: 14px;
    width: 100%;
    word-wrap: break-word;
  }
}
</style>

