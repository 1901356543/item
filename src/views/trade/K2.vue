<template>
    <div class="k-box">
        <div id="chart_container" ></div>
    </div>
</template>
<script>
    export default {
        name:'k2',
        data (){
            return {

            }
        },
        mounted (){
            this.getKlineData();
        },
        destroyed (){

        },
        methods : {

        }
    }
</script>
<style lang="scss" scoped>
    .k-box{
        z-index: 99999;
        height: 400px;
        border-bottom: solid 1px $border;
        margin-bottom: 10px;
        background: #fff;
        box-shadow:0px 0px 10px 0px rgba($border, 0.1);
        #chart_container {
            z-index: 1;
            position: relative;
            height: 100%;
            &.full-screen{
                position: fixed;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                z-index: 999999999999;
            }
            iframe {
                display: block;
                position: relative;
                z-index: 1;
                width: 100%;
                height: 100%;
                background: #fff;
            }
        }
    }
</style>

