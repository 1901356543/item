<template>
  <div class="kuangchi">
    <Header
      :title="$t('lang104')"
      titleColor="#fff"
      :leftIcon="require('../../assets/images/top_return_white@2x.png')"
    />
    
    <div class="title">
      <ul>
        <li>币种/价格</li>
        <li>持币算力</li>
        <li>
          日收益
          <img src="../../assets/images/retrieval_in.png" alt />
        </li>
        <li>
          累计收益
          <img src="../../assets/images/retrieval_in.png" alt />
        </li>
      </ul>
    </div>

    <!-- 展示列表 -->
    <div class="contest">
      <van-list v-model="loading" :finished="finished" @load="onLoad">
        <div class="cell" v-for="item in list" :key="item">
          <img src="../../assets/images/notice_head_portrait.png" alt />
          <div class="list">
            <div class="top">
              <ul>
                <li>SGY</li>
                <li>0.000006</li>
                <li>20.8</li>
                <li>3580.20</li>
              </ul>
            </div>
            <div class="buttom">
              <ul>
                <li>¥51057</li>
                <li>¥0.005</li>
                <li>¥22.4</li>
                <li>¥4003.52</li>
              </ul>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
// 引入vant组件
import Vue from "vue";
import { List, Cell } from "vant";
Vue.use(List).use(Cell);

export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      headColor: "transparent"
    };
  },

  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.kuangchi {
  height: 100%;
  width: 100%;
  .header {
    background: linear-gradient(
      315deg,
      rgba(251, 59, 91, 1) 0%,
      rgba(255, 103, 128, 1) 100%
    );
  }
  .title {
    position: fixed;
    width: 100%;
    height: 35px;
    top: 50px;
    right: 0;
    left: 0;
    padding-top: 15px;
    background: #fff;
    z-index: 100;
    ul {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px 0 15px;
      li {
        color: rgba(167, 167, 167, 1);
        font-size: 10px;
        margin-left: 5px;
        margin-right: 8px;
        position: relative;
        img {
          position: absolute;
          width: 6px;
          height: 9px;
          top: 8px;
          right: -8px;
        }
      }
    }
  }
  .contest {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    padding: 0 15px 0 15px;
    .cell {
      height: 58px;
      width: 100%;
      border-bottom: 0.5px solid #ebedf0;
      img {
        height: 32px;
        width: 32px;
        float: left;
        margin-top: 14px;
      }
      .list {
        .top {
          ul {
            padding-top: 15px;
            display: flex;
            justify-content: space-between;
            li {
              font-size: 14px;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: rgba(51, 51, 51, 1);
              line-height: 14px;
              margin-left: 5px;
            }
          }
        }
        .buttom {
          ul {
            padding-top: 2px;
            display: flex;
            justify-content: space-between;
            li {
              margin-left: 5px;
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(167, 167, 167, 1);
            }
          }
        }
      }
    }
  }
}
</style>