<template>
    <section class="zhuanqian">
        <Header :title="$t(`svg36`)"></Header>

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
                <h4 class="num-convert">
                    {{qianggou_edu || 0}} <small>SGY</small>
                </h4>
            </div>
            <div class="l">
                = <span class="active-text">{{qianggou_ust || 0}} USDT</span>；
                {{`${$t(`wallet.can`)}：${coinBalances} USDT`}}；
                <p>{{$t('wallet.zhuanqian5')}}： {{fee}} {{$t('title')}}</p>
            </div>
        </div>

        <div class="cointype">
            <div class="l active-text" v-html="$t('svg37')"></div>
        </div>

        <submit-btn :submit="codeVerify" :state="submitState">{{$t(`wallet.zhuanqian6`)}}</submit-btn>
        <!--<div class="btn" @click="codeVerify" > {{$t(`wallet.zhuanqian6`)}}{{submitState ? '...' : ''}}</div>-->

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
                coinBalancesUSDT : {},
                address : "",
                gateway : "",
                num : "",
                password : "",
                submitState : false,
                activeSuper : false,
            };
        },
        created (){
            this.updateBalances();
        },
        watch : {
            balances (n, o){
                this.updateBalances();
            },
        },
        methods: {
            updateBalances (){
                this.coinBalances = (this.gatewayBalances['ust'] || {}).value || 0;
                this.coinBalancesUSDT = (this.gatewayBalances['ust'] || {});
            },
            codeVerify (){
                if(this.submitState) return;
                let {password, code} = this;

                if(this.balancesXRP.value < this.fee){
                    this.$toast.show(this.$t('svg39'));
                    return;
                }

                if(this.coinBalances < this.qianggou_ust * 1){
                    this.$toast.show(this.$t('svg38', {num : this.qianggou_ust}));
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
                    this.rcp.preparePayments({
                        address : this.rcp_info.qianggou_address,
                        seed,
                        value : this.qianggou_ust.toString(),
                        currency : this.coinBalancesUSDT.currency,
                        counterparty : this.coinBalancesUSDT.counterparty,
                        memos : [
                            {
                                "type": "qianggou",
                                "format": "text/plain",
                                "data": this.qianggou_edu.toString()
                            }
                        ],
                    }).then(data => {
                        console.log(data);
                        this.submitState = false;
                        if(data.engine_result_code == 0){
                            this.$toast.show(this.$t('svg40'));
                            this.$router.push('/wallet');
                            localStorage.setItem('qianggou' + this.rcp.address, JSON.stringify({
                                tx : data.tx_json.hash,
                                block : 0,
                                time : Date.now()
                            }));
                        }else{
                            this.xrpMsg(data);
                            localStorage.setItem('qianggou' + this.rcp.address, JSON.stringify({}));
                        }
                    }).catch(e => {
                        this.submitState = false;
                        this.$toast.show(e.message);
                        localStorage.setItem('qianggou' + this.rcp.address, JSON.stringify({}));
                    });
                }).catch(e => {
                    this.submitState = false;
                    this.$toast.show(this.$t('passwordError'));
                    localStorage.setItem('qianggou' + this.rcp.address, JSON.stringify({}));
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

        .active-text{
            color: $blue;
        }
        .num-convert{
            font-size: 36px;
            color: $blue;
        }
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