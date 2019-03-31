/*
 * @Author: LKH 
 * @Date: 2019-03-09 10:18:44 
 * @Last Modified by: LKH
 * @Last Modified time: 2019-03-31 17:25:53
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
    // 获取用户密码提示问题
    getQuestion : function(username, resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/user/forget_get_question.do'),
            data : {
                username : username
            },
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    // 检查密码提示问题答案
    checkAnswer : function(userInfo, resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/user/forget_check_answer.do'),
            data : userInfo,
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    resetPassword : function(userInfo, resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/user/forget_reset_password.do'),
            data : userInfo,
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    // 获取用户信息
    getUserInfo : function(resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/user/get_user_info.do'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    // 获取挖掘者信息
    getDiggerInfo : function(diggerId, resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/user/get_digger_info.do'),
            data : {
                diggerId : diggerId
            },
            success : resolve,
            error : reject
        });
    },
    // 更新个人信息
    updateUserInfo : function(userInfo, resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/user/update_information.do'),
            data : userInfo,
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    // 登陆状态下更新密码
    updatePassword : function(userInfo, resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/user/reset_password.do'),
            data : userInfo,
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