// pages/goodsDetail/goodsDetail.js
let {
  requestApi
} = require("../../utils/request.js")
let wxParse = require("../../wxParse/wxParse")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetailDatas: [],
    goodsDatas: [],
    shopDetail: [],
    contentH: 0,
    showMask: false,
    recommendDatas: [],
    titleArr: ["商品", "详情", "推荐", "评论"],
    activeIndex: 0,
    topArr: [],
    heightArr: [],
    goId: "detail0",
    buyNum: 1,
    gid: 0,
    totalNum:0
    // flag:true
  },
  showMask() {
    this.setData({
      showMask: true
    })
  },
  closeMask() {
    this.setData({
      showMask: false
    })
  },
  async getDetailDatas(goods_id) {
    let res = await requestApi("https://x.dscmall.cn/api/goods/show", {
      goods_id: goods_id,
      warehouse_id: 0,
      area_id: 0,
      is_delete: 0,
      is_on_sale: 1,
      is_alone_sale: 1,
      parent_id: "",
    }, "post")
    // console.log(res.data.data.goods_desc);

    this.setData({
      goodsDetailDatas: res.data.data.gallery_list,
      goodsDatas: res.data.data,
      shopDetail: res.data.data.basic_info
    })
    wxParse.wxParse('content', 'html', res.data.data.goods_desc, this, 5);
    setTimeout(() => {
      this.isScrollFn()
    }, 5000)

  },
  getRecommendDatas() {
    requestApi("https://x.dscmall.cn/api/goods/goodsguess", {
      page: 1,
      size: 10
    }, "post").then(res => {
      // console.log(res.data.data);
      this.setData({
        recommendDatas: res.data.data
      })
      this.isScrollFn()
    })
  },
  scrollFn(e) {
    // console.log(e.detail.scrollTop);
    for (var i = 0; i < this.data.topArr.length; i++) {
      if (e.detail.scrollTop < this.data.topArr[i] - 44 + this.data.heightArr[i]) {
        // console.log(this.data.topArr[i] + this.data.heightArr[i]+88);
        this.setData({
          activeIndex: i
        })
        // console.log(this.data.acctiveIndex);
        break
      }
    }
  },
  isScrollFn() {
    var topArr = []
    var heightArr = []
    for (let i = 0; i < 4; i++) {
      var idDetail = "#detail" + i
      const query = wx.createSelectorQuery()
      query.select(idDetail).boundingClientRect()
      query.exec((res) => {
        console.log(res);
        var top = res[0].top
        var height = res[0].height
        topArr[i] = top
        heightArr[i] = height
        console.log(topArr);
        console.log(heightArr);
      })
      this.setData({
        topArr: topArr,
        heightArr: heightArr
      })
    }
  },
  changeDetail(e) {
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    this.setData({
      goId: id,
      activeIndex: index
    })
  },
  changeCartNum(e) {
    // console.log(e.currentTarget.dataset.num);
    if (e.currentTarget.dataset.num == 0) {
      if (this.data.buyNum <= 1) {
        this.setData({
          buyNum: 1
        })
      } else {
        this.setData({
          buyNum: this.data.buyNum - 1
        })
      }
    } else {
      this.setData({
        buyNum: this.data.buyNum + 1
      })
    }
  },
  addCart() {
    console.log(this.data.goodsDatas);
    var goods = this.data.goodsDatas
    goods.isSelect = true
    goods.buyNum = this.data.buyNum
    var gid = this.data.gid
    var cartDatas = wx.getStorageSync('carts') || [];
    if (cartDatas.length > 0) {
      for (var key in cartDatas) {
        //如果购物车中存在当前数据
        if (cartDatas[key].goods_id == gid) {
          cartDatas[key].buyNum = cartDatas[key].buyNum + this.data.buyNum
          try {
            wx.setStorageSync('carts', cartDatas)
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 2000
            })
            this.closeMask()
          } catch (err) {
            console.log(err);
            wx.showToast({
              title: '添加失败',
              icon: 'error',
              duration: 2000
            })
          }
          this.totalNum()
          return;
        }
        //购物车中没有当前数据，并且购物车中已经存在数据
      }
      cartDatas.unshift(goods)
      this.closeMask()
    } else {
      cartDatas.unshift(goods)
      this.closeMask()
    }

    wx.setStorageSync('carts', cartDatas)
    this.totalNum()
  },
  switchTab(){
    wx.switchTab({
      url: '../demo3/demo3',
    })
  },
  totalNum(){
    var cartDatas = wx.getStorageSync('carts') || [];
    console.log(cartDatas);
    
    var totalNum=0;
    if(cartDatas.length>0){
      for(var i =0;i<cartDatas.length;i++){
        totalNum =totalNum + cartDatas[i].buyNum
      }
    }
    console.log(totalNum);
    
    this.setData({
      totalNum:totalNum
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.getDetailDatas(options.goods_id)
    this.setData({
      gid:options.goods_id
    })
    wx.getSystemInfo({
      success: (result) => {
        // console.log(result)
        this.setData({
          contentH: result.windowHeight
        })
      },
    })
    this.getRecommendDatas()
    this.totalNum()

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
    this.totalNum()
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