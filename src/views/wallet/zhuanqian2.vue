<template>
    <section class="zhuanqian">
        <Header :title="$t(`svg17`)" :rightEv='toacceptCoin' :rightIcon="require('../../assets/images/record_black@2x.png')"></Header>

        <div class="cointype">
            <div class="l">{{unitCoin(coin)}}</div>
            <div class="r" @click="toclose">
                {{$t(`wallet.zhuanqian1`)}}
                <img src="../../assets/images/triangle@2x.png" alt="" srcset="">
            </div>
        </div>

        <div class="box2">
            <div class="text1"> {{$t(`svg19`)}}</div>
            <div class="text2">
                <input type="text" v-model="address" :placeholder="$t(`wallet.zhuanqian9`)">
                <img @click="$router.push('/scanning/' + coin)" src="../../assets/images/add_scan_white@2x(2).png" alt="" srcset="">
            </div>
        </div>

        <div class="cointype" v-if="unitCoin(coin) != $t(`title`)">
            <div class="l"><small style="font-size: 12px;text-transform:lowercase;">{{(gateway.counterparty || "").toLowerCase()}}</small></div>
            <div class="r" @click="gatewayState = true">
                {{$t(`gateway`)}}
                <img src="../../assets/images/triangle@2x.png" alt="" srcset="">
            </div>
        </div>

        <div class="box2">
            <div class="text1"> {{$t(`wallet.zhuanqian2`)}}</div>
            <div class="text2">
                <input type="number" v-model="num" :placeholder="$t(`wallet.zhuanqian8`)" class="in2">
                <div class="r">
                    <small>{{unitCoin(coin)}}&nbsp;&nbsp;| </small>&nbsp;&nbsp; <span @click="clickAll">{{$t(`wallet.zhuanqian4`)}}</span>
                </div>
            </div>
            <div class="l">
                * {{`${$t(`wallet.can`)}：${decimal(coinBalances).toFixed(8) * 1} ${unitCoin(coin)}； ${$t(`wallet.zhuanqian5`)}：${zzFee} ${$t('title')}`}}
                <p v-if="span && coin != 'XRP'">{{$t('svg18')}}: {{rcp_info.withdaw_setting && rcp_info.withdaw_setting[coin.toLowerCase()] && rcp_info.withdaw_setting[coin.toLowerCase()].fee || '-'}} {{unitCoin(coin)}}</p>
            </div>
        </div>

        <div class="btn" @click="submit" > {{$t(`wallet.zhuanqian6`)}}{{submitState ? '...' : ''}}</div>

        <div class="coinchange" v-if="gatewayState" @click="gatewayState = false">
            <div class="coinbox">
                <div @click="gateway = item" class="coin" :class="gateway.counterparty == item.counterparty ? 'active' : ''" v-for="(item, index) in gatewayData" :key='item.counterparty'>
                    <!--<img src="../../assets/images/btc@2x.png" alt="" srcset="">-->
                    <div style="font-size: 14px;text-transform:lowercase;">{{item.counterparty}}</div>
                </div>
                <div class="coin cg" >
                    <div @click.stop="gatewayState = false"> {{$t(`wallet.zhuanqian7`)}}</div>
                </div>
            </div>
        </div>

        <div class="coinchange" v-if="close" @click="toclose">
            <div class="coinbox">
                <div v-if="chonbi_address[(item).toLowerCase()]" @click="clickCoin(item, index)" class="coin" :class="coin == item ? 'active' : ''" v-for="(item, index) in coinVolume" :key='item'>
                    <!--<img src="../../assets/images/btc@2x.png" alt="" srcset="">-->
                    <div>{{unitCoin(item)}}</div>
                </div>
                <div class="coin cg" >
                    <div @click.stop="toclose"> {{$t(`wallet.zhuanqian7`)}}</div>
                </div>
            </div>
        </div>

        <r-modal :title="$t(`wallet.zhuanqian10`)"
                 @on-ok="submitPsw"
                 :show="isShowPswModal"
                 @on-cancel="isShowPswModal = false">

            <div class="inp-password">
                <input type="password" v-model="password" :placeholder="$t(`wallet.zhuanqian12`)">
            </div>
            <div class="modal-zhuanqian">
                <p> {{$t('to')}} : {{this.address}}, {{this.num}} {{unitCoin(coin)}}</p>
            </div>
        </r-modal>
    </section>
</template>
<script>
    // var Web3Utils = require('web3-utils');
    import Web3Utils from 'web3-utils'
    export default {
        name: "zhuanqian",
        data() {
            return {
                close: false,
                gatewayState: false,
                isShowPswModal: false,
                span: true,
                gatewayData : [],
                coin: '',
                coinBalances : 0,
                zzFee : 0.001,
                address : "",
                gateway : {},
                gatewayText : "",
                num : "",
                password : "",
                submitState : false
            };
        },
        created (){
            if(this.$route.params.gateway){
                this.gatewayText = this.$route.params.gateway;
            }
            if(this.$route.params.toAddress){
                this.address = this.$route.params.toAddress;
            }
            if(this.$route.params.coin){
                this.coin = this.$route.params.coin;
            }else{
                this.coin = this.coinVolume[0] || 'XRP';
            }
            // console.log(Web3Utils.isAddress('0xff2a07fec832095490b4208d6cead95193fd856c'));
        },
        watch : {
            address (n, o){
                // this.addressV();
            },
            balances (n, o){
                this.updateBalances();
            },
            coin (){
                // this.addressV();
                this.gateway = {};
                this.updateBalances();
            },
            gateway (){
                this.updateBalances();
            },
        },
        methods: {
            addressV (){
                if(this.address.length){
                    if(this.rcp.api.isValidAddress(this.address)){
                        this.span = false;
                    }else{
                        this.span = true;
                    }
                }else{
                    this.span = false;
                }
            },
            updateBalances (){
                // let coinIndex = this.coinVolume.indexOf(this.coin);
                // this.coinBalances = (this.balances[coinIndex] && this.balances[coinIndex].value) || 0;
                if(this.coin != this.unitCoin(this.$t('title'))){
                    this.gatewayData = [];
                    this.balances.forEach(item =>{
                        if(item.currency == this.coin.toUpperCase()){
                            this.gatewayData.push(item);
                        }
                        if(this.gateway.counterparty){
                            if(this.gateway.counterparty == item.counterparty){
                                this.gateway = item;
                            }
                        }else{
                            if(this.gatewayText == item.counterparty){
                                this.gateway = item;
                            }
                        }
                    });
                    if(this.gateway.counterparty){

                    }else{
                        this.gateway = this.gatewayData[0] || {};
                    }
                    this.coinBalances = this.gateway.value || 0;
                }else{
                    this.gatewayData = [];
                    this.gateway = "";
                    this.coinBalances = this.balancesXRP.value || 0;
                };

            },
            clickAll (){
                if(this.coin == this.unitCoin(this.$t('title'))){
                    let num = this.decimal.sub(this.coinBalances, this.zzFee);
                    if(num.toNumber() < 0){
                        this.num = 0;
                    }else{
                        this.num = num;
                    }
                }else{
                    this.num = this.coinBalances;
                }
            },
            clickCoin (item){
                this.coin = item;
            },
            submit(){
                if(this.submitState) return;

                let {num, address, coin, gateway, coinBalances} = this;
                gateway = gateway.counterparty || "";

                // console.log(this.decimal(Number(num)).add(this.zzFee).toFixed(8) * 1, coinBalances);
                if(this.balancesXRP.value < this.zzFee){
                    this.$toast.show(this.$t('svg24'));
                    return;
                };
                if(this.decimal(Number(num || 0)).toFixed(8) * 1 > coinBalances * 1){
                    this.$toast.show(this.$t('lang87'));
                    return;
                }
                if(address == this.account.getAddress()){
                    this.$toast.show(this.$t('wallet.transactionOneself'));
                    return;
                }
                if(this.span){
                    let feeU = this.rcp_info.withdaw_setting && this.rcp_info.withdaw_setting[coin.toLowerCase()] && this.rcp_info.withdaw_setting[coin.toLowerCase()].fee || 0;

                    if(Number(num) <= feeU){
                        this.$toast.show(this.$t('svg23'));
                        return;
                    }
                    if(Web3Utils.isAddress(address)){

                    }else{
                        this.$toast.show(this.$t('svg22'));
                        return;
                    }
                }else{
                    if(!this.rcp.api.isValidAddress(address)){
                        this.$toast.show(this.$t('wallet.addressError'));
                        return;
                    }
                }
                if(num <= 0){
                    this.$toast.show(this.$t('wallet.numError'));
                    return;
                }
                if(coin.length <= 0){
                    this.$toast.show(this.$t('wallet.coinError'));
                    return;
                }
                if(this.unitCoin(coin) != this.$t(`title`) && !this.rcp.api.isValidAddress(gateway)){
                    this.$toast.show(this.$t('gatewayError'));
                    return;
                }
                this.isShowPswModal = true;
            },
            async submitPsw (){
                this.account.verifyPassword(this.password).then(async () => {
                    this.isShowPswModal = false;
                    this.submitState = true;
                    let seed = await this.account.exportPrivate(this.password);
                    let {num, address, coin, gateway} = this;
                    gateway = gateway.counterparty || "";
                    let option = {
                        address,
                        value : Number(num),
                        seed,
                    };
                    if(gateway.length > 0){
                        option.currency = coin;
                        option.counterparty = gateway;
                    }
                    if(this.span){
                        if(this.rcp_info.withdraw_address && this.rcp_info.withdraw_address[coin.toLowerCase()]){
                            option.memos = [
                                {
                                    "type": "withdrawals",
                                    "format": "text/plain",
                                    "data": address
                                }
                            ];
                            option.address = this.rcp_info.withdraw_address[coin.toLowerCase()];
                        }else{
                            this.$toast.show(this.unitCoin(coin) + " " + this.$t('lang143'));
                            return false;
                        }
                    }

                    this.rcp.preparePayments(option, {
                        fee : this.zzFee.toString()
                    }).then(data => {
                        this.submitState = false;
                        this.num = "";
                        if(data.engine_result_code == 0){
                            this.$toast.show(this.$t('wallet.fuSuccess'));
                        }else{
                            this.xrpMsg(data);
                        }
                    }).catch(e => {
                        this.submitState = false;
                        this.$toast.show(e.message);
                    });
                }).catch(e => {
                    console.log(e.message);
                    this.$toast.show(this.$t('passwordError'));
                });
            },
            changeAddrModal() {
                this.isShowModal = true;
            },
            toclose() {
                this.close = !this.close;
            },
            toacceptCoin() {
                this.$router.push('/acceptCoin4');
            }
        }
    };
</script>
<style lang="scss" scoped>
    .modal-zhuanqian{
        color: $active;
        margin: 0 15px;
        font-size: 12px;
        p{
            margin-top: 10px;
            padding: 0 5px;
        }
    }
    .zhuanqian {
        background: $bodybg;
        text-transform: uppercase;
        padding: 0 15px;
        padding-top: 65px;

        min-height: 100vh;
        .cointype {
            margin-bottom: 15px;
            border-radius: 4px;
            display: flex;
            color: $active;
            justify-content: space-between;
            padding: 15px;
            align-items: center;
            background: $border2;
            box-shadow:0px 6px 10px 0px rgba(0,0,0,0.06);
            .r {
                color: $color1;
                font-size: 13px;
            }
            img {
                width: 8px;
                height: 8px;
            }
        }
        .box2 {
            margin-bottom: 15px;
            color: $active;
            font-size: 14px;
            background: $border2;
            padding: 15px;
            border-radius: 4px;
            box-shadow:0px 6px 10px 0px rgba(0,0,0,0.06);
            .l {
                color: $color1;
                padding-top: 15px;
                margin-top: 10px;
                border-top: 1px solid $bg;
            }
            .text2 {
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 30px;
                .r {
                    small {
                        color: $color1;
                    }
                }
                img {
                    width: 20px;
                    height: 20px;
                }
                input {
                    height: 100%;
                    border: none;
                    min-width: 90%;
                    background: none;
                }
                .in2 {
                    min-width: 70%;
                }
                .r {
                }
            }
        }
        .coinchange {
            width: 100%;
            height: 100vh;
            z-index: 100;
            position: absolute;
            top: 0;
            left: 0;
            background: $bg4;
            box-shadow:0px 6px 10px 0px rgba(0,0,0,0.06);
            .coinbox {
                position: absolute;
                bottom: 0;
                background:$border2;
                width: 100%;
                .cg {
                    color: $active !important;
                    border-top: 10px solid $nav-bg;
                }
                .coin {
                    width: 100%;
                    text-align: center;
                    color: $color1;
                    height: 48px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-bottom: 1px solid $blue;
                    font-size: 16px;
                    &:nth-last-child(1){
                        border-bottom: none;
                    }
                    &.active {
                        color: $blue;
                    }
                    img {
                        width: 20px;
                        height: 20px;
                    }
                    div {
                        margin-left: 6px;
                        display: inline-block;
                    }
                }
            }
        }
    }
</style>