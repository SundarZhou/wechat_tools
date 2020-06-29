// pages/main/main_search_3/main_search_3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

    var that = this
    wx.request({
      url: this.data.codeUrl,
      success: function(res) {
        switch (res.data.showapi_res_code) {
          case -7:
            that.setData({
              showMess: false,
              showapi_res_error: res.data.showapi_res_error
            })
            break;
          case 0:
            console.log(res.data)
            wx.showLoading({
              title: '加载中',
            })
            setTimeout(function() {
              wx.hideLoading()
              that.setData({
                showMess: true,
                lists: res.data.showapi_res_body.list
              })
            }, 1000)
            break;
        }
      }
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
  onReachBottom: function(e) {
    var that = this
    var new_list = []
    wx.request({
      url: this.data.codeUrl,
      success: function(res) {
        new_list = that.data.lists.concat(res.data.showapi_res_body.list)
        that.setData({
          lists: new_list,
          loading: "加载中......"
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})