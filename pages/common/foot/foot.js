// pages/common/foot.js
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
    navList: [
      {
        imgUrl: '../../../images/icon/icon-home.png',
        activeImgUrl: '../../../images/icon/icon-home-active.png',
        name: '任务大厅',
        isActive: true
      },
      {
        imgUrl: '../../../images/icon/icon-mission.png',
        activeImgUrl: '../../../images/icon/icon-mission-active.png',
        name: '我的任务',
        isActive: false
      },
      {
        imgUrl: '../../../images/icon/icon-message.png',
        activeImgUrl: '../../../images/icon/icon-message-active.png',
        name: '消息',
        isActive: false
      },
      {
        imgUrl: '../../../images/icon/icon-me.png',
        activeImgUrl: '../../../images/icon/icon-me-active.png',
        name: '个人中心',
        isActive: false
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    navToByIndex(event) {
      let id = event.currentTarget.id;
      this.renderNavState(id);
      let activeNavId = { // detail对象，提供给事件监听函数
        activeNavId: id
      };
      wx.setNavigationBarTitle(
        {
          title: event.currentTarget.dataset.name
        }
      )
      this.triggerEvent('changeNav', activeNavId);
    },
    renderNavState(_index=0){
      this.data.navList.forEach((element,index) => {
        element.isActive = false;
        if(_index == index) {
          element.isActive = true;
        }
      });
      this.setData({
        navList: this.data.navList
      })
    }
  },
  /**
   * 初始化组件
   */
  ready(){
    
  }
})
