// pages/pro_detail/detail.js
const app = getApp()
var config = require('../../config.js');
var url = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conditionList: [],
    approveList: [],
    proInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
  
    wx.getStorage({
      key: 'proDetail',
      success: function (res) {
        if (res.data.fromBanner) {
          getProDetail(that,res.data.detail)
        } else {
          var proName = res.data.detail.Name;
          wx.setNavigationBarTitle({
            title: proName,
          })
          var conditions = res.data.detail.Extend6Convert
          var approves = res.data.detail.Extend7Convert
          that.setData({
            proInfo: res.data.detail,
            conditionList: conditions,
            approveList: approves
          })
          url = res.data.detail.Extend1
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })

  },
  /**
   * 打开网页
   */
  to_web: function () {

    wx.getStorage({
      key: 'mobile',
      success: function (res) {
        if (res.data.length > 2) {
          if (url.length > 0) {
            wx.navigateTo({
              url: '/pages/web_view/web?url=' + url,
            })
          }
        } else {
          app.goUserCenter();
        }
      },
      fail: function () {
        app.goUserCenter();
      }
    })

  }

})


/**
 * 请求产品详情
 */
function getProDetail(that, pid) {
  var proUrl = config.apis.proDetailUrl;
  wx.request({
    url: proUrl,
    data: {
      "pid": pid,
      "channel": 'miniapp',
    },
    success: function (res) {
      wx.hideLoading() 
      var proName = res.data.Name;
      wx.setNavigationBarTitle({
        title: proName,
      })
      var conditions = res.data.Extend6Convert
      var approves = res.data.Extend7Convert
      that.setData({
        proInfo: res.data,
        conditionList: conditions,
        approveList: approves
      })
      url = res.data.Extend1
    }
  })
}
