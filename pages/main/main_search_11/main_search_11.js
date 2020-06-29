// pages/main/main_search_11/main_search_11.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  bindChange: function(e) {
    const val = e.detail.value
    var id = this.data.gloalPlace[val[0]]._id
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://route.showapi.com/2145-2?showapi_appid=164610&showapi_sign=ba353723012c455896e4d91bfa1a3b45&id=' + id,
      success: function(res) {
        console.log(res.data)
        wx.hideLoading()
        that.setData({
          price: res.data.showapi_res_body
        })
      }
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
    wx.request({
      url: this.data.codeUrl,
      success: function(res) {
        console.log(res.data)
        switch (res.data.showapi_res_code) {
          case -6:
            wx.showToast({
              title: res.data.showapi_res_error,
              icon: 'none'
            })
            setTimeout(function() {
              wx.switchTab({
                url: '/pages/main/main'
              })
            }, 3000)
            break;
          case 0:
            that.setData({
              gloalPlace: res.data.showapi_res_body.data,
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

// const date = new Date()
// const years = []
// const months = []
// const days = []

// for (let i = 1990; i <= date.getFullYear(); i++) {
//   years.push(i)
// }

// for (let i = 1; i <= 12; i++) {
//   months.push(i)
// }

// for (let i = 1; i <= 31; i++) {
//   days.push(i)
// }

// Page({
//   data: {
//     years: years,
//     year: date.getFullYear(),
//     months: months,
//     month: 2,
//     days: days,
//     day: 2,
//     value: [7],
//   },
//   bindChange: function (e) {
//     const val = e.detail.value
//     this.setData({
//       year: this.data.years[val[0]],
//       month: this.data.months[val[1]],
//       day: this.data.days[val[2]]
//     })
//   }
// })