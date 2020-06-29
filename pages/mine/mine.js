// pages/mine/mine.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: false
  },
  toMess: function() {
    var that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          if (!that.data.disabled) {
            wx.showToast({
              title: '请先授权登录',
              icon: 'none'
            })
          } else {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.navigateTo({
              url: 'mine_mess/mine_mess?avatarUrl=' + that.data.head_icon.avatarUrl + '&city=' + that.data.head_icon.city + '&country=' + that.data.head_icon.country + '&gender=' + that.data.head_icon.gender + '&nickName=' + that.data.head_icon.nickName + '&province=' + that.data.head_icon.province,
            })
          }
        } else {
          wx.showToast({
            title: '请先授权登录',
            icon: 'none'
          })
        }
      }
    })
  },
  exit: function() {
    var that = this
    wx.showModal({
      title: '退出登录',
      content: '确定退出登录吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.setData({
            head_icon: {
              avatarUrl: "/images/head_boy.png",
              nickName: "点击登录"
            },
            disabled: false
          })
          wx.setStorageSync('disabled', false)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onLoginTap: function(e) {
    console.log(e)
    var that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.showLoading({
            title: '登录中',
          })

          wx.login({
            success(res) {
              if (res.code) {
                wx.getUserInfo({
                  success: res => {
                    // 可以将 res 发送给后台解码出 unionId
                    console.log(res)
                    wx.hideLoading()
                    that.setData({
                      head_icon: res.userInfo,
                      disabled: true
                    })
                    wx.setStorageSync('disabled', that.data.disabled)
                  }
                })
              }
            }
          })
        } else {
          wx.authorize({
            scope: 'scope.userInfo',
            success(res) {}
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.getStorage({
      key: 'disabled',
      success: function(res) {
        that.setData({
          head_icon: app.globalData.head_icon,
          disabled: res.data
        })
      },
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



// // 获取用户信息
// wx.getSetting({
//   success: res => {
//     console.log(res)
//     if (res.authSetting['scope.userInfo']) {
//       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
//       wx.getUserInfo({
//         success: res => {
//           // 可以将 res 发送给后台解码出 unionId
//           this.globalData.head_icon = res.userInfo
//         }
//       })
//     } else {
//       wx.switchTab({
//         url: '/pages/mine/mine'
//       })
//     }
//   }
// })