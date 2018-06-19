const pageData = {
    data: {
        level: ''
    },

    onShow: function(){
        let app = getApp();
        let level = app.level;
        this.setData({
            level: level
        });
    },

    goAgain: function(){
        wx.redirectTo({
          url: '../bs_index/bs_index'
        })
    }
};

Page(pageData);