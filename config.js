/**
 * 小程序配置文件
 */

var hostWS = 'wss://mi-iq-socket-dev.houputech.com/iq'  //开发环境

var appId = 'wxe47c6cc9ce8d7d88'

var service = {
  appId,
  hostWS
}

var apiCodes = {
  pushHandShake: '10000000',
  getNextQuestion:'20001000',
  postLogin: '10000000',
  postLogin: '10000000',
}

var baseMsg = {
  "Channel": "mini",
  "Type": 1,
  "Code": "",
  "Data": {}
}

module.exports = { service, apiCodes, baseMsg } 