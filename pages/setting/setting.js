// pages/setting/setting.js
const util = require('../../utils/util');
const userInfo = wx.getStorageSync('userInfo');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: '/images/icon/icon-userpic.png',
    array: ['1年以下', '1年以上至2年以下', '2年以上'],
    _nickName: '',
    _phone: '',
    nickName: '',
    phone: '',
    gender: '',
    exp: '',
    sex: [
      {
        value: '男',
        class: 'sex-icon'
      },
      {
        value: '女',
        class: 'sex-icon'
      }
    ]
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      exp: e.detail.value
    })
  },
  submitTap(e) {
    console.log(this.data.exp)
    util.comPOST({
      url: '/api/user/saveUserInfo',
      data: {
        userId: userInfo.id,
        nickname: this.data.nickName,
        phone: this.data.phone,
        gender: this.data.gender || userInfo.gender ,
        experience: this.data.exp - 0 + 1
      },
      success: res => {
        wx.showToast({
          title: '提交成功',
          icon: 'success'
        })
        let {nickname,phone,gender,experience} = res.data.resultData;
        util.updateLocalData(userInfo, {nickname,phone,gender,experience})
      }
    })
  },
  goSetAvatar() {
    wx.navigateTo({url: '/pages/avatar/avatar'})
  },
  goSetIdentityCard() {
    wx.navigateTo({url: '/pages/identityCard/identityCard'})
  },
  selectSex(e, gender ) {
    if(gender == 1 || e && e.currentTarget.id == 0 ) {
      this.setData({
        sex: [
          {
            value: '男',
            class: 'sex-icon on'
          },
          {
            value: '女',
            class: 'sex-icon'
          }
        ],
        gender: 1
      })
    } else {
      this.setData({
        sex: [
          {
            value: '男',
            class: 'sex-icon'
          },
          {
            value: '女',
            class: 'sex-icon on'
          }
        ],
        gender: 2
      })
    }
    
  },
  inputName(e) {
    this.setData({
      nickName: e.detail.value,
    })
  },
  inputPhone(e) {
    this.setData({
      phone: e.detail.value,
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
      imgUrl: userInfo.avatar,
      _nickName: userInfo.nickname || '请输入名字',
      _phone: userInfo.phone || '请输入手机号',
      exp: userInfo.experience - 1
    })
    this.selectSex('',userInfo.gender - 0);
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