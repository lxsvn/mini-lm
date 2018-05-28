//logs.js
const util = require('../../utils/util.js')
var config = require('../../config.js');

var app = getApp()
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    msg:''
  },
  onLoad: function () {
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        console.log("ccc")
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console(res.userInfo)
            }
          })
        }
      }
    })
  },
  getPhoneNumber: function (e) {
    var that=this;
    
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
          that.setData({
            msg: data.data.InnerData.Mobile
          })
          console.log(JSON.stringify())
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
