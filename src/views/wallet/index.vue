<template>
    <section class="walletall">
        <Header :title="$t(`wallet.name`)" :rightEv='toacceptCoin' :leftShow='false' :rightIcon="require('../../assets/images/record_black@2x.png')" ></Header>
        <div class="walletbanner">
            <div class="w-t">
                <span>{{$t(`wallet.zichan`)}} </span>
                <router-link class="gateway" to="/xrwg">{{$t('Trust the gateway')}}</router-link>
            </div>
            <div class="w-t2">
                <span>{{isConnected ? getTotalM() : '-'}}</span>&nbsp;{{moneyUnit}}
            </div>
        </div>

        <div class="hiddenmoney">
            <div class="h_l" @click="hiddenmoney">
                <img src="../../assets/images/night_asset_unchecked@2x.png" alt="" srcset="" v-if="!hidden">
                <img src="../../assets/images/asset_selection@2x.png" alt="" srcset="" v-else>
                <span>{{$t(`wallet.hide`)}}</span>
            </div>
        </div>

        <div class="money">
            <div class="coin">
                <i></i>
                {{unitCoin(balancesXRP.currency || rcp.currency)}}
                <small @click="kt" v-if="Number(qianggou_edu) > 0">
                    {{$t('svg34')}} : {{qianggou_edu || 0}}
                    <em v-if="qianggou.tx"> {{$t('svg41')}}</em>
                    <img v-if="qianggou_open" src="../../assets/images/exchange.png" alt="">
                    <img v-else src="../../assets/images/qu.png" alt="">
                </small>
            </div>
            <div class="coin2">
                {{isConnected ? decimal(balancesXRP.value || 0).toFixed(8) : '-'}}
                <span v-if="isConnected">
                    ≈ {{decimal.mul((balancesXRP.value || 0), moneyConvert).toFixed(2)}}
                    <small>{{moneyUnit}}</small>
                </span>
                <span v-else>
                    ≈ -
                </span>
            </div>
            <div class="coin4">
                <div class="shou"  @click="$router.push('/shoukuan/XRP')" >{{$t(`wallet.shou`)}}</div>
                <div class="zhuan" @click="$router.push(`/zhuanqian/${rcp.currency}`)">{{$t(`wallet.fu`)}}</div>
            </div>
        </div>

        <div class="money" v-for="(v,k) in gatewayMain" :key="k">
            <div class="coin" :class="k.toLowerCase()">
                <i></i>
                {{unitCoin(k)}}
                <!--<small style="float: right;" @click="closeGateway(item)">取消信任网关</small>-->
            </div>
            <div class="coin2">
                <!--{{decimal((gatewayBalances[k] || {}).value || 0).toFixed(8) * 1}}-->
                {{isConnected ? decimal((gatewayBalances[k] || {}).value || 0).toFixed(8) : '-'}}
                <!--<span v-if="k.toLowerCase() == 'ust'"> ≈ {{(decimal.mul((gatewayBalances[k] || {}).value || 0, moneyConvertAll.meiyuan_price || 0)).toFixed(2)}} <small>{{moneyUnit}}</small></span>-->
                <span v-if="isConnected"> ≈ {{(decimal.mul((gatewayBalances[k] || {}).value || 0, getCurrencyItemPrice((gatewayBalances[k] || {})) || 0)).toFixed(2)}} <small>{{moneyUnit}}</small></span>
                <span v-else>-</span>
            </div>
            <div class="coin4">
                <div class="shou"  @click="toSKM(k.toUpperCase())" >{{$t(`svg16`)}}</div>
                <div class="zhuan" @click="tozhuanzang(k.toUpperCase())">{{$t(`svg17`)}}</div>
            </div>
        </div>


        <div class="money" v-for="(item,index) in balancesOthers" :key="item.currency" v-if="!(hidden && item.value < 0.1)">
            <div class="coin logo-dis" @click="$router.push('/yajin/' + (item.counterparty || ''))">
                <img v-if="coin_logo[(item.currency || '').toLowerCase()]" :src="coin_logo[(item.currency || '').toLowerCase()]" alt="">
                <i v-else class="op">{{(item.currency || '-')[0]}}</i>
                {{item.currency}}
                <!--<small style="float: right;" @click="closeGateway(item)">取消信任网关</small>-->
            </div>
            <div class="coin2" @click="$router.push('/yajin/' + (item.counterparty || ''))">
                <!--{{decimal(item.value || 0).toFixed(8) * 1}}-->
                {{isConnected ? decimal(item.value || 0).toFixed(8) : '-'}}
                <span v-if="isConnected"> ≈ {{(decimal.mul(item.value || 0, getCurrencyItemPrice(item) || 0)).toFixed(2)}} <small>{{moneyUnit}}</small></span>
                <span v-else>-</span>
            </div>
            <div class="coin3" @click="$router.push('/yajin/' + (item.counterparty || ''))">
                <div>{{$t(`gateway`)}}: {{item.counterparty || ''}}</div>
                <!--<div class="c_l">{{$t(`wallet.nocan`)}}：&nbsp;  {{hidden?'******':item.nocan}} </div>-->
            </div>
            <div class="coin4">
                <div class="shou"  @click="$router.push('/shoukuan/' + item.currency)" >{{$t(`wallet.shou`)}}</div>
                <div class="zhuan" @click="$router.push(`/zhuanqian/${item.currency}`)">{{$t(`wallet.fu`)}}</div>
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        name: "wallet",
        mounted (){
        },
        data() {
            return {
                searchmsg: "",
                serchnow: false,
                hidden:false,
                isWalletShow: true,
                qianggou : {},
                coins: [

                ]
            };
        },
        watch: {
            searchmsg() {
                // console.log(this.searchmsg);
                // console.log(new RegExp(this.searchmsg).test('xxm'));
                if(this.searchmsg != "") {
                    this.serchnow = true;
                } else {
                    this.serchnow = false;
                }
            },
            qianggou_edu (n, o){
                if(n == 0 && o > n){
                    this.$toast.show(this.$t('svg42'));
                    this.qianggou = {};
                }
            },
        },
        created (){
            if(localStorage.getItem('qianggou' + this.rcp.address)){
                try {
                    this.qianggou = JSON.parse(localStorage.getItem('qianggou' + this.rcp.address));
                }catch (e) {
                    this.qianggou = {};
                }
            }
            this.getTransaction();
        },
        methods:{
            getTransaction (){
                if(this.qianggou_open && this.qianggou.tx){
                    if((Date.now() - this.qianggou.time) > 8000){
                        this.rcp.api.getTransaction(this.qianggou.tx)
                            .then(res => {
                                if(res.outcome.result != 'tesSUCCESS'){
                                    localStorage.setItem('qianggou' + this.rcp.address, JSON.stringify({}));
                                    this.qianggou = {};
                                }
                            })
                            .catch(e =>{
                                console.log(e.message);
                                localStorage.setItem('qianggou' + this.rcp.address, JSON.stringify({}));
                                this.qianggou = {};
                            })
                    }else{
                        setTimeout(() => {
                            this.getTransaction();
                        }, 4000);
                    }
                }
            },
            kt (){
                if(this.qianggou.tx){
                    this.$toast.show(this.$t('svg40'));
                    return;
                }
                if(this.qianggou_open){
                    this.$router.push('/convertSGY');
                    return;
                }
                this.$toast.show(this.$t('svg35'));
            },
            toSKM (item){
                // $router.push('/shoukuan/' + k.toUpperCase() + '/1')
                if(this.isjihuo == false){
                    this.$toast.show(this.$t('home.home8'));
                    return;
                }

                if(this.gatewayMain[item.toLowerCase()] && !!!this.gatewayBalances[item.toLowerCase()]){
                    this.$store.commit("isTrustBtc", true);
                    return;
                }
                this.$router.push('/shoukuan/' + item.toUpperCase() + '/1');
            },
            getTotalM (){
                let moneyConvert = this.moneyConvert;
                let adr = this.decimal.mul((this.balancesXRP.value || 0), moneyConvert);

                let total = adr;
                let gatewayBalances = this.gatewayBalances;
                for (let gatewayB in gatewayBalances) {
                    let p = this.decimal.mul((gatewayBalances[gatewayB]).value || 0, this.getCurrencyItemPrice((gatewayBalances[gatewayB])) || 0);
                    total = total.add(p);
                };

                this.balancesOthers.forEach(item => {
                    let p = this.decimal.mul(item.value || 0, this.getCurrencyItemPrice(item) || 0);
                    total = total.add(p);
                });
                return total.toFixed(2);
            },
            convertAds (){
                this.$router.push('/convertAds');
            },
            confirm(){

            },
            tozhuanzang(item){
                if(this.isjihuo == false){
                    this.$toast.show(this.$t('home.home8'));
                    return;
                }

                if(this.gatewayMain[item.toLowerCase()] && !!!this.gatewayBalances[item.toLowerCase()]){
                    this.$store.commit("isTrustBtc", true);
                    return;
                }

                this.$router.push(`/zhuanqian2/${item}`);
            },
            hiddenmoney(){
                this.hidden = !this.hidden

            },
            toacceptCoin(){
                this.$router.push({
                    path: "/acceptCoin",
                    query: {
                        type: 0
                    }
                });
            }
        }


    };
</script>
<style lang="scss" scoped>
    .adr25{
        color: $blue;
        padding-right: 15px;
        text-align: right;
        font-size: 15px;
    }
    .gateway{
        color: $white;
    }
    .walletall {
        padding: 0 15px 80px;
        min-height: 90vh;
        margin-bottom: 50px;
        .walletbanner {
            margin-top: 60px;
            height: 137px;
            background: url(../../assets/images/wallet__card_bj@2x.png);
            background-repeat: no-repeat;
            background-size: cover;
            border-radius: 5px;
            overflow: hidden;
            padding: 0 20px;
            color: $white;
            .w-t {
                display: flex;
                justify-content: space-between;
                padding: 20px 0 20px 0;
                align-items: center;
                img {
                    width: 22px;
                    height: 22px;
                }
            }
            .w-t2 {
                font-size: 22px;
                text-align: left;
                span {
                    font-size: 40px;
                }
            }
        }
        .hiddenmoney {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 20px 0;
            color: $color3;
            .h_l {
                display: flex;
                align-items: center;
                font-size: 12px;
                img {
                    margin-right: 5px;
                    width: 12px;
                    height: 12px;
                }
            }
            .h_r {
                height: 24px;
                width: 100px;
                display: flex;
                align-items: center;
                border-radius: 2px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                img {
                    width: 20px;
                    padding: 0 5px;
                    height: 12px;
                }
                input {
                    width: 70px;
                    height: 20px;
                    background: $bg;
                    border: none;
                    color: $white;
                }
            }
            .searchwid {
                width: 150px;
                input {
                    width: 120px;
                }
            }
        }
        .money {
            height: 100%;
            background:$border2;
            margin-bottom: 20px;
            border-radius: 5px;
            box-shadow:0px 0px 15px 0px rgba(0,0,0,0.1);
            .coin {
                padding: 10px 15px 0 15px;
                font-size: 18px;
                font-weight: 500;
                color: $blue;
                display: flex;
                align-items: center;
                position: relative;
                i{
                    display: block;
                    position: absolute;
                    z-index: 10;
                    width: 20px;
                    height: 20px;
                    background: url('../../assets/images/vip@3x.png') no-repeat;
                    background-size: 100% 100%;
                    left:  34px;
                    top: 25px;
                    border-radius: 50%;
                    box-shadow:0px 0px 8px 0px rgba(0,0,0, 0.2);
                    &.op{
                        display: inline-block;
                        position: static;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        background: $blue;
                        color: #fff;
                        font-size: 16px;
                        line-height: 30px;
                        text-align: center;
                        text-transform: uppercase;
                        font-style: normal;
                        margin-right: 8px;
                    }
                }
                img{
                    display: inline-block;
                    height: 30px;
                    margin-right: 10px;
                }
                small{
                    position: absolute;
                    right: 5px;
                    top: 10px;
                    width: 80%;
                    text-align: right;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    img{
                        height: 16px;
                        display: inline-block;
                        margin-left: 8px;
                    }
                    em{
                        font-style: normal;
                        font-size: 12px;
                        margin-left: 5px;
                    }
                }
                &:before{
                    display: block;
                    content: '';
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background: url("../../assets/images/notice_head_portrait@2x.png") no-repeat;
                    background-size: 100% 100%;
                    margin-right: 10px;
                }
                &.logo-dis:before{
                    display: none;
                }
                &.ust:before{
                    background-image: url("../../assets/images/usdt.webp");
                }
                &.btc:before{
                    background-image: url("../../assets/images/btc@2x.png");
                }
            }
            .coin2 {
                padding: 0 15px;
                font-size: 24px;
                color: $active;
                margin: 15px 0;
                span {
                    font-size: 18px;
                }
            }
            .coin3 {
                padding: 0 15px 10px 15px;
                font-size: 13px;
                font-weight: 600;
                color: $active;

                display: flex;
                .c_l {
                    width: 50%;
                }
            }
            .coin4 {
                border-top: 1px solid $bg4;
                height: 40px;
                color:$active;
                font-size: 14px;
                div {
                    line-height: 40px;
                    width: 49%;
                    display: inline-block;
                    text-align: center;
                }
                div:hover {
                    background: $blue;
                    color: $white;
                }
                .shou {
                    border-right: 1px solid $bg4;
                }
            }
        }
    }
    .cn-text{
        color: $color1;
        font-size: 14px;
        padding: 0 15px;
    }
</style>
