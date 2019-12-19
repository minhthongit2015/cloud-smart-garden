# Beyond Garden

---

## Hướng dẫn thiết lập môi trường lập trình

#### [A] Môi trường
1. NodeJS (v12.13.0) `(*Lưu ý phải chọn phiên bản tương thích với TensorflowJS)`
2. Python 2.7 `(Phiên bản tương thích với TensorflowJS)`

#### [B] Công cụ
1. Visual Studio Code (VS Code)
2. NoSQLBooster for MongoDB
3. Heroku CLI
4. Node Version Manager (nvm)
5. Nodemon

#### [B] Các thiết lập cần thiết
1. Cài đặt `nvm`
  > https://github.com/coreybutler/nvm-windows/releases
2. Cài đặt `NodeJS`
  ```bash
  > nvm install node 12.13.0 && nvm use 12.13.0
  ```
3. Cài đặt `Python 2.7`
  > https://www.python.org/downloads/windows/
4. Cài đặt `Windows Build Tools` dưới quyền **Admin**
  ```bash
  > npm install -g --production windows-build-tools
  ```
5. Cài đặt các thư viện cần thiết
  ```bash
  > npm install
  ```
6. Cài đặt `nodemon`
  ```bash
  > npm install -g nodemon
  ```
7. Tạo file `.env.dev.ini` để truyền biến môi trường vào (`*Đường dẫn bên dưới là đường dẫn mẫu, bạn cần truyền đường dẫn thật tới Database`)
  ```ini
  DB_MONGO_URI=mongodb+srv://<username>:<password>@cluster0-abcd.gcp.mongodb.net/BeyondGarden?retryWrites=true&w=majority
  ```

---

#### Hướng dẫn cài đặt `Tensorflow`
> Repo: https://github.com/tensorflow/tfjs/tree/master/tfjs-node

1. NodeJS 12.13.0 (`nvm install 12.13.0 && nvm use 12.13.0`) + Nodemon (`npm i -g nodemon`)
2. Cài đặt `python 2.7`
3. Chạy `npm install -g --production windows-build-tools` dưới quyền admin
4. `npm i @tensorflow/tfjs-node` (v1.4.0 - 16/12/2019)
5. Nếu đã cài `Tensorflow` rồi thì build lại với `npm rebuild @tensorflow/tfjs-node --build-from-source` (`npm run rebuild-tfjs`)
6. Start Server