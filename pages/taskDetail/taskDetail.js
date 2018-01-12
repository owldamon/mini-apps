// pages/taskdetail/taskdetail.js
const getCreateDate = require('../../utils/util').getCreateDate;
const getFirstImg = require('../../utils/util').getFirstImg;
const app = getApp();
const devUrl = app.globalData.devUrl;
const userInfo = wx.getStorageSync('userInfo');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: '/images/mission-banner.png',
    title: '',
    creatDate: '',
    titleDisc: '',
    period: '',
    price: '',
    taskAddress: '',
    companyName: '',
    companyLogo: '/images/logo.png',
    companyAddr: '',
    taskDisc: '',
    taskDemand: ''
  },
  getTaskDetail(id) {
    wx.request({
      url: devUrl + '/api/task/getTask',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        taskId: id
      },
      dataType: 'json',
      success: res => {
        const info = res.data.resultData;
        this.setData({
          imgUrl: getFirstImg(info).imgs,
          title: info.title,
          createDate: getCreateDate(info).createDate,
          titleDisc: info.titleDisc,
          price: info.taskWages,
          companyName: info.companyName,
          companyLogo: info.companyIcon,
          companyAddr: info.companyAddress,
          taskAddress: info.taskAddress,
          taskDisc: info.taskDisc,
          taskDemand: info.taskDemand
        })
      },
      fail: error=> {
        console.log(error)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle(
      {
        title: '任务详情'
      }
    )
    this.getTaskDetail(options.id);
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