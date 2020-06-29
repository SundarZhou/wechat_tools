// pages/main/main_search_1/main_search_url/main_search_url.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.url)
    var that = this
    this.setData({
      webUrl: decodeURIComponent(options.url)
    })
    wx.setNavigationBarTitle({
      title: options.title
    })
    wx.request({
      url: "https://route.showapi.com/883-1?showapi_appid=164812&showapi_sign=911427af001e44ca95fc14eb3a912e68&url=" + this.data.webUrl + "&needHtml=1&needContent=1&needAll_list=1",
      success: function(res) {
        console.log(res.data.showapi_res_body)
        var jsonDa = JSON.stringify(res.data.showapi_res_body.html).replace(/<img/gi, "<img class='richImg'");
        var newResData = JSON.parse(jsonDa);
        console.log(newResData);
        that.setData({
          html: newResData,
          title: res.data.showapi_res_body.title
        })
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