<template>
    <div class="download-container">
        <div class="turn-back">
            <img src="../../assets/images/home_search_white.png" @click="$router.go(-1)" alt=""/>
        </div>
        <div class="download-logo">
            <img src="../../assets/images/home_logo.png" alt=""/>
        </div>
        <section class="browser-download" v-if="state" >
            {{$t('Please open it in the browser')}} ↑
        </section>
        <div class="download-btn">
            <r-button width="64%"
                      bgColor="linear-gradient(135deg,#FF6780 0%,#FB3B5B 100%)"
                      :text="'Android ' + $t('download')"
                      icon="download_android"
                      class="d-btn" @comfirm="clickURL(android || 'https://rcposs.oss-accelerate.aliyuncs.com/sgy/SGY.v.1.3.9.apk')" />

            <!--<r-button width="64%"
                     bgColor="$active"
                     :text="$t('svg32')"
                     icon="download_ios"
                     class="d-btn" @comfirm="clickURL('itms-services://?action=download-manifest&url=https://rcposs.oss-accelerate.aliyuncs.com/sgy/sgy.plist')"/>
            -->
            <r-button width="64%"
                      bgColor="linear-gradient(135deg,#FF6780 0%,#FB3B5B 100%)"
                      :text="'IOS TestFlight' + $t('download')"
                      icon="download_ios"
                      class="d-btn" @comfirm="clickURL('https://testflight.apple.com/join/xpARxJLh')"/>
            <!--<r-button width="64%"
                      bgColor="$active"
                      text="登录WEB版本"
                      icon="download_web"
                      class="d-btn"/>-->
        </div>
        <!--  -->
        <div class="download-qrcode">
            <rQrcode qrcodeUrl="http://download.sgy.plus/#/download"/>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                state : false,
                android : "",
            }
        },
        created (){
            this.micromessenger();
            this.getUrl();
        },
        methods : {
            clickURL (url){
                // console.log(url);
                if((/file/gi.test(location.href))){
                    plus.runtime.openURL(url);
                }else{
                    location.href = url;
                }
            },
            getUrl (){
                this.axios({
                    url : "/service/app_info"
                }).then(res => {
                    console.log(res.data);
                    this.android = res.data.app_android_download;
                }).catch(e => {
                    console.log(e);
                })
            },
            micromessenger () {
                if (/micromessenger/gi.test(navigator.userAgent)) {
                    this.state = true;
                }
            },
            dispark (){
                this.$toast.show(this.$t('dispark'));
            },
            downloadApp (){
                location.href = this.android || 'http://rcposs.oss-accelerate.aliyuncs.com/sgy/SGY.v.1.3.9.apk';
            }
        }
    }
</script>
<style lang="scss" scoped>
    .browser-download{
        position: absolute;
        // yes or no
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.4);
        color: $white;
        padding-top: 40px;
        font-size: 20px;
        padding-right: 10px;
        text-align: right;
    }
    .download-container{
        background-image: url('./../../assets/images/download_bj@2x.png');
        background-size: 100% 100%;
        width: 100%;
        height: 100%;
        max-width: 750px;
        margin: 0 auto;
        .turn-back{
            position: absolute;
            left: 0;
            top: 0;
            padding: 15px;
            img{
                width: 22px;
            }
        }
        .download-logo{
            width: 100%;
            margin: 0 auto;
            padding: 88.5px 0 50px;
            img{
                width: 100%;
                max-width: 170px;
                display: block;
                margin: 0 auto;
            }
        }
        .download-btn{
            .d-btn{
                margin-bottom: 30px;
            }
        }
        .download-qrcode{
            width: 38.6%;
            margin: 0 auto;
            padding-top: 35px;
        }
    }
</style>
