// pages/demo3/demo3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartListDatas:[],
    isSelectAll:false,
    totalPrice:0
  },
  reduce(e){
    // console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index
    var cartListDatas = this.data.cartListDatas
    var buyNum = cartListDatas[index].buyNum
    if(buyNum>1){
      cartListDatas[index].buyNum = buyNum-1
    }
    this.setData({
      cartListDatas:cartListDatas
    })
    this.totalPrice()
  },
  addNum(e){
    var index = e.currentTarget.dataset.index
    var cartListDatas = this.data.cartListDatas
    var buyNum = cartListDatas[index].buyNum
    cartListDatas[index].buyNum = buyNum+1
    this.setData({
      cartListDatas:cartListDatas
    })
    this.totalPrice()
  },
  checkRadio(e){
    // console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index
    var cartListDatas = this.data.cartListDatas
    var isSelect = cartListDatas[index].isSelect
    cartListDatas[index].isSelect = !isSelect
    this.setData({
      cartListDatas:cartListDatas
    })
    // 创建一个临时数组，单选选中放入数组中，如果临时数组的长度和本地存储数组长度相同，让全选选中按钮选中
    var arr = []
    for(var i = 0;i<cartListDatas.length;i++){
      if(cartListDatas[i].isSelect){
        arr.push(cartListDatas[i])
      }
    }
    if(arr.length == cartListDatas.length){
      this.setData({
        isSelectAll:true
      })
    }else{
      this.setData({
        isSelectAll:false
      })
    }
    this.totalPrice()
  },
  selectAllFn(){
    var cartListDatas = this.data.cartListDatas
    var isSelectAll = this.data.isSelectAll
    isSelectAll = !isSelectAll
    for(var i =0;i<cartListDatas.length;i++){
      cartListDatas[i].isSelect = isSelectAll
    }
    this.setData({
      isSelectAll:isSelectAll,
      cartListDatas:cartListDatas
    })
    this.totalPrice()
  },
  totalPrice(){
    var cartListDatas = this.data.cartListDatas
    try{
      wx.setStorageSync('carts', cartListDatas)
    }catch(err){
      console.log(err);
    }
    var total =0
    for(var i = 0;i<cartListDatas.length;i++){
      if(cartListDatas[i].isSelect){
        total+=cartListDatas[i].shop_price*cartListDatas[i].buyNum
      }
    }
    this.setData({
      totalPrice:total
    })
  },
  deleCart(e){
    var index = e.currentTarget.dataset.index
    var cartListDatas = this.data.cartListDatas
    wx.showModal({
      title: '提示',
      content: '亲，您确定要放弃该宝贝吗？',
      success:(res)=> {
        if (res.confirm) {
          cartListDatas.splice(index,1)
          this.totalPrice()
          this.setData({
            cartListDatas:cartListDatas
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cartList = wx.getStorageSync('carts') || []
    // console.log(cartList);
    var flag = cartList.every(item=>{
      return item.isSelect == true
    })
    if(flag){
      this.setData({
        isSelectAll:true
      })
    }
    this.setData({
      cartListDatas:cartList
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
    this.setData({
      cartListDatas:wx.getStorageSync('carts')
    },()=>{
      this.totalPrice()
    })
    
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