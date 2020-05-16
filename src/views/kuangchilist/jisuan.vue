<template>
    <section class="jisuan">

        <Header :title="unitCoin((coin || '').toUpperCase()) + ' ' + $t('svg11')" />

        <div class="centre">
            <div class="jieguo">
                <img src="../../assets/images/count_=.png" alt />
                <div>
                    <span>{{$t('svg61')}}</span>
                    <strong>{{wkData.y_power || '-'}}</strong>
                </div>
            </div>

            <div class="jslist" v-if="pmax.result">
                <div class="top">
                    <span>
                        + <sup>3</sup>√<ruby>P <small>max</small><rp>(</rp><rt class="rt-bottom">———</rt><rp>)</rp></ruby>
                    </span>
                    <strong>{{pmax.result || '-'}}</strong>
                </div>
                <i></i>
                <div class="bottom">
                    <span>{{$t('svg59')}}</span>
                    <strong>{{pmax.uid}}</strong>
                </div>
            </div>

            <div class="jslist" v-for="(item, index) in list " :key="index">
                <div class="top">
                    <span>
                        + P<sub>{{index + 1}}</sub>
                    </span>
                    <strong>{{item.result}}</strong>
                </div>
                <i></i>
                <div class="bottom">
                    <span>{{$t('svg59')}}</span>
                    <strong>{{item.uid}}</strong>
                </div>
            </div>

        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                list : [],
                wkData : {},
                pmax : {},
            };
        },
        props :['coin'],
        mounted (){
            this.wk_info();
        },
        methods : {
            wk_info (){
                // http://api.sgy.plus/service/wk_info?address=rah9gcjvMEwfAz6HV5eDutbAY5Tnz6nXmj&currency=xrp
                this.axios({
                    url : "/service/wk_info",
                    params : {
                        address : this.account.getAddress(),
                        // address : 'rah9gcjvMEwfAz6HV5eDutbAY5Tnz6nXmj',
                        currency : this.coin.toLowerCase()
                    }
                }).then(data => {
                    console.log(data);
                    this.wkData = data.data || {};
                    let formula = this.wkData.formula || {};
                    this.list = formula.p || [];
                    this.pmax = formula.pmax || [];
                }).catch(e => {
                    console.log(e.message);
                    // this.chart();
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
    .jisuan {
        width: 100%;
        height: 100%;
        background: #F9F9F9;
        .header {
            font-weight: 600;
            border-bottom: 1px solid rgba(233, 233, 233, 1);
        }
        .centre {
            position: absolute;
            top: 50px;
            left: 0;
            right: 0;
            width: 100%;
            height: 100%;
            padding: 0 15px 0 15px;
            background: #F9F9F9;
            overflow-x: hidden;
            overflow-y: auto;
            padding-bottom: 50px;
            .jieguo {
                width: 100%;
                height: 40px;
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.06);
                border-radius: 5px;
                margin: 15px 0 15px 0;
                display: flex;
                align-items: center;
                img {
                    width: 14px;
                    height: 14px;
                    display: block;
                    margin-left: 15px;
                    margin-right: 10px;
                }
                div {
                    width: 100%;
                    height: 100%;
                    span {
                        float: left;
                        font-size: 12px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 500;
                        color: #333;
                        line-height: 40px;
                    }
                    strong {
                        float: right;
                        line-height: 40px;
                        font-size: 16px;
                        margin-right: 15px;
                        color: rgba(251, 59, 91, 1);
                        font-weight: bold;
                    }
                }
            }
            .jslist {
                width: 100%;
                height: 84px;
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.06);
                border-radius: 5px;
                position: relative;
                margin-bottom: 15px;
                i {
                    height: 1px;
                    width: 100%;
                    background: rgba(0, 0, 0, 1);
                    opacity: 0.1;
                    position: absolute;
                }
                .top {
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    padding: 0 15px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    img {
                        float: left;
                        width: 14px;
                        height: 14px;
                        margin: 13px 15px 0 10px;
                    }
                    span {
                        color: $blue;
                    }
                    strong {
                        font-size: 16px;
                        color: $blue;
                    }
                    .rt-bottom{
                        border-bottom: solid 1px $blue;
                        text-indent: -9999px;
                    }
                }
                .bottom {
                    width: 100%;
                    height: 44px;
                    line-height: 44px;
                    display: flex;
                    justify-content: space-between;
                    span {
                        margin-left: 15px;
                        font-size: 14px;
                        color: rgba(167, 167, 167, 1);
                    }
                    strong {
                        margin-right: 15px;
                        font-size: 14px;
                        font-weight: normal;

                    }
                }
            }
        }
    }
</style>