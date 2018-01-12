// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNav: null,
    location: ''
  },
  /**
   * 自定义函数
   */
  changeNav: function(e){ // 自定义组件触发事件时提供的detail对象
    this.setData({
      activeNav: e.detail.activeNavId
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const amapFile = require('../../utils/amap-wx');
    const app = getApp();
    const mapKey = app.globalData.mapKey;
    var that = this;
    var titleLocation = new amapFile.AMapWX({key:`${mapKey}`});
    titleLocation.getRegeo({
      success: function(data){
        //成功回调
        that.setData({
          activeNav: 0,
          location: data[0].regeocodeData.addressComponent.city
        })
        wx.setStorageSync('locationCity', data[0].regeocodeData.addressComponent.province + data[0].regeocodeData.addressComponent.city);
      },
      fail: function(info){
        //失败回调
        console.log(info)
      }
    })
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