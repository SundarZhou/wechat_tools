// pages/main/main_search_7/main_search_7.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMess: true,
    search: {
      "placeholder": "输入ip地址进行查询",
      "onClickSearch": "onClickSearch7"
    }
  },
  getInputText: function(e) {
    var val = e.detail.value;
    this.setData({
      title: val.replace(/\s+/g, '')
    });
  },
  isValidIP: function(ip) {
    var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    return reg.test(ip);
  },
  onClickSearch7: function() {
    var ipID = this.data.title
    var searchCodeUrl = this.data.codeUrl
    var that = this
    if (this.isValidIP(ipID)) {
      wx.request({
        url: searchCodeUrl + ipID,
        success: function (res) {
          console.log(res.data)
          switch (res.data.showapi_res_code) {
            case -7:
              that.setData({
                showMess: false,
                showapi_res_error: res.data.showapi_res_error
              })
              break;
            case 0:
              wx.showLoading({
                title: '加载中',
              })
              setTimeout(function () {
                wx.hideLoading()
                that.setData({
                  showMess: true,
                  ipMess: res.data.showapi_res_body,
                })
              }, 1000)
              break;
          }
        }
      })
    } else {
      wx.showToast({
        title: '输入的IP地址有误，请重新检查......',
        icon: 'none'
      })
    }
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