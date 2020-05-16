<template>
    <div class="container">
        <Header :title="$t('lang35')"/>
        <div class="lang-list">
            <div class="lang-item" @click="selectCoin('CNY')">
                <p>{{$t('lang36')}} CNY</p>
                <i class="selection" :class="{select : moneyUnit == 'CNY'}"></i>
                <span class="line"></span>
            </div>
            <div class="lang-item" @click="selectCoin('USD')">
                <p>{{$t('lang37')}} USD</p>
                <i class="selection" :class="{select : moneyUnit == 'USD'}"></i>
                <span class="line"></span>
            </div>
            <div class="lang-item" @click="selectCoin('EUR')">
                <p>{{$t('lang38')}} EUR</p>
                <i class="selection" :class="{select : moneyUnit == 'EUR'}"></i>
                <span class="line"></span>
            </div>
            <div class="lang-item" @click="selectCoin('RUB')">
                <p>{{$t('lang39')}} RUB</p>
                <i class="selection" :class="{select : moneyUnit == 'RUB'}"></i>
                <span class="line"></span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    created(){
    },
    methods: {
        selectCoin(name){
            this.$store.commit('moneyUnit', name);
        },
    }
}
</script>
<style lang="scss" scoped>
.container{
    .lang-list{
        margin-top: 50px;
    }
    .lang-item{
        display: flex;
        align-items: center;
        padding: 25px 15px;
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
            background: $inpBg;
            position: absolute;
            bottom: 0;
            display: inline-block;
            width: 100%;
            left: 0;
        }
    }
}
</style>