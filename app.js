//app.js
require('./utils/strophe.js')
var WebIM = require('./utils/WebIM.js').default

App({
  getRoomPage: function () {
    return this.getPage("pages/chatroom/chatroom")
  },
  getPage: function (pageName) {
    var pages = getCurrentPages()
    return pages.find(function (page) {
      return page.__route__ == pageName
    })
  },
  getUserInfo() {
     // 获取用户信息
     wx.getSetting({
      success: res => {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId
            this.globalData.userInfo.avatar = res.userInfo.avatarUrl;
            this.globalData.userInfo.city = res.userInfo.city;
            this.globalData.userInfo.country = res.userInfo.country;
            this.globalData.userInfo.gender = res.userInfo.gender;
            this.globalData.userInfo.nickname = res.userInfo.nickName;
            this.globalData.userInfo.province = res.userInfo.province;
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            wx.setStorageSync('userInfo', this.globalData.userInfo)
          }
        })
        wx.getLocation({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId
            this.globalData.userInfo.latitude = res.latitude;
            this.globalData.userInfo.longitude = res.longitude;
            wx.setStorageSync('userInfo', this.globalData.userInfo)
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            
          }
        })
      }
    })
  },
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: this.globalData.devUrl + '/api/user/login',
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: {
            code: res.code
          },
          dataType: 'json',
          success: res => {
            this.getUserInfo();
            this.globalData.userInfo.openId = res.data.resultData.openId;
            if(res.data.resultData.newUser == 1) {
              let options = {
                apiUrl: WebIM.config.apiURL,
                user: res.data.resultData.openId,
                pwd: res.data.resultData.openId,
                grant_type: 'password',
                appKey: WebIM.config.appkey
              }
              WebIM.conn.open(options)
            } else {
              var options = {
                apiUrl: WebIM.config.apiURL,
                username: res.data.resultData.openId,
                password: res.data.resultData.openId,
                nickname: '',
                appKey: WebIM.config.appkey,
                success: (res) => {
                  console.log(res);
                }
              }
              WebIM.utils.registerUser(options)
            }
          },
          fail(error) {
            console.log(error)
          }
        })
      }
    })
    var that = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    WebIM.conn.listen({
      onOpened: function (message) {
        WebIM.conn.setPresence()
      },
      onPresence: function (message) {
        switch (message.type) {
          case "unsubscribe":
            pages[0].moveFriend(message);
            break;
          case "subscribe":
            if (message.status === '[resp:true]') {
              return
            } else {
              pages[0].handleFriendMsg(message)
            }
            break;
          case "joinChatRoomSuccess":
            console.log('Message: ', message);
            wx.showToast({
              title: "JoinChatRoomSuccess",
            });
            break;
          case "memberJoinChatRoomSuccess":
            console.log('memberMessage: ', message);
            wx.showToast({
              title: "memberJoinChatRoomSuccess",
            });
            break;
          case "memberLeaveChatRoomSuccess":
            console.log("LeaveChatRoom");
            wx.showToast({
              title: "leaveChatRoomSuccess",
            });
            break;
        }
      },
      onRoster: function (message) {
        var pages = getCurrentPages()
        if (pages[0]) {
          pages[0].onShow()
        }
      },

      onVideoMessage: function (message) {
        console.log('onVideoMessage: ', message);
        var page = that.getRoomPage()
        if (message) {
          if (page) {
            page.receiveVideo(message, 'video')
          } else {
            var chatMsg = that.globalData.chatMsg || []
            var time = WebIM.time()
            var msgData = {
              info: {
                from: message.from,
                to: message.to
              },
              username: message.from,
              yourname: message.from,
              msg: {
                type: 'video',
                data: message.url
              },
              style: '',
              time: time,
              mid: 'video' + message.id
            }
            msgData.style = ''
            chatMsg = wx.getStorageSync(msgData.yourname + message.to) || []
            chatMsg.push(msgData)
            wx.setStorage({
              key: msgData.yourname + message.to,
              data: chatMsg,
              success: function () {
                //console.log('success')
              }
            })
          }
        }
      },

      onAudioMessage: function (message) {
        console.log('onAudioMessage', message)
        var page = that.getRoomPage()
        console.log(page)
        if (message) {
          if (page) {
            page.receiveMsg(message, 'audio')
          } else {
            var chatMsg = that.globalData.chatMsg || []
            var value = WebIM.parseEmoji(message.data.replace(/\n/mg, ''))
            var time = WebIM.time()
            var msgData = {
              info: {
                from: message.from,
                to: message.to
              },
              username: message.from,
              yourname: message.from,
              msg: {
                type: 'audio',
                data: value
              },
              style: '',
              time: time,
              mid: 'audio' + message.id
            }
            console.log("Audio msgData: ", msgData);
            chatMsg = wx.getStorageSync(msgData.yourname + message.to) || []
            chatMsg.push(msgData)
            wx.setStorage({
              key: msgData.yourname + message.to,
              data: chatMsg,
              success: function () {
                //console.log('success')
              }
            })
          }
        }
      },

      onLocationMessage: function (message) {
        console.log("Location message: ", message);
      },

      onTextMessage: function (message) {
        var page = that.getRoomPage()
        console.log(page)
        if (message) {
          if (page) {
            page.receiveMsg(message, 'txt')
          } else {
            var chatMsg = that.globalData.chatMsg || []
            var value = WebIM.parseEmoji(message.data.replace(/\n/mg, ''))
            var time = WebIM.time()
            var msgData = {
              info: {
                from: message.from,
                to: message.to
              },
              username: message.from,
              yourname: message.from,
              msg: {
                type: 'txt',
                data: value
              },
              style: '',
              time: time,
              mid: 'txt' + message.id
            }
            chatMsg = wx.getStorageSync(msgData.yourname + message.to) || []
            chatMsg.push(msgData)
            wx.setStorage({
              key: msgData.yourname + message.to,
              data: chatMsg,
              success: function () {
                //console.log('success')
              }
            })
          }
        }
      },
      onEmojiMessage: function (message) {
        //console.log('onEmojiMessage',message)
        var page = that.getRoomPage()
        //console.log(pages)
        if (message) {
          if (page) {
            page.receiveMsg(message, 'emoji')
          } else {
            var chatMsg = that.globalData.chatMsg || []
            var time = WebIM.time()
            var msgData = {
              info: {
                from: message.from,
                to: message.to
              },
              username: message.from,
              yourname: message.from,
              msg: {
                type: 'emoji',
                data: message.data
              },
              style: '',
              time: time,
              mid: 'emoji' + message.id
            }
            msgData.style = ''
            chatMsg = wx.getStorageSync(msgData.yourname + message.to) || []
            chatMsg.push(msgData)
            //console.log(chatMsg)
            wx.setStorage({
              key: msgData.yourname + message.to,
              data: chatMsg,
              success: function () {
                //console.log('success')
              }
            })
          }
        }
      },
      onPictureMessage: function (message) {
        //console.log('Picture',message);
        var page = that.getRoomPage()
        if (message) {
          if (page) {
            //console.log("wdawdawdawdqwd")
            page.receiveImage(message, 'img')
          } else {
            var chatMsg = that.globalData.chatMsg || []
            var time = WebIM.time()
            var msgData = {
              info: {
                from: message.from,
                to: message.to
              },
              username: message.from,
              yourname: message.from,
              msg: {
                type: 'img',
                data: message.url
              },
              style: '',
              time: time,
              mid: 'img' + message.id
            }
            msgData.style = ''
            chatMsg = wx.getStorageSync(msgData.yourname + message.to) || []
            chatMsg.push(msgData)
            wx.setStorage({
              key: msgData.yourname + message.to,
              data: chatMsg,
              success: function () {
                //console.log('success')
              }
            })
          }
        }
      },
      // 各种异常
      onError: function (error) {
        // 16: server-side close the websocket connection
        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_DISCONNECTED) {
          if (WebIM.conn.autoReconnectNumTotal < WebIM.conn.autoReconnectNumMax) {
            return;
          }

          wx.showToast({
            title: 'server-side close the websocket connection',
            duration: 1000
          });
          wx.redirectTo({
            url: '../login/login'
          });
          return;
        }

        // 8: offline by multi login
        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_SERVER_ERROR) {
          wx.showToast({
            title: 'offline by multi login',
            duration: 1000
          })
          wx.redirectTo({
            url: '../login/login'
          })
          return;
        }
      },
    })
  },
  globalData: {
    userInfo: {
      nickname: '',
      avatar: '',
      openId: '',
      gender: '',
      province: '',
      city: '',
      country: '',
      longitude: '',
      latitude: ''
    },
    devUrl: 'http://192.168.0.17:8080/CP',
    mapKey: 'c7f7e637c66d338086ece208ebd62088'
  }
})