<template>
    <section class="yajin">
        <Header :leftEv="leftEv" :title="$t('svg108')" />
        <empty v-if="gateway && !get_issue_list_item.symbol"></empty>
        <div class="centre" v-else>
            <div class="bzLetterName bz status">
                <span>{{$t('svg109')}}</span>
                <p>
                    {{$t(get_issue_list_item.status)}}
                </p>
            </div>

            <!-- 币种字母名称 -->
            <div class="bzLetterName bz">
                <span>{{$t('svg67')}}</span>
                <p>{{get_issue_list_item.coin_name || '-'}}</p>
            </div>

            <!-- 发行总量 -->
            <div class="gross bz">
                <span>{{$t('svg69')}}</span>
                <p>{{(get_issue_list_item.symbol || '-').toUpperCase()}}</p>
            </div>

            <!-- 发行价 -->
            <div class="issue bz">
                <span>{{$t('svg71')}}</span>
                <p>{{get_issue_list_item.issuer_price || '-'}}</p>
            </div>

            <!-- 发行周期 -->
            <div class="period bz">
                <span>{{$t('lang131')}}</span>
                <p>{{get_issue_list_item.total_num || '-'}}</p>
            </div>

            <!-- 发行周期 -->
            <div class="period bz">
                <span>{{$t('svg75')}}</span>
                <p>{{get_issue_list_item.genesis_num || '-'}}</p>
            </div>

            <!-- 发行周期 -->
            <div class="period bz">
                <span>{{$t('svg110')}}</span>
                <p>
                    <r-copy :copyText="get_issue_list_item.gateway || '-'">{{get_issue_list_item.gateway || '-'}}</r-copy>
                </p>
            </div>

            <!-- 发行周期 -->
            <div class="period bz">
                <span>{{$t('svg77')}}</span>
                <p>{{get_issue_list_item.ipo_num || '-'}}</p>
            </div>

            <!-- 发行周期 -->
            <div class="period bz">
                <span>{{$t('svg80')}}</span>
                <p>{{get_issue_list_item.issuer_months || '-'}}</p>
            </div>

            <!-- 挖矿方案 -->
            <div class="scheme">
                <span>{{$t('svg82')}}</span>
                <p v-if="(get_issue_list_item.issue_data || []).length <= 0">-</p>
                <div class="precept" v-for="item in (get_issue_list_item.issue_data || [])">
                    <div class="top">
                        <span>{{$t('svg83')}}</span>
                        <p>{{item.p}}{{$t('svg107')}}</p>
                    </div>
                    <div class="bottom">
                        <span>{{$t('svg85')}}</span>
                        <p>{{item.r * 100}}%</p>
                    </div>
                </div>
            </div>

            <!-- 创世发行量 -->
            <div class="circulation bz">
                <span>{{$t('svg89')}}</span>
                <p>{{get_issue_list_item.min_chibi || '-'}}</p>
            </div>

            <!-- 币种名称 -->
            <div class="bzname bz">
                <span>{{$t('svg93')}}</span>
                <p>{{get_issue_list_item.issuer_name || '-'}}</p>
            </div>

            <!-- 官方网站 -->
            <div class="official bz">
                <span>{{$t('svg95')}}</span>
                <p @click="clickURL(get_issue_list_item.weburl || '')">{{get_issue_list_item.weburl || '-'}}</p>
            </div>

            <!-- 白皮书链接 -->
            <div class="white bz">
                <span>{{$t('svg97')}}</span>
                <p @click="clickURL(get_issue_list_item.wbookurl || '')">{{get_issue_list_item.wbookurl || '-'}}</p>
            </div>

            <!-- 联系方式 -->
            <div class="connection bz">
                <span>{{$t('svg99')}}</span>
                <p>
                    <r-copy :copyText="get_issue_list_item.contact || '-'">{{get_issue_list_item.contact || '-'}}</r-copy>
                </p>
            </div>

            <!-- 联系方式 -->
            <div class="explain bz">
                <span>{{$t('svg101')}}</span>
                <p>
                    <r-copy :copyText="get_issue_list_item.desc || '-'">{{get_issue_list_item.desc || '-'}}</r-copy>
                </p>
            </div>
        </div>
    </section>
</template>


<script>
    import { mapState } from 'vuex'
    export default {
        data(){
            return{

            }
        },
        props :['gateway'],
        computed : {
            ...mapState([
                'get_issue_list_item',
            ])
        },
        created (){
            console.log(this.get_issue_list_item);
            if(this.gateway){
                this.getInfo();
            }
        },
        methods:{
            clickURL (url){
                // console.log(url);
                if((/file/gi.test(location.href))){
                    plus.runtime.openURL(url);
                }else{
                    location.href = url;
                }
            },
            leftEv (){
                if(this.gateway){
                    return false;
                }else{
                    this.$router.push('/appleCoin');
                    return true;
                }
            },
            getInfo (){
                // /service/get_gateway_info
                this.axios({
                    url : "/service/get_gateway_info",
                    params : {
                        gateway : this.gateway
                    }
                }).then(data => {
                    this.$store.commit('get_issue_list_item', data.data || {});
                    console.log(data);
                }).catch(e => {
                    console.log(e.message);
                })
            },
        }
    }
</script>

<style lang="scss" scoped>

    .yajin{
        height: 100%;
        background: #F9F9F9;
        padding-top: 70px;
        padding-bottom: 20px;
        overflow-y: auto;
        .copy-container{
            color: $active;
        }
        .header{
            border-bottom: solid 1px $border;
        }
        .centre{
            width: 94%;
            margin: 0 auto;
            background: #fff;
            box-shadow:0px 3px 5px 0px rgba(0,0,0,0.06);
            border-radius:2px;
            padding-top: 20px;
            .bz{
                width: 100%;
                padding: 15px 15px 15px 15px;
                position: relative;
                border-bottom: solid 1px $border;
                &.status{
                    p{
                        color: $blue;
                        font-size: 16px;
                        padding-bottom: 10px;
                    }
                }
                span{
                    display: block;
                    font-size: 12px;
                    line-height: 12px;

                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(167,167,167,1);
                }
                p{
                    margin-top: 10px;
                    display: block;
                    font-size: 14px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color: #333333;
                    line-height:14px;
                }
            }

            .scheme{
                width: 100%;
                background: #fff;
                margin-top: 10px;
                padding: 0 15px 16px 15px;
                border-radius:2px;
                position: relative;
                span{
                    font-size: 12px;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                }
                .tianjia{
                    float: right;
                    width: 12px;
                    height: 12px;
                    img{
                        width: 12px;
                        height: 12px;
                    }
                }
                .precept{
                    width: 100%;
                    height: 88px;
                    padding: 15px 12px 15px 12px;
                    background:rgba(233,233,233,0.5);
                    border-radius:2px;
                    border:0.5px solid rgba(233,233,233,1);
                    margin-top: 5px;
                    .top{
                        border-bottom: 0.5px solid rgba(233,233,233,1);
                        padding-bottom: 5px;
                        p{
                            float: right;
                            text-align: right;
                            background: rgba(233,233,233,0.1);
                            margin-top: 3px;
                            color: #A7A7A7;
                        }
                    }
                    .bottom{
                        margin-top: 10px;
                        p{
                            float: right;
                            text-align: right;
                            background: rgba(233,233,233,0.1);
                            margin-top: 3px;
                            color: #A7A7A7;
                        }
                    }
                }
            }

            .scheme:after{
                content:"";
                width: 92%;
                height: 0.5px;
                background-color:rgba(233,233,233,1);
                position:absolute;
                left:15px;
                right: 0;
                bottom:0;
                z-index:20;
            }

            .bz:after{
                content:"";
                width: 92%;
                height: 0.5px;
                background-color:rgba(233,233,233,1);
                position:absolute;
                left:15px;
                right: 0;
                bottom:0;
                z-index:1;
            }
        }
        .add{
            position: absolute;
            width: 100%;
            height: 74px;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 10px 15px 20px 15px;
            button{
                display: block;
                width: 100%;
                height: 44px;
                background: #FB3B5B;
                border: 0;
                border-radius:3px;
                font-size: 18px;
                color: #fff;
                text-align: center;
                line-height: 44px;
            }
        }
    }
</style>