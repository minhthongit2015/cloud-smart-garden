## **Too Long; Didn’t Read**
1. Hướng dẫn tạo `một API mới`
2. Hướng dẫn gửi `request` đến `API mới đó` và xử lý kết quả trả về

---

### **`[1]` Các bước tạo `1 API mới`**
1. Tạo 1 `router` mới vào trong `./src/server/api/v1` với nội dung dạng như sau:

(xem thêm các file hiện có trong thư mục `api/v1` để làm mẫu)

> Ví dụ: tạo file `hello.js`
```js
const router = require('express').Router();
const Logger = require('../../services/Logger');
const ApiResponse = require('../../models/api-models/ApiResponse');

router.get('/google/auth', Logger.catch((req, res) => {
  res.send(ApiResponse.setData('Hello'));
}));

module.exports = router;
```

2. Thêm `router` mới vào trong hệ thống `routes`

(Xem tham khảo các file khác trong `/api/v1` để làm mẫu)

> Trong nhánh route muốn thêm vào
```js
const router = require('express').Router();
const HelloRoute = require('./hello');

router.use('/hello-api-path', HelloRoute);

module.exports = router;
```

---

### **`[2]` Gửi request và nhận dữ liệu từ API**

> Thêm đường dẫn tới API vào trong `ApiEndpoints.jsx`
```js
const hello = `${APIv1}/hello-api-path`;

export default {
  //...
  hello
  //...
}
```

> Tại file sử dụng API
```jsx
export default class extends BaseComponent {
  componentDidMount() {
    super.componentDidMount();
    this.fetchInputValue();
  }

  fetchInputValue() {
    superrequest.get(ApiEndpoints.hello)
      .then((res) => {
        this.setState({
          value: res.data
        });
      })
  }
}
```

