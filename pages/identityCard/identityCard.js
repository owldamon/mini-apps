// pages/identityCard/identityCard.js
const util = require('../../utils/util');
const userInfo = wx.getStorageSync('userInfo');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cards: []
  },
  updataCard(e) {
    let key = 'cards[' + e.currentTarget.id + '].img';
    let _key = 'cards[' + e.currentTarget.id + ']._img';
    wx.chooseImage({
      count: 1,
      success: res => {
        let img = res.tempFilePaths[0]
        util.uploadImg({
          imgUrl: img,
          data: {},
          success: res => {
            this.setData({
              [key]: img,
              [_key]: JSON.parse(res.data).resultData
            })
          }
        })
      }
    })
  },
  submitCard(e) {
    console.log(this.data.cards);
    util.comPOST({
      url: '/api/user/saveUserInfo', 
      data: {
        userId: userInfo.id,
        cardFace: this.data.cards[0]._img,
        cardBack: this.data.cards[1]._img,
        cardImg: this.data.cards[2]._img,
      },
      success: res => {
        console.log(res);
        wx.showToast({
          title: '提交成功',
          icon: 'success'
        })
        let {cardFace,cardBack,cardImg} = res.data.resultData;
        util.updateLocalData(userInfo, {cardFace,cardBack,cardImg});
        wx.redirectTo({
          url: '/pages/setting/setting'
        })
      }
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
      cards: [
        {
          img: userInfo.cardFace || '/images/card1.png',
          _img: '',
          name: '拍摄人像页'
        },
        {
          img: userInfo.cardBack || '/images/card2.png',
          _img: '',
          name: '拍摄国徽页'
        },
        {
          img: userInfo.cardImg || '/images/card3.png',
          _img: '',
          name: '拍摄手持身份证'
        }
      ]
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