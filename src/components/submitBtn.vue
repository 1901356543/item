<template>
    <div class="btn" @click="submitCallback" >
        <div v-if="state" class="loader5"></div>
        <slot v-else></slot>
    </div>
</template>
<script>
    export default {
        props: {
            state: false,
            submit : {
                type : Function,
                default : () => {}
            }
        },
        created(){
        },
        data() {
            return {};
        },
        methods: {
            submitCallback() {
                // if (this.state) return;
                this.submit();
            }
        }
    };
</script>
<style lang="scss" scoped>
    .btn{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .loader5 {
        display:inline-block;
        width: 0;
        height:0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid $bg2  ;
        border-top: 10px solid #faaacc;
        -webkit-animation: loader5 3s ease-in-out infinite alternate;
        animation: loader5 3s ease-in-out infinite alternate;
    }

    @keyframes loader5 {
        from {transform: rotate(0deg);}
        to {transform: rotate(720deg);}
    }
    @-webkit-keyframes loader5 {
        from {-webkit-transform: rotate(0deg);}
        to {-webkit-transform: rotate(720deg);}
    }
</style>