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
    notInput: true,
    missionList: [
      {
        title: '京东中秋活动促销员',
        creatDate: '11.29',
        address: '广州塔',
        period: '12.02-12.05',
        price: '200k/day',
        company: '广东圣火公司',
        require: '要求：女、18-28岁、身高165cm以上...',
      },
      {
        title: '京东中秋活动促销员',
        creatDate: '11.29',
        address: '广州塔',
        period: '12.02-12.05',
        price: '200k/day',
        company: '广东圣火公司',
        require: '要求：女、18-28岁、身高165cm以上...',
      }
    ]
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
    }
  }
})
