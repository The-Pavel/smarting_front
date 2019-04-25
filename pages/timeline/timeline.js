// pages/timeline/timeline.js
Page({

  /**
   * Page initial data
   */
  data: {
    search_done: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let page = this
    wx.request({
      url: 'http://localhost:3000/api/v1/posts',
      success: function(res) {
        console.log(res.data.posts)
        page.setData(res.data)
      }
    })
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

  remove_search: function(e) {
    this.setData({search_done: false})
  },

  image_search: function(e) {
    let page = this
    page.setData({ search_done: true })
    const pixabay_api = '12270710-587eb84d408349f72b29f4158';
    const pixabay_url = "https://pixabay.com/api/?key=" + pixabay_api + "&q=" + encodeURIComponent(e.detail.value);
    wx.request({
      url: pixabay_url,
      success: function(res) {
        let images = res.data.hits
        images.sort(function (a, b) {
          let x = a["likes"]; let y = b["likes"];
          return ((x < y) ? 1 : ((x > y) ? -1 : 0));
        });
        console.log(images)
        page.setData({searched_images: images})
      }
    })
  }
})