<template>
    <div class="container">
        <Header :title="$t('importAddress')" />
        <div class="content">

            <!-- tabs importWallet -->
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
            <br>

            <div class="psw-step-one">{{$t('lang1')}}</div>
            <div class="inp-password">
                <input type="password" v-model="password" :placeholder="$t('wallet.zhuanqian12')" />
            </div>

            <!-- 助记词/私钥 -->
            <div class="inputFwk">
                <div class="input-title">{{activeIndex == 0 ? $t('mnemonicPlaceholder') :$t('privateKeyPlaceholder')}}</div>
                <textarea class="input-area" v-model="mnemonic" />
                <div class="error-msg" v-if="errorMsg">*{{errorMsg}}</div>
            </div>
            <!-- 提交按钮 -->
            <r-button width="87.3%"
                      bgColor="$active"
                      :text="$t('lang4') + (submitState ? '...' : '')"
                      class="submit" @comfirm="submit"/>
        </div>
    </div>
</template>

<script>
    export default {
        name : "importWallet",
        data() {
            return {
                activeIndex: 0, // 0助记词，1私钥
                name : "",
                password : "",
                mnemonic : "",
                errorMsg : "",
                submitState : false,
            };
        },
        methods: {
            selectTab(index) {
                this.activeIndex = index;
            },
            submit (){
                if(this.submitState) return;
                let {password, mnemonic, name} = this;
                if(name.length <= 0){
                    this.errorMsg = this.$t('lang33');
                    return;
                }
                if(password.length <= 0){
                    this.errorMsg = this.$t('lang5');
                    return;
                }

                if(mnemonic.length <= 0){
                    if(this.activeIndex == 0){
                        this.$toast.show(this.$t('mnemonic') + this.$t('error'));
                    }else{
                        this.$toast.show(this.$t('privateKey') + this.$t('error'));
                    }
                }

                this.submitState = true;
                this.account.accounts.name = [name];
                setTimeout(() => {
                    if(this.activeIndex == 0){
                        this.account.importWallet(mnemonic, password).then(() => {
                            this.account.exportPrivate(password);
                            this.toRoute('/');
                            this.submitState = false;
                        }).catch(e => {
                            this.errorMsg = e.message;
                            this.submitState = false;
                        });
                    }else{
                        this.account.privateWallet(mnemonic, password).then(() => {
                            this.account.exportPrivate(password);
                            this.toRoute('/');
                            this.submitState = false;
                        }).catch(e => {
                            this.errorMsg = e.message;
                            this.submitState = false;
                        });
                    }
                }, 50)


            }
        }
    };
</script>

<style lang="scss" scoped>
    .container {
        .content {
            margin-top: 50px;
            border-top: solid 1px $border;
            .psw-step-one{
                padding: 0 20px;
                font-size: 14px;
                color: $active;
                margin-bottom: 12px;
            }
            .inp-password{
                background-color: $border2;
                border-radius:4px;
                padding: 12px 20px;
                margin: 0 20px;
                font-size: 14px;
                border: solid 1px $border;
                input{
                    appearance: none;
                    border: 0;
                    outline: none;
                    width: 100%;
                    background-color: transparent;
                    color: $active;
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
            display: block;
            padding: 17px;
            .input-title {
                font-size: 14px;
                color: $color1;
            }
            .input-area {
                background-color: $border2;
                margin-top: 20px;
                height: 160px;
                outline: none;
                width: 100%;
                padding: 20px;
                font-size: 14px;
                color: $active;
                overflow: hidden;
                border: solid 1px $border;
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