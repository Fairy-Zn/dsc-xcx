// pages/demo2/demo2.js
let { requestApi } = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winH: 0,
    listDatas: [],
    listContents: [],
    id: 0,
    navList: [{
      id: 1,
      title: "社区",
      active: true
    }, {
      id: 2,
      title: "店铺街",
      active: false
    }, {
      id: 3,
      title: "视频",
      active: false
    }],
    page: 1
  },
  changeNav(e) {
    console.log(e);
    var navlists = this.data.navList
    for (var i = 0; i < navlists.length; i++) {
      if (i == e.target.id - 1) {
        navlists[i].active = true
      } else {
        navlists[i].active = false
      }
    }

    if(e.target.id ==3){
      wx.showLoading({
        title: '加载中',
      })
      requestApi("https://x.dscmall.cn/api/goods/goodsvideo", {
        "size": 10,
        "page": this.data.page,
        "sort": "goods_id",
        "order": "desc",
      },"post").then(res=>{
        console.log(res);
        if(res.statusCode == 200){
          wx.hideLoading()
        }
        this.setData({
          listDatas:res.data.data,
          page:this.data.page
        })
      })
    }else if(e.target.id ==1){
      requestApi("https://x.dscmall.cn/api/discover/find_list", {
        "size": 10,
        "page": 1
      }).then(res => {
        console.log(res.data.data);
        this.setData({
          listDatas: res.data.data
        })
      })
    }

    this.setData({
      navList: navlists,
      id: e.target.id
    })
    // this.changePlate(e)
  },
  // changePlate(e) {
  //   console.log(this.data.id);
  //   console.log(e.target.dataset.index );
    
  //   if (this.data.id == e.target.dataset.index + 1) {
  //     wx.showLoading({
  //       title: '加载中',
  //     })
  //     requestApi("https://x.dscmall.cn/api/goods/goodsvideo", {
  //       "size": 10,
  //       "page": this.data.page,
  //       "sort": "goods_id",
  //       "order": "desc",
  //     }, "post").then(res => {
  //       // console.log(res);
  //       if (res.statusCode == 200) {
  //         wx.hideLoading()
  //       }
        
  //     })
  //     this.setData({
  //         listDatas: this.data.listDatas.concat(res.data.data),
  //         page: ++this.data.page
  //       })
  //   }
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          winH: result.windowHeight
        })
      },
    }),
      requestApi("https://x.dscmall.cn/api/discover/find_list", {
        "size": 10,
        "page": 1
      }).then(res => {
        console.log(res.data.data);
        this.setData({
          listDatas: res.data.data
        })
      }),
      requestApi("https://x.dscmall.cn/api/goods/goodsvideo", {
        "size": 10,
        "page": 1,
        "sort": "goods_id",
        "order": "desc",
      }, "post").then(res => {
        console.log(res);

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