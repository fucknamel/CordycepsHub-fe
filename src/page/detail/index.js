/*
 * @Author: LKH 
 * @Date: 2019-03-31 11:24:36 
 * @Last Modified by: LKH
 * @Last Modified time: 2019-04-08 20:06:30
 */

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm                = require('util/mm.js');
var _product           = require('service/product-service.js');
var _user              = require('service/user-service.js');
var _transport         = require('service/transport-service.js');
var Pagination         = require('util/pagination/index.js');
var templateProduct    = require('./product.string');
var templateDigger     = require('./digger.string');
var templateTransport  = require('./transport.string');

var page = {
    data : {
        listParam : {
            productId       : _mm.getUrlParam('productId')  || '',
            pageNum         : _mm.getUrlParam('pageNum')    || 1,
            pageSize        : _mm.getUrlParam('pageSize')   || 5
        }
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 如果没有传productId, 自动跳回首页
        if(!this.data.listParam.pageNum){
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
                var html = _mm.renderHtml(templateDigger, res);
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
            listParam   = this.data.listParam,
            $pageWrap   = $('.page-wrap');
        // loading
        $pageWrap.html('<div class="loading"></div>');
        // 请求detail信息
        _product.getProductDetail(listParam.productId, function(res){
            _this.filter(res);
            // 缓存住detail的数据
            _this.data.detailInfo = res;
            // render
            html = _mm.renderHtml(templateProduct, res);
            $pageWrap.html(html);
            // 成功后才加载溯源信息
            _this.loadTransport();
        }, function(errMsg){
            $pageWrap.html('<p class="err-tip">此商品太淘气，找不到了</p>');
        });
    },
    // 加载运输信息
    loadTransport : function(){
        var _this           = this,
            listParam       = this.data.listParam,
            $transportCon   = $('.transport-con');
        // loading
        $transportCon.html('<div class="loading"></div>');
        _transport.getTransportList(listParam, function(res){
            _this.renderTransport(res);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        }, function(errMsg){
            $transportCon.html('<p class="err-tip">' + errMsg + '</p>');
        });
    },
    renderTransport : function(data){
        data.notEmpty = !!data.list.length;
        // 缓存运输信息
        this.data.transportInfo = data;
        // 生成HTML
        var transportHtml = _mm.renderHtml(templateTransport, data);
        // 渲染HTML
        $('.transport-con').html(transportHtml);
    },
    // 加载分页信息
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadTransport();
            }
        }));
    },
    // 数据匹配
    filter : function(data){
        data.subImages = data.subImages.split(',');
    }
};
$(function(){
    page.init();
})