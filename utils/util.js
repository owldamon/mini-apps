const devUrl = 'http://192.168.0.17:8080/CP';
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const week = date.getDay()
  return [year, month, day].map(formatNumber).join('.') + ' ' + [hour, minute, second].map(formatNumber).join(':')+ ' ' + "星期" + "日一二三四五六".charAt(week)
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const getCreateDate = value => {
  value.createDate = value.createDate.split(' ')[0];
  return value;
}
const getFirstImg = value => {
  value.imgs = value.imgs.split(',')[0];
  return value;
}

const filterMoney = value => {
  if(value.status == 1) {
    value.total = '+' + value.total;
  }else {
    value.total = '-' + value.total;
  }
  return value;
}

const comPOST = (options) => {
  wx.request({
    url: devUrl + options.url,
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: options.data,
    dataType: 'json',
    success: res => {
      if(res.data.resultCode == 0) {
        if(options.success) options.success(res)
      } else {
        wx.showToast({
          title: res.data.resultMessage,
          icon: 'loading'
        })
      }
    },
    fail: error => {
      wx.showToast({
        title: '网络连接失败',
        icon: 'loading'
      })
      console.log(error)
    }
  })
}
const uploadImg = (options) => {
  wx.uploadFile({
    url: devUrl + '/api/user/uploadImg', 
    filePath: options.imgUrl,
    name: 'imgs',
    formData: options.data,
    success: res => {
      if(JSON.parse(res.data).resultCode == 0) {
        if(options.success) options.success(res)
      } else {
        wx.showToast({
          title: res.data.resultMessage,
          icon: 'loading'
        })
      }
    },
    fail: error => {
      wx.showToast({
        title: '网络连接失败',
        icon: 'loading'
      })
      console.log(error)
    }
  })
}
const updateLocalData = (userInfo,obj) => {
  wx.setStorageSync('userInfo', Object.assign(userInfo, obj));
}

module.exports = {
  formatTime: formatTime,
  getCreateDate: getCreateDate,
  getFirstImg: getFirstImg,
  filterMoney: filterMoney,
  comPOST: comPOST,
  uploadImg: uploadImg,
  updateLocalData: updateLocalData
}
