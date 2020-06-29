// pages/test/test.js
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
    var appid = "wx2e0dbdced22a7c7f"
    var appkey = "cd94afc9a41cd85ffad2b2cdeac98438"
    wx.checkSession({
      success(res) {
        //session_key 未过期，并且在本生命周期一直有效
        console.log(res)
      },
      fail(res) {
        // session_key 已经失效，需要重新执行登录流程
        wx.login({
          success(res) {
            if (res.code) {
              //发起网络请求
              wx.request({
                url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + appkey + '&js_code=' + res.code + '&grant_type=authorization_code',
                success: function (res) {
                  wx.setStorage({
                    session_key: res.data.session_key
                  })
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
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