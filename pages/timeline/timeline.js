// pages/timeline/timeline.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    
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
    this.setData({
      userInfo: getApp().globalData.userInfo,
    })
    console.log(this.data)
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

  },

  image_search: function(e) {
    const pixabay_api = '12270710-587eb84d408349f72b29f4158';
    const pixabay_url = "https://pixabay.com/api/?key=" + pixabay_api + "&q=" + encodeURIComponent(e.detail.value);
    wx.request({
      url: pixabay_url,
      success: function(res) {
        console.log(res)
      }
    })
  }
})