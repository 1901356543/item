<template>
    <section class="scanning">
        <!--<Header :title="$t(`wallet.scanning1`)" :righttext='$t(`wallet.scanning2`)'></Header>-->
        <Header :title="$t(`wallet.scanning1`)" ></Header>
        <div class="content" id="qr_transfer">
        </div>
        <div class="erweim">
            <div class="erbox"  @click="toRoute('/scanning')">
                <img v-if="!showshoukuan" src="../../assets/images/scan_white@2x.png" alt="" srcset="">
                <img   v-else src="../../assets/images/scan_white_prohibit@2x.png" alt="" srcset="">
                <div :class="showshoukuan?'':'coloractive'">{{$t(`wallet.scanning1`)}}</div>
            </div>
            <div class="erbox" @click="toRoute('/shoukuan')">
                <img v-if="showshoukuan" src="../../assets/images/qr_white@2x.png" alt="" srcset="">
                <img v-else src="../../assets/images/qr_white_prohibit@2x.png" alt="" srcset="">
                <div :class="!showshoukuan?'':'coloractive'">{{$t(`wallet.scanning3`)}}</div>
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        name: "scanning",
        props :['type'],
        data() {
            return {
                showshoukuan: false
            };
        },
        mounted() {
            setTimeout(() => {
                this.createBarcode();
            }, 300);
        },
        beforeDestroy() {
            // console.log('beforeDestroy');
            if (this.barcode) {
                console.log("beforeDestroy");
                this.barcode.cancel();
                this.barcode.close();
                this.barcode = null;
            }
        },
        methods: {
            createBarcode() {
                // this.$router.push({name:"_transfer", params: {username:'13699864733'}});
                if (typeof plus == "object") {
                    var that = this;
                    if (!this.barcode) {
                        this.barcode = new plus.barcode.Barcode("qr_transfer");
                        console.log(this.barcode);
                        this.barcode.onmarked = function(type, result) {
                            console.log(result);
                            if(that.type){
                                that.$router.push(`/zhuanqian2/${that.type}/${result}`);
                            }else{
                                that.$router.push(`/zhuanqian/XRP/${result}`);
                            }
                        };
                        this.barcode.onerror = function(error) {
                            // loaded code
                            console.log(error);
                            that.$store.commit("msg", error.message);
                        };
                    }
                    this.barcode.start();
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    body,
    html,
    #app {
        background: none !important;
    }
#qr_transfer{
    background: #333;
}
    .scanning {
        background: $bg;
        padding-top: 50px;
        width: 100vw;
        height: 100vh;
        text-align: center;
        display: flex;
        justify-content: center;
        .content {
            position: absolute;
            top: 50px;
            bottom: 0;
            left: 0;
            width: 100vw;
            background: $white;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            opacity: 0.1;
        }
        .coloractive {
            color: $active;
        }
        .erweim {
            position: absolute;
            bottom: 40px;
            width: 100%;
            display: flex;
            justify-content: space-around;
            .erbox {
                color: $color6;
                font-size: 14px;
                img {
                    width: 30px;
                    height: 30px;
                    margin-bottom: 10px;
                }
            }
        }
    }
</style>

