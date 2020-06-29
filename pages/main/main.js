// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bigImgBool: false,
    banner_img: [
      {
        "src": "/images/china_01.jpg"
      },
      {
        "src": "/images/china_02.jpg"
      },
      {
        "src": "/images/china_03.jpg"
      },
      {
        "src": "/images/china_04.jpg"
      },
      {
        "src": "/images/china_05.jpg"
      },
      {
        "src": "/images/china_06.jpg"
      }
    ],
    type_item: [
      {
        "id": "12",
        "src": "/images/novel_coronavirus.png",
        "text": "疫情实时查询"
      }, 
      {
        "id": "0",
        "src": "/images/book.png",
        "text": "唐诗宋词元曲"
      },
       {
        "id": "1",
        "src": "/images/news.png",
        "text": "新闻"
      }, 
      {
        "id": "2",
        "src": "/images/money_change.png",
        "text": "汇率换算"
      }, {
        "id": "3",
        "src": "/images/xiao.png",
        "text": "笑话大全"
      }, {
        "id": "4",
        "src": "/images/zgjm.png",
        "text": "周公解梦"
      }, {
        "id": "5",
        "src": "/images/card.png",
        "text": "身份证查询"
      }, {
        "id": "6",
        "src": "/images/call.png",
        "text": "号码归属地"
      }, {
        "id": "7",
        "src": "/images/ip.png",
        "text": "全球ip查询"
      }, {
        "id": "8",
        "src": "/images/change.png",
        "text": "脑筋急转弯"
      },
       {
        "id": "9",
        "src": "/images/history.png",
        "text": "历史的今天"
      }, 
      {
        "id": "10",
        "src": "/images/jyz.png",
        "text": "今日油价"
      }, {
        "id": "11",
        "src": "/images/gloal.png",
        "text": "金店参考价格"
      }, {
        "id": "13",
        "src": "/images/dm.png",
        "text": "猜一猜"
      }, {
        "id": "14",
        "src": "/images/eng.png",
        "text": "背单词"
      }
    ]
  },
  onClickType: function(e) {
    var typeId = e.currentTarget.dataset.typeid
    var url = null
    switch (typeId) {
      case "0":
        url = "https://route.showapi.com/1620-4?showapi_appid=163751&showapi_sign=64e0f205797744a08876bc926732c373&poet="
        break;
      case "1":
        url = "https://route.showapi.com/109-35?showapi_appid=163797&showapi_sign=7167be83432346a79e6cdf50e16b88dd&title="
        break;
      case "2":
        url = "https://route.showapi.com/105-31?showapi_appid=163854&showapi_sign=8cbeef1c2ec1486ea6957d1cffb25954"
        break;
      case "3":
        url = "https://route.showapi.com/341-5?showapi_appid=163892&showapi_sign=2bf78728c6344e559f159871f2fb7ead&len=100"
        break;
      case "4":
        url = "https://route.showapi.com/1601-2?showapi_appid=163969&showapi_sign=75eb02a80a8e41c0b746bac893fc8a3f&keyWords="
        break;
      case "5":
        url = "https://route.showapi.com/25-3?showapi_appid=164005&showapi_sign=752362a805704af9bbd6fbffb2283cee&id="
        break;
      case "6":
        url = "https://route.showapi.com/6-1?showapi_appid=164260&showapi_sign=8bee29c8c2284c61939200ec8e83db8d&num="
        break;
      case "7":
        url = "https://route.showapi.com/20-1?showapi_appid=164263&showapi_sign=8ed2e75d5ce543d1beaad4f1d73d7a06&ip="
        break;
      case "8":
        url = "https://route.showapi.com/1618-3?showapi_appid=164295&showapi_sign=b2bbafb52856402abfacc2a6e016c8f8&len=20"
        break;
      case "9":
        url = "https://route.showapi.com/119-42?showapi_appid=164354&showapi_sign=71cfda0a91e44e70aac5de5f1951e496"
        break;
      case "10":
        url = "https://route.showapi.com/138-46?showapi_appid=164572&showapi_sign=0c5ee55884604b469d8db50f7519b73b&prov="
        break;
      case "11":
        url = "https://route.showapi.com/2145-1?showapi_appid=164610&showapi_sign=ba353723012c455896e4d91bfa1a3b45"
        break;
      case "12":
        url = "https://route.showapi.com/2217-2?showapi_appid=166717&showapi_sign=5940b7d81a7d4979b120004d17c1ae74"
        break;
      case "13":
        url = "https://route.showapi.com/151-2?showapi_appid=168071&showapi_sign=b170d2ee39d94917a707e201abe1e48a"
        break;
      case "14":
        url = "https://route.showapi.com/8-11?showapi_appid=175397&showapi_sign=8b1d37c0b5a0423ea258a1b2450ebf8d"
        break;
    }
    wx.navigateTo({
      url: '../main/main_search_' + typeId + '/main_search_' + typeId + '?typeId=' + typeId + '&typeText=' + e.currentTarget.dataset.typetext + '&url=' + encodeURIComponent(url),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  bigImg: function (e) {
    this.setData({
      bigImgBool: true,
      bigImgSrc: e.currentTarget.dataset.imgsrc
    })
  },
  hideImg: function () {
    this.setData({
      bigImgBool: false
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