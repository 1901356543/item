<template>
    <section class="guide">
        <span class="skip" @click="close"></span>
        <!--<video v-if="videoState"  id="video5" autoplay muted src="../assets/ADRmp4.mp4" :class="{show : showState}">-->
            <!--Sorry, your browser doesn't support embedded videos.-->
        <!--</video>-->
        <section v-if="videoState && showState" class="video-bg"></section>
        <div class="swiper-container2">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src="../assets/images/1.png" alt="">
                </div>
                <div class="swiper-slide">
                    <img src="../assets/images/2.png" alt="">
                </div>
                <div class="swiper-slide">
                    <img src="../assets/images/3.png" alt="">
                </div>
                <div class="swiper-slide">
                    <img src="../assets/images/4.png" alt="">
                    <span class="img-skip" @click="close"></span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Swiper from "swiper";
    export default {
        name: "guide",
        data() {
            return {
                swiper : null,
                videoState : true,
                showState : true,
            }
        },
        mounted (){
            this.banner();
            let video = document.querySelector("#video5");
            video.addEventListener("ended", () => {
                this.videoState = false;
            });
            setTimeout(() => {
                this.showState = false;
            }, 1000);
        },
        destroyed() {
        },
        methods : {
            close (){
                if(/offlinewallet/gi.test(navigator.userAgent)){
                    let version = '1.0.0';
                    if(typeof plus == 'object'){
                        version = plus.runtime.version;
                    }
                    localStorage.setItem(version, 1);
                }else{
                    localStorage.setItem('guide2', 1);
                }
                this.$store.commit("guide", 1);
            },
            banner() {
                this.swiper = new Swiper(".swiper-container2", {
                    autoplay : false,
                    // pagination: {
                    //     el: ".swiper-pagination",
                    //     // dynamicBullets: true
                    // },
                    loop: false,
                    // autoplay: {
                    //     delay: 3000,
                    //     stopOnLastSlide: false,
                    //     disableOnInteraction: true
                    // }
                });
            },
        }
    }
</script>

<style scoped lang="scss">
    .guide{
        display: block;
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 9999;
        background: #000;
        video, .video-bg{
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 99999;
            background: #000;
            &.show{
                z-index: 10;
            }
        }
        .skip{
            display: block;
            position: absolute;
            right: 0;
            top: 4%;
            width: 30%;
            height: 8%;
            z-index: 9999;
        }
        .img-skip{
            display: block;
            position: absolute;
            z-index: 9999;
            width: 40%;
            height: 8%;
            bottom: 9%;
            left: 30%;
        }
    }
    .swiper-container2{
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
        background: #13219a;
        .swiper-slide{
            img{
                display: block;
                width: 100%;
                height: 100%;
            }
        }
    }
</style>