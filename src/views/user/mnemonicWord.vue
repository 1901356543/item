<template>
  <div class="container">
      <Header v-if="appUpdateStatus" :title="$t('lang25')" :righttext="$t('skip')" :rightEv="toHome" />
      <Header v-else :title="$t('lang25')"/>
      <!-- 第一步 -->
      <div class="content" v-if="stepType == 0">

          <!-- tips -->
          <div class="tips">
              <p>{{$t('lang15')}}</p>
              <p>{{$t('lang16')}}</p>
          </div>

          <!-- 助记词列表  -->
          <div class="fill-in-world">
            <div class="fill-item" v-for="item in data">
                {{item}}
            </div>
          </div>
          <!-- 提交按钮 -->
          <r-button width="91%" :text="$t('lang17')" class="submit" @comfirm="nextStep(1)"/>
      </div>

      <!-- 下一步 -->
      <div class="content" v-if="stepType == 1">
          <!-- tips -->
          <div class="tips">
              <p>{{$t('lang18')}}</p>
          </div>
          <!-- 填写助记词  -->
          <div class="fill-in-world">
            <div class="fill-item" v-for="(item,i) in selectData" :key="item" @click="delWorld(item, i)">
                {{item}}
            </div>
          </div>
          <div class="error-msg" v-if="errorMsg">*{{errorMsg}}</div>
          <!-- 选择助记词列表 -->
          <div class="word-list">
              <div class="word-item" v-for="(item,i) in randomData" :key="item" @click="selectWorld(item, i)">
                  {{item}}
              </div>
          </div>
          <!-- 提交按钮 -->
          <r-button width="91%"
                    :text="$t('lang19')"
                    class="submit"
                    @comfirm="comfirm"/>
      </div>

      <!-- 完成 -->
      <div class="content" v-if="stepType == 2">
          <div class="success-content">
              <img src="../../assets/images/private_key_success@2x.png" alt="">
              <p class="success-txt">{{$t('lang20')}}</p>
              <div class="attention">
                  <p>{{$t('lang21')}}</p>
                  <p>{{$t('lang22')}}</p>
              </div>
          </div>
          <r-button width="91%"
                    :text="$t('lang23')"
                    class="submit"
                    @comfirm="done"/>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            // stepType: 0, //0 1 2
            data : [],
            randomData : [],
            selectData : [],
            errorMsg : '',
        }
    },
    props: {
        mnemonic : String,
        stepType : 0,
    },
    watch : {
        selectData (){
            if(this.selectData.length == this.data.length && this.selectData.join('') != this.data.join('')){
                this.errorMsg = this.$t('lang24');
            }else{
                this.errorMsg = "";
            }
        }
    },
    mounted (){
        this.data = (this.mnemonic || '').split(' ');
        let data = (this.mnemonic || '').split(' ');
        for (let ran = 0; ran < this.data.length; ran ++){
            this.randomData.push(data.splice(Math.floor(Math.random() * data.length), 1)[0]);
        }
        // console.log(this.mnemonic);
    },
    methods: {
        toHome(){
            this.$router.push('/');
        },
        delWorld(item, index){
            this.randomData.push(item);
            this.selectData.splice(index, 1);
        },
        selectWorld(item, index){
            this.selectData.push(item);
            this.randomData.splice(index, 1);
        },
        nextStep(index){
            this.$router.push({name : this.$router.name, params : {
                    mnemonic: this.mnemonic,
                    stepType : index
                }});
        },
        // 第二步
        comfirm(){
            if(this.selectData.join('') == this.data.join('')){
                this.nextStep(2);
            }else{
                this.errorMsg = this.$t('lang24');
            }
        },
        // 完成
        done(){
            this.account.accounts.backups = true;
            this.account.save().then(() => {
                this.$router.push('/');
            }).catch(e => {
                this.$router.push('/');
            });

        }
    }
}
</script>

<style lang="scss" scoped>
.container{
    overflow: hidden;
    .content{
        margin: 50px 0 0;
        padding: 30px 15px 0;
        border-top: solid 1px $border;
        .error-msg{
            font-size: 12px;
            color: $up;
            margin-top: 12px;
        }
        .tips{
            font-size: 14px;
            color: $active;
            margin-bottom: 22px;
        }
        .fill-in-world{
            display: flex;
            align-items: flex-start;
            flex-wrap: wrap;
            background-color: $bg9;
            border-radius:2px;
            text-align: center;
            padding: 15px;
            min-height: 160px;
            .fill-item{
                width: 33%;
                font-size: 14px;
                color: $active;
                padding: 15px 0;
            }
        }
        .fill-in{
            
            margin-bottom: 30px;
            textarea{
                background-color: $border2;
                border-radius:2px;
                height: 206px;
                width: 100%;
                border: 0;
            }
        }
        .word-list{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            margin-top: 30px;
            .word-item{
                background-color: $bg9;
                color: $active;
                font-size: 14px;
                text-align: center;
                padding: 6px 0;
                width: 26%;
                margin-right: 10%;
                margin-bottom: 15px;
                &:nth-child(3n){
                    margin-right: 0;
                }
                &.active{
                    background-color: $blue;
                    color: $white;
                    opacity: 0.4;
                }
            }
        }
        .success-content{
            text-align: center;
            img{
                width: 7%;
                margin-bottom: 20px;
            }
            p.success-txt{
                color: $blue;
                font-size: 14px;
                margin-bottom: 15px;
            }
            .attention  {
                font-size: 12px;
                color: $color1;
            }
            
        }
    }
    .submit{
        position: absolute;
        bottom: 20px;
    }
}
</style>