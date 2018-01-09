// pages/common/hall/hall.js
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
    location: '广州',
    notInput: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    searchInput(event) {
      this.setData({
        notInput: !event.detail.value
      });
    }
  }
})
