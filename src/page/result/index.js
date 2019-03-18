/*
 * @Author: LKH 
 * @Date: 2019-03-11 13:16:38 
 * @Last Modified by: LKH
 * @Last Modified time: 2019-03-12 14:47:31
 */

require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    // 显示对应的提示元素
    $element.show();
})