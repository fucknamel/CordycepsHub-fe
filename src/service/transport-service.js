/*
 * @Author: LKH 
 * @Date: 2019-03-09 11:21:58 
 * @Last Modified by: LKH
 * @Last Modified time: 2019-04-03 13:10:34
 */

 var _mm = require('util/mm.js');

 var _transport = {
    // 获取购物车数量
    getTransportList : function(listParam, resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/transport/get_transport_list.do'),
            data : listParam,
            method : 'POST',
            success : resolve,
            error : reject
        });
    }
 }
 module.exports = _transport;