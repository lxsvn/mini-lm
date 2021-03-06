//index.js
//获取应用实例
const app = getApp()
var config = require('../../config.js');
var pageIndex = 1;
Page({
  data: {
    imgUrls: [
      '/assets/imgs/defalt_banner.jpg',
    ],
    bannerList:[],
    proList: [],
    hasNextPage: true
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
      data: {'fromBanner':false,
      'detail':s},
    })

    wx.navigateTo({
      url: '/pages/pro_detail/detail',
    })

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
   * 从banner 进入详情页
   */
  banner_to_pro:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var s = that.data.bannerList[index]
    var proId = s.AppUrl.split(":")[1]
    wx.setStorage({
      key: 'proDetail',
      data: {
        'fromBanner': true,
        'detail': proId
      },
    })
    wx.navigateTo({
      url: '/pages/pro_detail/detail',
    })
  },

  onLoad: function () {

    // app.aldstat.sendEvent('事件名称');

    wx.showLoading({
      title: '加载中',
    })

    getProLsit(this, pageIndex)

    getHomeInfo(this)

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
   * 获取用户信息
   */
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  sssss: function () {
    if (e.detail.iv != undefined) {

    } else {

    }
  },

  /**
   * 去用户中心
   */
  go_to_user: function (e) {
    app.goUserCenter();
  },

  /**
    * 下拉刷新
    */
  onPullDownRefresh: function () {
    var that = this;
    pageIndex = 1;
    getProLsit(that, pageIndex);
  },
  /**
   * 上拉加载
   */
  onReachBottom: function () {
    var that = this;
    console.log('上拉加载' + that.data.hasNextPage)
    if (that.data.hasNextPage) {

      wx.showLoading({
        title: '拼命加载中',
      })

      pageIndex++;

      getProLsit(that, pageIndex);
    }

  },
})

/**
 * 请求产品列表数据
 */
function getProLsit(that, pageIndex) {
  console.log('上拉加载' + config.apis.productsListUrl)
  var url = config.apis.productsListUrl;
  wx.request({
    url: url,
    data: {
      "pageIndex": pageIndex,
      "pageNo": '20',
      "sortBy": '0',
      "channel": 'miniapp',
    },
    success: function (res) {
      console.log(res)
      that.data.hasNextPage = res.data.HasNextPage;
      if (pageIndex == 1) {
        var oldProList = res.data.Models;
        setTimeout(function () {
          wx.stopPullDownRefresh();
        }, 1000);

      } else {
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

/**
 * 获取首页信息
 */

function getHomeInfo(that) {
  var url = config.apis.homeInfoUrl;
  wx.request({
    url: url,
    success: function (res) {
      var banners = [];
      for (var i = 0, len = res.data.Banners.length; i < len; i++) {
        banners.push(res.data.Banners[i].Image)
      }
      that.setData({
        imgUrls: banners,
        bannerList: res.data.Banners
      })
    }
  })
}