/*
 * @Author: LKH 
 * @Date: 2019-03-09 10:18:44 
 * @Last Modified by: LKH
 * @Last Modified time: 2019-03-19 11:29:34
 */

 var _mm = require('util/mm.js');

 var _user = {
    // 用户登录
    login : function(userInfo, resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/user/login.do'),
            data : userInfo,
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    // 检查用户名
    checkUsername : function(username, resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/user/check_valid.do'),
            data : {
                str : username,
                type : 'username'
            },
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    // 用户注册
    register : function(userInfo, resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/user/register.do'),
            data : userInfo,
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    // 检查登录状态
    checkLogin : function(resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/user/get_user_info.do'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    // 登出
    logout : function(resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/user/logout.do'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    }
 }
 module.exports = _user;