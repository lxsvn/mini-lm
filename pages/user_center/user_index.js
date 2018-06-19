//logs.js
const util = require('../../utils/util.js')
var config = require('../../config.js');

const app = getApp()
Page({
  data: {
    msg: '',
     btn_content: '授权登陆',
     hasPhone:false
  },
  onLoad: function () {
    var that=this;
    wx.setNavigationBarTitle({
      title: '授权登陆',
    })
    wx.getStorage({
      key: 'mobile',
      success: function(res) {
        if (res.data.length > 2) {
          that.setData({
            btn_content: '已授权',
            hasPhone: true
          })

        }
      },
      fail:function(){
       
      }
    })
  },
  getPhoneNumber: function (e) {
    var that = this;
    var openId = app.getUserInfo().openid;
    if (e.detail.iv != undefined) {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      // //发起网络请求
      wx.request({
        url: `${config.apis.wxLoginSensitiveInfoUrl}`,
        method: "POST",
        data: {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          openId: wx.getStorageSync('openid'),
        },
        success: function (data) {
          if (data.data.InnerData.Mobile!=null&&data.data.InnerData.Mobile.length>2){

            wx.setStorage({
              key: 'mobile',
              data: data.data.InnerData.Mobile,
            });

            that.setData({
              btn_content: '授权成功'
            })
            wx.showToast({
              title: '授权成功',
            })
            setTimeout(function(){
              wx.navigateBack()
            },500)
           
          }
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
  }
  ,  /**
    * 用户点击右上角分享
    */
  onShareAppMessage: function () {
    return {
      title: '爸爸的钱包您的随身钱包',
      path: '/pages/welcome/welcome',
      imageUrl: config.shareImageUrl
    }
  }
})
