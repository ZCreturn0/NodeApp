/**
 * @description 弹幕类
 * @param {String} text 弹幕文字
 * @param {Color} color 弹幕颜色
 * @param {Number} x 弹幕起始 x 坐标
 * @param {Number} y 弹幕起始 y 坐标
 * @param {Object} ctx canvas context 对象
 */
function Barrage(text, color="#fff", x, y, ctx){
    this.text = text;
    this.color = color;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
}
// 初始化
Barrage.prototype.init = function(){
    this.speed = this.text.length;
}
// 在 x, y 坐标画对应文字
Barrage.prototype.draw = function(){
    this.ctx.fillStyle = this.color;
    this.ctx.font = '16px 微软雅黑';
    this.ctx.fillText(this.text, this.x, this.y);
}
// 改变弹幕的 x 坐标,使得下次渲染弹幕往左移动
Barrage.prototype.move = function(){
    this.x -= this.speed;
}
export default Barrage;
