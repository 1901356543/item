<template>
    <div class="container">
        <span class="lang-login" @click="$router.push({path: '/lang'})">{{
                        $i18n.locale == 'en' ? 'English' : $i18n.locale == 'ru' ? 'русский язык' : $i18n.locale == 'zhCN' ? '中文繁体' : '中文简体'
                        }}</span>
        <div class="content">
            <div class="logo">
                <img src="../../assets/images/qr_logo@2x.png" alt="">
            </div>
            <div class="login-btn-group">
                <r-button
                        :text="$t('lang7')"
                        bgColor="#FB3B5B"
                        class="setup-addr"
                        width="73.3%"
                        @comfirm="$router.push({path: '/setupAddr'})"/>
                <r-button
                        :text="$t('lang8')"
                        bgColor="#00C58F"
                        class="export-addr"
                        width="73.3%"
                        @comfirm="$router.push({path: '/importWallet'})"/>
                <div class="tips">
                    <label @click="select">
                        <i :class="{'active': isAllow}"></i>
                        {{$t('lang9')}}
                    </label>
                    <span>{{$t('lang10')}}</span>
                </div>
            </div>
        </div>
        <r-modal :title="$t('lang99')"
                 @on-ok="isWalletShow = false"
                 :show="isWalletShow"
                 @on-cancel="isWalletShow = false"
                 :btnText="$t('lang99')">
            <div class="cn-text" v-html="$t('lang98')">
            </div>
        </r-modal>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                isAllow: true,
                isWalletShow: false,
            }
        },
        methods: {
            select(){
                this.isAllow = !this.isAllow
            },
        }
    }
</script>

<style lang="scss" scoped>
    .lang-login{
        display: flex;
        position: absolute;
        right: 10px;
        top: 15px;
        font-size: 14px;
        color: $active;
        align-items: center;
        justify-content: center;
        &:after{
            content: '';
            margin-left: 8px;
            display: inline-block;
            width: 15px;
            height: 15px;
            background: url('../../assets/images/triangle@2x.png') no-repeat;
            background-size: auto 100% ;
        }
    }
    .cn-text{
        color: $color1;
        font-size: 14px;
        padding: 0 15px;
    }
    .container{
        background-color: $nav-bg;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        .logo{
            width: 60%;
            margin: 0 auto;
            padding-bottom: 33.3%;
            img{
                width: 100%;
            }
        }
        .login-btn-group{
            .setup-addr{
                margin-bottom: 20px;
            }
            .export-addr{
                margin-bottom: 61px;
            }
            .tips{
                font-size: 12px;
                color: $active;
                text-align: center;
                span{
                    color: $blue;
                }
                i{
                    display: inline-block;
                    width: 14px;
                    height: 14px;
                    border: 1px solid $white;
                    border-radius: 7px;
                    margin-right: 5px;
                    vertical-align: middle;
                    &.active{
                        background: url('../../assets/images/selection@2x.png');
                        background-size: 100% 100%;
                        border: 0;
                    }
                }
            }
        }

    }
</style>