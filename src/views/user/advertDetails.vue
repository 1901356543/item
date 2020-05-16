<template>
    <section class="advertDetails">
        <Header :title="$t('adDetails')"></Header>
        <div class="title">{{item.title}}</div>
        <div class="team">
            <img src="../../assets/logo.png" alt="" srcset="">
            <div class="tema_r">
                <div class="text">{{item.author}}</div>
                <div class="time">{{$t('Trade.time')}} : {{item.time}}</div>
            </div>
        </div>
        <!--<div class="content">-->
            <!--<table style="width: 100%; text-align: center;border: solid 1px #ccc;">-->
                <!--<tr style="border-bottom: solid 1px #ccc; height: 40px">-->
                    <!--<th>USDT</th>-->
                    <!--<th>排名</th>-->
                    <!--<th>地址数量</th>-->
                    <!--<th>空投额度</th>-->
                <!--</tr>-->
                <!--<tr style="border-bottom: solid 1px #ccc; height: 40px">-->
                    <!--<td>100~200</td>-->
                    <!--<td>1</td>-->
                    <!--<td>1000</td>-->
                    <!--<td>30</td>-->
                <!--</tr>-->
                <!--<tr style="border-bottom: solid 1px #ccc; height: 40px">-->
                    <!--<td>100~200</td>-->
                    <!--<td>1</td>-->
                    <!--<td>1000</td>-->
                    <!--<td>30</td>-->
                <!--</tr>-->
            <!--</table>-->
        <!--</div>-->
        <div class="content" v-html="item.info">
        </div>
    </section>
</template>
<script>
    export default {
        name: "advertDetails",
        props : ["index"],
        data (){
            return {
                item : {},
            }
        },
        created (){
        },
        watch : {
            adData (){
                this.item = this.adData[this.index] || {}
            }
        },
        mounted (){
            this.item = this.adData[this.index] || {}
        }
    };
</script>
<style lang="scss">
    .content a{
        color: $blue !important;
    }
</style>
<style lang="scss" scoped>
    // xm 2019/11/20
    .advertDetails {
        margin: 50px 15px;
        .title {
            font-size: 22px;
            font-weight: 600;
            padding: 20px 0;
            color: $active;
        }
        .team {
            display: flex;
            padding: 15px 0;
            align-items: center;
            margin-bottom: 15px;
            border-bottom: 1px solid $border3;
            img {
                width: 35px;
                height: 35px;
            }
            .tema_r {
                margin-left: 10px;
                color: $active;
                font-size: 14px;
                .time {
                    margin-top: 5px;
                    color: $active;
                }
            }
        }
        .content {
            color: $active;
            div{
                margin-bottom: 20px;
            }
        }
    }
</style>
