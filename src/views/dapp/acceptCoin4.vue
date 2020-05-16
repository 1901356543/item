<template>
    <section class="acceptCoin">
        <Header :title="$t(`svg20`)"></Header>
        <div class="acceptCoin_type">
            <div  :class="0 == activeIdx ? 'divactive' : '' "  @click="activeIdx = 0">{{$t(`svg16`)}}</div>
            <div  :class="1 == activeIdx ? 'divactive' : '' "  @click="activeIdx = 1">{{$t(`svg17`)}}</div>
        </div>
        <div class="zhuaninfo">
            <load v-if="loadState"></load>
            <empty v-if="!loadState && (activeIdx == 0 ? list1.length <= 0 : list2.length <= 0)"></empty>
            <div class="zhuan" v-for="item in (activeIdx == 0 ? list1 : list2)" :key="item.id">
                <div class="top">
                    <img src="../../assets/images/night_record_time@2x.png" alt srcset />
                    {{item.time}}
                </div>
                <template>
                    <div class="center">
                        <div>
                            {{activeIdx == 0 ? '+' : '-'}} {{item.amount}} {{unitCoin((item.symbol || '').toUpperCase())}}
                        </div>
                    </div>
                    <div class="last">
                        <r-copy :copyText="item.to">{{item.to || '-'}}</r-copy>
                    </div>
                    <div class="last">
                        <r-copy :copyText="item.txid">{{item.txid || '-'}}</r-copy>
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
        name: "acceptCoin4",
        computed : {
            ...mapState([
                'acceptCoin2Item',
            ])
        },
        data() {
            return {
                list : [],
                list1 : [],
                list2 : [],
                loadState : true,
                routerNum : 0,
                activeIdx : 0,

            };
        },
        watch : {
        },
        created (){
            this.getData();
        },
        methods: {
            clickItem (item){
                this.$store.commit('acceptCoin2Item', item);
                this.$router.push('/detais2')
            },
            leftEv (){
                if(this.routerNum > 3){
                    this.$router.push('/wallet');
                    return true;
                }else{
                    return false;
                }
            },
            getData (){
                this.loadState = true;
                this.list = [];
                this.axios({
                    url : "/service/get_deposit_withdraw_list",
                    params : {
                        address : this.account.getAddress()
                    }
                }).then(res => {
                    console.log(res.data);
                    this.list = res.data.deposit;
                    this.list1 = res.data.deposit;
                    this.list2 = res.data.withdraw;
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
        .last{
            word-wrap:break-word;
        }
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
                    font-size: 14px;
                    font-weight: 500;
                    color: $active;
                    small{
                        color: $active;
                    }
                    img {
                        width: 8px;
                        height: 8px;
                    }
                }
            }
        }
    }
</style>
