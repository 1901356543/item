<template>
    <section class="header" :style="`background:${color}`">
        <img  v-if="leftShow && !leftIcon"  @click="reply" src="../assets/images/return_black@2x.png" alt="" class="icon_l">
        <img  v-if="leftShow && leftIcon"  @click="reply" :src="leftIcon" alt="" class="icon_l">
        <span :style="`color:${titleColor}`">{{title}}</span>
        <span  @click="totextpath"  v-if="righttext" class="text_r" >{{righttext}}</span>
        <img @click="topath"  v-if="rightIcon" :src="rightIcon" alt="" class="icon-r">
        <img v-if="$route.name == 'home'" src="../assets/images/ewm.png" alt="" @click="$router.push('/shoukuan/XRP')" class="icon-r ewm">
    </section>
</template>
<script>
    /**
     * 引用方式
     *   <header  left-icon="bg.png" :left-show="true" :right-icon="require('../../assets/images/home_c2c_press.svg')" :back-func="func1" :right-ev="func2" title="首页1"></t-nav>
     */

    export default {
        name: "",
        data() {
            return {};
        },
        props: {
            titleColor: {
                // 背景色
                type: String,
                default: '$bg;',
            },
            color: {
                // 背景色
                type: String,
                default: '$bg;',
            },
            leftIcon: {
                //  左侧图标地址
                type: String,
                default: ""
            },
            leftEv: {
                // 左侧event
                type: Function,
                default: () => {
                    return null;
                }
            },
            leftShow: {
                // 是否显示返回按钮
                type: Boolean,
                default: true
            },
            title: {
                // 居中标题
                type: String,
                default: "首页"
            },
            righttext: {
                // 居中标题
                type: String,
                default: ""
            },
            rightIcon: {
                // 右侧图标地址
                type: String,
                default: ""
            },
            rightEv: {
                // 右侧event
                type: Function,
                default: () => {
                    return null;
                }
            }
        },
        methods: {
            topath() {
                if (this.rightEv) {
                    this.rightEv();
                    return;
                }
            },
            totextpath(){
                if (this.rightEv) {
                    this.rightEv();
                    return;
                }
            },
            reply() {
                if(this.leftEv()){
                    return;
                }
                if (typeof plus == "object") {
                    let webview = plus.webview.getLaunchWebview();
                    webview.back();
                } else {
                    this.$router.go(-1);
                    // if((this.$route.name=='shoukuan'||this.$route.name=='scanning')){
                    //     this.$router.push({name:'wallet'});
                    // }else {
                    //     this.$router.go(-1);
                    // }
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    .header {
        background: $bg;
        z-index: 10;
        height: 50px;
        font-size: 18px;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        color:$active;
        text-align: center;
        span {
            line-height: 50px;
            
        }
        img {
            width: 25px;
            height: 25px;
            margin-top: 13px;
        }
        .icon_l {
            position: absolute;
            left: 15px;
        }
        .icon-r {
            position: absolute;
            right: 15px;
            &.ewm{
                margin-top: 10px;
                width: 30px;
                height: 30px;
                right: 50px;
            }
        }
        .text_r{
            position: absolute;
            right: 15px;
            font-size: 14px;
            color: $color1;
        }
    }
</style>