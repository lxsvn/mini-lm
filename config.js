/**
 * 小程序配置文件
 */

var hostWS = 'wss://mi-iq-socket-dev.houputech.com/iq'  //开发环境

var baseUrl ='https://mbbd-api.houputech.com'

var appId = 'wx66978746c3343110'

var service = {
  appId,
  hostWS
}

var apis = {
    productsListUrl:baseUrl + '/1.0/contentsV2/Products',
    homeInfoUrl: baseUrl + '/1.0/contentsV2/HomePageInfo',
    wxLoginUrl: baseUrl + '/1.0/miniapp/WxLogin',
    wxLoginSensitiveInfoUrl:baseUrl + '/1.0/miniapp/WxLoginSensitiveInfo',
    proDetailUrl: baseUrl +'/1.0/contentsV2/Product'
}

module.exports = { service, apis} 