// pages/common/mission/mission.js
const util = require('../../../utils/util');
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
    title: '暂无活动',
    time: '暂无时间',
    date: '',
    week: '',
    up: {
      state: '未打卡',
      class: 'duty-state',
      time: '未打卡'
    },
    down: {
      state: '未打卡',
      class: 'duty-state',
      time: '未打卡'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goCalendar(event) {
      wx.navigateTo({url: '/pages/calendar/calendar'})
    },
    goReport(event) {
      wx.navigateTo({url: '/pages/report/report'})
    },
    clockIn(event) {
      if(event.currentTarget.dataset.up) {
        util.comPOST({
          url: '/api/task/myTaskWorkSign',
          data: {
            userId: userInfo.id
          },
          success: res => {
            this.setData({
              up: {
                state: '已打卡',
                class: 'duty-state on',
                time: res.data.resultData.workTime.split(' ')[1]  
              }
            })
          }
        });
      } else {
        util.comPOST({
          url: '/api/task/myTaskWorkEndSign',
          data: {
            userId: userInfo.id
          },
          success: res => {
            console.log(res);
            if(res.data.resultCode == 0) {
              this.setData({
                down: {
                  state: '已打卡',
                  class: 'duty-state on',
                  time:res.data.resultData.endWordTime.split(' ')[1]
                },
              })
            }
          }
        });
      }
    },
    getMyMission() {
      util.comPOST({
        url: '/api/task/myTask',
        data: {
          userId: userInfo.id
        },
        success: res => {
          const info = res.data.resultData;
          console.log(res)
          this.setData({
            title: info.title,
            time: info.workDate.substring(3) + '-' + info.workEndDate.substring(3)
          })
        }
      });
    }
  },
  ready() {
    var now = new Date();
    this.setData({
      date: util.formatTime(now).split(' ')[0],
      week: util.formatTime(now).split(' ')[2],
    })
    this.getMyMission();
  }
})
