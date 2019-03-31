/*
 * @Author: LKH 
 * @Date: 2019-03-31 11:24:36 
 * @Last Modified by: LKH
 * @Last Modified time: 2019-03-31 17:46:32
 */

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm                 = require('util/mm.js');
var _product            = require('service/product-service.js');
var _user               = require('service/user-service.js');
var templateIndex       = require('./index.string');
var templateIndexDigger = require('./index-digger.string');

var page = {
    data : {
        productId : _mm.getUrlParam('productId') || ''
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 如果没有传productId, 自动跳回首页
        if(!this.data.productId){
            _mm.goHome();
        }
        this.loadDetail();
    },
    bindEvent : function(){
        var _this = this;
        // 图片预览
        $(document).on('mouseenter', '.p-img-item', function(){
            var imageUrl   = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
        // 查看挖掘者
        $(document).on('click', '.digger-info', function(){
            _user.getDiggerInfo(_this.data.detailInfo.diggerId, function(res){
                var html = _mm.renderHtml(templateIndexDigger, res);
                $('.p-info-con').html(html);
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
        // 返回按钮
        $(document).on('click', '.digger-return', function(){
            _this.loadDetail();
        });
    },
    // 加载商品详情的数据
    loadDetail : function(){
        var _this       = this,
            html        = '',
            $pageWrap   = $('.page-wrap');
        // loading
        $pageWrap.html('<div class="loading"></div>');
        // 请求detail信息
        _product.getProductDetail(this.data.productId, function(res){
            _this.filter(res);
            // 缓存住detail的数据
            _this.data.detailInfo = res;
            // render
            html = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(html);
        }, function(errMsg){
            $pageWrap.html('<p class="err-tip">此商品太淘气，找不到了</p>');
        });
    },
    // 数据匹配
    filter : function(data){
        data.subImages = data.subImages.split(',');
    }
};
$(function(){
    page.init();
})