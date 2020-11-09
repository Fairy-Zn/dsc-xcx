// pages/demo1/demo1.js
let {requestApi} =require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftListdatas:[],
    index:[0,1,2,3,4],
    cid:0,
    activeIndex:0,
    rightListDatas:[],
    imgsrc:"https://x.dscmall.cn/storage/data/touch_catads/15630384831872.jpg",
    catH:0
  },
  changeList(e){
    // console.log(e.currentTarget.dataset.index);
    requestApi("https://x.dscmall.cn/api/catalog/list").then(res=>{
      var listDatas = res.data.data.filter((item)=>{
        return item.cat_id
      })
      this.setData({
        cid:listDatas[e.currentTarget.dataset.index].cat_id,
        imgsrc:listDatas[e.currentTarget.dataset.index].touch_catads,
        activeIndex:e.currentTarget.dataset.index
      })
      // console.log(listDatas[e.currentTarget.dataset.index]);
      this.changeLists(this.data.cid)
    })
    
  },
  changeLists(cid){
    requestApi("https://x.dscmall.cn/api/catalog/list/"+cid).then(res=>{
      // console.log(res.data.data);
      this.setData({
        rightListDatas:res.data.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    requestApi("https://x.dscmall.cn/api/catalog/list").then(res=>{
      // console.log(res.data.data);
      this.setData({
        leftListdatas:res.data.data
      })
    })
    this.changeLists(858)
    wx.getSystemInfo({
      success: (result) => {
        // console.log(result.windowHeight);
        
        this.setData({
          catH:result.windowHeight
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