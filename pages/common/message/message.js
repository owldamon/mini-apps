// pages/common/message/message.js
var strophe = require('../../../utils/strophe.js')
var WebIM = require('../../../utils/WebIM.js')
var WebIM = WebIM.default;

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
    yourname: '',
    arr: [
      {
        img: '/images/logo.png',
        name: '胖胖',
        msg: '你中餐吃什么',
        date: '12:10'
      },
      {
        img: '/images/logo.png',
        name: '志能',
        msg: '没有接口，你看着玩',
        date: '昨天'
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    into_chatRoom: function (event) {
      // var that = this
      console.log(event)
      var nameList = {
          myName: '123',//,
          your: event.currentTarget.dataset.username
      }
      wx.navigateTo({
          url: '../chatRoom/chatRoom?username=' + JSON.stringify(nameList)
      })
    },
  }
})