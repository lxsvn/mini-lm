//logs.js
const util = require('../../utils/util.js')
var config = require('../../config.js');

var app = getApp()
Page({
  data: {
    msg: ''
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '授权登陆',
    })
  },
  getPhoneNumber: function (e) {
    var that = this;
    console.log(app.globalData.userInfo.openid)
    console.log(e)

    if (e.detail.iv != undefined) {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      // //发起网络请求
      wx.request({
        url: `${config.apis.wxLoginSensitiveInfoUrl}`,
        method: "POST",
        data: {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          openId: app.globalData.userInfo.openid,
        },
        success: function (data) {
          console.log(data)
          that.setData({
            msg: data.data.InnerData.Mobile
          })
          console.log(JSON.stringify(data.data))
        }

      })
    }
    else {
      wx.showToast({
        title: '拒绝',
        icon: 'none',
        duration: 500
      })
      return;
    }

    // console.log(e.detail.errMsg)
    // console.log(e.detail.iv)
    // console.log(e.detail.encryptedData)
  }
})
