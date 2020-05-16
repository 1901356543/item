<template>
    <div class="container">
        <Header :title="$t('importAddress')" />
        <div class="content">
            <!-- tabs -->
            <div class="tabs">
                <div class="tab" @click="selectTab(0)" :class="{'active': activeIndex == 0}">
                    {{$t('mnemonic')}}
                    <span class="active-line" v-if="activeIndex == 0"></span>
                </div>
                <div class="tab" :class="{'active': activeIndex == 1}" @click="selectTab(1)">
                    {{$t('privateKey')}}
                    <span class="active-line" v-if="activeIndex == 1"></span>
                </div>
            </div>

            <div class="psw-step-one">{{$t('lang32')}}</div>
            <div class="inp-password">
                <input type="text" v-model="name" :placeholder="$t('lang32')" />
            </div>

            <!-- 助记词/私钥 -->
            <div class="inputFwk">
                <div class="input-title">{{activeIndex == 0 ? $t('mnemonicPlaceholder') :$t('privateKeyPlaceholder')}}</div>
                <textarea class="input-area" placeholder="" v-model="text" />
                <!--<div class="error-msg">*当前助记词输入错误，请检查</div>-->
            </div>
            <!-- 提交按钮 -->
            <r-button width="87.3%" bgColor="$active" :text="$t('importStart') + (submitState ? '...' : '')" class="submit" @comfirm="submit" />
        </div>

        <r-modal :title="$t(`wallet.zhuanqian10`)"
                 @on-ok="submitPsw"
                 :show="isShowPswModal"
                 @on-cancel="isShowPswModal = false">
            <div class="inp-password">
                <input type="password" v-model="password" :placeholder="$t(`wallet.zhuanqian12`)">
            </div>
        </r-modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                submitState: false,
                isShowPswModal: false,    // 0助记词，1私钥
                activeIndex: 0,    // 0助记词，1私钥
                text : "",
                name : "",
                password : "",
            };
        },
        methods: {
            async submitPsw (){
                if(this.submitState) return;
                this.submitState = true;
                let {name} = this;
                if(name.length <= 0){
                    this.$toast.show(this.$t('lang33'));
                    return;
                }
                this.account.verifyPassword(this.password).then(async () => {
                    this.isShowPswModal = false;
                    this.account.accounts.name[this.account.accounts.address.length] = name;
                    setTimeout(() => {
                        if(this.activeIndex == 0){
                            this.account.importMnemonic(this.text, this.password).then(data => {
                                this.submitState = false;
                                this.$router.push("/accountManage");
                                this.$toast.show(this.$t('importAddress') + this.$t('success'));
                            }).catch(e => {
                                this.submitState = false;
                                this.$toast.show(this.$t('mnemonic') + this.$t('error'));
                            });
                        }else{
                            this.account.importPrivate(this.text, this.password).then(data => {
                                // console.log(data);
                                this.submitState = false;
                                this.$router.push("/accountManage");
                                this.$toast.show(this.$t('importAddress') + this.$t('success'));
                            }).catch(e => {
                                this.submitState = false;
                                if(e.message == '地址已存在'){
                                    this.$toast.show(this.$t('svg31'));
                                }else{
                                    this.$toast.show(this.$t('privateKey') + this.$t('error'));
                                }

                            });
                        }
                    }, 0);
                }).catch(e => {
                    this.submitState = false;
                    this.$toast.show(this.$t('passwordError'));
                });
            },
            submit (){
                if(this.text.length <= 0){
                    if(this.activeIndex == 0){
                        this.$toast.show(this.$t('mnemonic') + this.$t('error'));
                    }else{
                        this.$toast.show(this.$t('privateKey') + this.$t('error'));
                    }
                    return;
                }
                if(this.activeIndex == 1 && !this.rcp.api.isValidSecret(this.text)){
                    this.$toast.show(this.$t('privateKey') + this.$t('error'));
                    return;
                }
                this.isShowPswModal = true;
            },
            selectTab(index) {
                this.activeIndex = index;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .container {
        height: 100%;
        .content {
            margin-top: 60px;
            .psw-step-one{
                font-size: 14px;
                color: $color1;
                margin: 20px 15px 12px;
            }
            .inp-password{
                background-color: $bg9;
                border-radius:4px;
                padding: 12px 15px;
                font-size: 14px;
                margin: 0 10px;
                input{
                    appearance: none;
                    border: 0;
                    outline: none;
                    width: 100%;
                    background-color: transparent;
                    color: $active;
                    &::placeholder{
                        color: $color1;
                    }
                }
            }
            .tabs {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 10px 0;
                .tab {
                    font-size: 14px;
                    color: $color1;
                    position: relative;
                    width: 50%;
                    text-align: center;
                    &.active {
                        color: $active;
                    }
                    .active-line {
                        display: inline-block;
                        width: 22px;
                        height: 2px;
                        background-color: $active;
                        position: absolute;
                        bottom: -10px;
                        left: 50%;
                        transform: translateX(-50%);
                    }
                }
            }
        }
        .inputFwk {
            padding: 17px;
            .input-title {
                font-size: 14px;
                color: $color1;
            }
            .input-area {
                font-family: "PingFang SC", "Microsoft Yahei", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                background-color: $bg9;
                border: none;
                margin-top: 20px;
                min-height: 240px;
                outline: none;
                width: 100%;
                padding: 20px;
                font-size: 14px;
                color: $active;
                overflow: hidden;
            }
            &.active {
                display: inline-block;
                width: 100%;
            }
            .error-msg{
                font-size: 12px;
                color: $up;
                margin-top: 12px;
            }
        }
        .submit{
            margin: 0 auto;
        }
    }
</style>