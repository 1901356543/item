<template>
    <section class="zcdetail">
        <Header title="众筹详情"/>

        <div class="content">

            <!-- 头部信息 -->
            <div class="cephalic">
                <div class="logo">
                    <img src="../../assets/images/solitaire@2x.png" alt="">
                </div>
                <div class="text">
                    <p>
                        <strong>ZPT</strong>
                        <span class="right">Zeepin</span>
                    </p>
                    <p>
                        <span>众筹状态：</span>
                        <span class="color">进行中</span>
                    </p>
                </div>
            </div>

            <!-- 时间 -->
            <div class="time">
                <p>
                    <span>时间：</span>
                    <strong>03/01-06/23</strong>
                </p>
            </div>

            <!-- 众筹数量 -->
            <div class="grid">
                <div class="hoc">
                    <table>
                        <tr class="right">
                            <th>众筹数量</th>
                            <td>1级150000 ZPT</td>
                            <td>1级150000 ZPT</td>
                            <td>1级150000 ZPT</td>
                            <td>1级150000 ZPT</td>
                            <td>1级150000 ZPT</td>
                        </tr>
                        <tr>
                            <th>限购数量</th>
                            <td>1级150000 ZPT</td>
                            <td>1级150000 ZPT</td>
                            <td>1级150000 ZPT</td>
                            <td>1级150000 ZPT</td>
                            <td>1级150000 ZPT</td>
                        </tr>
                    </table>
                </div>
            </div>

            <!-- 接受币种 -->
            <div class="bzkind">
                <p>
                    <span>接受币种：</span>
                    <strong>ETH、BTC、PYC、VBC</strong>
                </p>
            </div>

            <!-- 众筹价格 -->
            <div class="gire">
                <h2>众筹价格</h2>
                <p>1 HelloEOS=0.010000 ETH</p>
                <p>1 HelloEOS=0.010000 ETH</p>
                <p>1 HelloEOS=0.010000 ETH</p>
                <p>1 HelloEOS=0.010000 ETH</p>
            </div>

            <i class="box"></i>
            
            <!-- 简介 -->
            <div class="synopsis">
                <h2>简介</h2>
                <p>
                    ZPT，前身是ZPT，是一个区块链平台，具有领先的隐私保护技术，为每个人提供隐私安全，并赋予其对数字活动记录的完整控制权。ZPT拥有可持续的融资模式，并配备了协议层解决方案。ZPT平台令加密货币之外的日常生活用途变为可能，包括与他人进行私密聊天的功能。
                </p>
            </div>

             <!-- 信息 -->
            <div class="message ">
                <p>
                    <strong>发行时间</strong>
                    <span>2018/07/01</span>
                </p>
                <p>
                    <strong>总发行量</strong>
                    <span>21,000万</span>
                </p>
                <p>
                    <strong>白皮书</strong>
                    <span>https://www.horizen.global</span>
                </p>
                <p>
                    <strong>官网</strong>
                    <span>https://www.horizen.global</span>
                </p>
            </div>

        </div>
        <div class="tail ">
            <div class="btn">去众筹</div>
        </div>
    </section>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .zcdetail{
        width: 100%;
        height: 100%;
        .header{
            border-bottom: 0.5px solid rgba(233,233,233,1);
        }
        .content{
            width: 100%;
            height: 100%;
            padding: 50px 15px 0 15px;
            .cephalic{
                padding: 15px 15px 15px 0;
                width: 100%;
                height: 78px;
                border-bottom: 0.5px solid rgba(0,0,0,0.05);
                .logo{
                    float: left;
                    width:48px;
                    height:48px;
                    background:rgba(255,255,255,1);
                    border-radius:3px;
                    border:0.5px solid rgba(0,0,0,0.05);
                    padding: 8px;
                    img{
                        width: 30px;
                        height: 30px;
                    }
                }
                .text{
                    float: left;
                    margin-left: 10px;
                    p{
                        strong{
                            font-size:16px;
                            font-family:PingFangSC-Medium,PingFang SC;
                            font-weight:500;
                            color:rgba(51,51,51,1);
                        }
                        span{
                            font-size:12px;
                            font-family:PingFangSC-Regular,PingFang SC;
                            font-weight:400;
                            color:rgba(169,169,169,1);
                        }
                        .right{
                            margin-left: 5px;
                        }
                        .color{
                            color: #FB3B5B;
                        }
                    }
                }
            }
            .time{
                height: 42px;
                width: 100%;
                line-height: 42px;
                p{
                    span{
                        font-size:12px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(169,169,169,1);
                    }
                    strong{
                        font-size:12px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:#333333;
                    }
                }
            }
            .grid{
                width: 100%;
                overflow: hidden;
                .right{
                    border-right: 0.5px solid rgba(0,0,0,0.08);
                }
               .hoc{
                   width: 100%;
                   overflow: hidden;
                    table{
                        float: left;
                        width: 100%;
                        overflow: hidden;
                        border:0.5px solid rgba(0,0,0,0.08);
                    tr{
                        float: left;
                        width: 50%;
                        background: #F7F9FC;
                        th{
                            padding-left: 10px;
                            height: 36px;
                            font-size:12px;
                            font-family:PingFangSC-Regular,PingFang SC;
                            font-weight:400;
                            color:rgba(169,169,169,1);
                        }
                        td{
                            height: 36px;
                            display: block;
                            border-top: 0.5px solid rgba(0,0,0,0.08);
                            background: #fff;
                            padding-left: 10px;
                            line-height: 36px;
                            font-size:12px;
                            font-family:PingFangSC-Regular,PingFang SC;
                            font-weight:400;
                            color:rgba(51,51,51,1);
                        }
                    }
                }
               }
            }
            .bzkind{
                height: 42px;
                width: 100%;
                line-height: 42px;
                p{
                    height: 100%;
                    width: 100%;
                    span{
                        font-size:12px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(169,169,169,1);
                    }
                    strong{
                        font-size:12px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:#333333;
                    }
                }
            }
            .gire{
                width: 100%;
                overflow: hidden;
                border:0.5px solid rgba(0,0,0,0.08);
                h2{
                    height: 36px;
                    width: 100%;
                    line-height: 36px;
                    font-size:12px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(169,169,169,1);
                    background: #F7F9FC;
                    padding-left: 10px;
                }
                p{  
                    height: 36px;
                    line-height: 36px;
                    border-top: 0.5px solid rgba(0,0,0,0.08);
                    font-size:12px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    padding-left: 10px;
                }
            }
            .box{
                display: block;
                height: 10px;
                width: 100%;
                background: #F7F9FC;
            }
            .synopsis{
                height: 210px;
                width: 100%;
                padding-top: 5px;
                border-bottom: 0.5px solid rgba(0,0,0,0.08);
                h2{
                    font-size:18px;
                    font-family:PingFangSC-Medium,PingFang SC;
                    font-weight:500;
                    color:rgba(51,51,51,1);
                }
                p{
                    font-size:14px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(169,169,169,1);
                    line-height:28px;
                }
            }
            .message{
                height: 210px;
                width: 100%;
                margin-bottom: 65px;
                p{  
                    display: flex;
                    height: 48px;
                    border-bottom: 0.5px solid rgba(0,0,0,0.08);
                    line-height: 48px;
                    justify-content: space-between;
                    strong{
                        font-size:14px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                    }
                    span{
                        font-size:14px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(169,169,169,1);
                    }
                }
            }
        }
            .btn{
                border-radius:3px;
                font-size:16px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:rgba(255,255,255,1);
                z-index: 100;
                bottom: 10px;
                margin: 0 3%;
                width: 94%;
            }
    }
</style>