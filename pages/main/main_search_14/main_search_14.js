// pages/main/main_search_14/main_search_14.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "请选择类型"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  bindChange: function (e) {
    const val = e.detail.value
    if (val[0] - 1 >= 0) {
      var childList = this.data.wordTypeList[val[0]].child_list
      var class_id = this.data.wordTypeList[val[0]].child_list[val[1]].class_id
      var title = this.data.wordTypeList[val[0]].child_list[val[1]].title
    } else {
      var childList = []
      var class_id = null
      var title = "请选择类型"
    }
    this.setData({
      childList: childList,
      class_id: class_id,
      title: title
    })
  },
  onClickSearchEng: function(e) {
    var class_id = this.data.class_id
    if (class_id) {
      wx.navigateTo({
        url: '/pages/main/main_search_14/wordList/wordList?class_id=' + class_id + "&title=" + this.data.title,
      })
    } else {
      wx.showToast({
        title: "请选择单词类型",
        icon: 'none'
      })
    }
    
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.typeText
    })
    this.setData({
      ccUrl: decodeURIComponent(options.url),
      typeId: options.typeId,
    })
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: this.data.ccUrl,
      success: function (res) {
        switch (res.data.showapi_res_code) {
          case -7:
            that.setData({
              showMess: false,
              showapi_res_error: res.data.showapi_res_error
            })
            break;
          case -1:
            wx.hideLoading()
            wx.showToast({
              title: "数据返回失败",
              icon: 'none'
            })
            break;
          case 0:
            console.log(res.data)
            wx.hideLoading()
            that.setData({
              showMess: true,
              wordTypeList: res.data.showapi_res_body.typeList
            })
            break;
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})