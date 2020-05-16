<template>
    <div class="container">
        <Header :title="$t('lang140')"/>
        <iframe :src="`https://explorer.sgy.plus/#/home?${(new Date()).getTime()}&id=${id}&active_address_count=${rcp_info.active_address_count || 0}`" id="explorer"></iframe>
    </div>
</template>
<script>
export default {
    name : "explorer",
    data(){
        return {
            id: '',
        }
    },
    created(){
        if(this.$route.params.id){
            this.id = this.$route.params.id;
        }
    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
.container{
    #explorer{
        display: block;
        border: none;
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0px;
        top: 0px;
    }
    .lang-list{
        margin-top: 50px;
    }
    .lang-item{
        display: flex;
        align-items: center;
        padding: 14px 15px;
        position: relative;
        .icon{
            width: 20px;
            height: 20px;
            display: inline-block;
            background-size: 100% 100%;
            margin-right: 10px;
            &.china{
                background-image: url('../../assets/images/china@2x.png')
            }
            &.hongkong{
                background-image: url('../../assets/images/hongkong@2x.png')
            }
            &.usa{
                background-image: url('../../assets/images/usa@2x.png')
            }
            &.russia{
                background-image: url('../../assets/images/russia@2x.png')
            }
        }
        p{
            font-size: 14px;
            color: $active;
        }
        i.select{
            width: 14px;
            height: 14px;
            display: inline-block;
            background-size: 100% 100%;
            background-image: url('../../assets/images/selection@2x.png');
            position: absolute;
            right: 15px;
        }
        span.line{
            height:1px;
            background:$border;
            position: absolute;
            bottom: 0;
            display: inline-block;
            width: 100%;
            left: 0;
        }
    }
}
</style>