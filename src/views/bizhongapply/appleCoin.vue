<template>
    <section class="walletall">
        <Header :leftEv="leftEv" :title="$t('svg65')" ></Header>
        <load v-if="loadState"></load>
        <empty v-if="list.length <= 0 && loadState == false"></empty>
        <div class="money" v-for="item in list">
            <div class="coin">
                <span>
                    <img v-if="coin_logo[(item.symbol || '').toLowerCase()]" :src="coin_logo[(item.symbol || '').toLowerCase()]" alt="">
                    <i v-else class="op">{{(item.symbol || '-')[0]}}</i>
                    {{(item.symbol || '').toUpperCase()}}
                </span>
                <small>
                    {{$t('svg105')}}：{{item.issuer_price}} USDT
                </small>
            </div>
            <div class="coin2">
                <small>{{$t('svg75')}}</small>
                <span>{{item.genesis_num}} {{(item.symbol || '').toUpperCase()}}</span>
            </div>
            <div class="coin4">
                <div class="shou"  @click="clickItem(item)" >{{$t('svg106')}}</div>
            </div>
        </div>
    </section>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        name: "wallet",
        mounted (){
        },
        data() {
            return {
                list : [],
                loadState : true,
            };
        },
        computed : {
            ...mapState([
                'get_issue_list_item',
            ])
        },
        watch: {

        },
        created (){
            this.getList();
            setTimeout(() => {
                this.getList();
            }, 3000);
        },
        methods:{
            leftEv (){
                this.$router.push('/home');
                return true;
            },
            clickItem(item){
                this.$store.commit('get_issue_list_item', item);
                this.$router.push('/yajin');
            },
            getList (){
                this.axios({
                    url : "/service/get_issue_list",
                    params : {
                    }
                }).then(data => {
                    console.log(data);
                    this.loadState = false;
                    data.data.sort(function () {
                        return Math.random() - 0.5;
                    });
                    this.list = data.data;
                }).catch(e => {
                    this.loadState = false;
                    console.log(e.message);
                })
            },
        }
    };
</script>
<style lang="scss" scoped>
    .adr25{
        color: $blue;
        padding-right: 15px;
        text-align: right;
        font-size: 15px;
    }
    .gateway{
        color: $white;
    }
    .walletall {
        padding: 70px 15px 80px;
        min-height: 90vh;
        margin-bottom: 50px;
        .header{
            border-bottom: solid 1px $border;
        }
        .walletbanner {
            margin-top: 60px;
            height: 137px;
            background: url(../../assets/images/wallet__card_bj@2x.png);
            background-repeat: no-repeat;
            background-size: cover;
            border-radius: 5px;
            overflow: hidden;
            padding: 0 20px;
            color: $white;
            .w-t {
                display: flex;
                justify-content: space-between;
                padding: 20px 0 20px 0;
                align-items: center;
                img {
                    width: 22px;
                    height: 22px;
                }
            }
            .w-t2 {
                font-size: 22px;
                text-align: left;
                span {
                    font-size: 40px;
                }
            }
        }
        .hiddenmoney {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 20px 0;
            color: $color3;
            .h_l {
                display: flex;
                align-items: center;
                font-size: 12px;
                img {
                    margin-right: 5px;
                    width: 12px;
                    height: 12px;
                }
            }
            .h_r {
                height: 24px;
                width: 100px;
                display: flex;
                align-items: center;
                border-radius: 2px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                img {
                    width: 20px;
                    padding: 0 5px;
                    height: 12px;
                }
                input {
                    width: 70px;
                    height: 20px;
                    background: $bg;
                    border: none;
                    color: $white;
                }
            }
            .searchwid {
                width: 150px;
                input {
                    width: 120px;
                }
            }
        }
        .money {
            height: 100%;
            background:$border2;
            margin-bottom: 20px;
            border-radius: 5px;
            box-shadow:0px 0px 15px 0px rgba(0,0,0,0.1);
            .coin {
                padding: 15px 15px 5px 15px;
                font-size: 18px;
                font-weight: 500;
                color: $blue;
                display: flex;
                align-items: center;
                position: relative;
                justify-content: space-between;
                i{
                    display: block;
                    position: absolute;
                    z-index: 10;
                    width: 20px;
                    height: 20px;
                    background: url('../../assets/images/vip@3x.png') no-repeat;
                    background-size: 100% 100%;
                    left:  34px;
                    top: 25px;
                    border-radius: 50%;
                    box-shadow:0px 0px 8px 0px rgba(0,0,0, 0.2);
                    &.op{
                        display: inline-block;
                        position: static;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        background: $blue;
                        color: #fff;
                        font-size: 16px;
                        line-height: 30px;
                        text-align: center;
                        text-transform: uppercase;
                        font-style: normal;
                        margin-right: 8px;
                    }
                }

                img{
                    display: inline-block;
                    height: 30px;
                    margin-right: 10px;
                }
                small{

                    img{
                        height: 16px;
                        display: inline-block;
                        margin-left: 8px;
                    }
                    em{
                        font-style: normal;
                        font-size: 12px;
                        margin-left: 5px;
                    }
                }
                span{
                    display: flex;
                    align-items: center;
                    img{
                        display: inline-block;
                        content: '';
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        background: url("../../assets/images/notice_head_portrait@2x.png") no-repeat;
                        background-size: 100% 100%;
                        margin-right: 10px;
                    }
                }
                &.ust:before{
                    background-image: url("../../assets/images/usdt.webp");
                }
                &.btc:before{
                    background-image: url("../../assets/images/btc@2x.png");
                }
            }
            .coin2 {
                color: $active;
                font-size: 12px;
                padding: 15px;
                display: flex;
                margin: 8px 0 0;
                justify-content: space-between;
                align-items: center;
                border-top: solid 1px $border;
                span {
                    font-size: 20px;
                }
            }
            .coin3 {
                padding: 0 15px 10px 15px;
                font-size: 13px;
                font-weight: 600;
                color: $active;

                display: flex;
                .c_l {
                    width: 50%;
                }
            }
            .coin4 {
                border-top: 1px solid $bg4;
                height: 40px;
                color:$active;
                font-size: 14px;
                overflow: hidden;
                div {
                    line-height: 40px;
                    width: 100%;
                    display: inline-block;
                    text-align: center;
                    color: $blue;
                }
                .shou {
                }
            }
        }
    }
    .cn-text{
        color: $color1;
        font-size: 14px;
        padding: 0 15px;
    }
</style>
