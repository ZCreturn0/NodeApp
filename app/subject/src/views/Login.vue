<template>
    <div class="login" ref="login">
        <!-- 负责背景显示 -->
        <canvas
            id="bg"
            ref="bg"
            :width="canvasWidth"
            :height="canvasHeight">
        </canvas>
        <!-- 负责弹幕显示 -->
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
    import BarrageDirector from '@/model/BarrageDirector';
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
                // 踩坑提示: 颜色不要与背景色一样
                colors: ['#000', '#ccc', 'red'],
                // 帧率
                FPS: 60,
                canvas: null,
                ctx: null,
                // 弹幕数量
                numberOfBarrage: 20
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
            // 画背景图
            drawImage(){
                let canvas = this.$refs.bg;
                let ctx = canvas.getContext('2d');
                let img = new Image();
                img.onload = () => {
                    // 把背景图画到 canvas 上
                    ctx.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight);
                    // 生成弹幕
                    this.createBarrage();
                };
                // 加载背景图
                img.src = require('../assets/login/loginBG.png');
            },
            // 初始化 canvas
            initCanvas(){
                // 设置 canvas 宽高
                this.canvasWidth = this.$refs.login.getBoundingClientRect().width;
                this.canvasHeight = this.$refs.login.getBoundingClientRect().height;
                this.drawImage();
                // 负责弹幕
                this.canvas = this.$refs.canvas;
                this.ctx = this.canvas.getContext('2d');
            },
            // 生成弹幕
            createBarrage(){
                // 获得弹幕机单例
                let barrageDirector = BarrageDirector.getInstance();
                // 设置 canvas 属性
                barrageDirector.setCanvas(this.ctx, this.canvasWidth, this.canvasHeight);
                // 设置帧率
                barrageDirector.setFPS(this.FPS);
                // 生成弹幕
                for(let i = 0;i < this.numberOfBarrage; i++){
                    let barrage = new Barrage(this.getRandomBarrage(), this.getRandomColor(), this.canvasWidth, tools.randomInRange(0, this.canvasHeight), this.ctx);
                    // 初始化弹幕
                    barrage.init();
                    barrageDirector.addBarrage(barrage);
                }
                barrageDirector.start();
            }
        },
        mounted(){
            this.initCanvas();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .login{
        width: 100%;
        height: 100%;
        #canvas, #bg{
            display: block;
            position: fixed;
        }
        #bg{
            z-index: -1;
        }
        #canvas{
            z-index: 100;
        }
    }
</style>
