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
}
Barrage.prototype.draw = function(){
    this.ctx.fillStyle = this.color;
    this.ctx.font = '16px 微软雅黑';
    this.ctx.fillText(this.text, 100, 200);
}
module.exports = Barrage;
