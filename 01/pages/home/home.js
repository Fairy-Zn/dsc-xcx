// pages/demo4/demo4.js
let {requestApi} =require("../../utils/request")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ocolor: '#f34646',
    swiperDatas: [],
    swiperList1:[],
    swiperList2:[],
    swiperList3:[],
    newsList:[],
    noPrice:0,
    seckillList:[],
    seckillWid:0,
    seckillWidth:204,
    activeClass:1,
    miaoshadata:[{
      active:true,
      title:'进行中',
      time:'16:00',
      getid:'27',
      tomorrow:0,
    },{
      active:false,
      title:'即将开始',
      time:'24:00',
      getid:'28',
      tomorrow:0,
    },{
      active:false,
      title:'即将开始',
      time:'8:00',
      getid:'15',
      tomorrow:1,
    },{
      active:false,
      title:'即将开始',
      time:'10:00',
      getid:'16',
      tomorrow:1,
    },],
    navList:[{
      id:1,
      title:"首页",
      active:true
    },{
      id:2,
      title:"家用电器",
      active:false
    },{
      id:3,
      title:"男装女装",
      active:false
    },{
      id:4,
      title:"鞋靴箱包",
      active:false
    },{
      id:5,
      title:"手机数码",
      active:false
    },{
      id:6,
      title:"电脑办公",
      active:false
    },{
      id:7,
      title:"家居家纺",
      active:false
    },{
      id:8,
      title:"个人化妆",
      active:false
    }],
    navUrl:[{url:"./home"},{url:"./children/ele"}],
    listDatas:[],
    page:1,
    winH:0,
    flag:false
  },
  changeSwipers(e) {
    // console.log(e.detail.current);
    var arr = ["#f34646","#e43124","#3c81ff","#028379","#4091ff"]
    this.setData({
      ocolor:arr[e.detail.current]
    })
  },
  changeTime(e){
    // console.log(e.currentTarget.id);
    // console.log(e.currentTarget.dataset.index);
    var datalist=this.data.miaoshadata;
    for(var i=0;i<datalist.length;i++){
      if(i==e.currentTarget.dataset.index){
        datalist[i].active=true
      }else{
        datalist[i].active=false
      }
    }
    this.setData({
      miaoshadata:datalist
    })
    requestApi("https://x.dscmall.cn/api/visual/visual_seckill",{
        "id": this.data.miaoshadata[e.currentTarget.dataset.index].getid,
        "tomorrow": this.data.miaoshadata[e.currentTarget.dataset.index].tomorrow
      }).then(res=>{
        this.setData({
          seckillList:res.data.data.seckill_list,
          seckillWid:(res.data.data.seckill_list.length)*(this.data.seckillWidth
            +12)
        })
      }) 
  },
  changeNav(e){
    // console.log(e.target.id);
    var navlists = this.data.navList
    var navUrls = this.data.navUrl
    // console.log(navlists);
    for(var i =0;i<this.data.navList.length;i++){
      if(i == e.target.id-1){
        navlists[i].active = true
        wx.redirectTo({
          url:navUrls[e.target.id-1]
        })
      }else{
        navlists[i].active = false
      }
    }
    this.setData({
      navList:navlists
    })
  },
  getListDataFn(){
    wx.showLoading({
      title: '加载中',
    })
    requestApi("https://x.dscmall.cn/api/goods/type_list",{
      page:this.data.page,
      size:10,
      type:"is_best"
    }).then(res=>{
      if(res.statusCode == 200){
        wx.hideLoading()
        if(res.data.data.length == 0){
          this.setData({
            flag:false
          })
        }
        this.setData({
        listDatas:this.data.listDatas.concat(res.data.data),
        page:++this.data.page,
        flag:true
      })
      }
    })
  },
  loadMore(){
    if(this.data.flag){
      this.getListDataFn()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getListDataFn()
    requestApi("https://x.dscmall.cn/api/visual/view",{
      id: 3,
      type: 'index',
      device: 'h5'
    },"POST").then(res=>{
      var aaa = JSON.parse(res.data.data.data)
      // console.log(aaa);
      this.setData({
        swiperList1:aaa[3].data.list.slice(0,10),
        swiperList2:aaa[3].data.list.slice(10),
        swiperList3:aaa[3].data.list.slice(20),
        swiperDatas:aaa[2].data.list,
        noPrice:aaa[5].data.list[0].img
      })
    }),
    requestApi("https://x.dscmall.cn/api/visual/article",{
      cat_id: '20',
      num: '10'
    },"POST").then(res=>{
      this.setData({
        newsList:res.data.data
      })
    }),
    requestApi("https://x.dscmall.cn/api/visual/visual_seckill",{
      "id":27,
      "tomorrow":0
    }).then(res=>{
      this.setData({
        seckillList:res.data.data.seckill_list,
          seckillWid:(res.data.data.seckill_list.length)*(this.data.seckillWidth
            +12)
      })
    })
    wx.getSystemInfo({
    success: (result) => {
      this.setData({
        winH:result.windowHeight
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