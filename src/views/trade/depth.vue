<template>
    <section class="depth">
        <div class="top">
            <div>{{$t(`Trade.price`)}}</div>
            <div>{{$t(`wallet.zhuanqian2`)}}</div>
        </div>
        <div class="box" v-if="type != 3" :class="type !=1 ? 'addbox':''">

            <section style="width: 100%;;height: 100%" v-if="newTradeQuote.open || vip">
                <load class="load" v-if="booksState == false"></load>
                <empty v-if="asks.length <= 0 && booksState"></empty>
                <div  v-for="(item, i) in asks" v-if="type == 1 ? i >= (asks.length - 5) : i >= (asks.length - 10)" :key="item.p" class="boxtext" @click="clickPrice(item.p)">
                    <div class="price up">{{item.p}}</div>
                    <div  class="t2">{{item.v}}</div>
                    <span :style="{width : item.t / (type == 1 ? asks5 : asksAll) * 100 + '%'}"></span>
                </div>
            </section>
            <empty v-else></empty>
            <!--<div  v-for="(item, i) in asks" v-if="type == 1 ? i >= (asks.length - 5) : i >= (asks.length - 10)" :key="item.data.index" class="boxtext" @click="clickPrice(decimal(item.properties.makerExchangeRate).toFixed(8) * 1)">-->
                <!--&lt;!&ndash;<div class="price up">{{decimal(1 / item.properties.makerExchangeRate).toFixed(6) * 1}}</div>&ndash;&gt;-->
                <!--<div class="price up">{{decimal(item.properties.makerExchangeRate).toFixed(8) * 1}}</div>-->
                <!--&lt;!&ndash;<div class="price up">{{item.specification.quantity.value}}</div>&ndash;&gt;-->
                <!--<div  class="t2">{{decimal(item.specification.quantity.value).toFixed(4) * 1}}</div>-->
            <!--</div>-->
        </div>

        <div class="all" :class="type ==2 ? 'down':'up'">{{(newTradeQuote.open || vip) && newTradeQuote.price || '-'}}</div>
        <!--<div class="yue">≈ {{newTradeQuote.open || vip ? decimal(newTradeQuote.cny_price || 0).toFixed(2) : '-'}} {{moneyUnit}}</div>-->
        <div class="yue">≈ {{newTradeQuote.open || vip ? getCurrencyPrice(newTradeQuote) : '-'}} {{moneyUnit}}</div>

        <div class="box boxBuy" v-if="type != 2"  :class="type !=1 ? 'addbox':''">
            <section style="width: 100%;height: 100%"  v-if="newTradeQuote.open || vip">
                <load class="load" v-if="bids.length <= 0 && booksState == false"></load>
                <empty v-if="bids.length <= 0 && booksState"></empty>
                <div v-for="(item, i) in bids" v-if="type == 1 ? i < 5 : i < 10" :key="item.p" class="boxtext" @click="clickPrice(item.p)">
                    <div class="price down" >{{item.p}}</div>
                    <div class="t2">{{item.v}}</div>
                    <span :style="{width : item.t / (type == 1 ? bids5 : bidsAll) * 100 + '%'}"></span>
                </div>
            </section>
            <empty v-else></empty>
            <!--<div v-for="(item, i) in bids" v-if="type == 1 ? i < 5 : i < 10" :key="item.data.index" class="boxtext" @click="clickPrice(decimal(1 / item.properties.makerExchangeRate).toFixed(8) * 1)">-->
                <!--<div class="price down" >{{decimal(1 / item.properties.makerExchangeRate).toFixed(8) * 1}}</div>-->
                <!--&lt;!&ndash;<div class="price down">{{item.properties.makerExchangeRate}}</div>&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="price down" >{{item.specification.totalPrice.value}}</div>&ndash;&gt;-->
                <!--<div class="t2">{{decimal(item.specification.quantity.value).toFixed(4) * 1}}</div>-->
            <!--</div>-->
        </div>
        <div class="check">
            <div v-if="type!=1" @click="totype(1)"> <img src="../../assets/images/business@2x.png" alt="" srcset=""></div>
            <div v-if="type==1"  class="noborer"> <img src="../../assets/images/business_press@2x.png" alt="" srcset=""></div>
            <div v-if="type!=3" @click="totype(3)" ><img src="../../assets/images/night_sell@2x.png" alt="" srcset=""></div>
            <div v-if="type==3" class="noborer"><img src="../../assets/images/night_sell_press@2x.png" alt="" srcset=""></div>
            <div v-if="type==2" class="noborer"><img src="../../assets/images/night_buy_press@2x.png" alt="" srcset=""></div>
            <div v-if="type!=2" @click="totype(2)"><img src="../../assets/images/night_buy@2x.png" alt="" srcset=""></div>
        </div>
    </section>
</template>
<script>
    export default {
        name: "depth",
        data(){
            return{
                type : 1,
                bids : [], // 买 buy
                asks : [], // 买 sell
                booksState : false,
                bids5 : 0,
                bidsAll : 0,
                asks5 : 0,
                asksAll : 0,
            }
        },
        watch : {
            trade (){
                // this.getOrderbook();
            },
            balances (n, o){
                // this.getOrderbook();
            },
        },
        created (){
            if(this.connected){
                // this.getOrderbook();
            }

        },
        mounted (){
            this.getOrderbook2();
        },
        methods:{
            getNewPrice (){
                return (this.bids[0] && this.decimal(1 / this.bids[0].properties.makerExchangeRate).toFixed(8) * 1) || 0;
            },
            clickPrice (price){
                this.$store.commit("tradePrice", price)
            },
            totype(index){
                this.type = index;
            },
            getOrderbook2 (){
                let {left, right} = this.trade;
                this.axios({
                    url: process.env.NODE_ENV == 'development' ? "/service/books" : '/service/books',
                    params: {
                        name : this.$t('title').toLowerCase(),
                        count : 20,
                        market : (left.currency || '').toLowerCase() + '_' + (right.currency || '').toLowerCase()
                    }
                })
                    .then(res => {
                        // console.log(res);
                        this.booksState = true;
                        this.disposeBook2(res.data.books || {});
                        setTimeout(() => {
                            this.getOrderbook2();
                        }, 3000);
                    })
                    .catch(e => {
                        this.booksState = true;
                        setTimeout(() => {
                            this.getOrderbook2();
                        }, 3000);
                    });
            },

            disposeBook2 (data){
                let asks = (data.asks || []);
                let asksData = [];
                asks.forEach(item => {
                    if(asksData.length <= 0 || asksData[asksData.length - 1].p != item.p){
                        asksData.push(item);
                    }else{
                        asksData[asksData.length - 1].v = this.decimal(asksData[asksData.length - 1].v * 1 + item.v * 1).toFixed(2);
                    }
                });
                let asks5 = 0;
                let asksAll = 0;
                asksData.forEach((item, index) => {
                    if(index < 5){
                        asks5 += item.v * 1;
                    }
                    asksAll += item.v * 1;
                    item.t = asksAll;
                });
                this.asks = asksData.reverse();
                this.asks5 = asks5;
                this.asksAll = asksAll;

                let bidsData = [];
                let bids = (data.bids || []);
                bids.forEach(item => {
                    if(bidsData.length <= 0 || bidsData[bidsData.length - 1].p != item.p){
                        bidsData.push(item);
                    }else{
                        bidsData[bidsData.length - 1].v = this.decimal(bidsData[bidsData.length - 1].v * 1 + item.v * 1).toFixed(2);
                    }
                });
                let bids5 = 0;
                let bidsAll = 0;
                bidsData.forEach((item, index) => {
                    if(index < 5){
                        bids5 += item.v * 1;
                    }
                    bidsAll += item.v * 1;
                    item.t = bidsAll;
                });
                this.bids5 = bids5;
                this.bidsAll = bidsAll;
                this.bids = bidsData;
            },
            getOrderbook (){
                return;
                let {left, right} = this.trade;
                this.rcp.api.getOrderbook(this.account.getAddress(), {
                    base : Object.assign({}, left),
                    // base : {
                    //     "currency": "ADS",
                    //     "counterparty": "rUv87XRK3nnpfHizwC9eRD1b7xHydXGPkU"
                    // },
                    counter : Object.assign({}, right),
                    // counter : {
                    //     "currency": "UST",
                    //     "counterparty": "rGtFmRDpJdqaYBwuSZPxZqmW4Licb3fCDe"
                    // },
                }, {
                    limit : 5000,
                })
                    .then((data) => {
                        // console.log(JSON.stringify(data, null, 2));
                        // return;
                        this.disposeBook(data);
                        // console.log(asksData, bidsData);
                    }).catch(e => {
                    // this.getOrderbook();
                    console.log(e.message);
                });
            },
            disposeBook (data){
                // console.log(data);
                this.asks = (data.asks || []).reverse();
                this.asks.forEach(item => {
                    item.properties.makerExchangeRate = this.decimal(item.properties.makerExchangeRate).toFixed(8) * 1;
                });
                let asksData = [];
                this.asks.forEach(item => {
                    if(asksData.length <= 0 || asksData[asksData.length - 1].properties.makerExchangeRate != item.properties.makerExchangeRate){
                        asksData.push(item);
                    }else{
                        // console.log(asksData[asksData.length - 1].specification.quantity.value, item.specification.quantity.value);
                        asksData[asksData.length - 1].specification.quantity.value = asksData[asksData.length - 1].specification.quantity.value * 1 + item.specification.quantity.value * 1;
                        asksData[asksData.length - 1].specification.totalPrice.value += asksData[asksData.length - 1].specification.totalPrice.value * 1 + item.specification.totalPrice.value * 1;
                    }
                });
                this.asks = asksData;

                let bidsData = [];
                this.bids = (data.bids || []);
                this.bids.forEach(item => {
                    item.properties.makerExchangeRate = this.decimal(item.properties.makerExchangeRate).toFixed(8) * 1;
                });
                this.bids.forEach(item => {
                    if(bidsData.length <= 0 || bidsData[bidsData.length - 1].properties.makerExchangeRate != item.properties.makerExchangeRate){
                        bidsData.push(item);
                    }else{
                        // console.log(asksData[asksData.length - 1].specification.quantity.value, item.specification.quantity.value);
                        bidsData[bidsData.length - 1].specification.quantity.value = bidsData[bidsData.length - 1].specification.quantity.value * 1 + item.specification.quantity.value * 1;
                        bidsData[bidsData.length - 1].specification.totalPrice.value += bidsData[bidsData.length - 1].specification.totalPrice.value * 1 + item.specification.totalPrice.value * 1;
                    }
                });
                this.bids = bidsData;
                console.log(1 / bidsData[bidsData.length - 1].properties.makerExchangeRate, 1 / bidsData[0].properties.makerExchangeRate);
            },
        },
    };
</script>
<style lang="scss" scoped>
    .depth {
        vertical-align: text-top;
        width: 50%;
        color: $white;
        display: inline-block;
        padding: 0 15px;
        font-size: 12px;
        .empty{
            height: 100%;
            padding: 0 0;
        }
        .load{
            height: 100%;
            min-height: 100%;
        }
        .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 10px;
            color: $color3;
            margin-bottom: 10px;
        }
        .all {
            padding-top: 5px;
            font-size: 14px;
            /*background: rgba($border2, 0.5);*/
            padding-left: 0px;
            box-sizing: border-box;
            height: 25px;
        }
        .yue {
            padding: 0px 0px 5px 0px;
            color: $active;
            font-size: 10px;
            line-height: 1;
            /*background: rgba($border2, 0.5);*/
        }
        .addbox{
            height: 240px !important;
        }
        .box {
            height: 120px;
            overflow-y: scroll;
            display: flex;
            align-items: flex-end;
            align-content: flex-end;
            flex-wrap: wrap;

            &.boxBuy{
                align-items: flex-start;
                align-content: flex-start;
                .boxtext{
                    & > span{
                        background: rgba($down, 0.1);
                    }
                }
            }
            .boxtext {
                position: relative;
                width: 100%;
                height: 24px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                //  padding: 6px 0;
                .t2 {
                    color: $color1;
                }
                & > span{
                    position: absolute;
                    right: 0px;
                    top: 0;
                    z-index: 1;
                    height: 100%;
                    width: 100%;
                    background: rgba($up, 0.1);
                }
            }
        }
        .check{
            display: flex;
            justify-content: flex-end;
            padding-top: 10px;
            .noborer{
                border:none;
            }
            div{
                width: 15px;
                height: 15px;
                margin-left: 15px;
                img{
                    width: 100%;
                    height: 100%;;
                }
            }
        }
    }
</style>

