// pages/main/main_search_12/main_search_12.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: "/images/blue_right.png"
  },
  showProv: function(e) {
    console.log(e)
    let index = 0;
    let lists = this.data.todayDetailList; //获取循环数组对象
    for (let index in lists) {
      //如果当前点击的对象id和循环对象里的id一致
      if (index == e.currentTarget.dataset.id) {
        //判断当前对象中的isShow是否为true（true为显示，其他为隐藏） 
        if (lists[index].img == "/images/blue_right.png") {
          lists[index].img = "/images/down.png"
          lists[index].isShow = "true"
        } else {
          lists[index].img = "/images/blue_right.png"
          lists[index].isShow = ""
        }
      }
      index++;
    }
    console.log(lists[0].isShow)
    this.setData({
      todayDetailList: lists
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.setNavigationBarTitle({
      title: options.typeText
    })
    this.setData({
      codeUrl: decodeURIComponent(options.url),
      typeId: options.typeId,
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: this.data.codeUrl,
      success: function(res) {
        wx.hideLoading()
        console.log(res.data)
        let lists = res.data.showapi_res_body.todayDetailList; //获取循环数组对象
        for (let index in lists) {
          lists[index].img = "/images/blue_right.png"
          index++;
        }
        that.setData({
          todayStatictic: res.data.showapi_res_body.todayStatictic,
          todayDetailList: lists,
          updateTime: res.data.showapi_res_body.updateTime
        })
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