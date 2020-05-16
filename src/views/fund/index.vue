<template>
  <section class="crowd-funding">
      <Header title="众筹" righttext="记录" :rightEv="goRecord"/>
      <div class="nav-list">
          <span class="active">预热中</span>
          <span>进行中</span>
          <span>已结束</span>
      </div>
      <!-- 预热中 -->
      <div class="box preheating">
            <div class="b-countdown">
                <i></i>
                距开始:<span>{{ list[0].timeStamp }}</span>
            </div>
            <div class="b-info">
                <div class="b-avatar">
                    <img src="../../assets/images/convolution@2x.png" alt="">
                </div>
                <div class="b-detail">
                    <div class="b-coin">
                        <span class="coin">HelloEOS</span>
                        <span class="sub-coin">你好币</span>
                    </div>
                    <div class="b-row">
                        <span class="r-lable">众筹数量：</span>
                        <span>1000 HelloEOS</span>
                    </div>
                    <div class="b-row">
                        <span class="r-lable">接受币种：</span>
                        <span>ETH</span>
                    </div>
                    <div class="b-row">
                        <span class="r-lable">众筹价格：</span>
                        <span>1 HelloEOS=0.01</span>
                    </div>
                </div>
            </div>
      </div>
      <!-- 进行中 -->
      <div class="box progress">
            <div class="b-countdown">
                <i></i>
                距结束:<span>{{this.list[1].timeStamp}}</span>
                <div class="had-fund">
                    <span>已筹 40%</span>
                    <div class="pro-bar">
                        <div class="bar"></div>
                    </div>
                </div>
            </div>
            <div class="b-info">
                <div class="b-avatar">
                    <img src="../../assets/images/convolution@2x.png" alt="">
                </div>
                <div class="b-detail">
                    <div class="b-coin">
                        <span class="coin">HelloEOS</span>
                        <span class="sub-coin">你好币</span>
                    </div>
                    <div class="b-row">
                        <span class="r-lable">众筹数量：</span>
                        <span>1000 HelloEOS</span>
                    </div>
                    <div class="b-row">
                        <span class="r-lable">接受币种：</span>
                        <span>ETH</span>
                    </div>
                    <div class="b-row">
                        <span class="r-lable">众筹价格：</span>
                        <span>1 HelloEOS=0.01</span>
                    </div>
                </div>
                <div class="btn-fund">去众筹</div>
            </div>
      </div>
      <!-- 已结束 -->
      <div class="box progress">
            <div class="b-countdown">
                <i></i>
                已结束
                <div class="had-fund">
                    <span>已筹 40%</span>
                    <div class="pro-bar">
                        <div class="bar"></div>
                    </div>
                </div>
            </div>
            <div class="b-info">
                <div class="b-avatar">
                    <img src="../../assets/images/convolution@2x.png" alt="">
                </div>
                <div class="b-detail">
                    <div class="b-coin">
                        <span class="coin">HelloEOS</span>
                        <span class="sub-coin">你好币</span>
                    </div>
                    <div class="b-row">
                        <span class="r-lable">众筹数量：</span>
                        <span>1000 HelloEOS</span>
                    </div>
                    <div class="b-row">
                        <span class="r-lable">接受币种：</span>
                        <span>ETH</span>
                    </div>
                    <div class="b-row">
                        <span class="r-lable">众筹价格：</span>
                        <span>1 HelloEOS=0.01</span>
                    </div>
                </div>
            </div>
      </div>
  </section>
</template>

<script>
import CountDown from '../../plugins/countdown'

export default {
    mounted() {
        this.startAllCountDown();
    },
    beforeDestroy(){
        this.timer.forEach((val)=>clearInterval(val));
    },
    data() {
        return {
            list: [{
                timeStamp: 1586791800,
                coin: 'HelloEos',
                count: 1000,
                type: 0 //0
            }, {
                timeStamp: 1586878200,
                coin: 'HelloEos1',
                count: 1000,
                type: 0 //0
            }],
            timer: []
        }
    },
    methods:{
        goRecord(){
            console.log('gorecord')
        },
        startAllCountDown() {
            this.list.forEach((val, idx) =>{
                const t = new CountDown(val.timeStamp - parseInt(new Date().getTime() / 1000),
                    (remain) => {
                        const time = {
                            day: Math.floor(remain / 86400),
                            hour: Math.floor(remain / 3600) % 24,
                            min: Math.floor(remain / 60) % 60,
                            sec: remain % 60,
                        };
                        val.timeStamp = `${time.day}天${time.hour}时${time.min}分${time.sec}秒`
                    },
                    () => {console.log(val.coin)})
                .startCountDown(1);
                this.timer.push(t);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.crowd-funding{
    .nav-list{
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 14px;
        color: #A9A9A9;
        box-shadow:0px 2px 14px 0px rgba(30,49,107,0.1);
        padding-top: 60px;
        padding-bottom: 8px;
        span.active{
            color: #FB3B5B;
            position: relative;
        }
        span.active::after{
            content: '';
            display: block;
            height: 2px;
            width: 100%;
            background-color: #FB3B5B;
            position: absolute;
            bottom: -8px;
        }
    }
    .box{
        padding: 15px;
        border-bottom: 10px solid #F7F9FC;
        .b-countdown{
            font-size: 12px;
            color: #A9A9A9;
            margin-bottom: 10px;
            position: relative;
            i{
                display: inline-block;
                width: 12px;
                height: 12px;
                background-image: url('../../assets/images/crowdfunding_time@2x.png');
                background-size: 100% 100%;
            }
            span{
                color: #FB3B5B;
            }
            .had-fund{
                position: absolute;
                right: 0;
                display: flex;
                top: 2px;
                align-items: center;
                span{
                    color: #A9A9A9;

                }
                .pro-bar{
                    margin-left: 5px;
                    width: 78px;
                    height: 3px;
                    background-color: #CCD0D3;
                    border-radius:6px;
                    position: relative;
                    .bar{
                        position: absolute;
                        width: 20%;
                        height: 3px;
                        background-color:#FB3B5B;
                        left: 0;
                    }
                }
            }
        }
        .b-info{
            display: flex;
            position: relative;
            .b-avatar{
                width: 95px;
                height: 95px;
                border:1px solid rgba(0,0,0,0.05);
                margin-right: 12px;
                img{
                    width: 100%;
                }
            }
            .b-detail{
                .b-coin{
                    .coin{
                        color: #333333;
                        font-size: 16px;
                        margin-right: 5px;
                    }
                    .sub-coin{
                        color: #A9A9A9;
                        font-size: 13px;
                    }
                }
                .b-row{
                    font-size: 13px;
                    color: #333;
                    .r-lable{
                        color: #A9A9A9;
                    }
                }
            }
            .btn-fund{
                width: 50px;
                height:20px;
                background-color: #FB3B5B;
                color: #fff;
                text-align: center;
                font-size: 12px;
                line-height: 20px;
                position: absolute;
                right: 0;
                top: 0;
            }
        }
    }
}
</style>