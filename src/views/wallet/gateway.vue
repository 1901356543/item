<template>
    <section class="zhuanqian">
        <Header :title="$t(`gateway`)"></Header>

        <div class="box2">
            <div class="text1"> {{$t(`coin`)}}</div>
            <div class="text2">
                <input type="text" v-model="coin" :placeholder="$t(`coin`)">
            </div>
        </div>

        <div class="box2">
            <div class="text1"> {{$t(`gateway`)}}</div>
            <div class="text2">
                <input type="text" v-model="address" :placeholder="$t(`wallet.zhuanqian9`)">
            </div>
        </div>

        <div class="btn" @click="submit" > {{$t(`trust`)}}{{submitState ? '...' : ''}}</div>

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
    export default {
        name: "zhuanqian",
        data() {
            return {
                close: false,
                isShowPswModal: false,
                coin: '',
                address : "",
                gateway : "",
                password : "",
                submitState : false
            };
        },
        created (){
            if(this.$route.params.coin){
                this.coin = this.$route.params.coin;
            };
            if(this.$route.params.address){
                this.address = this.$route.params.address;
            }

        },
        watch : {
        },
        methods: {
            submit(){
                let {address, coin} = this;
                if(this.submitState) return;
                if(!this.rcp.api.isValidAddress(address)){
                    this.$toast.show(this.$t('wallet.addressError'));
                    return;
                }
                if(coin.length <= 0){
                    this.$toast.show(this.$t('wallet.coinError'));
                    return;
                }
                if(coin.toUpperCase() == 'XRP' || coin.toUpperCase() == 'SGY'){
                    this.$toast.show(this.$t('wallet.coinError'));
                    return;
                }
                this.isShowPswModal = true;
            },
            async submitPsw (){
                this.account.verifyPassword(this.password).then(async () => {
                    this.isShowPswModal = false;
                    this.submitState = true;
                    let seed = await this.account.exportPrivate(this.password);
                    let {address, coin} = this;
                    this.rcp.prepareTrustline({
                        "currency": coin.toUpperCase(),
                        "counterparty": address,
                        "limit": "100000000000",
                    }, seed).then(data => {
                        this.submitState = false;
                        if(data.engine_result_code == 0){
                            this.$toast.show(this.$t('trust') + this.$t('success'));
                        }else{
                            this.xrpMsg(data);
                        }
                    }).catch(e => {
                        this.submitState = false;
                        this.$toast.show(e.message);
                    });
                }).catch(e => {
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
                this.$router.push('/acceptCoin');
            }
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