<template>
    <section class="advert">
        <Header :title="$t('ad')"></Header>
        <empty v-if="adData.length <= 0"></empty>
        <div class="advertbox" v-for="(item,index) in adData" :key="item.date + item.title" @click="$router.push('/advertDetails/' + index)">
            <div class="text">{{item.title}}</div>
            <div class="time">{{$t('Trade.time')}} : {{item.time}}</div>
        </div>
    </section>
</template>
<script>
    export default {
        name: "advert",
        data() {
            return {};
        },
        methods: {

        }
    };
</script>
<style lang="scss" scoped>
    // xm 2019/11/20
    .advert {
        margin: 50px 0;
        .advertbox {
            padding: 20px 15px;
            border-top: 1px solid $border;
            border-bottom: 1px solid $border;
            .text {
                color: $active;
                font-size: 14px;
                margin-bottom: 10px;
            }
            .time {
                color: $primary;
                font-size: 12px;
            }
        }
    }
</style>

