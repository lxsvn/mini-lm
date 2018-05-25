/**
 * 小程序配置文件
 */

var hostWS = 'wss://mi-iq-socket-dev.houputech.com/iq'  //开发环境

var baseUrl ='https://mbbd-api.houputech.com'

var productsListUrl = baseUrl +'/1.0/contentsV2/Products'

var appId = 'wx66978746c3343110'

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

module.exports = { service, apiCodes, baseMsg, productsListUrl} 