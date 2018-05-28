//logs.js
const util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    
  },
  getPhoneNumber: function (e) {

    // 发送 res.code 到后台换取 openId, sessionKey, unionId
    // //发起网络请求
    wx.request({
      url: 'https://mbbd-api.houputech.com/1.0/miniapp/WxLoginSensitiveInfo',
      method: "POST",
      data: {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        openId: app.globalData.userInfo.openid,
      },
      success: function (data) {
        console.log(JSON.stringify(data.data))
      }

    })

    // console.log(e.detail.errMsg)
    // console.log(e.detail.iv)
    // console.log(e.detail.encryptedData)
  } 
})
