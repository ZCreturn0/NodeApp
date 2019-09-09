// 弹幕类
function Barrage(text, color="#fff", x, y, ctx){
    this.text = text;
    this.color = color;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
}
Barrage.prototype.init = function(){
    this.speed = this.text.length;
    this.ctx.fillStyle = this.color;
    this.ctx.font = '16px 微软雅黑';
}
Barrage.prototype.draw = function(){
    this.ctx.fillText(this.text, this.x, this.y);
}
Barrage.prototype.move = function(){
    setInterval(() => {
        this.x -= this.speed;
        this.draw();
    }, 1000 / 60);
}
module.exports = Barrage;
