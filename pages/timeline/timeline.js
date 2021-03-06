// pages/timeline/timeline.js
Page({

  /**
   * Page initial data
   */
  
  data: {
    arr: [1,2,3,4,5,6,7,8],
    filtering: false,
    filter: "",
    search_done: false,
    TabCur: null,
    
  },

  goToShow: function(e) {
    wx.navigateTo({
      url: `/pages/show/show?id=${e.currentTarget.dataset.id}`,
    })
  },

  
  start_over: function() {
    this.setData({image_selected: false, text_added: false, search_done: false})
  },

  send_comment: function(e) {
    let page = this
    let submit_event = e
    let text = e.detail.value
    let post_id = e.currentTarget.dataset.id
    wx.request({
      url: 'http://localhost:3000/api/v1/comments',
      method: 'POST',
      data: {text: text, post_id: post_id},
      success: function(res) {
        console.log(res)
        wx.showToast({
          title: 'Commented!',
          icon: 'success',
          duration: 2000,
          complete: function(e) {
            page.toggle_comments(submit_event)
          }
          })   
      }
    })
  },

  create_post: function(e) {
    let page = this
    let post = {image: page.data.selected_image.images.original.url, content: page.data.user_content, searched: page.data.searched}
    wx.request({
      url: 'http://localhost:3000/api/v1/posts',
      method: 'POST',
      data: post,
      success: function(res) {
        console.log(res)
        wx.reLaunch({
          url: '/pages/timeline/timeline',
        })
      }
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let page = this
    page.setData({
      childW: page.data.arr.length * 80
    });
    wx.request({
      url: 'http://localhost:3000/api/v1/posts',
      success: function(res) {
        console.log(res)
        const posts = res.data.posts
        page.setData({posts: posts})
        let hot_conversations = posts.map(p => {
          return p.searched.toUpperCase()
        })
        let unique_hot_conversations = [...new Set(hot_conversations)];
        page.setData({arr: unique_hot_conversations})
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    let page = this
    if (page.data.filter != "") {
      let filtered = page.data.posts.filter(post => post.searched == page.data.filter)
      page.setData({filtered_posts: filtered})
    }
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
    this.start_over()
  },

  select_image: function(e) {
    let image_id = e.currentTarget.dataset.id
    let page = this
    console.log(image_id)
    let selected_image = this.data.searched_images.find(o => o.id === image_id);
    console.log(selected_image)
    page.setData({selected_image: selected_image, image_selected: true})
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },

  add_text: function(e) {
    let user_content = e.detail.value
    console.log(user_content)
    this.setData({user_content: user_content, text_added: true})
  },

  image_search: function(e) {
    // PIXABAY IMAGE SEARCH
  //   let page = this
  //   page.setData({ search_done: true })
  //   const pixabay_api = '12270710-587eb84d408349f72b29f4158';
  //   const pixabay_url = "https://pixabay.com/api/?key=" + pixabay_api + "&q=" + encodeURIComponent(e.detail.value);
  //   wx.request({
  //     url: pixabay_url,
  //     success: function(res) {
  //       let images = res.data.hits
  //       images.sort(function (a, b) {
  //         let x = a["likes"]; let y = b["likes"];
  //         return ((x < y) ? 1 : ((x > y) ? -1 : 0));
  //       });
  //       console.log(images)
  //       page.setData({searched_images: images})
  //     }
  //   })
  // GIPHY IMAGE SEARCH
    let page = this
    page.setData({searched: e.detail.value})
    page.setData({ search_done: true })
    const giphy_api = '2r4EOUsY6HmplARSLRFuOw1PunnjnSI4'
    const giphy_endpoint = 'https://api.giphy.com/v1/gifs/search'
    let data = {api_key: giphy_api, q: e.detail.value, rating: 'g'}
    wx.request({
      url: giphy_endpoint,
      method: 'GET',
      data: data,
      success: function(res) {
        console.log(res.data.data)
        page.setData({ searched_images: res.data.data })
      }
    })
   },
  // scrollview filter method method
  tabOn: function (e) {
    // condition for checking whether filter is already on and whether event is a switch between tags or turning filter off
    // console.log(e.currentTarget.dataset.id)
    if ((this.data.filtering == false) || (this.data.filtering == true && this.data.filter != e.currentTarget.dataset.tag.toLowerCase())) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        filter: e.currentTarget.dataset.tag.toLowerCase()
      });
      this.setData({ filtering: true })
      this.onReady()
    } else {
      this.setData({filtering: false, TabCur: null})
    }
  }
})