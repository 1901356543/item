<template>
    <canvas id="q"></canvas>
</template>

<script>
    export default {
        name: "animation-font",
        data() {
            return {
                interval :null
            }
        },
        mounted (){
            var q = document.getElementById('q');
            var s = window.screen;
            var width = q.width = s.width;
            var height = q.height = s.height;
            var letters = Array(256).join(1).split('');
            var draw = function () {
                q.getContext('2d').fillStyle='rgba(0,0,0,.05)';
                q.getContext('2d').fillRect(0, 0, width,height);
                q.getContext('2d').fillStyle='#0F0';
                q.getContext('2d').font='italic small-caps 20px arial';
                letters.map(function(y_pos, index){
                    var text = String.fromCharCode(3e2+Math.random()*33);
                    var x_pos = index * 20;
                    q.getContext('2d').fillText(text, x_pos, y_pos);
                    letters[index] = (y_pos > 758 + Math.random() * 1e4) ? 0 : y_pos + 20;
                });
            };
            this.interval = setInterval(draw, 33);
        },
        destroyed (){
            clearInterval(this.interval);
        },
        deactivated (){
            clearInterval(this.interval);
        },
    }
</script>

<style scoped lang="scss">
    #q{
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        z-index: 1;
    }
</style>