<template>
    <div class="copy-container"
         v-clipboard:copy="copyText"
         v-clipboard:success="onCopy"
         v-clipboard:error="onError">
        <slot></slot>
    </div>
</template>

<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

export default {
    props: {
        copyText: String,

    },
    methods: {
        onCopy(){
            this.$toast.show(this.$t('copySucceed'))
            this.open_record('copy');
        },
        onError(err){
            console.log(err);
            this.$toast.show(this.$t('复制失败'))
        }
    }
}
</script>

<style lang="scss" scoped>
.copy-container{
    color:$blue;
}

</style>