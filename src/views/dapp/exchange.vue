<template>
    <section class="exchange">
        <Header :title="$t('lang40')"
                :right-icon="require('../../assets/images/record@2x.png')"
                :right-ev="toAccept"
        />
        <div class="container">
            <div class="ex-content">
                <div class="ex-icon">
                    <img src="../../assets/images/asset_circular@2x.png" alt="">
                </div>
                <div class="ex-count">
                    <div class="row from">
                        <span class="r-key">{{$t('from')}}</span>
                        <span class="r-value">{{fromValue}}</span>
                        <span class="r-key"><small>(1 BTC)</small></span>
                    </div>
                    <div class="row to">
                        <span class="r-key">{{$t('to')}}</span>
                        <span class="r-value">{{toValue}}</span>
                        <span class="r-key">({{conv.curr_layer_rate || '-'}} {{$t('title')}})</span>
                    </div>
                    <div class="transfer" @click="transfer">
                        <img src="../../assets/images/night_asset_switch@2x.png" alt="">
                    </div>
                </div>
            </div>
            <div class="ex-coin">
                <p class="count-name">{{$t('lang61')}}</p>
                <div class="inp-coin-count">
                    <input type="number" v-model="num" :placeholder="$t('lang61')"/>
                    <div class="chose-type">
                        <span class="c-name">{{fromValue}}</span>
                        <span class="line">|</span>
                        <span class="c-all" @click="clickAll">{{$t('wallet.zhuanqian4')}}</span>
                    </div>
                </div>
                <div class="tips">*{{$t('Trade.can2')}}：{{balancesBTC.value || 0}} {{fromValue}}；{{$t('lang74') + $t('lang75')}}：{{conv.layer_left_btc || '0'}} {{fromValue}}</div>
            </div>
        </div>
        <r-button :text="submitText ? submitText : $t('confirm')" width="90%" class="btn-comfirm" @comfirm="submit"></r-button>

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
        data(){
            return {
                fromValue: 'BTC',
                toValue: 'RCP',
                isShowModal: false,
                isShowPswModal: false,
                getInfoState: true,
                num: '',
                password: '',
                submitText: '',
                conv : {}
            }
        },
        watch : {
            num (n, o) {
                if(n){
                    this.submitText = '≈' + this.decimal.mul(n, (this.conv.curr_layer_rate || 0)).toFixed(6) + ' ' + this.toValue;
                }else{
                    this.submitText = '';
                }
            }
        },
        destroyed (){
            this.getInfoState = false;
        },
        created (){
            this.fromValue = 'BTC';
            this.toValue = this.$t('title');
            this.getInfo();
        },
        methods: {
            clickAll (){
                this.num = (this.balancesBTC.value || 0) * 1 > (this.conv.layer_left_btc || 0) * 1 ? this.conv.layer_left_btc : (this.balancesBTC.value || 0);
            },
            getInfo (){
                if(this.getInfoState){
                    this.axios({
                        url : "/service/conv",
                    }).then(res => {
                        console.log(res.data);
                        this.conv = res.data;
                        setTimeout(() => {
                            this.getInfo();
                        }, 4000)
                    }).catch(e => {
                        console.log(e.message);
                        setTimeout(() => {
                            this.getInfo();
                        }, 4000)
                    });
                }
            },
            transfer(){
                // let {fromValue, toValue} = this;
                // [fromValue, toValue] = [toValue, fromValue]
                // this.fromValue = fromValue;
                // this.toValue = toValue;
            },
            submit (){
                console.log('submit');
                let {num} = this;
                if(Number(num) <= 0.01){
                    this.$toast.show(this.$t('lang85'));
                    return;
                }
                if(!this.rcp_info.conv_address){
                    this.$toast.show(this.$t('lang56'));
                    return;
                }
                if(!this.balancesBTC.counterparty){
                    this.$store.commit("isTrustBtc", true);
                    return;
                }
                if(this.balancesXRP.value < this.fee){
                    this.$toast.show(this.$t('lang81'));
                    return;
                }
                this.isShowPswModal = true;

                // conv_address
            },
            async submitPsw (){
                let {num, fromValue} = this;
                let address = this.rcp_info.conv_address;
                let counterparty = this.balancesBTC.counterparty;
                this.account.verifyPassword(this.password).then(async () => {
                    this.isShowPswModal = false;
                    this.submitState = true;
                    let seed = await this.account.exportPrivate(this.password);
                    let option = {
                        address,
                        value : Number(num),
                        seed,
                        currency : fromValue,
                        counterparty : counterparty,
                    };
                    this.rcp.preparePayments(option).then(data => {
                        this.submitState = false;
                        if(data.engine_result_code == 0){
                            this.$toast.show(this.$t('lang57'));
                        }else{
                            this.xrpMsg(data);
                        }
                    }).catch(e => {
                        console.log(e.message);
                        this.submitState = false;
                        this.$toast.show(e.message);
                    });
                }).catch(e => {
                    console.log(e.message);
                    this.$toast.show(this.$t('passwordError'));
                });
            },
            toAccept(){
                this.$router.push({
                    path: "/acceptCoin2",
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .exchange{
        height: 100%;
        background-color: $bodybg;
        .container{
            padding-top: 70px;
            margin: 0 15px;
            .ex-content{
                background: $border2;
                box-shadow:0px 6px 10px 0px rgba(0,0,0,0.06);
                border-radius: 4px;
                display: flex;
                align-items: center;
                padding: 0 12px;
                position: relative;
                .ex-icon{
                    margin-right: 12px;
                    img{
                        width: 6px;
                    }
                }
                .ex-count{
                    font-size: 14px;
                    
                    .row{
                        padding: 16px 0;
                        &.from{
                            border-bottom: 1px solid $inpBg;
                        }
                    }
                    span.r-key{
                        margin-right: 20px;
                        color: #687D9C;
                    }
                    span.r-value{
                        color: $active;
                        margin-right: 10px;
                    }
                }
                .transfer{
                    position: absolute;
                    height: 100%;
                    right: 0;
                    top: 0;
                    width: 18.8%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #F4F5F7;
                    img{
                        width: 50%;
                    }
                }
            }
            .ex-coin{
                background: $border2;
                margin-top: 15px;
                padding: 15px;
                box-shadow:0px 6px 10px 0px rgba(0,0,0,0.06);
                .count-name{
                    font-size: 12px;
                    color: $active;
                    margin-bottom: 12px;
                }
                .inp-coin-count{
                    display: flex;
                    font-size: 14px;
                    justify-content:space-between;
                    padding-bottom: 15px;
                    border-bottom: 1px solid $bg;
                    input{
                        width: 69%;
                        background-color: transparent;
                        border: 0;
                        line-height: 14px;
                        color: $active;
                        &::placeholder{
                            color: $color1;
                        }
                    }
                    .chose-type{
                        display: flex;

                        span.c-name{
                            color: $color1;
                            margin-right: 10px;
                        }
                        span.line{
                            margin-right: 10px;
                            color: $color1;
                        }
                        span.c-all{
                            color: $active;
                        }
                    }

                }
                .tips{
                    font-size: 12px;
                    color: $color1;
                    padding-top: 12px;
                }
            }
        }
        .btn-comfirm{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 20px;
        }
    }

</style>