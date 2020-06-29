// pages/main/main_search_14/wordList/wordList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  playAudio: function(e) {
    var src = e.currentTarget.dataset.src
    let index = 0;
    let lists = this.data.wordList; //获取循环数组对象
    for (let index in lists) {
      //如果当前点击的对象id和循环对象里的id一致
      if (index == e.currentTarget.dataset.id) {
        //判断当前对象中的isShow是否为true（true为显示，其他为隐藏） 
        if (lists[index].isShow == "" || lists[index].isShow == undefined) {
          lists[index].isShow = "true"
          var playIndex = index;
        } else {
          lists[index].isShow = ""
        }
      }
      index++;
    }
    this.setData({
      wordList: lists
    })
    var that = this
    const backgroundAudioManager = wx.getBackgroundAudioManager();
    backgroundAudioManager.title = "yy";
    backgroundAudioManager.src = src;
    backgroundAudioManager.play();
    backgroundAudioManager.onEnded(() => {
      for (let index in lists) {
        lists[index].isShow = ""
      }
      that.setData({
        wordList: lists
      })
    })
  },
  onLoad: function(options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: options.title
    })
    var class_id = options.class_id
    var course = 1
    var that = this
    this.setData({
      class_id: class_id,
      course: course
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: "https://route.showapi.com/8-10?showapi_appid=175397&showapi_sign=8b1d37c0b5a0423ea258a1b2450ebf8d&class_id=" + class_id + "&course=" + course,
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
              wordList: res.data.showapi_res_body.list
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
    var that = this
    var new_list = []
    var course = this.data.course + 1
    wx.request({
      url: "https://route.showapi.com/8-10?showapi_appid=175397&showapi_sign=8b1d37c0b5a0423ea258a1b2450ebf8d&class_id=" + this.data.class_id + "&course=" + course,
      success: function(res) {
        new_list = that.data.wordList.concat(res.data.showapi_res_body.list)
        that.setData({
          wordList: new_list,
          loading: "加载中......",
          course: course
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