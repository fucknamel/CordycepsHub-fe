/*
 * @Author: LKH 
 * @Date: 2019-03-30 18:43:09 
 * @Last Modified by: LKH
 * @Last Modified time: 2019-03-30 19:48:10
 */

var _mm = require('util/mm.js');

var _product = {
   // 获取商品列表
   getProductList : function(listParam, resolve, reject){
       _mm.request({
           url : _mm.getServerUrl('/product/get_list.do'),
           data : listParam,
           success : resolve,
           error : reject
       });
   }
}
module.exports = _product;