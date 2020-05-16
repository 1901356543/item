<template> 
    <div class="container">
        <Header :title="$t('inviteTitle')" color="none" titleColor="#fff" :leftIcon="require('../../assets/images/home_search_white.png')" :rightEv='toacceptCoin' :rightIcon="require('../../assets/images/record@2x.png')"/>
        <div class="logo">
            <img src="../../assets/images/qr_logo.png" alt="">
        </div>
        <div class="content">
<!--            <div class="tab-address">
                <span  :class="{active : activeState == 0}" @click="activeState = 0">{{$t('invite1')}}</span>
                <span  :class="{active : activeState == 1}" @click="activeState = 1">{{$t('invite2')}}</span>
            </div>-->
            <div class="tab-address">我的邀请码</div>
            <div class="code">
                32136
            </div>
            <div class="text">{{$t('inviteText')}}</div>
            <rQrcode class="rQrcode" :qrcodeUrl="activeState == 0 ? inviteX : inviteY"/>
            
            <!-- <div class="invite-qrcode">
                <rQrcode qrcodeUrl="www.baidu.com"/>  
            </div> -->
            <r-copy copyText="fuzhifuzhi">
                <r-button bgColor="linear-gradient(315deg,rgba(251,59,91,1) 0%,rgba(255,103,128,1) 100%)"
                      text="复制推广链接"
                      width="76%"
                      class="invite-button"></r-button>
            </r-copy>
            
        </div>
    </div>
</template>
<script>
    export default {
        data (){
            return {
                activeState : 0
            }
        },
        methods : {
            toacceptCoin (){
                this.$router.push('/invteRecord')
            }
        }
    }
</script>
<style lang="scss" scoped>
.container{
    background-image: url('../../assets/images/qr_bj@2x.png');
    background-size: 100% 100%;
    .rQrcode{
        width: 200px;
        height: 200px;
        margin: 0 auto;
    }
    .tab-address{
        display: flex;
        height: 50px;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        span{
            flex: 1;
            font-size: 16px;
            color: $color1;
            &.active{
                color: $active;
                cursor: pointer;
            }
        }
    }
    .logo{
        width: 100%;
        margin: 0 auto;
        img{
            width: 100%;
            max-width: 100px;
            display: block;
            margin: 0 auto;
            padding: 81px 0 26px;

        }
    }
    .content{
        background-image: url('../../assets/images/qr_bj_white@2x.png');
        background-size: 100% 100%;
        padding-bottom: 30px;
        padding-top: 20px;
        border-radius: 30px;
        width: 92%;
        margin: 0 auto;
        text-align: center;
        .title{
            font-size: 16px;
            padding: 30px 0;
            color: #333;
        }
        .code{
            font-size: 44px;
            max-width: 80%;
            text-transform: lowercase;
            color: $blue;
            margin: 30px auto 35px;
        }
        .text{
            color: #8A8A8A;
            font-size: 14px;
            margin-bottom: 55px;
        }
        .invite-qrcode{
            width: 45%;
            margin: 0 auto 30px;
        }
        .invite-button{
            padding-bottom: 20px;
        }
    }
}
</style>