<template>
  <section class="record"> 
      <Header title="记录" />
      <div class="container">
          <div class="box">
              <img src="../../assets/images/convolution@2x.png" alt="">
              <div class="box-detail">
                  <div class="coin-info">
                      <span class="coin">XZN</span>
                      <span>Horizen</span>
                  </div>
                  <div class="row">
                      <span>时间：</span>
                      <span>2018/03/01 08:00:</span>
                  </div>
                  <div class="row">
                      <span>支付：</span>
                      <span>4 ETH</span>
                  </div>
                  <div class="row">
                      <span>众筹：</span>
                      <span>800 ZEN</span>
                  </div>
                  <div class="row">
                      <span>状态：</span>
                      <span class="status">待拨币</span>
                  </div>
              </div>
          </div>
      </div>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.container{
    padding-top: 60px;
    .box{
        padding: 15px;
        display: flex;
        border-bottom: 10px solid #F9F9FB;
        img{
            width: 90px;
            height: 90px;
            border:1px solid rgba(0,0,0,0.05);
            margin-right: 12px;
        }
        .box-detail{
            .coin-info{
                color: #A9A9A9;
                .coin{
                    font-size: 16px;
                    color: #333;
                    margin-right: 5px;
                }
            }
            .row{
                color: #333;
                span:first-child{
                    color: #A9A9A9;
                }
                .status{
                    color: #FB3B5B;
                }
            }
        }
    }
}
</style>