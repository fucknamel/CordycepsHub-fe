/*
 * @Author: LKH 
 * @Date: 2019-03-09 11:21:58 
 * @Last Modified by: LKH
 * @Last Modified time: 2019-03-09 11:23:36
 */

 var _mm = require('util/mm.js');

 var _cart = {
    // 获取购物车数量
    getCartCount : function(resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/cart/get_cart_product_count.do'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    }
 }
 module.exports = _cart;