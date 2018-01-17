// pages/stepOut/stepOut.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['京东中秋活动', '京东中秋活动', '京东中秋活动', '京东中秋活动'],
    reason: ['理由1','理由2','理由3','理由4','理由5'],
    userList: [
      {
        url: '/images/icon/icon-add.png',
        imgName: '东方',
        name: '钱东方'
      },
      {
        url: '',
        imgName: '特使',
        name: '特使'
      }
    ]

  },
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindPickerName(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      nameIndex: e.detail.value
    })
  },
  bindPickerReason(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      reasonIndex: e.detail.value
    })
  },
  chooseImage(e) {
    wx.chooseImage({
      count: 3,
      sourceType: true,
      success(data) {
        console.log(data);
      }
    })
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  submitTap(e) {
    console.log(e)
  },
  addUser(e) {
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle(
      {
        title: '暂时离开汇报'
      }
    )
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