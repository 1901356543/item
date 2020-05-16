<template>
    <div class="modal-bg" v-show="show">
        <div class="modal-container">
            <div class="modal-header">
                {{title}}
            </div>
            <div class="modal-content">
                <slot></slot>
            </div>
            <div class="modal-footer">
                <button class="cancel" @click="hideModal">{{$t('wallet.zhuanqian7')}}</button>
                <button class="comfirm" @click="submit">{{btnText || $t('confirm')}}</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ''
            },
            btnText: {
                type: String,
                default: ''
            },
        },
        methods: {
            hideModal(){
                this.$emit('on-cancel')
            },
            submit(){
                this.$emit('on-ok')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .modal-bg{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
        z-index: 10000;
        .modal-container{
            background: $border2;
            width: 92%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius:5px;
            padding: 0 0 15px;
            position: absolute;
            color:$white;
            .modal-header{
                text-align: center;
                padding: 30px 0;
                color: $black;
                font-size: 18px;
            }
            .modal-footer{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 25px 15px 15px;
                button{
                    border-radius: 4px;
                    font-size: 16px;
                    text-align: center;
                    appearance: none;
                    border: 0;
                    width: 45%;
                    padding: 14px 0;
                    background-color: transparent;
                }
                .cancel{
                    border:1px solid $primary;
                    color:#97A2AF;
                }
                .comfirm{
                    color: $white;
                    background-color: $blue;
                }
            }
        }
        .inp-password{
            // background:$inbg;
         
            // border:1px solid $color1;
            border:none;
            margin: 0 15px;
            input{
                   border-radius:6px;
                appearance: none;
                outline: none;
                font-size: 14px;
                padding: 12px;
                color: $active;
                background-color:$inbg;
                width: 100%;    
                &::placeholder{
                    color: $color1;
                }
            }
        }
    }
</style>