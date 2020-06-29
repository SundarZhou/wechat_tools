//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.setStorageSync('disabled', false)
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.head_icon = res.userInfo
              wx.setStorageSync('disabled', true)
            }
          })
        } else {
          wx.switchTab({
            url: '/pages/mine/mine'
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    head_icon: {
      avatarUrl: "/images/head_boy.png",
      nickName: "点击登录",
    },
  }
})