<template>
    <div class="home">
         <Header :title="$t(`adr9`)" :leftShow='false' />
        <section class="markets">
            <!-- <div class="title">{{$t('adr9')}}</div> -->
            <ul class="market-menu" v-if="marketMenuList.length > 1">
                <li @click="clickMarketMenu(0)" :class="{active : marketMenuActive == 0}"><span>{{$t('lang28')}}</span></li>
                <li @click="clickMarketMenu(1)" :class="{active : marketMenuActive == 1}"><span>{{$t('lang29')}}</span></li>
                <li @click="clickMarketMenu(2)" :class="{active : marketMenuActive == 2}"><span>{{$t('lang30')}}</span></li>
            </ul>
            <ul class="market-menu market-coin" v-if="coinList.length >= 2" >
                <li @click="clickQuoteCoin(item)" :class="{active : quoteCoin == item}" v-for="item in coinList" :key="item"><span>{{item.toUpperCase()}}</span></li>
            </ul>
            <div class="markebox markebox2">
                <div class="le">
                    {{$t('svg53')}}
                </div>
                <div class="cen">
                    {{$t('svg54')}}
                </div>
                <div class="rig">
                    {{$t('svg55')}}
                </div>
            </div>
            <div class="markebox" v-for="item in marketList" v-if="marketList.length > 0" :key="item.v" @click="clickTrade(item)">
                <div class="le">
                    <div class="top">{{unitCoin(item.left.currency)}}<span>/{{unitCoin(item.right.currency)}}</span></div>
                    <div class="last">24h&nbsp;{{item.open && item.v || '-'}}</div>
                </div>
                <div class="cen">
                    <div class="top" :class="!item.open ? '' : item.ttm * 1 >= 0 ? 'down' : 'up'">{{item.open && toFixedNumber(item.price, 4) || '-'}}</div>
                    <div class="last">≈ {{item.open && getCurrencyPrice(item) || '-'}} {{moneyUnit}}</div>
                </div>
                <div class="rig">
                    <div class="bt" :class="!item.open ? '' : item.ttm * 1 >= 0 ? 'buybg' : 'sellbg'">{{item.open && item.ttm || '-'}}%</div>
                </div>
            </div>
            <empty v-if="marketList.length <= 0"></empty>
        </section>
    </div>
</template>

<script>
    import Swiper from "swiper";
    import SwiperCss from "swiper/css/swiper.css";
    // @ is an alias to /src
    export default {
        name: "home",
        data() {
            return {
                hidden: false,
                isShowPswModal: false,
                swiper: null,
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
                this.coinListChange();
                this.marketMenuChange();
            },
            marketMenuActive (){
                this.marketMenuChange();
            }
        },
        mounted() {
            if(this.quote.main){
                this.coinListChange();
                this.marketMenuChange();
            }
        },

        methods: {

            clickMarketMenu(index) {
                this.marketMenuActive = index;
            },
            coinListChange (){
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
        },
        components: {}
    };
</script>
<style lang="scss">
    .swiper-pagination-bullet-active {
        background: $white;
    }
    .swiper-pagination-bullet {
        opacity: 0.6;
    }
    .swiper-container-horizontal > .swiper-pagination-bullets {
        bottom: 0px;
    }
</style>
<style lang="scss" scoped>
    // xm start
    .header{
        border-bottom: solid 1px $border;
    }
    .market-menu{
        display: flex;
        height: 50px;
        padding: 0 30px;
        justify-content: space-between;
        &.market-coin{
            padding: 0;
            height: 40px;
            li{
                font-size: 14px;
                &.active{
                    color: rgba($active, 0.8);
                    span{
                        &:before{
                            border-bottom: solid 2px rgba($active, 0.5);
                        }
                    }
                }
            }
        }
        li{
            display: flex;
            font-size: 16px;
            align-items: center;
            color: $color1;
            cursor: pointer;
            &.active{
                color: $active;
                span{
                    &:before{
                        border-bottom: solid 2px $active;
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
    .home {
        padding-bottom: 50px;
        .markets {
            margin: 0 0px;
            padding-top: 50px;
            .title {
                font-size: 18px;
                color: $active;
                border-bottom: 1px solid $bg3;
                padding: 15px 0;
            }
            .markebox {
                border-bottom: 1px solid $bg3;
                padding: 15px 15px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: $active;
                &.markebox2{
                    padding: 5px 15px;
                    color: $color1;
                }
                .le {
                    .top {
                        color: $active;
                        font-size: 16px;
                        span {
                            font-size: 12px;
                            color: $primary;
                        }
                    }
                    .last {
                        font-size: 12px;
                        color: $primary;
                    }
                }
                .cen {
                    text-align: center;
                    .top {
                        font-size: 16px;
                        color: $active;
                    }
                    .last {
                        font-size: 12px;
                        color: $primary;
                    }
                }
                .rig {
                    .bt {
                        font-size: 14px;
                        color: $white;
                        width: 75px;
                        height: 35px;
                        line-height: 35px;
                        text-align: center;
                        background: $color1;
                    }
                }
            }
        }
    }
</style>

