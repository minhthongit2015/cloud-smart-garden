## **Too Long; Didn’t Read**
1. Tạo và xử lý trên một `đối tượng dữ liệu mới`<br>
  (Ví dụ về đối tượng dữ liệu: `Vườn`, `Loài Cây`, `Chế Độ Chăm Sóc`, `Khách Hàng`...)


---

#### `[1]` Tạo đối tượng dữ liệu mới
1. Tạo một `model` mới trong `src/server/models/mongo`
```js
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  name: String
});
const Model = mongoose.model('Hero', Schema);

module.exports = Model;
```

2. **import** model vào `src/server/models/mongo/db.js` và **export** ra lại từ `db.js` theo như các model khác

3. **(Optional)** Nếu bạn muốn tạo dữ liệu mẫu cho đối tượng dữ liệu mới đó thì có thể tạo theo mẫu trong `.../mongo/test`
