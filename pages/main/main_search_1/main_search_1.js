// pages/main/main_search_1/main_search_1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMess: true,
    search: false,
    value: "",
  },
  openUrl: function(e) {
    console.log(e.currentTarget.dataset.url)
    var url = e.currentTarget.dataset.url
    var title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: '../main_search_1/main_search_url/main_search_url?url=' + encodeURIComponent(url) + "&title=" + title,
    })
  },
  onchannelList: function(e) {
    this.setData({
      value: e.currentTarget.dataset.name
    })
  },
  getInputText: function(e) {
    var val = e.detail.value;
    if (val === "") {
      this.setData({
        search: false,
      });
    } else {
      this.setData({
        title: val.replace(/\s+/g, '')
      });
    }
  },
  onClickSearch1: function() {
    var searchContent = this.data.title ? this.data.title : this.data.value
    var searchCodeUrl = this.data.codeUrl
    var that = this
    this.setData({
      search: true
    })
    if (searchContent) {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: searchCodeUrl + searchContent + "&maxResult=100",
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
              wx.hideLoading()
              that.setData({
                showMess: true,
                result: res.data.showapi_res_body.pagebean.contentlist
              })
              break;
          }
        }
      })
    } else {
      wx.showToast({
        title: '关键词不能为空',
        icon: 'none'
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var that = this
    wx.setNavigationBarTitle({
      title: options.typeText
    })
    this.setData({
      codeUrl: decodeURIComponent(options.url),
      typeId: options.typeId,
    })
    wx.request({
      url: 'https://route.showapi.com/109-34?showapi_appid=163797&showapi_sign=7167be83432346a79e6cdf50e16b88dd',
      success: function (res) {
        switch (res.data.showapi_res_code) {
          case -7:
            that.setData({
              showMess: false,
              showapi_res_error: res.data.showapi_res_error
            })
            break;
          case 0:
            console.log(res.data)
            that.setData({
              showMess: true,
              channelList: res.data.showapi_res_body.channelList
            })
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
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})