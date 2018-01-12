// pages/common/mission/mission.js
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
    up: {
      state: '未打卡',
      class: 'duty-state'
    },
    down: {
      state: '未打卡',
      class: 'duty-state'
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
        this.setData({
          up: {
            state: '已打卡',
            class: 'duty-state on'
          }
        })
      } else {
        this.setData({
          down: {
            state: '已打卡',
            class: 'duty-state on'
          },
        })
      }
    }
  }
})
