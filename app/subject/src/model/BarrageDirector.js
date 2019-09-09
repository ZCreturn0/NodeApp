/**
 * @description 弹幕机, 控制页面上所有弹幕
 */
function BarrageDirector(){
    // 存储页面上的所有弹幕
    this.barrages = [];
}
// 设置 canvas 属性
BarrageDirector.prototype.setCanvas = function(ctx, width, height, img){
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.img = img;
}
// 设置帧率(默认60)
BarrageDirector.prototype.setFPS = function(fps = 60){
    this.FPS = fps;
}
// 添加弹幕
BarrageDirector.prototype.addBarrage = function(barrage){
    this.barrages.push(barrage);
}
// 清屏
BarrageDirector.prototype.clearCanvas = function(){
    this.ctx.clearRect(0, 0, this.width, this.height);
}
// 画背景图
BarrageDirector.prototype.drawImage = function(){
    let img = new Image();
    img.onload = () => {
        this.ctx.drawImage(img, 0, 0, this.width, this.height);
    };
    // 加载背景图
    img.src = this.img;
}
// 开始展示弹幕
BarrageDirector.prototype.start = function(){
    this.clearCanvas();
    this.ctx.save();
    setInterval(() => {
        for (let barrage of this.barrages) {
            this.drawImage();
            barrage.draw();
            barrage.move();
            this.ctx.restore();
        }
    }, 1000 / this.FPS);
}
// 获取单例, 保证只有一个弹幕机对象
BarrageDirector.getInstance = (function(){
    let instance;
    if (!instance) {
        instance = new BarrageDirector();
    }
    return function(){
        return instance;
    };
})();
export default BarrageDirector;
