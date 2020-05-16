<template>
    <section class="shoukuan">
        <Header  titleColor='#ffffff' :leftIcon="require('../../assets/images/home_search_white.png')" color='transparent'
                 :title="(unitCoin(coin)).toUpperCase() + ' ' + (type == 1 ? $t('svg21') : $t(`wallet.shoukuan1`))"
                 :rightEv='toacceptCoin'
                 :rightIcon="require('../../assets/images/record@2x.png')">

        </Header>
        <div class="content">
            <div class="tab-address">
                <span v-if="mainCoin && type != 1" :class="{active : activeState == 0}" @click="activeState = 0">{{$t('title') + $t('chain')}}</span>
                <span v-if="mainCoin" v-for="(n, i) in mainPushName" :class="{active : activeState == n}" @click="activeState = n">
                    {{(n || '').toUpperCase()}}
                </span>
            </div>
            <div class="erwema">
                <rQrcode v-if="address.length" :qrcodeUrl="address"/>
            </div>
            <div class="adderss">{{address}}</div>
            <r-copy v-if="address.length" :copyText="address">
                <div class="copy">{{$t(`wallet.shoukuan2`)}}</div>
            </r-copy>
        </div>
        <div class="erweim">
            <div class="erbox"  @click="toRoute('/scanning')">
                <img v-if="!showshoukuan" src="../../assets/images/scan_white@2x.png" alt="" srcset="">
                <img   v-else src="../../assets/images/scan_white_prohibit@2x.png" alt="" srcset="">
                <div  :class="showshoukuan?'':'coloractive'">{{$t(`wallet.scanning1`)}}</div>
            </div>
            <div class="erbox">
                <img v-if="showshoukuan" src="../../assets/images/qr_white@2x.png" alt="" srcset="">
                <img v-else src="../../assets/images/qr_white_prohibit@2x.png" alt="" srcset="">
                <div  :class="!showshoukuan?'':'coloractive'">{{type == 1 ? $t('svg16') : $t(`wallet.scanning3`)}}</div>
            </div>
        </div>

    </section>
</template>
<script>
    import { mapState } from "vuex";
    export default {
        name: "shoukuan",
        props : ['coin','type'],
        data() {
            return {
                activeState: 0,
                showshoukuan: true,
                address: "",
                mainCoin : false,
                mainPushName : [],
            };
        },
        watch : {
            activeState (n, o){
                this.addresUpdate();
                if(n != 0){
                    if(this.isjihuo == false){
                        this.$toast.show(this.$t('home.home8'));
                        return;
                    }
                    // this.$store.commit("isTrustBtc", true);
                    if(this.gatewayBalances[this.coin.toLowerCase()]){
                    // if(this.coin.toUpperCase() == 'UST' && !this.balancesUSDT.counterparty){
                    }else{
                        this.$store.commit("isTrustBtc", true);
                        return;
                    }
                }
            }
        },
        created (){

            if(this.coin){
                if(this.chonbi_address[this.coin.toLowerCase()]){
                    this.mainCoin = true;
                    this.mainPushName = Object.keys(this.chonbi_address[this.coin.toLowerCase()]);
                    if(this.type == 1){
                        this.activeState = this.mainPushName[0];
                    }
                }
            }
        },
        mounted() {
            this.addresUpdate();
        },
        computed: {},
        methods: {
            addresUpdate (){
                if(this.activeState == 0){
                    this.address = this.account.getAddress();
                }else{
                    this.address = this.chonbi_address[this.coin.toLowerCase()][this.activeState] || '';
                }
            },
            toacceptCoin() {
                if(this.type == 1){
                    this.$router.push('/acceptCoin4');
                }else{
                    this.$router.push({
                        path: "/acceptCoin",
                        query: {
                            type: 0
                        }
                    });
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    @media screen and (min-height: 600px) {
        .erweim {
            position: absolute;
            bottom: 40px;
            margin: 0 !important;

        }
    }
    .tab-address{
        display: flex;
        height: 50px;
        align-items: center;
        justify-content: center;
        span{
            flex: 1;
            font-size: 16px;
            color: $color1;
            &.active{
                color: $active;
                cursor: pointer;
            }
        }
    }
    .shoukuan {
        padding-top: 50px;
        width: 100%;
        text-align: center;
        display: block;
        height:100%;
        background: $blue;
        box-sizing: border-box;
        .content {
            margin: 50px auto 0 auto;
            width: 90%;
            max-width: 400px;
            min-width: 300px;
            // height: 70vh;
            background: $blue;
            height: 400px;
            overflow: hidden;
            background: url("../../assets/images/qr_bj@2x(1).png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            position: relative;
            text-align: center;
            .erwema {
                margin:  0 auto;
                /*margin-top: 45px;*/
                width: 220px;
                height: 220px;
                img {
                    width: 220px;
                    height: 220px;
                }
            }
            .adderss {
                overflow: hidden;
                margin-top: 70px;
                text-align: center;
                overflow-x: scroll;
                padding: 0 5px;
                font-size: 12px;
                color: $active;
            }
            .adderss::-webkit-scrollbar {
                display: none;
            }
            .copy {
                margin-top: 0px;
                font-size: 12px;
                text-align: center;
                font-weight: 400;
                color: $active;
            }
        }
        .coloractive {
            color: $white !important;
        }
        .erweim {
            width: 100%;
            margin: 40px 0 0;
            display: flex;
            justify-content: space-around;
            background: $blue;
            .erbox {
                color: $color6;
                font-size: 14px;
                img {
                    width: 30px;
                    height: 30px;
                    margin-bottom: 10px;
                }
            }
        }
    }
</style>
