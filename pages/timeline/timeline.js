// pages/timeline/timeline.js
Page({

  /**
   * Page initial data
   */
  data: {
    search_done: false
  },

  start_over: function(e) {
    this.setData({image_selected: false, text_added: false, search_done: false})
  },

  create_post: function(e) {
    let page = this
    let post = {image: page.data.selected_image.webformatURL, content: page.data.user_content}
    wx.request({
      url: 'http://localhost:3000/api/v1/posts',
      method: 'POST',
      data: post,
      success: function(res) {
        console.log(res)
      }
    })
  },

  toggle_comments: function(e) {
    let page = this
    let post_id = e.currentTarget.dataset.id
    let posts = page.data.posts
    // let selected_post = this.data.posts.find(o => o.id === post_id);
    let post = posts.find(p => post_id === p.id)
    post.comment_toggle = !post.comment_toggle
    page.setData({posts: posts})
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let page = this
    wx.request({
      url: 'http://localhost:3000/api/v1/posts',
      success: function(res) {
        console.log(res)
        page.setData({posts: res.data.posts})
        let posts = page.data.posts
        posts = posts.map(p => {
          p['comment_toggle'] = false
          return p
        })
        page.setData({posts: posts})
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

  select_image: function(e) {
    let image_id = e.currentTarget.dataset.id
    let page = this
    console.log(image_id)
    let selected_image = this.data.searched_images.find(o => o.id === image_id);
    console.log(selected_image)
    page.setData({selected_image: selected_image, image_selected: true})
  },

  add_text: function(e) {
    let user_content = e.detail.value
    console.log(user_content)
    this.setData({user_content: user_content, text_added: true})
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