// pages/goodsList/goodsList.js
let {
  requestApi
} = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsListDatas: [],
    page: 1,
    goodsH:0,
    cat_id:0
  },
  async getGoodsDatas(cat_id,min,max,page) {
    let res = await requestApi("https://x.dscmall.cn/api/catalog/goodslist", {
      cat_id: cat_id,
      warehouse_id: 0,
      area_id: 0,
      min: min,
      max: max,
      goods_num: 0,
      size: 10,
      page: page,
      sort: "goods_id",
      order: "asc",
      self: 0
    },"post")
    this.setData({
      goodsListDatas:this.data.goodsListDatas.concat(res.data.data)
    })
    // console.log(res.data.data);
    
  },
  loadMore(){
    this.setData({
      page:++this.data.page
    })
    console.log(111);
    
    this.getGoodsDatas(this.data.cat_id,"","",this.data.page)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.cat_id);
    this.getGoodsDatas(options.cat_id,"","",this.data.page)
    this.setData({
      cat_id:options.cat_id
    })
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          goodsH:result.windowHeight
        })
      },
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