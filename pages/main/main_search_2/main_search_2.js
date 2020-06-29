// pages/main/main_search_2/main_search_2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: [0,0],
    country_money_left: "印尼卢比：IDR",
    country_money_right: "印尼卢比：IDR",
    countryRightValue: "",
    country_money: [
      "印尼卢比：IDR",
      "新西兰元：NZD",
      "乌克兰赫里纳：UAH",
      "新加坡元：SGD",
      "泰国铢：THB",
      "瑞典克朗：SEK",
      "日元：JPY",
      "瑞士法郎：CHF",
      "卢布：RUB",
      "菲律宾比索：PHP",
      "港币：HKD",
      "林吉特：MYR",
      "欧元：EUR",
      "印度卢比：INR",
      "丹麦克朗：DKK",
      "加拿大元：CAD",
      "挪威克朗：NOK",
      "阿联酋迪拉姆：AED",
      "沙特里亚尔：SAR",
      "巴西里亚尔：BRL",
      "澳门元：MOP",
      "南非兰特：ZAR",
      "土耳其里拉：TRY",
      "美元：USD",
      "人民币：CNY",
      "韩国元：KRW",
      "新台币：TWD",
      "澳大利亚元：AUD",
      "英镑：GBP"
      ]
  },
  changeInput: function(e) {
    var money = e.detail.value
    var searchCodeUrl = this.data.codeUrl
    var that = this
    if (money) {
      wx.request({
        url: searchCodeUrl + "&fromCode=" + this.data.formCode + "&toCode=" + this.data.toCode + "&money=" + money,
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
              console.log(res.data)
              wx.showLoading({
                title: '加载中',
              })
              setTimeout(function () {
                wx.hideLoading()
                that.setData({
                  showMess: true,
                  countryRightValue: res.data.showapi_res_body.money
                })
              }, 1000)
              break;
          }
        }
      })
    } else {
      wx.showToast({
        title: '未输入金额',
        icon: 'none'
      })
    }
    
  },
  bindChange: function (e) {
    const val = e.detail.value
    var formCode = this.data.country_money[val[0]].split("：")[1]
    var toCode = this.data.country_money[val[1]].split("：")[1]
    this.setData({
      country_money_left: this.data.country_money[val[0]],
      country_money_right: this.data.country_money[val[1]],
      formCode: formCode,
      toCode: toCode
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

