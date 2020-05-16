<template>
  <section class="dig-mine">
    <Header title="挖矿" />
    <div class="container">
      <!--  -->
      <div class="mine-card-info">
        <!-- 激活 -->
        <div class="mine-card-activated" v-show="false">
          <div class="ystd-profit">昨日收益</div>
          <div class="profit">25883.0422 RCP</div>
          <div class="cash">≈368940.66 CNY</div>
          <i class="eye"></i>
        </div>
        <!-- 未激活 -->
        <div class="mine-card-unactivated" v-show="true">
          <div class="state">未激活</div>
          <div class="statement">持有100RCP激活挖矿</div>
          <span class="to-activate" @click="showActivatedModal">立即激活</span>
        </div>
      </div>
      <!-- X算力 -->
      <div class="x-calc-power calc-power-group">
        <div class="icon-subtitle">
          <i class="icon"></i>
          <span class="subtitle">X算力</span>
        </div>
        <div class="divider"></div>
        <div class="calc-power-row">
          <span class="cal-power-value">100.15</span>
        </div>
        <div class="divider"></div>
        <div class="power-item">
          <div class="power-item-name">基础算力</div>
          <div class="power-item-value">100</div>
        </div>
        <div class="divider"></div>
        <div class="power-item">
          <div class="power-item-name">加成算力</div>
          <div class="power-item-value">50</div>
        </div>
        <div class="divider"></div>
        <div class="power-item">
          <div class="power-item-name">Y算力加成</div>
          <div class="power-item-value">80%</div>
        </div>
        <div class="divider"></div>
        <div class="power-item">
          <div class="power-item-name">币龄算力</div>
          <div class="power-item-value">20%</div>
        </div>
      </div>
      <!-- Y算力 -->
      <div class="y-calc-power calc-power-group">
        <div class="icon-subtitle">
          <i class="icon"></i>
          <span class="subtitle">Y算力</span>
        </div>
        <div class="divider"></div>
        <div class="power-item">
          <div class="power-item-name">α算子</div>
          <div class="power-item-value">
            100
            <i class="power-item-arrow"></i>
          </div>
        </div>
        <div class="divider"></div>
        <div class="power-item">
          <div class="power-item-name">β算子</div>
          <div class="power-item-value">
            40
            <i class="power-item-arrow"></i>
          </div>
        </div>
      </div>
      <!-- 最近一周收益 -->
      <div class="last-week-profit calc-power-group">
        <div class="icon-subtitle">
          <i class="icon"></i>
          <span class="subtitle">最近一周收益</span>
        </div>
        <div class="divider"></div>
        <div class="profit-chart">
          <div class="chart-content">
            <div class="pillar-group" v-show="false">
              <div class="pillar" style="height:120px"></div>
              <div class="pillar"></div>
              <div class="pillar" style="height:200px"></div>
              <div class="pillar"></div>
              <div class="pillar"></div>
              <div class="pillar"></div>
              <div class="pillar"></div>
            </div>
            <div class="no-data">
              <i class="no-data-logo"></i>
              <div class="no-data-note">暂无数据</div>
            </div>
          </div>
          <div class="divider inside-chart"></div>
          <div class="date-group">
            <div class="date">11/03</div>
            <div class="date">11/03</div>
            <div class="date">11/03</div>
            <div class="date">11/03</div>
            <div class="date">11/03</div>
            <div class="date">11/03</div>
            <div class="date">11/03</div>
          </div>
        </div>
      </div>
    </div>
    <r-modal title="激活提示"
             @on-ok="submitActive"
             :show="isShowModal"
             @on-cancel="isShowModal = false">
      <p class="active-content">激活需要持有100RCP激活</p>
    </r-modal>
  </section>
</template>

<script>
export default {
  data(){
    return{
      isShowModal: false
    }
  },
  methods: {
    submitActive(){
      this.isShowModal = false;
    },
    showActivatedModal(){
      this.isShowModal = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.dig-mine {
  background-color: $bodybg;
  .container {
    padding-top: 70px;
    margin: 0 15px;

    .divider {
      background: $inpBg;
      height: 1px;
      margin: 0 -15px;
    }

    .power-item {
      padding: 15px 0;
      overflow: hidden;
      font-size: 14px;
      .power-item-name {
        float: left;
        color: $color1;
      }
      .power-item-value {
        float: right;
        color: $active;
        .power-item-arrow {
          margin-left: 6px;
          width: 7px;
          height: 9px;
          background-image: url("../../assets/images/triangle@2x.png");
          background-size: 100% 100%;
          display: inline-block;
        }
      }
    }

    .calc-power-group {
      margin: 15px 0;
      padding: 14px 15px 0px;
      background: $border2;
      color: $white;
      box-shadow:0px 6px 10px 0px rgba(0,0,0,0.06);
    }

    .icon-subtitle {
      margin-bottom: 14px;
      .icon {
        vertical-align: middle;
        margin-right: 8px;
        display: inline-block;
        background-size: 100% 100%;
        width: 14px;
        height: 14px;
        margin-top: -2px;
      }
      .subtitle {
        font-size: 12px;
        color: $active;
      }
    }

    .mine-card-info {
      background-image: url("../../assets/images/mining_card_bj@2x.png");
      background-size: 100% 100%;
      padding: 22.5px 20px;
      position: relative;
      .mine-card-activated {
        .ystd-profit {
          color: rgba(255, 255, 255, 1);
          font-size: 16px;
          margin-bottom: 12px;
        }
        .profit {
          font-size: 34px;
          color: $white;
          margin-bottom: 5px;
          font-family: DINAlternate-Bold, DINAlternate;
        }
        .cash {
          font-size: 16px;
          color: $white;
          font-family: LucidaGrande-Bold, LucidaGrande;
        }
        i.eye {
          background-size: 100% 100%;
          background-image: url("../../assets/images/mining_asset_eye@2x.png");
          display: inline-block;
          width: 22px;
          height: 22px;
          position: absolute;
          right: 20px;
          top: 20px;
        }
      }
      .mine-card-unactivated {
        position: relative;
        color: $white;
        overflow: hidden;
        .state {
          font-size: 29px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .statement {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        .to-activate {
          position: absolute;
          right: 0;
          top: 0;
          padding: 6px 12px;
          background-color: $white;
          font-size: 14px;
          color: $blue;
          border-radius: 17px;
        }
      }
    }

    .x-calc-power {
      .icon {
        background-image: url("../../assets/images/mining_x@2x.png");
      }

      .calc-power-row {
        margin: 18px 0;
        font-size: 24px;
        font-weight: bold;
        color: $active;
      }
    }

    .y-calc-power {
      .icon {
        background-image: url("../../assets/images/mining_y@2x.png");
      }
    }

    .last-week-profit {
      position: relative;
      .icon {
        background-image: url("../../assets/images/mining_profit@2x.png");
      }

      .profit-chart {
        padding: 15px 0;

        .pillar-group {
          display: flex;
          align-items: baseline;
          justify-content: space-between;

          .pillar {
            height: 50px;
            width: 16px;
            border-radius: 100px 100px 0 0;
            background:linear-gradient(180deg,rgba(1,101,237,1) 0%,rgba(1,101,237,0) 100%);
          }
        }

        .no-data {
          padding: 47px 0;
          text-align: center;
          i.no-data-logo {
            margin: 0 auto;
            background-image: url("../../assets/images/blank_page@2x.png");
            background-size: 100% 100%;
            display: inline-block;
            border: 1px dashed $color1;
            width: 80px;
            height: 80px;
          }

          .no-data-note {
            color: $color1;
            font-size: 12px;
          }
        }

        .inside-chart {
          margin: 0;
        }

        .date-group {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          .date {
            color: $color1;
            font-size: 10px;
            line-height: 10px;
            margin-top: 8px;
          }
        }
      }
    }
  }
  .active-content{
    text-align: center;
    font-size: 14px;
    color:$color1;
  }
}
</style>