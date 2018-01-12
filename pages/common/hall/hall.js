// pages/common/hall/hall.js
const getCreateDate = require('../../../utils/util').getCreateDate;
const getFirstImg = require('../../../utils/util').getFirstImg
const app = getApp();
const devUrl = app.globalData.devUrl;
const userInfo = wx.getStorageSync('userInfo');

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
    isSort: false,
    location: '',
    nowPage: 0,
    useTime: 1, 
    activeTitle: '',
    notInput: true,
    missionList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    searchInput(event) {
      this.setData({
        notInput: !event.detail.value
      });
    },
    goDetail(event) {
      wx.navigateTo({
        url: '/pages/taskDetail/taskDetail?id=' + event.currentTarget.id
      })
    },
    getTaskLsit() {
      wx.request({
        url: devUrl + '/api/task/taskList',
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          page: this.data.nowPage,
          title: this.data.activeTitle,
          timeBy: this.data.useTime
        },
        dataType: 'json',
        success: res => {
          this.setData({
            missionList : res.data.resultData.list.filter(getCreateDate).filter(getFirstImg)
          })
        },
        fail: error=> {
          console.log(error)
        }
      })
    }
  },
  /**
   * 组件布局完成
   */
  ready(){
    this.getTaskLsit();
    this.setData({
      location: this.dataset.location
    })
  }
})
