// pages/common/home/home.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    userImg: '/images/icon/icon-userpic.png',
    userName: '您的名字',
    location: '请开启定位',
    navList: [
      {
        url: '/pages/earnings/earnings',
        name: '我的收益',
        icon: '/images/icon/icon-earnings.png'
      },
      {
        url: '/pages/kpi/kpi',
        name: '个人考核',
        icon: '/images/icon/icon-kpi.png'
      },
      {
        url: '/pages/complaint/complaint',
        name: '异常投诉',
        icon: '/images/icon/icon-complaint.png'
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goSetting() {
      wx.navigateTo({url: '/pages/setting/setting'})
    }
  },
  ready(){
    const userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userName: userInfo.nickname,
      userImg: userInfo.avatar,
      location: wx.getStorageSync('locationCity')
    })
  }
})
