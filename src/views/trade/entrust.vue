<template>
    <section class="entrust">
        <div class="nav">
            <div class="nav-l">{{$t(`Trade.weituo`)}}</div>
            <div class="nav-r"  @click="toRoute('lastOrder')">
                <img src="../../assets/images/transaction_record@2x.png" alt="" srcset="">
                <span>{{$t(`Trade.nojilu`)}}</span>
            </div>
        </div>
        <div class="content">
            <load class="load" v-if="isConnected == false"></load>
            <Empty v-if="isConnected && list.length <= 0"></Empty>
            <div v-if="isConnected" class="detais" v-for="item in list" :key="item.properties.sequence" :class="{up : item.specification.direction == 'sell', down : item.specification.direction == 'buy'}">
                <div class="t">
                    <div class="t_l">
                        <span class="type">{{item.specification.direction == 'sell' ? $t(`Trade.cansell`) : $t(`Trade.canbuy`)}}</span>
                        <span class="coin">{{unitCoin(trade.left.currency)}}/{{unitCoin(trade.right.currency)}}</span>
                        <span class="time"> Sequence : {{item.properties.sequence}}</span>
                    </div>
                    <div class="t_r" @click="submitPsw(item)">
                        {{$t(`Trade.cexiaoing`)}}
                    </div>
                </div>
                <div class="c">
                    <div class="textbox">
                        <div class="text1">{{$t(`Trade.price`)}}({{unitCoin(trade.right.currency)}})</div>
                        <div class="tet2">{{item.specification.direction == 'sell'
                            ? (decimal(item.properties.makerExchangeRate).toFixed(4))
                            : (decimal(1).div(item.properties.makerExchangeRate).toFixed(4))}}</div>
                    </div>
                    <div class="textbox textbox2">
                        <div class="text1">{{$t(`wallet.zhuanqian2`)}}({{unitCoin(trade.left.currency)}})</div>
                        <div class="tet2">{{item.specification.quantity.value}}</div>
                    </div>
                    <div class="textbox textbox3">
                        <div class="text1">{{$t(`lang89`)}}({{unitCoin(trade.right.currency)}})</div>
                        <div class="tet2">{{decimal(item.specification.totalPrice.value).toFixed(4)}}</div>
                    </div>
                </div>

            </div>
        </div>
        <r-modal :title="$t(`wallet.zhuanqian10`)"
                 @on-ok="prepareOrderCancellation"
                 :show="isShowPswModal"
                 @on-cancel="isShowPswModal = false">
            <div class="inp-password">
                <input type="password" v-model="password" :placeholder="$t(`wallet.zhuanqian12`)">
            </div>
        </r-modal>
    </section>
</template>
<script>
    export default {
        name: "entrust",
        data() {
            return {
                list : [],
                password : "",
                isShowPswModal : false,
                orderSequence : 0,
            };
        },
        watch : {
            trade (){
                this.getOrders();
            },
            balances (n, o){
                this.getOrders();
            },
        },
        created (){
            if(this.connected){
                this.getOrders();
            };
            // r9pJUTvZ8yKRpvijqEKXfVdPwBB6B8PafK    Sequence 5

        },
        methods : {
            submitPsw (item){
                this.orderSequence = item.properties.sequence;
                if(this.balancesXRP.value * 1 < this.fee){
                    this.$toast.show(this.$t('lang81'));
                    return;
                }
                if(this.pas.length){
                    this.prepareOrderCancellation();
                }else{
                    this.isShowPswModal = true;
                }
            },
            prepareOrderCancellation (){
                this.account.verifyPassword(this.pas || this.password).then(async () => {
                    this.isShowPswModal = false;
                    this.$toast.show(this.$t('lang90'));
                    let seed = await this.account.exportPrivate(this.pas || this.password);
                    this.$store.commit("pas", this.pas || this.password);
                    this.rcp.prepareOrderCancellation(seed, this.orderSequence).then(data => {
                        if(data.engine_result_code == 0){
                            this.$toast.show(this.$t('lang91'));
                        }else{
                            this.xrpMsg(data);
                        }
                    }).catch(e => {
                        console.log(e.message);
                        this.$toast.show(e.message);
                    });
                }).catch(e => {
                    console.log(e.message);
                    this.$toast.show(this.$t('passwordError'));
                });
            },
            getOrders (){
                // this.rcp.api.getOrders(this.account.getAddress(), {
                let {left, right} = this.trade;
                this.rcp.api.getOrders(this.account.getAddress(), {
                    limit : 30
                })
                    .then((data) => {
                        // console.log(JSON.stringify(data, null, 2));
                        let list = [];
                        let orderBalance = {};
                        data.forEach(item => {
                            if(item.specification.direction == 'sell'){
                                orderBalance[item.specification.quantity.currency] = (orderBalance[item.specification.quantity.currency] || 0) + item.specification.quantity.value * 1;
                            }else{
                                orderBalance[item.specification.totalPrice.currency] = (orderBalance[item.specification.totalPrice.currency] || 0) + item.specification.totalPrice.value * 1;
                            }
                            if(
                                item.specification.quantity.currency == left.currency
                                && item.specification.quantity.counterparty == left.counterparty
                                && item.specification.totalPrice.currency == right.currency
                                && item.specification.totalPrice.counterparty == right.counterparty
                            ){
                                list.push(item);
                            }
                        });
                        orderBalance.orderNum = data.length;
                        // console.log(orderBalance);
                        this.$store.commit('orderBalance', orderBalance);
                        list.reverse();
                        this.list =list;
                        // console.log(this.list);
                    }).catch(e => {
                    this.list = [];
                    console.log(e.message);
                });
            },
        }
    };
</script>
<style lang="scss" scoped>
   .entrust {
        margin-top: 20px;
        border-top: 5px solid $bg7;
        padding: 0 15px 80px;
        .nav {
            padding: 15px 0;
            border-bottom: 1px solid $nav-bg;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .nav-l {
                color: $active;
                font-size: 16px;
            }
            .nav-r {
                display: flex;
                align-items: center;
                img {
                    width: 14px;
                    height: 14px;
                    margin-right: 5px;
                }
                color: $color1;
                font-size: 14px;
            }
        }
        .content {
            margin-bottom: 20px;
            .detais {
                padding: 15px 0;
                border-bottom: 1px solid $border;
                &.up {
                    .t{
                        .t_l{
                            .type {
                                color: $up;
                            }
                            .coin {
                                color: $up;
                            }
                        }
                        .t_r{
                            color: $up;
                        }
                    }
                    .c{
                        .textbox {
                            .tet2{
                                color: $up;
                            }
                        }
                    }
                }
                &.down {
                    .t{
                        .t_l{
                            .type {
                                color: $down;
                            }
                            .coin {
                                color: $down;
                            }
                        }
                        .t_r{
                            color: $down;
                        }
                    }
                    .c{
                        .textbox {
                            .tet2{
                                color: $down;
                            }
                        }
                    }
                }
                .t {
                    padding-bottom: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .t_l {
                        font-size: 14px;
                        .type {
                            color: $active;
                        }
                        .coin {
                            color: $active;
                            padding-left: 5px;
                        }
                        .time {
                            color: $color1;
                            font-size: 12px;
                            padding-left: 5px;
                        }
                    }
                    .t_r {
                        padding: 5px 10px;
                        text-align: center;
                        font-size: 12px;
                        background: $bg6;
                        border-radius: 2px;
                        color: $blue;
                    }
                }
                .c {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .textbox3 {
                        text-align: right;
                    }
                    .textbox2 {
                        // text-align: center;
                    }
                    .textbox {
                        width: 33%;
                        font-size: 12px;
                        .text1 {
                            color: $color1;
                            padding-bottom: 5px;
                        }
                        .tet2 {
                            color: $active;
                        }
                    }
                }
            }
        }
    }
</style>
