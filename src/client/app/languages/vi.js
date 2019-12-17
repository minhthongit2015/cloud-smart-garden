
export default {
  general: {
    buttons: {

    }
  },
  pages: {
    home: {
      mainMessage: 'đây là những gì đang diễn ra, và bạn có quyền không tin vào điều đó...',
      nav: {
        earthPicture: 'Bức Tranh\r\nTrái Đất',
        theRealWorld: 'Thế Giới Thực',
        whatYouCanDo: 'Điều Bạn\r\nCó Thể Làm',
        yourQuestion: 'Điều Bạn\r\nMuốn Biết?'
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
    earthPicture: {
      title: {
        main: 'Bức Tranh Trái Đất',
        climate: 'Bức Tranh Khí Hậu',
        organisms: 'Bức Tranh Sinh Vật',
        pollution: 'Bức Tranh Ô Nhiễm',
        communityShare: 'Chia Sẻ Từ Cộng Đồng'
      },
      nav: {
        main: 'Bức Tranh Trái Đất',
        climate: 'Khí hậu',
        organisms: 'Sinh vật',
        pollution: 'Ô nhiễm',
        communityShare: 'Chia sẻ từ cộng đồng'
      },
      mainMessage: 'ở đây không có gì ngoài sự thật...\r\nmình chỉ muốn cho bạn biết chuyện gì đang xảy ra, quyết định còn lại là ở bạn.',
      communityGuideMessage: 'Đây là nơi bạn có thể chia sẻ những điều mình biết với mọi người một cách tự do,\r\nnhững tin tức quan trọng sẽ được chọn để đưa lên trang chính.'
    },
    theRealWorld: {
      title: 'Thế Giới Thực',
      loadingText: 'đang cập nhập sự kiện thế giới...'
    },
    whatYouCanDo: {
      title: {
        main: 'Điều Bạn Có Thể Làm',
        climate: 'Cho Khí Hậu',
        organisms: 'Cho Sinh Vật',
        pollution: 'Giảm Ô Nhiễm',
        supporting: 'Hỗ Trợ Các Phong Trào',
        worldActions: 'Thế Giới Đang Hành Động',
        GretaThunberg: 'Greta Thunberg',
        communityRecommend: 'Chia Sẻ Từ Cộng Đồng'
      },
      nav: {
        main: 'Điều Bạn Có Thể Làm',
        climate: 'Cho khí hậu',
        organisms: 'Cho sinh vật',
        pollution: 'Giảm ô nhiễm',
        supporting: 'Hỗ trợ các phong trào',
        supportingShort: 'Hỗ trợ',
        worldActions: 'Thế giới đang hành động',
        worldActionsShort: 'Thế giới',
        GretaThunberg: 'Greta Thunberg',
        communityRecommend: 'Chia sẻ từ cộng đồng'
      },
      mainMessage: '~ 10,000,000 người, 6,200 thành phố và 218 quốc gia đã tham gia trong #FridaysForFuture 20-27/9...\r\nsao mọi người lại phải cố gắng như vậy...',
      communityGuideMessage: 'Đây là nơi bạn có thể chia sẻ những điều mình biết với mọi người một cách tự do,\r\nnhững tin tức quan trọng sẽ được chọn để đưa lên trang chính.',
      GretaThunbergMessage: '“This is just the beginning. We will continue. Because change is coming whether you like it or not.” - Greta Thunberg'
    },
    yourQuestion: {
      title: {
        main: 'Điều Bạn Muốn Biết?',
        climate: 'Hỏi Về Khí Hậu',
        organisms: 'Hỏi Về Sinh Vật',
        pollution: 'Hỏi Về Ô Nhiễm',
        others: 'Hỏi Chủ Đề Khác'
      },
      nav: {
        main: 'Điều Bạn Muốn Biết?',
        climate: 'Về khí hậu',
        organisms: 'Về sinh vật',
        pollution: 'Về ô nhiễm',
        others: 'Chủ đề khác'
      },
      mainMessage: 'Điều gì khiến bạn còn băn khoăn?'
    }
  },
  components: {
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
