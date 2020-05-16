<template>
    <section class="acceptCoin">
        <Header :title="$t(`svg57`)"></Header>
        <div class="zhuaninfo">
            <load v-if="loadState"></load>
            <empty v-if="!loadState && list.length <= 0"></empty>
            <div class="zhuan" v-for="item in list" :key="item.time">
                <div class="top">
                    <img src="../../assets/images/night_record_time@2x.png" alt srcset />
                    {{item.time}}
                    <small> ({{item.status ? $t('lang65') : $t('lang64')}})</small>
                </div>
                <template>
                    <div class="center">
                        <div>
                            + {{item.income}} {{unitCoin((item.symbol || '').toUpperCase())}}
                        </div>
                    </div>
                    <div class="last">
                        <span>{{$t('lang118')}} : {{item.context.wk_x_power}} {{unitCoin((item.symbol || '').toUpperCase())}}</span>
                        <span>{{$t('lang119')}} : {{item.context.wk_y_power}} {{unitCoin((item.symbol || '').toUpperCase())}}</span>
                    </div>
                </template>
            </div>
        </div>
        <!-- 兑换 -->
    </section>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        name: "acceptCoin",
        props : ['coin'],
        computed : {
        },
        data() {
            return {
                list : [],
                loadState : true,
            };
        },
        watch : {
        },
        created (){
            this.getData();
            console.log(this.coin);
        },
        methods: {
            getData (){
                this.loadState = true;
                this.list = [];
                this.axios({
                    url : "/service/get_wkprofits",
                    params : {
                        address : this.account.getAddress(),
                        symbol : (this.coin || 'xrp').toLowerCase(),
                    }
                }).then(res => {
                    console.log(res.data);
                    this.list = res.data;
                    this.loadState = false;
                }).catch(e => {
                    console.log(e.message);
                    this.list = [];
                    this.loadState = false;
                });
            },
        }
    };
</script>

<style lang="scss" scoped>
    // xm
    .acceptCoin {
        margin-bottom: 60px;
        .acceptCoin_type {
            display: flex;
            margin-top: 50px;
            justify-content: space-around;
            align-items: center;
            background: $nav-bg;
            height: 35px;
            color: $color1;
            font-size: 14px;
            .divactive {
                height: 100%;
                line-height: 35px;
                color: $active;
                border-bottom: 1px solid $active;
            }
            div:hover {
                color: $active;
                line-height: 35px;
                border-bottom: 1px solid $active;
            }
        }
        .zhuaninfo {
            margin-top :50px;
            border-top: solid 1px $border;
            .zhuan {
                color: $color1;
                padding: 15px;
                font-size: 12px;
                border-bottom: 1px solid $border;
                .top {
                    margin-bottom: 10px;
                    img {
                        width: 12px;
                        height: 12px;
                        margin-right: 5px;
                    }
                }
                .center {
                    margin-bottom: 7px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 16px;
                    font-weight: bold;
                    color: $blue;
                    small{
                        color: $active;
                    }
                    img {
                        width: 8px;
                        height: 8px;
                    }
                }
                .last{
                    color: $active;
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
</style>
