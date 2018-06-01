//app.js

var config = require('config.js');
var aldstat = require("./utils/ald-stat.js");
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var openid = this.globalData.userInfo.openid
    console.log(config)
    // console.log(JSON.stringify(this.globalData))
    // console.log(this.globalData.userInfo.sessionkey) 
    if (!openid) {
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
              console.log(JSON.stringify(data.data.InnerData.OpenId))
              wx.setStorageSync('openid', "ohEKP4g8FNtWRvJpKsFjpWSTQlY4")
              wx.setStorageSync('sessionkey', "0MYGybtcsTBj1TzOGKN3cA==")
              // wx.setStorageSync('openid', data.data.InnerData.OpenId)
              // wx.setStorageSync('sessionkey', data.data.InnerData.session_key)
              }

          })
        }
      })

    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              //this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
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
      sessionkey: wx.getStorageSync('sessionkey'),
      openid: wx.getStorageSync('openid'),
      mobile: wx.getStorageSync('mobile'),
      }
  },

  goUserCenter: function (e) {
    wx.navigateTo({
      url: '/pages/user_center/user_index'
    })
  },
})