// pages/main/main_search/main_search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMess: true,
    biography: "",
    result: [],
    search: {
      "placeholder":"请输入作者名字进行搜索",
      "onClickSearch": "onClickSearch0"
      }
  },
  getInputText: function(e) {
    var val = e.detail.value;
    this.setData({
      title: val.replace(/\s+/g, '')
    });
  },
  onClickSearch0: function() {
    var searchContent = this.data.title
    var searchCodeUrl = this.data.codeUrl
    var that = this
    wx.request({
      url: searchCodeUrl + searchContent,
      success: function(res) {
        console.log(res.data)
        switch (res.data.showapi_res_code) {
          case -7:
            that.setData({
              showMess: false,
              showapi_res_error: res.data.showapi_res_error
            })
           break;
          case 0:
            if (res.data.showapi_res_body.poetInfo.length > 0) {
              that.setData({
                poetId: res.data.showapi_res_body.poetInfo[0].poetId,
              })
              var biography = res.data.showapi_res_body.poetInfo[0].biography
              wx.request({
                url: 'https://route.showapi.com/1620-5?showapi_appid=163751&showapi_sign=64e0f205797744a08876bc926732c373&poetId=' + that.data.poetId + '&page=1',
                success: function (res) {
                  console.log(res.data)
                  wx.showLoading({
                    title: '加载中',
                  })
                  setTimeout(function () {
                    wx.hideLoading()
                    that.setData({
                      showMess: true,
                      result: res.data.showapi_res_body.poemInfo,
                      biography: biography
                    })
                  }, 1000)
                }
              })
            } else {
              that.setData({
                showMess: false,
                showapi_res_error: "查询不到数据，请检查搜索条件......"
              })
            }
            break;
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.typeText
    })
    this.setData({
      codeUrl: decodeURIComponent(options.url),
      typeId: options.typeId
    })
    var arr = ["李白", "王维", "杜甫", "白居易", "李煜", "王安石"]
    var index = Math.floor((Math.random() * arr.length));
    var searchContent = arr[index]
    var searchCodeUrl = this.data.codeUrl
    var that = this
    wx.request({
      url: searchCodeUrl + searchContent,
      success: function (res) {
        console.log(res.data.showapi_res_code)
        switch (res.data.showapi_res_code) {
          case -7:
            that.setData({
              showMess: false,
              showapi_res_error: res.data.showapi_res_error
            })
            break;
          case 0:
            that.setData({
              poetId: res.data.showapi_res_body.poetInfo[0].poetId,
            })
            var biography = res.data.showapi_res_body.poetInfo[0].biography
            wx.request({
              url: 'https://route.showapi.com/1620-5?showapi_appid=163751&showapi_sign=64e0f205797744a08876bc926732c373&poetId=' + that.data.poetId + '&page=1',
              success: function (res) {
                console.log(res.data)
                wx.showLoading({
                  title: '加载中',
                })
                setTimeout(function () {
                  wx.hideLoading()
                  that.setData({
                    showMess: true,
                    result: res.data.showapi_res_body.poemInfo,
                    biography: biography
                  })
                }, 1000)
              }
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