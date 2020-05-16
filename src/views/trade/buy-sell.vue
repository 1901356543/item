<template>
    <section class="buysell">
        <div class="type">
            <div @click="type='buy'" :class="type== 'buy'? 'buy':'' ">{{$t(`Trade.canbuy`)}}</div>
            <div @click="type='sell'" :class="type== 'sell'? 'sell':'' ">{{$t(`Trade.cansell`)}}</div>
        </div>
        <div class="price">
            <div>{{$t(`Trade.price`)}}</div>
            <input type="text" :placeholder="$t(`Trade.pricein`)" v-model="price" >
        </div>
        <div class="yue">≈ {{priceMoney}} {{moneyUnit}}</div>
        <div class="price">
            <div >{{$t(`wallet.zhuanqian2`)}}</div>
            <input type="text" :placeholder="$t(`wallet.zhuanqian8`)" v-model="num">
        </div>
        <div class="yue">
            <span>{{$t(`svg58`)}}</span>

            <span>
                {{usableBalances}}

                {{unitCoin(type == 'buy' ? rightBalances.currency : leftBalances.currency)}}
            </span>

        </div>
        <div class="changnum">
            <div  v-for="item in percents" :key="item" @click="changeNum(item)">{{item * 100}}%</div>
        </div>
        <div class="allmoney">{{$t(`Trade.turnover`)}}
            <span>{{decimal((num * price) || 0).toFixed(4)}}</span>
        </div>

        <submit-btn v-if="newTradeQuote.open || vip" class="btn2" :class='type == "buy" ? "buybg" : "sellbg"' :submit="prepareOrder" :state="submitState || isConnected == false || tx.length > 0">{{type == 'buy' ? $t(`Trade.canbuy`) : $t(`Trade.cansell`)}}</submit-btn>
        <submit-btn v-else class="btn2" :class='type == "buy" ? "buybg" : "sellbg"' :state="false">{{$t('svg52')}}</submit-btn>
        <!--<div class="btn2" :class='type == "buy" ? "buybg" : "sellbg"' @click="prepareOrder">
            {{type == 'buy' ? $t(`Trade.canbuy`) : $t(`Trade.cansell`)}}
            {{submitState ? '...' : ''}}
        </div>-->
        <r-modal :title="$t(`wallet.zhuanqian10`)"
                 @on-ok="submitPsw"
                 :show="isShowPswModal"
                 @on-cancel="isShowPswModal = false">
            <div class="inp-password">
                <input type="password" v-model="password" :placeholder="$t(`wallet.zhuanqian12`)">
            </div>
        </r-modal>
    </section>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        name: "buysell",
        data() {
            return {
                num: "",
                cannum: 0,
                type: "buy",
                price: "",
                password: "",
                percents: [0.25, 0.5, 0.75, 1],
                leftBalances: {},
                rightBalances: {},
                submitState: false,
                isShowPswModal: false,
                priceMoney : 0,
                feeScale : 0.0015,
                tx : '',
            };
        },
        computed : {
            ...mapState([
                'tradePrice',
            ]),
            usableBalances () {
                // decimal((type == 'buy' ? rightBalances.value : leftBalances.value) || 0).toFixed(6)
                let usableBalances = 0;
                let currency = '';
                if(this.type == 'buy'){
                    usableBalances = this.rightBalances.value || 0;
                    currency = this.rightBalances.currency || 'XRP';
                }else{
                    usableBalances = this.leftBalances.value || 0;
                    currency = this.leftBalances.currency || 'XRP';
                }
                // console.log(usableBalances);
                usableBalances = this.decimal(usableBalances).sub(this.orderBalance[currency] || 0).toNumber();
                return usableBalances;
            },
        },
        watch: {
            trade (){
                this.getBalances();
                // orderBalance
            },
            tradePrice (n, o){
                if(n * 1 > 0){
                    this.price = this.decimal(n || 0).toFixed(4) * 1;
                    this.$store.commit("tradePrice", '');
                }
            },
            balances(n, o) {
                this.getBalances();
            },
            price(n, o) {
                let price = this.decimalNum(n, 4);
                this.price = price;
                this.priceMoney = this.decimal.mul(this.getCurrencyItemPrice(this.trade.right) || 0, this.price || 0).toFixed(2);
            },
            num(n, o) {
                let num = this.decimalNum(n, 2);
                this.num = num;
            }
        },
        created() {
            if (this.connected) {
                this.getBalances();
            }
            this.tx = '';
        },
        methods: {

            getTransaction (){
                setTimeout(() => {
                    console.log(this.tx);
                    this.rcp.api.getTransaction(this.tx)
                        .then(res => {
                            this.tx = '';
                        })
                        .catch(e =>{
                            console.log(e.message);
                            this.tx = '';
                        })
                }, 4000);
            },
            async submitPsw() {
                let { type, num, price } = this;
                let { left, right } = this.trade;

                let fee = this.getFee();
                console.log('fee', fee);

                this.account
                    .verifyPassword(this.pas || this.password)
                    .then(async () => {
                        this.isShowPswModal = false;
                        this.submitState = true;
                        let seed = await this.account.exportPrivate(this.pas || this.password);
                        this.$store.commit("pas", this.pas || this.password);
                        let totalPrice = (
                            this.decimal(num * price || 0).toFixed(6) * 1
                        ).toString();
                        let quantity = (this.decimal(num || 0).toFixed(2) * 1).toString();
                        let option = {
                            direction: type,
                            quantity: Object.assign({}, left, {
                                value: quantity
                            }),
                            totalPrice: Object.assign({}, right, {
                                value: totalPrice
                            }),
                            // passive : true,
                            // immediateOrCancel : true,
                        };
                        // console.log(option);
                        this.rcp
                            .prepareOrder(option, seed, this.rcp.address, {
                                fee : fee.toString(),
                                // maxFee : (fee * 1 + 1).toString(),
                            })
                            .then(data => {
                                console.log(data);
                                this.submitState = false;
                                if (data.engine_result_code == 0) {
                                    this.$toast.show(this.$t("lang88"));
                                    this.num = "";
                                    this.tx = data.tx_json.hash;
                                    this.getTransaction();
                                    // this.price = "";
                                } else {
                                    this.xrpMsg(data);
                                }
                            })
                            .catch(e => {
                                console.log(e);
                                console.log(e.message);
                                this.submitState = false;
                                this.$toast.show(e.message);
                            });
                    })
                    .catch(e => {
                        console.log(e);
                        console.log(e.message);
                        this.submitState = false;
                        this.$toast.show(this.$t("passwordError"));
                    });
            },
            getFee (){
                if(this.type == 'buy'){
                    return this.decimal(this.fee).toNumber();
                }
                if(this.vip){
                    return this.decimal(this.fee).toNumber();
                }
                let fee = this.decimal(this.price || 0).mul(this.num || 0).mul(this.feeScale).mul(this.getCurrencyItemPrice(this.trade.right)).div(this.moneyConvert).add(this.fee).toFixed(6) * 1;
                return fee;
            },
            async prepareOrder() {
                // console.log(this.rcp.option.maxFeeXRP);
                if(this.isConnected == false){
                    this.$toast.show(this.$t("lang154"));
                    return;
                };
                if((this.orderBalance.orderNum || 0) >= 16){
                    this.$toast.show(this.$t("svg48"));
                    return;
                }
                if(this.tx.length){
                    this.$toast.show(this.$t("svg49"));
                    return;
                }
                if (this.submitState) return;

                if(this.price <= 0){
                    this.$toast.show(this.$t("Trade.price") + this.$t("error"));
                    return;
                }

                if(this.num <= 0){
                    this.$toast.show(this.$t("wallet.numError"));
                    return;
                }

                let totalPrice = (this.decimal((this.num * this.price) || 0)).toNumber();
                let quantity = (this.decimal(this.num || 0)).toNumber();

                if(totalPrice <= 0 || quantity <= 0){
                    this.$toast.show(this.$t("lang174"));
                    return;
                }

                let fee = this.getFee();
                if(this.type == "buy"){
                    if(this.rightBalances.currency == 'XRP'){
                        totalPrice = this.decimal(totalPrice).add(this.fee).toNumber();;
                    }
                    if(totalPrice > (this.rightBalances.value || 0)){
                        this.$toast.show(this.unitCoin(this.rightBalances.currency) + this.$t("lang87"));
                        return;
                    }
                    let orderBalance = this.decimal(this.orderBalance[this.rightBalances.currency] || 0).add(totalPrice).toNumber();
                    if(orderBalance > this.rightBalances.value){
                        this.$toast.show(this.unitCoin(this.rightBalances.currency) + this.$t("svg47"));
                        return;
                    }
                }

                if(this.type == "sell"){
                    if(this.leftBalances.currency == 'XRP'){
                        quantity = this.decimal(quantity).add(this.fee).toNumber();
                    }
                    if(quantity > (this.leftBalances.value || 0)){
                        this.$toast.show(this.unitCoin(this.leftBalances.currency) + this.$t("lang87"));
                        return;
                    }
                    // console.log(quantity);
                    let orderBalance2 = this.decimal(this.orderBalance[this.leftBalances.currency] || 0).add(quantity).toNumber();
                    // console.log(orderBalance2);
                    if(orderBalance2 > this.leftBalances.value){
                        this.$toast.show(this.unitCoin(this.leftBalances.currency) + this.$t("svg47"));
                        return;
                    }

                }

                if(this.balancesXRP.value * 1 <= fee){
                    this.$toast.show(this.$t('lang173'));
                    return;
                }
                if(this.pas.length){
                    this.submitPsw();
                }else{
                    this.isShowPswModal = true;
                }
            },
            getBalances() {
                let { left, right } = this.trade;
                this.balances.forEach(item => {
                    if (
                        item.currency == left.currency &&
                        item.counterparty == left.counterparty
                    ) {
                        this.leftBalances = item;
                    }
                    if (
                        item.currency == right.currency &&
                        item.counterparty == right.counterparty
                    ) {
                        this.rightBalances = item;
                    }
                });
            },
            changeNum(item) {
                let { num, price, type } = this;
                if (price) {
                    if (type == "buy") {
                        // this.num = (this.rightBalances.value || 0) * item * price;
                        let n = this.decimal(this.usableBalances || 0).mul(item).div(price * 1);
                        if(this.leftBalances.currency == 'XRP'){
                            n = n.sub(this.getFee());
                        }
                        this.num = n.toFixed(2) * 1;
                    }
                }
                if (type == "sell") {
                    let n =  this.decimal(this.usableBalances || 0).mul(item);
                    if(this.leftBalances.currency == 'XRP'){
                        n.sub(this.getFee());
                    };
                    this.num = n.toFixed(2) * 1;
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    .buysell {
        height: 100%;
        display: inline-block;
        vertical-align: text-top;
        color: $color1;
        width: 50%;
        padding-left: 15px;
        .btn2{
            position: static;
            border-radius: 0;
            width: 100%;
            margin: 0;
        }
        .type {
            display: flex;
            div {
                height: 35px;
                width: 50%;
                line-height: 35px;
                text-align: center;
                color: $color1;
                background: $bg9;
                font-size: 16px;
                font-weight: bold;
            }
            .buy {
                color: $white;
                background-color: $bg9;
                background-image: url("../../assets/images/buy_bj_press@2x.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }
            .sell {
                color: $white;
                background-color: $bg9;
                background-image: url("../../assets/images/sell_bj_press@2x.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }
        }
        .price {
            display: flex;
            justify-content: space-between;
            padding: 0 5px;
            height: 32px;
            align-items: center;
            border: 1px solid $border3;
            margin: 15px 0 10px 0;
            div {
                font-size: 14px;
                color: $color3;
            }
            input {
                height: 100%;
                background: none;
                border: none;

                width: 70%;
                text-align: right;
                input::placeholder,
                textarea::placeholder {
                    color: $color3;
                }
            }
        }
        .yue {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: $active;
            font-size: 10px;
        }
        .changnum {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 15px;
            .changnumactive {
                background: $bg6;
                color: $blue;
            }
            div {
                color: $color1;
                width: 23%;
                font-size: 10px;
                height: 26px;
                line-height: 26px;
                background: $bg9;
                border-radius: 4px;
                text-align: center;
            }
        }
        .allmoney {
            font-size: 14px;
            margin-top: 38px;
            span {
                color: $active;
            }
        }
        .btn2 {
            margin-top: 15px;
            color: $white;
            text-align: center;
            height: 32px;
            line-height: 32px;
            font-size: 16px;
            font-weight: bold;
        }
    }
</style>
