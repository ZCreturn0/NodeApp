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
    import Barrage from '@/model/Barrage';
    export default {
        name: 'login',
        data() {
            return {
                canvasWidth: 0,
                canvasHeight: 0,
                // 弹幕
                barrage: [
                    '2333333', '66666666', '前面的别跑', '来个大神分析一下', '不懂就选C', '选最长的', '收藏等于学习', '扫码干嘛,愣着呀'
                ],
                // 颜色
                colors: ['#fff', '#ccc', 'red'],
                // 帧率
                FPS: 60,
                canvas: null,
                ctx: null
            }
        },
        methods: {
            // 获取随机弹幕
            getRandomBarrage(){
                return this.barrage[tools.randomInRange(0, this.barrage.length)];
            },
            // 获取随机颜色
            getRandomColor(){
                return this.colors[tools.randomInRange(0, this.colors.length)];
            },
            // 初始化 canvas
            initCanvas(){
                // 设置 canvas 宽高
                this.canvasWidth = this.$refs.login.getBoundingClientRect().width;
                this.canvasHeight = this.$refs.login.getBoundingClientRect().height;
                this.canvas = this.$refs.canvas;
                this.ctx = this.canvas.getContext('2d');

                this.ctx.font = '16px 微软雅黑';
                this.ctx.fillStyle = '#ccc';
                this.ctx.textAlign = "center";
                this.ctx.textBaseline = "middle";
                this.ctx.fillText('aaaaa', 100, 200);


                // let img = new Image();
                // img.onload = () => {
                //     // 把背景图画到 canvas 上
                //     this.ctx.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight);
                // };
                // // 加载背景图
                // img.src = require('../assets/login/loginBG.png');
            },
            // 生成弹幕
            createBarrage(){
                let barrage = new Barrage(this.getRandomBarrage(), this.getRandomColor(), this.canvasWidth, tools.randomInRange(0, this.canvasHeight), this.ctx);
                barrage.init();
                barrage.draw();
            }
        },
        mounted(){
            this.initCanvas();
            // this.createBarrage();
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
