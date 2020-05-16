<template>
    <section class="trade">
        <Header :title="$t(`Trade.tradecenter`)"></Header>
        <!-- 导航币种类型 -->
        <coininfo></coininfo>

        <div class="box">
            <!-- 左侧买入卖出 -->
            <buysell></buysell>
            <!--  深度-->
            <depth></depth>
        </div>

        <!-- 当前委托 -->
        <entrust></entrust>
    </section>
</template>
<script>
    import coininfo from "./coininfo.vue"; ////行情
    import buysell from "./buy-sell"; //买入卖出
    import depth from "./depth"; //深度
    import entrust from "./entrust"; //深度
    export default {
        name: "trade",
        components: {
            coininfo,
            buysell,
            depth,
            entrust
        },
        created (){

        },
        methods : {
        }
    };
</script>
<style lang="scss" scoped>
    .trade {
        margin-top: 50px;
        position: relative;
        text-transform: uppercase;
        .box{
            display: flex;
            width: 100%;
            justify-content: space-between;

        }
    }
</style>


