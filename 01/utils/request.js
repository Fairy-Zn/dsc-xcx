function requestApi(url,data={},method="get"){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: url,
      data:data,
      method:method,
      header:{
        "content-type":"application/json"
      },
      success:function(res){
        if(res.statusCode == 200){
          resolve(res)
        }
      },
      fail:function(err){
        reject(err)
      }
    })
  })
}
module.exports={
  requestApi
}