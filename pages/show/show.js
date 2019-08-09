// pages/show/show.js
Page({

  /**
   * Page initial data
   */
  data: {
    timer_seconds: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let page = this
    wx.request({
      url: `http://localhost:3000/api/v1/posts/${options.id}`,
      success: function(res) {
        page.setData(res.data)
      }
    })
  },

  send_comment: function (e) {
    let page = this
    let post_id = page.data.id
    wx.request({
      url: 'http://localhost:3000/api/v1/comments',
      method: 'POST',
      data: { text: page.data.text, post_id: post_id },
      success: function (res) {
        wx.request({
          url: `http://localhost:3000/api/v1/posts/${post_id}`,
          success: function (res) {
            page.setData(res.data)
            wx.showToast({
              title: 'Commented!',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  },

  get_text: function(e) {
    this.setData({text: e.detail.value})
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})