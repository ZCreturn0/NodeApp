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
        <!-- 扫码区域 -->
        <div id="qcode">
            <!-- 动态二维码 -->
            <div id="dynamic-qcode">

            </div>
            <!-- 表情包 -->
            <div id="qcode_description">
                <img src="../assets/login/qcode_description.png">
            </div>
        </div>
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
                    '2333333', '66666666', '前面的别跑', '来个大神分析一下', '不懂就选C', '选最长的', '收藏等于学习', '扫码干嘛,愣着呀',
                    '为什么选C?', '我觉得A也对', '所以到底输出什么?', '道理我都懂,可鸽子为什么这么大', 'a不是undefined吗?', '啥是闭包',
                    '这里this指向哪', '现在this指向window', '怎么又扯到原型了', '构造是什么', '怎么继承', '怎么改变this指向', '讲得很详细',
                    '三长一短选最短,三短一长选最长'
                ],
                // 颜色
                // 踩坑提示: 颜色不要与背景色一样
                colors: [
                    '#fff', '#ccc', 'red', '#58b21e', '#d3b31e', '#6dbaed', '#e16db3', '#5dce97', '#0b76c',
                    '#ffc300', '#d5ffc7', '#ff9a22', '#339fcc', '#83cc2b', '#f54e91', '#886af7', '#6ae1f7'
                ],
                // 帧率
                FPS: 100,
                canvas: null,
                ctx: null,
                // 弹幕生成间隔
                barrageCreateInterval: 1000
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
                this.canvas = this.$refs.canvas;
                this.ctx = this.canvas.getContext('2d');
            },
            // 启动定时器, 并返回 timer
            getTimer(barrageDirector){
                return setInterval(() => {
                    let y = tools.randomInRange(0, this.canvasHeight);
                    // 防止竖直方向弹幕显示不全
                    if(y < 20){
                        y = 20;
                    }
                    if(y > this.canvasHeight - 20){
                        y = this.canvasHeight - 20;
                    }
                    let barrage = new Barrage(this.getRandomBarrage(), this.getRandomColor(), this.canvasWidth, y, this.ctx);
                    // 初始化弹幕
                    barrage.init();
                    barrageDirector.addBarrage(barrage);
                }, this.barrageCreateInterval);
            },
            // 生成弹幕
            createBarrage(){
                // 获得弹幕机单例
                let barrageDirector = BarrageDirector.getInstance();
                // 设置 canvas 属性
                barrageDirector.setCanvas(this.ctx, this.canvasWidth, this.canvasHeight);
                // 设置帧率
                barrageDirector.setFPS(this.FPS);
                // 生成弹幕计时器
                let timer;
                // 正常生成弹幕
                timer = this.getTimer(barrageDirector);
                // 切换窗口时停止生成弹幕
                document.addEventListener("visibilitychange", (e) => {
                    // 隐藏窗口时停止生成弹幕
                    if (e.target.hidden) {
                        clearInterval(timer);
                    }
                    else{
                        // 窗口可见时恢复生成弹幕
                        timer = this.getTimer(barrageDirector);
                    }
                })
                barrageDirector.start();
            }
        },
        mounted(){
            this.initCanvas();
            // let wxConfig = require('@/config/wx.json');
            // console.log(wxConfig);
            // var obj = new WxLogin({
            //     id:"qcode",                                 // 需要显示的容器id
            //     appid: wxConfig.appid,                      // 公众号appid wx*******
            //     scope: "snsapi_login",                      // 网页默认即可
            //     redirect_uri: "127.0.0.1:8080",             // 授权成功后回调的url
            // });
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
        #qcode{
            width: 300px;
            height: 400px;
            border: 1px solid #000;
            position: absolute;
            left: 50%;
            top: 50%;
            background: #ccc;
            transform: translate(-50%, -50%);
            z-index: 999;
            #dynamic-qcode{
                width: 290px;
                height: 200px;
                padding: 5px;
                background: #fff;
            }
            #qcode_description{
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 190px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>
