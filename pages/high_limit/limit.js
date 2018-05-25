// pages/high_limit/limit.js
var config = require('../../config.js');

var pageIndex=1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proList: [],
    hasNextPage:true
  },

  to_pro_detail: function (data) {
    var index = data.currentTarget.dataset.index;
    var proList = this.data.proList;
    console.log(proList);
    var s = proList[0]
    wx.setStorage({
      key: 'proDetail',
      data: proList[index],
    })

    wx.getStorage({
      key: 'proDetail',
      success: function (res) {

        console.log(res.data.s)
      },
      fail: function (res) { },
      complete: function (res) { },
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
  var url = config.productsListUrl;
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