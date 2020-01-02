
export default {
  general: {
    buttons: {

    }
  },
  pages: {
    home: {
      mainMessage: '',
      nav: {
        myGarden: 'My Garden',
        userNetwork: 'Smile City',
        aiCloud: 'AI Cloud',
        nextFeatures: 'Top Wanted'
      },
      sideNav: {
        myGarden: 'My Garden',
        userNetwork: 'Smile City',
        aiCloud: 'AI Cloud',
        nextFeatures: 'Top Wanted'
      }
    },
    admin: {
      title: {
        dashboard: 'Bảng Điều Khiển',
        categories: 'Quản Lý Chuyên Mục'
      },
      nav: {
        dashboard: 'Bảng điều khiển',
        categories: 'Quản lý chuyên mục'
      },
      message: {
        dashboard: 'Bảng điều khiển',
        categories: 'Quản lý danh sách chuyên mục bài viết'
      }
    },
    intranet: {
      title: {
        intranet: 'Alpha Team',
        oneHundredQuotes: '100 Quotes | Alpha Team',
        memberSpotlight: 'Member Spotlight | Alpha Team'
      },
      nav: {
        intranet: 'Đại Sảnh Alpha Team',
        oneHundredQuotes: '100 Quotes',
        memberSpotlight: 'Tiêu Điểm Thành Viên'
      },
      message: {
        intranet: 'Welcome to the Tomorrowland!',
        oneHundredQuotes: 'Some people dream of success,\r\nwhile other people get up every morning and make it happen\r\n- Wayne Huizenga',
        memberSpotlight: ''
      }
    },
    myGarden: {
      nav: {
        myGarden: 'My Garden',
        storehouse: 'Kho vật dụng',
        help: 'Tìm trợ giúp'
      },
      title: {
        myGarden: 'My Garden',
        storehouse: 'Kho vật dụng',
        help: 'Tìm trợ giúp'
      },
      message: {
        myGarden: 'My Garden',
        storehouse: 'Kho vật dụng',
        help: 'Tìm trợ giúp'
      }
    },
    aiCloud: {
      nav: {
        aiCloud: 'AI Cloud',
        projects: 'Projects',
        experiments: 'Experiments',
        trainedModels: 'Trained Models',
        datasets: 'Datasets'
      },
      title: {
        aiCloud: 'AI Cloud',
        projects: 'Projects',
        experiments: 'Experiments',
        trainedModels: 'Trained Models',
        datasets: 'Datasets'
      },
      tabs: {
        projects: {
          newForm: {
            createTitle: 'Bắt đầu dự án mới',
            updateTitle: 'Cập nhập thông tin dự án',
            postButton: 'Tạo dự án',
            updateButton: 'Lưu chỉnh sửa'
          }
        },
        experiments: {
          newForm: {
            createTitle: 'Thử nghiệm chế độ chăm sóc mới',
            updateTitle: 'Cập nhập thông tin chế độ chăm sóc',
            postButton: 'Tạo chế độ mới',
            updateButton: 'Lưu chỉnh sửa'
          }
        }
      }
    },
    nextFeatures: {
      title: {
        nextFeatures: 'Bạn muốn điều gì?',
        nextTech: 'Công nghệ yêu thích',
        nextSpecies: 'Loài cây yêu thích'
      },
      nav: {
        nextFeatures: 'Bạn muốn điều gì?',
        nextTech: 'Công nghệ yêu thích',
        nextSpecies: 'Loài cây yêu thích'
      },
      message: {
        nextFeatures: 'Hãy thử Tưởng Tượng về một Khu Vườn thật Tuyệt Vời của Riêng Bạn! (^_^)!',
        nextTech: 'Bạn muốn khu vườn của bạn có thể làm được những gì? /=)',
        nextSpecies: 'Loài cây tuyệt vời nào mà bạn sẽ muốn trồng trong khu vườn của bạn? (^_^)!'
      }
    },
    theRealWorld: {
      title: 'Thế Giới Thực',
      loadingText: 'đang cập nhập sự kiện thế giới...'
    }
  },
  components: {
    blogBase: {
      newForm: {
        createTitle: 'Viết bài mới',
        updateTitle: 'Chỉnh sửa bài viết',
        postMessage: 'đang đăng bài...',
        preventLeaveMessage: 'Bài viết của bạn vẫn chưa được lưu! Bạn có chắc muốn rời đi?',
        postButton: 'Đăng bài',
        updateButton: 'Cập nhập bài viết',
      }
    },
    blog: {
      infinitePostList: {
        loadingText: 'đang tải các bài viết...',
        noPostMsg: 'chưa có bài viết nào được đăng...',
        knowAllMsg: 'bạn đã biết tất cả những gì mình biết...',
        knowAllMsg1: 'đây là tất cả bài viết đến thời điểm này.',
        knowAllMsg2: 'bạn đã đọc hết bài viết ngày hôm nay, hẹn bạn quay lại đọc tiếp vào ngày mai!',
        knowAllMsg3: 'bạn đã xem hết tất cả những bài viết.',
        knowAllMsg4: 'đây là tất cả những gì mình biết tới thời điểm này...',
        knowAllMsg5: 'cảm ơn bạn đã đọc hết tất cả các bài viết!',
        knowAllMsg6: 'bạn đã biết tất cả những gì mình biết...',
        knowAllMsg7: 'bạn đã biết tất cả những gì mình biết...'
      }
    },
    user: {
      login: '❝ Đăng Nhập ❞',
      logout: 'đăng xuất'
    },
    loginDialog: {
      loginToPost: 'Bạn cần đăng nhập để bắt đầu đăng bài chia sẻ đến mọi người.',
      loginToRequestChange: 'Bạn cần đăng nhập để đề xuất chỉnh sửa cho bài viết này.',
      loginToSavePost: 'Bạn cần đăng nhập để lưu bài viết này vào tài khoản của bạn.',
      loginToSaveIDo: 'Bạn cần đăng nhập để lưu này vào những việc bạn sẽ làm.',
      loginToRating: 'Bạn cần đăng nhập để đánh giá cho bài viết này.',
      loginToRiseYourVoice: 'Bạn cần đăng nhập để tham gia cùng mọi người.'
    }
  }
};
