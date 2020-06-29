// pages/main/main_search_4/main_search_4.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMess: true,
    search: {
      "placeholder": "输入关键词进行搜索",
      "onClickSearch": "onClickSearch4"
    }
  },
  getInputText: function(e) {
    var val = e.detail.value;
    this.setData({
      title: val.replace(/\s+/g, '')
    });
  },
  onClickSearch4: function() {
    var keyword = this.data.title
    var searchCodeUrl = this.data.codeUrl
    var that = this
    wx.request({
      url: searchCodeUrl + keyword,
      success: function(res) {
        console.log(res.data)
        switch (res.data.showapi_res_code) {
          case -7:
            that.setData({
              showMess: false,
              showapi_res_error: res.data.showapi_res_error
            })
            break;
          case 0:
            if (res.data.showapi_res_body.contentlist.length > 0) {
              wx.showLoading({
                title: '加载中',
              })
              setTimeout(function () {
                wx.hideLoading()
                that.setData({
                  showMess: true,
                  contentlist: res.data.showapi_res_body.contentlist,
                })
              }, 1000)
            } else {
              that.setData({
                showMess: false,
                showapi_res_error: "暂无此相关信息......"
              })
            }
            
            break;
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.typeText
    })
    this.setData({
      codeUrl: decodeURIComponent(options.url),
      typeId: options.typeId,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})