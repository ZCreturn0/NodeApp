/**
 * @description 弹幕机, 控制页面上所有弹幕
 */
function BarrageDirector(){
    // 存储页面上的所有弹幕
    this.barrages = [];
}
// 设置 canvas 属性
BarrageDirector.prototype.setCanvas = function(ctx, width, height){
    this.ctx = ctx;
    this.width = width;
    this.height = height;
}
// 设置帧率(默认60)
BarrageDirector.prototype.setFPS = function(fps = 60){
    this.FPS = fps;
}
// 添加弹幕
BarrageDirector.prototype.addBarrage = function(barrage){
    this.barrages.push(barrage);
}
// 删除弹幕
BarrageDirector.prototype.removeBarrage = function(barrage){
    for (let i in this.barrages) {
        if (this.barrages[i] === barrage) {
            this.barrages.splice(i, 1);
        }
    }
}
// 清屏
BarrageDirector.prototype.clearCanvas = function(){
    this.ctx.clearRect(0, 0, this.width, this.height);
}
// 开始展示弹幕
BarrageDirector.prototype.start = function(){
    let timer;
    // 正常控制弹幕动画
    timer = setInterval(() => {
        this.clearCanvas();
        for (let barrage of this.barrages) {
            // 简单判断弹幕超出屏幕范围
            if (barrage.x < -400) {
                this.removeBarrage(barrage);
            } else {
                barrage.draw();
                barrage.move();
            }
        }
    }, 1000 / this.FPS);
    // 切换窗口时停止弹幕动画
    document.addEventListener("visibilitychange", (e) => {
        // 隐藏窗口时停止弹幕动画
        if (e.target.hidden) {
            clearInterval(timer);
        }
        // 窗口可见时恢复弹幕动画
        else{
            timer = setInterval(() => {
                this.clearCanvas();
                for (let barrage of this.barrages) {
                    // 简单判断弹幕超出屏幕范围
                    if (barrage.x < -400) {
                        this.removeBarrage(barrage);
                    } else {
                        barrage.draw();
                        barrage.move();
                    }
                }
            }, 1000 / this.FPS);
        }
    });
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
