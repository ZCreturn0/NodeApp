<template>
    <div class="login" ref="login">
        <canvas
            id="canvas"
            ref="canvas"
            :width="canvasWidth"
            :height="canvasHeight">
        </canvas>
    </div>
</template>

<script>
    import tools from '@/util/tools';
    export default {
        name: 'login',
        data() {
            return {
                canvasWidth: 0,
                canvasHeight: 0,
                // 弹幕
                barrage: [
                    '2333333', '66666666', '前面的别跑', '来个大神分析一下', '不懂就选C', '选最长的', '收藏等于学习', '扫码登录干嘛,愣着呀'
                ],
                // 颜色
                colors: [],
                // 帧率
                FPS: 60
            }
        },
        methods: {
            getRandomBarrage(){
                return this.barrage[tools.randomInRange(0, this.barrage.length)];
            }
        },
        mounted(){
            this.canvasWidth = this.$refs.login.getBoundingClientRect().width;
            this.canvasHeight = this.$refs.login.getBoundingClientRect().height;
            // for(let i=0;i<10;i++){
            //     console.log(this.getRandomBarrage());
            // }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .login{
        width: 100%;
        height: 100%;
        #canvas{
            display: block;
        }
    }
</style>
