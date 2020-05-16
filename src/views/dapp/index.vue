<template>
    <section class="dapp">
        <div class="header">DAPP</div>
        <div class="bg"></div>
        <div class="content">
            <div class="text1">{{$t('lang55')}}</div>
            <!--<div class="navbox" @click="dispark">
            &lt;!&ndash;<div class="navbox" @click="$router.push({path: '/convolution'})">&ndash;&gt;
                <div class="left">
                    <img src="../../assets/images/convolution@2x.png" alt="" srcset="">
                    <div class="text">
                        <div class="t">{{$t('lang40')}}</div>
                        <div class="l">{{$t('lang41')}}</div>
                    </div>
                </div>
                <div class="r">
                    <img src="../../assets/images/triangle@2x.png" alt="" srcset="">
                </div>
            </div>-->
            <!--<div class="navbox" @click="dispark">-->
            <div class="navbox" @click="$router.push({path: '/digMine'})">
                <div class="left">
                    <img src="../../assets/images/mining@2x.png" alt="" srcset="">
                    <div class="text">
                        <div class="t">{{$t('lang42')}}</div>
                        <div class="l">{{$t('lang43')}}</div>
                    </div>
                </div>
                <div class="r">
                    <img src="../../assets/images/triangle@2x.png" alt="" srcset="">
                </div>
            </div>
            <div class="navbox" @click="toRoute('trade')">
                <!--<div class="navbox" @click="dispark">-->
                <div class="left">
                    <img src="../../assets/images/transaction@2x.png" alt="" srcset="">
                    <div class="text">
                        <div class="t">{{$t('lang44')}}</div>
                        <div class="l">{{$t('lang45')}}</div>
                    </div>
                </div>
                <div class="r">
                    <img src="../../assets/images/triangle@2x.png" alt="" srcset="">
                </div>
            </div>
            <div class="navbox" @click="dispark" v-if="false">
                <div class="left">
                    <img src="../../assets/images/hash@2x.png" alt="" srcset="">
                    <div class="text">
                        <div class="t">{{$t('lang46')}}</div>
                        <div class="l">{{$t('lang47')}}</div>
                    </div>
                </div>
                <div class="r">
                    <img src="../../assets/images/triangle@2x.png" alt="" srcset="">
                </div>
            </div>
            <div class="text1 text2">{{$t('lang48')}}</div>
            <div class="navbox" @click="dispark" to="/xPowerCompaign">
                <div class="left">
                    <img src="../../assets/images/x@2x.png" alt="" srcset="">
                    <div class="text">
                        <div class="t">{{$t('lang49')}}</div>
                    </div>
                </div>
                <div class="r">
                    <img src="../../assets/images/triangle@2x.png" alt="" srcset="">
                </div>
            </div>
            <div class="navbox" @click="dispark" to="/yPowerCompaign">
                <div class="left">
                    <img src="../../assets/images/y@2x.png" alt="" srcset="">
                    <div class="text">
                        <div class="t">{{$t('lang50')}}</div>
                    </div>
                </div>
                <div class="r">
                    <img src="../../assets/images/triangle@2x.png" alt="" srcset="">
                </div>
            </div>
            <div class="navbox" @click="dispark" to="/newbieReward">
                <div class="left">
                    <img src="../../assets/images/award@2x.png" alt="" srcset="">
                    <div class="text">
                        <div class="t">{{$t('lang51')}}</div>
                    </div>
                </div>
                <div class="r">
                    <img src="../../assets/images/triangle@2x.png" alt="" srcset="">
                </div>
            </div>
            <div class="navbox" @click="dispark" to="/tradeCompaign">
                <div class="left">
                    <img src="../../assets/images/trading_competition@2x.png" alt="" srcset="">
                    <div class="text">
                        <div class="t">{{$t('lang52')}}</div>
                    </div>
                </div>
                <div class="r">
                    <img src="../../assets/images/triangle@2x.png" alt="" srcset="">
                </div>
            </div>
            <div class="navbox" @click="dispark" to="/hashGuess">
                <div class="left">
                    <img src="../../assets/images/h@2x.png" alt="" srcset="">
                    <div class="text">
                        <div class="t">{{$t('lang53')}}</div>
                    </div>
                </div>
                <div class="r">
                    <img src="../../assets/images/triangle@2x.png" alt="" srcset="">
                </div>
            </div>
            <div class="navbox" @click="dispark" to="/sequence">
                <div class="left">
                    <img src="../../assets/images/solitaire@2x.png" alt="" srcset="">
                    <div class="text">
                        <div class="t">{{$t('lang54')}}</div>
                    </div>
                </div>
                <div class="r">
                    <img src="../../assets/images/triangle@2x.png" alt="" srcset="">
                </div>
            </div>

            <!--            <div class="navbox" @click="$router.push({path: '/xPowerCompaign'})">
                            <div class="left">
                                <img src="../../assets/images/x@2x.png" alt="" srcset="">
                                <div class="text">
                                    <div class="t">X算力争霸</div>
                                </div>
                            </div>
                            <div class="r">
                                <img src="../../assets/images/triangle@2x.png" alt="" srcset="">
                            </div>
                        </div>

                        <div class="navbox" @click="$router.push({path: '/yPowerCompaign'})">
                            <div class="left">
                                <img src="../../assets/images/y@2x.png" alt="" srcset="">
                                <div class="text">
                                    <div class="t">Y算力竞赛</div>
                                </div>
                            </div>
                            <div class="r">
                                <img src="../../assets/images/triangle@2x.png" alt="" srcset="">
                            </div>
                        </div>
                        <div class="navbox" @click="$router.push({path: '/newbieReward'})">
                            <div class="left">
                                <img src="../../assets/images/award@2x.png" alt="" srcset="">
                                <div class="text">
                                    <div class="t">新人奖</div>
                                </div>
                            </div>
                            <div class="r">
                                <img src="../../assets/images/triangle@2x.png" alt="" srcset="">
                            </div>
                        </div>
                        <div class="navbox" @click="$router.push({path: '/tradeCompaign'})">
                            <div class="left">
                                <img src="../../assets/images/trading_competition@2x.png" alt="" srcset="">
                                <div class="text">
                                    <div class="t">交易大赛</div>
                                </div>
                            </div>
                            <div class="r">
                                <img src="../../assets/images/triangle@2x.png" alt="" srcset="">
                            </div>
                        </div>
                        <div class="navbox" @click="$router.push({path: '/hashGuess'})">
                            <div class="left">
                                <img src="../../assets/images/hash@2x.png" alt="" srcset="">
                                <div class="text">
                                    <div class="t">HASH竞猜</div>
                                </div>
                            </div>
                            <div class="r">
                                <img src="../../assets/images/triangle@2x.png" alt="" srcset="">
                            </div>
                        </div>
                        <div class="navbox" @click="$router.push({path: '/sequence'})">
                            <div class="left">
                                <img src="../../assets/images/solitaire@2x.png" alt="" srcset="">
                                <div class="text">
                                    <div class="t">接龙</div>
                                </div>
                            </div>
                            <div class="r">
                                <img src="../../assets/images/triangle@2x.png" alt="" srcset="">
                            </div>
                        </div>-->
        </div>
    </section>
</template>
<script>
    export default {
        name: "dapp",
        data() {
            return {};
        },
        created() {

        },

        methods: {
            dispark() {
                this.$toast.show(this.$t("dispark"));
            }
        }
    };
</script>
<style lang="scss" scoped>
    // xm 2019/11/21
    .dapp-menu {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        padding: 15px 0;
        a {
            height: 90px;
            display: flex;
            flex-wrap: wrap;
            width: 33%;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
            img {
                display: block;
                width: 30px;
                height: 30px;
            }
            span {
                display: block;
                width: 100%;
                text-align: center;
            }
        }
    }
    .dapp {
        background:linear-gradient(315deg,rgba(0,199,198,1) 0%,rgba(1,101,237,1) 100%);
        padding-bottom: 60px;
        height: 100%;
        .header {
            background: url("../../assets/images/dapp_bj@2x.png");
            height: 60px;
            padding-top: 20px;
            background-repeat: no-repeat;
            background-size: cover;
            color: $white;
            text-align: center;
            font-weight: bold;
        }
        .bg {
            height: 0px;
            margin: 0 15px;
            border-radius: 10px 10px 0px 0px;
            background-image: linear-gradient(
                            270deg,
                            rgba(0, 194, 143, 0) 0%,
                            rgba(0, 255, 0, 1) 100%
            );
        }
        .content {
            margin: 0 15px;
            background: $border2;
            padding: 0 15px;
            border-radius: 8px;
            // border: 10px solid linear-gradient(rgba(0,194,143,0),rgba(0,194,143,1));
            border: 10px solid linear-gradient(red, green);
            .navbox {
                padding: 8px 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left {
                    display: flex;
                    align-items: center;
                    img {
                        width: 35px;
                        height: 35px;
                    }
                    .text {
                        height: 100%;
                        margin-left: 5px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        .t {
                            font-size: 14px;
                            color: $active;
                        }
                        .l {
                            // margin-top: 7px;
                            font-size: 12px;
                            color: $color1;
                        }
                    }
                }
                .r {
                    img {
                        width: 10px;
                        height: 10px;
                    }
                }
            }
            .text1 {
                padding: 15px 0 10px 0;
                color: $active;
                font-size: 14px;
            }
            .text2 {
                margin-top: 5px;
                padding-top: 30px;
                padding-bottom: 8px;
                border-top: 1px solid $border;
            }
        }
    }
</style>
