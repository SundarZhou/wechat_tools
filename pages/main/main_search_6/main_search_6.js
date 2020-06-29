// pages/main/main_search_6/main_search_6.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMess: true,
    search: {
      "placeholder": "输入手机号码进行查询",
      "onClickSearch": "onClickSearch6"
    }
  },
  getInputText: function (e) {
    var val = e.detail.value;
    this.setData({
      title: val.replace(/\s+/g, '')
    });
  },
  onClickSearch6: function () {
    var phoneID = this.data.title
    var searchCodeUrl = this.data.codeUrl
    var that = this
    if ((/^1[3456789]\d{9}$/.test(phoneID))) {
      wx.request({
        url: searchCodeUrl + phoneID,
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
                if (res.data.showapi_res_body.remark === "") {
                  that.setData({
                    showMess: true,
                    phoneMess: res.data.showapi_res_body,
                  })
                } else {
                  wx.showToast({
                    title: res.data.showapi_res_body.remark,
                    icon: 'none'
                  })
                }
              }, 1000)
              break;
          }
        }
      })
    } else {
      wx.showToast({
        title: "号码格式不正确",
        icon: 'none'
      })
    }    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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