// pages/pro_detail/detail.js

var url='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conditionList: [],
    approveList: [],
    proInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var taht = this;

    wx.getStorage({
      key: 'proDetail',
      success: function (res) {
        var proName = res.data.Name;
        wx.setNavigationBarTitle({
          title: proName,
        })
        var conditions = res.data.Extend6Convert
        var approves = res.data.Extend7Convert
        console.log(res)
        taht.setData({
          proInfo: res.data,
          conditionList: conditions,
          approveList:approves
        })
        url=res.data.Extend1
      },
      fail: function (res) { },
      complete: function (res) { },
    })

  },
  /**
   * 打开网页
   */
  to_web:function(){
    if(url.length>0){
      wx.navigateTo({
        url: '/pages/web_view/web?url='+url,
      })
    }
  }

})