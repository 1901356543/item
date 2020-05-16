<template>
    <section class="zhongchou">
        <Header title="ZEN众筹" />
        <div class="content">
            <div class="hint">
                <span>*最多可众筹：800 ZEN，1 ZEN=0.005000 ETH</span>
            </div>

            <div class="take">
                <strong>接受币种</strong>
                <span  @click="confirm ()">ETH <img src="../../assets/images/next_black.png" alt=""></span>
            </div>

            <div class="take">
                <strong>数量</strong>
                <input type="text" placeholder="请输入众筹ZEN数量">
            </div>

            <div class="result">
                <span>≈0.000000 ETH</span>
            </div>
        </div>
        <div class="btn" @click="tijiao()">确定</div>

        <!-- 遮罩层 -->
        <div class="modal" v-show="modalbox"></div>
        <div class="dialogbox" v-show="cut">
            <div class="bizhong">
                <span><img src="../../assets/images/eth.png" alt="">ETH</span>
            </div>
             <div class="bizhong">
                <span><img src="../../assets/images/eth.png" alt="">ETH</span>
            </div>
             <div class="bizhong">
                <span><img src="../../assets/images/eth.png" alt="">ETH</span>
            </div>
             <div class="bizhong">
                <span><img src="../../assets/images/eth.png" alt="">ETH</span>
            </div>
             <div class="bizhong">
                <span><img src="../../assets/images/eth.png" alt="">ETH</span>
            </div>

            <div class="quxiao" @click="quxiao()">取消</div>
        </div>

        <div class="password" v-show="password">
            <h2>安全密码</h2>
            <input type="text" placeholder="请输入安全密码">
            <div class="box">
                <span class="qx" @click="qxclick()">取消</span>
                <span class="qd">确定</span>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return{
            cut: false,
            modalbox: false,
            password:false
        }
    },
    methods:{
        quxiao(){
            this.cut = !this.cut
            this.modalbox = !this.modalbox
        },
        confirm (){
            this.cut = !this.cut
            this.modalbox = !this.modalbox
        },
        tijiao(){
            this.modalbox = !this.modalbox
            this.password = !this.password
        },
        qxclick(){
            this.modalbox = !this.modalbox
            this.password = !this.password
        }
    }
}
</script>

<style lang="scss" scoped>
    .zhongchou{
        width: 100%;
        height: 100%;
        .content{
            position: absolute;
            top: 50px;
            left: 0;
            right: 0;
            bottom: 60px;
            padding: 0 15px 0 15px;
            .hint{
                height: 38px;
                width: 100%;
                display: flex;
                align-items: center;
                border-bottom: 0.5px solid rgba(233,233,233,1);
                span{
                    font-size: 12px;
                    font-weight:400;
                    color:rgba(169,169,169,1);
                }
            }
            .take{
                height: 42px;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 0.5px solid rgba(233,233,233,1);
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
                    position: relative;
                    margin-right: 10px;
                    img{
                        position: absolute;
                        top: 6px;
                        right: -12px;
                        width: 10px;
                        height: 10px;
                    }
                }
            }
            .result{
                margin-top: 5px;
                span{
                    font-size:12px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(169,169,169,1);
                }
            }
        }
        .content:after{
            content:"";
            width: 100%;
            height: 0.5px;
            background-color:rgba(233,233,233,1);
            position:absolute;
            top: 0;
            left:0;
            right: 0;
            z-index:1;
        }
        .btn{
            border-radius: 3px;
            font-size:16px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:rgba(255,255,255,1);
        }
        // 遮罩层
        .modal{
            position: absolute;
            left: 0;
            right: 0;
            height: 100%;
            width: 100%;
            background:rgba(0, 0, 0, 0.5);
            opacity:0.5;
            z-Index:999;  
        }
        .dialogbox{
            position: absolute;
            padding: 0 15px 30px 15px;
            width: 100%;
            height: 300px;
            background: #fff;
            bottom: 0;
            left: 0;
            right: 0;
            border-radius: 5px 5px 0 0;
            z-index: 9999;
            overflow: hidden;
            padding: 0 15px 0 15px;
            .bizhong{
                width: 100%;
                height: 48px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-bottom: 0.5px solid rgba(233,233,233,1);
                span{
                    position: relative;
                    font-size:14px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(136,136,136,1);
                    img{
                        width: 16px;
                        height: 16px;
                        top: 3px;
                        left: -20px;
                        position: absolute;
                    }
                }
            }
            .quxiao{
                height: 48px;
                width: 100%;
                text-align: center;
                line-height: 48px;
                font-weight:400;
                color:rgba(136,136,136,1);
                font-size: 14px;
                cursor: pointer;
            }
        }
        .password{
            position: absolute;
            padding: 0 15px 30px 15px;
            width: 95%;
            height: 220px;
            background: #fff;
            top: 214px;
            left: 10px;
            right: 0;
            border-radius: 5px;
            z-index: 9999;
            overflow: hidden;
            padding: 0 15px 0 15px;
            h2{
                text-align: center;
                margin: 30px 0 30px 0;
                font-size:18px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:rgba(51,51,51,1);
            }
            input{
                width: 100%;
                height: 44px;
                border: 0;
                padding: 15px;
                display: block;
                background: #E9E9E9;
                margin-bottom: 25px;
            }
            .box{
                width: 100%;
                height: 44px;
                display: flex;
                justify-content: space-between;
                .qx{
                    width: 48%;
                    background: #fff;
                    font-size:16px;
                    height: 44px;
                    line-height: 44px;
                    font-family:PingFangSC-Medium,PingFang SC;
                    font-weight:500;
                    color:rgba(167,167,167,1);
                    text-align: center;
                    border-radius:6px;
                    border:0.5px solid rgba(151,162,175,1);
                }
                .qd{
                    width: 48%;
                    background: #FB3B5B;
                    font-size:16px;
                    height: 44px;
                    line-height: 44px;
                    font-family:PingFangSC-Medium,PingFang SC;
                    font-weight:500;
                    color:rgba(167,167,167,1);
                    text-align: center;
                    border-radius:5px;
                }
            }
        }
    }
</style>