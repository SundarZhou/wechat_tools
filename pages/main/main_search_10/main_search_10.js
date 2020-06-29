// pages/main/main_search_10/main_search_10.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMess: true,
    search: {
      "placeholder": "输入省份查询油价(例：广东)",
      "onClickSearch": "onClickSearch10"
    }
  },
  getInputText: function(e) {
    var val = e.detail.value;
    this.setData({
      title: val.replace(/\s+/g, '')
    });
  },
  onClickSearch10: function() {
    var provID = this.data.title
    var searchCodeUrl = this.data.codeUrl
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: searchCodeUrl + provID,
      success: function(res) {
        console.log(res.data)
        switch (res.data.showapi_res_body.ret_code) {
          case -7:
            wx.hideLoading()
            that.setData({
              showMess: false,
              showapi_res_error: res.data.showapi_res_body.remark
            })
            break;
          case -1:
            wx.hideLoading()
            that.setData({
              showMess: false,
              showapi_res_error: res.data.showapi_res_body.remark
            })
            break;
          case 0:
            wx.hideLoading()
            that.setData({
              showMess: true,
              youMess: res.data.showapi_res_body.list,
            })
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