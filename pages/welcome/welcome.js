// pages/welcome/welcome.js
var config = require('../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  onLoad:function(){
    
    wx.request({
      url: 'https://mbbd-api.houputech.com/1.0/v_miniapp_' + config.appVersion+'/api/miniapp',
      success:function(res){
        console.log(res)
        if(res.data.Result){
          wx.reLaunch({
            url: '/pages/bs_index/bs_index',
          })
        }else{
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      },
      fail:function(res){
        wx.switchTab({
          url: '/pages/bs_index/bs_index',
        })
      }
    })
  },
})