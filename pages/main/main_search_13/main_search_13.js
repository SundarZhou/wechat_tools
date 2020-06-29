// pages/main/main_search_13/main_search_13.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  showAnswer: function (e) {
    let index = 0;
    let lists = this.data.contentlist;//获取循环数组对象
    for (let index in lists) {
      //如果当前点击的对象id和循环对象里的id一致
      if (index == e.currentTarget.dataset.id) {
        //判断当前对象中的isShow是否为true（true为显示，其他为隐藏） 
        if (lists[index].isShow == "" || lists[index].isShow == undefined) {
          lists[index].isShow = "true"
          lists[index].answer = lists[index].answer.split("：")[1]
        } else {
          lists[index].isShow = ""
          lists[index].answer = "谜底：" + lists[index].answer
        }
      }
      index++;
    }
    console.log(lists[0].isShow)
    this.setData({
      contentlist: lists
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
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
              contentlist: res.data.showapi_res_body.pagebean.contentlist
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
    var that = this
    var new_list = []
    wx.request({
      url: this.data.ccUrl,
      success: function (res) {
        new_list = that.data.contentlist.concat(res.data.showapi_res_body.pagebean.contentlist)
        that.setData({
          contentlist: new_list,
          loading: "加载中......"
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})