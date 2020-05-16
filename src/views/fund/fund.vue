<template>
  <section class="fund">
      <Header title="ZEN众筹" righttext="充值ETH"/>
      <div class="container">
          <div class="tips">*最多可众筹：800 ZEN，1 ZEN=0.005000 ETH</div>
          <div class="inps">
              <span class="inp-tit">接受币种</span>
              <span class="coin">ETH <i></i></span>
          </div>
          <div class="inps">
              <span class="inp-tit">数量</span>
              <input type="text" placeholder="请输入众筹ZEN数量" />
          </div>
          <div class="total">≈0.000000 ETH</div>
      </div>
        <r-button text="确定" width="90%" class="btn-comfirm" @comfirm="submit"></r-button>

  </section>
</template>

<script>
export default {
    methods: {
        submit(){}
    }
}
</script>

<style lang="scss" scoped>
.fund{
    .container{
        padding: 60px 15px 0;
        
        .tips{
            color: #A9A9A9;
        }
        .inps{
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            .inp-tit{
                font-size: 14px;
            }
            .coin{
                font-size: 14px;
                i{
                    background-size: 100% 100%;
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    background-image: url('../../assets/images/next_black@2x.png');
                }
            }
            input{
                text-align: right;
            }
        }
        .total{
            color: #A9A9A9;
            margin-top: 12px;
        }
    }
    .btn-comfirm{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 20px;
    }
}
</style>