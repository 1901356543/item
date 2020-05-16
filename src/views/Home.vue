<template>
    <div class="home">
        <Header :title="$t(`home.home`)"
                :leftShow='false'
                :rightEv='toacceptCoin' :rightIcon="require('../assets/images/add_scan_white@2x(2).png')" ></Header>

        <section class="banner">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <img v-if="$i18n.locale == 'zh' || $i18n.locale == 'zhCN'" src="../assets/images/banner@2x.png" alt="">
                        <img v-else src="../assets/images/banner_English.png" alt="">
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </section>
        <div class="advert">
            <div class="advert_l" @click="adData[0] ? $router.push('/advertDetails/0') : ''">
                <img src="../assets/images/home_horn@2x.png" alt="" srcset="">
                <div>{{adData[0] && adData[0].title || '-'}}</div>
            </div>
            <div class="advert_r" @click="toRoute('advert')">{{$t(`home.home5`)}}</div>
        </div>
        <div class="fenlei">
            <router-link tag="a" to="/zhuanqian">
                <div class="thenav">
                    <img src="../assets/images/transfer@2x.png" alt="" srcset="" >
                    <span class="nav-title">{{$t('adr3')}}</span>
                </div>
            </router-link>
            <router-link tag="a" to="/digMine">
                <div class="thenav">
                    <img src="../assets/images/mining@2x.png" alt="" srcset=""  >
                    <span class="nav-title" >{{$t('adr5')}}</span>
                </div>
            </router-link>

            <router-link tag="a" to="/acceptCoin">
                <div class="thenav">
                    <img src="../assets/images/home_book_icon.png" alt="" srcset=""  >
                    <span class="nav-title" >{{$t('svg7')}}</span>
                </div>
            </router-link>
            <router-link tag="a"   to="/shoukuan">
                <div class="thenav">
                    <img src="../assets/images/receivables@2x.png" alt="" srcset=""  >
                    <span class="nav-title">{{$t('adr1')}}</span>
                </div>
            </router-link>
            <!-- <a tag="a" to="/zhuanqian" @click="dispark">
                <div class="thenav">
                    <img src="../assets/images/trading_competition@2x.png" alt="" srcset="" >
                    <span class="nav-title">{{$t('adr19')}}</span>
                </div>
            </a> -->
        </div>
        <div class="fenlei" v-if="isTrade">
            <router-link tag="a"   to="/appleCoin">
                <div class="thenav">
                    <img src="../assets/images/convolution@2x.png" alt="" srcset=""  >
                    <span class="nav-title">{{$t('svg65')}}</span>
                </div>
            </router-link>
            <a tag="a"   to="/bizhongapply" @click="dispark">
                <div class="thenav">

                    <img src="../assets/images/home_dapp_icon.png" alt="" srcset=""  >
                    <span class="nav-title">{{$t('adr18')}}</span>
                </div>
            </a>
            <!-- <router-link tag="a" to="/invite" >
                <div class="thenav">
                    <img src="../assets/images/my_share@2x.png" alt="" srcset=""  >
                    <span class="nav-title" >{{$t('adr4')}}</span>
                </div>
            </router-link> -->

            <router-link tag="a" to="/bizhongapply" >
                <div class="thenav">
                    <img src="../assets/images/transaction@2x.png" alt="" srcset="" >
                    <span class="nav-title">{{$t('svg6')}}</span>
                </div>
            </router-link>
            <!--<a tag="a" to="/dapp" @click="clickBinding">-->
            <a tag="a" to="/dapp" @click="dispark">
                <div class="thenav">
                    <img src="../assets/images/activation@2x.png" alt="" srcset=""  >
                    <span class="nav-title" >{{$t('lang48')}}</span>
                </div>
            </a>
        </div>

        <!--<div class="coininfosbox" v-if="mainMarket.length > 0">
            <div class="itembox" v-for="item in mainMarket" :key="item.v" @click="clickTrade(item)">
                <div class="text1">{{unitCoin(item.left.currency)}}/{{unitCoin(item.right.currency)}}</div>
                <div class="text2 up">{{toFixedNumber(item.price, 4) || '-'}} {{unitCoin(item.right.currency)}}</div>
                &lt;!&ndash;<div class="text3" :class="item %2 == 0?'down':'up'">-%</div>&ndash;&gt;
                <div class="text4">≈ {{getCurrencyPrice(item)}} {{moneyUnit}}</div>
            </div>
            <div class="itembox" v-if="mainMarket.length <= 2" v-for="item in mainMarket" @click="clickTrade(item)">
                <div class="text1">{{unitCoin(item.left.currency)}}/{{unitCoin(item.right.currency)}}</div>
                <div class="text2 up">{{toFixedNumber(item.price, 4) || '-'}} {{unitCoin(item.right.currency)}}</div>
                &lt;!&ndash;<div class="text3" :class="item %2 == 0?'down':'up'">-%</div>&ndash;&gt;
                <div class="text4">≈ {{getCurrencyPrice(item)}} {{moneyUnit}}</div>
            </div>
            <div class="itembox" v-if="mainMarket.length <= 1" v-for="item in mainMarket" @click="clickTrade(item)">
                <div class="text1">{{unitCoin(item.left.currency)}}/{{unitCoin(item.right.currency)}}</div>
                <div class="text2 up">{{toFixedNumber(item.price, 4) || '-'}} {{unitCoin(item.right.currency)}}</div>
                &lt;!&ndash;<div class="text3" :class="item %2 == 0?'down':'up'">-%</div>&ndash;&gt;
                <div class="text4">≈ {{getCurrencyPrice(item)}} {{moneyUnit}}</div>
            </div>
            &lt;!&ndash;<div class="itembox" v-for="item in 7" :key="item">&ndash;&gt;
                &lt;!&ndash;<div class="text1">ADR/ADS</div>&ndash;&gt;
                &lt;!&ndash;<div class="text2 up">{{newPrice}} ADS</div>&ndash;&gt;
                &lt;!&ndash;&lt;!&ndash;<div class="text3" :class="item %2 == 0?'down':'up'">-%</div>&ndash;&gt;&ndash;&gt;
                &lt;!&ndash;<div class="text4">≈ {{(decimal(moneyConvert)).toFixed(2)}}&nbsp;{{moneyUnit}}</div>&ndash;&gt;
            &lt;!&ndash;</div>&ndash;&gt;
        </div>-->

        <div class='earningstitle' v-if="isTrade">{{$t('adr7')}}</div>
        <section class="earnings" v-if="isTrade" @click="$router.push('/digMine')">
            <h4>{{earningsLabels[earningsLabels.length - 1] || '-'}} {{$t('adr7')}}</h4>
            <div>
                <span>{{earningsState ? earnings[earnings.length - 1] || '0' : '-'}}</span> {{$t('title')}}
                <p>≈ {{earningsState ? toFixedNumber(decimal.mul((earnings[earnings.length - 1] || 0), moneyConvert), 2) : '-'}} {{moneyUnit}}</p>
            </div>
            <!--<div>-->
                <!--<span>{{toFixedNumber(balancesXRP.value, 4) || '-'}}</span> {{$t('title')}}-->
                <!--<p>≈ {{toFixedNumber(decimal.mul((balancesXRP.value || 0), moneyConvert), 2)}} {{moneyUnit}}</p>-->
            <!--</div>-->
        </section>
        <section class="markets" v-if="isTrade">
            <div class="title">{{$t('adr9')}}</div>
            <ul class="market-menu" v-if="marketMenuList.length > 1">
                <li @click="clickMarketMenu(0)" :class="{active : marketMenuActive == 0}"><span>{{$t('lang28')}}</span></li>
                <li @click="clickMarketMenu(1)" :class="{active : marketMenuActive == 1}"><span>{{$t('lang29')}}</span></li>
                <li @click="clickMarketMenu(2)" :class="{active : marketMenuActive == 2}"><span>{{$t('lang30')}}</span></li>
            </ul>
            <ul class="market-menu market-coin" v-if="coinList.length >= 2" >
                <li @click="clickQuoteCoin(item)" :class="{active : quoteCoin == item}" v-for="item in coinList" :key="item"><span>{{item.toUpperCase()}}</span></li>
            </ul>
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
                marketMenuList : [],
                mainMarket : [],
                coinList : [],
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
            },
        },
        created (){
            this.getEarnings();
        },
        mounted() {
            this.getAd();
            this.banner();
            if(this.quote.main){
                this.coinListChange();
                this.marketMenuChange();
            }
            if(this.account.accounts.backups == false && this.account.accounts.address[0]){
                this.toRoute('/addrDetail/' + this.account.accounts.address[0] + '/1');
            }
        },
        destroyed (){
            // destroy
            if(this.swiper){
                this.swiper.destroy();
            }
        },
        methods: {
            getEarnings (){
                this.axios({
                    url : "/service/wk_info",
                    params : {
                        address : this.account.getAddress(),
                        currency : 'xrp',
                        // address : 'rx08'
                    }
                }).then(data => {
                    // console.log(data);
                    let item = data.data || [];
                    let earnings = [];
                    let earningsLabels = [];
                    if(item._7day_total_profit){
                        let _7day_total_profit = item._7day_total_profit || [];
                        _7day_total_profit.forEach(item => {
                            earnings.push(item.profit);
                            let t = (new Date(item.time));
                            earningsLabels.push((t.getMonth() + 1) + '/' + t.getDate());
                        })
                    }
                    this.$store.commit('earningsState', true);
                    this.$store.commit('earnings', earnings);
                    this.$store.commit('earningsLabels', earningsLabels);
                    if(item.acitve_wk == false){
                        if(this.balancesXRP.value >= item.min_chibi * 1){
                            item.acitve_wk = true;
                        }
                    }
                    this.$store.commit('acitve_wk', item.acitve_wk || false);
                }).catch(e => {
                    console.log(e.message);
                    setTimeout(() => {
                        this.getEarnings();
                    }, 3000)
                    // this.chart();
                })
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
                    // console.log(this.coinList);
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

            clickMy (){
                this.$router.push("/user");
                return true;
            },
            toacceptCoin (){
                this.$router.push("/scanning");
            },
            dispark (){
                this.$toast.show(this.$t('dispark'));
            },
            handleKeyup() {
                console.log(1);
            },
            handleScroll() {
                console.log(2);
            },
            clickMarketMenu(index) {
                this.marketMenuActive = index;
            },
            banner() {
                this.swiper = new Swiper(".swiper-container", {
                    pagination: {
                        el: ".swiper-pagination",
                        dynamicBullets: true
                    },
                    loop: true,
                    autoplay: {
                        delay: 3000,
                        stopOnLastSlide: false,
                        disableOnInteraction: true
                    }
                });
            },
            getAd() {
                this.axios({
                    url: "/service/ad",
                    params: {
                        lan : this.$i18n.locale
                    }
                })
                    .then(res => {
                        // console.log(res);
                        this.$store.commit("adData", res.data || []);
                    })
                    .catch(e => {
                        console.log(e.message);
                        this.$store.commit("adData", []);
                        setTimeout(() => {
                            this.getAd();
                        }, 3000);
                    });
            },
            clickActivate() {},
            toHidden() {
                this.hidden = !this.hidden;
            }
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
        padding-top: 50px;
        padding-bottom: 50px;
        .banner {
            background: $border2;
            padding: 0 15px;
            .swiper-container {
                width: 100%;
                height: 100%;
                border-radius: 5px;
            }
            .swiper-slide {
                height: 150px;
                color: $border3;
                text-align: center;
                font-size: 18px;
                background: $white;

                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .advert {
            border-bottom: 1px solid $bg3;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 10px 15px;
            background: $border2;
            height: 50px;
            color: $active;
            .advert_l {
                display: flex;
                align-items: center;
                width: 84%;
                height: 50px;
                font-size: 14px;
                white-space: nowrap;
                line-height: 50px;
                div::-webkit-scrollbar {
                    display: none;
                }
                div {
                    overflow-x: scroll;
                }
                img {
                    width: 20px;
                    height: 20px;
                    margin-right: 5px;
                }
            }
            .advert_r {
                font-size: 14px;
            }
            .advert_r:hover {
                color: $blue;
            }
        }
        .fenlei {
            background: $bg;
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            justify-content: space-around;
            a{
                display: block;
                min-width: 60px;
            }
            .thenav {
                display: flex;
                flex-direction: column;
                align-items: center;
                line-height: 1.4;
                img {
                    width: 33px;
                    height: 33px;
                }
                span {
                    font-size: 10px;
                    font-weight: 400;
                    margin-top: 7px;
                    color: $color2;
                }
            }
        }
        .coininfosbox::-webkit-scrollbar {
            display: none;
        }
        .coininfosbox {
            background: $bg;
            width: 100%;
            border-top: 10px solid $bg7;
            border-bottom: 10px solid $bg7;
            overflow-y: scroll;
            height: 120px;
            display: flex;
            flex-shrink: 0;
            align-items: center;
            justify-content: space-around;
            .itembox {
                flex-shrink: 0;
                text-transform: uppercase;
                display: inline-block;
                text-align: center;
                width: 33vw !important;
                .text1 {
                    font-size: 12px;
                    color: $active;
                }
                .text2 {
                    font-size: 18px;
                }
                .text4 {
                    font-size: 14px;
                    color: $primary;
                }
            }
        }
        .earningstitle {
            color: $active;
            font-size: 18px;
            padding: 15px;
        }
        .earnings {
            border-bottom: 10px solid $bg7;
            display: block;
            margin: 0 15px;
            padding: 15px;
            color: $white;
            font-size: 18px;
            background: url("../assets/images/home_assets_bj@2x.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            border-radius: 5px;
            h4 {
                font-weight: normal;
                font-size: 14px;
                margin-bottom: 10px;
            }
            div {
                span {
                    font-size: 32px;
                    color: $white;
                }
            }
        }
        .markets {
            margin: 10px 15px;
            .title {
                font-size: 18px;
                color: $active;
                border-bottom: 1px solid $bg3;
                padding: 15px 0;
            }
            .markebox {
                border-bottom: 1px solid $bg3;
                padding: 15px 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: $active;
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

