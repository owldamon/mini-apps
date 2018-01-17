// pages/bill/bill.js
const filterMoney = require("../../utils/util").filterMoney;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: [
      {
        name: '全部',
        class: 'type-list'
      },
      {
        name: '提现',
        class: 'type-list'
      },
      {
        name: '收入',
        class: 'type-list'
      }
    ],
    billList: []
  },
  selectBill(e) {
    let key = 'type[' + e.currentTarget.id + '].class';
    this.setData({
      type: [
        {
          name: '全部',
          class: 'type-list'
        },
        {
          name: '提现',
          class: 'type-list'
        },
        {
          name: '收入',
          class: 'type-list'
        }
      ],
    });
    this.setData({
      [key] : 'type-list on'
    })
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
    this.setData({
      'type[0].class': 'type-list on'
    });
    var billList = [
      {
        status: 2,
        name: '提现',
        balance: '0.00',
        date: '2017年12月18日',
        total: '890.00',
      },
      {
        status: 1,
        name: '收入',
        balance: '890.00',
        date: '2017年12月18日',
        total: '890.00'
      }
    ]
    this.setData({
      billList: billList.filter(filterMoney)
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