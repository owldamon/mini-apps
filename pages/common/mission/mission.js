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
    }
  }
})
