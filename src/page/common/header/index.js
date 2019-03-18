/*
 * @Author: LKH 
 * @Date: 2019-03-09 12:29:45 
 * @Last Modified by: LKH
 * @Last Modified time: 2019-03-10 18:36:22
 */

require('./index.css')

var _mm = require('util/mm.js');
// 通用页4面头部
var header = {
    init : function(){
        this.bindEvent();
    },
    onLoad : function(){
        var keyword = _mm.getUrlParam('keyword');
        // keyword存在，则回填输入框
        if(keyword){
            $('#search-input').val(keyword);
        };
    },
    bindEvent : function(){
        var _this = this;
        // 点击搜索提交后，做搜索提交
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        // 输入回车后，做搜索提交
        $('#search-input').keyup(function(e){
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        });
    },
    searchSubmit : function(){
        var keyword = $.trim($('#search-input').val());
        // 如果提交的时候有keyword，正常跳转到list页
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;
        }
        // 如果keyword为空，直接返回首页
        else{
            _mm.goHome();
        }
    }
};

header.init();