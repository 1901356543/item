<template>
    <div class="container">
        <Header :title="$t('lang40')"
                :right-icon="require('../../assets/images/record@2x.png')"
                :right-ev="toAccept"/>
        <div class="content">
            <div class="percent common-bg">
                <div class="c-title">
                    <i></i>{{$t('lang71')}}
                </div>
                <div class="count">
                    1 BTC : {{conv.curr_layer_rate || '-'}} {{$t('title')}}
                </div>
                <div class="conv_btc">
                    <small>{{$t('lang84')}} ：{{conv.conv_btc || '-'}} BTC</small>
                </div>
            </div>
            <div class="convolut-list common-bg">

                <div class="con-row">
                    <div class="name">{{$t('lang72')}}</div>
                    <div class="value">
                        <small>({{$t('lang73')}}：{{((conv.last_layer_total_btc || 0) * (conv.last_layer_rate || 0))}} {{$t('title')}})</small>
                        1 BTC : {{conv.last_layer_rate || '-'}} {{$t('title')}}
                    </div>
                    <span :style="{width: '100%', opacity:0.08}"></span>
                </div>

                <div class="con-row">
                    <div class="name">{{$t('lang74')}}</div>
                    <div class="value green">
                        {{$t('lang75')}} {{conv.layer_left_rcp || '-'}} {{$t('title')}}
                        ({{((1 - (conv.layer_left_btc || 0) / (conv.layer_total_btc || 0)) * 100 || 0).toFixed(2)}}%)
                    </div>
                    <span :style="{width: ((1 - (conv.layer_left_btc || 0) / (conv.layer_total_btc || 0)) * 100 || 0).toFixed(2) + '%'}"></span>
                </div>

                <div class="con-row">
                    <div class="name">{{$t('lang76')}}</div>
                    <div class="value">
                        <small>({{$t('lang73')}}：{{((conv.next_layer_total_btc || 0) * (conv.next_layer_rate || 0))}} {{$t('title')}})</small>
                        1 BTC : {{conv.next_layer_rate || '-'}} {{$t('title')}}
                    </div>
                </div>
            </div>
            <div class="profit">
                <div class="pro-title">
                    <p class="p-tit">{{$t('lang77')}}</p>
                    <div class="tips">
                        <span><i></i>{{$t('lang78')}}</span>
                        <span><i></i>{{$t('lang79')}}</span>
                    </div>
                </div>
                <div class="process-bars">
                    <div class="bar blue" :style="{
                        width : achnum.conv_x_achnum > achnum.conv_y_achnum ? '100%' : (100 * (achnum.conv_x_achnum / achnum.conv_y_achnum)).toFixed(2) + '%'
                    }">{{achnum.conv_x_achnum || 0}}</div>
                    <div class="bar green" :style="{
                        width : achnum.conv_y_achnum > achnum.conv_x_achnum ? '100%' : (100 * (achnum.conv_y_achnum / achnum.conv_x_achnum)).toFixed(2) + '%'
                    }">{{achnum.conv_y_achnum || 0}}</div>
                </div>
            </div>
            <r-button :text="$t('lang40')" class="convolut-btn"
                      @comfirm="comfirm"/>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                conv : {},
                achnum : {}
            }
        },
        created (){
            this.getInfo();
            this.getAchnum();
        },
        methods : {
            toAccept(){
                this.$router.push({
                    path: "/acceptCoin2",
                });
            },
            comfirm (){
                if(this.conv.layer_open){
                    this.$router.push({'path': '/exchange/'})
                }else{
                    this.$toast.show(this.$t('lang58'));
                }
            },
            getInfo (){
                this.axios({
                    url : "/service/conv",
                }).then(res => {
                    console.log(res.data);
                    this.conv = res.data;
                }).catch(e => {
                    console.log(e.message);
                });
            },
            getAchnum (){
                this.axios({
                    url : "/service/conv_achnum",
                    params : {
                        address : this.account.getAddress()
                    }
                }).then(res => {
                    console.log(res.data);
                    this.achnum = res.data;
                }).catch(e => {
                    console.log(e.message);
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .conv_btc{
        color: $color1;
        font-size: 18px;
        text-align: right;
    }
    .container{
        padding-top: 70px;
        height: 100%;
        background-color: $bodybg;
        .content{
            margin: 0px 15px;
            & >.common-bg{
                background-color: $border2;
                border-radius: 5px;
                padding: 15px;
                margin-bottom: 20px;
            }
            .percent{
                .c-title{
                    font-size: 12px;
                    color:$active;
                    margin-bottom: 33px;
                    i{
                        display: inline-block;
                        background-size: 100% 100%;
                        background-image: url('../../assets/images/pie_chart@2x.png');
                        width: 14px;
                        height: 14px;
                        margin-right: 10px;
                        vertical-align: middle;
                    }
                }
                .count{
                    font-size: 24px;
                    color: $active;
                    margin-bottom: 5px;
                }
            }
            .convolut-list{
                padding: 0 0;
                .con-row{
                    display: flex;
                    align-items: center;
                    justify-content:  space-between;
                    font-size: 14px;
                    border-bottom: 1px solid $inpBg;
                    position: relative;
                    padding: 0 15px;
                    small{
                        color: $color1;
                    }
                    .name{
                        color: $color1;
                        padding: 15px 0;
                        position: relative;
                        z-index: 10;
                    }
                    .value{
                        color: $active;
                        position: relative;
                        z-index: 10;
                        &.green{
                            color: $active;
                        }
                    }
                    & > span{
                        position: absolute;
                        display: block;
                        z-index: 1;
                        width: 100%;
                        height: 100%;
                        left: 0;
                        top: 0;
                    }
                }
            }
            .profit{
                .pro-title{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                    p.p-tit{
                        font-size: 14px;
                        color: $active;
                    }
                    .tips{
                        span{
                            font-size: 12px;
                            color: $color1;
                            margin-left: 20px;
                            i{
                                width: 8px;
                                height: 8px;
                                display: inline-block;
                                background-color: $blue;
                                border-radius: 4px;
                                margin-right: 5px;
                                vertical-align: middle;
                            }
                            &:nth-child(2){
                                i{
                                    background-color: $down;
                                }
                            }
                        }
                    }
                }
                .process-bars{
                    .bar{
                        padding: 7px 15px;
                        border-top-right-radius: 30px;
                        border-bottom-right-radius: 30px;
                        text-align: right;
                        margin-bottom: 5px;
                        color: $white;
                        font-size: 12px;
                        &.green{
                            background-color: $down;
                        }
                        &.blue{
                            background-color: $blue;
                        }
                    }

                }
            }
            .convolut-btn{
                position: absolute;
                bottom: 20px;
                width: 90%;
            }
        }
    }
</style>