<template>
    <section class="coininfo">
        <!-- 币种 {{$t(`Trade.`)}}-->
        <div class="coin">
            <div class="coin_l">
                <img  @click="changeopen" src="../../assets/images/transaction_list_lower@2x.png" alt="" srcset="" v-if="!open">
                <img @click="changeopen"  src="../../assets/images/transaction_list_upper@2x.png" alt="" srcset="" v-else>
                <span @click="changeopen" >{{unitCoin(trade.left.currency)}}/{{unitCoin(trade.right.currency)}}</span>
                <div class="fudong" :class="!newTradeQuote.open ? '' : newTradeQuote.ttm > 0 ? 'down' : 'up'">{{newTradeQuote.open && newTradeQuote.ttm || '-'}}%</div>
            </div>
            <div class="coin-r"  @click="toK">
                <img src="../../assets/images/k_line@2x.png" alt="" srcset="">
            </div>
        </div>
        <!-- 币种选择弹窗  @click="changeopen"-->
        <div class="changecoin"  v-if="open">
            <ul class="market-menu" v-if="marketMenuList.length > 1">
                <li @click="clickMarketMenu(0)" :class="{active : marketMenuActive == 0}"><span>{{$t('lang28')}}</span></li>
                <li @click="clickMarketMenu(1)" :class="{active : marketMenuActive == 1}"><span>{{$t('lang29')}}</span></li>
                <li @click="clickMarketMenu(2)" :class="{active : marketMenuActive == 2}"><span>{{$t('lang30')}}</span></li>
            </ul>
            <div class="nav">
                <div> {{$t(`Trade.markets`)}}</div>
                <div>{{$t(`Trade.coin`)}}</div>
                <div>{{$t(`Trade.newprice`)}}</div>
                <div>{{$t(`Trade.tiemup`)}}</div>
            </div>
            <div class="coinall">
                <empty style="width: 100%" v-if="marketList.length <= 0"></empty>
                <div class="coin_l" v-if="marketList.length > 0">
                    <!--<div class="serch" :class="!searchstatus?'':'coloractive'" @click="searchstatus =!searchstatus">-->
                        <!--<img src="../../assets/images/search_gray@2x.png" alt="" srcset="" v-if="!searchstatus">-->
                        <!--<img src="../../assets/images/search_gray_press@2x.png" alt="" srcset="" v-else>-->
                        <!--{{$t(`wallet.serch`)}}-->
                    <!--</div>-->
                    <div @click="clickQuoteCoin(item)" v-for="(item, key) in coinList" :key="item" class="coinbox" :class="item == quoteCoin ?'coloractive':''">
                        {{unitCoin(item)}}
                    </div>
                </div>
                <div class="coin-r" v-if="marketList.length > 0">
                    <!--<div class="search" v-if="searchstatus">
                        <input type="text" :placeholder="$t(`Trade.searchtext`)">
                        <img  @click="searchstatus = false" src="../../assets/images/night_search_delete@2x.png" alt="" srcset="">
                    </div>-->
                    <!--<div @click="clickTrade(item)" class="box" v-for="(item, index) in marketList" :key="item.v" :class="trade.left.currency == item.left.currency && trade.right.currency == item.right.currency ? 'active' : ''">-->
                    <div @click="clickTrade(item)" class="box" v-for="(item, index) in marketList" :key="item.v">
                        <div>{{unitCoin(item.left.currency)}}/{{unitCoin(item.right.currency)}}</div>
                        <div class="c">{{item.open && toFixedNumber(item.price, 4) || '-'}}</div>
                        <div class="num" :class="!item.open ? '' : item.ttm * 1 >= 0 ? 'down' : 'up'">{{item.open && item.ttm || '-'}}%</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        name: "coininfo",
        data() {
            return {
                open: false,
                marketMenuActive: 0,
                mainMarket : [],
                coinList : [],
                marketMenuList : [],
                marketList : [],
                market : {},
                quoteCoin : '',
            };
        },
        watch : {
            quote (){
                if(this.quote.main){
                    this.coinList = Object.keys(this.quote.main);
                    if(this.coinList.length){
                        this.mainMarket = this.quote.main[this.coinList[0]] || [];
                    }else{
                        this.mainMarket = [];
                    }

                }else{
                    this.mainMarket = [];
                }
                this.marketMenuChange();
            },
            marketMenuActive (){
                this.marketMenuChange();
            }
        },
        methods: {
            toK (){
                if(this.newTradeQuote.open || this.vip){
                    this.$router.push('/tradeDetails')
                }else{
                    this.$toast.show(this.$t("svg52"));
                }
            },
            clickMarketMenu(index) {
                this.marketMenuActive = index;
            },
            clickQuoteCoin (coin){
                this.quoteCoin = coin;
                if(this.market[coin]){
                    this.marketList = this.market[coin];
                }else{
                    this.marketList = [];
                }
            },
            quoteKey (param){
                if(param){
                    this.coinList = Object.keys(param);
                    if(this.coinList.length){
                        this.market = param;
                        this.marketList = param[this.coinList[0]];
                        this.quoteCoin = this.coinList[0];
                    }else{
                        this.marketList = [];
                        this.market = {};
                        this.quoteCoin = '';
                    }
                }else{
                    this.coinList = [];
                    this.marketList = [];
                    this.market = {};
                    this.quoteCoin = '';
                }
            },
            marketMenuChange (){
                this.marketMenuList = Object.keys(this.quote);
                if(this.marketMenuActive == 0){
                    this.quoteKey(this.quote.main);
                }else if(this.marketMenuActive == 1){
                    this.quoteKey(this.quote.gem);
                }else{
                    this.quoteKey(this.quote.pink);
                }
            },
            clickTrade (item){
                this.$store.commit('trade', {
                    right : item.right,
                    left : item.left
                });
                this.open = !this.open;
            },
            tochangcoin(key) {
                this.checkcoin = key;
            },
            changeopen() {
                this.open = !this.open;
            }
        }
    };
</script>
<style lang="scss" scoped>
    .market-menu{
        display: flex;
        height: 50px;
        padding: 0 30px;
        justify-content: space-between;
        background: $bg;
        li{
            display: flex;
            font-size: 16px;
            align-items: center;
            color: $color1;
            cursor: pointer;
            &.active{
                color: $blue;
                span{
                    &:before{
                        border-bottom: solid 2px $blue;
                    }
                }
            }
            span{
                display: inline-block;
                position: relative;
                padding: 0 8px;
                text-align: center;
                height: 35px;
                line-height: 35px;
                &:before{
                    display: block;
                    content: '';
                    width: 100%;
                    border-bottom: solid 2px transparent;
                    position: absolute;
                    bottom: 0;
                    left: 0px;
                }
            }
        }
    }
    .coininfo {
        .coin {
            display: flex;
            justify-content: space-between;
            padding: 0px 15px 10px;
            .coin_l {
                display: flex;
                align-items: center;
                img {
                    width: 18px;
                    height: 18px;
                }
                span {
                    margin-left: 5px;
                    color: $active;
                }
                .fudong {
                    text-align: center;
                    margin-left: 10px;
                    line-height: 24px;
                    width: 80px;
                    height: 24px;
                    background: $color1;
                    border-radius: 2px;
                    font-size: 12px;
                    font-weight: 400;
                    color: #ffffff;
                    &.up{
                        color: $up;
                        background: rgba($up, 0.1);
                    }
                    &.down{
                        color: $down;
                        background: rgba($down, 0.1);
                    }
                }
            }
            .coin-r {
                img {
                    width: 22px;
                    height: 22px;
                }
            }
        }
        .changecoin {
            position: absolute;
            width: 100vw;
            min-height: 100%;
            height: 100%;
            background: $bg4;
            left: 0;
            top: 30px;
            z-index: 9999;
            .nav {
                color: $color1;
                height: 42px;
                background: $nav-bg;
                font-size: 14px;
                border-bottom: solid 1px $border;
                div {
                    display: inline-block;
                    line-height: 42px;
                }
                div:nth-child(1) {
                    padding-left: 15px;
                    text-align: left;
                    width: 25%;
                }
                div:nth-child(2) {
                    width: 30%;
                    padding-left: 15px;
                }
                div:nth-child(3) {
                    width: 22.5%;
                }
                div:nth-child(4) {
                    width: 22.5%;
                    padding-right: 15px;
                    text-align: right;
                }
            }
            .coinall {
                font-size: 14px;
                display: flex;
                background: $bg;
                min-height: 60vh;
                overflow: hidden;
                .coin_l {
                    padding: 0 10px;
                    background: $nav-bg;
                    width: 25%;
                    color: $color1;
                    text-align: center;
                    font-size: 16px;
                    box-shadow: 0 0 5px 5px $border;
                    padding-top: 5px;
                    /*border-right: solid 1px $border;*/
                    .serch {
                        padding: 15px 0;
                        img {
                            width: 14px;
                            height: 14px;
                            margin-right: 5px;
                        }
                    }
                    .coinbox {
                        padding: 10px 0;
                    }
                }
                .coin-r {
                    color: $color1;
                    width: 75%;
                    display: inline-block;
                    padding-top: 8px;
                    box-shadow: 0 0 10px 3px rgba($border, 0.08);
                    .search {
                        border: 1px solid $border;
                        height: 40px;
                        display: flex;
                        margin: 15px;
                        justify-content: space-between;
                        align-items: center;
                        padding: 0 5px;
                        input {
                            background: none;
                            border: none;
                            color: $color1;
                            height: 100%;
                        }
                        img {
                            width: 14px;
                            height: 14px;
                        }
                    }
                    .box {
                        padding: 8px 0;
                        display: flex;
/*                        background: $bg;
                        border-bottom: 1px solid $nav-bg;*/
                        justify-content: space-around;
                        font-size: 14px;
                        &.active{
                            color: $blue;
                        }
                        div:nth-child(1) {
                            padding-left: 15px;
                            width: 40%;
                        }
                        div:nth-child(2) {
                            padding-left: 15px;
                            width: 30%;
                        }
                        div:nth-child(3) {
                            text-align: right;
                            padding-right: 15px;
                            width: 30%;
                        }
                    }
                }
            }
        }
    }
</style>
