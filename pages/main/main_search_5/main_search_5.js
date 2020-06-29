// pages/main/main_search_5/main_search_5.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMess: true,
    search: {
      "placeholder": "输入身份证号码进行查询",
      "onClickSearch": "onClickSearch5"
    }
  },
  getInputText: function(e) {
    var val = e.detail.value;
    this.setData({
      title: val.replace(/\s+/g, '')
    });
  },
  //身份证号码校验
  IdentityCodeValid: function(code) {
    code = code.toUpperCase();
    var city = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江 ",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北 ",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏 ",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门",
      91: "国外"
    };
    var arr = []
    arr.tip = "";
    arr.pass = true;

    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X|x)$/i.test(code)) {
      //if(!code || !/(^\d{17}(\d|X|x)$)/i.test(code)){ 
      arr.tip = "身份证号格式错误";
      arr.pass = false;
    } else if (!city[code.substr(0, 2)]) {
      arr.tip = "地址编码错误";
      arr.pass = false;
    } else {
      //18位身份证需要验证最后一位校验位
      if (code.length == 18) {
        code = code.split('');
        //∑(ai×Wi)(mod 11)
        //加权因子
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        var sum = 0;
        var ai = 0;
        var wi = 0;
        for (var i = 0; i < 17; i++) {
          ai = code[i];
          wi = factor[i];
          sum += ai * wi;
        }
        var last = parity[sum % 11];
        if (parity[sum % 11] != code[17]) {
          arr.tip = "校验位错误";
          arr.pass = false;
        }
      }
    }
    //if(!pass) mui.toast(tip);
    return arr;
  },
  onClickSearch5: function() {
    var cardID = this.data.title
    var searchCodeUrl = this.data.codeUrl
    var that = this
    var newPass = this.IdentityCodeValid(cardID)
    if (newPass.pass) {
      wx.request({
        url: searchCodeUrl + cardID,
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
              var sex = ""
              if (res.data.showapi_res_body.retData.sex === "M") {
                sex = "男"
              } else {
                sex = "女"
              }
              wx.showLoading({
                title: '加载中',
              })
              setTimeout(function () {
                wx.hideLoading()
                that.setData({
                  showMess: true,
                  cardMess: res.data.showapi_res_body.retData,
                  sex: sex
                })
              }, 1000)
              break;
          }

        }
      })
    } else {
      wx.showToast({
        title: newPass.tip,
        icon: 'none'
      })
    }
    
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
      typeId: options.typeId,
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