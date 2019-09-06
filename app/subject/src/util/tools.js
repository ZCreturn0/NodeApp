export default {
    /**
     * @description 生成范围内的随机整数
     * @param {Number} min 起始范围
     * @param {Number} max 终止范围
     * @returns {Number} 范围内的随机整数
     */
    randomInRange: function(min, max){
        return ~~(min + Math.random() * (max - min));
    }
}
