<template>
    <section class="zcrecord">
        <Header title="记录" />
        <div class="centre">
            <div class="datalist xt">
                <div class="logo">
                    <img src="../../assets/images/solitaire@2x.png" alt="">
                </div>
                <div class="caption ">
                    <strong>ZEN</strong>
                    <span>Horizen</span>
                </div>
                <div class="articular">
                    <p>
                        <span>时间:  </span>
                        <strong>2018/03/01 08:00:00</strong>
                    </p>
                    <p>
                        <span>支付:  </span>
                        <strong>4 ETH</strong>
                    </p>
                    <p>
                        <span>众筹:  </span>
                        <strong>800 ZEN</strong>
                    </p>
                    <p>
                        <span>状态:  </span>
                        <strong class="colour ">待拨币</strong>
                    </p>
                </div>
            </div>

             <div class="datalist">
                <div class="logo">
                    <img src="../../assets/images/solitaire@2x.png" alt="">
                </div>
                <div class="caption ">
                    <strong>ZEN</strong>
                    <span>Horizen</span>
                </div>
                <div class="articular">
                    <p>
                        <span>时间:  </span>
                        <strong>2018/03/01 08:00:00</strong>
                    </p>
                    <p>
                        <span>支付:  </span>
                        <strong>4 ETH</strong>
                    </p>
                    <p>
                        <span>众筹:  </span>
                        <strong>800 ZEN</strong>
                    </p>
                    <p>
                        <span>状态:  </span>
                        <strong class="colour ">待拨币</strong>
                    </p>
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
    .zcrecord{
        height: 100%;
        width: 100%;
        .centre{
            padding-top: 50px;
            width: 100%;
            height: 100%;
            overflow-y: scroll;
            background: #F7F9FC;
            .xt{
                border-top: 0.5px solid rgba(233,233,233,1);
            }
            .datalist{
                height: 145px;
                width: 100%;
                padding: 15px 15px 17px 15px;
                background: #fff;
                margin-bottom: 10px;
                .logo{
                    float: left;
                    width: 84px;
                    height: 84px;
                    padding: 14px;
                    background:rgba(255,255,255,1);
                    border-radius:6px;
                    border:1px solid rgba(0,0,0,0.05);
                    img{
                        width: 54px;
                        height: 54px;
                    }
                }
                .caption{
                    margin-left: 100px;
                    height: 26px;
                    strong{
                        font-size:16px;
                        font-family:PingFangSC-Medium,PingFang SC;
                        font-weight:500;
                        color:rgba(51,51,51,1);
                    }
                    span{
                        font-size:13px;
                        font-family:PingFangSC-Medium,PingFang SC;
                        font-weight:500;
                        color:rgba(169,169,169,1);
                        margin-left: 5px;
                    }
                }
                .articular{
                    float: left;
                    height: 76px;
                    margin-left: 17px;
                    p{
                        span{
                            font-size:12px;
                            font-family:PingFangSC-Regular,PingFang SC;
                            font-weight:400;
                            color:rgba(169,169,169,1);
                            line-height: 3px;
                        }
                        .colour {
                            color: #FB3B5B
                        }
                        strong{
                            font-size:12px;
                            font-family:PingFangSC-Regular,PingFang SC;
                            font-weight:400;
                            color:#333;
                            line-height: 3px;
                            margin-left: 3px;
                        }
                    }
                }
            }
        }
    }
</style>