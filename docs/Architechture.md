
#### Ghi chú
##### A. Một số điểm phức tạp cần chú ý
1. Routing
> [Tóm tắt]:\
>   Có 3 bảng dùng trong định tuyến. 1 bảng ảo là các `API Endpoints` trên server. 1 bảng là `RouterConstants.jsx` định tuyến các **trang (page)** trên web site. 1 Bảng là `CategoriesMap.jsx` để map các `Category` với các `Route` bên phía `Client`, chỉ như vậy mới biết là 1 bài viết thuộc chuyên mục nào đó có URL là gì (Bài viết không lưu url trỏ đến nó. Để xác định đường dẫn tới bài viết chỉ cần `id` của bài viết là đủ. Nhưng như vậy có thể sẽ dẫn người dùng tới các chuyên mục không đúng với chuyên mục gốc của bài viết. Vậy nên ta mới cần 1 bảng để xác định `Category` nào đó được đặt ở `URL` nào.).

- Server có 1 bảng là các API Endpoints
- Client có 2 bảng:
  + 1 Bảng định tuyến các trang (`/utils/RouterConstants.jsx`)
  + 1 bảng để lưu các API Endpoints (`/utils/ApiEndpoints.jsx`)
