// 弹幕类
function Barrage(text, color="#fff", x, y, canvas){
    this.text = text;
    this.color = color;
    this.x = x;
    this.y = y;
    this.canvas = canvas;
}
Barrage.prototype.init = function(){
    this.speed = this.text.length;
}
module.exports = Barrage;
