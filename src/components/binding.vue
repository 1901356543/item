<template>
    <r-modal :title="$t(`home.home15`)" @on-ok="submitPsw" :show="true" @on-cancel="cancel">
        <div class="inp-password">
            <input type="text" v-model="code" :placeholder="$t(`home.home16`)">
        </div>
        <br>
        <div class="inp-password">
            <input type="password" v-model="password" :placeholder="$t(`wallet.zhuanqian12`)">
        </div>
    </r-modal>
</template>

<script>
    export default {
        name: "binding",
        data() {
            return {
                code : "",
                password : "",
                submitState : false,
            }
        },
        mounted (){
        },
        methods : {
            cancel (){
                this.$store.commit("isBinding", false);
            },
            codeVerify (){
                if(this.submitState) return;
                let {password, code} = this;
                if(this.balancesXRP.value < this.rcp.activeNum){
                    this.$toast.show(this.$t('home.home17', {num : this.rcp.activeNum}));
                    return;
                }

                if(code.length <= 0){
                    this.$toast.show(this.$t('home.home16') + this.$t('error'));
                    return;
                }

                this.axios({
                    url : '/service/invite_code_valid',
                    params : {
                        invite_code : this.code
                    }
                }).then(data => {
                    this.submitPsw();
                }).catch(e => {
                    this.$toast.show(this.$t('home.home16') + this.$t('error'));
                })
            },
            submitPsw (){
                let {password, code} = this;
                if(this.submitState) return;

                this.submitState = true;
                console.log(this.balancesXRP.value > (this.rcp.activeNum + this.fee));
                console.log(this.balancesXRP.value, this.rcp.activeNum, this.fee);
                var num = this.balancesXRP.value > (this.rcp.activeNum + this.fee) ? this.rcp.activeNum :  this.decimal.sub(this.balancesXRP.value, this.fee);
                console.log(num.toString());
                this.account.verifyPassword(password).then(async () => {
                    let seed = await this.account.exportPrivate(this.password);
                    this.rcp.preparePayments({
                        address : this.inviteAddress,
                        seed,
                        value : num.toString(),
                        memos : [
                            {
                                "type": "binding",
                                "format": "text/plain",
                                "data": code
                            }
                        ],
                    }).then(data => {
                        console.log(data);
                        this.submitState = false;
                        if(data.engine_result_code == 0){
                            this.$toast.show(this.$t('home.home15') + this.$t('success'));
                            this.$store.commit("isBinding", false);
                        }else{
                            this.$toast.show(data.engine_result_message);
                        }
                    }).catch(e => {
                        this.submitState = false;
                        this.$toast.show(e.message);
                    });
                }).catch(e => {
                    this.$toast.show(this.$t('passwordError'));
                });

            },
        }
    }
</script>

<style scoped lang="scss">
</style>