<template>
    <section class="zhuanqian">
        <Header :title="$t(`adr15`)"></Header>

        <div class="box2">
            <div class="text1"> {{$t(`wallet.zhuanqian10`)}}</div>
            <div class="text2">
                <input type="password" v-model="password" :placeholder="$t(`wallet.zhuanqian12`)" class="in2">
            </div>
        </div>

        <div class="box2">
            <div class="text1">
                {{$t('adr16')}}
            </div>
            <div class="text2">
                <input type="number" v-model="code" :placeholder="$t(`adr16`)">
            </div>
            <div class="l">≈ {{code || 0}} ADS； * {{`${$t(`wallet.can`)}：${coinBalances} USDT`}}</div>
        </div>

        <div class="btn" @click="codeVerify" > {{$t(`wallet.zhuanqian6`)}}{{submitState ? '...' : ''}}</div>

    </section>
</template>
<script>
    export default {
        name: "binding",
        data() {
            return {
                close: false,
                gatewayState: false,
                isShowPswModal: false,
                gatewayData : [],
                coin: '',
                code: '',
                coinBalances : 0,
                address : "",
                gateway : "",
                num : "",
                password : "",
                submitState : false,
                activeSuper : false,
            };
        },
        created (){
            if(this.$route.params.invite){
                this.code = this.$route.params.invite;
            }
            this.updateBalances();
        },
        watch : {
            balances (n, o){
                this.updateBalances();
            },
        },
        methods: {
            updateBalances (){
                this.coinBalances = this.balancesUSDT.value || 0;
            },
            codeVerify (){
                if(this.submitState) return;
                let {password, code} = this;

                if(code.length <= 0){
                    this.$toast.show(this.$t('adr16') + this.$t('error'));
                    return;
                }
                if(this.coinBalances < this.code * 1){
                    this.$toast.show(this.$t('adr17', {num : this.rcp.activeNum}));
                    return;
                }

                this.submitState = true;
                this.submitPsw();
            },
            submitPsw (){
                let {password, code} = this;
                this.submitState = true;
                this.account.verifyPassword(password).then(async () => {
                    let seed = await this.account.exportPrivate(this.password);
                    let option = {
                        direction: "buy",
                        quantity: {
                            currency : this.balancesBTC.currency,
                            counterparty : this.balancesBTC.counterparty,
                            value : this.code,
                        },
                        totalPrice:  {
                            currency : this.balancesUSDT.currency,
                            counterparty :this.balancesUSDT.counterparty,
                            value : this.code,
                        }
                    };
                    this.rcp
                        .prepareOrder(option, seed)
                        .then(data => {
                            this.submitState = false;
                            if (data.engine_result_code == 0) {
                                this.$toast.show(this.$t("lang88"));
                                this.code = "";
                            } else {
                                this.xrpMsg(data);
                            }
                        })
                        .catch(e => {
                            console.log(e.message);
                            this.submitState = false;
                            this.$toast.show(e.message);
                        });
                }).catch(e => {
                    this.submitState = false;
                    this.$toast.show(this.$t('passwordError'));
                });

            },
        }
    };
</script>
<style lang="scss" scoped>
    .zhuanqian {
        background: $bodybg;
        text-transform: uppercase;
        padding: 0 15px;
        padding-top: 65px;

        min-height: 100vh;
        .active-super{
            color: $blue;
            float: right;
        }
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
                    border-bottom: 1px solid $black;
                    &.active {
                        color: $active;
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