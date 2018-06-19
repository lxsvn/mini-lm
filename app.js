//app.js

var config = require('config.js');
// var aldstat = require("./utils/ald-stat.js");
App({
  onLaunch: function () {

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    let userInfo = this.getUserInfo()
    console.log(userInfo)

    if (!userInfo.openid) {
      // 登录
      wx.login({
        success: res => {
          wx.showToast({
            title: 'wx.login:' + res.code,
            icon: 'success',
            duration: 2000
          })
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          // //发起网络请求
          wx.request({
            url: `${config.apis.wxLoginUrl}`,
            method: "POST",
            data: {
              code: res.code
            },
            success: function (data) {
              wx.setStorageSync('openid', data.data.InnerData.OpenId)
            }
          })
        }
      })

    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    socketOpened: false,
    userInfo: {
      openid: wx.getStorageSync('openid'),
      mobile: wx.getStorageSync('mobile'),
    }
  },
  goUserCenter: function (e) {
    wx.navigateTo({
      url: '/pages/user_center/user_index'
    })
  },
  getUserInfo: function (e) {
    let userInfo = {
      openid: wx.getStorageSync('openid'),
      mobile: wx.getStorageSync('mobile'),
    };
    return userInfo;
  }
})