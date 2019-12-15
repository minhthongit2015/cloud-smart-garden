# Beyond Garden

---

Hướng dẫn cài đặt `Tensorflow`

1. NodeJS 12.13.0 (`nvm install 12.13.0 && nvm use 12.13.0`) + Nodemon (`npm i -g nodemon`)
2. Chạy `npm install -g --production windows-build-tools` dưới quyền admin
3. `npm i @tensorflow/tfjs-node` (v1.4.0 - 16/12/2019)
4. Nếu đã cài `Tensorflow` rồi thì build lại với `npm rebuild @tensorflow/tfjs-node --build-from-source` (`npm run rebuild-tensorflow`)
5. Start Server