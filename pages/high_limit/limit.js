// pages/high_limit/limit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proList: [
      { "s": 123 }, { "s": 456 }, { "s": 789}, {}, {}, {}, {}, {}, {}
    ]
  },

  to_pro_detail: function (data) {
    var index = data.currentTarget.dataset.index;
    var proList=this.data.proList;
    wx.setStorage({
      key: 'proDetail',
      data: proList[index],
    })

    wx.getStorage({
      key: 'proDetail',
      success: function(res) {
        console.log(res.data.s)
      },
      fail: function(res) {},
      complete: function(res) {},
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})