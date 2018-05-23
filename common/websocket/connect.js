
var config = require('../../config.js');

module.exports = (function () {
  var webSocketUrl = `${config.service.hostWS}/ios_v_1.0/66507954637773`,
    socketOpened = false, // 标记websocket是否已经打开
    socketMsgQueue = [],
    connCallback = null,
    msgReceived = {};

  //1. 发起链接（握手）
  function connect(callback) {
    console.log(callback);
    if (!socketOpened) {
      var app = getApp();

      wx.connectSocket({
        url: webSocketUrl
      });

      initEvent();
      connCallback = callback;
    }else{
      console.log("socketOpened!!");
    }
  }

  //2. 初始化webSocket事件
  function initEvent() {
    //2.1 ws打开事件
    wx.onSocketOpen(function (res) {

      // 处理一下没发出去的消息
      while (socketMsgQueue.length > 0) {
        var msg = socketMsgQueue.pop();
        sendSocketMessage(msg);
      }

      // connection callback
      connCallback && connCallback.call(null);
      socketOpened = true;
      console.log('ws open ');
    });
    //2.2 ws收到服务器消息时的处理事件
    wx.onSocketMessage(function (res) {
      // console.log('ws received msg ' + res.data);
      msgReceived.callback && msgReceived.callback.call(null, res.data, ...msgReceived.params);
    });
    //2.3 ws出错时的处理事件
    wx.onSocketError(function (res) {
      console.log('ws fail ');
      socketOpened = false;
    });
    //2.4 ws关闭的处理事件
    wx.onSocketClose(function (res) {
      console.log('ws close ');
      socketOpened = false;

    });
  }

  //3. 发送ws消息
  function sendSocketMessage(msg) {

    if (typeof (msg) === 'object') {
      msg = JSON.stringify(msg);
    }
    //console.log("sendSocketMessage:" + msg);
    if (socketOpened) {

      wx.sendSocketMessage({
        data: msg
      });
    } else {
      console.log('ws closed ');
      // 发送的时候，链接还没建立 
      socketMsgQueue.push(msg);
    }
  }

  function setReceiveCallback(callback, ...params) {
    if (callback) {
      msgReceived.callback = callback;
      msgReceived.params = params;
    }
  }

  return {
    connect: connect,
    send: sendSocketMessage,
    setReceiveCallback: setReceiveCallback,
    socketOpened: socketOpened
  };

})();
