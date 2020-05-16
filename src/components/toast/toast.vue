<template>
    <div class="container" v-show="isShowToast">
        <span class="toast-text" v-html="content.replace(/XRP/gi, 'SGY')"></span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isShowToast: false

            };
        }
    };
</script>

<style lang="scss" scoped>
    .toast-text {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        min-width: 200px;
        max-width: 80%;
        line-height: 1.4;
        background: $bg5;
        border-radius: 10px;
        color: $white;
        padding: 10px 20px;
        z-index: 999999;
        text-align: center;
        box-shadow: 0px 0px 10px $border3;
    }
</style>