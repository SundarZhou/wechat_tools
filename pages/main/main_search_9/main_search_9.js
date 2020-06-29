// pages/main/main_search_9/main_search_9.js
const date = new Date()
const months = []
const days = []

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTime: false,
    showMess: true,
    months: months,
    days: days,
    val: ""
  },
  bindChange: function (e) {
    const val = e.detail.value
    console.log(val)
    var month = this.data.months[val[0]] > 9 ? this.data.months[val[0]] : '0' + this.data.months[val[0]]
    var day = this.data.days[val[1]] > 9 ? this.data.days[val[1]] : '0' + this.data.days[val[1]]
    this.setData({
      val: month + day
    })
  },
  changeTime: function(e) {
    console.log(e)
    this.setData({
      showTime: true
    })
  },
  onClickSearch9: function() {
    var that = this
    this.setData({
      showTime: false
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: this.data.historyUrl + "&date=" + this.data.val,
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
              history: res.data.showapi_res_body.list
            })
            break;
        }
      }
    })
  },
  getInputText: function (e) {
    var val = e.detail.value;
    this.setData({
      val: val.replace(/\s+/g, '')
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: options.typeText
    })
    this.setData({
      historyUrl: decodeURIComponent(options.url),
      typeId: options.typeId,
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: this.data.historyUrl,
      success: function(res) {
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
              history: res.data.showapi_res_body.list
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