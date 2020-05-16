<template>
    <section class="detais">
        <Header :title="$t(`lang70`)" ></Header>
        <section>
            <div class="text">
                + {{acceptCoin2Item.income}} {{unitCoin((acceptCoin2Item.symbol || '').toUpperCase())}}
            </div>

            <div class="text2">{{$t('lang61')}}:</div>
            <div class="text3">
                {{acceptCoin2Item.buy_count}}
            </div>

            <div class="text2">{{$t('lang62')}}:</div>
            <div class="text3">
                <r-copy :copyText="acceptCoin2Item.related && acceptCoin2Item.related.length ? acceptCoin2Item.related[0] : '-'">
                    {{acceptCoin2Item.related && acceptCoin2Item.related.length ? acceptCoin2Item.related[0] : '-'}}
                </r-copy>
            </div>

            <div class="text2">{{$t('lang63')}}:</div>
            <div class="text3">
                <r-copy :copyText="acceptCoin2Item.related_txid">
                    {{acceptCoin2Item.related_txid}}
                </r-copy>
            </div>

            <div class="text2">{{$t('lang60')}}:</div>
            <div class="text3">
                {{acceptCoin2Item.status != 'zt_comleted' ? $t('lang64') : $t('lang65')}}
            </div>

            <div class="text2">{{$t('type')}}:</div>
            <div class="text3">
                {{acceptCoin2Item.income_type == 'js_y_zhitui' ? $t('lang66') : acceptCoin2Item.income_type == 'js_x_zhitui' ? $t('lang67') : $t('lang68')}}
            </div>

            <div class="text2" v-if="acceptCoin2Item.status != 'zt_waiting'">{{$t('lang69')}}:</div>
            <div class="text3" v-if="acceptCoin2Item.status != 'zt_waiting'">
                <r-copy :copyText="acceptCoin2Item.txid">
                    {{acceptCoin2Item.txid}}
                </r-copy>
            </div>

            <div class="text2">{{$t(`Trade.time`)}}</div>
            <div class="text3">{{acceptCoin2Item.time}}</div>
            <div class="text2">{{$t(`ledgerVersion`)}}</div>
            <div class="text3">{{acceptCoin2Item.block}}</div>
        </section>

    </section>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        name: "detais2",
        props :['id'],
        data(){
            return{
                loadState : true,
            }
        },
        computed : {
            ...mapState([
                'acceptCoin2Item',
            ])
        },
        watch : {
        },
        mounted(){
        },
        created (){
        },
        methods : {
        }
    };
</script>
<style lang="scss" scoped>
     .detais {
        overflow: hidden;
        margin-top: 50px;
        padding: 0 15px;
        .text2 {
            font-size: 12px;
            color: $color1;
            padding: 10px 0;
            word-wrap: break-word;
        }
        .text {
            color: $active;
            font-size: 14px;
            padding: 15px 0;
            border-top: 1px solid $border;
            border-bottom: 1px solid $border;
            word-wrap: break-word;
        }
        .text3 {
            padding-bottom: 10px;
            color: $active;
            font-size: 14px;
            width: 100%;
            word-wrap: break-word;
        }
    }
</style>

