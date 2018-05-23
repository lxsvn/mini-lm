//index.js
//获取应用实例
var ws = require('../../common/websocket/connect.js');
var msgReceived = require('../../common/websocket/msgHandler.js');

var app = getApp();

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    msg: ''
  },
  onLoad: function () {
    //this.openWS(); 
  }, 
  // ################## 事件处理函数 ################## 
  //1. 去首页
  goHomePage: function () {
    wx.navigateTo({
      url: '../entry/entry'
    })
  }, 
  //2. 去测试socket页面
  goTestSocketPage: function () {
    wx.navigateTo({
      url: '../test/socket'
    })
  },
})
