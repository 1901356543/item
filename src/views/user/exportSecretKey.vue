<template>
  <section>
      <Header :title="$t('export') + $t('privateKey')" />
      <div class="container">
          <div class="notice">
              <img src="../../assets/images/private_key_tips@2x.png" alt="">
              <p>{{$t('exportWarn')}}</p>
              <p>{{$t('exportWarn2')}}</p>
          </div>
          <div class="secret-key-list">
              <div class="secret-key-box">
                  <div class="stitle">
                      {{$t('title') + $t('address')}}
                  </div>
                  <div class="s-addr">
                      {{address}}
                  </div>
                  <r-copy :copyText="address">
                    <div class="copy-icon">
                        <img src="../../assets/images/copy@2x.png" class="copy-icon-img" alt="">
                    </div>
                  </r-copy>
              </div>
              <div class="secret-key-box">
                  <div class="stitle">
                      {{$t('title') + $t('privateKey')}}
                  </div>
                  <div class="s-addr">
                      {{seed}}
                  </div>
                  <r-copy :copyText="seed">
                    <div class="copy-icon">
                        <img src="../../assets/images/copy@2x.png" class="copy-icon-img" alt="">
                    </div>
                  </r-copy>
              </div>
          </div> 
      </div>
  </section>
</template>

<script>
export default {
    props : ['address', 'seed']
}
</script>

<style lang="scss" scoped>
section{
    height: 100%;
    background-color: $bodybg;
}
.container{
    padding-top: 70px;
    margin: 0 15px;
    height: 100%;
    
    .notice{
        text-align: center;
        img{
            width: 31px;
            margin-bottom: 20px;
        }
        p{
            font-size: 14px;
            color: $up
        }
    }
    .secret-key-list{
        padding-top: 40px;
        .secret-key-box{
            background-color: $border2;
            border-radius:5px;
            padding: 15px;
            position: relative;
            margin-bottom: 15px;
            color: $active;
            box-shadow:0px 6px 10px 0px rgba(0,0,0,0.06);
            .stitle{
                font-size: 14px;
                padding-bottom: 5px;
            }
            .s-addr{
                font-size: 12px;
                color: $color1;
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .copy-icon{
                width: 16px;
                height: 16px;
                position: absolute;
                right: 15px;
                top: 15px;
                img{
                    width: 100%;
                }
            }
        }
    }
}
</style>