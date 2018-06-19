// pages/high_limit/limit.js
var config = require('../../config.js');
const app = getApp()
var pageIndex=1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proList: [],
    hasNextPage:true
  },

  /**
  * 前往产品详情页
  */
  to_pro_detail: function (data) {
    var mobile = '';
    var that = this;

    var index = data.currentTarget.dataset.index;

    var proList = that.data.proList;

    var s = proList[index]

    wx.setStorage({
      key: 'proDetail',
      data: {
        'fromBanner': false,
        'detail': s
      },
    })

    wx.navigateTo({
      url: '/pages/pro_detail/detail',
    })


  },

  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    })
    getProLsit(this, pageIndex)
  },

  /**
    * 用户点击右上角分享
    */
  onShareAppMessage: function () {
    return {
      title: '爸爸的钱包您的随身钱包',
      path: '/pages/welcome/welcome',
      imageUrl: config.shareImageUrl
    }
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    var that = this;
    pageIndex=1;
    getProLsit(that, pageIndex);
  },

  /**
 * 去用户中心
 */
  go_to_user: function (e) {
    app.goUserCenter();
  },

  /**
   * 上拉加载
   */
  onReachBottom: function () {
    
    var that = this;
    if(that.data.hasNextPage){

      wx.showLoading({
        title: '拼命加载中',
      })

      pageIndex++;



      getProLsit(that, pageIndex);
    }
  
  }
})

/**
 * 请求产品列表数据
 */
function getProLsit(that, pageIndex) {
  var url = config.apis.productsListUrl;
  console.log(url)

  wx.request({
    url: url,
    data: {
      "pageIndex": pageIndex,
      "pageNo": '20',
      "sortBy": '1',
      "channel": 'miniapp',
    },
    success: function (res) {
     
      that.data.hasNextPage=res.data.HasNextPage;

      if(pageIndex==1){
        var oldProList = res.data.Models;
        setTimeout(function () {
          wx.stopPullDownRefresh();
        }, 1000);
        
      }else{
        var oldProList = that.data.proList
        var proList = res.data.Models;
        for (var i = 0, len = proList.length; i < len; i++) {
          oldProList.push(proList[i])
        }
      }
   
      that.setData({
        proList: oldProList
      })
      wx.hideLoading()
    }
  })
}