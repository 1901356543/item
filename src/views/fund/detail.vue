<template>
  <section class="fund-detail">
      <Header title="众筹详情" />
      <div class="container">
          <div class="crowdfunding">
              <div class="coin-crowd">
                  <img src="../../assets/images/convolution@2x.png" alt="">
                  <div class="c-info">
                      <p class="cont">
                          <span class="coin">ZPT</span>
                          <span class="sub-coin">Zeepin</span>
                        </p>
                      <p class="status">众筹状态：<span>预热中</span></p>
                  </div>
              </div>
              <div class="count">
                  <div class="tit">时间：<span>03/01-06/23</span></div>
                  <div class="count-table">
                         <div class="row head">
                          <span>众筹数量</span>
                          <span class="dr"></span>
                          <span>限购数量</span>
                        </div>
                        <div class="row">
                          <span>1级150000 ZPT</span>
                          <span class="dr"></span>
                          <span>1-800 ZEN</span>
                        </div>
                        <div class="row">
                          <span>2级650000 ZPT</span>
                          <span class="dr"></span>

                          <span>1-1000 ZEN</span>
                        </div>
                        <div class="row">
                          <span>3级9150000 ZPT</span>
                          <span class="dr"></span>

                          <span>1-2000 ZEN</span>
                        </div>
                  </div>
              </div>
              <div class="price">
                  <div class="tit">接受币种：ETH、BTC、PYC、VBC</div>
                  <div class="price-table">
                      <div class="row head">众筹价格</div>
                      <div class="row">1 HelloEOS=0.010000 ETH</div>
                      <div class="row">1 HelloEOS=0.010000 PYC</div>
                      <div class="row">1 HelloEOS=0.010000 VBC</div>
                  </div>
              </div>
          </div>
          <div class="intro">
              <div class="tit">简介</div>
              <div class="intro-content">
                  ZPT，前身是ZPT，是一个区块链平台，具有领先的隐私保护技术，为每个人提供隐私安全，并赋予其对数字活动记录的完整控制权。ZPT拥有可持续的融资模式，并配备了协议层解决方案。ZPT平台令加密货币之外的日常生活用途变为可能，包括与他人进行私密聊天的功能。
              </div>
              <div class="int-flex">
                  <span>发行时间</span>
                  <span class="d">2018/07/01</span>
              </div>
              <div class="int-flex">
                  <span>总发行量</span>
                  <span class="d">21,000万</span>
              </div>
              <div class="int-flex">
                  <span>白皮书</span>
                  <span class="d">https://www.horizen.global</span>
              </div>
              <div class="int-flex">
                  <span>官网</span>
                  <span class="d">https://www.horizen.global</span>
              </div>
          </div>
      </div>
        <r-button text="确定" width="90%" class="btn-comfirm" @comfirm="submit"></r-button>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.fund-detail{
    padding-bottom: 15px;
    .container{
        padding-top: 60px;
        .crowdfunding{
            padding:0 15px;
            border-bottom: 10px solid #F9F9FB;
            .coin-crowd{
                display: flex;
                padding-bottom: 15px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                img{
                    width: 48px;
                    margin-right: 10px;
                }
                .c-info{
                    .cont{
                        .coin{
                            color: #333333;
                            font-size: 16px;
                            margin-right: 5px;
                        }
                        .sub-coin{
                            font-size: 13px;
                            color: #A9A9A9;
                        }
                    }
                    .status{
                        span{
                            color: #FB3B5B;
                        }
                    }
                }
            }
            .count{
                padding-top: 15px;
                .tit{
                    color: #A9A9A9;
                    margin-bottom: 15px;
                    font-size: 13px;
                    span{
                        color: #333;
                    }
                }
                .count-table{
                    border-top: 1px solid rgba(0, 0, 0, 0.05);
                    border-left: 1px solid rgba(0, 0, 0, 0.05);
                    border-right: 1px solid rgba(0, 0, 0, 0.05);
                    .row{
                        padding: 10px;
                        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                        &.head{
                            background-color: #F9F9FB;
                        }
                        display: flex;
                        justify-content: space-around;
                        position: relative;
                        span:first-child{
                            border-right: 1px solid rgba(0, 0, 0, 0.05);
                        }
                        .dr{
                            height: 100%;
                            width: 1px;
                            background-color: rgba(0, 0, 0, 0.05);
                            position: absolute;
                            top: 0;
                        }
                    }
                }
            }
            .price{
                padding-top: 15px;

                .tit{
                    color: #A9A9A9;
                    margin-bottom: 15px;
                    font-size: 13px;
                    span{
                        color: #333;
                    }
                }
                .price-table{
                    border-top: 1px solid rgba(0, 0, 0, 0.05);
                    border-left: 1px solid rgba(0, 0, 0, 0.05);
                    border-right: 1px solid rgba(0, 0, 0, 0.05);
                    .row{
                        padding: 10px;
                        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                        &.head{
                            background-color: #F9F9FB;
                        }
                    }
                }
            }   
        }
        .intro{
            padding: 15px;
            .tit{
                font-size: 18px;
                color: #333;
                margin-bottom: 12px;
            }
            .intro-content{
                color:#A9A9A9;
                font-size: 14px;
                line-height: 2;
                padding-bottom: 10px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            }
            .int-flex{
                display: flex;
                justify-content: space-between;
                padding: 15px 0;
                border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                span.d{
                    color: #A9A9A9;
                }
            }
        }
    }
}
</style>