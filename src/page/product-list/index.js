/*
 * @Author: LKH 
 * @Date: 2019-04-03 19:31:05 
 * @Last Modified by: LKH
 * @Last Modified time: 2019-04-03 20:04:07
 */

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _product        = require('service/product-service.js');
var Pagination      = require('util/pagination/index.js');
var templateIndex   = require('./index.string');

// page 逻辑部分
var page = {
    data: {
        listParam : {
            pageNum     : 1,
            pageSize    : 10
        }
    },
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        this.loadProductList();
        // 初始化左侧菜单
        navSide.init({
            name: 'product-list'
        });
    },
    // 加载订单列表
    loadProductList: function(){
        var _this           = this,
            productListHtml = '',
            $listCon        = $('.product-list-con');
        $listCon.html('<div class="loading"></div>');
        _product.getDiggerProductList(this.data.listParam, function(res){
            // 渲染html
            productListHtml = _mm.renderHtml(templateIndex, res);
            $listCon.html(productListHtml);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        }, function(errMsg){
            $listCon.html('<p class="err-tip">' + errMsg + '</p>');
        });
    },
    // 加载分页信息
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadProductList();
            }
        }));
    }
};
$(function(){
    page.init();
});